---
schema: 1
id: design-report-layout
kind: prompt
title: Design an annual or impact report layout
description: Designs the layout of an annual or impact report with a grid, type system, chart and photo treatment, a spread-by-spread pacing plan and an accessible PDF plan.
category: graphic-design
version: 1.0.0
status: incubating
stage: [design]
role: [graphic-designer, marketer, content-creator]
requires: [none]
inputs: [notes, document, text]
output: [docs, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [annual-report, impact-report, editorial-layout, grid-system, accessible-pdf, chart-styling]
pairs_with:
  prompts: [design-infographic, pair-typefaces, prepare-print-files, design-accessible-print-materials]
  personas: [art-director]
args:
  - name: content_outline
    description: The report's sections and what each contains (letters, highlights, stories, financials, data, photos), the main message, the audience (funders, shareholders, members, the public) and the deadline.
    type: text
    required: true
  - name: pages
    description: Target page count. For print, a multiple of four is usually needed for binding.
    type: number
    required: true
  - name: brand_guidelines
    description: Brand colours, typefaces, logo rules and photography style, or "none" if there are no guidelines.
    type: text
output_contract:
  format: markdown
  sections: [Concept, Format and grid, Type system, Colour, Charts and data, Photography and illustration, Pacing plan, Accessible PDF plan, Production notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Annual and impact reports are read in two ways: skimmed in a few minutes for the headline story and numbers, and searched later for specific facts. Most fail the skim: every page looks the same, the key results are buried in paragraphs, charts are decorated rather than clear, and photos are generic stock. Many also fail the search: a flattened PDF with no tags or reading order that screen-reader users cannot use, which matters because many organisations are now expected or required to publish accessible documents. A good layout sets a clear concept, a flexible grid, a disciplined type and chart system, and paces the report spread by spread so that the reader meets a strong opener, alternating rhythm and the numbers that matter.
</context>

<task>
Design the layout for a {{pages}}-page report.

<content_outline>
{{content_outline}}
</content_outline>

{{#brand_guidelines}}<brand_guidelines>
{{brand_guidelines}}
</brand_guidelines>
{{/brand_guidelines}}If brand guidelines are missing or "none", propose a restrained system and label it as a proposal.

1. **Concept:** a one-line idea that organises the report (for example "the year in ten numbers" or "voices from the field"), how it shows up in structure and visuals, and the headline message a skimmer should take away.
2. **Format and grid:** page size and orientation for print and screen (say if a landscape screen-first PDF suits the audience better), whether {{pages}} works for the binding method (round to a multiple of four for saddle stitch and say if it does not fit), a column grid (for example 12 columns with a baseline grid), margins, and three to five master layouts (section opener, story spread, data spread, text-heavy page, financial tables).
3. **Type system:** the typefaces (from the brand or proposed), and styles for display, headings, standfirsts, body, pull quotes, big numbers, captions, chart labels, footnotes and tables, with size, leading and use. Keep body text at a readable size for print and screen.
4. **Colour:** roles for brand colours, a chart palette that stays distinguishable for colour-blind readers and in greyscale, and contrast checks for text on colour (mark ratios to verify).
5. **Charts and data:** rules for choosing chart types (bars for comparison, lines for trends, avoid 3D and pie charts with many slices), direct labelling instead of legends where possible, a headline on each chart that states the finding, source lines, and a treatment for big standalone numbers with context (compared with what).
6. **Photography and illustration:** a direction that fits the concept (real people and places from the organisation over stock), captions that add information, consent for identifiable people in photos, and a fallback (illustration or typographic pages) if good photos are not available.
7. **Pacing plan:** a spread-by-spread plan for all {{pages}} pages: page numbers, content, master layout, and the visual weight (heavy image, data, text), alternating rhythm so no two text-heavy spreads run together. Place the strongest results early.
8. **Accessible PDF plan:** a tagged PDF with a logical reading order, real headings, alt text for every meaningful image and chart (with the data or a description), table headers, document title and language set, bookmarks, sufficient contrast, no information in colour alone, and a check with an accessibility checker plus a screen-reader spot check. Mention offering an HTML version. Tell the user to check the accessibility standard that applies to them.
9. **Production notes:** print specs to confirm with the printer, image resolution, file naming and a review schedule backwards from the deadline.
10. Before answering, check that the pacing plan adds up to exactly {{pages}} pages and that every section in the outline has a place.
11. If the outline is missing sections or the audience, ask for them and stop.
</task>

<constraints>
- Do not invent figures, quotes or stories for the report; use placeholders.
- Keep the system small enough for a non-specialist to maintain in a layout tool.
- Do not cite accessibility law as definitive; name the relevant kind of standard and tell the user to check.
{{> output/uncertainty}}
</constraints>

<output_format>
Markdown with the contract's sections in order. The type system and colour roles as tables. The pacing plan as a table (Pages, Content, Master layout, Visual weight). The accessible PDF plan as a checklist.
</output_format>
