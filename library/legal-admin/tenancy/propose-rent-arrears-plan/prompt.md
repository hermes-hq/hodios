---
schema: 1
id: propose-rent-arrears-plan
kind: prompt
title: Propose a plan for rent arrears
description: Helps a tenant behind on rent work out an affordable repayment offer, write it to the landlord before things escalate, and find the help and benefits to check that could close the gap.
category: tenancy
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent, student]
subject: [law, real-estate]
requires: [none]
inputs: [text, preferences]
output: [plan, message, checklist]
risk: read-only
advice_risk: [legal, financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [rent-arrears, repayment-plan, housing-debt, tenant-rights, eviction-prevention]
pairs_with:
  prompts: [respond-to-eviction-notice, apply-for-housing-assistance, negotiate-with-creditor]
  personas: [tenant-rights-advisor]
args:
  - name: situation
    description: Rent amount and due date, how much you owe and since when, why (job loss, illness, benefit delay, a one-off cost), what has been said to the landlord, and any letters or notices received.
    type: text
    required: true
  - name: budget
    description: Monthly income after tax and your essential costs, and any other debts. Rough figures are fine.
    type: text
    required: true
  - name: country
    description: Country and region of the home. Optional, but arrears rules and help vary.
    type: string
output_contract:
  format: markdown
  sections: [Urgency check, What you can afford, Help to check, Offer letter, Keeping it on track]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help tenants deal with rent arrears the way a housing debt adviser does. The tenants who keep their homes usually act early: they contact the landlord before arrears build, make an offer they can keep up (current rent plus a realistic amount off the debt), put it in writing and stick to it. Offers that are too high fail and destroy trust; silence leads to formal notices. Rent is usually a priority debt because the home is at stake, so it generally comes before credit cards and other unsecured debts. Benefits, housing allowances, hardship funds, discretionary payments and charities can sometimes close the gap, and free debt and housing advice services can negotiate on the tenant's behalf. Where arrears reach a level that allows the landlord to seek possession in that country, timing is everything.
{{#country}}

Location: {{country}}
{{/country}}
</context>

<task>
<situation>
{{situation}}
</situation>

<budget>
{{budget}}
</budget>

1. Urgency check: if any notice, court paper or hearing date is mentioned, say first, in bold, to contact a housing adviser or legal aid service now and not to ignore it.
2. What you can afford: a simple monthly budget from the figures given, putting rent and other priority bills first, and a repayment amount on top of the rent that is realistic, showing how long it would take to clear.
3. Help to check: types of help that may exist where they live (housing benefit or allowance, emergency or discretionary payments, hardship funds, debt advice, charities), as items to check, not promises.
4. Offer letter: a short, honest letter to the landlord explaining the reason briefly, the offer (current rent plus a set amount on a set date each month), any help being applied for, and a request to confirm in writing.
5. Keeping it on track: pay by a traceable method, keep receipts, what to do if a payment will be missed (tell them before, not after), and when to go back to an adviser.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not suggest an offer the budget cannot support, or borrowing at high cost to pay the arrears.
- Do not state notice periods, arrears thresholds or benefit rules as fact; mark them as local checks.
- Do not suggest leaving the home or handing back keys as a way out without advice.
- If the user mentions not being able to afford food or heating, or feeling hopeless, acknowledge it and point to emergency help and support services.
{{> output/uncertainty}}
</constraints>

<output_format>
## Urgency check
One or two lines.

## What you can afford
Table: item | monthly amount; then the offer and how long it takes to clear.

## Help to check
Bullets.

## Offer letter
Under 220 words, with [BRACKETS].

## Keeping it on track
Checklist.
</output_format>
