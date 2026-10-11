---
schema: 1
id: assess-ux-maturity
kind: prompt
title: Assess an organisation's UX maturity
description: Assesses how mature an organisation's UX practice is across research, design process, decision-making, people and measurement, with evidence per area and a few realistic next steps.
category: ux-research
version: 1.0.0
status: incubating
stage: [discover]
role: [ux-researcher, designer, manager, consultant]
requires: [none]
inputs: [text, notes]
output: [report, table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [ux-maturity, design-ops, research-ops, capability-assessment, organisational-change]
pairs_with:
  prompts: [make-case-for-ux-research, plan-ux-research-roadmap, build-research-repository]
  personas: [ux-researcher]
args:
  - name: organisation
    description: What you know about how the organisation works - team sizes and reporting lines, how research and design happen today, how decisions get made, tools, recent examples of projects.
    type: text
    required: true
  - name: goal
    description: Why you are assessing, for example "new head of design wants a 12-month plan" or "pitching a research function". Optional.
    type: text
output_contract:
  format: markdown
  sections: [Evidence used, Assessment by area, Overall picture, What is holding it back, Next steps, Questions to confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Published UX maturity models describe broadly similar stages, from UX being absent or ad hoc, through isolated specialists and project-level practice, to UX shaping strategy and being measured. A single overall level is of little use: organisations are usually uneven, for example strong visual design with no research, or research that is done but never changes decisions. The useful signals are behavioural, not structural: whether research findings have changed a roadmap in the last year, whether designers join before or after requirements are fixed, whether anyone measures experience outcomes, and whether practices survive when one enthusiastic person leaves. Maturity also moves one step at a time; plans that jump straight to "UX drives strategy" fail because the habits underneath are missing.
</context>

<task>
<organisation>
{{organisation}}
</organisation>
{{#goal}}

<goal>
{{goal}}
</goal>
{{/goal}}

1. List the evidence you are working from and how strong it is (concrete examples versus impressions).
2. Assess six areas, each on a simple scale (absent, ad hoc, emerging, established, embedded) with the evidence behind it: research practice; design process and timing; how decisions use evidence; people, roles and skills; tools, operations and knowledge reuse; measurement of experience outcomes.
3. Summarise the overall picture in a few sentences, naming the strongest and weakest areas rather than one score.
4. Identify what holds maturity back (structure, incentives, leadership, single points of failure), labelled as a hypothesis where evidence is thin.
5. Recommend 3 to 5 next steps that move the weakest important area up one level, each with an owner type, effort, and a sign it worked within 3 to 6 months.
6. List questions to confirm the assessment, and who could answer them.
</task>

<constraints>
- Base each rating on evidence in the input; mark ratings with little evidence as provisional.
- Do not name or attribute a specific proprietary maturity model's levels as if quoting it; describe the stages in plain terms.
- Recommend steps that fit the organisation's size and resources; no large hires or reorganisations unless the goal calls for them.
- Do not judge individual people.
</constraints>

<output_format>
## Evidence used
## Assessment by area
| Area | Level | Evidence | Provisional? |
## Overall picture
## What is holding it back
## Next steps
| Step | Area | Owner | Effort | Sign it worked |
## Questions to confirm
</output_format>
