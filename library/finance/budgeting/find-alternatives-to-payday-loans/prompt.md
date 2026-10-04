---
schema: 1
id: find-alternatives-to-payday-loans
kind: prompt
title: Find alternatives to a payday loan
description: Finds safer ways than a payday loan or other high-cost credit to cover an urgent shortfall, such as hardship funds, employer advances, credit unions, payment plans and free debt advice.
category: budgeting
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [text]
output: [plan, table, script]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [payday-loans, high-cost-credit, emergency-money, hardship-fund, credit-union, cash-shortfall]
pairs_with:
  prompts: [build-tight-budget, negotiate-with-creditor, prepare-for-debt-advice-appointment, build-emergency-fund-plan]
args:
  - name: shortfall
    description: How much you are short, with the currency, and what it is for (rent, an energy bill, a car repair, food).
    type: string
    required: true
  - name: due_date
    description: When the money is needed, as a date or "in 3 days".
    type: string
    required: true
  - name: country
    description: Country and region; hardship schemes, credit unions and free debt advice differ by place.
    type: string
    required: true
  - name: situation
    description: Optional context - employed or not, benefits received, other debts, whether this shortfall happens often, anyone in the household who is vulnerable.
    type: text
output_contract:
  format: markdown
  sections: ["First, if this is an emergency", Options ranked for your deadline, Ask to delay or split the bill, Scripts, If you still consider high-cost credit, Stop it happening again]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people facing an urgent money gap find the cheapest safe way through it. Payday loans, rent-to-own, logbook and title loans, and some buy-now-pay-later and overdraft options cost far more than they look, and repeat borrowing often turns a one-off gap into a debt cycle. Many cheaper routes exist but are less visible: the creditor itself agreeing to a short delay or split payment, local or national hardship and emergency funds, energy company and water company support schemes, employer salary advances or earned-wage access, credit unions and community lenders, benefit advances, charities and food banks for the essentials that free up cash, and free non-profit debt advice. Your job is to find the realistic options that fit this person's deadline and to make the first calls easy.

Shortfall: {{shortfall}}
Needed by: {{due_date}}
Country: {{country}}
</context>

<task>
{{#situation}}Situation:

<situation>
{{situation}}
</situation>
{{/situation}}

1. If the shortfall puts someone at immediate risk (no food, no heating in cold weather, eviction this week, medicine), put the emergency routes first: local emergency welfare or crisis support, food banks, and the creditor's emergency line.
2. List the realistic options in order of cost and speed for the deadline {{due_date}}: asking the creditor to delay or split, hardship and emergency funds, support schemes run by utility providers, benefit advances or checks for unclaimed benefits, employer advance, credit union or community lender, borrowing from family with a written plan, selling something unneeded, and an arranged overdraft. For each: how fast it usually works, rough cost, what is needed to apply, and whether it fits the deadline. Mark country-specific schemes "to verify".
3. Explain how to ask the creditor for more time or a split payment, since this is often the fastest and cheapest fix.
4. Write two short scripts: one for calling the creditor, one for asking an employer for an advance. Use placeholders for names and references.
5. If the person still considers high-cost credit, explain how to compare the total amount repayable (not just the fee), the risk of rollover and repeated borrowing, and the warning signs of illegal lenders (no licence, cash only, taking ID or bank cards as security, threats). In countries with a public register of licensed lenders, say to check it.
6. If the situation shows repeated shortfalls or several debts, say that free non-profit debt advice can look at the whole picture and may negotiate for them, and how to find it.
7. Give three steps to stop it happening again, proportionate to their situation (a small buffer fund, a bill calendar, a benefits check).
8. Check before answering: every option is legal, none is named as a specific company, and the first options listed can realistically happen before the deadline.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not recommend or name specific lenders, apps or loan brokers. Credit unions, community lenders and non-profit advice services may be described by type; name a national non-profit service only if you are confident it exists.
- Never suggest lying on applications, writing cheques or payments that will bounce, kiting between cards, or borrowing from illegal lenders.
- Do not quote current interest rate caps or legal limits as fact; say to check them.
- Keep the tone calm, practical and free of judgement; short-term crises are common.
- If the person mentions feeling hopeless, unsafe or unable to cope, say gently that support is available and point to local crisis services alongside the money steps.
</constraints>

<output_format>
## First, if this is an emergency
Only when step 1 applies; otherwise one line saying there is time to compare options.

## Options ranked for your deadline
Table: option | speed | rough cost | what you need | fits the deadline?

## Ask to delay or split the bill
Short explanation.

## Scripts
Creditor call; employer request.

## If you still consider high-cost credit
Bullets: how to compare, rollover risk, illegal lender signs.

## Stop it happening again
Three steps.
</output_format>
