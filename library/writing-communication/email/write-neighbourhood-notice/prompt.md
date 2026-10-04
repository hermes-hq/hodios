---
schema: 1
id: write-neighbourhood-notice
kind: prompt
title: Write a notice to your neighbours
description: Writes a clear notice or group message to neighbours or a building about an issue or event, such as building works, a lost pet or a street party, with the facts, the ask and a friendly tone.
category: email
version: 1.0.0
status: incubating
stage: [build]
role: [individual]
requires: [none]
inputs: [text, notes]
output: [message, copy]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: small
reasoning: off
level: beginner
tags: [neighbours, community-notice, flyer, group-chat, building-residents, street-party]
pairs_with:
  prompts: [write-event-invitation, check-tone-before-sending, set-boundary]
args:
  - name: purpose
    description: What the notice is for, for example "warn about renovation noise", "lost cat", "invite to a street party", "parcel delivered to the wrong flat", "ask people to stop blocking the bins".
    type: string
    required: true
  - name: details
    description: The facts - dates and times, where, who you are (first name and flat or house number, or how you want to be contacted), what you are asking neighbours to do, and anything else they need to know.
    type: text
    required: true
  - name: channel
    description: Where it will be read. flyer is printed for a noticeboard, door or lamppost; group-chat is a building or street chat; email is a residents' mailing list.
    type: enum
    enum: [flyer, group-chat, email]
    default: group-chat
output_contract:
  format: markdown
  sections: [Notice, Short reminder, Before you post]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Notices to neighbours are read in passing: a glance at a lift wall, a notification preview, a flyer on a door. They work when the point is clear in the first line, the key facts (what, when, where, who to contact) are easy to find, the ask is specific, and the tone is friendly enough that people want to help. They backfire when they read as passive-aggressive, blame a neighbour in public, share more personal details than needed, or bury the date in a paragraph.

Purpose: {{purpose}}
Channel: {{channel}}
<details>
{{details}}
</details>
</context>

<task>
1. Check the details for what this kind of notice needs and stop to ask (in one short message) if something essential is missing: for an event, date, time and place; for works, dates, daily hours and a contact; for a lost pet, name, description, where and when last seen, and a contact; for a request or complaint, what exactly you are asking people to do.
2. Write the notice for {{channel}}:
   - flyer: a large headline that says the point in a few words, the key facts as short lines (What, When, Where, Contact), one or two friendly sentences, and a note of where a photo, map or tear-off contact strip would go.
   - group-chat: the point in the first line so it shows in the notification preview, then two to five short lines with the facts and the ask, and a friendly sign-off with first name and flat or house number. At most one or two emoji, only if it suits the tone.
   - email: a subject line that states the point and date, then a short body with the facts in a list and the ask.
3. Tone: warm and neighbourly. For works or disruption, apologise once and say what you are doing to limit it. For a request or complaint, describe the problem and the ask without blaming anyone, assume good faith, and avoid capital letters and exclamation marks used as pressure.
4. Short reminder: a one- or two-line follow-up to post the day before or on the day (or, for a lost pet, a "still missing" or "found, thank you" update).
5. Before you post: a short checklist of privacy and practical points for this notice (share only a first name and a way to be contacted that you are comfortable with, do not name or picture a neighbour you are complaining about, check building or landlord rules on posting notices, add the photo for a lost pet, take down flyers afterwards).
6. Before answering, check the first line carries the point, every date and time from the details appears correctly, and the ask is specific.
</task>

<constraints>
- Use only the facts given; never invent dates, times, phone numbers or names. Use [X] for anything missing that is not essential.
- Keep it short enough to read at a glance; cut background that neighbours do not need.
- For disputes that have gone beyond a friendly notice (threats, harassment, legal claims, repeated serious noise), say once that a direct conversation, the landlord or building manager, mediation or the local council may be a better route.
- Do not write anything that shames, threatens or identifies a specific neighbour publicly.
</constraints>

<output_format>
## Notice
The ready-to-post text, formatted for {{channel}}.
## Short reminder
## Before you post
Three to five checklist items.
</output_format>

<examples>
Illustrative group-chat opening for building works: "Heads-up: kitchen works in Flat 4 from Mon 10 to Fri 14 March, 9:00 to 17:00."
</examples>
