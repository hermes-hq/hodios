---
schema: 1
id: write-sticker-sheet-prompt
kind: prompt
title: Write die-cut sticker sheet prompts
description: Writes prompts for a matching set of die-cut sticker designs with bold outlines, a white border and a cut-friendly silhouette, plus background removal and print-on-demand checks.
category: image-generation
version: 1.0.0
status: incubating
stage: [build]
role: [artist, individual]
stack: [midjourney, stable-diffusion, dall-e]
requires: [none]
inputs: [topic]
output: [prompt, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [stickers, die-cut, print-on-demand, planner-stickers, style-consistency]
pairs_with:
  prompts: [build-image-style-guide, write-product-mockup-prompt]
args:
  - name: theme
    description: The sheet's theme and who it is for, e.g. "cosy autumn for bullet journals", "houseplants with faces", "cycling in-jokes for my club".
    type: string
    required: true
  - name: count
    description: Number of stickers in the set.
    type: number
    default: 8
  - name: style
    description: The shared look of the set.
    type: enum
    enum: [kawaii, retro, minimal, hand-drawn]
    default: hand-drawn
  - name: text_on_stickers
    description: Whether some stickers should carry words. If true, the art leaves a clear space and the words are set in an editor.
    type: boolean
    default: false
output_contract:
  format: markdown
  sections: [Style block, Sticker list, Prompts, Text plan, Background and cut line, Print checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design sticker sets for print-on-demand shops and planner sellers. A die-cut sticker works when it is one compact subject with a bold dark outline, a thick even white border around it, flat or simply shaded colour, and no thin parts sticking out that a cutter will snap or a fingernail will peel. It must still read at about 5 cm across. A set sells when every sticker looks like it came from the same hand: same outline weight, same palette of five or six colours, same shading method, same level of detail. Image models rarely produce true transparency, add drop shadows and scenery, and mangle lettering, so the reliable method is one sticker per generation on a flat solid background in a contrasting colour, with a shared style block pasted into every prompt, then background removal and a cut line offset from the border.

Theme: {{theme}}
Stickers: {{count}}
Style: {{style}}
Text on stickers: {{text_on_stickers}}
</context>

<task>
1. If the theme is too vague to make {{count}} distinct subjects, ask up to two questions and stop.
2. **Style block.** Write one reusable block for {{style}}: outline colour and weight, the five or six palette colours by name, the shading method, the level of detail, and "single die-cut sticker, thick white border, centred, isolated on a flat solid [contrasting colour] background, no drop shadow, no scenery".
3. **Sticker list.** Plan {{count}} subjects that vary in shape (tall, wide, round) and in pose or expression so the sheet packs well and feels varied.
4. **Prompts.** One prompt per sticker: the subject and pose first, then the style block unchanged. Suggest generating a first sticker, approving it, and using it as the image reference for the rest if the tool supports references.
5. **Text plan.** If text_on_stickers is true, mark which stickers carry words, propose the exact words, and add "with a blank banner (or blank speech bubble) for text" to those prompts; the lettering is set afterwards in an editor with a clear rounded font, because generated lettering is often misspelled. If false, keep every prompt text-free.
6. **Background and cut line.** Remove the background, check the edges, then add a cut line about 2 to 3 mm outside the white border, smoothing tight concave corners.
7. **Print checks.** Final size and 300 dpi pixel size, colour mode advice (check the printer's colour profile), and a pre-upload checklist.
</task>

<constraints>
- No trademarked characters, logos, brand names, sports team marks or real people's likeness, because the user may sell these.
- No lettering requested from the model; blank spaces only.
- Keep silhouettes simple: no thin spikes, loose strands or separate floating pieces. Merge small parts into the main shape with the border.
- Every prompt uses the same style block word for word.
</constraints>

<output_format>
## Style block
In a code block.
## Sticker list
Table: # | Subject and pose | Shape | Text (if any).
## Prompts
One code block per sticker.
## Text plan
Words per sticker and font guidance, or "No text in this set."
## Background and cut line
Numbered steps.
## Print checks
A checklist: reads at 5 cm, outline and palette match the first sticker, no floating parts, border even, no stray text, 300 dpi at final size, platform's current file rules checked.
</output_format>
