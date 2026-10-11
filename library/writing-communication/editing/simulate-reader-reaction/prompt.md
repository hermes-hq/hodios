---
schema: 1
id: simulate-reader-reaction
kind: prompt
title: Simulate a reader's reaction to a draft
description: Reads a draft as a specific target reader and marks, passage by passage, where they would get confused, skeptical, bored, offended or stop reading, with the reason and what they would need instead.
category: editing
version: 1.0.0
status: incubating
stage: [review]
role: [writer, marketer, founder, individual]
requires: [none]
inputs: [text, document]
output: [report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [reader-testing, audience-fit, beta-reading, drop-off, persuasion]
pairs_with:
  prompts: [critique-draft, rewrite-for-audience, run-readability-check]
  personas: [editor]
args:
  - name: draft
    description: The draft to test.
    type: text
    required: true
  - name: reader
    description: "The reader to simulate, as concretely as you can: role, what they know, what they want, how much time they have and their attitude, for example \"a busy hospital finance director, skeptical of vendors, reading on a phone between meetings\"."
    type: text
    required: true
  - name: goal
    description: What you want the reader to think or do after reading.
    type: text
output_contract:
  format: markdown
  sections: [Reader profile, Reading log, Where they stop, Questions left unanswered, Fixes that matter most]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Writers judge their drafts with everything they know in their heads, so they cannot see where a real reader gets lost. Usability testing for documents works by watching a reader react moment by moment: here I am confused, here I doubt that claim, here I start skimming, here I stop. A simulation is not a real reader, but it can apply what a given reader brings: their background, their time pressure, their objections and their reason for reading. The value is in the specifics: the exact sentence where the skeptical buyer thinks "says who?", the term the new customer does not know, the paragraph a busy executive never reaches. Readers rarely read top to bottom with full attention; most skim the opening, headings and first lines, and decide quickly whether to continue.
</context>

<task>
Read this draft as the reader below and report their reactions.

Reader: {{reader}}
{{#goal}}What the writer wants the reader to do: {{goal}}{{/goal}}

<draft>
{{draft}}
</draft>

1. If the draft is empty or the reader is too vague to simulate (for example "everyone"), ask for a more specific reader and stop.
2. Write a short reader profile: what they know, what they want from this text, their likely objections, how they will read it (skim, study, on a phone).
3. Read in order, as that reader would, including skimming if that is how they read. At each moment that matters, log the reaction: confused, skeptical, bored, offended, reassured, persuaded, or ready to act. Quote the passage and give the reason in the reader's terms.
4. Mark the point where this reader would most likely stop reading or start skimming, and what they would have taken away by then.
5. List the questions the reader still has at the end.
6. Rank the fixes by their effect on the writer's goal, or on comprehension if no goal was given.
</task>

<constraints>
- Stay in this reader's knowledge and attitude. Do not react as an editor or as yourself.
- Present reactions as a simulation and a prediction, not as fact about real readers; recommend testing with a real reader for high-stakes text.
- Log reactions only where something happens; do not comment on every sentence.
- Do not rewrite the draft. Describe fixes, with at most one example wording per fix.
- Do not caricature the reader or rely on stereotypes about a group.
</constraints>

<output_format>
## Reader profile
Three to five bullets.
## Reading log
A table: Passage (quoted) | Reaction | Why, in the reader's words.
## Where they stop
The passage, and what they would have understood by then.
## Questions left unanswered
Bullets.
## Fixes that matter most
Numbered, highest impact first.
</output_format>
