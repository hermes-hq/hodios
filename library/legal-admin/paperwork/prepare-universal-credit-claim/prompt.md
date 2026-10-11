---
schema: 1
id: prepare-universal-credit-claim
kind: prompt
title: Prepare a Universal Credit claim
description: Guides a UK Universal Credit claim covering what to check first, what to gather, the online claim, identity, the journal, the first appointment and advance payments.
category: paperwork
version: 1.0.0
status: incubating
stage: [plan, build]
role: [individual, parent, job-seeker]
subject: [law]
requires: [none]
inputs: [text]
output: [checklist, plan, questions]
risk: read-only
advice_risk: [legal, financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [universal-credit, uk-benefits, dwp, advance-payment, claimant-commitment, housing-costs]
pairs_with:
  prompts: [check-benefits-entitlement, apply-for-unemployment-benefits, appeal-benefits-decision]
args:
  - name: situation
    description: Who is in your household (partner, children and ages), work and earnings, savings, rent or mortgage and who the landlord is, health conditions that limit work, caring for someone, and any benefits or tax credits you get now.
    type: text
    required: true
  - name: reason
    description: Why you are claiming now (job loss, reduced hours, separation, illness, moved from tax credits or another benefit, a letter telling you to move) and the date it happened.
    type: text
    required: true
  - name: stage
    description: Optional. Where you are - not started, account made, claim submitted, appointment booked, first payment received - and any problem.
    type: text
output_contract:
  format: markdown
  sections: [Check before you claim, What you will need, Making the claim, Your first appointment and commitment, First payment and advances, Using your journal, If something goes wrong]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help someone in the UK claim Universal Credit (UC). How it works in general: a single monthly payment assessed over a monthly assessment period that starts on the claim date, so the claim date sets when money starts and claiming late usually loses money; couples living together claim jointly; the first payment normally arrives about five weeks after the claim; an advance can be requested to cover that gap but is a loan repaid from later payments; there is a standard allowance plus possible elements for children, housing costs, limited capability for work and caring; earnings reduce the award through a taper; savings above set limits reduce or stop it; and the claimant agrees a claimant commitment with a work coach and manages the claim through an online journal. Three high-risk moments: anyone still receiving one of the older benefits that UC is replacing loses it when they claim UC, so they should run an independent benefits calculator first unless they have received a move notice; couples where one partner is over State Pension age and the other is not usually have to claim UC jointly rather than Pension Credit, which changes the household's income; and missed appointments or journal tasks can lead to sanctions. Rates, limits and rules such as savings limits, the taper, work allowances and limits on child elements change, usually each April, and have been subject to policy change. Every figure must be checked against the official GOV.UK guidance for the current tax year.

<situation>
{{situation}}
</situation>

<reason>
{{reason}}
</reason>

{{#stage}}
<stage>
{{stage}}
</stage>
{{/stage}}
</context>

<task>
1. Check before claiming: whether the person or partner still receives an older benefit that UC replaces and should run an independent benefits calculator first (unless they have a move notice), whether one partner is over State Pension age, whether savings, a partner's income or student status may affect eligibility, and whether to claim today to protect the date. Mark rules "[check GOV.UK for the current tax year]".
2. List what to gather: identity documents, bank account, National Insurance number, tenancy agreement and rent amount, landlord details, childcare costs, earnings and payslips, savings, details of any health condition and fit notes, and partner details.
3. Walk through making the claim: creating the account, identity verification options if online checks fail, the to-do list, the deadline to finish the claim, and the first appointment booking.
4. Prepare the first work coach appointment: what to bring, how the claimant commitment is set, how to make sure health, caring or childcare limits are recorded so expectations are realistic, and questions to ask.
5. Explain first payment and advances: when it is likely to arrive, how an advance works and is repaid, the trade-off of taking one, and other help to ask about (rent paid direct to a landlord, more frequent payments where available, budgeting support).
6. Explain using the journal: reporting changes, uploading evidence, keeping screenshots of entries, and replying to to-dos quickly.
7. If something goes wrong (sanction, wrong amount, refusal): ask for a mandatory reconsideration within the time limit, then appeal, marked "[to verify]", and get free help from an advice service or welfare rights adviser.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state rates, savings limits, taper percentages, work allowances or child element rules as fact; tell the person to check GOV.UK for the current tax year.
- Do not tell anyone still on an older benefit that UC replaces to claim UC without first checking with a benefits calculator or adviser, unless they have a move notice.
- Never help hide a partner, income, savings or a change of circumstances.
- If the person mentions having no money for food, heating or rent this week, start with urgent help: advances, local welfare or hardship funds, and food banks.
{{> output/uncertainty}}
</constraints>

<output_format>
## Check before you claim
Bullets, starting with any legacy-benefit warning.

## What you will need
Checklist.

## Making the claim
Numbered steps.

## Your first appointment and commitment
Bullets and questions to ask.

## First payment and advances
Bullets.

## Using your journal
Bullets.

## If something goes wrong
Numbered steps with time limits marked "[to verify]".
</output_format>
