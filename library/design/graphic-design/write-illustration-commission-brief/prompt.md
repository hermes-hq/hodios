---
schema: 1
id: write-illustration-commission-brief
kind: prompt
title: Write an illustration commission brief
description: Writes a brief for commissioning an illustrator, covering purpose, content, style direction from their own work, deliverables and specs, sketch stages, usage licence, budget and schedule.
category: graphic-design
version: 1.0.0
status: incubating
stage: [plan]
role: [graphic-designer, marketer, writer, founder]
requires: [none]
inputs: [text, preferences]
output: [docs, checklist, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [illustration, creative-brief, commissioning, usage-rights, freelance-creatives]
pairs_with:
  prompts: [write-design-brief, create-mood-board, design-book-cover-brief, review-creative-rights-contract]
  personas: [art-director]
args:
  - name: project
    description: What the illustration is for (book cover, editorial piece, packaging, website, campaign), what it must show, the audience, and any illustrators you are considering.
    type: text
    required: true
  - name: practicalities
    description: Budget range, deadline, where and how long the illustration will be used, and who approves. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Project summary, What the illustration must do, Content, Style direction, Deliverables and specs, Stages and feedback, Usage and licence, Budget and schedule, Questions for the illustrator]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Illustrators are hired for their way of seeing, so a good brief explains the problem and leaves room for their ideas, while being precise about practical limits. Commissions go wrong when the brief lists every element of the picture (leaving no room for an idea), asks the illustrator to imitate another named artist's style, forgets the formats and crops the image must survive, allows unlimited revisions, or is silent on usage. Illustration is normally licensed, not sold outright: the fee depends on where the work is used, for how long, in which territories and whether the licence is exclusive. Asking for a full buyout of all rights for a small fee, or for free sketches as a pitch (spec work), damages the relationship before it starts.
</context>

<task>
Write an illustration commission brief for: {{project}}
{{#practicalities}}

<practicalities>
{{practicalities}}
</practicalities>
{{/practicalities}}

If the purpose or where the illustration will appear is missing, ask and stop.

1. **Project summary.** Who you are, the project, and why illustration (rather than photography) in two or three sentences.
2. **What the illustration must do.** The one idea or feeling it must carry, for whom, and how success will be judged.
3. **Content.** Must-include subjects or information, accuracy needs (for example technical, historical or cultural details to get right), representation of people, and what to avoid. Leave composition and metaphor to the illustrator.
4. **Style direction.** Refer to pieces from the illustrator's own portfolio that are closest to what you want, plus mood, palette or brand constraints. Never ask them to copy another artist.
5. **Deliverables and specs.** Each image with use, final size and aspect ratios, crops it must survive (a square social crop, a spine, a mobile banner), text space, colour mode, file format (layered file, vector or high-resolution raster), and delivery date.
6. **Stages and feedback.** Thumbnails or rough concepts, one chosen rough, colour rough, final; the number of revision rounds included at each stage; who gives consolidated feedback; and what happens if the direction changes after approval.
7. **Usage and licence.** Media, territories, duration, exclusivity, print runs or impressions if relevant, credit line, the illustrator's right to show the work in their portfolio, and that rights should be set out in a written agreement. Flag any request for a full rights buyout as something to discuss and price separately.
8. **Budget and schedule.** The budget range or a request for a quote, payment stages (for example a deposit on commission, balance on delivery), kill fee if the project is cancelled, and a schedule working back from the final deadline.
9. **Questions for the illustrator.** What you want them to tell you in their reply (availability, approach, quote, licence terms they propose).
</task>

<constraints>
- Do not invent market rates or fees; if no budget is given, ask the illustrator for a quote and say what affects it.
- Do not ask for unpaid speculative work or for imitation of a named living artist's style; if the user asks, explain why briefly and offer an alternative.
- Contract terms belong in a written agreement; recommend legal review for exclusive or high-value licences.
{{> output/uncertainty}}
</constraints>

<output_format>
A brief the user can send as is: Markdown with the contract's sections in order, under about 700 words. Deliverables as a table (Image, Use, Size, Crops, Format, Due). Questions as a numbered list.
</output_format>
