---
schema: 1
id: write-trial-expiry-emails
kind: prompt
title: Write free trial ending emails
description: Writes the emails around a free trial's end - usage recap, what changes at expiry, plan fit, extension rules and a post-expiry follow-up - with different versions for active and idle users.
category: email-marketing
version: 1.0.0
status: incubating
stage: [build]
role: [marketer, founder, product-manager]
subject: [saas]
requires: [none]
inputs: [text]
output: [copy, plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [free-trial, trial-conversion, subscription-pricing, lifecycle-marketing]
pairs_with:
  prompts: [write-email-sequence, write-dunning-emails, map-subscription-lifecycle]
args:
  - name: trial
    description: Trial length, whether a card is taken up front, what happens at expiry (auto-charge, downgrade to free, lock, data kept for how long), and the plans and prices.
    type: text
    required: true
  - name: usage_data
    description: Which usage numbers you can merge into emails (projects created, hours saved, teammates invited) and how you define an active versus idle trial user.
    type: text
    required: true
  - name: extension_policy
    description: Whether you offer trial extensions, discounts or a sales call, and to whom. Optional; none if empty.
    type: text
output_contract:
  format: markdown
  sections: [Timeline, Emails, Extension and offer rules, Checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write the end-of-trial emails for a subscription product. Two very different trials end on the same day: active users who need a clear price, the right plan and no surprise; and idle users who never got value and need help or a reason to come back, not a payment request. When a card was taken up front, the clearest possible advance notice of the charge (date, amount, how to cancel) prevents chargebacks, support tickets and angry reviews, and in some places advance notice and easy cancellation are legal requirements the user should check. When no card was taken, the job is to show what they built and what they would lose. Experts merge real usage into the email ("You created 14 invoices") and never threaten data deletion that is not actually going to happen.
</context>

<task>
Write trial-ending emails for this product.

<trial>
{{trial}}
</trial>

<usage_data>
{{usage_data}}
</usage_data>
{{#extension_policy}}Extension policy: {{extension_policy}}{{/extension_policy}}

1. **Timeline:** choose send points (for example 3 days before, 1 day before, at expiry, 3 to 7 days after), separately for active and idle users. Adjust for trial length.
2. **Active-user emails:** usage recap with merge fields, the plan that fits their usage and its price, exactly what happens on the end date (charge amount and date if a card is on file, or what gets locked), one button to choose a plan, and how to cancel if a card is on file.
3. **Idle-user emails:** acknowledge they may not have had time, offer the fastest path to value (a template, a setup call, a short video), and an extension only if the policy allows.
4. **Post-expiry email:** what they still have access to, how long data is kept (only if supplied), and how to come back.
5. For each email: subject options, preheader, body with merge fields shown as `{field}` and fallbacks when a value is zero or missing, one call to action.
6. **Extension and offer rules:** who qualifies, how often, and how to stop discounts becoming the expected path.
7. **Checks:** what to verify before launch (charge date logic, time zones, merge fields at zero, cancellation link works).
</task>

<constraints>
- State charges, dates, plan names and data retention only from supplied facts; use `[NEEDED: ...]` otherwise.
- No invented deletion threats or fake countdowns.
- If no extension policy is supplied, offer no extensions or discounts; suggest one only as an option for the user to decide.
- If a card is taken up front, the pre-charge email must show amount, date and how to cancel in plain sight, not in small print.
- Mention that advance-notice and cancellation rules for automatic renewals differ by country and should be checked; do not state them as fact.
</constraints>

<output_format>
## Timeline
A table: Send point | Active users | Idle users.

## Emails
Each email with subject options, preheader, body and call to action.

## Extension and offer rules
Bullets.

## Checks
A checklist.
</output_format>
