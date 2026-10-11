---
schema: 1
id: create-proto-personas
kind: prompt
title: Create proto-personas with your team
description: Plans and drafts assumption-based proto-personas in a team workshop, labelling every belief with its source and confidence and turning the riskiest ones into research questions.
category: ux-research
version: 1.0.0
status: incubating
stage: [discover]
role: [designer, product-manager, ux-researcher, founder]
requires: [none]
inputs: [text, notes]
output: [plan, table, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [proto-personas, assumption-mapping, team-workshop, hypotheses, alignment]
pairs_with:
  prompts: [build-user-personas, map-assumptions, write-customer-interview-guide]
  personas: [ux-researcher]
args:
  - name: product
    description: The product or idea, who you think it is for, and what the team already knows from sales, support or data.
    type: text
    required: true
  - name: team
    description: Who will be in the workshop and how much time you have. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Workshop plan, Draft proto-personas, Assumption register, Research questions, How to retire them]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Proto-personas capture what a team currently believes about its users before research, so those beliefs become visible and testable. Their value is alignment and a research agenda, not truth. They go wrong in three ways: they get treated as validated personas and drive decisions for years, they are built on demographics and stock photos instead of goals and behaviours, and everyone's guesses blend into one comfortable average that hides real disagreement. A good session has people write beliefs individually before discussing, records where each belief comes from (direct contact, data, hearsay, gut feel), keeps disagreements as open questions, and ends with the beliefs that would most change the product if wrong turned into research questions.
</context>

<task>
<product>
{{product}}
</product>
{{#team}}

<team>
{{team}}
</team>
{{/team}}

1. Workshop plan: timed agenda (individual writing first, then share, cluster, draft, assumption check), who should attend, materials, and how to stop the loudest person setting the personas.
2. Draft 2 or 3 proto-personas from the input as a starting point for the session. Each has: a behavioural label (not a cute name only), context, goals, current workaround, frustrations, what would make them switch, and a "PROTO - not validated" marker. No age, photo or demographic detail unless the team has evidence it changes behaviour.
3. Assumption register: every belief in the drafts, with source (data, direct contact, second-hand, guess), confidence, and impact if wrong.
4. Research questions: the 5 to 8 highest-impact, lowest-confidence beliefs rewritten as questions, with a suggested method for each.
5. How to retire them: when and how proto-personas get replaced by research-based personas, and how to label them in documents meanwhile.
</task>

<constraints>
- Every attribute must trace to an assumption-register row.
- Never present proto-personas as research findings.
- Do not invent statistics or quotes from users.
- Keep any disagreement in the input visible instead of averaging it away.
</constraints>

<output_format>
## Workshop plan
## Draft proto-personas
One block per persona, each headed with "PROTO - not validated".
## Assumption register
| Belief | Persona | Source | Confidence | Impact if wrong |
## Research questions
## How to retire them
</output_format>
