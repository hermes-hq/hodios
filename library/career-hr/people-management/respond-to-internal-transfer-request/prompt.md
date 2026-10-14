---
schema: 1
id: respond-to-internal-transfer-request
kind: prompt
title: Respond when a report wants to move teams
description: Plans a manager's response when a report wants to move to another team internally - the first conversation, supporting the move, agreeing timing and handover with the receiving manager, and backfill.
category: people-management
version: 1.0.0
status: incubating
stage: [plan]
role: [manager, engineering-manager, operations-manager, founder]
requires: [none]
inputs: [notes]
output: [plan, script, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [internal-mobility, transfer-request, handover-plan, backfill, talent-hoarding]
pairs_with:
  prompts: [respond-to-resignation, run-career-conversation, plan-key-person-cover]
  personas: [hr-business-partner]
args:
  - name: situation
    description: Who wants to move (role, initials), to which team or role, how you found out (they told you, the other manager did, they applied), their reasons if known, their current responsibilities, and the effect on your team.
    type: text
    required: true
  - name: policy
    description: Your company's internal transfer rules if you know them, such as minimum time in role, whether managers must approve, and standard release periods. Optional.
    type: text
output_contract:
  format: markdown
  sections: [First conversation, Your honest view, Working with the receiving manager, Handover plan, Backfill and the team, What it tells you]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help managers handle the moment a report says they want to move to another team. Internal moves keep good people in the company who would otherwise leave, but the losing manager often treats them as disloyalty: blocking or delaying release, talking down the person to the receiving manager, guilt-tripping, or quietly withdrawing good work. This "talent hoarding" teaches people that the only safe way to move is to leave the company. A good response thanks them for being open, understands what draws them to the new role (and whether something fixable is pushing them away), supports the move honestly, agrees a realistic release date and handover with the receiving manager and HR, and plans backfill early. If the person is on a performance plan or the move would leave a critical gap, those facts should be handled openly through the transfer process, not by stalling.

<situation>
{{situation}}
</situation>
{{#policy}}
<policy>
{{policy}}
</policy>
{{/policy}}
</context>

<task>
1. First conversation: what to say first (thanks, support, curiosity), questions to understand the pull and any push factors, and what not to say.
2. Your honest view: whether anything pushing them away is fixable and worth offering, without pressure, and how to give an honest reference to the receiving manager (strengths and development areas you have already discussed with the person, nothing new).
3. Working with the receiving manager: what to agree (start date, release period within policy, part-time overlap if useful), how to raise genuine business constraints, and involving HR.
4. Handover plan: a table of responsibilities and knowledge, new owner, method, and date.
5. Backfill and the team: whether to backfill as is or rethink the role, the cover plan meanwhile, and how and when to tell the team.
6. What it tells you: what this move might say about growth opportunities on your team, and one thing to change.
</task>

<constraints>
- Use only the facts given; mark gaps [X]. Do not invent policy rules.
- Do not advise blocking, delaying beyond policy, or undermining the person's application.
- Feedback shared with the receiving manager must be honest and limited to what the person has already heard.
- Do not share the person's reasons with the team unless they agree.
</constraints>

<output_format>
## First conversation
## Your honest view
## Working with the receiving manager
## Handover plan
Table: Responsibility | New owner | How | By when.
## Backfill and the team
## What it tells you
</output_format>
