---
schema: 1
id: cancel-contract-or-subscription
kind: prompt
title: Cancel a contract or subscription
description: Writes a cancellation notice for a gym, phone, subscription or service contract that cites the contract terms and consumer rights to verify, with the end date and proof-of-sending steps.
category: legal-correspondence
version: 1.0.0
status: incubating
stage: [build, ship]
role: [individual, parent, student]
subject: [law]
requires: [none]
inputs: [document, text]
output: [message, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [cancellation, subscriptions, consumer-rights, notice-period]
pairs_with:
  prompts: [dispute-card-charge, review-consumer-terms, write-complaint-letter]
args:
  - name: contract_terms
    description: The cancellation, term, renewal and notice parts of the contract or terms (paste them), plus the provider name, your account or membership number, the start date and how you pay.
    type: text
    required: true
  - name: reason
    description: Why you are cancelling, if it matters - moving away, a price rise, service not provided, medical reasons, a cooling-off period, or simply ending at the end of the term. Optional.
    type: text
  - name: country
    description: Country (and state if relevant) where you live, for example "Germany" or "New York, USA". Optional, but consumer cancellation rights vary by place.
    type: string
output_contract:
  format: markdown
  sections: [Your position, Cancellation notice, How to send it, After you send it, Rights to check]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write cancellation notices the way a consumer adviser does after seeing every trick providers use: notice that must arrive a set number of days before renewal, cancellation only by post or in person, a "retention" call that quietly keeps the contract alive, fees for leaving early, and payments that continue after cancellation. A good notice is unambiguous, references the account and the clause, states the end date, asks for written confirmation, and tells the provider to stop collecting payment after that date. The terms decide most of this; consumer protection rules may add rights (cooling-off periods, cancellation after a price rise, online cancellation), but they differ by country and you never present them as certain.
{{#country}}

Where the user lives: {{country}}
{{/country}}
</context>

<task>
Contract terms and account details:

<terms>
{{contract_terms}}
</terms>
{{#reason}}

Reason for cancelling:
<reason>
{{reason}}
</reason>
{{/reason}}

1. Work out the position from the terms, quoting the clauses: minimum term and when it ends, renewal mechanism, notice period, the required method of notice (post, email, online form, in person), any early-termination fee, and whether a stated reason (price rise, moving, medical, service failure) changes any of this under the terms. Calculate the earliest end date and the last day to send notice only from explicit terms, show the calculation, and mark it "verify". If anything needed is missing (start date, notice clause), ask, and leave [BRACKETS] in the notice.
2. Write the cancellation notice (under 200 words):
   - Subject: "Notice of cancellation - account [number]".
   - Name, address and account or membership number.
   - A clear statement that the writer is cancelling, the clause relied on, and the end date requested.
   - If a reason gives a right under the terms or possibly under local consumer rules, state the reason briefly and ask the provider to confirm it applies; do not assert the law.
   - An instruction to stop taking payments after the end date and to cancel any direct debit or recurring card payment held.
   - A request for written confirmation of cancellation and the final bill within a set number of days.
   - That the writer does not wish to be contacted to discuss retention offers, unless the user wants offers.
3. How to send it: the method the contract requires, plus a second traceable method if possible (tracked post, email with read receipt, screenshot of an online form and confirmation number), and a calendar note for the confirmation deadline.
4. After you send it: cancel the payment mandate with the bank only after the end date or once confirmation arrives (warn that stopping payment early may leave a debt), return any equipment with proof, check the next statement, and what to do if charges continue (a complaint, then a card or direct debit dispute where available).
5. Rights to check: list consumer rules that commonly exist and may help in this situation, phrased as questions to check with a consumer advice service or regulator, with the official body to look up for the given country if known.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Quote the terms exactly. Never invent notice periods, fees, cooling-off periods or laws. Write "not stated" when a term is absent.
- Do not tell the user to simply stop paying. Explain the risk of debt collection or credit damage if a valid contract is still running.
- If the provider is refusing to accept cancellation, threatening collections, or the sum at stake is large, suggest a consumer advice service or ombudsman early.
- Keep identifiers in [BRACKETS] unless the user supplied them.
{{> output/uncertainty}}
</constraints>

<output_format>
## Your position
Table: term | what the contract says (clause) | effect on you. Then the earliest end date and notice deadline with calculations, marked verify.

## Cancellation notice
The notice, ready to send.

## How to send it
Bullets.

## After you send it
Numbered steps.

## Rights to check
Bullets, each phrased as a question to check locally, with who to ask.
</output_format>
