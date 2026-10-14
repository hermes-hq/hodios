---
schema: 1
id: pitch-gig-to-venue
kind: prompt
title: Pitch your act to a venue or promoter
description: Writes a short booking email to a venue or promoter that leads with the draw you can prove, fits their nights, and names dates and links, plus a polite follow-up.
category: music
version: 1.0.0
status: incubating
stage: [ship]
role: [artist]
requires: [none]
inputs: [text, notes]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [gig-booking, booking-emails, live-performance, promoters]
pairs_with:
  prompts: [write-artist-bio, plan-live-set, pitch-music-to-curators]
args:
  - name: act
    description: Your act in a few facts, e.g. genre and line-up, where you are based, recent shows with rough attendance, mailing list or local following, best track link.
    type: text
    required: true
  - name: venue
    description: The venue or promoter and what you know about them, e.g. capacity, the nights they run, acts they book, booker's name if known.
    type: text
    required: true
  - name: ask
    description: What you want, e.g. "support slot in March", "headline a Thursday", "a residency", with any dates you are free.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Fit check, Subject lines, Email, Follow-up, Before sending]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a booking agent who has sat on both sides of the inbox. Bookers get dozens of emails a day and decide in seconds. What gets a reply: a subject line that says act, genre, town and the ask; proof of draw (how many paying people you can bring, backed by recent numbers); a clear fit with nights or acts they already book; specific dates; and one link to a live video or the best track. What gets ignored: long biographies, attachments, "we sound like nobody else", vague "any date", and no sign the sender has looked at the venue. Small venues care about selling tickets and the bar; promoters care about a lineup that makes sense together. Offering to share a bill or bring a support act can help.

<act>
{{act}}
</act>
<venue>
{{venue}}
</venue>
Ask: {{ask}}
</context>

<task>
1. **Fit check.** In two or three lines, say how this act fits the venue (capacity against realistic draw, genre against the nights they run). If the draw is far below what the venue needs, say so and suggest a better-fitting ask (a support slot, a weeknight, a shared bill).
2. **Subject line.** Two options: act, genre, home town, and the ask or dates.
3. **Email.** Under 150 words: greeting (by name if known), one line on who you are, proof of draw with the real numbers given, fit with a specific night or act they book, the ask with dates, one link, a sign-off with phone number placeholder. Use [placeholders] for any link or detail not given.
4. **Follow-up.** A two- to three-sentence follow-up to send after about a week if there is no reply, adding one new fact if available.
5. **Before sending.** A short checklist: links work, the video shows live performance, dates checked with every member, social pages show recent activity.
</task>

<constraints>
- Use only the numbers and facts given; never inflate draw, streams or past shows. If draw is unknown, leave it out rather than invent it, and say that bookers will ask.
- No attachments, no long bio in the body.
- Keep the tone professional and friendly, not pushy.
</constraints>

<output_format>
## Fit check
## Subject lines
## Email
## Follow-up
## Before sending
</output_format>
