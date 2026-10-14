---
schema: 1
id: plan-bookbinding-project
kind: prompt
title: Plan a handmade bookbinding project
description: Plans a hand-bound notebook, sketchbook or journal with a binding style matched to use, paper grain direction, signature maths, cover boards, stitching steps and the tools needed.
category: crafts
version: 1.0.0
status: incubating
stage: [plan, build]
role: [individual]
requires: [none]
inputs: [text, preferences]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [bookbinding, coptic-stitch, signatures, paper-grain, journals, sketchbooks]
args:
  - name: book
    description: What you want to make and how it will be used, for example "A5 watercolour sketchbook that lies flat", "a pocket notebook", "a wedding guest book".
    type: text
    required: true
  - name: pages
    description: Roughly how many pages or sheets, or the paper you have, for example "100 pages of 120 gsm cartridge from A4 sheets". Optional.
    type: text
  - name: tools
    description: Tools you already have, for example "craft knife, ruler, bone folder, awl". Optional.
    type: text
output_contract:
  format: markdown
  sections: [Binding choice, Materials, Signature maths, Steps, Tools, Common mistakes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a bookbinder who teaches evening classes. The binding style should follow the use: exposed-spine stitches such as Coptic open completely flat, which suits sketchbooks; case binding gives a sturdy hardback; pamphlet stitch is the quickest single-signature book; Japanese stab binding suits loose sheets but does not open flat. Paper grain must run parallel to the spine, or pages cockle, resist folding and the book will not close well; you find it with the bend or tear test. Pages come in signatures: sheets folded in half and nested, usually four to six sheets each (16 to 24 pages), fewer for thick paper. PVA glue is used for covers, and wet work needs pressing under weight while it dries.

Book: {{book}}
{{#pages}}Pages or paper: {{pages}}{{/pages}}
{{#tools}}Tools: {{tools}}{{/tools}}
</context>

<task>
1. Recommend a binding style for this use and explain the trade-off against one alternative.
2. Choose paper, cover board and thread: paper weight for the use (for watercolour, at least about 300 gsm or a lighter mixed-media paper with fewer sheets per signature), grey board or similar for covers, waxed linen thread, and cover material.
3. Signature maths: sheet size needed for the finished page size, sheets per signature for the paper weight, number of signatures, and total pages. Show the arithmetic. Say how to find grain direction and which way to cut parent sheets so grain runs parallel to the spine.
4. Steps in order: folding and pressing signatures, making a piercing guide, piercing stations, stitching (with a clear sequence for the chosen style, including kettle stitches where relevant), making and attaching covers, and pressing.
5. Tools: essential and nice-to-have, and safe substitutes for what is missing (for example, a thick needle in a cork for an awl).
6. Common mistakes: cross-grain paper, loose or overtight tension, misaligned stations, warped covers from too much glue, and how to avoid each.
7. Before answering, check the signature arithmetic matches the requested page count.
</task>

<constraints>
- Keep to techniques possible at a kitchen table unless the person has a press or workshop.
- Do not invent product names; describe materials by type and weight.
- Include knife safety (cut against a metal ruler on a cutting mat, many light passes).
</constraints>

<output_format>
## Binding choice
## Materials
## Signature maths
## Steps
Numbered.
## Tools
## Common mistakes
</output_format>
