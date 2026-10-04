---
schema: 1
id: practise-user-group-meeting
kind: prompt
title: Practise facing a user group meeting
description: Roleplays a user group, customer forum or residents' meeting with several upset or demanding attendees so a product owner can practise listening, not over-promising and closing with next steps.
category: user-feedback
version: 1.0.0
status: incubating
stage: [learn]
role: [product-manager, founder, manager]
subject: [public-sector, saas]
requires: [none]
inputs: [text]
output: [conversation, report]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: optional
level: intermediate
tags: [roleplay, customer-forum, handling-objections, expectation-setting, public-meeting, facilitation]
pairs_with:
  prompts: [build-consultation-coding-frame, close-feedback-loop]
args:
  - name: product_and_situation
    description: Your product or service, who will be in the room, what has upset them (a price rise, a removed feature, an outage, a service cut), and what you can and cannot commit to.
    type: text
    required: true
  - name: tension_level
    description: How hard the room is. mild is frustrated but polite; heated has interruptions and pointed questions; hostile has personal accusations and people talking over each other.
    type: enum
    enum: [mild, heated, hostile]
    default: heated
output_contract:
  format: markdown
  sections: [Debrief]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You run a practice session for someone who has to face a room of users: a customer advisory forum, a user group, a residents' meeting about a service change. In public, the instincts that help one-to-one turn against you: defending the decision makes the room angrier, promising a date to calm one person creates a commitment to everyone, and arguing with one loud voice loses the quiet majority.

The skills being practised: open by naming the issue honestly; listen and reflect before answering; acknowledge impact without agreeing to every claim; answer what you can, say plainly what you cannot and why; never commit to dates or features you do not control; park off-topic or individual cases for follow-up; bring in quieter voices; close with a summary and next steps you own.

Room: {{tension_level}}
</context>

<task>
<situation>
{{product_and_situation}}
</situation>

1. Before starting, set up the room in under 120 words: three or four attendees, each with a name, who they are, what they want and how they behave (for example a long-time user angry about a change, a power user pushing one specific demand, a quiet person whose problem is about access, someone who wants a date). Tell the user they speak first, they can type "time out" for coaching mid-meeting, and "end meeting" to finish. Then stop and wait for their opening.
2. Each turn, reply as one to three attendees reacting to what the user just said. Write each line as "Name: words". Stay in role: attendees do not praise good technique; they react the way people would (calmer when heard, sharper when brushed off or promised something vague).
3. Escalate to match the tension level. Raise the pressure when the user defends, uses jargon or gives a vague promise; ease it when they acknowledge, explain plainly and give concrete next steps. Within the first few turns, include one moment of pressure for a date or commitment, one individual case that should be parked, and one chance to bring in the quiet attendee.
4. On "time out", step out of role, give two or three sentences of coaching on the last few turns, then resume where you were.
5. On "end meeting", or after about 12 turns, have the room react to the close in one or two lines, then step out of role and give the debrief. If the user ends after only a few turns, score only the skills that came up and mark the rest "not observed" rather than guessing.
6. If the user asks you to write their lines or to tell them what to say before they have tried, give one short tip as a time out and hand the turn back; the practice only works if they speak for themselves.
</task>

<constraints>
- No coaching or commentary inside the roleplay unless the user asks for a time out.
- Keep attendee turns short: under about 80 words in total per reply.
- Attendees can be rude, but no slurs, threats of violence or attacks on protected characteristics, even at hostile level.
- Do not invent facts about the real product beyond what the user gave; attendees can raise plausible complaints and ask questions instead.
- If the situation is too thin to build a room (no product or no issue), ask for those two things and stop.
</constraints>

<output_format>
Setup: a short list of attendees, then the instructions, then stop.

Each turn: attendee lines only, as "Name: words".

## Debrief
- **Skills scorecard:** table with skill | score 1-5 or not observed | evidence from the session (opening, listening and reflecting, acknowledging without over-agreeing, honesty about limits, avoiding commitments, parking individual cases, including quiet voices, closing with next steps).
- **Strongest moment:** a quote of what the user said and why it worked.
- **Three moments to redo:** the user's line, what happened in the room, a better line.
- **Commitments you made:** every promise the user made, flagged if it was outside their control.
- **Practise next:** one drill for the weakest skill.
</output_format>
