---
schema: 1
id: start-saving-on-low-income
kind: prompt
title: Start saving on a low income
description: Finds a first realistic amount to save on a low or stretched income, with small-saving tactics, where to keep it, how to stop it being spent and support worth checking.
category: budgeting
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent, student]
requires: [none]
inputs: [text]
output: [plan, checklist]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [low-income, savings-habit, emergency-fund, money-buffer]
pairs_with:
  prompts: [build-tight-budget, build-emergency-fund-plan, set-up-money-accounts-system]
  personas: [personal-finance-coach]
args:
  - name: situation
    description: Take-home income and how regular it is, essential costs, debts and any arrears, current savings if any, and where money tends to leak. Rough figures are fine.
    type: text
    required: true
  - name: goal
    description: "Optional: what you want the savings for (a buffer for emergencies, a deposit, Christmas, getting off credit) and by when."
    type: text
  - name: country
    description: "Optional: country you live in, so the support and savings schemes to check can be named in general terms."
    type: string
output_contract:
  format: markdown
  sections: [Your starting amount, Where the money comes from, Where to keep it, Protecting it, Support to check, First 90 days, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help someone with little room in their budget start saving. On a low income the first aim is not a big emergency fund; it is a small buffer that stops a broken phone, a boiler callout or a short pay week from turning into an overdraft, a payday loan or arrears. The habit matters more than the amount: a fixed small sum moved automatically on payday works better than saving "whatever is left". Experts also know the traps: savings kept in the everyday account get spent; locking money away is risky when emergencies are likely; some means-tested benefits reduce or stop above a savings limit, so large balances need checking first; and money is often available that the person has not claimed (benefits, social tariffs, discounts, employer schemes, matched savings schemes in some countries).

{{#country}}Country: {{country}}{{/country}}
</context>

<task>
Situation:

<situation>
{{situation}}
</situation>

{{#goal}}
Goal:

<goal>
{{goal}}
</goal>

{{/goal}}
1. Check first for priority problems: if rent, energy, council or local taxes, or minimum debt payments are in arrears, say those come before saving (beyond a very small buffer) and point to free non-profit debt or money advice.
2. Set a starting amount from the numbers: a weekly or monthly sum small enough to survive a bad month, and a first target (for example one month of the most likely small emergency, or a round figure) with how long it takes, shown with arithmetic.
3. Find where the money comes from, ranked by ease: leaks visible in the input, bills that can be switched or reduced, small-saving tactics (round-ups, saving any refund or windfall, keeping paying a finished debt or cancelled bill to yourself, selling unused items), and income options that fit their life. Give a monthly figure for each where possible.
4. Where to keep it: a separate easy-access account that is protected by the country's deposit protection scheme, not linked to the spending card, with a nickname for the goal. Mention that informal savings groups are common and useful in many communities, and what to check about trust and timing before joining one.
5. Protecting it: an automatic transfer on payday, a rule for what counts as an emergency, a plan to refill after using it, and celebrating milestones.
6. Support to check: benefits or credits they may not be claiming, social tariffs for energy, water or broadband, matched or bonus savings schemes for low earners if their country has one, and whether savings could affect any means-tested support. Name schemes only when confident and mark them "verify".
7. A first-90-days plan: week one actions, month one check, month three review.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only the figures given. Never invent cuts the person did not mention; suggest areas to check instead.
- Respect that the person may already be cutting hard. No lectures about coffee or treats, no shame.
- Do not recommend specific banks, apps or financial products, and never suggest investing money that may be needed within a year.
- Never suggest borrowing to save.
- If the input suggests the person cannot cover food or housing, put emergency help first (local food support, crisis grants, advice services) in general terms.
{{> output/uncertainty}}
</constraints>

<output_format>
## Your starting amount
The weekly or monthly sum, the first target and the time to reach it, with arithmetic.

## Where the money comes from
Table: source | monthly amount | effort.

## Where to keep it
Short bullets.

## Protecting it
Short bullets: automation, the emergency rule, refilling.

## Support to check
Bullets, each with who to ask, schemes marked "verify".

## First 90 days
Checklist by week one, month one, month three.

## Questions
Bullets.
</output_format>
