# GlyphGuardian — Technical Notes 🛡️

---

## Core Innovations

GlyphGuardian protects users by performing two types of checks:

### 1. Visual Character Inspection
- Identifies lookalike domains by comparing visual similarities (e.g., "Yоutube.com" where the "o" is Cyrillic).
- Alerts users when domains appear visually suspicious or contain mixed character sets.

### 2. Unicode Value Verification
- Goes deeper than traditional visual checks.
- Analyzes the actual **Unicode codepoints** of every character in the URL.
- Detects when non-standard Unicode characters are used to spoof legitimate domains.
- Example:
  - Latin "A" (U+0041) vs Cyrillic "А" (U+0410) — they *look identical* but have different Unicode values.

**This two-layered approach dramatically increases detection accuracy** without relying solely on predefined blacklists or simple visual cues.

---

## Future Expansion

- Whitelisting verified international domains (to prevent false positives)
- Browser-based "safe link" extensions
- Thunderbird, Outlook, and email client integrations
- Lightweight open API for organizations

---

## Why Unicode Verification Matters

Modern phishing attacks use *visual deception* based on Unicode similarity.  
Most users — and even trained security professionals — cannot spot the difference with the naked eye.

**By inspecting the actual Unicode values in real time, GlyphGuardian provides deeper and earlier warning signals before harm occurs.**

---

## License

Licensed under the [MIT License](LICENSE).

Created by **Alec AKA Chunks / WhyTrashEarth**

ΧΟΥΑΙ ΤΡΑΣ ΕΡΘ 1796

---
