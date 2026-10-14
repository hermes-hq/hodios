---
schema: 1
id: handle-missing-refund-enquiry
kind: prompt
title: Handle a "where is my refund" enquiry
description: Answers a customer whose refund has not arrived - checks whether it was processed, how and when, gives the bank reference and timing, and fixes stuck or forgotten refunds.
category: customer-support
version: 1.0.0
status: incubating
stage: [operate]
role: [support-agent, operations-manager, founder]
requires: [none]
inputs: [message, notes]
output: [report, message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [refund-status, refund-tracking, acquirer-reference, returns-processing, payment-methods]
pairs_with:
  prompts: [handle-duplicate-charge-complaint, decide-goodwill-refund, design-returns-process, reduce-where-is-my-order-contacts]
  rules: [support-commitment-rules]
args:
  - name: enquiry
    description: The customer's message - what they expect to be refunded, when they were told it was done, how they paid, and how many times they have asked.
    type: text
    required: true
  - name: refund_records
    description: What your systems show - return received date, refund status and date, amount, payment method, refund reference or acquirer reference number (ARN) if available, and any notes such as partial refund reasons or failures.
    type: text
    required: true
  - name: policy
    description: Your refund timelines (from return received to refund issued), what the payment provider says about posting times by method, and what agents may do. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Status, Action, Reply]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help support answer "where is my refund?" contacts, one of the commonest and most repeated reasons customers get in touch, and a common cause of chargebacks. The answer depends on where the refund is stuck: the return has not been received or checked yet, the refund was never triggered (a forgotten step after inspection), it was issued but the bank or card has not posted it, it went to a different method than the customer expects (store credit, original card that has since been replaced, a buy-now-pay-later provider, a gift card), or it was partial and nobody explained why. Once a card refund is issued, the merchant no longer controls the timing, but for card refunds the acquirer reference number (ARN), where the payment provider supplies one, lets the customer's bank trace it, which settles many disputes. Posting times vary by bank, card scheme, payment method and country, and wallets or buy-now-pay-later providers have their own timelines. Customers who are told "it's on its way, wait 5-10 days" for the third time without evidence escalate; customers given the date, amount, method and a reference usually do not.
</context>

<task>
<enquiry>
{{enquiry}}
</enquiry>

<refund_records>
{{refund_records}}
</refund_records>

{{#policy}}
<policy>
{{policy}}
</policy>
{{/policy}}

1. Determine the status: return not yet received, received but not inspected, refund not triggered, refund failed, refund issued and in transit to the bank, refund issued to a different method, or partial refund. Say what the records confirm and what is missing.
2. Choose the action: trigger a forgotten refund now, retry a failed one through another method, chase the warehouse for an inspection date, give the ARN or refund reference, or explain the partial amount with the reason. Mark anything needing approval.
3. Work out timing honestly: when it was issued, the typical posting time for that method from the policy, and a date after which the customer should come back to you or ask their bank with the reference. If a card was replaced, explain that refunds usually follow to the new card or the bank can trace them, and that the bank is the one to ask.
4. Write the reply: status in the first sentence, then amount, method, date issued, reference, when to expect it, and exactly what to do if it is not there by that date. If the business is at fault (refund forgotten), own it in one sentence and give the corrected date.
</task>

<constraints>
- Do not say a refund has been issued unless the records show it; never invent a reference number or date.
- Do not promise a bank posting date; give the typical range from the policy (which varies by bank, card scheme and country) and the date to follow up.
- If this is the customer's third or later contact, or the refund is overdue by the business's own timeline, recommend escalation or a goodwill gesture for approval.
- Reply under about 120 words.
</constraints>

<output_format>
## Status
Where the refund is, with evidence and gaps.

## Action
What the agent does now, approver if needed.

## Reply
Ready to send.
</output_format>
