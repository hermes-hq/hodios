---
schema: 1
id: write-service-disruption-posts
kind: prompt
title: Write service disruption posts
description: Writes live social posts for an unplanned closure, cancellation, delay or recall, with what is affected, what to do and the next update time, plus a pinned version, updates and an all-clear.
category: social-media
version: 1.0.0
status: incubating
stage: [operate]
role: [operations-manager, marketer, support-agent]
subject: [retail, education-sector]
requires: [none]
inputs: [notes, text]
output: [post, message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [crisis-communication, service-updates, closures, cancellations, plain-language]
pairs_with:
  prompts: [handle-social-media-backlash, reply-to-comments]
args:
  - name: disruption
    description: What has happened, what is affected and what still works, start and expected end time (or "unknown"), what people should do (refunds, alternatives, rebooking), safety advice if any, and when the next update will come. Paste official wording if there is any.
    type: text
    required: true
  - name: organisation
    description: Who is posting (for example "Greenfield Primary School", "Line 4 bus operator", "Harbour Dental Clinic").
    type: string
    required: true
  - name: channels
    description: Where the update must go (for example "Facebook, X, Instagram stories, website banner, parent app, SMS").
    type: string
    default: main social accounts
output_contract:
  format: markdown
  sections: [First post, Channel versions, Pinned summary, Update template, All-clear, Checks]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A shop, school, clinic, venue or small transport operator must tell people on its social channels about an unplanned disruption that is happening now and may change by the hour. (Planned works and formal public notices are a different job.) In a disruption people skim on a phone, often stressed, and share screenshots that outlive the post. Bad updates bury the impact under apologies, use internal jargon ("due to operational issues"), give no end time or next update time, and leave old posts uncorrected so people act on stale information. A good update answers in order: what is affected, from when to when, what to do now, and when they will hear next.

Organisation: {{organisation}}
Channels: {{channels}}
</context>

<task>
<disruption>
{{disruption}}
</disruption>

1. Extract: affected service, what still works, start, expected end or "not yet known", what people should do, safety instructions, refunds or alternatives, the next update time, and the one place that will hold the latest information.
2. Write the first post in this order: a plain headline line ("Closed today", "Line 4 not running between X and Y"); what is affected and what is not; timing; what to do now; where and when the next update will be. One short apology or thanks at the end, not the start.
3. For recalls or safety issues, put the safety action first ("Do not eat", "Stop using") with the product identifiers exactly as given, and how to return or get help.
4. Adapt for each channel: a short version for X or SMS (under 280 characters), a story or image-text version (under 15 words on the card), and a fuller version for Facebook or a website banner.
5. Write a pinned summary that will be edited as things change, starting with "Updated [time]". Set an update rhythm while the disruption lasts (for example every two hours, or at a fixed time each day) and keep it even when there is no news ("No change yet; next update at 4pm").
6. Write an update template and an all-clear post that says what is back to normal, anything still different, and thanks people.
7. List checks before posting.
</task>

<constraints>
- Use only facts given; never guess causes, end times or compensation. Write "We will update by [time]" instead of an invented end time, and flag missing essentials as [X].
- No blame, speculation or legal admissions; for recalls and safety incidents follow the official or regulator wording if supplied.
- Plain words, no jargon or acronyms; dates with day names ("Tuesday 4 March"); 24-hour or am/pm consistently.
- Make it accessible: key facts in text, not only in an image; alt text for any image.
- If what is affected or the timing is missing, ask for it before writing, unless the user says it is urgent, in which case write with [X] slots.
</constraints>

<output_format>
## First post
Ready to paste.

## Channel versions
One per channel.

## Pinned summary
With "Updated [time]".

## Update template
With [blanks].

## All-clear
Ready to adapt.

## Checks
Checklist: times and dates right, old posts marked as out of date, phone or help desk briefed, comments monitored.
</output_format>
