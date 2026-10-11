---
schema: 1
id: apply-for-food-assistance
kind: prompt
title: Apply for food assistance
description: Guides an application for a government food assistance programme such as SNAP, covering eligibility questions, documents, the interview, reporting duties and what to do if denied.
category: paperwork
version: 1.0.0
status: incubating
stage: [plan, build]
role: [individual, parent]
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
tags: [snap, food-stamps, food-assistance, benefit-claim, eligibility-interview, low-income]
pairs_with:
  prompts: [check-benefits-entitlement, appeal-benefits-decision, plan-meals-from-food-parcel, prepare-government-form]
args:
  - name: household
    description: Who lives and buys food with you (ages, disabilities, students, anyone 60 or over), monthly income from each source before tax, savings, rent or mortgage, utilities, childcare and medical costs.
    type: text
    required: true
  - name: location
    description: Country and state, province or region. Programmes, limits and how to apply differ.
    type: string
    required: true
  - name: status
    description: Optional. Whether you have applied before, have an application in progress, an interview date, a denial letter, or a citizenship or immigration question.
    type: text
output_contract:
  format: markdown
  sections: [Apply now if urgent, Which programme and what decides it, Documents to gather, The interview, After approval, If you are denied]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a household apply for government food assistance, such as SNAP in the United States or a comparable programme elsewhere. Common reasons eligible people miss out or get less: they assume they earn too much without counting the deductions many programmes allow (housing and utility costs, childcare, child support paid, and medical costs for older or disabled members); they wait to collect every document instead of filing a basic application that sets the start date; they miss the eligibility interview call and the case closes; they do not report a change in time; or they do not know some programmes have expedited processing for households with very little income or cash. Household is usually defined as people who buy and prepare food together, not everyone under one roof. Students, some immigrants and able-bodied adults without dependants can face extra rules. Eligibility limits change every year, so any figure must be checked for the current year. Separate help (school meals, programmes for pregnant women and young children, food banks) can run alongside.

Location: {{location}}

<household>
{{household}}
</household>

{{#status}}
<status>
{{status}}
</status>
{{/status}}
</context>

<task>
1. If the household has very little money or food right now, say first how to apply immediately (a basic application with name, address and signature is often enough to set the date), ask about expedited processing, and point to food banks for today.
2. Name the programme or programmes that usually exist in {{location}} and the agency type that runs them, marked "[to verify]". Then list what usually decides eligibility and amount, answering from what was given or marking "[to confirm]": who counts in the household, gross and net income, allowable deductions, assets if counted, and special rules for students, older or disabled members, workers without dependants and immigration status.
3. Do a rough, clearly labelled screening against the rules only if the person supplies the current limits; otherwise list the exact figures to look up for the current year and do not guess.
4. Build the documents checklist: identity, address, income for the last month, housing and utility bills, childcare and child support, medical costs for members who qualify, and immigration documents only for those applying.
5. Prepare the interview: how it usually works (phone or in person), the questions to expect, how to answer accurately, what to do if the call is missed, and what to ask about the decision date.
6. Explain duties after approval: renewal or recertification, what changes to report and by when, and how benefits are usually used.
7. Explain what to do if denied or given less than expected: get the written reasons, check the figures, the appeal or fair hearing route and its deadline marked "[to verify]", and free help such as legal aid or advice charities.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state income limits, benefit amounts or deadlines unless the person supplied them; limits change every year, so tell them to check the official agency for the current year.
- Never help hide income, household members or assets; explain briefly that this leads to repayment and penalties.
- If a household member's immigration status is a concern, say that some members may be able to apply for the others without applying themselves, and that an immigration adviser should check the effect before applying, marked "[to verify]".
- Keep the tone practical and free of judgement.
{{> output/uncertainty}}
</constraints>

<output_format>
## Apply now if urgent
Two or three lines.

## Which programme and what decides it
Table: Factor | Your situation | To confirm. Then the figures to look up.

## Documents to gather
Checklist.

## The interview
Bullets.

## After approval
Bullets.

## If you are denied
Numbered steps.
</output_format>
