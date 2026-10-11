---
schema: 1
id: plan-online-quiz-night
kind: prompt
title: Plan an online quiz night
description: Plans a quiz run over a video call for friends, family or a remote team, with answer submission, lag and search-proofing, team breakouts, a host run sheet and a tech-check list.
category: trivia
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, manager, teacher]
requires: [none]
inputs: [preferences]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [online-quiz, video-call, remote-teams, breakout-rooms, run-sheet, cheating-prevention]
pairs_with:
  prompts: [host-trivia-night, design-quiz-scoring-rules]
args:
  - name: group
    description: Who is playing and how many, for example "22 colleagues across three time zones" or "8 households of family".
    type: string
    required: true
  - name: tools
    description: The video-call and form tools you already have, for example "a video-call app with breakout rooms and a shared spreadsheet". Optional.
    type: string
  - name: length
    description: Total time available, in minutes.
    type: number
    default: 75
output_contract:
  format: markdown
  sections: [Format, Answer submission, Fair play online, Run sheet, Tech check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan quizzes played over video calls. Online quizzes fail in ways in-person ones do not: audio lag ruins buzzer formats, screen-shared text is unreadable on phones, every player has a search engine one tab away, teams cannot whisper, and marking from chat messages is slow and error-prone. The fixes are mostly format choices: questions that cannot be searched quickly (pictures, audio, connections, estimates, "put these in order"), timed answer windows, one answer form per team, and a co-host who handles the tech while the host talks.

Group: {{group}}
{{#tools}}Tools available: {{tools}}{{/tools}}
Length: {{length}} minutes
</context>

<task>
1. Choose a format for the group: solo or teams; if teams, how they talk privately (breakout rooms, a separate call or chat per team) and how big. Keep the whole thing inside {{length}} minutes, including a 5-minute buffer for joining and tech.
2. Choose answer submission that the listed tools support: one form or shared sheet per team per round, private chat to the host, or written answers held up to the camera for small groups. Say who marks and how scores are shown.
3. Fair play online: favour search-resistant formats (estimates, ordering, pictures, audio, connections, local or personal knowledge); fixed answer windows per round; an honour rule about phones and tabs stated lightly; never a rule that requires monitoring people's screens.
4. Adapt for time zones and devices: big-font slides, everything readable on a phone, captions on if available, questions also posted in chat for anyone with bad audio.
5. Write a run sheet: minute by minute, who speaks, what is on screen, when breakouts open and close, when scores are shown.
6. Write a tech check for the day before and 15 minutes before: host audio, screen share, breakout permissions, form links, a backup host, and what to do if the host drops.
</task>

<constraints>
- Only recommend features that the named tools commonly have; if the person named none, keep the plan tool-agnostic and say which feature each step needs.
- No collection of personal data beyond team names; if a form is used, suggest it not require sign-in or email.
- For workplace quizzes, keep it optional and within working hours where possible.
</constraints>

<output_format>
## Format
Bullets: teams, rounds and timing.
## Answer submission
How answers are sent and marked.
## Fair play online
Bullets.
## Run sheet
Table: Time | Segment | Host | Co-host | On screen.
## Tech check
Checklist for the day before and for 15 minutes before.
</output_format>
