---
schema: 1
id: run-research-synthesis-workshop
kind: prompt
title: Run a research synthesis workshop
description: Plans a team workshop that turns research notes into affinity clusters, themes and insights, with prep, a timed agenda, facilitation prompts, bias checks and what to hand over afterwards.
category: ux-research
version: 1.0.0
status: incubating
stage: [discover]
role: [ux-researcher, designer, product-manager]
requires: [none]
inputs: [text, notes]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [affinity-mapping, synthesis-workshop, facilitation, insights, collaborative-analysis]
pairs_with:
  prompts: [synthesize-customer-interviews, synthesize-usability-findings, set-up-rainbow-spreadsheet]
  personas: [ux-researcher]
args:
  - name: research
    description: What was studied, the method, number of participants, and the form the notes are in (transcripts, notes, recordings).
    type: text
    required: true
  - name: workshop
    description: Who will attend, how much time you have, and whether it is remote or in person.
    type: text
    required: true
  - name: goal
    description: The decision or design work the synthesis should feed. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Before the workshop, Agenda, Facilitation prompts, Bias checks, Outputs and handover]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Synthesising research as a team spreads understanding and buy-in in a way a report cannot, but group sessions have their own failure modes. If raw transcripts are brought in, the session drowns; if notes are already interpreted, the team clusters opinions. Clusters drift toward the product's existing features ("search issues", "onboarding") rather than what people were trying to do. The most senior person's reading wins. Single vivid stories become themes, and clusters are named with nouns that say nothing instead of statements that say something ("people delay setup until they have a client waiting"). Good workshops prepare one observation per sticky with a participant ID beforehand, cluster in silence first, write theme names as full sentences, check every theme for how many participants support it and for counter-evidence, and end with insights tied to the decision.
</context>

<task>
<research>
{{research}}
</research>

<workshop>
{{workshop}}
</workshop>
{{#goal}}

<goal>
{{goal}}
</goal>
{{/goal}}

1. Before the workshop: how to turn the notes into atomic observations (one per note, participant ID, observation versus quote versus interpretation), who prepares them, how many to expect, and the board setup for remote or in person.
2. Agenda with timings fitted to the time available: context and ground rules, immersion (each person reads one participant's notes), silent clustering, naming clusters as sentences, theme check, insights, and next steps. If the time is too short, say what to cut.
3. Facilitation prompts for each stage, for example "what were people trying to do here?", "who does not fit this cluster?", "how many participants does this rest on?".
4. Bias checks: senior voices, feature-shaped clusters, single-participant themes, confirmation of prior beliefs, and how to spot each in the room.
5. Outputs and handover: a theme list with participant counts and counter-evidence, insight statements with "so what" for the goal, open questions, who writes up and by when.
</task>

<constraints>
- Do not produce the themes yourself from the description; this plans the session. If notes are supplied, show at most a few example atomic observations from them.
- Keep observations separate from interpretations throughout.
- Do not treat participant counts as percentages of all users.
</constraints>

<output_format>
## Before the workshop
## Agenda
| Time | Activity | Facilitation |
## Facilitation prompts
## Bias checks
## Outputs and handover
</output_format>
