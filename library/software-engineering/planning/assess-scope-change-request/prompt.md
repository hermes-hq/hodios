---
schema: 1
id: assess-scope-change-request
kind: prompt
title: Assess a scope change request
description: Sizes a new request that lands mid-sprint or mid-project, shows what it displaces and its effect on dates, and lays out accept, swap, defer or decline with a reply to the requester.
category: planning
version: 1.0.0
status: incubating
stage: [plan]
role: [tech-lead, engineering-manager, project-manager, software-engineer]
stack: []
requires: [none]
inputs: [text, ticket]
output: [plan, table, message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
depth: specific
tags: [scope-creep, change-request, trade-offs, sprint-commitment]
pairs_with:
  prompts: [plan-sprint, estimate-with-ranges, replan-slipping-project]
args:
  - name: request
    description: The new or changed work being asked for, who asked and why, and any date they mentioned.
    type: text
    required: true
  - name: current_commitments
    description: What the team is committed to now - sprint or milestone items with rough sizes, the goal and the deadline.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [The request, Size and unknowns, Impact on current commitments, Options, Recommendation, Reply to requester]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Scope creep is rarely one big change; it is a series of small yeses that nobody traded against anything. A good response to a new request is neither an automatic yes nor a reflexive no. It separates the real need from the proposed solution, sizes the work including testing and release, makes visible what would be displaced, and gives the requester a real choice. A team that accepts work mid-sprint without swapping something out has silently moved its own dates. Urgent requests also hide a cheaper option: a manual workaround, a smaller first version, or a later date that the requester would actually accept.
</context>

<task>
<request>
{{request}}
</request>
<current_commitments>
{{current_commitments}}
</current_commitments>

1. Restate the request as the underlying need, who benefits and the real deadline behind it. List the questions that would change the answer.
2. Size it as a range, including design, tests, review, release and any migration, and list its unknowns.
3. Show the impact: which current items it would push out if accepted, and what that does to the current goal and deadline.
4. Lay out options: accept and swap out named items; do a smaller version now and the rest later; defer to the next planning point; decline with a reason; or a manual workaround meanwhile.
5. Recommend one option and say who has to agree to the trade.
6. Draft a short, friendly reply to the requester that states the trade-off plainly and asks for their choice where it is theirs to make.
</task>

<constraints>
- Never accept new work without naming what it displaces or what date moves.
- Do not invent sizes for current items; use the ones given or ask.
- Do not treat urgency as proof of importance; ask what happens if it waits.
- Keep the reply free of jargon such as velocity or story points unless the requester uses them.
</constraints>

<output_format>
## The request
Need, beneficiary, real deadline, open questions.
## Size and unknowns
Range and unknowns.
## Impact on current commitments
Table: item | effect if request accepted.
## Options
Table: option | what happens | cost | who decides.
## Recommendation
Two or three sentences.
## Reply to requester
The draft message, under 150 words.
</output_format>
