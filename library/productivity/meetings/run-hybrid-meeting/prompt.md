---
schema: 1
id: run-hybrid-meeting
kind: prompt
title: Run a hybrid meeting
description: Designs a meeting where some people are in a room and others are remote so both count equally, with setup, roles, turn-taking rules and a facilitation script.
category: meetings
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [manager, project-manager, operations-manager, individual]
requires: [none]
inputs: [text]
output: [plan, checklist, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [hybrid-work, remote-meetings, inclusive-meetings, turn-taking, facilitation]
pairs_with:
  prompts: [write-meeting-agenda, plan-all-hands-meeting, prepare-virtual-presentation]
  personas: [meeting-facilitator]
args:
  - name: meeting_purpose
    description: What the meeting is for and what should come out of it, plus its length and how often it happens.
    type: text
    required: true
  - name: room_setup
    description: The room and equipment (for example "meeting room with one laptop and a TV screen", "video bar and ceiling microphones", "no camera in the room"). Optional.
    type: text
  - name: attendees
    description: Who joins from where (for example "5 in the Berlin office, 4 remote across UK and India"), and anyone with access needs. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Equity check, Setup, Roles, Ground rules, Facilitation script, Activities, After the meeting]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a facilitator who specialises in hybrid work. In most hybrid meetings the room wins: people in the room talk over each other, glance at each other to decide who speaks, use the whiteboard nobody remote can read, and keep chatting after the call ends, while remote people struggle to hear, wait for a gap that never comes and become spectators. Making both groups count equally is a design problem, solved with equipment, roles, explicit turn-taking and shared tools, not good intentions. One proven option is "one remote, all remote": everyone joins from their own device, with headphones, even when in the same room.

<meeting_purpose>
{{meeting_purpose}}
</meeting_purpose>
{{#room_setup}}Room setup: {{room_setup}}{{/room_setup}}
{{#attendees}}Attendees: {{attendees}}{{/attendees}}
</context>

<task>
1. Equity check: from the setup and attendees, name the specific ways remote people will be disadvantaged in this meeting (cannot hear side talk, cannot see the whiteboard, outnumbered, time-zone fatigue, lag), and whether this meeting would be better fully remote or with everyone on their own device. Recommend one approach with a reason.
2. Setup, adapted to the equipment given (or a minimal and a better option if no setup is given): audio first (a room microphone that picks up everyone, or laptops with headphones and microphones muted except the speaker's, to avoid echo), a camera showing room faces, a screen showing remote faces at eye level, shared digital documents or whiteboards instead of physical ones, captions on.
3. Roles: facilitator (ideally remote or seated at a laptop), a remote champion or "room buddy" who watches chat and raised hands and speaks up for remote people, a note-taker writing in a shared document everyone can see, and a timekeeper.
4. Ground rules to state at the start, five to seven, phrased simply: for example remote people speak first on each item; everyone uses the raise-hand feature, including the room; one conversation at a time; no side talk in the room; the chat is part of the meeting; anything on a physical surface is described or put into the shared document.
5. A facilitation script with the actual words: the opening (purpose, outcomes, ground rules, a quick check that everyone can hear and see), how to open and close each item with turn-taking (a round that starts remote, then room), how to bring in someone from chat, and the closing (decisions, owners and dates read out and written in the shared document, a quick check on how hybrid worked).
6. Activities that work for both groups, if the purpose needs discussion or ideas: silent writing in a shared document, digital dot-voting, breakouts that mix remote and room people.
7. After the meeting: notes shared within a set time, no decisions taken in the corridor afterwards (anything said after the call goes back to the group in writing).
</task>

<constraints>
- Name specific equipment only as types (a speakerphone, a video bar, a wide-angle camera), not brands.
- Keep the script short and natural; the facilitator must be able to say it without sounding scripted.
- If attendees span time zones, check the meeting time against working hours and say if someone is outside them; suggest rotating the time for recurring meetings.
- If the purpose does not need a live meeting (pure status updates), say so in one line and suggest an async alternative, then still give the design.
</constraints>

<output_format>
## Equity check
The risks in bullets, then the recommended approach in two sentences.

## Setup
Checklist, with a minimal and a better option where relevant.

## Roles
Table: Role | Who (or "someone in the room" / "someone remote") | What they do.

## Ground rules
Numbered, ready to read out.

## Facilitation script
Opening, per item, and closing, with the words in quotes.

## Activities
Only if relevant.

## After the meeting
Short checklist.
</output_format>
