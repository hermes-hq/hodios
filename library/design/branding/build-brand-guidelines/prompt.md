---
schema: 1
id: build-brand-guidelines
kind: prompt
title: Write brand guidelines
description: Writes brand guidelines covering logo use, colour, typography, imagery, voice, applications and do and don't examples as a structured document. Use when a team formalises its brand.
category: branding
version: 1.0.0
status: incubating
stage: [design, ship]
role: [designer, graphic-designer, marketer, founder]
requires: [none]
inputs: [text, document]
output: [docs, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [brand-guidelines, brand-book, logo-usage, visual-identity, brand-consistency]
pairs_with:
  prompts: [build-brand-platform, write-brand-voice-guide, design-presentation-template, design-social-media-templates, define-iconography]
  personas: [brand-strategist]
args:
  - name: brand_assets
    description: Everything that exists - logo versions and files, colour values (HEX, RGB, CMYK, Pantone), fonts and licences, imagery and illustration style, icons, the brand platform or positioning - and who will use the guidelines.
    type: text
    required: true
  - name: voice
    description: How the brand writes - voice attributes, sample copy, or an existing voice guide to summarise. Optional; without it the voice section lists what must be decided.
    type: text
output_contract:
  format: markdown
  sections: [Brand on a page, Logo, Colour, Typography, Imagery, Graphic elements, Voice and tone, Applications, Accessibility, Do and don't, Governance and assets]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Brand guidelines often end up as a 90-page PDF that nobody opens: beautiful mood pages, vague rules ("use the logo with care"), colour values missing for print, no guidance for the documents people actually make, and nothing about who to ask. Guidelines get used when they answer the questions a busy marketer, salesperson, agency or developer has at the moment of making something: which logo, which colour code, which font, how much space, and what not to do, with examples.
</context>

<task>
Write brand guidelines from these assets.

<brand_assets>
{{brand_assets}}
</brand_assets>
{{#voice}}
<voice>
{{voice}}
</voice>
{{/voice}}

1. **Inventory first.** List what was supplied and what is missing for complete guidelines (for example CMYK values, a one-colour logo, font licences for web use, a dark-background logo). Missing items appear in the document as [TBD] with what is needed. If almost nothing was supplied (no logo description, no colours, no fonts), ask for the assets and stop.
2. **Brand on a page.** Positioning, purpose, personality and brand idea in a few lines, from the material given; if no platform exists, say so and keep this section to what is known.
3. **Logo.** Each version (primary, secondary or stacked, symbol only, one-colour, reversed) and when to use it; clear space defined by a unit of the logo itself (for example the height of a letter); minimum sizes for print (mm) and screen (px); placement rules; backgrounds allowed; co-branding with partners; and at least eight misuses (stretching, recolouring, adding effects, rotating, outlining, placing on busy images, rearranging elements, recreating the wordmark in another font).
4. **Colour.** Primary, secondary and neutral colours with every format supplied (HEX, RGB, CMYK, Pantone), their roles and rough proportions in a typical layout, approved text and background pairs with WCAG 2 contrast ratios computed from the HEX values (4.5:1 for body text, 3:1 for large text and graphics; show the ratio to one decimal place, and write "to check" for any pair you could not compute rather than estimating), and colours for data visualisation if relevant.
5. **Typography.** Typefaces with weights, roles and hierarchy (headline, subhead, body, caption), sizes and line spacing as relative rules, fallback or system fonts for documents and email, and the licence note for each use (desktop, web, app).
6. **Imagery.** Photography style (subjects, light, composition, diversity and authenticity, what never to use), illustration style, and icon style, each with how to brief a photographer or illustrator.
7. **Graphic elements.** Patterns, shapes, frames, grids and how they combine with type and imagery.
8. **Voice and tone.** From the voice input: a short summary, attributes as "X, not Y", tone by situation and four before-and-after examples. Without voice input, list the decisions still to make and point to a dedicated voice guide.
9. **Applications.** Rules and a described example for the brand's most common touchpoints (choose from the assets and the users: website, social posts, presentation, email signature, business card, packaging, signage, merchandise, job ads).
10. **Accessibility.** Minimum contrast for text and graphics, minimum text sizes, alt-text habits, and not relying on colour alone.
11. **Do and don't.** Eight to twelve pairs across the whole system, each a concrete example.
12. **Governance and assets.** Who owns the brand and approves exceptions, where the master files live, the file formats to use for each purpose (vector for print, PNG or SVG for screen), naming conventions, and how the guidelines are updated and versioned.
</task>

<constraints>
- Never invent colour values, font names, logo versions or rules for assets you were not given. Use [TBD].
- Rules must be specific and checkable: a number, a named version, or an example, never "use carefully".
- Keep it as short as the brand's complexity allows. A small business needs a few pages, not a book.
</constraints>

<output_format>
Markdown with the contract's sections as `##` headings, preceded by a short "Asset inventory" list of what was supplied and what is TBD. Colour as a table: | Name | Role | HEX | RGB | CMYK | Pantone |. Approved pairs as a table: | Text | Background | Contrast | Use |. Do and don't as a two-column table.
</output_format>
