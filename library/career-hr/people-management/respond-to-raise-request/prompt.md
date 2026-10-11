---
schema: 1
id: respond-to-raise-request
kind: prompt
title: Respond when a report asks for a raise
description: Plans a manager's response when a report asks for a pay rise - the first reply, what to check on pay and policy, what you can and cannot promise, and how to follow up with a clear answer.
category: people-management
version: 1.0.0
status: incubating
stage: [plan]
role: [manager, engineering-manager, operations-manager, founder]
requires: [none]
inputs: [notes, message]
output: [script, checklist, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [pay-rise, compensation, pay-equity, retention, manager-response]
pairs_with:
  prompts: [allocate-merit-increases, run-career-conversation, respond-to-resignation]
  personas: [hr-business-partner]
args:
  - name: request
    description: What the person asked for and how (amount if they gave one, their reasons, any mention of an outside offer), their role, level and tenure (initials only), and how they perform.
    type: text
    required: true
  - name: pay_context
    description: What you know about their current pay versus band or peers, your company's pay review timing, budget and who approves raises. Optional; leave blank if you do not know.
    type: text
output_contract:
  format: markdown
  sections: [In the moment, What to check, Weighing the case, Possible answers, Delivering the answer, Follow-up note]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help managers respond well when someone asks for more pay outside the normal cycle. The worst responses are an instant yes the manager cannot deliver, an instant no that ends the conversation, or "leave it with me" followed by weeks of silence. A good response thanks the person, listens to the reasons, says honestly what the manager can decide and what they cannot, gives a date for an answer, and then actually checks: where their pay sits against the band and against peers in similar roles (pay equity matters, and in some places pay transparency rules apply), whether their scope has grown beyond their level, the pay review calendar, and budget. Market data the employee brings is worth reading, not dismissing. If the answer is no or not yet, the person deserves the reason and what would change it. Raises given only to people who ask, or only under threat of leaving, create unfairness in a team over time.

<request>
{{request}}
</request>
{{#pay_context}}
<pay_context>
{{pay_context}}
</pay_context>
{{/pay_context}}
</context>

<task>
1. In the moment: what to say if they ask in a one-on-one and you need time, including a specific date for an answer and what you will look at. Include what not to say.
2. What to check: a checklist covering band position, internal peers in similar roles, changes in their scope or level, performance evidence, the market data they gave, the pay review cycle, budget and approval route, and any pay transparency or equal pay duties to confirm with HR for their location.
3. Weighing the case: from the facts given, which reasons are strong (scope growth, below band, internal inequity) and which are weaker on their own (cost of living, a colleague's pay heard second-hand), and what is unknown.
4. Possible answers: yes now, yes at the next review, partial or non-pay alternatives (title or scope change, development budget), and no, each with when it fits.
5. Delivering the answer: a short script for the most likely answer, including the reason and, for a no or not yet, what would need to be true and by when it will be reviewed.
6. Follow-up note: a brief written summary to send after the answer.
</task>

<constraints>
- Do not invent salary figures, bands or market rates; mark them [X] and say where to get them (HR, the compensation team, reputable salary surveys).
- Never promise an amount or date the manager cannot approve.
- Do not disclose other employees' pay.
- If an outside offer is mentioned, address it calmly and without retaliation; do not encourage matching offers as the only route to raises.
</constraints>

<output_format>
## In the moment
## What to check
## Weighing the case
## Possible answers
## Delivering the answer
## Follow-up note
</output_format>
