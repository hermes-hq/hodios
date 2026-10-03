---
schema: 1
id: write-colouring-page-prompt
kind: prompt
title: Write printable colouring page prompts
description: Writes image prompts for printable colouring pages with clean closed outlines, no shading, and line weight and detail matched to the child's age, plus print setup and a cleanup checklist.
category: image-generation
version: 1.0.0
status: incubating
stage: [build]
role: [parent, teacher]
stack: [midjourney, stable-diffusion, dall-e]
requires: [none]
inputs: [topic]
output: [prompt, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [colouring-pages, line-art, printables, classroom-resources]
pairs_with:
  prompts: [write-image-prompt, write-sticker-sheet-prompt]
args:
  - name: theme
    description: What the pages should show, in the child's words if possible, e.g. "dinosaurs having a picnic", "ocean animals", "my street in winter".
    type: string
    required: true
  - name: age
    description: The child's age in years (or the youngest child in a class). Sets line thickness, number of shapes and how much background there is.
    type: number
    required: true
  - name: pages
    description: How many different pages to write prompts for.
    type: number
    default: 4
  - name: paper
    description: The paper the pages will be printed on.
    type: enum
    enum: [a4, letter]
    default: a4
output_contract:
  format: markdown
  sections: [Age settings, Page prompts, Avoid line, Print setup, Cleanup checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design printable colouring pages for children. A good page is black line art on pure white: every shape closed so crayons, paint and digital fill tools stay inside, no grey shading, hatching or solid black areas that waste ink and leave nothing to colour, and an amount of detail the child can manage. Image models drift towards greyscale illustration, sketchy broken lines, tiny fussy details and stray text, so the prompt must ask for line art explicitly and the result still needs a quick check before printing. Age guidance that works in practice:
- 2 to 4: very thick, even outlines; one large subject; 5 to 10 big shapes; no background.
- 5 to 7: bold outlines; one or two subjects with a simple ground line or a few background items; 15 to 30 shapes.
- 8 to 11: medium lines; a full scene with background; some patterns to fill.
- 12 and over: fine lines, intricate patterns and dense scenes are welcome.

Theme: {{theme}}
Age: {{age}}
Pages: {{pages}}
Paper: {{paper}}
</context>

<task>
1. **Age settings.** State the band for age {{age}} and what it means for line weight, shape count and background on these pages.
2. **Theme check.** If the theme names a trademarked or copyrighted character, brand or franchise, do not use it. Offer an original subject with the same appeal (a brave space explorer rather than a named film hero) and use that. If the theme is unclear, ask one question and stop.
3. **Page prompts.** Write {{pages}} prompts, each a different scene or subject within the theme so the set does not repeat. Each prompt says: black and white line art colouring page for a child aged {{age}}; the subject and what it is doing; how much background; clean, closed, even outlines of the right weight; pure white background with no shading, no grey, no hatching, no solid black fills; portrait orientation; all artwork inside a white margin; no text, letters or numbers. Keep the subject friendly and age-appropriate.
4. **Avoid line.** One line listing what to exclude, for tools that have a negative or avoid field, phrased as a short list (shading, grey tones, gradients, text, signature, frame, cropped edges).
5. **Print setup** for {{paper}}: portrait aspect ratio (A4 is about 1:1.41, letter about 1:1.29), the pixel size for 300 dpi (A4 2480 x 3508, letter 2550 x 3300), a margin of about 1.5 cm or 0.5 in, and the advice to upscale or trace the image to clean vector lines if the outlines look soft.
6. **Cleanup checklist** for each page before printing.
</task>

<constraints>
- Line art only: never request colour, grey shading, gradients or photo-realism.
- No copyrighted or trademarked characters, logos or brand names, and no text in the image. A title or the child's name goes in afterwards with any editor.
- Content suitable for the stated age: nothing frightening, violent or scary unless the theme is something like friendly monsters, and then keep it cute.
- Do not repeat the same composition across pages; vary subject, pose and viewpoint.
</constraints>

<output_format>
## Age settings
Two or three lines.
## Page prompts
One numbered heading per page with a one-line title, then the prompt in a code block.
## Avoid line
In a code block.
## Print setup
Aspect ratio, pixel size, margin, sharpening tip.
## Cleanup checklist
A checklist: lines closed (test with a fill bucket in any paint app), no grey areas, no stray text or signature, nothing touching the page edge, detail right for the age, prints cleanly in draft mode.
</output_format>
