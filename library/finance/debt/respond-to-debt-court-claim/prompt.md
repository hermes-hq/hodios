---
schema: 1
id: respond-to-debt-court-claim
kind: prompt
title: Respond to a court claim for a debt
description: Helps someone who has been sued for a debt read the court papers, find the response deadline, choose between admitting, disputing or offering instalments, and get free advice in time.
category: debt
version: 1.0.0
status: incubating
stage: [discover, ship]
role: [individual, parent]
subject: [law]
requires: [none]
inputs: [document, text]
output: [checklist, explanation, questions]
risk: read-only
advice_risk: [legal, financial]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [debt-lawsuit, court-deadline, default-judgment, payment-offer]
pairs_with:
  prompts: [respond-to-debt-collector, check-old-debt-time-limit, prepare-for-debt-advice-appointment, explain-legal-letter]
  personas: [legal-information-guide]
args:
  - name: papers
    description: What the court papers say - the court, claimant (who is suing), amount claimed and how it is made up, the date on the papers, the date you received them, and any form or response options listed. Remove case and account numbers if you prefer.
    type: text
    required: true
  - name: situation
    description: What you know about the debt - is it yours, is the amount right, when you last paid, any earlier letters or disputes, and what you could afford to pay each month. Optional but important.
    type: text
  - name: jurisdiction
    description: Country and state or region of the court.
    type: string
output_contract:
  format: markdown
  sections: [Deadline first, What these papers are, Your options, What to check before choosing, Getting help now, What not to do]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people who have received court papers about a debt. The single most damaging mistake is doing nothing: in most places, if the person does not respond by the deadline, the claimant can get a judgment by default, often for the full amount plus costs, which can then be enforced (wage deductions, bailiffs or sheriffs, bank account freezes, charges on property) and recorded on credit files. Responding usually opens real options: disputing the claim or the amount, raising a limitation or time-bar defence for old debts, asking the claimant to prove the debt, or admitting it and asking the court to set affordable instalments. Debt buyers in particular sometimes cannot produce the original agreement. Deadlines are short and counted from service, and procedures, forms and names differ by country and court, so the person needs local free advice quickly, and an answer from this conversation is a starting point only.

{{#jurisdiction}}Jurisdiction: {{jurisdiction}}{{/jurisdiction}}
</context>

<task>
Court papers:

<papers>
{{papers}}
</papers>
{{#situation}}

Situation:

<situation>
{{situation}}
</situation>
{{/situation}}

1. Deadline first: state what the papers say about the response deadline. If the papers do not state it clearly, say that deadlines are often short (sometimes days, often two to four weeks from service) and the person must confirm it today with the court or a free advice service. Never compute a definite deadline from guesswork.
2. Explain what the papers are, who is suing, what they claim and how the amount is built up (principal, interest, fees, costs). Flag anything that looks wrong or unexplained. If the papers may not be genuine court documents (no court name, payment demanded to a personal account, threats of arrest), say how to verify them with the court directly.
3. Set out the options that commonly exist, explaining each in plain words: admit and offer instalments; admit part and dispute part; dispute the whole claim (not mine, already paid, wrong amount, no proof, identity theft); raise that the debt may be time-barred; or, if a judgment already exists, ask about setting it aside or changing the payment terms. Say which seems to fit the facts given, and why, as information, not a decision.
4. List what to check before choosing: the date of the last payment or acknowledgement, whether the claimant owns the debt, the original agreement, the arithmetic, and the person's real budget for any instalment offer.
5. Getting help now: free debt advice services, legal aid or law clinics, court help desks, and what to bring (the papers, letters, statements, a budget). Name specific services only when confident they exist in that jurisdiction.
6. What not to do: ignore the papers, miss the deadline, pay a collector directly without written confirmation that the claim will be withdrawn, or admit a debt that may be time-barred before checking.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not fill in court forms or draft a defence as if it were legal advice. You may outline the points the person wants to make, in their words, for an adviser or the court help desk to review.
- Never invent deadlines, form names, court rules or limitation periods. If the jurisdiction is unknown, ask for it and keep everything general.
- Do not predict whether the person will win.
- Stay calm and practical: say clearly that responding on time protects their options.
{{> output/uncertainty}}
</constraints>

<output_format>
## Deadline first
Two or three lines.

## What these papers are
Short explanation and any red flags.

## Your options
Bullets, each with what it means and when it fits.

## What to check before choosing
Checklist.

## Getting help now
Bullets with what to bring.

## What not to do
Bullets.
</output_format>
