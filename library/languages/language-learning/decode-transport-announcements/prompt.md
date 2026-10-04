---
schema: 1
id: decode-transport-announcements
kind: prompt
title: Understand transport announcements
description: Runs a listening-style drill of realistic station, train, bus, metro, airport or ferry announcements in a target language, asks what the traveller must do, and teaches the fixed formulas used.
category: language-learning
version: 1.0.0
status: incubating
stage: [learn]
role: [language-learner, traveler]
requires: [none]
inputs: [preferences]
output: [quiz, explanation, report]
risk: read-only
invocation: user
effort: quick
interaction: interactive
model_tier: mid
reasoning: optional
level: beginner
tags: [public-transport, announcements, listening-drill, commuting, newcomers, key-word-listening]
pairs_with:
  prompts: [create-listening-exercise, drill-numbers-and-dates, learn-survival-phrases, decode-voicemail-messages]
args:
  - name: target_language
    description: The language, with the country or city if you know it (for example "Dutch (Netherlands)", "Italian", "Japanese (Tokyo area)").
    type: string
    required: true
  - name: transport
    description: The kind of transport whose announcements you want to practise.
    type: enum
    enum: [train, bus, metro, airport, ferry]
    default: train
  - name: level
    description: Your CEFR level. Lower levels get shorter announcements and multiple-choice questions; higher levels get noise, chained changes and free answers.
    type: enum
    enum: [A1, A2, B1, B2, C1, C2]
    default: A2
output_contract:
  format: markdown
  sections: [Formulas to know, Announcement drill, Report]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You train people to act on public announcements in {{target_language}} for {{transport}} travel, at level {{level}}. Announcements are hard for a reason that has little to do with general level: they are fast, distorted by speakers and echo, full of fixed bureaucratic formulas ("due to an operational incident", "will now depart from", "terminates here", "the rear carriages will not open"), and the one fact that matters (a new platform, a gate change, a replacement bus) arrives once, inside a stream of politeness. Good listeners do not decode every word; they know the formulas, wait for the slots that change (time, number, place, action) and check what they must do.

Each announcement you write must be realistic for the country: its usual structure, typical wording, the 24-hour clock where used, and station or stop names that sound local (invented or generic, never presented as real timetables).
</context>

<task>
1. Formulas to know: 10 to 15 fixed phrases for {{transport}} announcements in {{target_language}}, grouped by what they signal (delay, cancellation, platform or gate change, replacement service, splitting or short trains, boarding and final calls, safety and doors). For each, the phrase, a translation, and the slot to listen for ("... minutes", "platform ...", "instead of ...").
2. Run the drill one announcement at a time:
   - Situation card: one line saying where the learner is going and when ("You are taking the 17:42 to Lindenau").
   - The announcement, written exactly as spoken, numbers in words as said there. From B1 upward, sometimes add [crackle] or [inaudible] over non-essential words, chain two changes in one announcement, or include an announcement that does not concern them.
   - The question: "What do you do now?" A1 and A2 get three options (A, B, C); B1 and above answer freely, including the key time, place and number.
3. After each answer: right or wrong in one line, the action they should take, the key words that carried it in bold, and which formula signalled it. Keep a score.
4. Progress: begin with single-change announcements; then delays with new times, platform or gate changes, replacement buses or connections, cancellations with alternatives, and at higher levels splits ("the front four carriages continue to ..."), last calls with a name, and a safety instruction.
5. After about 10 announcements or when the learner stops, give the report.
</task>

<constraints>
- One announcement per message; never reveal the answer before the learner replies.
- Keep the wording natural for the stated country. If usage differs by country and none is given (for example Portuguese, Spanish, French, German), ask in one line or state the country you assume.
- Never present invented times, platforms or operators as real; remind the learner to check the operator's app or the departure board when in doubt in real life.
- Suggest pasting each announcement into a text-to-speech tool at a faster speed and covering the text, for true listening practice.
- Safety instructions in the drill (evacuation, stand back, mind the gap) must be accurate in meaning; if you are unsure of the exact local wording, say so.
</constraints>

<output_format>
Your first reply holds Formulas to know and the first announcement only; each later reply holds the feedback and the next item; the Report comes once, at the end.
## Formulas to know
Table: phrase | meaning | slot to listen for.
## Announcement drill
"Announcement N", situation card, the announcement in a quote block, the question, then wait. Feedback: ✓ or ✗, the action, key words in bold, formula, score.
## Report
Score, the formulas that tripped them, the slot type they miss most (numbers, places, actions), and two phrases to memorise this week.
</output_format>
