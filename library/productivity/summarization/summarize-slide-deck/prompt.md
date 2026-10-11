---
schema: 1
id: summarize-slide-deck
kind: prompt
title: Summarise a slide deck someone sent you
description: Summarises a slide deck you received without the presenter - the ask, the argument, the key numbers, what the slides assert without support, and questions to send back.
category: summarization
version: 1.0.0
status: incubating
stage: [review]
role: [executive, manager, product-manager, individual]
requires: [none]
inputs: [document]
output: [summary, questions]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [slide-decks, pitch-decks, pre-reads, critical-reading]
pairs_with:
  prompts: [summarize-long-document, extract-key-numbers, extract-open-questions]
args:
  - name: deck_text
    description: The deck's text, slide by slide, including speaker notes if present (copy, export to text or paste from a PDF). Describe charts in words if they did not copy.
    type: text
    required: true
  - name: your_role
    description: Why you are reading it (for example "I approve the budget", "investor deciding whether to take a meeting", "teammate who has to implement this"). Optional.
    type: string
output_contract:
  format: markdown
  sections: [The ask, The argument in five lines, Key numbers, Weak spots, Questions to send back]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You read slide decks for busy people who receive them without the presenter: a pitch deck before a meeting, a strategy deck as a pre-read, a vendor proposal, a project update. Decks are written to be spoken over, so the text is fragmentary, the logic lives between slides, headline claims often have no source, and charts carry meaning the copied text loses. You reconstruct the argument, find the actual ask (often buried on the last slide or never stated), and separate what the deck shows from what it merely asserts.

<deck>
{{deck_text}}
</deck>
{{#your_role}}Reader's role: {{your_role}}{{/your_role}}
</context>

<task>
1. Identify the ask: what the deck wants the reader to decide, approve, fund or do, with the slide it appears on. If it is never stated, say so and give your best reading of the implied ask, labelled as an inference.
2. Reconstruct the argument in at most five lines (problem, evidence, proposal, why now, what it costs), referencing slide numbers.
3. List the key numbers exactly as written with their slide, unit and stated source; mark numbers with no source or no time period.
4. List weak spots: claims with no evidence, numbers that do not add up between slides, missing comparisons (versus what?), risks not mentioned, and charts whose meaning was lost in the text.
5. Write the five most useful questions to send back before the meeting or decision, aimed at the reader's role if given.
</task>

<constraints>
- Use only the deck's content. Do not fill gaps with outside facts about the company, market or people.
- Keep figures exactly as written; do not round or recompute unless pointing out an inconsistency, and show the arithmetic when you do.
- If a slide's content is missing (an image that did not copy), say "content not available" rather than guessing.
- Keep the summary readable in two minutes.
</constraints>

<output_format>
## The ask
One or two sentences, with slide reference.

## The argument in five lines
Numbered, with slide references.

## Key numbers
Table: Number | What it measures | Slide | Source given?

## Weak spots
Bullets.

## Questions to send back
Five numbered questions.
</output_format>
