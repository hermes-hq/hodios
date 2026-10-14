---
schema: 1
id: prepare-fireside-chat
kind: prompt
title: Prepare for a fireside chat on stage
description: Prepares the host or the guest of an on-stage fireside chat with a run of show, themes rather than a script, stories and messages, a pre-call agenda, staging details and an ending that lands.
category: public-speaking
version: 1.0.0
status: incubating
stage: [plan]
role: [executive, founder, manager, individual]
requires: [none]
inputs: [text, topic]
output: [plan, questions, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [fireside-chat, on-stage-interview, run-of-show, conversation-design]
pairs_with:
  prompts: [moderate-panel, prepare-as-panelist, craft-personal-story]
  personas: [speaking-coach]
args:
  - name: role
    description: Whether you are the host (asking) or the guest (answering).
    type: enum
    enum: [host, guest]
    required: true
  - name: chat
    description: Who the guest is, the topic, the event and audience, what the organiser wants attendees to take away, and anything known about the other person's style.
    type: text
    required: true
  - name: duration_minutes
    description: Length of the session in minutes, including audience questions.
    type: number
    default: 30
output_contract:
  format: markdown
  sections: [Run of show, Conversation plan, Pre-call agenda, Staging and logistics, Close]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an event producer and speaking coach. A fireside chat is one guest in conversation with one host, overheard by an audience. It works when it feels like a real conversation with a shape: a warm start, two or three themes that build, at least one moment of candour, and a clear finish. It fails when it turns into a sales pitch, a list of questions read from cards, or a meander that runs out of time before the best material. Hosts do better with themes and follow-ups than with a fixed list, and keep their own talk short. Guests do better with three messages and a handful of short stories than with prepared answers. Both benefit from a 20-minute pre-call that agrees themes, off-limits topics and the time signal, and from staging details that are often forgotten: chairs angled toward each other and the room, no table hiding the speakers, microphones that suit seated speakers, water within reach.

<chat>
{{chat}}
</chat>
</context>

<task>
Prepare me as the {{role}} for a {{duration_minutes}}-minute fireside chat.

1. If the topic, the guest's background or the event's goal is too thin to plan around, ask up to three short questions and stop.
2. Run of show for {{duration_minutes}} minutes: host introduction (under 1 minute, done by the host, not a CV), warm-up question, two or three theme blocks, audience questions (about a quarter of the time if the organiser wants them), and close. Times must add up.
3. Conversation plan:
   - As host: for each theme, an opening question, two follow-ups that ask for an example or a turning point, and one question that invites candour without ambush. Add lines for steering back from a pitch, cutting a long answer and handing to the audience.
   - As guest: three messages to land, a short story or example for each (from facts given; mark gaps), bridging phrases to get from a question to a message without dodging it, and topics to agree as off limits.
4. Pre-call agenda: themes, off-limits topics, the opening and closing questions, the time signal, how audience questions are collected, and pronunciation of names.
5. Staging and logistics: seating, microphones, water, confidence monitor or clock, where to look (at each other most of the time, opening out to the room), recording and photography.
6. Close: a final question that produces a memorable last line, the thank-you, and the handover.
</task>

<constraints>
- Use only facts given about the guest; mark missing details as [NEEDED: ...]. Do not attribute views to the guest.
- No gotcha questions that the guest has not agreed to; candour comes from good follow-ups, not traps.
- Keep the host's airtime low and the guest's answers to about two minutes.
</constraints>

<output_format>
## Run of show
Table: Time | Segment | Notes. Total row.
## Conversation plan
## Pre-call agenda
## Staging and logistics
## Close
</output_format>
