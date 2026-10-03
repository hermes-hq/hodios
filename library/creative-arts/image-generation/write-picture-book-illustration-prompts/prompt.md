---
schema: 1
id: write-picture-book-illustration-prompts
kind: prompt
title: Write picture book illustration prompts
description: Turns a children's story into page-by-page illustration prompts with a fixed cast, palette and style, varied shots, and space for the text on every page or spread.
category: image-generation
version: 1.0.0
status: incubating
stage: [design, build]
role: [writer, parent, artist]
stack: [midjourney, stable-diffusion, dall-e]
requires: [none]
inputs: [document, text]
output: [prompt, plan, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [picture-books, childrens-books, page-layout, character-consistency, illustration]
pairs_with:
  prompts: [write-character-consistency-prompts, build-image-style-guide]
args:
  - name: story_text
    description: The manuscript, split by page or spread if you have done so. If not split, it will be split for you.
    type: text
    required: true
  - name: characters
    description: Each main character's look (age, size, species, colours, clothes, one or two signature traits) and personality.
    type: text
    required: true
  - name: style
    description: The illustration medium for the whole book.
    type: enum
    enum: [watercolour, gouache, flat-vector, pencil]
    default: watercolour
  - name: page_count
    description: Number of illustrated pages or spreads to plan.
    type: number
    default: 12
output_contract:
  format: markdown
  sections: [Book setup, Cast blocks, Style block, Page plan, Page prompts, Consistency checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a picture book art director. A picture book is paced by page turns: each spread shows one beat, the pictures carry what the words leave out, and the shot changes from wide establishing views to close-ups at emotional moments. Text needs a quiet area of flat colour or sky on every page, and nothing important may fall into the gutter where the pages are bound. Image models do not remember characters between images, so a cast block (the same exact description reused verbatim), a style block kept separate from the cast, a canonical reference image approved before the pages, and a check against that reference are what keep the main character recognisable for a whole book.

<story>
{{story_text}}
</story>

<characters>
{{characters}}
</characters>

Style: {{style}}
Illustrated pages or spreads: {{page_count}}
</context>

<task>
1. **Book setup.** Decide whether the plan is by spread or single page (spreads by default for stories of 12 or more beats), the orientation and aspect ratio, where text usually sits, and a reminder to check the printer's trim size, about 3 mm bleed and gutter safe zone. If the story cannot be split into {{page_count}} beats without padding or cramming, say so and propose the count that fits. If a character's look is missing key details (species, colours, size relative to others), ask up to three questions and stop.
2. **Cast blocks.** For each main character, one compact block of 30 to 60 words with fixed traits and colours to paste unchanged into every prompt, and a turnaround prompt (front, three-quarter, side, back on plain white) to generate the reference first.
3. **Style block.** The {{style}} medium described by technique (paper texture, edges, brushwork or line), a palette of five to seven named colours, and how the palette shifts with the story's mood (warmer at home, cooler in the dark forest), with no living illustrator named.
4. **Page plan.** For each page or spread: the text excerpt, the illustration beat (what the picture adds beyond the words), shot size and angle, the text area, and the page-turn reason.
5. **Page prompts.** One prompt per page: shot and composition first, then the cast blocks of the characters present, the setting, the action and expression, the mood lighting, "leave a calm, empty area of [colour] at [position] for text", "keep faces and key action away from the centre fold" for spreads, then the style block.
6. **Consistency checklist** for reviewing every page against the reference.
</task>

<constraints>
- Do not use or imitate existing published characters, and do not name a living illustrator as a style.
- Do not change the story's words; if a page reads badly with its picture, suggest the edit in the page plan as a note.
- No text, letters or captions in the images. Text is set afterwards in layout software.
- Keep content suitable for the story's audience; scary moments stay gentle.
</constraints>

<output_format>
## Book setup
## Cast blocks
Each block and its turnaround prompt in code blocks.
## Style block
In a code block.
## Page plan
Table: Page | Text excerpt | Beat | Shot | Text area | Page turn.
## Page prompts
One heading and code block per page.
## Consistency checklist
Face and signature traits, outfit colours, relative sizes, palette, line or brush quality, text area clear, nothing in the gutter.
</output_format>
