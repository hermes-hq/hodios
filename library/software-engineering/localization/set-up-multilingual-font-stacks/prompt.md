---
schema: 1
id: set-up-multilingual-font-stacks
kind: prompt
title: Set up font stacks for many scripts
description: Builds web or app font stacks that render every target script well, with per-language fallbacks, CJK glyph variants, line height for tall scripts, subsetting and loading that does not stall pages.
category: localization
version: 1.0.0
status: incubating
stage: [design, build]
role: [frontend-engineer, designer, mobile-engineer]
requires: [none]
inputs: [config, text]
output: [code, config, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [typography, web-fonts, cjk]
pairs_with:
  prompts: [plan-rtl-support, fix-text-expansion-layout-bugs]
args:
  - name: current_fonts
    description: Current font setup, such as CSS font-family declarations, @font-face rules, the brand typeface and its licence terms if known, and the platform (web, React Native, Flutter, native).
    type: text
    required: true
  - name: locales
    description: Locales to support, for example "en, vi, ru, el, ar, hi, th, ja, zh-Hans, zh-Hant, ko".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Script coverage, Font stacks, Language-specific rules, Loading strategy, Checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A Latin brand font covers English and maybe Western European accents; everything else falls back to whatever the OS picks, character by character. The results: Vietnamese with stacked diacritics in two mismatched fonts, Arabic in a system font far heavier than the Latin, Japanese pages showing Chinese glyph shapes because the stack names a Simplified Chinese font first (the same Unicode code points have different preferred forms in Japanese, Simplified Chinese, Traditional Chinese and Korean), and Thai or Devanagari clipped by a tight line height. Fonts for CJK are several megabytes, so self-hosting one file blocks rendering unless it is split with `unicode-range` subsets. Faux bold and italic from the browser look poor in scripts that have no italic tradition. The `lang` attribute is what lets the browser or OS pick the right glyph variant and line-breaking rules.
</context>

<task>
Design font stacks for:

{{current_fonts}}

Locales: {{locales}}.

1. Coverage: for each locale, which script it uses and whether the current fonts cover it, including Vietnamese, Polish and other extended Latin, Cyrillic, Greek, Arabic, Hebrew, Devanagari, Thai and the CJK variants.
2. Choose fonts per script that pair with the brand typeface in weight and x-height, preferring widely available open-licensed families (for example the Noto families) or system fonts per platform; say what to check in each font's licence for self-hosting and app embedding.
3. Write the stacks. On the web, use `:lang()` selectors (or per-language CSS variables) so `ja`, `zh-Hans`, `zh-Hant` and `ko` each get their own CJK font first, and end each stack with platform system fonts and a generic family. On native platforms, describe the equivalent (font fallback lists, `Locale`-aware text styles).
4. Language-specific rules: line height for tall scripts, no synthetic italic or bold where the script lacks them (`font-synthesis: none` or styled alternatives such as weight), letter spacing set to zero for Arabic and other connected scripts, and font size adjustments only where the script reads small at the same size.
5. Loading: `unicode-range` subsets or the provider's split files for CJK, `font-display` choice with its trade-off, preloading only the primary Latin font, and avoiding layout shift with metric overrides (`size-adjust`, `ascent-override`) where supported.
6. Checks: a test page with a sentence per locale in regular and bold, mixed-script lines (Latin inside Arabic or Japanese), and screenshots on Windows, macOS, Android and iOS.
</task>

<constraints>
- Do not claim a font covers a script or a licence permits a use unless the user confirmed it; mark both as things to check.
- Do not set one global CJK font for all of Chinese, Japanese and Korean.
- Keep the brand Latin font first for Latin text.
{{> output/uncertainty}}
</constraints>

<output_format>
## Script coverage
| Locale | Script | Covered by current fonts | Fallback chosen |

## Font stacks
CSS or platform code.

## Language-specific rules
Rules with the reason for each.

## Loading strategy
Decisions and code.

## Checks
Test page content and device checklist.
</output_format>
