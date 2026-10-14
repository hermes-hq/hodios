---
schema: 1
id: plan-sms-marketing-program
kind: prompt
title: Plan an SMS marketing programme alongside email
description: Plans an SMS marketing programme next to email - what goes to text, consent capture, sender registration to check, frequency, cost per send and how to measure it against email.
category: email-marketing
version: 1.0.0
status: incubating
stage: [plan]
role: [marketer, founder]
subject: [ecommerce, retail, hospitality]
requires: [none]
inputs: [text]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [sms-marketing, text-messaging, channel-mix, consent, cost-per-send]
pairs_with:
  prompts: [write-sms-campaign, map-email-automation-flows, set-email-frequency]
args:
  - name: business
    description: What the business sells, customer countries, average order value, the email programme today (list size, flows, campaign cadence) and the platform you would use for SMS.
    type: text
    required: true
  - name: goals
    description: Why you want SMS (abandoned checkout, drops, bookings, last-minute openings, VIP access) and a monthly budget. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Fit, Channel roles, Consent and setup checks, Cadence and cost, Measurement]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan SMS marketing for businesses that already email. Text messages are read quickly and feel personal, which is exactly why they are expensive (you pay per message segment, and long or emoji-heavy messages cost more), easy to overuse, and regulated more tightly than email in many places. Experts give SMS a narrow role: time-sensitive or high-intent moments (abandoned checkout, drops and restocks for opted-in fans, booking reminders, last-minute availability), a few campaigns a month at most, and never a copy of every email. They collect SMS consent separately and explicitly, keep a clear opt-out in every message, respect quiet hours in the recipient's time zone, and check sender and number registration requirements in each country before launch (some countries require carrier registration or approved sender IDs, which can take weeks). Success is measured as incremental revenue over email alone, not raw SMS revenue.
</context>

<task>
Plan an SMS programme.

<business>
{{business}}
</business>
{{#goals}}Goals and budget: {{goals}}{{/goals}}

1. **Fit:** say whether SMS is likely to pay off for this business now, given order value, purchase frequency and list size; if not, say what to fix first.
2. **Channel roles:** a table of which messages go by SMS, email, or both (with order and delay so customers are not double-messaged), and which never go by SMS.
3. **Consent and setup checks:** how and where to collect SMS consent (separate checkbox or keyword, clear wording about what and how often), the confirmation message, opt-out and help keywords, quiet hours, and a checklist of country-specific things to verify before sending (consent rules, sender ID or number registration, required message wording). Present these as things to check, not as settled law.
4. **Cadence and cost:** recommended frequency per month, character and segment discipline, an estimate of monthly cost from list size and sends using the user's platform pricing (or a placeholder price), and a break-even estimate.
5. **Measurement:** revenue per message, opt-out rate per send, and incrementality via a holdout of SMS subscribers who get email only.
</task>

<constraints>
- Do not state legal requirements as fact for any country; frame them as checks and suggest confirming with the platform's compliance guidance or a legal adviser.
- No SMS to contacts who only consented to email; no bought numbers.
- Use the user's prices if supplied; otherwise `[PRICE PER SEGMENT]` placeholders.
- Keep the programme small to start; expand only on evidence.
</constraints>

<output_format>
## Fit
A short verdict with reasons.

## Channel roles
A table: Message | SMS | Email | Order and delay.

## Consent and setup checks
Consent copy plus a checklist.

## Cadence and cost
Frequency, cost estimate and break-even.

## Measurement
Bullets.
</output_format>
