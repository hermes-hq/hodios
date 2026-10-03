---
schema: 1
id: reduce-appointment-no-shows
kind: prompt
title: Reduce appointment no-shows
description: Builds a no-show reduction plan for an appointment business - causes, reminders, deposits and cancellation policy, a waitlist and the numbers to track. Use when empty slots cost money.
category: operations
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [operations-manager, founder, manager]
inputs: [notes, dataset, text]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [no-shows, late-cancellations, deposits, cancellation-policy, waitlist, booking]
pairs_with:
  prompts: [write-appointment-reminder-messages, build-staff-schedule, choose-small-business-kpis]
args:
  - name: business_type
    description: The appointment business, for example "dental practice", "barber shop", "personal trainer", "tattoo studio".
    type: string
    required: true
  - name: current_rate
    description: The current no-show and late-cancellation rate if known, how you measure it, and the average value of a slot, for example "about 12% no-shows, slot worth 60".
    type: string
  - name: booking_system
    description: The booking tool and what it can do (automatic SMS or email reminders, card on file, deposits, waitlist), or "paper diary".
    type: string
output_contract:
  format: markdown
  sections: [Baseline and cost, Likely causes, Plan, Policy wording, Waitlist and backfill, What to track, Rollout, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You advise appointment-based businesses on scheduling. No-shows have a few typical causes: the client forgot, booked too far ahead, found it hard to cancel, did not value a free slot, or had a reason the business never heard. The fixes work in layers: make attending easy (clear confirmation, timely reminders, easy rescheduling), make missing costly but fair (deposits or a fee, applied consistently), and refill the slots that still empty (waitlist, short-notice offers). A policy that angers loyal clients over one miss costs more than the slot, so you design for firmness with first-time grace.
</context>

<task>
Build a no-show reduction plan.

Business: {{business_type}}
{{#current_rate}}Current rate and slot value: {{current_rate}}
{{/current_rate}}{{#booking_system}}Booking system: {{booking_system}}
{{/booking_system}}
1. Baseline and cost: state the current rate and the monthly cost of empty slots, showing the calculation. If the rate is unknown, give a simple four-week tracking method (no-show, late cancel under the notice period, rebooked) and use a clearly labelled placeholder until then.
2. Likely causes for this business type, and how to check which ones apply (for example look at lead time between booking and appointment, first visit or repeat, day and time, channel).
3. Plan in three layers, each item with expected effort and what the booking system needs:
   - Make it easy to attend: confirmation content, reminder timing (for example at booking, a few days before and the day before; adapt to lead time), one-tap confirm or reschedule, prep instructions.
   - Make missing costly: deposit or card-on-file options, who they apply to (all clients, first-timers, long or high-value slots, repeat no-shows), the notice period, fee amount reasoning, and a grace rule.
   - Refill empty slots: waitlist, short-notice messages, double-booking or overbooking rules only where the service allows it safely.
4. Policy wording: a short client-facing cancellation and no-show policy in plain language, to show at booking and in the confirmation.
5. Waitlist and backfill: how a cancellation is offered to the waitlist and how fast.
6. What to track weekly, with a target, and when to tighten or relax the policy.
7. A rollout: announce to existing clients first, start date, staff script for applying a fee kindly.
</task>

<constraints>
- Fit the booking system. If none is given, plan for a basic online booking tool and give the manual version alongside each item. If it is a paper diary, give manual versions (a reminder call list, a deposit taken by payment link) and say what a basic online booking tool would add, without naming a product as the answer.
- Do not invent statistics about how much each tactic cuts no-shows; describe effects qualitatively and tell the owner to measure.
- Fees and deposits must be disclosed before booking. Note that consumer protection, card-payment and, for health services, professional or insurer rules may limit fees; list this as a check.
- For health or care businesses, add a note that a missed appointment can be a sign the patient needs follow-up, not just a fee.
</constraints>

<output_format>
## Baseline and cost
## Likely causes
Table: Cause | How to check | Fix.
## Plan
Three subsections, each a table: Action | Effort | System needed.
## Policy wording
A block of client-facing text, under 120 words.
## Waitlist and backfill
## What to track
Table: Measure | How | Target.
## Rollout
Numbered steps with dates relative to start.
## Questions
At most four.
</output_format>
