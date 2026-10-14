---
schema: 1
id: investigate-unrecognised-charges
kind: prompt
title: Investigate unrecognised charges
description: Works through unfamiliar transactions on a bank or card statement - decoding merchant names, holds, foreign fees and family use - and separates likely legitimate charges from possible fraud to report.
category: budgeting
version: 1.0.0
status: incubating
stage: [review]
role: [individual, parent, student]
requires: [none]
inputs: [text]
output: [table, checklist, message]
risk: read-only
advice_risk: [financial]
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [bank-statement, card-fraud, merchant-names, unknown-transactions]
pairs_with:
  prompts: [audit-subscriptions, dispute-card-charge, respond-to-identity-theft]
  personas: [personal-finance-coach]
args:
  - name: charges
    description: The transactions you do not recognise, copied as they appear (date, description, amount, currency, pending or posted), plus whether the card is credit, debit or prepaid. Never include full card or account numbers.
    type: text
    required: true
  - name: clues
    description: Anything that might explain them - recent trips, online orders, apps, who else in the household uses the card or has it saved on a device, recent hotel, car hire or fuel payments.
    type: text
  - name: country
    description: Country of the bank, because reporting routes and protections differ.
    type: string
output_contract:
  format: markdown
  sections: [Urgent first, Charge by charge, How to check each one, If it is fraud, Prevent repeats]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people work out what unfamiliar charges on a bank or card statement are. Most unrecognised charges turn out to be legitimate but disguised: the statement shows the payment processor, parent company or legal entity rather than the brand (marketplace sellers, app stores, payment platforms, a restaurant's company name); a pending authorisation or hold (hotels, car hire, fuel pumps) that will drop off or change; a foreign transaction fee or a currency conversion shown as a separate line; a refund and re-charge; an annual renewal; a free trial that converted; or a purchase by a family member, often a child in an app or game. Some are fraud, and a common fraud pattern is a run of small "test" charges followed by larger ones, or charges from a country the person has not visited. The safe order is: if anything looks like fraud, freeze or lock the card and contact the bank through the number on the card or the official app first, because delays can affect protections; investigate the rest calmly. Card issuers usually have time limits for disputes, which differ by country and card type.

<charges>
{{charges}}
</charges>
{{#clues}}

<clues>
{{clues}}
</clues>
{{/clues}}
{{#country}}

Country: {{country}}
{{/country}}
</context>

<task>
1. Urgent first: if any charge shows fraud signs (series of small test charges, merchants or countries with no link to the person, charges after the card was lost, many charges in a short time), say so first and give the immediate steps: lock or freeze the card in the app, call the bank on the number on the back of the card or in the official app, and do not use contact details from any message they received.
2. Go charge by charge: decode the description (likely processor, parent company, abbreviation, location code, hold or fee), give the most likely explanations ranked, mark each as "likely legitimate", "unclear" or "possible fraud" with the reason, and say which clue would confirm it. Mark guesses as guesses.
3. Explain how to check each one: search order confirmation emails and app store purchase history for the amount and date, check pending versus posted status, ask household members, check car hire and hotel bookings for holds, look at the full transaction details in the banking app (some show the merchant's website or phone), and contact the merchant with the transaction reference if still unclear.
4. If it is fraud or remains unexplained: report to the bank, ask for the card to be replaced, dispute the specific transactions, change passwords on accounts where the card is saved, and check the credit report if personal details may be exposed. Give a short script for the bank call.
5. Prevent repeats: transaction alerts, virtual or single-use card numbers where offered, removing saved cards from old sites, app store purchase approval for children, and a monthly statement check.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never state that a specific charge is definitely legitimate or definitely fraud from the description alone; rank likelihoods and say how to confirm.
- Do not invent merchant identities; if a descriptor is unknown, say so.
- Do not state exact dispute deadlines or legal protections as fact; say they vary by country and card type and to ask the bank promptly.
- Warn that genuine banks do not ask for full PINs or passwords and that callers claiming to be the bank should be called back on the official number.
</constraints>

<output_format>
## Urgent first
Only if any charge shows fraud signs; otherwise one line saying none do.
## Charge by charge
Table: Date | Description | Amount | Likely explanation | Verdict | How to confirm.
## How to check each one
## If it is fraud
Steps, then the bank call script.
## Prevent repeats
</output_format>
