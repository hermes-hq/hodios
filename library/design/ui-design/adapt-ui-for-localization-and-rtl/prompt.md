---
schema: 1
id: adapt-ui-for-localization-and-rtl
kind: prompt
title: Adapt UI for other languages and RTL
description: Reviews screens and specifies the design changes for new languages and right-to-left scripts, covering text expansion, truncation, mirroring, icons, fonts, formats and imagery.
category: ui-design
version: 1.0.0
status: incubating
stage: [design, review]
role: [designer, frontend-engineer, mobile-engineer, product-manager]
requires: [none]
inputs: [text, image, spec]
output: [table, checklist, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [localisation, right-to-left, text-expansion, mirroring, internationalisation]
pairs_with:
  prompts: [plan-rtl-support, review-i18n-readiness, write-ux-microcopy, create-wireframe-spec]
  personas: [product-designer]
args:
  - name: screens
    description: The screens or components to adapt (screenshots or descriptions with every label), the source language, and any known constraints such as fixed-width buttons, text baked into images, or truncated labels already seen.
    type: text
    required: true
  - name: target_languages
    description: The languages and regions being added, for example German, Arabic (Saudi Arabia), Japanese, Brazilian Portuguese.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Risk summary, Text expansion and truncation, Right-to-left mirroring, Typography, Formats and inputs, Imagery and content, Screen-by-screen changes, Testing plan]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Designs drawn in English break in predictable ways. Strings in languages such as German, Finnish or Russian often run around 30% longer than English, and short labels can double; fixed-width buttons, tabs and table headers then truncate or wrap. Arabic, Hebrew, Persian and Urdu need the layout mirrored, but not everything mirrors: media playback controls, clocks, logos, numbers, phone numbers and code keep their direction, while back and forward arrows, progress bars and sliders flip; chart time axes are a product decision to make explicitly. CJK text needs different line heights and has no spaces for wrapping. Dates, numbers, currencies, names and addresses follow regional formats, and imagery with text or gestures may not travel. Fixing these at design time is far cheaper than after translation.
</context>

<task>
<screens>
{{screens}}
</screens>

<target_languages>
{{target_languages}}
</target_languages>

If the screens cannot be judged from the input, ask for screenshots or full label lists and stop.

1. **Risk summary.** The three to five biggest problems for these languages on these screens.
2. **Text expansion and truncation.** Identify fixed-width elements and labels most likely to overflow; specify the rule for each (wrap, grow, stack, shorten the source, tooltip only as a last resort) and which strings need a shorter alternative from translators.
3. **Right-to-left mirroring.** If any target is RTL: what mirrors (layout, navigation, directional icons, progress, swipe directions) and what must not (media controls, logos, phone numbers, code, some charts), plus mixed-direction text such as product names and URLs inside RTL sentences.
4. **Typography.** Fonts that cover the scripts, line height and size adjustments, no all-caps or italics for scripts that lack them, and minimum sizes for complex scripts.
5. **Formats and inputs.** Dates, times, numbers, currency, units, name fields (single versus split, order), address forms by country, phone input, sorting and keyboard input types.
6. **Imagery and content.** Text in images, icons and gestures with cultural meaning, examples and placeholder names, colours with different associations, and screenshots in help.
7. **Screen-by-screen changes.** Concrete changes per screen and component.
8. **Testing plan.** Pseudo-localisation with expanded and accented strings, an RTL pass, real-translation review by native speakers on device, and screenshot checks per locale.
</task>

<constraints>
- Do not translate the content yourself as final copy; flag strings and give guidance for translators.
- Do not assume a single convention per language when it varies by region; state the region assumed.
- Do not claim exact expansion percentages for specific strings; give typical ranges and mark them as estimates.
- Code-level internationalisation is out of scope; mention engineering dependencies only where design relies on them.
{{> output/uncertainty}}
</constraints>

<output_format>
## Risk summary
## Text expansion and truncation
| Element | Risk | Rule |
## Right-to-left mirroring
| Element | Mirror | Notes |
## Typography
## Formats and inputs
## Imagery and content
## Screen-by-screen changes
## Testing plan
</output_format>
