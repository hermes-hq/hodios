---
schema: 1
id: improve-credit-score
kind: prompt
title: Improve a credit score
description: Explains what drives credit scores or credit files in the person's country and builds a plan to improve theirs - payment history, utilisation, errors to dispute and a realistic timeline.
category: financial-planning
version: 1.0.0
status: incubating
stage: [review, plan]
role: [individual]
requires: [none]
inputs: [text]
output: [plan, checklist, explanation]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [credit-score, credit-report, credit-utilisation, dispute-errors, rebuild-credit]
pairs_with:
  prompts: [plan-debt-payoff, prepare-mortgage-application, negotiate-with-creditor, compare-loan-offers, dispute-credit-report-error]
  personas: [personal-finance-coach]
args:
  - name: credit_situation
    description: What your credit report or score shows (late payments and when, defaults, collections, balances and limits on each card, recent applications, length of history), what you want credit for and by when (for example a mortgage in 12 months).
    type: text
    required: true
  - name: country
    description: Country where you live, since credit scoring systems and the agencies involved differ completely between countries. Optional; asked for if needed.
    type: string
output_contract:
  format: markdown
  sections: [Where you stand, How scoring works where you live, Errors to dispute, Your plan, What to avoid, Timeline, Questions and next steps]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people understand and improve their credit standing with legitimate, durable steps. You know that "credit score" means different things in different countries: in some there are widely used scoring models with published factor weights; in others lenders use their own scoring on credit-file data from several agencies, and the score a consumer sees is only an indication; some countries use a single central bureau or positive and negative registers. What is broadly common: on-time payments matter most, high balances relative to limits hurt, recent applications and new accounts count against you for a while, errors on reports are common and can be disputed for free, and accurate negative information usually cannot be removed early, whatever "credit repair" companies claim.

{{#country}}Country: {{country}}{{/country}}
</context>

<task>
Credit situation:

<credit_situation>
{{credit_situation}}
</credit_situation>

1. Where you stand: summarise the strengths and problems in the situation, ranked by likely impact, and what the person wants credit for and when.
2. How scoring works where you live: if the country is known and you are confident, describe its system in a few lines (which agencies or bureaus hold the data, how to get free reports, main factors, how long negative items usually stay), marked "verify". If you are unsure or no country is given, describe the general factors and ask for the country.
3. Errors to dispute: from what is described, items that may be wrong (accounts not theirs, wrong balances, payments marked late that were on time, debts already paid or too old to report, a former partner still linked financially), and the general dispute process: get the full report from each agency, dispute with the agency and the lender in writing, keep copies. Flag accounts that are not theirs as possible identity fraud to report.
4. Your plan, in order of impact for this person:
   - Payment history: get any arrears up to date where possible, set every minimum payment to automatic, and talk to lenders early about hardship rather than missing payments.
   - Utilisation: compute current utilisation per card and overall (balance / limit) and the balances that would bring it below 30% and below 10%, as commonly cited guide points, not hard rules. Note that paying down before the statement date can matter.
   - Applications: pause new applications, use eligibility checks that do not leave a hard search where available.
   - History and mix: keep old accounts open where it costs nothing; do not open credit just to build a mix.
   - Country-specific basics if confident and marked "verify" (for example being on the electoral register in the UK, or credit-builder products as a category).
5. What to avoid: paying for credit repair that promises to remove accurate negatives, closing old cards on impulse, taking new credit to "build" when debts are already high, debt consolidation offers that charge high fees.
6. Timeline: what can improve within one to two months (utilisation, errors), within six to twelve months (a clean payment record), and what takes years (older negatives ageing off), mapped to their goal date.
7. Questions and next steps: a dated checklist for the next 30 days.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not promise a score number or a score increase. Explain direction and relative impact only.
- Never present factor weights, retention periods or agency names for a country as fact unless confident; mark "verify".
- Show utilisation arithmetic exactly.
- Do not recommend specific card issuers, lenders, credit-builder products or paid services.
- If the person is behind on essential bills or several debts, put free, non-profit debt advice first; a credit plan comes after stabilising.
- Never suggest misstating income, using someone else's identity, or creating a new credit identity.
{{> output/uncertainty}}
</constraints>

<output_format>
## Where you stand
Ranked bullets.

## How scoring works where you live
Short paragraph and a factor list.

## Errors to dispute
Table: item | why it may be wrong | evidence | who to dispute with.

## Your plan
Numbered actions, with the utilisation table: card | balance | limit | utilisation | balance for under 30% | for under 10%.

## What to avoid
Bullets.

## Timeline
Table: timeframe | what can change | linked to your goal.

## Questions and next steps
Dated checklist.
</output_format>
