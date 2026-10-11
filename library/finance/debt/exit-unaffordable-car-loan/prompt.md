---
schema: 1
id: exit-unaffordable-car-loan
kind: prompt
title: Exit an unaffordable car loan
description: Lays out the options when car finance is no longer affordable - ask the lender, sell, refinance, hand back, or keep and cut elsewhere - with negative equity in numbers and the risks.
category: debt
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [text, document]
output: [table, plan, script]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [car-finance, negative-equity, repossession, refinancing]
pairs_with:
  prompts: [negotiate-with-creditor, plan-car-purchase, build-tight-budget]
args:
  - name: loan
    description: The finance type (loan, hire purchase, lease or balloon payment plan if you know), amount left, monthly payment, rate, months left, any balloon or final payment, and how much you have paid so far.
    type: text
    required: true
  - name: car_and_needs
    description: What the car is worth roughly, whether you need a car for work or family, and your monthly budget situation.
    type: text
    required: true
  - name: country
    description: Country and state or region, because rights to hand back a car and repossession rules differ a lot.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Where you stand, Options compared, Talk to the lender first, Rights to check, Next steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people who can no longer afford their car finance. The key number is equity: the car's realistic sale value minus what is still owed. With negative equity, selling still leaves a debt. Options usually include asking the lender for a temporary reduced payment or term extension; selling privately and clearing the gap; refinancing (rarely cheaper if credit has worsened); handing the car back under any statutory or contractual right that applies; or keeping the car and cutting elsewhere. Some countries give hire purchase customers a right to end the agreement after paying a set share of the total; others have no such right. Letting a car be repossessed is usually the worst outcome, because auction prices are low and the shortfall plus fees remain owed. Rolling negative equity into a new loan hides the problem and makes it bigger.

Country: {{country}}
</context>

<task>
Finance:

<loan>
{{loan}}
</loan>

Car and needs:

<needs>
{{car_and_needs}}
</needs>

1. Where you stand: equity (value minus settlement figure), the remaining total payments, and how the payment fits the budget. Tell the person to ask the lender for the exact settlement figure, as it may differ from the balance.
2. Compare the options in a table: what it involves, cost or shortfall in numbers, effect on credit record, whether they keep a car, and main risk. Include asking the lender for help, selling, refinancing, handing back under any right that applies, downsizing to a cheaper car, and keeping it with budget cuts.
3. Write a short script for calling the lender to ask about payment help, the settlement figure and options to end the agreement.
4. List rights and rules to check for {{country}}: any right to end the agreement early, what happens on repossession, and complaint routes if the loan was unaffordable when sold. Mark each to verify; name a rule only if confident.
5. Give next steps in order, and point to free, non-profit debt advice if other bills are also behind.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not suggest rolling negative equity into a new loan without spelling out the cost.
- Never suggest hiding the car, selling it without clearing the finance where the lender owns it, or stopping payments as a tactic.
- Do not invent legal rights; mark country rules to verify.
- Do not recommend specific lenders or dealers.
</constraints>

<output_format>
## Where you stand
## Options compared
Table: Option | What it involves | Cost or shortfall | Credit effect | Keep a car? | Main risk.
## Talk to the lender first
Script.
## Rights to check
## Next steps
</output_format>
