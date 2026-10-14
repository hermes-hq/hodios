---
schema: 1
id: request-fee-waiver
kind: prompt
title: Ask for a fee or charge to be waived
description: Asks a bank, utility, school, gym or other provider to waive or refund a late fee, penalty or charge, with what happened, your record with them, a clear ask and a fallback.
category: email
version: 1.0.0
status: incubating
stage: [operate]
role: [individual, parent, student]
requires: [none]
inputs: [notes, document]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: small
reasoning: off
level: beginner
depth: specific
tags: [late-fee, goodwill-gesture, charge-refund, customer-retention, penalty]
pairs_with:
  prompts: [write-complaint-letter, appeal-tax-penalty, write-negotiation-email]
args:
  - name: charge
    description: The fee or charge (amount, date, what it is called on the statement), the organisation, and the account or customer reference.
    type: string
    required: true
  - name: circumstances
    description: What happened and why (a one-off mistake, illness, a bank error, a change of card, their own system problem), how long you have been a customer and your payment history, and anything you have already done to fix it.
    type: text
    required: true
  - name: channel
    description: Where it will be sent (email, secure message, web form, live chat) if it changes length.
    type: string
output_contract:
  format: markdown
  sections: [Message, If they say no, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Many organisations give front-line staff discretion to waive a first late fee or a disputed charge as a goodwill gesture, especially for a long-standing customer with a clean record. Requests succeed when they are short, polite and easy to approve: the exact charge and reference, a one-line honest explanation, evidence the problem is fixed (payment made, direct debit set up), the customer's record, and a specific ask ("please refund the late fee charged on 4 October"), not a general complaint. A good request also has a fallback: a partial refund, or a note on the account if the fee cannot be removed. When the charge is the organisation's own error, it is a correction, not a favour, and the tone can be firmer. Tax and government penalties usually follow formal appeal rules instead.
</context>

<task>
Write a request to waive this charge.{{#channel}} Channel: {{channel}}.{{/channel}}

<charge>
{{charge}}
</charge>

<circumstances>
{{circumstances}}
</circumstances>

1. Decide whether this is a goodwill request (the user's own slip) or a correction (the organisation's error). Say which under Notes, because the tone differs.
2. If the charge is a tax, court or government penalty, say under Notes that a formal appeal or review route probably applies, with time limits, and point to the official guidance; still write a polite request only if appropriate.
3. Subject: "Request to waive [fee] on account [reference]".
4. First two sentences: the charge (amount, date, reference) and the ask.
5. One or two honest sentences on what happened, and what has been done to fix it.
6. The record: years as a customer, on-time payments, if given.
7. The ask again, precisely, with a fallback (partial refund or a one-off note), and a thank-you.
8. Under "If they say no", give a short polite reply asking whether a partial refund is possible, and for a correction, the next step (formal complaint, then the relevant ombudsman or regulator where one exists in the user's country).
</task>

<constraints>
- Message under about 140 words; shorter for live chat.
- Never invent the customer's history, amounts, illnesses or errors by the organisation. Never suggest claiming hardship or illness that did not happen.
- No threats to leave unless the user says they genuinely will and wants to say so; even then, mention it once, calmly.
- Do not claim the user has a legal right to a refund unless the input supports it; suggest checking consumer rules for unfair charges.
</constraints>

<output_format>
## Message
Subject, then body.
## If they say no
The follow-up.
## Notes
Goodwill or correction, and any formal route. "None" if nothing.
</output_format>
