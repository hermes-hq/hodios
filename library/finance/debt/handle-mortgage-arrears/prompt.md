---
schema: 1
id: handle-mortgage-arrears
kind: prompt
title: Handle mortgage arrears
description: Helps someone behind on mortgage payments act early, with the arrears in numbers, options to ask the lender for, help schemes to check, what to avoid, and urgent steps if court action starts.
category: debt
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [text, document]
output: [plan, script, checklist]
risk: read-only
advice_risk: [financial, legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [mortgage-arrears, foreclosure, repossession, payment-arrangement]
pairs_with:
  prompts: [build-tight-budget, negotiate-with-creditor, prepare-for-debt-advice-appointment]
args:
  - name: situation
    description: Monthly mortgage payment, how many payments missed or about to be, the arrears amount, why (job loss, illness, rate rise, separation), letters received from the lender, and any other debts.
    type: text
    required: true
  - name: money
    description: Household take-home income now and expected, essential costs, and any savings or assets.
    type: text
  - name: country
    description: Country and state or region. Mortgage arrears processes, help schemes and repossession or foreclosure rules differ a lot.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Urgent first, Where you stand, Options to ask for, Call the lender, Avoid, Get help]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people behind on their mortgage. Losing a home is rarely sudden: lenders usually follow a process with letters, arrangements and, only later, court or foreclosure steps, and acting early keeps the most options open. Lenders commonly consider temporary reduced payments, adding arrears to the balance, extending the term, a switch to interest-only for a period, or a payment break. Government or state help schemes, mortgage insurance and income protection policies sometimes apply. The mortgage is a priority debt: it comes before credit cards and unsecured loans. Selling under pressure, sale-and-rent-back offers and "foreclosure rescue" firms can leave people worse off. The process, timelines and protections vary widely by country and state.

Country: {{country}}
</context>

<task>
Situation:

<situation>
{{situation}}
</situation>
{{#money}}

Money:

<money>
{{money}}
</money>
{{/money}}

1. Urgent first: if the person mentions court papers, a hearing date, a foreclosure or sale notice, say to get free housing or debt advice immediately and not to miss any deadline or hearing.
2. Where you stand: arrears in months and money, what can be paid now from the budget after essentials, and how long the situation is likely to last. Mark gaps as questions.
3. Options to ask for, with the trade-off of each: a temporary reduced payment, a plan to clear arrears over time, adding arrears to the balance, a term extension, interest-only for a period, a payment break, switching product. Check for insurance policies that may pay out and for public help schemes in {{country}}, marked to verify.
4. Write a short call script and a follow-up letter or email: the reason, what has changed, a realistic offer based on the budget, a request to hold further action while it is considered, and a request for written confirmation.
5. Avoid: ignoring letters, borrowing at high cost to pay the mortgage, paying unsecured debts before the mortgage, sale-and-rent-back or rescue firms that charge fees, and transferring the property to anyone.
6. Get help: free housing and debt advice services, and why to bring the lender's letters.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not invent timelines, legal protections or help schemes; name one only if confident and mark it to verify.
- Do not predict whether the home will be repossessed or foreclosed.
- Do not recommend paid firms or lenders.
- Calm, steady, no shame.
{{> guardrails/crisis-safety}}
</constraints>

<output_format>
## Urgent first
## Where you stand
## Options to ask for
Table: Option | What it means | Trade-off.
## Call the lender
Script and letter.
## Avoid
## Get help
</output_format>
