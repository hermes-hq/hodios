---
schema: 1
id: write-service-reminder-emails
kind: prompt
title: Write service due reminder emails
description: Writes a due-for-service reminder series for trades such as boiler, HVAC, chimney or car servicing, timed from the last service date, with a seasonal booking push and calm safety wording.
category: email-marketing
version: 1.0.0
status: incubating
stage: [build]
role: [founder, individual, marketer]
subject: [construction]
requires: [none]
inputs: [text]
output: [copy, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [service-reminders, repeat-bookings, seasonal-demand, trades, merge-fields]
pairs_with:
  prompts: [map-email-automation-flows, write-sms-campaign, write-post-purchase-emails]
args:
  - name: service
    description: The service and business - what you do, typical price or price range, how customers book now, the season when you are busiest, and why regular servicing matters in your own words.
    type: text
    required: true
  - name: interval
    description: How often the service is due, for example "every 12 months", "every 2 years or 20,000 km" or "twice a year, spring and autumn".
    type: string
    required: true
  - name: booking_method
    description: How customers book - online booking link, phone, reply to the email, text. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Series plan, Emails, Seasonal push, Data fields, Checks]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write reminder emails for a tradesperson or service business whose customers need the same job again on a schedule: boiler or furnace servicing, air-conditioning checks, chimney sweeping, gutter cleaning, car servicing, piano tuning. Repeat bookings are cheap work to win, but reminders fail when they arrive in the busy season (when the diary is already full), when they scare people ("Your boiler could kill you") instead of informing them, or when they make booking harder than calling a competitor. A good series is triggered from each customer's last service date, nudges people into quieter weeks, states one honest reason the service matters, and puts booking one tap away.

Service interval: {{interval}}
{{#booking_method}}Booking method: {{booking_method}}{{/booking_method}}
</context>

<task>
<service>
{{service}}
</service>

1. **Series plan:** set send points relative to the due date (last service date + interval), for example: 4 weeks before due, on the due date, 4 weeks overdue, and a final note around 3 months overdue, after which the contact returns to the next cycle or a low-frequency list. Stop the series as soon as a booking is made. Adjust timings for the interval given.
2. **Emails:** for each send, two subject lines that say what it is ("Your boiler service is due in March"), a preheader, a body of 60-120 words and one booking step. Email 1 explains what the service includes and how long it takes; email 2 gives the safety or cost reason in one plain sentence with no scare language; email 3 makes it easy (available slots, reply to book); the final email asks whether to keep reminding them, with options such as "I've had it done elsewhere" or "I've moved".
3. **Seasonal push:** a separate one-off email before the busy season to everyone due in the next few months, offering quieter-week slots first. Include a reason to book early that is real (shorter wait, wider choice of slots); use a discount only if the user gave one.
4. **Data fields:** list the fields each email needs ([First name], [Address or vehicle], [Last service date], [Due date], [Booking link]) and what to write if a field is empty.
5. **Checks:** consent to receive reminders, the series stopping after a booking, and the opt-out working.
</task>

<constraints>
- State a safety or legal reason only if the user supplied it or it is general and uncontroversial (for example that servicing helps catch faults early). Do not quote laws, inspection requirements or statistics unless provided; write [CHECK: legal requirement in your area] where a rule might apply, such as landlord safety checks.
- No fear-based wording, fake deadlines or "final warning" language.
- Do not invent prices, slot availability or guarantees; use [NEEDED: ...] for missing facts.
- Reminders that also promote other services may count as marketing; note that customers need to have agreed to receive them where local rules require it.
- If the service or interval is missing, ask for it and stop.
</constraints>

<output_format>
## Series plan
Table: Email | Send point relative to due date | Goal | Stop condition.

## Emails
Each email with subject lines, preheader, body and the booking step.

## Seasonal push
One email with subject lines, preheader and body, plus who receives it and when.

## Data fields
Table: Field | Example | If empty.

## Checks
A short checklist.
</output_format>
