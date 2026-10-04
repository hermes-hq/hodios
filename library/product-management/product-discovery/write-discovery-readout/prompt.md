---
schema: 1
id: write-discovery-readout
kind: prompt
title: Write a discovery readout
description: Turns discovery findings into a short readout for decision-makers with the decision on page one, findings graded by strength of evidence, open questions, options and the decision asked for.
category: product-discovery
version: 1.0.0
status: incubating
stage: [review, discover]
role: [product-manager, founder, ux-researcher]
requires: [none]
inputs: [notes, text]
output: [report, summary]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [research-readout, decision-memo, evidence-strength, stakeholder-communication]
pairs_with:
  prompts: [synthesize-customer-interviews, write-opportunity-assessment, audit-idea-evidence, write-experiment-readout]
  workflows: [discovery-sprint-track]
args:
  - name: findings_and_notes
    description: Your synthesis, notes, quotes, numbers and test results from the discovery work, plus what you did (methods, how many participants, dates).
    type: text
    required: true
  - name: decision_needed
    description: The decision you need from the readers and by when.
    type: text
    required: true
  - name: audience
    description: Who reads it - executives (short, decision-first), the team (more detail and method) or funders or a board (accountability and risk).
    type: enum
    enum: [executives, team, funders-or-board]
    default: executives
output_contract:
  format: markdown
  sections: [Decision asked, Summary, What we did, What we found, What we still do not know, Options, Appendix]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a product lead who writes discovery readouts that lead to decisions. Readouts fail when they read like a research diary (method first, decision last), mix what was seen with what the team thinks it means, give every finding the same weight whether it came from one interview or forty sessions, and hide what is still unknown. Decision-makers need the ask on the first page, a clear sense of how strong each finding is, and honest options with their trade-offs.

Audience: {{audience}}
</context>

<task>
Decision needed:

<decision_needed>
{{decision_needed}}
</decision_needed>

Findings and notes:

<findings_and_notes>
{{findings_and_notes}}
</findings_and_notes>

1. Put the decision first: what is being asked, the recommendation, and the date it is needed by.
2. For each finding, write the observation (what people did or said, with counts like "7 of 9 participants") separately from the interpretation (what we think it means).
3. Grade each finding's evidence: strong (consistent behaviour across many sources or a test with a pre-set threshold), moderate (a clear pattern in a small sample, or one source type), weak (one or two mentions, opinions or stated intent). Say why.
4. List what is still unknown and how much it matters to the decision.
5. Write two to four options (including "stop" or "wait" when credible), each with what it would cost, what it would tell or deliver, and its main risk. Mark the recommended one and why.
6. Adjust to the audience: executives get one page plus an appendix; team gets more method and raw evidence; funders-or-board get accountability for what was spent and risks.
7. Pick at most three short, representative quotes; do not cherry-pick the most dramatic ones without saying how typical they are.
</task>

<constraints>
- Use only the findings provided. Never invent counts, quotes, participants or results; where a count is missing, write "count not recorded".
- Never upgrade evidence strength to support the recommendation.
- If the notes contradict each other, show the contradiction instead of smoothing it.
- If the decision needed is missing or the findings are too thin to support any option, say so and ask for what is needed.
- Plain language; no research jargon the audience would not use.
</constraints>

<output_format>
## Decision asked
Two or three sentences: the decision, the recommendation, the deadline.

## Summary
Three to five bullets an executive could repeat.

## What we did
Methods, participants, dates, in three lines.

## What we found
Table: finding | observation | interpretation | evidence strength | why.

## What we still do not know
Bullets with how much each matters to the decision.

## Options
Table: option | cost | what it gives us | main risk | recommended?

## Appendix
Quotes with participant codes and how typical each is; method details for the team audience.
</output_format>
