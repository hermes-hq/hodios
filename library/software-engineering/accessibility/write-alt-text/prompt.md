---
schema: 1
id: write-alt-text
kind: prompt
title: Write alt text for images
description: Writes context-aware alt text for images on a page or in a document, or marks them decorative, following the W3C alt decision tree. Use when publishing images on the web.
category: accessibility
version: 1.0.0
status: incubating
stage: [build]
role: [writer, editor, frontend-engineer, content-creator]
requires: [none]
inputs: [image, document, text]
output: [table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [alt-text, wcag, images]
args:
  - name: images
    description: The images themselves, or for each one its file name, a description and any text it contains, plus whether it is inside a link or button.
    type: text
    required: true
  - name: page_context
    description: The page or document the images appear in, its purpose, and the text around each image.
    type: text
    required: true
  - name: max_chars
    description: Soft length limit for the alt attribute. Longer explanations go in a long description instead.
    type: number
    default: 125
output_contract:
  format: markdown
  sections: [Alt text, Markup, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Alt text is not a description of the picture. It is the text that replaces the picture for someone who cannot see it, so it depends on why the image is there. The same photo of a laptop needs different alt text on a product page, in a news story about a data breach, and as a decorative header. Common failures: "image of...", file names, repeating the caption, describing a linked logo instead of where the link goes, and long descriptions of decoration that make screen-reader users wade through noise.
</context>

<task>
Write alt text for these images:

{{images}}

Page context:

{{page_context}}

For each image, walk the W3C alt decision tree in this order and record which branch applied:
1. **Contains text?** If the same text is already next to the image, use `alt=""`. If the text is only a visual effect, use `alt=""`. Otherwise the alt is that text.
2. **Inside a link or button, or the only content of one?** The alt describes the destination or action ("Acme home", "Search"), not the picture.
3. **Adds meaning to the content?** Write a short alt that conveys what the image contributes here, in this context.
4. **Complex (chart, diagram, map, infographic)?** Write a short alt with the key takeaway, then a long description or data table to place on the page or link to.
5. **Decorative or redundant with nearby text?** Use `alt=""`. Do not omit the attribute.

Writing rules:
- Stay within about {{max_chars}} characters. If you need more, the image is complex: use branch 4.
- Do not start with "image of" or "picture of". Name the medium only when it matters ("Oil painting of...", "Screenshot of the settings page...").
- Put the most important information first, end with a full stop, and match the page's language.
- Describe people only by attributes that matter to the content. Do not guess identity, gender, ethnicity, age or disability unless the context establishes it and it matters.
- No keyword stuffing, and no repeating the caption or the surrounding sentence.
- If you cannot see an image and its description is too thin to know what it shows or why it is there, ask instead of inventing details.
</task>

<constraints>
- Never invent text, numbers or details that are not visible in the image or stated in its description.
- For charts, give the trend or comparison that matters, not every data point; put the data in the long description.
{{> output/uncertainty}}
</constraints>

<output_format>
## Alt text
| # | Image | Branch (text / functional / informative / complex / decorative) | alt | Long description needed? |
Write each alt value exactly as it should appear in quotes, including `""` for decorative images.

## Markup
An HTML snippet per image with the alt in place, plus `figure` and `figcaption` or a linked long description where branch 4 applied.

## Questions
What you need to finish any image you could not do, or "None".
</output_format>

<examples>
<example>
Image: company logo, wrapped in a link to the home page. Context: site header.
Branch: functional. alt: "Northwind home"

Image: line chart of monthly sign-ups rising from 1,200 in January to 4,800 in June. Context: quarterly report, paragraph says "growth accelerated".
Branch: complex. alt: "Monthly sign-ups quadrupled from 1,200 in January to 4,800 in June." Long description: a table of the six monthly values.

Image: abstract gradient behind the page title.
Branch: decorative. alt: ""
</example>
</examples>
