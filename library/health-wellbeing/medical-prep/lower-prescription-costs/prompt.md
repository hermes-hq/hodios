---
schema: 1
id: lower-prescription-costs
kind: prompt
title: Lower your prescription costs
description: Finds safe ways to pay less for prescribed medicines, such as generics, supply length, prepayment, pharmacy comparison and support programmes, as questions for your prescriber and pharmacist.
category: medical-prep
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
subject: [medicine]
requires: [none]
inputs: [text]
output: [table, questions, checklist]
risk: read-only
advice_risk: [medical, financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [prescription-costs, generic-medicines, pharmacy, health-insurance, medicine-affordability]
pairs_with:
  prompts: [budget-for-ongoing-health-costs, prepare-medication-review, prepare-pharmacist-consultation, build-medication-list]
  personas: [pharmacist-educator, health-navigator]
args:
  - name: medicines
    description: Each medicine with strength, how often, how much you get at a time and what you pay, for example "insulin glargine pens, monthly, 95 dollars copay", "atorvastatin 20 mg, 28 tablets, £9.90 charge". Only what is on your labels.
    type: text
    required: true
  - name: coverage
    description: How you pay, for example "employer insurance with high deductible", "national health service prescription charge", "no insurance", "Medicare Part D". Optional.
    type: text
  - name: country
    description: Country (and state or region if relevant), because charges, exemptions and programmes differ completely.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Your medicines at a glance, Options to ask about, Questions for your prescriber, Questions for your pharmacist or insurer, What not to do, Next steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help someone pay less for medicines they have been prescribed, safely. The biggest savings usually come from a few levers: a generic or biosimilar version; a different medicine in the same class that is cheaper or on a lower insurance tier (only the prescriber can decide this); a different strength, pack size or supply length (for example a 90-day supply or mail-order pharmacy); prepayment certificates, annual caps or exemption categories in systems with prescription charges; comparing pharmacy prices, which can vary widely where prices are not fixed; discount cards, which can beat an insurance copay but may not count toward a deductible; manufacturer savings and patient assistance programmes, which often exclude people on government insurance; insurer processes such as prior authorisation and formulary exceptions; and a medication review to stop medicines that are no longer needed. People also cut costs dangerously: skipping or stretching doses, splitting tablets that should not be split, or buying from unlicensed online sellers. The aim is to turn their list into specific, safe questions for the people who can act.

Medicines: {{medicines}}
{{#coverage}}Coverage: {{coverage}}{{/coverage}}
Country: {{country}}
</context>

<task>
1. Safety first: if they say they are already skipping, rationing or stretching doses because of cost, say to tell the prescriber or pharmacist now, because there are usually safer options and some medicines (such as insulin, anticoagulants, epilepsy and heart medicines) are dangerous to ration.
2. Your medicines at a glance: a table of each medicine as given, what they pay, how often, and a yearly cost (cost per fill times fills per year, with the arithmetic shown; use [X] where a figure is missing).
3. Options to ask about: for each medicine, the levers above that could plausibly apply, written as questions ("Is there a generic or a lower-tier alternative to…?"), with the levers that fit {{country}} and any coverage they described. Name national schemes only when confident and mark them "verify". Rank by likely saving and effort.
4. Questions for your prescriber: whether a cheaper equivalent or alternative exists, whether every medicine is still needed (medication review), whether a different strength or supply length is possible, and help with prior authorisation or exception requests.
5. Questions for your pharmacist or insurer: cash price versus copay, whether a discount card is cheaper and whether it counts toward the deductible, formulary tier and preferred pharmacies, mail-order options, prepayment or cap schemes, and whether a tablet can safely be split.
6. What not to do: no skipping, stretching or sharing doses, no splitting unless the pharmacist confirms it is safe for that product, no buying from sellers that do not require a prescription or are not licensed, and no stopping without talking to the prescriber.
7. Next steps: a short ordered list of what to do this week.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not invent prices, copays, scheme names, eligibility or discount amounts. Use only the figures given; mark anything else as something to check.
- Do not recommend switching to a specific medicine; alternatives are the prescriber's decision.
- Do the arithmetic exactly with the numbers given and show it.
- Be practical and non-judgemental; cost pressure is common and worth raising.
</constraints>

<output_format>
## Your medicines at a glance
Table: Medicine | What you pay | How often | Yearly cost (with arithmetic).
## Options to ask about
Table: Medicine | Option | Question to ask | Who to ask | Likely saving (high / medium / low / unknown).
## Questions for your prescriber
## Questions for your pharmacist or insurer
## What not to do
## Next steps
</output_format>
