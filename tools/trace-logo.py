#!/usr/bin/env python3
"""
Rebuild the vector logo variants from the client's raster artwork.

    python3 tools/trace-logo.py [source.png]     # default: images/logo.png

The client has no vector original, so the SVGs are traced from the PNG. Masks
are alpha-weighted with a soft colour falloff so the source's anti-aliasing
survives — threshold the 400px source directly and potrace reproduces the pixel
staircase, which makes the ball come out polygonal at hero size.

Writes images/logo.svg, images/logo-reverse.svg, images/logo-nav.svg.
Requires: potrace, pillow.
"""
import math, os, re, subprocess, sys, tempfile
from PIL import Image, ImageOps, ImageFilter

SRC   = sys.argv[1] if len(sys.argv) > 1 else "images/logo.png"
OUT   = "images"
BASE  = {"black": (0, 0, 0), "yellow": (228, 224, 37), "teal": (1, 117, 160)}
SPLIT = 173      # rows at/below this are the "Directed by ..." credit line
SCALE = 8
FALLOFF = 170.0
INK, CREAM, CREDIT = "#16211b", "#F7F5EF", "#0175A0"

im = Image.open(SRC).convert("RGBA")
W, H = im.size
px = im.load()

cov = {k: Image.new("L", (W, H), 0) for k in ("black", "yellow", "teal", "credit")}
cp = {k: v.load() for k, v in cov.items()}
for y in range(H):
    for x in range(W):
        r, g, b, a = px[x, y]
        if a == 0:
            continue
        for name, (tr, tg, tb) in BASE.items():
            d = math.sqrt((r - tr) ** 2 + (g - tg) ** 2 + (b - tb) ** 2)
            w = max(0.0, 1.0 - d / FALLOFF)
            if w <= 0:
                continue
            key = "credit" if (name == "teal" and y >= SPLIT) else name
            cp[key][x, y] = max(cp[key][x, y], int(a * w))

tmp = tempfile.mkdtemp()
paths = {}
for k, c in cov.items():
    big = c.resize((W * SCALE, H * SCALE), Image.LANCZOS).filter(ImageFilter.GaussianBlur(1.2))
    bw = big.point(lambda v: 255 if v >= 128 else 0, mode="1")
    pbm = os.path.join(tmp, k + ".pbm")
    svg = os.path.join(tmp, k + ".svg")
    ImageOps.invert(bw.convert("L")).convert("1").save(pbm)   # potrace inks BLACK
    subprocess.run(["potrace", pbm, "-s", "--flat", "-a", "1.0", "-O", "0.2",
                    "-t", "8", "-o", svg], check=True)
    m = re.search(r'<g transform="([^"]+)"[^>]*>(.*?)</g>', open(svg).read(), re.S)
    paths[k] = (m.group(1), re.sub(r'\s(?:fill|stroke)="[^"]*"', '', m.group(2)).strip()) if m else (None, None)

SC = f"scale({1.0 / SCALE})"

def build(path, ink, credit_fill, include_credit=True, centre=False):
    off = "translate(0,21.5) " if centre else ""
    parts = [("yellow", "#E4E025"), ("teal", "#0175A0"), ("black", ink)]
    if include_credit:
        parts.append(("credit", credit_fill))
    body = "\n".join(
        f'  <g transform="{off}{SC}"><g transform="{paths[n][0]}" fill="{c}">{paths[n][1]}</g></g>'
        for n, c in parts if paths[n][0])
    svg = ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 216" '
           'role="img" aria-label="Brookline Tennis Academy">\n' + body + "\n</svg>\n")
    open(os.path.join(OUT, path), "w").write(svg)
    print("wrote", path, len(svg), "bytes")

build("logo.svg", INK, CREDIT)                                   # light backgrounds, footer
build("logo-reverse.svg", CREAM, CREAM)                          # over photography
build("logo-nav.svg", INK, CREDIT, include_credit=False, centre=True)   # the nav bar
