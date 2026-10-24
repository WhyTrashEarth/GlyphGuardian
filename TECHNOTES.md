# GlyphGuardian — Technical notes

## Current implementation

The dependency-free static website lives in `site/`. `inspector.js` is a pure character-inspection module; `app.js` renders the result using DOM creation and `textContent` rather than HTML injection. Tests run with Node's built-in test runner.

The lab preserves input exactly and iterates Unicode code points with `Array.from`. It displays at most 100 code points, reports truncation, and distinguishes code points from grapheme clusters. Combining marks receive a dotted-circle visual aid. Control/format characters are shown as placeholders so they cannot reorder the result display.

Writing-system labels use JavaScript Unicode property escapes for a defined set of scripts. Other scripts are labeled as such. The character-name map is deliberately small; unknown names are labeled “Unicode character,” not invented. Mixed writing systems are an observation, not evidence of fraud. A small illustrative set of look-alikes receives emphasis in mixed-script examples.

## Limitations

- Not a safety verdict, URL parser, reputation check, scanner, or browser extension.
- No full Unicode Character Database names or UTS #39 confusable-skeleton implementation.
- No normalization, IDNA validation, Punycode decoding, trusted-domain matching, or automatic blocking.
- Fonts and rendering can change how similar characters appear.
- Legitimate names and addresses can contain non-Latin letters and multiple writing systems.

For further research: [Unicode Security Mechanisms (UTS #39)](https://www.unicode.org/reports/tr39/).

## Privacy and delivery

No fetch requests, input persistence, telemetry, or third-party client assets are included. Fonts are self-hosted. Cloudflare receives ordinary hosting requests; this is separate from inspecting text, which remains inside the tab. The response policy blocks outgoing connections from the site JavaScript, plugins, framing, and form submissions.

The original design notes remain in `docs/history/TECHNOTES-2025.md`; their proposed protections and accuracy claims are not established results.
