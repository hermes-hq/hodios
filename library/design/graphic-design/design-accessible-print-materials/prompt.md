---
schema: 1
id: design-accessible-print-materials
kind: prompt
title: Design accessible print materials
description: Designs print materials that work for low-vision, dyslexic and older readers, specifying type, contrast, layout, paper and finish, plain language and the alternative formats to offer.
category: graphic-design
version: 1.0.0
status: incubating
stage: [design, review]
role: [graphic-designer, teacher, marketer]
requires: [none]
inputs: [text, document, image]
output: [docs, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [accessible-print, large-print, low-vision, dyslexia-friendly, clear-print, alternative-formats]
pairs_with:
  prompts: [prepare-print-files, plan-signage, pair-typefaces, design-report-layout]
  personas: [art-director]
args:
  - name: material
    description: What is being printed, for example "patient information leaflet", "school newsletter", "museum gallery guide", "polling station instructions", "restaurant menu".
    type: string
    required: true
  - name: audience
    description: Who reads it and how, including any known needs, for example "parents, many with English as a second language, some with dyslexia; read at home" or "older visitors reading while standing in dim galleries".
    type: text
    required: true
  - name: constraints
    description: Size, page count, budget, brand rules, print method or anything fixed, for example "A5 folded leaflet, two colours, brand font is a light condensed sans".
    type: text
output_contract:
  format: markdown
  sections: [Reader needs, Typography, Colour and contrast, Layout and navigation, Language and content, Images and diagrams, Paper and finish, Alternative formats, Checklist before print]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Print accessibility gets less attention than web accessibility, but the same readers struggle: people with low vision, colour vision deficiency, dyslexia, cognitive disabilities or low literacy, older readers, and people reading in a second language. Common barriers are small or light type, condensed or decorative fonts, text over images, justified text with uneven spacing, glossy paper that reflects light, colour used as the only signal, dense paragraphs and jargon. Clear print guidance from sight-loss and dyslexia organisations converges on the same principles, and most of them cost nothing. The design should also offer the material in other formats (large print, audio, easy read, accessible digital) for people who cannot use standard print at all.
</context>

<task>
Design an accessible {{material}}.

<audience>
{{audience}}
</audience>

{{#constraints}}<constraints_given>
{{constraints}}
</constraints_given>
{{/constraints}}
1. **Reader needs:** from the audience, list the reading needs to design for and the reading conditions (lighting, distance, time, standing or seated). Note needs the audience description does not mention but the material's public use makes likely.
2. **Typography:** a typeface style (a clear sans or a sturdy serif with open counters and distinct letterforms such as I, l and 1), sizes for body, headings and small print (clear print guidance typically suggests a minimum of 12 to 14 pt for general audiences and 16 to 18 pt or more for large print), regular or medium weights rather than light, sentence case rather than all capitals, generous leading (about 1.5 times the size), left alignment without justification, no italics or underlining for long passages, and no text set on curves or at angles.
3. **Colour and contrast:** strong contrast between text and background (dark text on a plain light, off-white or cream background often suits dyslexic readers), no text over photos or patterns, colour never the only carrier of meaning, and a check in greyscale.
4. **Layout and navigation:** a clear hierarchy with real headings, short sections, generous margins and space, consistent placement of key information, no text split across folds or columns that break mid-sentence, page numbers and a contents list for longer documents, and wide margins near binding.
5. **Language and content:** plain language (short sentences, common words, active voice, one idea per paragraph), key information first, numbered steps for instructions, defined terms, and bullet lists for options. Give a before-and-after rewrite of one sample paragraph from the inputs if the user supplied text; otherwise a generic example for this material.
6. **Images and diagrams:** meaningful, high-contrast images with captions, simple diagrams with labels rather than legends, icons always paired with words.
7. **Paper and finish:** matte or uncoated paper to reduce glare, sufficient weight to prevent show-through, and finishes to avoid (gloss lamination, metallic inks for text).
8. **Alternative formats:** which to offer for this material (large print, audio, braille, easy read, accessible PDF or web page, translated versions), how readers request them (stated clearly on the cover or first page in large type), and production notes for each.
9. **Checklist before print:** a short checklist the designer can tick, including a test with a few readers from the audience.
10. If constraints conflict with accessibility (for example a brand font that is light and condensed, or a tiny format), explain the trade-off and propose a compromise such as a heavier weight, a larger format or the brand font for headings only.
11. Before answering, re-check every recommendation against the stated constraints and the material's purpose.
</task>

<constraints>
- Present type sizes and ratios as common guidance, not law; tell the user to check any standard their sector must follow.
- Do not recommend special "dyslexia fonts" as a fix on their own; evidence for them is mixed. Spacing, size and layout matter more.
- Keep the design attractive; accessible does not mean dull.
</constraints>

<output_format>
Markdown with the contract's sections in order. Typography as a table (Element, Typeface style, Size, Weight, Leading, Notes). The language rewrite as a two-column table (Before, After). The pre-print checklist as tick boxes.
</output_format>
