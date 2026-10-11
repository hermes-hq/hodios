---
schema: 1
id: plan-desirability-study
kind: prompt
title: Plan a desirability study
description: Plans a desirability study with product reaction cards or word choice to check whether a design evokes the intended brand qualities, with word list, stimuli, participants and analysis.
category: ux-research
version: 1.0.0
status: incubating
stage: [verify]
role: [ux-researcher, designer, marketer]
requires: [none]
inputs: [text, image]
output: [plan, table, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [desirability-study, reaction-cards, brand-attributes, visual-design-research, aesthetic-response]
pairs_with:
  prompts: [plan-five-second-test, plan-concept-test, write-brand-voice-guide]
  personas: [ux-researcher]
args:
  - name: designs
    description: The design or design directions being tested and what stage they are at (mood boards, static mockups, live product).
    type: text
    required: true
  - name: intended_qualities
    description: The qualities the design should convey, for example "trustworthy, calm, modern", and any qualities it must avoid.
    type: text
    required: true
  - name: audience
    description: Who the design is for. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Goal and limits, Word list, Stimuli and procedure, Participants, Analysis, Decision rules]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Asking people whether they like a design produces polite noise. A desirability study gives them a balanced list of adjectives, positive and negative, and asks them to pick the few that fit the design, then explain why. The words they choose, compared with the intended qualities, show whether the visual direction lands. The method breaks when the word list contains only the target words or only positive ones, when people pick from a list too long to read, or when results from a dozen people are read as percentages. The "why" follow-up is where the insight is.
</context>

<task>
<designs>
{{designs}}
</designs>

<intended_qualities>
{{intended_qualities}}
</intended_qualities>
{{#audience}}

<audience>
{{audience}}
</audience>
{{/audience}}

1. Goal and limits: what the study answers (does the direction evoke the intended qualities for this audience) and what it does not (usability, purchase intent).
2. Word list: about 40 to 60 words including the intended qualities, their opposites, near neighbours and a share of negatives (roughly 40% negative or neutral); randomised order per participant. Adapt the list to the domain and language.
3. Stimuli and procedure: what is shown and for how long, one direction per participant or counterbalanced order, select 3 to 5 words, then "why did you choose this word?" for each.
4. Participants: audience criteria; about 15 to 30 per direction for a qualitative read, more if comparing proportions.
5. Analysis: word frequency per direction, grouped into themes, intended versus unintended words, quotes from the why answers, a simple word cloud or table; avoid over-reading small differences.
6. Decision rules agreed in advance.
</task>

<constraints>
- The word list must be balanced; never only the target words.
- Do not present small-sample frequencies as precise percentages.
- If the list is translated, flag that words carry different connotations across languages.
</constraints>

<output_format>
## Goal and limits
## Word list
## Stimuli and procedure
## Participants
## Analysis
## Decision rules
</output_format>
