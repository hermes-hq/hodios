---
schema: 1
id: review-color-contrast
kind: prompt
title: Review colour contrast and fix the palette
description: Checks colour pairs or design tokens against contrast requirements and proposes the nearest passing alternatives that keep the brand hue. Use when defining or auditing a palette or theme.
category: accessibility
version: 1.0.0
status: incubating
stage: [review, design]
role: [designer, frontend-engineer]
requires: [none]
inputs: [text, config]
output: [table, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [color-contrast, wcag, apca, design-tokens]
pairs_with:
  personas: [accessibility-specialist]
args:
  - name: palette
    description: Colours or design tokens as hex, rgb(), hsl() or oklch(), with names. Include alpha if any colour is translucent.
    type: text
    required: true
  - name: usage
    description: Which pairs appear together and how, for example "text-muted on surface, 14px regular". Leave empty to check every foreground against every background.
    type: text
  - name: standard
    description: "wcag2-aa: 4.5:1 text, 3:1 large text and UI. wcag2-aaa: 7:1 and 4.5:1. apca: advisory Lc targets from the WCAG 3 drafts."
    type: enum
    enum: [wcag2-aa, wcag2-aaa, apca]
    default: wcag2-aa
output_contract:
  format: markdown
  sections: [Results, Fixes, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Contrast reviews go wrong in three ways: the ratio is estimated by eye instead of computed, a 4.47:1 result is rounded up to "4.5, passes", and the suggested fix swaps the brand colour for a generic grey or breaks three other pairs that share the token. The useful answer is exact numbers, the smallest change that passes, and a check that the change holds everywhere the token is used.
</context>

<task>
Check this palette against {{standard}}:

{{palette}}

Usage: {{usage}} (if empty, test every plausible foreground against every background, and say that you assumed the usage).

1. Normalise every colour to sRGB hex. Composite any translucent colour over the background it actually sits on before measuring, and show the composited hex. If that background is unknown, composite it over every background in the palette it could sit on, report the worst result, and say so.
2. Compute, do not estimate. If you can run code, do. Otherwise show the working for at least the failing pairs.
   - **WCAG 2:** relative luminance from linearised sRGB channels (threshold 0.04045, then `((c + 0.055) / 1.055) ^ 2.4`, weighted 0.2126 R + 0.7152 G + 0.0722 B), then ratio = (L1 + 0.05) / (L2 + 0.05). Truncate to two decimals; never round up to a pass.
   - **Thresholds:** wcag2-aa needs 4.5:1 for normal text and 3:1 for large text (at least 24 px, or 18.66 px bold) and for UI components and meaningful graphics (SC 1.4.11). wcag2-aaa needs 7:1 and 4.5:1 for text; non-text stays 3:1.
   - **APCA:** report the signed Lc value (polarity matters) and judge it against the usage's font size and weight. Lc 75 is the usual minimum for body text, 90 preferred; lower values apply only to larger or bolder text. APCA cannot be done reliably by hand: if you cannot run the APCA-W3 algorithm in code, give an approximate Lc marked "≈", say so in Notes, and also report the WCAG 2 ratio. Say clearly that APCA is not a WCAG 2 conformance test.
3. For every failing pair, propose fixes that keep the hue: adjust lightness in OKLCH, holding hue fixed and reducing chroma only if the colour leaves the sRGB gamut, until the pair just passes. Offer both directions (darken the foreground, or lighten or darken the background) when both are viable, and name the one that changes the brand less.
4. Re-check each proposed colour against every other pair that uses the same token, and report any new failure. A token that is both a background for light text and a foreground on a dark surface can be pulled in opposite directions; when no single value passes both, say so and propose splitting the token.
5. If the palette has no text colours or no background colours, or the usage is too vague to tell text from UI, ask instead of guessing.
</task>

<constraints>
- Never mark a pair as passing on a rounded value.
- Do not judge aesthetics. Do not change colours that already pass unless a shared token forces it.
- Disabled controls and pure decoration are exempt from WCAG 2 contrast. Mark them exempt, not failing, and only when the usage says so.
{{> output/uncertainty}}
</constraints>

<output_format>
## Results
| Foreground | Background | Usage | Ratio or Lc | Required | Result (pass / fail / exempt) |

## Fixes
| Token | Original | Proposed | New ratio or Lc | Direction | Other pairs affected |

## Notes
Assumptions, any translucent colours, and the method used (computed by code or by hand).
</output_format>

<examples>
<example>
`#777777` text on `#FFFFFF`, 16 px regular, wcag2-aa: ratio 4.47:1 (4.478 truncated), fails (needs 4.5:1). Nearest fix keeping the neutral hue: `#767676` gives 4.54:1, passes.
</example>
</examples>
