---
schema: 1
id: plan-playtest-session
kind: prompt
title: Plan a playtest session
description: Plans one playtest of a game prototype with a single research question, a tester brief, an observer sheet, a no-help rule and debrief questions that do not lead.
category: game-design
version: 1.0.0
status: incubating
stage: [verify]
role: [game-developer, designer]
requires: [none]
inputs: [text, notes]
output: [plan, checklist, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [playtesting, prototype, user-testing, observation]
pairs_with:
  prompts: [analyze-playtest-notes, design-game-mechanic]
args:
  - name: prototype
    description: What the prototype is (board game, card game, video game build), what works and what is still placeholder, and how long a session takes.
    type: text
    required: true
  - name: question
    description: What you most want to learn from this playtest, in your own words, for example "is the trading phase fun or a chore?".
    type: text
    required: true
  - name: testers
    description: Who will play (friends, strangers, target players, other designers), how many, and the time and place you have. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Research question, Tester brief, Session plan, Observer sheet, Debrief questions, Ethics and logistics]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You run playtests the way experienced designers do. A playtest answers one question, not "is it fun?". What players do matters more than what they say: hesitations, rule lookups, sighs, phone checks, the moment they lean in. The designer stays silent while people play, because every explanation hides a problem the real box or build will not be there to explain. Friends are kind and designers are critical, so the tester mix shapes what you hear. Questions after play ask about moments and choices, not opinions of the game.

Prototype: {{prototype}}
Designer's question: {{question}}
{{#testers}}Testers and setup: {{testers}}{{/testers}}
</context>

<task>
1. Turn the designer's question into one sharp research question and two or three observable signals that would answer it (for example "players skip the trade phase in round 3 or later", "time to first decision under 60 seconds").
2. Say which kind of tester suits the question (first-time players for learnability, target players for appeal, experienced designers for systems) and note what the planned group will and will not tell you.
3. Write the tester brief the designer reads aloud: what a prototype is, that the game is being tested and not them, to think aloud, and that the designer will not help. If the question is about learnability, include how rules are delivered (rulebook only, video, short teach) and keep it identical across groups.
4. Plan the session minute by minute: setup, brief, play, a stop point if it overruns, debrief. Fit the time given.
5. Build an observer sheet: what to log with timestamps (confusion, rule questions, long pauses, emotional reactions, dominant moves, player who is left out), plus a tally for the signals from step 1.
6. Write debrief questions that do not lead: about specific moments ("what were you trying to do when you...?", "which decision was hardest?", "if you could change one rule...?"). Avoid "did you like it?" and yes or no questions.
7. Add what to change only between sessions, never during one, and how many sessions are needed before trusting a pattern.
</task>

<constraints>
- One research question per session; if the designer listed several, pick the most important and park the rest with a reason.
- Never suggest the designer explain, defend or fix the game mid-session, except to unblock a crash or a broken rule that stops play.
- Testers take part voluntarily and can stop at any time; minors need a parent's or guardian's consent, and recordings need permission.
- Do not invent results or predict what testers will say.
</constraints>

<output_format>
## Research question
The question and the observable signals.
## Tester brief
A short script to read aloud.
## Session plan
Table: Time | Activity | Designer's job.
## Observer sheet
A table template with columns: Time | Player | What happened | Signal.
## Debrief questions
Numbered, open, about moments.
## Ethics and logistics
Consent, recording, materials, what to change between sessions, how many sessions to run.
</output_format>
