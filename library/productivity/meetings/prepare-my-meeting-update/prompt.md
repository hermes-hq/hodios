---
schema: 1
id: prepare-my-meeting-update
kind: prompt
title: Prepare my update for a team meeting
description: Turns your rough notes into a short spoken update for a recurring meeting - headline, progress, blocker, ask - in about a minute, plus a written version and an answer to the likely follow-up.
category: meetings
version: 1.0.0
status: incubating
stage: [operate]
role: [individual, software-engineer, project-manager, manager]
requires: [none]
inputs: [notes, text]
output: [script, message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: small
reasoning: optional
level: beginner
tags: [status-update, concise-writing, stakeholders, team-meeting]
pairs_with:
  prompts: [write-standup-update, write-status-report, prepare-for-one-on-one]
args:
  - name: notes
    description: Your rough notes on what you worked on, what is done, what is stuck and anything you need.
    type: text
    required: true
  - name: meeting
    description: Which meeting and who is listening (for example "weekly team meeting, my manager and 8 peers", "monthly leadership review"). Optional.
    type: text
  - name: seconds
    description: How long you have to speak, in seconds.
    type: number
    default: 60
output_contract:
  format: markdown
  sections: [Spoken update, Written version, Likely follow-up, What I left out]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people give short updates in recurring meetings. Most updates are a chronological list of tasks ("on Monday I... then I...") that loses the listener, buries the one thing that matters (a slip, a decision needed, a request for help), and runs over time. Listeners want, in order: the headline (on track or not, and what changed), the progress that matters to them, any blocker or risk, and a clear ask with a name and a date. People speak at roughly 130 to 150 words a minute, so a one-minute update is about 130 to 150 words. Good updates use plain words, numbers instead of adjectives, and stop when they are done. Bad news is said early and with a plan, not softened into invisibility.

<notes>
{{notes}}
</notes>
{{#meeting}}Meeting and audience: {{meeting}}{{/meeting}}
Time to speak: {{seconds}} seconds
</context>

<task>
1. Pick the headline from the notes: the single most important thing for this audience. If something is late, at risk or needs a decision, that leads.
2. Write the spoken update in the order headline, progress, blocker or risk, ask; within the word budget for the time allowed (about 2.3 words per second); in natural spoken sentences. If there is no blocker or ask, say so in a few words or leave it out.
3. Make any ask specific: who, what and by when.
4. Write a written version of three to five bullets for the meeting notes or chat.
5. Predict the most likely follow-up question from this audience and give a one- or two-sentence answer based only on the notes.
6. List what you left out and why, so the user can choose to add it back.
</task>

<constraints>
- Use only facts in the notes; if a key fact is missing (a date, a number), put a placeholder in square brackets.
- Do not hide or soften a delay or problem the notes mention; state it plainly with what is being done.
- Stay within the word budget; show the word count of the spoken update.
- No jargon the audience is unlikely to share.
</constraints>

<output_format>
## Spoken update
The script, then "(N words, about S seconds)".

## Written version
Three to five bullets.

## Likely follow-up
Question, then answer.

## What I left out
Bullets.
</output_format>
