---
schema: 1
id: handle-unexpected-renewal-charge
kind: prompt
title: Handle an unexpected renewal charge
description: Resolves a subscriber upset by an auto-renewal or surprise charge - checks what was shown, agreed and reminded, decides refund, partial or credit, and writes the reply.
category: customer-support
version: 1.0.0
status: incubating
stage: [operate]
role: [support-agent, founder, operations-manager]
requires: [none]
advice_risk: [legal]
subject: [saas, ecommerce]
inputs: [message, notes]
output: [report, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [auto-renewal, subscription-billing, refund-decision, chargeback-prevention, renewal-notice]
pairs_with:
  prompts: [decide-goodwill-refund, respond-to-chargeback-as-merchant, write-renewal-reminder-emails, handle-membership-cancellation-requests]
  rules: [support-commitment-rules]
args:
  - name: customer_message
    description: The customer's message in their words, including what they say they expected.
    type: text
    required: true
  - name: billing_facts
    description: Plan, price, renewal date and amount, signup date and channel, whether a renewal reminder was sent and when, usage since renewal, past refunds, and whether a cancellation attempt was logged.
    type: text
    required: true
  - name: policy
    description: Your renewal and refund terms as written, and what agents may offer without approval.
    type: text
    required: true
  - name: country
    description: Customer's country or region, if known.
    type: string
output_contract:
  format: markdown
  sections: [What happened, Decision, Reply, Prevent the next one]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help support resolve complaints about renewal charges the customer did not expect: an annual plan that rolled over, a free trial that converted, a price that went up at renewal, or a charge after the customer believes they cancelled. These complaints turn into chargebacks fast, and a chargeback usually costs the merchant the disputed amount plus a fee, and repeated ones can hurt its standing with the payment provider (fees and thresholds vary by provider and card scheme), so a quick fair refund is often cheaper than winning the argument. The facts that decide most cases are: was renewal clearly disclosed at signup, was a reminder sent before an annual renewal, has the customer used the service since the charge, and did they try to cancel. Many places have consumer rules on auto-renewal disclosure, reminders and easy cancellation; the details vary, so the decision should not rely on "our terms say so" alone.
</context>

<task>
<customer_message>
{{customer_message}}
</customer_message>

<billing_facts>
{{billing_facts}}
</billing_facts>

<policy>
{{policy}}
</policy>

{{#country}}Customer's country or region: {{country}}{{/country}}

1. Reconstruct what happened in a short timeline: signup, what was disclosed, reminders, renewal, usage after renewal, cancellation attempts, this contact.
2. Identify the case type: missed reminder, trial conversion, price increase at renewal, charge after attempted cancellation, forgotten subscription, or possible unauthorised use (someone else's card). Unauthorised use goes to the fraud process, not this one.
3. Decide using the facts: full refund and cancel, partial or pro-rated refund, credit or downgrade, or keep the charge with a clear explanation. Weigh: disclosure and reminder quality, usage since renewal, time since charge, chargeback risk, customer history, and any likely legal requirement to check in this country. State who must approve if it is outside agent limits.
4. Write the reply: decision in the first two sentences, the facts behind it in customer terms (dates, amounts), exactly what happens next (refund amount and typical time to appear, cancellation confirmed, access end date), and how to reach you instead of disputing with the bank.
5. Suggest one or two changes that would prevent similar contacts (reminder timing, clearer trial wording, a cancel button that confirms).
</task>

<constraints>
- Use only the amounts, dates and policy given. Mark anything missing as `[CHECK: ...]`.
- Do not tell the customer they cannot dispute with their bank, and do not threaten collections or account closure.
- Do not state what the law requires in their country; say what to check and that rules on renewals and cancellation differ by place.
- If a cancellation attempt was logged and failed on the business's side, treat that as the business's fault.
- Reply under about 150 words, no blame, one apology at most.
{{> guardrails/professional-limits}}
</constraints>

<output_format>
## What happened
Short dated timeline and the case type.

## Decision
The outcome, amount, reasoning in bullets, and approver if needed.

## Reply
Ready to send.

## Prevent the next one
One or two process fixes.
</output_format>
