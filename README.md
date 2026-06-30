# Finney's Resume Studio — Website

The official website for **Finney's Resume Studio** (Laura Finney) — professional resume writing,
ATS-compatible rewrites, cover letter templates, and LinkedIn profile optimization.

> *Crafted careers. Elevated stories.*

🔗 **Live site:** https://finneysresumestudio-create.github.io/

## About

A fast, fully static, single-page marketing site built with plain HTML, CSS, and vanilla
JavaScript — no build step, no dependencies, hosted on GitHub Pages. It covers everything a
prospective client needs: services, pricing, real before-and-after transformations, client
stories, the get-started flow, Laura's bio, and a full FAQ.

## Structure

```
.
├── index.html        # Single-page site (all sections)
├── agreement.html    # Print / save-as-PDF version of the Services Agreement
├── css/
│   └── styles.css    # Design system + all component styles
├── js/
│   └── main.js       # Nav, pricing toggle, before/after switcher, lightbox, FAQ, reveals
├── assets/
│   ├── img/          # Logo, headshot, favicon, pricing, transformations, templates
│   └── docs/         # Services Agreement (.docx) + Cover Letter Anatomy (PDF)
├── Data/             # Original source materials provided by the client
└── .nojekyll         # Serve all asset paths verbatim on GitHub Pages
```

## Sections

1. **Hero** — brand promise + live before/after preview
2. **Services** — Resume Transformation & LinkedIn Transformation
3. **Pricing** — Standard vs. Full packages, three career tiers each (toggle)
4. **Transformations** — interactive before/after gallery with lightbox
5. **Client Stories** — testimonials
6. **Start Your Project** — sign the agreement, pick a template, complete the Story Builder Profile, 30-day timeline
7. **About Laura** — bio, credentials, experience
8. **FAQ** — categorized, accordion

## Editing common content

| What to change | Where |
| --- | --- |
| Prices / package features | `index.html` → `#pricing` (two grids: `#grid-standard`, `#grid-full`) |
| Contact email | search `finneyresumestudio@gmail.com` across `index.html` & `agreement.html` |
| Testimonials | `index.html` → `#stories` |
| FAQ answers | `index.html` → `#faq` |
| Brand colors | `css/styles.css` → `:root` tokens |
| Transformations / templates | replace images in `assets/img/` and update arrays in `js/main.js` |

## Local preview

It's a static site — just open `index.html` in a browser, or serve the folder:

```bash
python -m http.server 8080   # then visit http://localhost:8080
```

## Deployment

Push to the `main` branch. In the repository's **Settings → Pages**, set the source to
**Deploy from a branch** → `main` / `root`. GitHub Pages publishes automatically.

---

© Finney's Resume Studio. Branding, templates, and materials are the exclusive property of
Finney's Resume Studio.
