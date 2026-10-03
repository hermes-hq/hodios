---
schema: 1
id: plan-co-parenting
kind: prompt
title: Plan co-parenting logistics
description: Plans co-parenting logistics and communication after separation, with schedule options by age, handovers, shared rules, a message template and ways to keep children out of conflict.
category: parenting
version: 1.0.0
status: incubating
stage: [plan]
role: [parent]
requires: [none]
inputs: [text, preferences]
output: [plan, table, message, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [co-parenting, separation, divorce, parenting-schedule, handovers, parallel-parenting]
pairs_with:
  prompts: [explain-hard-topic-to-child, coordinate-family-calendar, prepare-difficult-conversation]
  personas: [parenting-coach]
args:
  - name: situation
    description: Where things stand, for example when you separated, how far apart you live, work patterns, the current arrangement, any court order or agreement, how well you communicate, what you disagree on, and your country. Leave out names.
    type: text
    required: true
  - name: children_ages
    description: The children's ages, for example "2 and 9". Optional, but schedules depend on it.
    type: string
output_contract:
  format: markdown
  sections: [First, Schedule options, Handovers, Shared rules, How we communicate, Message template, Keeping the children out of it, Money and admin, When you disagree]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help separated parents organise co-parenting so the children feel secure in both homes. Research on children after separation is consistent: what harms them most is ongoing conflict between their parents, especially conflict they see or are drawn into, more than the separation itself. Good arrangements are predictable, fit the children's ages, keep handovers calm, and use businesslike communication between parents. Where conflict is high, parallel parenting (minimal direct contact, each household running its own way, structured written communication) protects children better than forcing close cooperation.

{{#children_ages}}Children's ages: {{children_ages}}{{/children_ages}}

<situation>
{{situation}}
</situation>
</context>

<task>
1. First: check for safety. If the situation mentions domestic abuse, coercive control, threats, a parent who is a risk to the children, or fear of the other parent, lead with safety: point to domestic-abuse services, the police in an emergency, and a family lawyer; say that joint-communication approaches may not be safe and that handovers can happen through a third party or a supervised contact centre. Then adapt the rest.
2. Schedule options: two or three arrangements that fit the children's ages, the distance and the work patterns (for example, for young children shorter, more frequent time with each parent; for school-age children patterns such as 2-2-3, 2-2-5-5 or alternating weeks; for teenagers more say in the plan), with pros and cons. Add holidays, birthdays and special days, and how to handle changes. If there is a court order, say the plan must work within it.
3. Handovers: where and how (school or nursery handovers often avoid face-to-face friction), what travels with the children, a short handover note template, and how to handle a child who does not want to go.
4. Shared rules: a table separating essentials both homes agree on (bedtimes within a range, homework, screens, safety rules, medical and school information) from things each home decides.
5. How we communicate: a channel just for logistics (email or a co-parenting app), response times, and the BIFF style (brief, informative, friendly, firm). Say what goes in writing.
6. Message template: a short BIFF message for a common logistics request, plus a rewrite of any heated example the user gave.
7. Keeping the children out of it: no messengers, no questioning about the other home, no criticism of the other parent in their hearing, reassurance that it is not their fault, and age-appropriate words for explaining the arrangement.
8. Money and admin: shared costs, how to record them, and who handles school, medical and activity sign-ups.
9. When you disagree: a step-by-step route (written proposal, a cooling-off period, mediation) and when to get legal advice.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not tell the user what custody, residence or child-support arrangement they are entitled to or will get, and do not interpret court orders. Family law differs a lot by country and region; say which kind of professional to see (family lawyer, mediator, legal aid service) and to check local rules.
- Do not take sides or diagnose the other parent. Describe behaviour, not character.
- Keep the children's needs at the centre, including their own views as appropriate to their age.
- If the children's ages are missing, give options for different age bands and ask for them.
- Practical and calm; the user may be in a painful period.
</constraints>

<output_format>
## First
One line, or the safety steps.
## Schedule options
Table: Option | How it works | Suits | Watch out for. Then holidays and special days.
## Handovers
## Shared rules
Table: Area | Same in both homes | Each home decides.
## How we communicate
## Message template
## Keeping the children out of it
## Money and admin
## When you disagree
</output_format>
