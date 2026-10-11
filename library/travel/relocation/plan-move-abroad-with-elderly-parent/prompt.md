---
schema: 1
id: plan-move-abroad-with-elderly-parent
kind: prompt
title: Plan a move abroad with an elderly parent
description: Plans moving countries with an older parent who will live with or near you - whether it suits them, care and health cover, isolation, housing, and a fallback if it does not work out.
category: relocation
version: 1.0.0
status: incubating
stage: [plan, discover]
role: [individual, parent]
requires: [none]
inputs: [preferences, text]
output: [plan, checklist, questions]
risk: read-only
advice_risk: [legal, medical, financial]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [ageing-parent, family-move, eldercare, moving-abroad, intergenerational]
pairs_with:
  prompts: [plan-move-abroad-with-health-condition, access-healthcare-abroad, prepare-for-parent-moving-in, plan-staggered-family-move]
  personas: [relocation-consultant]
args:
  - name: parent
    description: Your parent's age, health and mobility in general terms, how independent they are, languages they speak, their social life now, and what they think about the move.
    type: text
    required: true
  - name: move
    description: From and to, why you are moving, when, and whether they will live with you, nearby or in care.
    type: text
    required: true
  - name: concerns
    description: What worries you or them most, siblings or others involved, and anything already decided. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Is this right for them, Biggest risks, Before deciding, Care and health, Home and daily life, Staying connected, Fallback plan, Questions to check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Families often move a parent abroad with them out of love and then find the parent miserable or stuck. The usual problems are predictable. Residence rights for a dependent parent are often much harder to get than for a partner or child, and may not include public healthcare. Private insurance for older people can be costly, exclude existing conditions or stop at an age limit. A pension may be paid abroad at a frozen rate or need paperwork each year. A parent who drove, had friends and spoke the language at home may become fully dependent on the adult child abroad, with no peers, no transport and nothing to do while the family works and the children are at school. Care that was free or nearby at home may be unavailable or expensive. And returning later is harder than leaving, because the home is sold and the place on waiting lists is lost. The most important input is the parent's own view, heard without the family's hopes speaking over it.

<parent>
{{parent}}
</parent>
<move>
{{move}}
</move>
{{#concerns}}
<concerns>
{{concerns}}
</concerns>
{{/concerns}}
</context>

<task>
1. Is this right for them: weigh what the parent gains and loses, how much of the decision is theirs, and alternatives (staying with support at home, long visits, moving later, moving near rather than with you). Suggest how to have the conversation so the parent can speak freely.
2. Biggest risks for this family, ranked.
3. Before deciding: the facts to establish first, framed as questions for official sources or advisers: residence rights for a dependent parent, health cover eligibility and insurance limits, pension payment abroad, care services and costs at the destination.
4. Care and health: continuity of medicines and records, a doctor at the destination, what happens if care needs grow, and power of attorney or similar arrangements in both countries to ask a lawyer about.
5. Home and daily life: housing that suits them now and later (stairs, bathroom, distance to shops), their own space and routines, transport without driving, and things to do.
6. Staying connected: keeping old friendships and links, finding peers in their language or interests, and the language question at their age.
7. Fallback plan: what to keep at home for a while (housing, registrations, doctor), a review point, and how a return would work.
8. List the questions to check with official sources, a lawyer, a financial adviser and their doctor.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state visa, residence, healthcare eligibility, pension or tax rules for any country as fact; turn them into questions to check with official sources.
- Do not give medical advice about the parent's condition; point health questions to their doctor.
- Treat the parent as the person who decides about their own life, unless the user says they lack capacity, in which case point to legal advice on decision-making.
- Do not encourage selling the parent's home or giving up rights at home before the move is proven to work.
- If the user describes neglect, abuse or a crisis, say plainly where to get urgent help.
</constraints>

<output_format>
## Is this right for them
## Biggest risks
Numbered.
## Before deciding
Checklist of facts to establish.
## Care and health
## Home and daily life
## Staying connected
## Fallback plan
## Questions to check
Grouped by who to ask.
</output_format>
