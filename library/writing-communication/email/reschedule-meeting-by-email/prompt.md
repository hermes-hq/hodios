---
schema: 1
id: reschedule-meeting-by-email
kind: prompt
title: Reschedule a meeting by email
description: Writes a note that moves or cancels a booked meeting, call or interview, with a one-line reason, two or three new slots in the other person's time zone and no grovelling.
category: email
version: 1.0.0
status: incubating
stage: [operate]
role: [individual, manager, consultant, sales-rep]
requires: [none]
inputs: [text]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: small
reasoning: off
level: beginner
depth: specific
tags: [reschedule, cancel-meeting, calendar, time-zones, scheduling]
pairs_with:
  prompts: [write-meeting-request-email, find-meeting-time-across-time-zones, write-meeting-invite]
args:
  - name: meeting
    description: The meeting being changed, with its current date, time and time zone, who it is with and what it is for.
    type: string
    required: true
  - name: reason
    description: Why it must move. It will be stated in one neutral line; private detail stays out.
    type: string
  - name: new_slots
    description: Times you can offer instead, with your time zone, and the other person's time zone if different. Leave empty if you want to cancel without rebooking.
    type: text
  - name: change
    description: Reschedule offers new times; cancel ends the meeting without a new date.
    type: enum
    enum: [reschedule, cancel]
    default: reschedule
  - name: relationship
    description: Who the other person is, for example "prospective client", "candidate I'm interviewing", "my manager" or "a senior person I asked for advice". Sets the formality and how much care to take.
    type: string
output_contract:
  format: markdown
  sections: [Email, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Moving a meeting costs the other person something: they blocked time, prepared, maybe declined something else. The note that keeps goodwill does four things: it arrives as early as possible, gives a short honest reason, offers specific new times that suit them (in their time zone, with the zone written out), and makes rebooking one reply. It loses goodwill when it asks "when works for you?" with no options, offers slots in the sender's zone only, or over-apologises in a way that makes the reader manage the sender's feelings. Who asked for the meeting matters: if you asked a busy person for their time, moving it twice signals they are not a priority, so offer more flexibility. A candidate whose interview is moved worries it is a bad sign, so reassure them the role and their application are unaffected if that is true. When the original invite came from a calendar, the calendar entry must also be updated, or people show up to the old slot.
</context>

<task>
Write a note to {{change}} this meeting.

Meeting: {{meeting}}
{{#relationship}}Other person: {{relationship}}{{/relationship}}
{{#reason}}Reason: {{reason}}{{/reason}}
{{#new_slots}}
<new_slots>
{{new_slots}}
</new_slots>
{{/new_slots}}

1. If you cannot tell which meeting or when it was, ask and stop.
2. If rescheduling and no slots are given, use `[slot 1]`, `[slot 2]` placeholders and say in Notes that concrete options get faster replies.
3. Convert the offered slots into the other person's time zone if both zones are known, showing both ("Tue 4 Nov, 15:00 London / 10:00 New York"). If the conversion is ambiguous because of a daylight saving change, flag it in Notes.
4. Write the email:
   - Subject: "Moving our [meeting] on [date]" or "Cancelling [meeting] on [date]".
   - First line: the change and the original date and time.
   - Reason in one neutral line, or none if no reason was given. Never invent one.
   - New options as a short list, with the simplest reply path ("Just reply with 1, 2 or 3 and I'll send the update").
   - One apology sentence if the change is late or the other person asked for nothing; none needed between close colleagues.
   - For a candidate, one line that the process is on track (only if the input supports it).
   - For a cancellation, say whether a new meeting is needed and who will propose it, or that it is no longer needed and why.
5. Under Notes, remind the user to update or cancel the calendar invite, and to tell anyone else who was invited.
</task>

<constraints>
- Under about 100 words in the body.
- No invented reasons, times or reassurances.
- No grovelling, no "I hate to do this", no more than one apology.
- If this is the second move of the same meeting, acknowledge it in one line and offer the other person the choice of time.
</constraints>

<output_format>
## Email
Subject line, then the body.
## Notes
Bullets: calendar update, other invitees, time zone checks, placeholders.
</output_format>
