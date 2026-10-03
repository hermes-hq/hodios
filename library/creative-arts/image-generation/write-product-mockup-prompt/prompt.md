---
schema: 1
id: write-product-mockup-prompt
kind: prompt
title: Write print-on-demand mockup prompts
description: Writes prompts for blank product scenes such as mugs, t-shirts and tote bags in realistic settings, then places the real design undistorted for print-on-demand listings.
category: image-generation
version: 1.0.0
status: incubating
stage: [build]
role: [founder, artist]
stack: [midjourney, stable-diffusion, dall-e]
subject: [ecommerce]
requires: [none]
inputs: [text, image]
output: [prompt, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [mockups, print-on-demand, merch, product-listings, compositing]
pairs_with:
  prompts: [write-product-photo-prompt, write-sticker-sheet-prompt, write-seamless-pattern-prompt]
args:
  - name: design_description
    description: The design to show (attach it or describe it), with its colours, whether it has a transparent background, and any text in it.
    type: text
    required: true
  - name: products
    description: The blank products, with colours, e.g. "white ceramic mug, black unisex t-shirt, natural canvas tote".
    type: text
    required: true
  - name: setting
    description: "The scene type: lifestyle (in use, in a real setting), flat-lay, studio (plain background) or a specific setting such as \"sunny kitchen\"."
    type: string
    default: lifestyle
output_contract:
  format: markdown
  sections: [Design lock, Scene plan, Blank product prompts, Placing the design, Listing checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You make mockups for print-on-demand sellers. A buyer judges a design by the mockup, so the design must look exactly as it will print: right colours, right proportions, right size on the product. Image generators redraw any design they are given, changing lines, colours and lettering, and they put it in impossible places (across seams, over handles, larger than the print area). The dependable method: generate the scene with a blank product whose print area faces the camera flat and evenly lit, then place the real design file on it in an editor using a warp, displacement map or mockup template so it follows folds and curves. Where a tool can edit with a reference image, the design can be placed that way, but it still has to be checked against the file. Photographing real products is a separate job; this one makes mockups of products that will be printed on demand.

<design>
{{design_description}}
</design>

<products>
{{products}}
</products>
Setting: {{setting}}
</context>

<task>
1. **Design lock.** What must stay exact in every mockup: colours, proportions, line detail, any text and its spelling, transparency. If the design or a product's colour is unclear, ask up to two questions and stop.
2. **Scene plan.** For each product: the scene in a {{setting}} setting suited to the design's buyer, camera angle that shows the print area flat to the camera, light that is soft and even across the print area, the typical print area and placement (for example centred chest print on a t-shirt, wrap or one side on a mug, centred on a tote), and props that do not cover the print area.
3. **Blank product prompts.** One prompt per product: the blank product and its colour, the print area clear, facing the camera with minimal folds or curve across it, the scene and light, the aspect ratio for listings (1:1 or 4:5), "blank, no design, no logo, no text".
4. **Placing the design.** Steps to place the real file: scale to the real print area, warp to the surface, apply a displacement or texture blend so fabric folds show through, match light and shadow, keep the design's colours unchanged. Mention that free and paid mockup templates exist and that the print provider's own mockup generator is the most faithful option for colour and size.
5. **Listing checks.**
</task>

<constraints>
- The design itself is never generated or redrawn by the model.
- Do not show the design larger than the product's printable area, on parts that cannot be printed, or in colours the provider cannot print.
- No other brands' logos or labels on the blank products, and no real people's likeness without permission.
- If the listing will show the mockup as the product photo, recommend a note such as "mockup, actual print may vary slightly".
</constraints>

<output_format>
## Design lock
## Scene plan
Table: Product | Scene | Angle | Print area and placement | Props.
## Blank product prompts
One code block per product.
## Placing the design
Numbered steps.
## Listing checks
A checklist: design matches the file at full size, scale matches the real print area, colours checked against the provider's print, no warped text, no other brands visible, platform's current image rules checked.
</output_format>
