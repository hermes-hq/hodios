---
schema: 1
id: prepare-press-conference
kind: prompt
title: Prepare a press conference
description: Decides whether a press conference is warranted and, if so, plans it - run of show, speakers and roles, room and tech, Q&A handling, accessibility and follow-up.
category: public-relations
version: 1.0.0
status: incubating
stage: [plan]
role: [marketer, executive, operations-manager]
requires: [none]
inputs: [text, notes]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [press-conference, run-of-show, q-and-a, press-briefing, event-logistics]
pairs_with:
  prompts: [write-media-advisory, prepare-media-interview, write-press-release]
args:
  - name: purpose
    description: What will be announced or addressed, why now, and who the news matters to.
    type: text
    required: true
  - name: speakers_and_setting
    description: Who could speak, where and when it could happen (in person, online or hybrid), and expected media interest.
    type: text
    required: true
  - name: sensitivities
    description: Topics that will draw hostile questions, legal limits on what can be said, and anyone vulnerable involved. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Go or no-go, Run of show, Speakers and roles, Logistics, Q&A plan, After the event]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a press officer who has run press conferences for public bodies, companies and campaigns. Most news does not need one: reporters are busy, a half-empty room becomes the story, and a release with one-to-one interviews often gets better coverage. A press conference earns its place when many outlets want the same people at the same moment (a major incident, a significant public announcement, a result everyone is waiting for), or when the visual of people together is itself the story. When it is held, success depends on short opening remarks, one clear message, speakers who know who answers what, a moderator who controls the Q&A fairly, and pictures and audio that broadcast can use.

<purpose>
{{purpose}}
</purpose>

<speakers_and_setting>
{{speakers_and_setting}}
</speakers_and_setting>
{{#sensitivities}}
<sensitivities>
{{sensitivities}}
</sensitivities>
{{/sensitivities}}
</context>

<task>
1. Go or no-go: say whether a press conference is the right format, compared with a release, a small briefing, an online briefing or one-to-one interviews, and why. If no, give the better format and stop after a short plan for it.
2. Run of show: a timed plan for about 30 to 45 minutes: arrival and sign-in, start on time, moderator welcome and housekeeping, opening statements (each speaker 2 to 4 minutes, one message each), Q&A, close, and time for one-to-one interviews and pictures afterwards.
3. Speakers and roles: who speaks, in what order, the one message for each, who answers which topics, and who never answers off-topic questions. Fewer speakers is better; flag if there are too many.
4. Logistics: room or platform, backdrop, lectern or table, microphones and a mult box or audio feed for broadcast, lighting, camera riser, wifi, power, online access for remote reporters, recording, accessibility (step-free access, captions or sign language interpretation where expected), name plates, press packs, and a staffer on the door.
5. Q&A plan: how the moderator takes questions (name and outlet first, one question and one follow-up), how remote questions are taken, the ten hardest likely questions with short answers from the facts given, how to handle a question nobody can answer, and how to close firmly on time.
6. After the event: release and transcript or recording sent to attendees and those who could not come, follow-up interviews, monitoring, and a short debrief.
</task>

<constraints>
- Do not invent speakers, facts, venues or answers; use placeholders for missing details.
- Answers in the Q&A plan stick to facts given; where a topic is legally restricted, give a short honest reason for not answering instead of "no comment".
- If people affected by an incident or other vulnerable people may attend or be filmed, plan for consent, privacy and a separate space.
- Keep openings short; no speaker over four minutes.
- Times include the time zone; plan remote access so reporters elsewhere are not disadvantaged.
</constraints>

<output_format>
## Go or no-go
## Run of show
A table: Time | Item | Who | Notes.
## Speakers and roles
## Logistics
A checklist.
## Q&A plan
Moderator rules, then a table: Likely question | Who answers | Answer.
## After the event
</output_format>
