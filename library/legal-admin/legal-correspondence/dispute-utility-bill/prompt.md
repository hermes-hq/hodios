---
schema: 1
id: dispute-utility-bill
kind: prompt
title: Dispute a utility bill
description: Writes a dispute of a wrong energy, water, phone or broadband bill with meter readings, account history, the correction wanted, protection while the dispute is open and the escalation route.
category: legal-correspondence
version: 1.0.0
status: incubating
stage: [build]
role: [individual]
subject: [law]
requires: [none]
inputs: [text, document]
output: [message, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [utility-bill, billing-error, meter-readings, estimated-bills, back-billing, energy-supplier]
pairs_with:
  prompts: [explain-utility-bill, handle-utility-bill-arrears, complain-to-ombudsman, write-complaint-letter]
args:
  - name: location
    description: Country and region; utility consumer protections, back-billing limits and ombudsman or regulator routes are set nationally or by state.
    type: string
    required: true
  - name: bill
    description: The provider and service (electricity, gas, water, mobile, broadband), the bill period and amount, what you usually pay, and what looks wrong - estimated readings, a huge catch-up bill, charges after you moved out or cancelled, a wrong tariff, roaming or extra charges, a meter that is not yours.
    type: text
    required: true
  - name: evidence
    description: Optional. Meter readings with dates and photos, move-in or move-out dates, cancellation confirmation, previous bills, contract or tariff details, and anything the provider has already said.
    type: text
output_contract:
  format: markdown
  sections: [What looks wrong, Dispute letter, Evidence to gather, Protecting yourself while it is open, Escalation]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people challenge a wrong utility or telecom bill. Most errors follow a few patterns: estimated readings far from reality, followed by a large catch-up bill; a meter mix-up (the meter on the account is not the one at the property); charges continuing after a move or cancellation; the wrong tariff or an expired discount; and add-on charges (roaming, premium numbers, equipment) not agreed. What consumer advisers know: an actual meter reading with a dated photo resolves most energy and water disputes; in some countries suppliers cannot bill for energy used more than a set period ago if the delay was their fault (back-billing rules); many regulators expect providers not to disconnect or pass a disputed amount to debt collection while a complaint is being investigated, and to pay the undisputed part keeps the person protected; and after a set period without resolution (often around eight weeks, to verify) the complaint can go to an ombudsman or regulator for free. Arrears from bills that are correct but unaffordable are a different problem. You draft; the provider and any ombudsman decide.

Location: {{location}}
</context>

<task>
Bill:

<bill>
{{bill}}
</bill>

{{#evidence}}
Evidence:

<evidence>
{{evidence}}
</evidence>
{{/evidence}}

1. What looks wrong: identify the likely error pattern from the facts, the check that would confirm it (take a meter reading now, compare the meter serial number with the bill, check the tariff end date, check cancellation records), and a rough expected bill if the facts allow a calculation from readings and the unit rate, labelled as an estimate.
2. Draft the dispute letter or email: account number and address as [BRACKETS], the bill in dispute, what is wrong, the evidence (readings with dates, photos, confirmation emails), the correction requested (re-bill on actual readings, remove charges, apply the right tariff, refund overpayment), a request to put the disputed amount on hold and not to pass it to collections or take disconnection action while it is investigated, a request for a written response and a complaint reference, and a statement that the undisputed amount or the usual amount will continue to be paid, if that fits.
3. Evidence to gather: dated meter photos, previous bills, contract or tariff details, move or cancellation proof, a log of calls with dates, names and references.
4. Protecting yourself while it is open: keep paying the usual amount if possible, back-billing limits that may apply (to verify), protections against disconnection for disputed amounts and for vulnerable customers (to verify), and checking the credit file if collection is threatened.
5. Escalation: the provider's formal complaint stage, then the ombudsman or regulator for {{location}} after the set period or a deadlock letter, marked "to verify", and what to send them.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not invent back-billing periods, regulator names or deadlines; mark them "to verify".
- Do not suggest stopping all payments without explaining the risks; recommend paying the undisputed or usual amount where possible.
- If the bill is correct but unaffordable, say so and point to hardship help and debt advice instead of a dispute.
- If someone in the home relies on powered medical equipment or is vulnerable, say to tell the provider and ask for priority protections.
{{> output/uncertainty}}
</constraints>

<output_format>
## What looks wrong
Bullets with the check for each and any labelled estimate.

## Dispute letter
The complete letter with [BRACKETS].

## Evidence to gather
Checklist and a call log template.

## Protecting yourself while it is open
Bullets.

## Escalation
Numbered steps marked to verify.
</output_format>
