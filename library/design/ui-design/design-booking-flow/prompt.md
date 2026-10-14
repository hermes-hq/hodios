---
schema: 1
id: design-booking-flow
kind: prompt
title: Design a booking flow
description: Designs an appointment or reservation booking flow with service and slot selection, time zones, deposits, confirmation, reminders, rescheduling and cancellation screens.
category: ui-design
version: 1.0.0
status: incubating
stage: [design]
role: [designer, product-manager, frontend-engineer, founder]
requires: [none]
inputs: [text, spec]
output: [plan, table, copy]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [booking, appointments, reservations, time-slots, time-zones, rescheduling]
pairs_with:
  prompts: [implement-appointment-booking, set-up-appointment-booking-system, design-form-experience, design-empty-and-error-states, write-ux-microcopy]
  personas: [product-designer]
args:
  - name: booking_context
    description: What is booked and by whom, staff or resources, slot lengths and opening hours, whether customers and providers can be in different time zones, deposits, cancellation policy, and current problems (no-shows, double bookings, drop-off).
    type: text
    required: true
  - name: platform
    description: Where the flow runs.
    type: enum
    enum: [web, mobile-app, embedded-widget, kiosk]
    default: web
output_contract:
  format: markdown
  sections: [Flow overview, Selection steps, Slot picker, Details and payment, Confirmation, Manage booking, Errors and edge states, Accessibility, Metrics]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Booking flows fail in predictable places: people pick a date only to find it full, time zones silently shift slots for remote customers, the calendar defaults to today when the earliest free slot is next week, a slot is lost while the customer types their details, and rescheduling means cancelling and starting again. Good booking UI shows availability before asking for commitment, leads with the next available slot, holds the chosen slot briefly, states the time zone wherever times appear, and makes changing or cancelling as easy as booking, within the business's real policy.
</context>

<task>
<booking_context>
{{booking_context}}
</booking_context>

Design for {{platform}}. If you do not know what is booked or by whom, ask and stop. Other gaps become assumptions marked [confirm].

1. **Flow overview.** Choose the order of choices (service, then provider or "any available", then time; or time first for single-resource businesses) and justify it. List every step from entry to confirmation and state whether an account is required (prefer not, with a booking reference and email link to manage).
2. **Selection steps.** Service list with duration and price, provider choice with an "any" default when it widens availability, party size or resource options.
3. **Slot picker.** Lead with the next available slots, then a date strip or calendar that marks days with no availability instead of letting people tap into empty days. Group times (morning, afternoon, evening), show the time zone, and for remote services show the customer's local time with the provider's time on request. Define slot hold length and what the customer sees when it expires.
4. **Details and payment.** Minimum fields with input types and autocomplete; deposit or prepayment shown with the cancellation policy before payment, not after.
5. **Confirmation.** Screen and message content: what, when (with time zone), where or how to join, what to bring, add-to-calendar, how to change or cancel, and the reminder schedule the customer will receive.
6. **Manage booking.** Reschedule in place keeping details, cancel with policy consequences stated before confirming, and what happens with deposits.
7. **Errors and edge states.** Exact copy and recovery for: slot taken during checkout, hold expired, no availability in range (offer waitlist or next date), payment failure, daylight-saving changes, provider cancels, late cancellation inside the policy window, duplicate booking.
8. **Accessibility.** Calendar keyboard navigation and screen reader labels with full dates, time slots as real buttons with clear selected state, target sizes, no colour-only availability cues.
9. **Metrics.** Step completion, time to book, slot-taken errors, no-show and late cancellation rates, reschedule versus cancel ratio.
</task>

<constraints>
- Do not invent the business's policies, prices or legal terms; use placeholders marked [confirm].
- Never hide the cancellation policy or fees until after payment.
- Always show a time zone with times when customers or providers may be in different zones.
- No fake scarcity ("only 1 slot left") unless it is true and computed.
{{> output/uncertainty}}
</constraints>

<output_format>
## Flow overview
## Selection steps
## Slot picker
## Details and payment
| Field | Label | Input type and autocomplete | Required | Notes |
## Confirmation
## Manage booking
## Errors and edge states
| Situation | Message (exact copy) | Recovery |
## Accessibility
## Metrics
</output_format>
