---
schema: 1
id: plan-grandparent-childcare-arrangement
kind: prompt
title: Plan a grandparent childcare arrangement
description: Sets up regular childcare by grandparents or other relatives with clear days, house rules, money, safety basics, backup cover and a review, so it works without straining the relationship.
category: family-logistics
version: 1.0.0
status: incubating
stage: [plan]
role: [parent]
requires: [none]
inputs: [text, preferences]
output: [plan, checklist, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [grandparents, family-childcare, house-rules, expectations, backup-childcare, regular-check-in]
pairs_with:
  prompts: [write-babysitter-handbook, plan-family-meeting, plan-sick-day-childcare-cover]
args:
  - name: arrangement
    description: Who is caring, which days and hours, where, and for which children with ages.
    type: text
    required: true
  - name: worries
    description: What the parents or the carer are unsure about, for example "Grandad lets them have sweets all day; Grandma is tired by Friday; we don't know if we should pay". Optional.
    type: text
  - name: country
    description: Country or region, in case there are schemes or credits for relatives providing care, which are flagged to check. Optional.
    type: string
output_contract:
  format: markdown
  sections: [What to agree, House rules that matter, Money and costs, Safety basics, Backup and time off, The conversation, Review]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help parents and grandparents (or aunts, uncles and other relatives) set up regular childcare that lasts. Family childcare is generous and flexible, and it goes wrong in predictable ways: nobody agreed what happens when the grandparent is ill or wants a holiday, rules differ and the parents criticise afterwards, money is never discussed so resentment builds on one side, and an older carer quietly gets exhausted but feels unable to say so. Safety practice has also changed since the grandparents raised their own children (safe sleep for babies, car seats, medicines kept out of reach). The arrangement works best when it is treated as a real agreement, kept light, with a planned review where either side can change it without it being a family crisis.

<arrangement>
{{arrangement}}
</arrangement>
{{#worries}}Worries: {{worries}}{{/worries}}
{{#country}}Country or region: {{country}}{{/country}}
</context>

<task>
1. What to agree: a short list of the practical points: days and hours, drop-off and pickup, what happens on the carer's own appointments and holidays, notice for changes on both sides, school holidays, and sick children.
2. House rules that matter: separate the few rules that must be the same at both homes (safety, sleep for babies, allergies, screen limits if they matter to the parents) from the many that can differ, and suggest the parents let the rest go.
3. Money and costs: ways families handle money: unpaid, covering costs (food, fuel, outings, equipment), a regular payment, or paying in kind. Flag that some countries have credits or schemes for relatives who provide childcare and that paying a relative can have tax or benefit effects, as things to check for {{country}} or the user's location, without stating rules.
4. Safety basics: a gentle checklist of current practice to go through together: safe sleep for babies, car seats and who fits them, medicines and cleaning products out of reach, allergy and emergency plan, and anything specific to the carer's home such as stairs, ponds or pets.
5. Backup and time off: a backup person for the carer's sick days and holidays, and a rule that the carer can say no without guilt.
6. The conversation: a short, warm script for raising the arrangement and a hard topic from the worries, written so it thanks the carer and invites their view.
7. Review: a check-in after the first month and each term, with three questions both sides answer.
</task>

<constraints>
- Treat the carer with respect: no plan that micromanages or treats them as staff.
- Do not state tax, benefit or pension-credit rules as fact; mark them "check locally".
- Raise safety practice as "what's changed" rather than criticism.
- Look out for the carer's health and energy; if the worries suggest they are struggling, say so kindly and suggest reducing days.
</constraints>

<output_format>
## What to agree
Checklist.
## House rules that matter
Two lists: Same in both homes | Fine to differ.
## Money and costs
## Safety basics
Checklist.
## Backup and time off
## The conversation
Script in a code block.
## Review
</output_format>
