# Deployment

## Intended production configuration

- Repository: `WhyTrashEarth/GlyphGuardian`
- Branch: `main`
- Cloudflare Pages project: `glyphguardian`
- Framework: none
- Build: `npm test && npm run check`
- Output: `site`
- Node.js: 24
- Canonical origin: `https://glyphguardian.com`
- `www.glyphguardian.com`: permanent redirect to the canonical origin, preserving path and query.
- No Web Analytics injection is required.

## Release checks

Run the unit tests and static checks, inspect desktop and mobile rendering, then verify the deployed custom origin separately from the Pages build. Check the lab, favicon, 1200 × 630 sharing PNG, absolute social/canonical URLs, robots/sitemap, 404 status, redirect paths/queries, and response privacy/security headers. Inspect served HTML for unexpected analytics or third-party scripts.

## Previous routing and rollback

Before the October 2026 relaunch, the proxied apex had A records `44.227.65.245` and `44.227.76.166`; `www` was a proxied CNAME to `pixie.porkbun.com`. Those origins returned Cloudflare errors during the audit. The wildcard, legacy apex NS, verification TXT, and ACME TXT records are unrelated to the new website and should be preserved.

A future site regression can be rolled back with Cloudflare Pages' deployment rollback or a Git revert. Restoring the former DNS values restores the old routing, not a known-working website. Do not delete the zone or replace unrelated records.

## Outstanding .org

`glyphguardian.org` was absent from the account, returned NXDOMAIN, and the Public Interest Registry RDAP endpoint returned 404 on October 24, 2026. No redirect can be claimed until registration/control is established and both HTTPS and HTTP routes are verified. Domain purchase is not part of this deployment.
