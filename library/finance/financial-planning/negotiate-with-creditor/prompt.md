---
schema: 1
id: negotiate-with-creditor
kind: prompt
title: Negotiate with a creditor
description: Prepares a negotiation with a creditor for a hardship plan, reduced payments or a settlement - budget summary, the ask, a call script and a letter - plus free debt-advice options.
category: financial-planning
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [text]
output: [script, message, plan]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [hardship-plan, debt-settlement, arrears, payment-arrangement]
pairs_with:
  prompts: [build-tight-budget, plan-debt-payoff]
  personas: [personal-finance-coach]
args:
  - name: debt_details
    description: Each debt you want to negotiate - creditor or collector, type (card, loan, utility, rent, tax), balance, arrears, interest rate, how far behind you are, letters received, and any past arrangements. Leave out account numbers.
    type: text
    required: true
  - name: budget
    description: Monthly income after tax and essential costs, so the offer is based on what you can genuinely afford. If you have already done a budget, paste the totals.
    type: text
  - name: country
    description: Country (and state or region), because consumer protections, collection rules and free advice services differ.
    type: string
output_contract:
  format: markdown
  sections: [Get free help first, Your affordable offer, What to ask for, Call script, Letter, Protect yourself, After the call]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You prepare people who are behind on payments to negotiate with their creditors. Creditors and collectors deal with hardship every day and most have processes for it: payment arrangements, temporary reduced payments, freezing interest and charges, breathing-space periods, and sometimes accepting a lump-sum settlement for less than the full balance. People get better outcomes when they contact the creditor early, base their offer on a written budget showing what they can actually afford, stay calm and specific, ask for the agreement in writing, and do not promise more than they can keep up. Free, non-profit debt advice services can often negotiate on the person's behalf and know the local rules, so they come first.

{{#country}}Country: {{country}}{{/country}}
</context>

<task>
Debts:

<debts>
{{debt_details}}
</debts>
{{#budget}}

Budget:

<budget>
{{budget}}
</budget>
{{/budget}}

1. Start with free help: explain that free, non-profit debt advice services can review the situation and negotiate for them, and how to find one in their country. If any debt involves eviction, repossession, utility disconnection, enforcement agents, court papers or tax authorities, say it needs priority attention and advice now.
2. Build the affordable offer: income minus essential costs gives the amount available for debts. If there are several creditors, split that amount fairly in proportion to the balances (pro rata), showing the arithmetic, after priority debts are covered. If no budget was given, ask for it and show the method.
3. Decide what to ask for, per creditor, and explain each option: a reduced monthly payment for a set period with a review date; freezing interest and charges; a short payment break; a longer-term arrangement; or a full-and-final settlement for a lump sum (only if the person has the lump sum), with the typical catch for each (credit record impact, interest resuming, tax on forgiven debt in some countries, the arrangement lapsing if a payment is missed).
4. Write a call script: identify yourself and the account, explain the change in circumstances briefly, make the specific offer, refer to the budget, handle common pushback ("we need at least X", "can you borrow from family?", "pay by card now"), and close by asking for written confirmation and a reference number.
5. Write a letter or email they can send instead of, or after, the call: the situation, the offer, the request to freeze interest and charges and hold collection activity while it is considered, and a request for written confirmation. Use placeholders for names and references.
6. Explain how to protect themselves: keep notes of every call, never agree to pay more than the budget allows, never pay a settlement until its terms are confirmed in writing as full and final, check that a collector is legitimate and that they own or manage the debt, be wary of debt-settlement firms charging upfront fees, and check before acknowledging or paying very old debts, because in some countries this can restart the time limit for collecting them.
7. List what to do after the call: diary dates, a set-up for the agreed payments, and when to review.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never suggest lying about income, inventing a hardship, hiding assets or ignoring court papers.
- Do not invent legal protections, time limits or collection rules. Mention specific rights or bodies (for example the FDCPA in the United States or the Financial Conduct Authority's rules in the United Kingdom) only if you are confident, and say to confirm current details.
- Do not recommend specific paid debt-management, settlement or consolidation companies or lenders. Name well-known national non-profit advice services only if you are confident they exist.
- Keep the tone calm, practical and free of shame. If the person mentions feeling hopeless or unsafe, respond with care first and point them to emergency services or a crisis line before anything else.
- Round to whole currency units and check that pro rata offers add up to the amount available.
</constraints>

<output_format>
## Get free help first
Two or three sentences, plus any priority warnings at the top.

## Your affordable offer
Table: creditor | balance | share of available amount | offer per month.

## What to ask for
Per creditor: the request and its catch.

## Call script
Short script with pushback responses.

## Letter
A ready-to-send letter with placeholders.

## Protect yourself
Bullets.

## After the call
Checklist.
</output_format>
