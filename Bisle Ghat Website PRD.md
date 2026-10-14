# Bisle Ghat Website PRD

Oct 14, 2026 · @Harsh

## Overview

A simple, mobile-first, single-page website that tells visitors what Bisle Ghat is, what to see there, when to go and how to reach it. Bisle Ghat is a forested stretch of the Western Ghats between Kukke Subramanya and Sakleshpur in Karnataka, known for its shola forest and its viewpoint over three mountain ranges.

The page has one job: help a first-time visitor decide to go and plan the trip in under two minutes.

## Goals and non-goals

**Goals**

- Give an accurate, readable introduction to Bisle Ghat.
- Answer the four planning questions: what to see, when to go, how to get there, what to carry.
- Load fast and read well on a phone, since visitors will often be on mobile data.
- Be easy to extend later with more photos or sections.

**Non-goals for version 1**

- No booking, payments, user accounts or backend.
- No accommodation listings, because sources say there is none inside the reserve forest.
- No live weather or maps embedded in the page; link out to Google Maps instead.

## Target users

| User | What they need |
| --- | --- |
| Weekend road-trippers from Bengaluru and Mangaluru | Drive routes, distances, what the viewpoint offers, how long to stay |
| Trekkers | Season advice, nearby treks such as Kumara Parvatha and the Green Route |
| Nature and bird photographers | Viewpoints, wildlife, best months |
| Pilgrims at Kukke Subramanya | A short side trip to add to their visit |

## Site structure and content

One scrolling page with a sticky top navigation. Each section below is one block on the page.

| Section | Content |
| --- | --- |
| Hero | Name, one-line tagline, a full-width photo, a button to the How to reach section |
| About | Part of the Western Ghats between Kukke Subramanya and Sakleshpur. Has the largest extent of shola forest in Karnataka. No human habitation inside the forest. Rich wildlife |
| Viewpoints | Bisle Ghat viewpoint: a small platform on a quiet road through the reserve forest, with views of Kumara Parvatha, Pushpagiri and Patta Betta. Yellathur viewpoint on the road from Subramanya |
| Things to do | Viewpoint visit, birdwatching (hornbills), Kumara Parvatha trek, Green Route railway trek, Kukke Subramanya temple |
| Best time to visit | September to December is best for trekking. Monsoon is lush and wet. Any season has views |
| How to reach | By road from Sakleshpur or Kukke Subramanya. Bengaluru is about 220 km from Sakleshpur and Mangaluru about 130 km. Nearest railway station is Sakleshpur. Button linking to Google Maps |
| Travel tips | Little or no mobile network. No accommodation or facilities at the viewpoint. Carry water and food. Respect the forest and take your waste back |
| Gallery | 6 to 9 photos in a responsive grid |
| Footer | Source credits, photo credits, last-updated date |

## Functional requirements

- Sticky navigation with links that scroll to each section; collapses to a menu button on phones.
- Hero button scrolls to How to reach.
- A "Open in Google Maps" link that opens in a new tab.
- Photo gallery grid with a simple click-to-enlarge view and alt text on every image.
- Best time to visit shown as a 12-month strip with the recommended months highlighted.
- A short "Before you go" checklist in Travel tips.
- Light and dark appearance that follows the visitor's device setting.

## Non-functional requirements

- **Mobile first:** works at 360 px width with no horizontal scrolling.
- **Speed:** page weight under 2 MB on first load; images compressed, in WebP, with lazy loading below the fold.
- **Accessibility:** text contrast of at least 4.5:1, keyboard-reachable navigation, alt text on all images.
- **SEO:** page title, meta description, Open Graph image, and a heading order that makes sense.
- **Browsers:** current Chrome, Safari, Firefox and Edge.

## Design direction

- **Mood:** misty, quiet, forest-deep. Photography leads and text stays short.
- **Colour:** deep forest green and slate-blue mist as the base, with one warm accent for buttons and the highlighted months. Avoid a plain white-and-green template look.
- **Type:** one expressive serif for headings and one clean sans-serif for body text, both from Google Fonts.
- **Imagery:** real photos of the viewpoint, the ridge lines and the forest road, taken or licensed by you. Do not use stock photos of other places.
- **Layout:** wide hero, then alternating text and image blocks, with generous spacing.

## Tech stack and hosting

A static site is enough. There is no data to store and no login.

| Layer | Choice |
| --- | --- |
| Markup and styles | HTML and CSS, in `index.html` and `style.css` |
| Behaviour | A small `script.js` for the menu, gallery viewer and scroll links |
| Images | WebP, resized to a maximum of 1600 px wide |
| Hosting | GitHub Pages, Netlify or Vercel, all free for a static site |
| Version control | Git, with the repo on GitHub |

## Facts to verify and content rules

Sources disagree on some details, so confirm these before publishing.

| Fact | Issue |
| --- | --- |
| Viewpoint distance from Sakleshpur | Karnataka Tourism says about 42 km; a travel operator says about 25 km. Check on Google Maps |
| Yellathur viewpoint | One article puts it 26 km from Subramanya. Check on the road |
| Mobile network | An older article says there is none. Check on site, since coverage may have changed |

**Content rules**

- Do not invent phone numbers, prices, opening hours or entry fees.
- Use only photos you took or have licence to use, and credit them in the footer.
- Show a last-updated date in the footer.

**Sources**

- [Deccan Herald: Bisle, heaven on earth](https://www.deccanherald.com/archives/bisle-heaven-earth-2504864)
- [Karnataka Tourism: Places to see in Sakleshpur](https://karnatakatourism.org/places-to-see-in-sakleshpur)
- [Tejas Travels: Sakleshpur places to visit](https://tejastravels.com/bangalore-to-sakleshpur-tempo-traveller)

## Milestones, success measures and open questions

**Build order**

1. Collect and verify content, and gather photos.
2. Build the page structure and mobile layout.
3. Add styling, gallery and the best-time strip.
4. Test on a real phone, fix issues, then deploy.

**Success measures**

- Loads in under 3 seconds on a mobile connection.
- Passes a Lighthouse check with 90 or more for Performance, Accessibility and SEO.
- A first-time visitor can find the route and best season without scrolling back and forth.

**Open questions**

- [ ] Is this for tourists in general, or for a college project with its own grading rules?
- [ ] Which languages are needed: English only, or English and Kannada?
- [ ] Do you have your own photos of Bisle Ghat?
- [ ] Do you want a custom domain?
