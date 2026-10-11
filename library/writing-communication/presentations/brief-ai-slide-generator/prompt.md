---
schema: 1
id: brief-ai-slide-generator
kind: prompt
title: Brief an AI slide generator
description: Writes the outline and instructions to give an AI slide tool such as Copilot in PowerPoint, Gemini in Slides or Gamma, so the generated deck has your storyline, facts and style.
category: presentations
version: 1.0.0
status: incubating
stage: [plan, design]
role: [manager, consultant, marketer, individual]
requires: [none]
inputs: [notes, document, topic]
output: [prompt, outline]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [ai-slide-tools, copilot, gamma, slide-outline, deck-generation]
pairs_with:
  prompts: [outline-presentation, critique-slide-deck, proofread-slide-deck]
  personas: [presentation-designer]
args:
  - name: material
    description: What the deck is about and the source material you have (notes, a document, figures).
    type: text
    required: true
  - name: audience_and_goal
    description: Who will see it and what they should think or do afterwards.
    type: text
    required: true
  - name: tool
    description: The AI slide tool you will paste into, if you know.
    type: text
  - name: slide_count
    description: Roughly how many slides you want.
    type: number
    default: 10
output_contract:
  format: markdown
  sections: [Storyline, Prompt to paste, Slide-by-slide outline, After generation]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You prepare inputs for AI deck generators. These tools produce a deck from a short prompt or a document, and their typical output is generic: topic titles ("Overview", "Benefits"), padded bullet lists, stock images that do not fit, invented statistics, and no argument. They follow structure much better than goals: a slide-by-slide outline with a sentence title and two or three points per slide, the exact numbers to use, a style instruction, and explicit "do not" rules give a usable first draft. Most tools also respect a reference document or a brand template when one is attached, and many treat headings in pasted text as slide breaks. The human still owns the storyline and the facts; the tool saves layout time.

Material:
{{material}}

Audience and goal: {{audience_and_goal}}
{{#tool}}Tool: {{tool}}{{/tool}}
Target slides: {{slide_count}}
</context>

<task>
1. Write the storyline in three to five sentences: the situation, the problem or opportunity, the answer, and the ask.
2. Turn it into a slide-by-slide outline: each slide has an assertion title (a full sentence), two or three short points, the exact figures from the material, and a visual instruction (chart type with its data, diagram, photo theme or none).
3. Write a single prompt to paste into the tool that includes: purpose and audience, the slide count, the outline, tone, a style instruction (text density, fonts or template to use), and rules: use only the facts given, no invented statistics or quotes, no stock photos of people unless asked, speaker notes on every slide.
4. If a tool was named and you know a relevant input convention (for example attaching a source file or using headings as slide breaks), mention it as a tip, phrased with care because features change.
5. List what to check after generation: every number against the source, titles still sentences, images appropriate and licensed, slides the tool added that should go.
</task>

<constraints>
- Use only facts from the material; mark any slide that needs data the material lacks as "[data needed]".
- Do not claim specific product features or limits you are not sure of; keep tool tips general.
- Keep the prompt self-contained so it works when pasted without this conversation.
</constraints>

<output_format>
## Storyline
Three to five sentences.

## Prompt to paste
One fenced text block.

## Slide-by-slide outline
Numbered slides with title, points, figures and visual.

## After generation
A checklist.
</output_format>
