---
schema: 1
id: test-fan-theory
kind: prompt
title: Test a fan theory
description: Tests a fan theory about a film, series, book or game against the evidence in the work itself, sorting supporting clues, contradictions and what the creators have said.
category: media-and-fandom
version: 1.0.0
status: incubating
stage: [review]
role: [individual, gamer]
requires: [none]
inputs: [text]
output: [explanation, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [fan-theories, canon, foreshadowing, evidence, creator-interviews]
pairs_with:
  prompts: [explain-film-ending, plan-guided-rewatch, catch-up-on-series-spoiler-free]
  personas: [film-and-book-critic]
args:
  - name: work
    description: The work or franchise and how far you have got, for example "Severance, through season 2".
    type: string
    required: true
  - name: theory
    description: The theory in your own words, with the clues you think support it.
    type: text
    required: true
  - name: spoiler_limit
    description: The latest point the answer may use evidence from, for example "season 2 finale" or "everything released".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [The theory as a claim, Evidence for, Evidence against, What the creators said, Verdict]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Good fan theories read the text closely; bad ones explain everything and so predict nothing. Testing a theory works like testing any claim: state it precisely enough to be wrong, then weigh clues by strength. A line of dialogue or a deliberate repeated image is strong evidence; a background prop or a production error is weak; something that only works if you ignore an on-screen fact is a contradiction. Canon has levels: the primary work, then official tie-ins, then creator interviews, which can be playful, misquoted or later contradicted. Creators also say "it's open to interpretation" to avoid confirming anything.

Work: {{work}}
Theory: {{theory}}
Evidence limit: {{spoiler_limit}}
</context>

<task>
1. If you do not know the work well enough to check evidence up to {{spoiler_limit}}, say so and offer only a general method, then stop.
2. Restate the theory as a precise, testable claim, and note what it predicts that we should see if it is true.
3. Evidence for: list each clue with where it appears and rate it strong, moderate or weak, with the reason. Include the user's clues and any they missed.
4. Evidence against: on-screen or on-page facts that contradict it, or simpler explanations for the same clues.
5. What the creators said: only statements you are confident were actually made, with who said it and in what context in general terms; otherwise say you know of none.
6. Verdict: likely, possible, unlikely, or contradicted by canon, with one or two sentences of reasoning. If it is still open, say what future evidence would settle it.
</task>

<constraints>
- Use nothing after {{spoiler_limit}}. If later material settles the theory, say "later material addresses this" and nothing more unless they extend the limit.
- Never invent scenes, lines, episode numbers or creator quotes; mark uncertain details "(check)".
- Treat the user's theory with respect even when the verdict is unlikely.
</constraints>

<output_format>
## The theory as a claim
Claim and what it predicts.
## Evidence for
Table: Clue | Where | Strength | Why.
## Evidence against
Bullets.
## What the creators said
Bullets or "None I know of".
## Verdict
One rating and short reasoning.
</output_format>
