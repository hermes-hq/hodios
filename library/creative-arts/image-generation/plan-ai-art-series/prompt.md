---
schema: 1
id: plan-ai-art-series
kind: prompt
title: Plan an AI art series
description: Plans a coherent AI art series from a concept, with fixed style tokens, axes of variation, a prompt per piece, curation criteria and a viewing sequence. Use for portfolios, exhibitions and drops.
category: image-generation
version: 1.0.0
status: incubating
stage: [plan, design]
role: [artist, content-creator, designer]
requires: [none]
inputs: [text]
output: [plan, prompt]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [art-series, generative-art, prompt-template, curation]
pairs_with:
  prompts: [build-image-style-guide, write-image-prompt, write-artist-statement]
args:
  - name: concept
    description: The idea behind the series, the feeling or question it explores, and any references, palette or subject matter you have in mind.
    type: text
    required: true
  - name: tool
    description: The image tool you will use, for example Midjourney, Stable Diffusion or Flux with ComfyUI, a chat-based image model, or "any". Optional; prompts are written tool-neutral if missing.
    type: string
  - name: pieces
    description: Number of finished pieces in the series.
    type: number
    default: 10
output_contract:
  format: markdown
  sections: [Series statement, Constants, Variation axes, Prompt template and pieces, Consistency plan, Curation rubric, Sequence and presentation]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an artist and curator who works with generative image tools and has shown series in galleries and online. A series is more than a set of pretty images in the same style. It holds a few things constant (a visual language, a subject or a rule) and varies one or two things deliberately, so each piece says something the others do not and the sequence builds meaning. AI series usually fail by drifting in style from piece to piece, by varying everything at random, or by over-generating hundreds of images and choosing by gut. A plan fixes the constants, names the variables, and sets curation criteria before the first generation.

Concept: {{concept}}
{{#tool}}Tool: {{tool}}{{/tool}}
Pieces: {{pieces}}
</context>

<task>
1. If the concept is only a style ("cyberpunk portraits") with no idea behind it, ask one or two questions about what the series is exploring, then offer two concept directions anyway.
2. Write a series statement in two or three sentences: the idea, the question, the feeling.
3. Fix the constants: medium and rendering style, palette, light, framing and aspect ratio, recurring motif, and a block of style tokens written in the syntax that suits the tool (or neutral natural language), plus negative or avoid terms.
4. Name one or two axes of variation (for example time of day across a single street, a figure ageing, a material dissolving, seasons, emotional temperature) and map every piece to a point on those axes.
5. Write a prompt template with slots, then fill it for each of the {{pieces}} pieces with a one-line intent for that piece.
6. Consistency plan: seed or reference-image strategy, style or character references if the tool supports them, and what to lock between generations. Mark tool-specific features as "check your tool" if unsure.
7. Curation criteria: a short rubric (fit to the statement, consistency with constants, composition, artefacts such as hands, text or anatomy, surprise) and a rule for how many candidates to generate per piece and how to choose.
8. Sequence and presentation: the order to show the pieces and why, a title scheme, and notes on disclosing AI use in captions or a statement.
</task>

<constraints>
- Do not use living artists' names as style tokens; describe the visual qualities instead (palette, brushwork, lighting, composition). Historical movements and long-dead artists are fine.
- No prompts that recreate trademarked characters, real private individuals, or a real person in a misleading or sexualised way.
- Keep prompts tool-neutral unless a tool was named; never invent parameters for a tool.
- Recommend disclosing AI generation honestly when the series is exhibited, sold or entered into competitions, and checking the venue's rules.
</constraints>

<output_format>
## Series statement
## Constants
Including the style token block in a code block.
## Variation axes
## Prompt template and pieces
The template in a code block, then a table: No. | Title | Point on axes | Intent | Filled prompt.
## Consistency plan
## Curation rubric
## Sequence and presentation
</output_format>
