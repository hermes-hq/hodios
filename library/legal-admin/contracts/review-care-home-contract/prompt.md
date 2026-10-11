---
schema: 1
id: review-care-home-contract
kind: prompt
title: Review a care home or assisted living contract
description: Reviews a care home or assisted living admission agreement for fees and increases, deposits, top-ups, what is included, notice, discharge rules, refunds after death and complaints.
category: contracts
version: 1.0.0
status: incubating
stage: [review]
role: [individual, parent]
subject: [law, social-care]
requires: [none]
inputs: [document]
output: [report, table, questions]
risk: read-only
advice_risk: [legal, financial]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [care-home, assisted-living, admission-agreement, care-fees, residential-care, nursing-home]
pairs_with:
  prompts: [evaluate-care-homes, settle-relative-into-care-home, explain-contract-clause]
args:
  - name: contract
    description: The admission agreement, residence contract, fee schedule and any house rules or policies it refers to, with clause numbers. Remove names, dates of birth and ID numbers.
    type: text
    required: true
  - name: situation
    description: Who is moving in (relationship to you, care needs in general terms), who is paying (self-funded, public funding, family top-up), who would sign, and what worries you.
    type: text
    required: true
  - name: country
    description: Country and region. Care funding, regulation and resident protections differ a lot.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [In brief, What it will cost, Clause check, Who is signing for what, Questions to ask the home, Get advice if]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Families usually sign a care home contract in a crisis, often after a hospital discharge, with little time to read it. What elder-care advisers and advocates check: the weekly or monthly fee and exactly what it covers (care level, laundry, toiletries, hairdressing, outings, continence products, escorts to appointments), and what is extra; how and when fees can rise, by how much and with what notice; fee changes when care needs increase; deposits and upfront fees and whether they are refundable; third-party or family "top-up" payments and what happens if the payer cannot continue; whether a relative signing becomes personally liable for fees as a guarantor rather than just a contact; the trial period; notice periods for leaving and fees charged after death (some contracts charge for days or weeks after a resident dies or until the room is cleared); grounds on which the home can ask a resident to leave and the process and notice; absence charges for hospital stays; handling of personal money and belongings; and the complaints process and regulator. Public funding rules and resident protections depend heavily on the country and region.

Country and region: {{country}}

<situation>
{{situation}}
</situation>
</context>

<task>
<contract>
{{contract}}
</contract>

1. In brief: what the resident and any signer commit to, the likely monthly and annual cost, and the three most important issues.
2. What it will cost: base fee, extras listed, deposits, top-ups, and how fees can increase; work out monthly and annual cost and a simple example of a stated increase, with arithmetic. List items whose cost is not stated.
3. Clause check, quoting each clause: parties and signer liability, care to be provided and assessment, fees and what they include, extras, increases, payment terms and late payment, deposits, top-ups, trial period, absence and hospital stays, notice by the resident, notice and grounds for the home to end the placement, fees after death, room changes, personal money and belongings, visiting and house rules, complaints and regulator, data and records.
4. Who is signing for what: whether the family member signing would be personally liable for fees, and what authority they need to sign on the resident's behalf (for example a power of attorney), as points to confirm.
5. Questions to ask the home: ranked and specific.
6. Get advice if: when to contact an elder-care or care-fees adviser, a lawyer, or the local authority or funding body.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Quote clause numbers; write "not stated" where a topic is missing. Never invent fees or funding entitlements.
- Do not state public funding rules or resident rights as fact; name them as points to check with the local authority, funding body or an adviser.
- Write plainly and kindly; the reader may be under stress.
- If the user signs for someone who may lack capacity, flag that authority to sign must be checked and do not assume it.
{{> output/uncertainty}}
</constraints>

<output_format>
## In brief
Three to five bullets.

## What it will cost
Table: item | amount | included or extra; then monthly and annual totals with arithmetic.

## Clause check
Table: topic | clause and short quote | rating (fine / check / ask) | why.

## Who is signing for what
Short bullets.

## Questions to ask the home
Numbered.

## Get advice if
Bullets.
</output_format>
