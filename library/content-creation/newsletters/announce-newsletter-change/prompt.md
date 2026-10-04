---
schema: 1
id: announce-newsletter-change
kind: prompt
title: Announce a newsletter change
description: Writes the announcement for a newsletter change readers will feel, such as a price rise, new cadence, pause, platform move, handover or closure, with the reason, dates and options, and no guilt.
category: newsletters
version: 1.0.0
status: incubating
stage: [ship, operate]
role: [writer, content-creator]
requires: [none]
inputs: [notes, text]
output: [message, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [subscriber-communication, price-increase, hiatus, closing-down, notice-period]
pairs_with:
  prompts: [write-newsletter-welcome-email, plan-inactive-subscriber-cleanup]
  workflows: [newsletter-platform-move-track, paid-tier-launch-track]
args:
  - name: change_type
    description: The kind of change.
    type: enum
    enum: [price-rise, cadence-change, hiatus, platform-move, handover, closing]
    required: true
  - name: details
    description: What is changing, the effective date, the real reason, numbers involved (old and new price, new schedule, return date), what happens to the archive, and anything you are unsure about.
    type: text
    required: true
  - name: paid_subscribers
    description: Whether the newsletter has paying subscribers affected by the change.
    type: boolean
    default: false
output_contract:
  format: markdown
  sections: [Notice plan, Announcement, Reminder, Reader questions, Check before sending]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a newsletter writer tell subscribers about a change they will feel: {{change_type}}. Paying subscribers: {{paid_subscribers}}. Readers forgive most changes when they hear early, get the real reason, know exactly what changes and when, and have a fair choice. They resent surprises on their bank statement, vague "exciting news" framing, guilt ("if you value this work...") and finding out after the fact. Writers often over-explain and apologise, or under-explain and bury the date.
</context>

<task>
<details>
{{details}}
</details>

1. Set the notice plan for this change type, and say if the given date leaves too little notice:
   - price-rise: at least 30 days before any renewal at the new price, longer for annual plans; say whether existing subscribers keep their current price (grandfathering) and until when. Platforms and local consumer rules may require specific notice; tell the writer to check.
   - cadence-change: one issue's notice is enough for a small change; explain what readers get instead.
   - hiatus: as soon as known, with the return date or "I'll write before I return", and what happens to paid billing (paused or not).
   - platform-move: one to two weeks before, with what readers must do (usually nothing), a new sender name or address to expect, and how to check the spam folder.
   - handover: before the first issue from the new owner, introducing them, what stays and changes, and how data and billing move.
   - closing: at least two weeks before the last issue when possible, what happens to the archive, refunds for unused paid time, and a thank-you.
2. Write the announcement: a plain subject line that names the change, the change and date in the first two sentences, the real reason in one or two honest sentences, what stays the same, what readers can do (including how to cancel or get a refund if paid), and a short thank-you. No guilt, no "exciting news" for a price rise or closure.
3. Write a short reminder for the last days before the change.
4. Anticipate three to five reader questions with short answers, using only the details given.
</task>

<constraints>
- Use only the facts given; mark missing dates, prices, refund terms or billing behaviour as [CONFIRM: ...] and list them. Never state what a platform does automatically; tell the writer to check.
- For paid subscribers, always state how to cancel and whether refunds apply; do not hide the cancel path.
- Do not promise a return date, price freeze or future content the writer did not commit to.
- Keep the announcement under about 250 words and the reminder under 80.
- If the reason is personal (health, burnout, family), keep it as brief as the writer wants; never push for more detail.
</constraints>

<output_format>
## Notice plan
Table: send | date or timing | audience (all or paid only) | purpose.

## Announcement
Subject, preview line and body.

## Reminder
Subject and body.

## Reader questions
Q and A pairs.

## Check before sending
Every [CONFIRM], billing settings to verify, and the notice-rule check.
</output_format>
