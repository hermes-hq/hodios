---
schema: 1
id: design-social-media-templates
kind: prompt
title: Design social media post templates
description: Designs a set of social post templates with formats per platform, a grid, type, colour, image treatment and rules for variety. Use when a brand or creator wants a consistent but flexible feed.
category: graphic-design
version: 1.0.0
status: incubating
stage: [design]
role: [graphic-designer, marketer, content-creator, designer]
requires: [none]
inputs: [text, image]
output: [docs, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [social-templates, visual-consistency, carousel-design, safe-zones, brand-application]
pairs_with:
  prompts: [build-brand-guidelines, design-infographic, create-color-palette]
args:
  - name: brand
    description: The brand assets (logo, colours with values, fonts, photography or illustration style), the audience, and the feel the feed should have.
    type: text
    required: true
  - name: content_types
    description: The kinds of posts you publish (tips, quotes, announcements, product shots, behind the scenes, events, carousels, stories), the platforms, posting frequency, and the tool you build in. Optional.
    type: text
output_contract:
  format: markdown
  sections: [System principles, Formats, Grid and safe zones, Typography, Colour, Image treatment, Templates, Variety rules, Accessibility, Production notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Social templates usually fail in one of two ways: a single template reused until the feed looks like wallpaper and every post blurs together, or no system at all, so every post looks like a different brand. Platform interfaces also cover parts of the image (usernames, captions, buttons), and text placed there is hidden. A good template set is a small kit of layouts tied to content types, built on one grid with safe zones per format, with rules that create variety on purpose so the feed is recognisable at a glance without being repetitive.
</context>

<task>
Design a social media template set.

<brand>
{{brand}}
</brand>
{{#content_types}}
<content_types>
{{content_types}}
</content_types>
{{/content_types}}

Use only the brand values given; mark missing ones [TBD]. If there is no brand information, ask for it and stop.

1. **System principles.** Three to five rules, for example "one idea per post", "text on images is a headline, not a paragraph", "brand colour frames the post; the photo is the hero".
2. **Formats.** For each platform in use (or a sensible core set if none were given: a 4:5 portrait feed post, a 1:1 square, a 9:16 vertical story or short-video cover, and a 16:9 or 1.91:1 landscape link image), give the aspect ratio and a common pixel size. Platform specifications change: tell the user to confirm current sizes in each platform's help pages before production.
3. **Grid and safe zones.** A shared grid with margins, and safe zones per format where the interface overlays content (for example the top and bottom of vertical stories, and the centre crop of a portrait post shown as a square in profile grids). Keep text and logos inside them.
4. **Typography.** Fonts with fallbacks available in the production tool, a type scale for headline, subhead, body and caption on a phone screen, maximum words per slide or post, and line length.
5. **Colour.** Background and accent roles from the brand colours, the number of background colours to rotate, text-on-background combinations that pass 4.5:1 contrast, and how photos and colour blocks combine.
6. **Image treatment.** Photography and illustration style, cropping, overlays or duotones if used, how to handle user-generated or partner content, and what never to do (heavy filters, stretched logos, low-resolution images).
7. **Templates.** One template per content type, typically 6 to 10 in total: purpose, format(s), layout description zone by zone, fixed elements (logo position, frame, handle) and flexible elements (image, headline, colour). Include a carousel structure (hook slide, content slides with progress cues, closing slide with a call to action) and a story or vertical template.
8. **Variety rules.** How to rotate templates, colours and image types across a week or a 9-post grid so the feed stays varied; rules such as "never three text-only posts in a row"; and how to break the template for big moments.
9. **Accessibility.** Alt text for every image post, captions on video, sufficient text size and contrast, no meaning by colour alone, and limited text baked into images (put the message in the caption too).
10. **Production notes.** How to build the templates in the tool named (locked brand elements, editable fields, colour and font styles, naming), file export settings, and a pre-post checklist.
</task>

<constraints>
- Do not invent brand colours, fonts or logos. Exact platform sizes are given as common values to confirm.
- Fit the template count to the posting frequency and team; a solo creator posting twice a week needs fewer templates than a brand team posting daily.
- Do not copy another brand's templates or trade dress.
{{> output/uncertainty}}
</constraints>

<output_format>
Markdown with the contract's sections as `##` headings. Formats as a table: | Platform | Placement | Ratio | Common size (confirm) | Safe-zone notes |. Templates as a table: | # | Template | Content type | Format | Layout | Fixed | Flexible |. End with the pre-post checklist as `- [ ]` items.
</output_format>
