---
schema: 1
id: handle-duplicate-charge-complaint
kind: prompt
title: Handle a "charged twice" complaint
description: Works out whether a customer was really charged twice or sees a pending authorisation, refund in progress or separate orders, then fixes it and writes a reply that heads off a chargeback.
category: customer-support
version: 1.0.0
status: incubating
stage: [operate]
role: [support-agent, founder, operations-manager]
requires: [none]
inputs: [message, notes, image]
output: [report, message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [double-charge, card-authorisation, pending-transaction, payment-reconciliation, chargeback-prevention]
pairs_with:
  prompts: [respond-to-chargeback-as-merchant, handle-unexpected-renewal-charge, write-support-reply]
  rules: [support-commitment-rules]
args:
  - name: complaint
    description: What the customer says - amounts, dates, how they see it (bank app, statement, email receipts), and any screenshot described.
    type: text
    required: true
  - name: payment_records
    description: What your payment system shows for this customer - transactions with status (authorised, captured, voided, refunded), amounts, timestamps, order numbers, and any failed or retried attempts.
    type: text
    required: true
  - name: policy
    description: How refunds are issued and how long they usually take with your payment provider, and what agents may do. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Diagnosis, Action, Reply, If it keeps happening]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help support handle "you charged me twice" contacts. A large share are not true double charges: a pending authorisation that will drop off (common with hotels, fuel, car hire, card checks and failed-then-retried payments), a refund already issued that the bank has not posted yet, two genuine separate orders, a subscription and a one-off purchase on the same day, or a currency conversion fee shown as a second line. Real duplicates happen too, usually from double-clicks, payment retries after a timeout, or webhook bugs. The answer depends on the transaction status in the payment system, not the customer's bank view: an authorisation that was never captured cannot be refunded, only voided or left to expire, which is why customers who are told "we've refunded it" then see nothing and file a chargeback. How long an authorisation hold or a refund takes to show differs by card issuer, card scheme, payment method and country, so the timing comes from the provider's own guidance, never a fixed rule. A clear explanation with dates prevents many disputes.
</context>

<task>
<complaint>
{{complaint}}
</complaint>

<payment_records>
{{payment_records}}
</payment_records>

{{#policy}}
<policy>
{{policy}}
</policy>
{{/policy}}

1. Match each charge the customer sees to a record: amount, time, status (authorised, captured, voided, refunded), order number.
2. Diagnose: true duplicate capture, pending authorisation (captured once, the other will release), retry after a failed attempt, refund already issued but not posted, separate legitimate charges, fee or currency line, or no matching record (possible other merchant or card misuse). Mark what is confirmed and what is inferred.
3. Decide the action: refund the duplicate capture, void an open authorisation if the system allows, explain an authorisation release window, show both orders, or ask for a statement line if nothing matches. Note who must approve if outside agent limits.
4. Write the reply: what you found in one or two sentences, what you have done, the exact amount, when it should appear and in what form (refund line versus pending charge disappearing), what to do if it has not appeared by a date, and the reference to quote to their bank if they ask.
5. If a true duplicate came from a system fault (retries, double submission), say what to report to whoever runs payments, and whether other customers might be affected.
</task>

<constraints>
- Do not tell the customer a refund was issued unless the records show it, and never call a pending authorisation a refund.
- Do not state bank processing or authorisation release times as certain; they vary by issuer, card scheme and country. use the provider's typical time from the policy, or say "usually a few working days, depending on your bank" if none is given.
- Do not ask for full card numbers; the last four digits and the statement descriptor are enough.
- If no record matches, do not guess; explain that the charge may be from another merchant and how to check the statement descriptor.
- Reply under about 130 words.
</constraints>

<output_format>
## Diagnosis
Table: what the customer sees | matching record | status | explanation. Then the conclusion.

## Action
What to do now, approver if needed.

## Reply
Ready to send.

## If it keeps happening
What to report and to whom, or "not applicable".
</output_format>
