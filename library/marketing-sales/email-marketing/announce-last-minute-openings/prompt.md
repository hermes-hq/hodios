---
schema: 1
id: announce-last-minute-openings
kind: prompt
title: Announce last-minute openings
description: Writes short email and SMS blasts that fill same-week empty slots - appointments, tables, class spots, workshop seats - for a waitlist or regulars, with fair booking rules and a frequency cap.
category: email-marketing
version: 1.0.0
status: incubating
stage: [build, operate]
role: [founder, operations-manager, individual]
subject: [hospitality]
requires: [none]
inputs: [text]
output: [copy, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: small
reasoning: optional
level: beginner
tags: [last-minute-availability, waitlist, cancellations, sms-blast, frequency-cap]
pairs_with:
  prompts: [write-sms-campaign, reduce-appointment-no-shows, write-weekly-specials-email]
args:
  - name: openings
    description: The empty slots - service or class, day, time, length, with whom, price, how many spots - and who you would send to (waitlist, regulars, everyone who opted in to last-minute alerts).
    type: text
    required: true
  - name: booking_link
    description: Where people book - a link, or "reply to this text", or a phone number.
    type: string
    required: true
  - name: channel
    description: Which messages to write - email, sms or both.
    type: enum
    enum: [email, sms, both]
    default: both
output_contract:
  format: markdown
  sections: [Who gets it, Messages, Fair booking rule, Frequency cap, After it fills]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write quick messages that fill empty slots this week: a salon chair after a cancellation, two tables on Thursday, three spots in a pottery class. These blasts work when they go to people who asked for them, say exactly what is free and when, make booking one tap, and do not arrive so often that people tune out or opt out. They fail when they become a discount habit ("last-minute deal!" every day teaches regulars to wait), when ten people race for one slot and nine are annoyed, or when texts arrive late at night.

Channel: {{channel}}
Booking: {{booking_link}}
</context>

<task>
<openings>
{{openings}}
</openings>

1. **Who gets it:** prefer people who opted into last-minute or waitlist alerts, then regulars who book this kind of slot. Exclude anyone already booked that day, anyone who got a last-minute message in the cap window, and anyone without consent for that channel.
2. **Messages:**
   - SMS (if requested): one message of at most 160 characters including the business name and an opt-out ("Reply STOP to opt out" or the platform's equivalent). Lead with what and when ("Fri 3pm cut & finish free with Ana"). Show the character count. The 160 limit holds only for plain GSM-7 characters; an emoji, curly quote or letters such as ã, õ or ł switch the whole text to 70-character segments, so swap those out (Joao for João only if the person is happy with that) or say the message will send as two or more segments. Write two versions.
   - Email (if requested): two subject lines that state the slot, a preheader, a body of 30-70 words listing each opening (day, time, length, with whom, price), and one booking button.
   - Price as normal by default. If the user wants a discount, keep it small, say it is for this slot only, and note the risk of training regulars to wait.
3. **Fair booking rule:** first to book through the link or reply gets the slot; say this in the message when spots are fewer than recipients. For a large list and one slot, suggest sending to a small group first (for example waitlist in sign-up order) and widening after 30-60 minutes.
4. **Frequency cap:** a rule such as no more than two last-minute messages per person per week and none between 8pm and 9am local time, and a "fewer alerts" option. Adjust for how often slots open.
5. **After it fills:** a short "all taken, thanks" reply or auto-response for latecomers with an invitation to stay on the alert list, and updating the booking system before sending anything else.
</task>

<constraints>
- Use only the slots, prices and names given; mark gaps as [NEEDED: ...].
- No fake scarcity or invented demand ("everyone is booking!").
- Quiet hours and SMS consent rules vary by country; note to check local rules for marketing texts.
- If the openings have no day or time, ask for them and stop.
</constraints>

<output_format>
## Who gets it
Bullets: include and exclude.

## Messages
SMS versions with character counts and the email, as requested by the channel.

## Fair booking rule
Two to three bullets.

## Frequency cap
The rule in one or two lines.

## After it fills
The latecomer reply and the system step.
</output_format>
