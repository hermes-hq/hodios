---
schema: 1
id: write-renewal-reminder-emails
kind: prompt
title: Write annual renewal reminder emails
description: Writes renewal reminders for an annual subscription or membership with a value recap, the exact price and date, how to change or cancel, and a follow-up for people who lapse.
category: email-marketing
version: 1.0.0
status: incubating
stage: [build]
role: [marketer, founder, operations-manager]
subject: [saas, nonprofit]
requires: [none]
inputs: [text]
output: [copy, plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [annual-renewal, membership-renewal, auto-renewal, retention, price-change-notice]
pairs_with:
  prompts: [write-dunning-emails, write-win-back-campaign, write-loyalty-points-emails]
args:
  - name: renewal
    description: What renews (software plan, membership, club, association, box subscription), the price now and at renewal, the renewal date logic, whether it auto-renews or must be renewed manually, and how to cancel or change plan.
    type: text
    required: true
  - name: value_recap
    description: What members or customers got this year that you can show (usage numbers, events held, benefits used, new features). Optional; placeholders used if empty.
    type: text
output_contract:
  format: markdown
  sections: [Reminder schedule, Emails, Edge cases, Checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write renewal reminders for annual subscriptions and memberships. A year is long enough that people forget what they signed up for and what it costs, so a renewal charge without warning feels like an ambush, triggers chargebacks and refund requests, and turns a loyal customer into a complaint. The best renewal emails remind people of the value they got (in their own numbers where possible), state the price and date with no hunting, say clearly if the price has changed and why, and make changing plan or cancelling easy, which lowers disputes and lets some people downgrade instead of leaving. Manual renewals (common for associations and clubs) need more reminders and a clear "renew now" path; auto-renewals need one clear advance notice. Some places set rules on advance notice for automatic renewals and price rises; the user should check what applies to them.
</context>

<task>
Write renewal reminders.

<renewal>
{{renewal}}
</renewal>
{{#value_recap}}
<value_recap>
{{value_recap}}
</value_recap>
{{/value_recap}}

1. **Reminder schedule:** for auto-renewals, typically one notice 30 days before and one 7 days before; for manual renewals, 30 days, 14 days, 3 days, on the date, and after expiry. Adjust to the product and say why.
2. **Emails:** the advance notice (value recap with merge fields, price, date, payment method ending digits, change or cancel link), the last reminder, the renewed-receipt or thank-you email, and a lapsed follow-up for manual renewals or failed renewals.
3. If the price is rising, write the price-change paragraph: old price, new price, date it applies, the reason in one honest sentence, and any options (lock in, switch plan).
4. For each email: subject options that say "renews on {date}" plainly, preheader, body, one call to action.
5. **Edge cases:** customers who already cancelled (suppress), annual-to-monthly switchers, members with an open support issue, gift or company-paid subscriptions.
6. **Checks:** dates by time zone, correct price per plan, links tested, and suppression of people who already renewed.
</task>

<constraints>
- Prices, dates and benefits only from supplied facts; `[NEEDED: ...]` for the rest.
- The cancel or change link must be as visible as the renew link. No hidden cancellation.
- No guilt or fear framing about losing membership.
- Mention that advance-notice rules for auto-renewals and price increases vary by country and should be checked; do not state them as fact.
</constraints>

<output_format>
## Reminder schedule
A table: When | Email | Sent to.

## Emails
Each email with subject options, preheader, body and call to action.

## Edge cases
Bullets.

## Checks
A checklist.
</output_format>
