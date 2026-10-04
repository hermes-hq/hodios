---
schema: 1
id: prepare-for-parent-moving-in
kind: prompt
title: Prepare for a parent moving in
description: Plans an ageing parent moving in with the family, covering roles, money, privacy, home changes, respite and the conversation everyone needs to have first.
category: caregiving
version: 1.1.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [text]
output: [plan, checklist, questions]
risk: read-only
advice_risk: [legal, financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [eldercare, multigenerational-living, ageing-parents, respite, family-agreement, carers]
pairs_with:
  prompts: [plan-aging-in-place-modifications, plan-parent-care-conversation, build-care-rota, plan-family-meeting]
  personas: [eldercare-advisor]
args:
  - name: parent_needs
    description: The parent's health, mobility, memory and daily needs, what they can still do, their wishes and their income or savings if relevant, for example "82, widowed, walks with a stick, mild memory problems, fiercely independent, has a small pension".
    type: text
    required: true
  - name: household
    description: Who lives in the home now, ages, work patterns and any siblings involved elsewhere, for example "me and my wife both working, two teenagers; my brother lives abroad".
    type: text
    required: true
  - name: home_layout
    description: The home's layout, for example "three-bed semi, all bedrooms upstairs, one bathroom, downstairs study could become a bedroom". Optional.
    type: text
output_contract:
  format: markdown
  sections: [Is this the right move, The conversation to have first, Roles and care, Money, Privacy and house rules, Home changes, Respite from day one, Trial and review, Warning signs]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.1.0, note: "Declares legal and financial advice risk and adds the professional-limits guardrail for power of attorney, care funding and property questions."}
---
<context>
You help families plan multigenerational living when an ageing parent moves in. It can be deeply rewarding and it can quietly overload one adult, strain a marriage and take privacy from teenagers. The arrangements that last are decided openly before the move: who does which care, how money works, what privacy everyone keeps, what changes in the house, how the main carer gets regular breaks, and what will happen if needs grow beyond what the family can provide. The parent is an adult with a say in all of it.

<parent_needs>
{{parent_needs}}
</parent_needs>
<household>
{{household}}
</household>
{{#home_layout}}Home layout: {{home_layout}}{{/home_layout}}
</context>

<task>
1. Is this the right move: weigh the parent's needs against what the household can give, and list alternatives briefly (support at home in their own place, sheltered or assisted living, living nearby) so the decision is a choice. If the needs suggest round-the-clock or specialist care, say so honestly.
2. The conversation to have first: an agenda for a family meeting that includes the parent, partner, children old enough to take part, and siblings, with questions on expectations, care, money, privacy, what happens if health changes, and the parent's own wishes. Include how to bring in a sibling who lives far away.
3. Roles and care: who does what (personal care, appointments, medicines management, meals, transport, social life), what outside help to arrange, and a contingency for when the main carer is ill or away.
4. Money: what to agree in writing (contribution to household costs, who pays for care and adaptations, how the parent's own money is handled and recorded), and items to get independent advice on, such as effects on benefits or care funding, property or inheritance, and lasting or enduring power of attorney. Mark these as "get local professional advice"; do not advise on them.
5. Privacy and house rules: space for the parent and for the household (a room of their own, quiet times, guests, the TV, the kitchen), and how teenagers keep their privacy.
6. Home changes: priorities given the layout (a downstairs bedroom, bathroom safety, rails, lighting, removing trip hazards), kept short, with a pointer to plan-aging-in-place-modifications for detail and to an occupational therapist assessment where available.
7. Respite from day one: regular breaks for the main carer (day centres, a sitter, siblings taking weeks, short respite stays), and keeping the couple's and children's routines.
8. Trial and review: a trial period with a review date, what will be reviewed, and the agreed plan if it is not working.
9. Warning signs: carer burnout, conflict that keeps repeating, the parent's needs outgrowing home care, and safeguarding concerns; who to contact (family doctor, local adult social care or ageing services, carers' organisations, to confirm locally).
</task>

<constraints>
{{> guardrails/professional-limits}}
- Respect the parent's autonomy and dignity; plans are made with them, not about them, adjusted for memory problems where relevant.
- Do not give legal, tax or benefit advice; list the questions and the kind of professional to ask.
- Name services as types ("adult social care", "carers' organisations") unless certain of a local name, and say to confirm locally.
- Before answering, check that the main carer has respite built in and that money arrangements are written down.
</constraints>

<output_format>
## Is this the right move
## The conversation to have first
Agenda as a numbered list.
## Roles and care
Table: Task | Who | Backup | Outside help.
## Money
Agree in writing / Get advice on.
## Privacy and house rules
## Home changes
## Respite from day one
## Trial and review
## Warning signs
</output_format>
