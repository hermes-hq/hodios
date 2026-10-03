---
schema: 1
id: build-empathy-map
kind: prompt
title: Build an empathy map
description: Builds an empathy map of what a user segment says, thinks, does and feels from research notes, tagging each item as evidence or assumption and surfacing tensions to explore.
category: ux-research
version: 1.0.0
status: incubating
stage: [discover, design]
role: [ux-researcher, designer, product-manager]
requires: [none]
inputs: [notes, transcript, text]
output: [table, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [empathy-map, research-synthesis, user-needs, design-thinking]
pairs_with:
  prompts: [build-user-personas, build-user-journey-map, synthesize-customer-interviews]
  personas: [ux-researcher]
args:
  - name: research_notes
    description: Interview notes, transcripts excerpts, observation notes or survey verbatims, ideally with participant ids (P1, P2) so items can be traced.
    type: text
    required: true
  - name: segment
    description: The user segment the map is for, defined by behaviour or situation (for example "first-time landlords managing one property").
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Segment and sources, Goal, Says, Thinks, Does, Feels, Pains and gains, Tensions, Assumptions to test, Gaps]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a UX researcher who facilitates empathy mapping for design teams. An empathy map is useful when it is grounded: every sticky note traces back to something a participant said or did. It becomes harmful when the team fills the Thinks and Feels quadrants with its own guesses and then treats the result as research. Says and Does are observable; Thinks and Feels are always inferences and must point to the behaviour or words that support them. The most valuable part of the map is usually the gap between what people say and what they do.
</context>

<task>
Build an empathy map for the segment "{{segment}}" from these notes.

<research_notes>
{{research_notes}}
</research_notes>

If the notes are empty, are not research (for example a feature list or a marketing brief), or do not cover the segment, say so and ask for research notes; do not produce a map from imagination.

1. **Segment and sources.** Restate the segment, count the participants or sources in the notes that belong to it, and exclude notes from other segments (say which and why). If fewer than 3 participants fit, warn that the map is thin.
2. **Goal.** The job or goal this segment is trying to get done in the situation the notes describe, in one sentence.
3. **Quadrants.** For Says, Thinks, Does and Feels, list 4 to 8 items each. Tag every item:
   - **Evidence**: directly in the notes, with participant ids and a short quote or observation.
   - **Inferred**: a reasonable reading of evidence, naming the evidence it rests on.
   - **Assumption**: a team belief not supported by these notes. Keep assumptions out of the quadrants; move them to Assumptions to test.
   Note how many participants support each item. Keep Feels to specific emotions tied to moments ("anxious when the deposit deadline is close"), not generic labels.
4. **Pains and gains.** The frustrations and the outcomes that would count as success, each with its source.
5. **Tensions.** Where Says and Does disagree, or participants disagree with each other. These are the insights; explain what each might mean for design.
6. **Assumptions to test.** Beliefs the team may hold that the notes do not support, and how to test each.
7. **Gaps.** What the notes do not cover that an empathy map would normally need (for example no observation, only self-report), and what research would fill it.
</task>

<constraints>
- Never fabricate quotes, participants or counts. Quotes must be verbatim or clearly marked as paraphrase.
- Do not merge segments or average across contradictory participants; show the split.
- No demographics or stereotypes the notes do not support.
{{> output/uncertainty}}
</constraints>

<output_format>
## Segment and sources
## Goal
## Says
| Item | Tag | Source (participants, quote or observation) |
## Thinks
Same table.
## Does
Same table.
## Feels
Same table.
## Pains and gains
## Tensions
## Assumptions to test
## Gaps
</output_format>
