/* =========================================================================
   BROOKLINE TENNIS ACADEMY — SITE CONFIG
   -------------------------------------------------------------------------
   Everything editable lives here. Swap a link, phone number, or price and
   the whole site updates. Booking buttons currently point to the existing
   Timmy (gotimmy.com) registration pages — when you move to a new booking
   system, just replace the URLs in the `booking` block below.
   ========================================================================= */

window.SITE_CONFIG = {

  /* ---- Business identity ---- */
  brand: {
    name: "Brookline Tennis Academy",
    shortName: "BTA",
    tagline: "Tennis in the Woods",
    logo: "images/logo.png",
  },

  /* ---- Hero slideshow ----
     A slow cross-fade behind the centered seal. Add/remove/reorder slides
     freely — the sequence below runs place → coaching → adults → juniors.
     `focus` is the CSS object-position, i.e. the part of the photo that must
     survive the crop on a tall phone screen. Tune it per image.
     `holdMs` is how long each slide sits still; `fadeMs` is the cross-fade.
     `alt` is a note for whoever edits this file — the slideshow itself is
     decorative (the <h1> carries the meaning), so the images ship alt="". */
  hero: {
    holdMs: 5000,
    fadeMs: 3500,
    slides: [
      {
        src: "images/hero/courts",
        focus: "50% 50%",
        alt: "Aerial view of the twelve tennis courts set among the trees at The Roxbury Latin School",
      },
      {
        src: "images/hero/action",
        focus: "50% 38%",
        alt: "A coach guiding a young player through a forehand during a lesson",
      },
      {
        src: "images/hero/net",
        focus: "50% 42%",
        alt: "An adult player stretching for a volley at the net",
      },
      {
        src: "images/hero/junior",
        focus: "55% 35%",
        alt: "A junior player in a Brookline Tennis Academy shirt striking a forehand",
      },
    ],
  },

  /* ---- Contact / location ---- */
  contact: {
    venueName: "The Roxbury Latin School",
    address: "101 St. Theresa Ave., West Roxbury, MA 02132",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Roxbury+Latin+School+101+St+Theresa+Ave+West+Roxbury+MA+02132",
    phone: "857-855-8392",
    phoneHref: "tel:+18578558392",
    email: "shelly@brooklinetennis.com",
    // Office inbox used for private / semi-private lesson requests:
    registrationEmail: "brooklinetennisadm@gmail.com",
  },

  /* ---- Booking links (currently Timmy) ----
     `type: "link"`  -> opens the Timmy registration page in a new tab
     `type: "email"` -> opens a pre-filled email to the office            */
  booking: {
    // THE priority CTA
    // type: "embed" opens the scheduler in an on-page modal.
    //   -> To go live: replace ACUITY_OWNER_ID below with your real Acuity
    //      owner id (Acuity → Client Scheduling Page → "Direct link", it looks
    //      like https://app.acuityscheduling.com/schedule.php?owner=12345678).
    //      While the placeholder is in place, the modal shows a demo panel.
    //   -> To switch this button back to plain email, change type to "email".
    //   -> To point it at any external booking link instead, use type "link".
    privateSemiPrivate: {
      type: "embed",
      embedUrl: "https://app.acuityscheduling.com/schedule.php?owner=ACUITY_OWNER_ID",
      title: "Book a Private or Semi-Private Lesson",
      subtitle: "Pick a coach, day, and time — confirmed in a couple of taps.",
      // Kept as the no-JS fallback and the demo-panel action:
      fallbackEmail: {
        to: "brooklinetennisadm@gmail.com",
        subject: "Private / Semi-Private Lesson Request",
        body: "Hi Brookline Tennis Academy,\n\nI'd like to book a lesson. Here are my details:\n\n- Name:\n- Adult or Junior:\n- Private or Semi-private (and partner name if semi):\n- Current level / goals:\n- Preferred days & times:\n\nThank you!",
      },
    },

    summerCamp: {
      type: "link",
      url: "https://brooklinetennisacademy.gotimmy.com/pages/camps?sessionId=0&programId=1301,1302,1313,1300,1299&levelId=&activeDays=",
    },

    kidsTennis: {
      type: "link",
      url: "https://brooklinetennisacademy.gotimmy.com/pages/class?classType=All&sessionId=0&programId=1657,1100,1645,1305,1306,1307,1646,1304&levelId=&activeDays=&search=",
    },

    // Adults, broken out by season so the button lands on the right registration
    adults: {
      spring:  "https://brooklinetennisacademy.gotimmy.com/pages/class?sessionId=3442&programId=2613&classType=Class&levelId=&activeDays=&search=",
      summer1: "https://brooklinetennisacademy.gotimmy.com/pages/class?sessionId=3443&programId=2613&classType=Class&levelId=&activeDays=&search=",
      summer2: "https://brooklinetennisacademy.gotimmy.com/pages/class?sessionId=3444&programId=2613&classType=Class&levelId=&activeDays=&search=",
      fall:    "https://brooklinetennisacademy.gotimmy.com/pages/class?sessionId=3448&programId=2613&classType=Class&levelId=&activeDays=&search=",
    },

    // Kids, broken out by season
    kids: {
      spring: "https://brooklinetennisacademy.gotimmy.com/pages/class?classType=Class&sessionId=3445&programId=1304,1305,1306,1307,1646&levelId=&activeDays=&search=",
      camp:   "https://brooklinetennisacademy.gotimmy.com/pages/camps?sessionId=0&programId=1301,1302,1313,1300,1299&levelId=&activeDays=",
    },

    // Counselor-in-Training program
    cit: {
      type: "link",
      url: "https://brooklinetennisacademy.gotimmy.com/pages/class?classType=Class&sessionId=0&programId=1337,1338&levelId=&activeDays=&search=",
    },
  },
};
