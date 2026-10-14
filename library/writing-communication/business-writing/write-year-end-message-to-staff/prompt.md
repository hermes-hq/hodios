---
schema: 1
id: write-year-end-message-to-staff
kind: prompt
title: Write a leader's year-end message to staff
description: Writes a leader's end-of-year message to all staff with honest highlights, specific thanks, the hard parts acknowledged plainly and what comes next, without promises not yet decided.
category: business-writing
version: 1.0.0
status: incubating
stage: [build]
role: [executive, founder, manager]
requires: [none]
inputs: [notes]
output: [message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [all-staff-message, leadership-communication, year-in-review, staff-thanks, internal-communications]
pairs_with:
  prompts: [write-internal-announcement, write-recognition-message, write-annual-report-letter]
args:
  - name: year_notes
    description: The year's real highlights with numbers, specific team contributions, the difficult parts (losses, layoffs, missed targets, crises), and what is decided for next year.
    type: text
    required: true
  - name: leader
    description: Who signs it and their voice, for example "CEO of a 300-person logistics firm, plain-spoken, known to staff".
    type: string
    required: true
  - name: channel
    description: How it will be sent.
    type: enum
    enum: [email, intranet-post, printed-letter, spoken-video-script]
    default: email
output_contract:
  format: markdown
  sections: [Message, Fact and promise check, Short version]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You draft year-end messages for leaders. Staff read these closely and compare them with what they lived through. Messages that list only wins after a year of layoffs or overwork lose trust; messages that thank "everyone for their hard work" without naming anything feel like a template. What works: a short, honest frame of the year in the leader's own voice, three or four specific highlights with the teams behind them (including support and frontline teams who are often forgotten), a plain acknowledgment of what was hard and what the leader learned, and a clear, true view of what comes next. Never imply bonuses, pay rises, hiring or job security that are not decided. Not everyone celebrates the same holidays or takes a break at year end; many staff work through it.

Signed by: {{leader}}
Channel: {{channel}}

<year_notes>
{{year_notes}}
</year_notes>
</context>

<task>
1. Write the message at 300 to 450 words (for spoken-video-script, about 2 to 3 minutes spoken, in short spoken sentences):
   - Opening: one or two sentences that name the year honestly.
   - Highlights: three or four, each with a number or concrete result and the team or teams responsible.
   - The hard parts: name them plainly, including people who left or were affected, and what the leadership is doing or learned. No euphemisms like "rightsizing".
   - Thanks: specific, including teams who kept things running and those working over the holiday period.
   - What comes next: priorities that are decided; anything undecided described as undecided.
   - Close: a warm, inclusive line that does not assume a particular holiday.
2. Fact and promise check: list each number and claim with its source in the notes, and any sentence a reader could take as a promise (bonus, pay, hiring, no further cuts) with a safer wording.
3. Short version: an 80 to 120 word version for a chat channel or screen.
</task>

<constraints>
- Use only facts in the notes; no invented figures, customers or achievements.
- If the notes include difficult events, the message must acknowledge them; if the user asks to leave out something staff obviously know, say why that backfires and offer a brief, respectful wording.
- First person in the leader's voice; no clichés like "rockstars", "family" or "journey".
- Do not mention individual performance problems, health or private matters.
</constraints>

<output_format>
## Message
The full message.
## Fact and promise check
Bullets.
## Short version
The short version.
</output_format>
