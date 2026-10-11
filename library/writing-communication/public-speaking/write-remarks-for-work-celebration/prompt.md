---
schema: 1
id: write-remarks-for-work-celebration
kind: prompt
title: Write remarks for a work celebration
description: Writes a manager's or leader's short remarks for a team celebration, launch party, milestone or year-end event that recognise specific people and work without turning into a status update.
category: public-speaking
version: 1.0.0
status: incubating
stage: [build]
role: [manager, executive, engineering-manager, founder]
requires: [none]
inputs: [notes]
output: [script]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [team-celebration, year-end-party, milestone, recognition, workplace]
pairs_with:
  prompts: [write-recognition-message, write-farewell-or-retirement-speech]
args:
  - name: occasion
    description: The celebration and setting, for example "launch party for our new app, 40 people in a bar", "end-of-year team lunch, 12 people", "company 10th birthday, 200 staff and families".
    type: string
    required: true
  - name: what_happened
    description: "What is being celebrated, the hard parts, who did what (names and concrete contributions, including quieter roles), anything sensitive (layoffs this year, someone off sick, a missed bonus), and what comes next."
    type: text
    required: true
  - name: minutes
    description: Target length. Two to four minutes keeps a party audience.
    type: number
    default: 3
output_contract:
  format: markdown
  sections: [Remarks, Length, Who is named, Read the room]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Celebration remarks at work fail in recognisable ways: they become a quarterly business review with a glass in hand, they thank "everyone for their hard work" so nobody feels personally seen, they name the visible people and miss the support, operations or junior staff who made it possible, or they ignore something everyone in the room is thinking about, like a round of layoffs, which makes the cheer sound hollow. People remember being named for a specific thing they did far more than any metric. The leader's job is to tell the story of the effort in a minute (where we started, the hard moment, how it got done), recognise people specifically, acknowledge the cost honestly if there was one, and then hand the evening back to the party. If families or partners are present, they deserve a line of thanks; they absorbed the late nights too.
</context>

<task>
Write remarks for: {{occasion}}. Target: {{minutes}} minutes.
<what_happened>
{{what_happened}}
</what_happened>

1. If there are no names or concrete contributions, ask for three to five examples of who did what and stop.
2. Tell the story of the effort in three or four sentences: the starting point, the hard moment, how it got done.
3. Recognise people by name with one concrete thing each. Include at least one quieter or behind-the-scenes contribution from the material. If the list is long, name a few and recognise the rest as named groups so nobody is singled out by omission.
4. If the material mentions something sensitive, acknowledge it in one honest sentence where it fits (for example colleagues who are no longer here) or leave it out, and explain the choice in Read the room.
5. Close with a short look ahead (one line, no targets) and a toast or "enjoy the evening".
6. Write for a noisy room: short sentences, about 130 words per minute, [pause] before the toast.
</task>

<constraints>
- Use only the facts and names given; do not invent numbers, customer quotes or contributions.
- No metrics dump; at most one number if it matters to the story.
- No announcements that belong in a proper channel (reorganisations, compensation) and no promises about bonuses or promotions.
- No jokes at the expense of individuals or other teams.
</constraints>

<output_format>
## Remarks
Full text with [pause] marks.
## Length
"N words, about M minutes".
## Who is named
List of people and groups named, so the speaker can check nobody important is missing.
## Read the room
How the remarks handle anything sensitive, and one line on timing (before food, music down).
</output_format>
