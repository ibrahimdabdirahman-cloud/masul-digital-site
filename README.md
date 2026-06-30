# Masul Digital — Website

Multi-page marketing site for **Masul Digital**, a local digital & AI services agency in South East London (SE18).

## Pages
A summary landing page links out to a dedicated page per section. Clean URLs are
enabled in `vercel.json`, so each `*.html` is served without its extension.

| URL            | File              | Purpose                                            |
|----------------|-------------------|----------------------------------------------------|
| `/`            | `index.html`      | Summary landing: hero, section cards, core services, how-it-works, showcase, pricing & FAQ teasers, contact |
| `/falcon`      | `falcon.html`     | Falcon AI receptionist                             |
| `/data-desk`   | `data-desk.html`  | Masul Data Desk (document cleanup)                 |
| `/ai-services` | `ai-services.html`| Claude AI tools / AI Services                      |
| `/pricing`     | `pricing.html`    | All pricing (tabbed: Falcon, AI, Data, Setup)      |
| `/faq`         | `faq.html`        | FAQ + contact form                                 |

Deep links: `/pricing#falcon`, `/pricing#ai`, `/pricing#data`, `/pricing#setup`
pre-select the matching pricing tab (handled in `assets/app.js`).

## Structure
```
index.html          Summary landing page
falcon.html …       One page per section
assets/styles.css   Base design tokens & components
assets/pages.css    Shared section/page components (linked on every page)
assets/app.js       Shared behaviour (nav, FAQ, pricing tabs, lead form)
sitemap.xml         Updated to the new clean URLs
```

## Deploy
Static site — no build step. Push to GitHub (auto-deploys via Vercel) or run
`npx vercel --prod`. Framework: Other. `cleanUrls` + redirects from the old
`/pages/*` URLs are configured in `vercel.json`.
