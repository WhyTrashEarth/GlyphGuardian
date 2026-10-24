# GlyphGuardian

**Looks right. Look again.**

[Visit glyphguardian.com](https://glyphguardian.com) · [Contact / contribute](https://github.com/WhyTrashEarth/GlyphGuardian/issues) · [Roadmap](ROADMAP)

GlyphGuardian is an independent, open-source project exploring Unicode look-alike characters and clearer digital identities. Created by Alec / WhyTrashEarth.

## Available now

- An accessible, responsive website explaining character-based deception.
- An educational character lab that reveals exact Unicode code points and broad writing-system labels.
- Examples of look-alike letters, legitimate multilingual text, and hidden characters.
- Browser-local processing: no input uploads, account, saved history, analytics code, or third-party fonts.

The lab **does not determine whether a link is safe**. It does not open addresses, check reputation, decode Punycode, normalize text, or implement the complete Unicode confusables algorithm. Browser extensions, automatic protection, and integrations remain future work. See [technical notes](TECHNOTES.md).

## Local development

Requires Node.js 22 or newer. No packages need installing.

```sh
npm run dev
npm test
npm run check
```

Open `http://127.0.0.1:4173`. The local server sends a noindex header; the production files allow indexing. The deployable static site is `site/`.

## Deployment

Cloudflare Pages serves the `site/` directory from the `main` branch. The production build command is `npm test && npm run check`. The canonical website is **https://glyphguardian.com**. See [deployment notes](docs/DEPLOYMENT.md) for configuration and verification.

## Credits and history

The 2026 redesign uses the project's original bark photograph, supplied by Alec, and the black, white, and pink identity visible in the [archived website](https://web.archive.org/web/20251027230802/https://glyphguardian.com/). The supplied original is preserved outside the repository; only its optimized web derivative is shipped. [Asset notes](docs/ASSETS.md).

Thank you to the **Porkbun team** for early feedback and suggestions. The original 2025 planning documents are preserved in [docs/history](docs/history/). They describe aspirations, not verified shipped protection or measured security performance.

Code: [MIT License](LICENSE). Fonts: SIL Open Font License; license files are included beside the fonts. Please do not post private links, credentials, or secrets in public GitHub Issues.
