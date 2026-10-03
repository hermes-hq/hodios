---
schema: 1
id: respond-to-chargeback-as-merchant
kind: prompt
title: Respond to a chargeback as a merchant
description: Prepares a merchant's chargeback response - reads the reason code, decides whether to fight or accept, lists the evidence to submit, drafts the rebuttal letter and sets prevention steps.
category: customer-support
version: 1.0.0
status: incubating
stage: [operate, review]
role: [founder, support-agent, operations-manager]
subject: [ecommerce]
advice_risk: [financial]
inputs: [notes, document, message]
output: [docs, checklist, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [chargeback, payment-dispute, reason-code, dispute-evidence, friendly-fraud, rebuttal-letter]
pairs_with:
  prompts: [design-returns-process, write-support-reply, build-service-recovery-playbook]
args:
  - name: dispute_details
    description: What the processor or bank sent - reason code or reason given, amount, transaction date, deadline to respond - plus what was sold and to whom (redact full card numbers).
    type: text
    required: true
  - name: evidence
    description: What you have - order and payment records, AVS or 3-D Secure results, delivery tracking and proof of delivery, signed terms, customer messages, refund or cancellation policy shown at checkout, usage or login logs for digital goods.
    type: text
    required: true
  - name: payment_processor
    description: The payment processor or acquirer and how disputes are submitted (portal, email), if known.
    type: string
output_contract:
  format: markdown
  sections: [Dispute summary, Fight or accept, Evidence to submit, Rebuttal letter, Before you submit, Prevention]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help small merchants handle card chargebacks. A chargeback is decided on documents, not on who seems right: the issuing bank reviews whether the merchant's evidence answers the specific reason the cardholder gave. Responses lose when they argue in general, attach everything without explanation, miss the deadline, or fail to address the reason code. They win more often when a short, factual letter maps each piece of evidence to the claim. Sometimes the right answer is to accept: when the customer has a point, when the evidence is weak, or when the amount is smaller than the time it takes. Card network rules, reason codes, deadlines and fees vary by network and processor and change over time, so you work from what the processor sent and tell the merchant to check its current rules.
</context>

<task>
Prepare the response to this chargeback.

<dispute_details>
{{dispute_details}}
</dispute_details>

<evidence>
{{evidence}}
</evidence>

Processor: {{payment_processor}}

1. Dispute summary: amount, date, deadline, and the claim in plain words (fraud or unrecognised, item not received, not as described, cancelled or refund not processed, duplicate or incorrect amount, or other). If the reason code is given, describe what it usually requires the merchant to show, as a general guide to check against the processor's documentation.
2. Fight or accept: assess the evidence against the claim (strong, partial, weak) and recommend fighting, accepting, or refunding if still possible, with the reasons, including the cost of time against the amount. If the merchant made an error, say so and recommend accepting.
3. Evidence to submit: a numbered list matched to the claim, each with what it proves. Typical examples: for item not received, carrier tracking with delivery confirmation to the billing or verified address; for fraud, matching AVS or 3-D Secure results, prior undisputed orders, device or IP match, customer communication; for not as described, the listing, photos, the customer's messages and the returns policy; for cancelled, the terms accepted at checkout and the absence of a cancellation request. Flag gaps.
4. Rebuttal letter: under 400 words, factual and polite, structured as: transaction facts, the claim, the evidence point by point with exhibit numbers, and the requested outcome. No emotion, no accusations against the cardholder.
5. Before you submit: a checklist (deadline, file formats and size limits to check, redaction of full card numbers and unrelated personal data, no new refund issued while the dispute is open unless the processor says how to handle it).
6. Prevention: three to five changes for this type of dispute (clear billing descriptor, delivery confirmation or signature above a value, visible policies at checkout, fast refunds on request, fraud screening settings to review).
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only the evidence given. Never fabricate, alter or back-date evidence, and never suggest it; if something is missing, say so and how it could legitimately be obtained.
- Do not promise an outcome. Give your assessment and its reasons.
- Do not state network rules, time limits or fees as fact; mark them `[CHECK with processor: …]`.
- If the dispute suggests a pattern of fraud against the business or a large sum, suggest contacting the processor's risk team and, where relevant, an accountant or lawyer.
</constraints>

<output_format>
## Dispute summary
## Fight or accept
Verdict in one sentence, then a table: Claim element | Evidence | Strength.
## Evidence to submit
Numbered exhibits: Exhibit | What it is | What it proves | Have it? (Y/N).
## Rebuttal letter
Ready to paste, with `[PLACEHOLDERS]` for anything missing.
## Before you submit
Checklist.
## Prevention
Numbered.
</output_format>
