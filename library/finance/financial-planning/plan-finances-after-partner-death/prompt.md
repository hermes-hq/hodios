---
schema: 1
id: plan-finances-after-partner-death
kind: prompt
title: Plan finances after a partner's death
description: Gives a gentle, ordered checklist of money tasks after a partner's death, from urgent bills and benefits to accounts, the estate and longer-term decisions that can wait.
category: financial-planning
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [text]
output: [checklist, plan]
risk: read-only
advice_risk: [financial, legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [bereavement, widowhood, estate-administration, survivor-benefits, probate]
pairs_with:
  prompts: [plan-separation-finances, build-tight-budget, review-insurance-coverage]
  personas: [personal-finance-coach]
args:
  - name: situation
    description: As much or as little as you want to share - when your partner died, whether you were married or living together, children, your home (owned or rented, whose name), what you know about accounts, a will, insurance and pensions, and what feels most pressing.
    type: text
    required: true
  - name: country
    description: Country where you live (and where your partner's assets are, if different), since registration, benefits and estate rules differ.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [First, This week, The next few weeks, The first few months, Later and no rush, Documents to gather, Who to contact, What you do not have to do yet, Help available]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The person writing has lost their partner. Grief makes ordinary admin feel impossible, and the list of tasks after a death is long, but very little of it is urgent. The most helpful thing is order: what genuinely must happen in the first days (registering the death, arranging the funeral, keeping essential bills and income flowing), what can follow over weeks (notifying organisations, claiming benefits and insurance), what takes months (settling the estate), and what should wait (big decisions about the home, investments or lump sums). People in this position are also targeted by scams and by pressure to decide quickly.

Country: {{country}}

<situation>
{{situation}}
</situation>
</context>

<task>
1. First: two or three warm sentences acknowledging the loss, then say plainly that most tasks can wait and that this list is in the order things usually matter. Offer to go one section at a time if that is easier.
2. This week: registering the death and getting several certified copies of the death certificate; the funeral and who pays (the estate can often reimburse; check for a prepaid funeral plan or a funeral payment benefit); keeping essential bills, rent or mortgage and income going; what happens to joint accounts (often usable by the survivor) versus sole accounts (often frozen); securing the home and car.
3. The next few weeks: telling organisations (in some countries one government service notifies several agencies at once - mention it only if confident for this country), employer for final pay and any death-in-service benefit, pension providers for survivor pensions, life insurers, banks, utilities and subscriptions; claiming bereavement or survivor benefits to check; children's benefits or survivor payments if there are children.
4. The first few months: the will and the executor or administrator; whether formal probate or estate administration is likely to be needed and roughly what it involves; the deceased's debts (generally paid from the estate; survivors are usually not personally liable for debts in the partner's sole name unless they were joint borrowers or guarantors - say this carefully and tell them to verify before paying anything); the final tax return; property in the partner's name; unmarried partners' position, which can be much weaker and needs a lawyer early.
5. Later and no rush: a budget on one income, reviewing the person's own will, beneficiaries, insurance and power of attorney; avoiding major decisions (selling the home, investing a lump sum, lending money) for 6-12 months where possible; when to see a financial adviser.
6. Documents to gather: a checklist.
7. Who to contact: table of organisation, why, what they will ask for, and how urgent.
8. What you do not have to do yet: a short reassuring list.
9. Help available: bereavement support services, free legal or money advice, and the doctor for the person's own wellbeing.
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- Tone: gentle, plain and calm. Short sentences. No jargon without a one-line explanation. No exclamation marks, no platitudes such as "everything happens for a reason".
- Tailor to what they shared; do not ask for more than they want to give. If something important is unknown (married or not, whose name the home is in), ask at the end, gently.
- Country-specific names, benefits and procedures only when confident; otherwise describe the type of task and say "check locally".
- Warn about scams aimed at the bereaved: callers claiming debts, fake inheritance or "unclaimed money" offers, investment pitches for lump sums.
- Do not tell them to pay any of the partner's debts personally before checking liability.
{{> output/uncertainty}}
</constraints>

<output_format>
## First
Two or three sentences.

## This week
Short checklist.

## The next few weeks
Checklist.

## The first few months
Checklist with brief explanations.

## Later and no rush
Bullets.

## Documents to gather
Checklist.

## Who to contact
Table: organisation | why | what they need | when.

## What you do not have to do yet
Short list.

## Help available
Bullets.
</output_format>
