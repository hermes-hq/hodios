---
schema: 1
id: write-appointment-reminder-messages
kind: prompt
title: Write appointment reminder messages
description: Writes a set of appointment messages - booking confirmation, reminders, reschedule, no-show and late-cancel follow-ups - for SMS and email, within character limits and in your tone.
category: customer-support
version: 1.0.0
status: incubating
stage: [build, operate]
role: [support-agent, operations-manager, founder]
inputs: [notes, text]
output: [message, copy, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: off
level: beginner
tags: [appointment-reminders, sms-templates, booking-confirmation, no-show-follow-up, message-templates]
pairs_with:
  prompts: [reduce-appointment-no-shows, build-support-macros]
args:
  - name: business_type
    description: The business and its clients, for example "family dental practice", "dog groomer", "tax adviser".
    type: string
    required: true
  - name: policies
    description: Cancellation notice period, deposit or fee rules, how to reschedule (link, phone, reply), address and parking or prep instructions, and the brand voice. Leave empty to get placeholders.
    type: text
  - name: sms_limit
    description: Character limit per SMS. 160 is one standard segment; messages with emoji or some accented characters get a lower limit per segment.
    type: number
    default: 160
output_contract:
  format: markdown
  sections: [Merge fields, Message set, Sending schedule, Notes]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write transactional messages for appointment businesses. Reminders reduce no-shows when they arrive at the right time, say exactly when and where, make confirming or rescheduling one tap or one reply, and state the policy once without sounding like a threat. SMS must fit in one segment so it is cheap and arrives whole; email can carry the detail. Follow-ups after a missed appointment should keep the client, not punish them, and in health or care settings a missed visit can mean the person needs a call.
</context>

<task>
Write the appointment message set for a {{business_type}}.
{{#policies}}

<policies>
{{policies}}
</policies>
{{/policies}}

1. Define the merge fields you use, in square brackets so they are easy to map to any booking tool's own fields: [FirstName], [Date], [Time], [StaffName], [Location], [Link], [BusinessName], [Phone].
2. Write each message in an SMS version (at most {{sms_limit}} characters including merge fields at a typical length, with the count shown) and an email version (subject line plus a short body):
   - Booking confirmation
   - Reminder a few days before (adjust to the typical booking lead time)
   - Reminder the day before, with one-tap or reply-to-confirm
   - Reschedule or cancellation confirmed
   - Late cancellation, if a fee applies
   - No-show follow-up, first time (kind, offers rebooking)
   - No-show follow-up, repeat (states the policy plainly)
   - Waitlist offer when a slot opens
3. State the policy once, in the confirmation, and refer to it briefly elsewhere. If policies are empty, use `[POLICY: …]` placeholders.
4. Give a sending schedule and the opt-out or "reply STOP" note where marketing rules may require it.
</task>

<constraints>
- SMS versions must not exceed {{sms_limit}} characters; show the count for each and assume typical merge field lengths (first name 8 characters, date as "Tue 14 May"). Avoid emoji and characters that shrink the segment limit.
- Do not invent fees, notice periods, addresses or links; use placeholders.
- Never include health details, the reason for the appointment or anything sensitive in an SMS or email subject; a message on a lock screen can be read by others.
- One clear action per message. No guilt-tripping in no-show messages.
- Match the brand voice if given; otherwise warm, brief and professional.
</constraints>

<output_format>
## Merge fields
One line listing them.
## Message set
For each message: heading, then **SMS** (text and character count) and **Email** (subject and body).
## Sending schedule
Table: Message | Trigger or timing | Channel.
## Notes
Bullets: placeholders to fill, compliance points to check (consent for SMS, opt-out wording), and the health or care follow-up note if relevant.
</output_format>
