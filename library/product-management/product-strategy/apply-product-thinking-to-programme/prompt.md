---
schema: 1
id: apply-product-thinking-to-programme
kind: prompt
title: Apply product thinking to a programme
description: Reframes a nonprofit or public programme as a product - who it serves, the outcome they need, evidence, riskiest assumptions and small tests - adapted to funder reporting and volunteer capacity.
category: product-strategy
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [manager, operations-manager, product-manager]
subject: [nonprofit, public-sector, social-care]
requires: [none]
inputs: [text, notes]
output: [explanation, plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [theory-of-change, riskiest-assumptions, small-tests, funder-reporting, service-users]
pairs_with:
  prompts: [map-assumptions, design-validation-experiment, plan-public-service-roadmap]
args:
  - name: programme_description
    description: The programme (food bank, youth club, literacy course, helpline, befriending scheme), who it is for, what happens, staff and volunteer numbers, what you measure now and what feels stuck.
    type: text
    required: true
  - name: funder_requirements
    description: Optional. What funders or commissioners require you to report, and any outcomes or targets they set.
    type: text
output_contract:
  format: markdown
  sections: [The programme as a product, Who it serves and the outcome they need, What we know and how we know it, Riskiest assumptions, Small tests to run, Measures that also serve funders, Next 90 days]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help nonprofit and public programme teams borrow what is useful from product management without the jargon or the tech assumptions. A programme, like a product, exists to create an outcome for specific people; it rests on assumptions that may be wrong; and it gets better through small, measured changes rather than annual redesigns. But programmes differ: the people served are often in hard situations and must not be treated as test subjects, volunteers' time is the scarcest resource, data collection must be light and consensual, and funders want outputs counted in their own format. Your job is to translate, not to impose.
</context>

<task>
Programme:

<programme>
{{programme_description}}
</programme>

{{#funder_requirements}}
Funder requirements:

<funder_requirements>
{{funder_requirements}}
</funder_requirements>
{{/funder_requirements}}

1. Explain in plain words how the programme looks through a product lens: the people it serves, the job they are trying to get done in their lives, the outcome, the service as the "product", and the activities as features. Keep it to one short paragraph.
2. Describe the groups it serves (and anyone who should be using it but is not), and for each the outcome they need, in their terms rather than the programme's.
3. Sort what the team knows into evidence (data, feedback, observation) and belief, and name how each is known.
4. List the riskiest assumptions: about who comes, why people stop coming, whether activities lead to the outcome, and whether volunteers can sustain it. Rank by how much the programme depends on each and how little evidence there is.
5. Propose two to four small tests for the top assumptions, each fitting volunteer capacity: what to try, with whom, for how long (two to six weeks), what to observe, and what result would change the plan. Tests must not withhold support from anyone who needs it.
6. Suggest a few measures that track the outcome and also feed funder reports, with the lightest way to collect them (sign-in counts, a two-question check-in, follow-up calls with consent).
7. Lay out the next 90 days.
</task>

<constraints>
- Plain, warm language; translate product terms when used (for example "riskiest assumption: the belief that would hurt most if wrong").
- Never design tests that deny or delay help to people in need, collect sensitive data without clear consent, or put safeguarding at risk. Mention safeguarding review for any change touching children, vulnerable adults or one-to-one contact.
- Use only facts given; do not invent figures, funder rules or outcomes. Missing information becomes a question.
- Keep the plan within the volunteer and staff capacity described; say if a test would overload them.
- If the description is too thin to identify who is served and what happens, ask up to three questions and stop.
</constraints>

<output_format>
## The programme as a product
One paragraph.

## Who it serves and the outcome they need
Table: group | situation | outcome they need | currently reached? (yes, partly, no).

## What we know and how we know it
Two lists: evidence (with source) and beliefs.

## Riskiest assumptions
Ranked table: assumption | why it matters | evidence today.

## Small tests to run
Table: test | assumption | who and how long | what to observe | decision it informs.

## Measures that also serve funders
Table: measure | how collected | funder report it feeds.

## Next 90 days
Bullets by month.
</output_format>
