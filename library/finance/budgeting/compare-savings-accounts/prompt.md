---
schema: 1
id: compare-savings-accounts
kind: prompt
title: Compare savings accounts
description: Compares savings account types on rate, access, deposit protection and tax treatment for a goal and timeline, with interest worked out in money and the rates to verify.
category: budgeting
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [individual, parent]
requires: [none]
inputs: [text]
output: [table, explanation, questions]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [savings-accounts, interest-rates, deposit-protection, fixed-term, aer-apy]
pairs_with:
  prompts: [build-emergency-fund-plan, plan-savings-goal, set-up-sinking-funds]
  personas: [personal-finance-coach]
args:
  - name: goal
    description: What the money is for and when you need it (for example a house deposit in about two years, an emergency fund, a car next summer).
    type: text
    required: true
  - name: amount
    description: How much you have now and how much you will add each month. Optional; an illustrative amount is used without it.
    type: string
  - name: country
    description: Country where you hold the account, since account types, tax on interest and deposit protection differ.
    type: string
    required: true
  - name: access_needs
    description: How quickly you might need some or all of the money, and anything else that matters (wanting one provider, sharia-compliant accounts, a joint account). Optional.
    type: text
output_contract:
  format: markdown
  sections: [What matters for this goal, Account types compared, Interest in money, Protection and tax checks, A structure to consider, Traps in the small print, Questions to ask before opening]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Choosing where to keep savings is mostly about matching the account to when the money is needed, then not losing value to low rates, penalties, tax or an unprotected provider. Headline rates mislead: bonus rates that expire after 12 months, rates that only apply to small balances, monthly-saver accounts that pay interest on a growing balance (so the real return is roughly half the headline), and withdrawal limits that turn an "easy access" account into a notice account. You cannot see today's rates, so the job is to explain the trade-offs, show the effect of rates in money, and give the person a checklist to compare live offers themselves.

Country: {{country}}

<goal>
{{goal}}
</goal>
{{#amount}}Amount: {{amount}}{{/amount}}
{{#access_needs}}Access needs: {{access_needs}}{{/access_needs}}
</context>

<task>
1. What matters for this goal: one paragraph on the time horizon, how much access is really needed, and how certain the date is. For money needed within about five years, explain why it generally belongs in cash-like savings rather than investments that can fall.
2. Account types compared: the types available in {{country}} as far as you know them (for example instant or easy access, notice accounts, fixed-term deposits or certificates, regular or monthly savers, tax-advantaged savings wrappers, government savings products, money market funds), with columns for typical access, rate pattern, penalties, protection and fit for this goal. Mark anything you are unsure exists in that country.
3. Interest in money: using the person's amount (or a round labelled example), show the interest after one year and over the goal period at three illustrative rates that you label as examples, not current rates. For regular savers, show that interest is earned on the average balance. Show the gap between the best and worst case in money and compare with an assumed inflation rate to show the real return.
4. Protection and tax checks: explain deposit guarantee schemes (limit per person per banking licence, not per brand; check whether two brands share a licence), that money market funds and some fintech wallets are not deposits, and how interest is taxed or sheltered in that country. Give the current limit or allowance only if you are confident, and tell them to verify it.
5. A structure to consider: one or two set-ups for this goal (for example an easy-access portion plus a fixed-term ladder timed to the goal date, or a tax-sheltered account plus an instant-access buffer), with the trade-off of each. Describe, do not choose for them.
6. Traps in the small print: bonus expiry, withdrawal limits, minimum balances, early-closure penalties, rate changes on variable accounts, interest paid annually versus monthly (and AER, APY or similar as the comparable measure).
7. Questions to ask before opening: 6-8 checks for any account they consider.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never state today's market rates as fact and never name banks, building societies, apps or specific products. Rates are illustrative and labelled.
- Show the interest arithmetic once, with the formula.
- If the goal date or amount is missing, ask, and meanwhile use a labelled example.
- If the money is for a goal far in the future (10+ years), say that savings accounts may not be the only option to discuss with an adviser, without recommending investments.
{{> output/uncertainty}}
</constraints>

<output_format>
## What matters for this goal
One paragraph.

## Account types compared
Table: type | access | rate pattern | penalties | protection | fit for this goal.

## Interest in money
Table: illustrative rate | interest year 1 | interest over goal period | real return after assumed inflation.

## Protection and tax checks
Bullets, with what to verify.

## A structure to consider
One or two options with trade-offs.

## Traps in the small print
Bullets.

## Questions to ask before opening
Numbered.
</output_format>
