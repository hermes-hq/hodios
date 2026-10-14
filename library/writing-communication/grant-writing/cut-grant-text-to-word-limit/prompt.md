---
schema: 1
id: cut-grant-text-to-word-limit
kind: prompt
title: Cut grant text to the word limit
description: Cuts an over-length grant section to a hard word or character limit while keeping every scored criterion, evidence point and required term, with a log of what was removed.
category: grant-writing
version: 1.0.0
status: incubating
stage: [review]
role: [writer, researcher, manager, editor]
requires: [none]
inputs: [text, document]
output: [rewrite, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [word-limit, character-limit, cutting, scoring-criteria, concise-writing]
pairs_with:
  prompts: [check-grant-application-before-submission, write-grant-application, tighten-prose]
  personas: [grant-writer]
args:
  - name: text
    description: The section as drafted.
    type: text
    required: true
  - name: limit
    description: The hard limit and how it is counted, for example "250 words" or "2,000 characters including spaces", as stated by the funder.
    type: string
    required: true
  - name: criteria
    description: The question and scoring criteria this section answers, and any terms the funder expects to see. Optional but strongly recommended.
    type: text
output_contract:
  format: markdown
  sections: [Must keep, Cutting plan, Cut version, What was removed, Count]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a grant editor. Online grant portals cut off text at the limit or refuse to submit, and character limits usually count spaces, so the last 10% of cutting is often the hardest. Cutting well is not trimming adjectives evenly: it starts by deciding what the reviewer must find to award marks (a direct answer to each part of the question, the evidence, the numbers, the funder's own terms) and protects that, then removes what does not score: background the reviewer already knows, repetition of other sections, throat-clearing openings, hedges, long organisation names repeated in full, and lists of activities with no purpose attached. Weak cuts delete the evidence and keep the rhetoric.
</context>

<task>
Cut this section to the limit.

<text>
{{text}}
</text>

Limit: {{limit}}
{{#criteria}}
<criteria>
{{criteria}}
</criteria>
{{/criteria}}

1. Must keep: list each part of the question or criterion and the sentence that answers it, plus every number, named partner, outcome and required term. If the criteria are not given, infer the likely question from the text and say so.
2. Cutting plan: rank cuts from least to most costly (repetition, generic background, preamble, hedges, wordy phrases, merged sentences, abbreviations defined once, lower-value examples) and estimate the saving of each.
3. Cut version: rewrite to land about 5% under the limit, in the same voice, keeping every must-keep item. Do not change facts or claims.
4. What was removed: each removed idea, so the author can move it elsewhere or restore it on purpose.
5. Count: your approximate count by the stated method (words, or characters with or without spaces), with a reminder to verify in the funder's form because counting methods differ.
</task>

<constraints>
- Never add new facts, numbers or claims while cutting, and never soften a commitment into something different.
- If the limit cannot be met without losing a scored point, say which point is at risk and give two options rather than silently dropping it.
- Use abbreviations only if the funder allows them and define each once.
- Keep sentences readable; do not compress into note form unless the form clearly expects bullets.
</constraints>

<output_format>
## Must keep
Table: Criterion or required item | Where it is answered.
## Cutting plan
Table: Cut | Approximate saving.
## Cut version
## What was removed
## Count
Original count, new count, limit, method.
</output_format>
