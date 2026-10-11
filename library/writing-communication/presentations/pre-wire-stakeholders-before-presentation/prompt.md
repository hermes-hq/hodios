---
schema: 1
id: pre-wire-stakeholders-before-presentation
kind: prompt
title: Pre-wire stakeholders before a presentation
description: Plans one-to-one pre-meetings with key stakeholders before a big presentation or decision meeting, to surface objections early, adjust the deck and avoid surprises in the room.
category: presentations
version: 1.0.0
status: incubating
stage: [plan]
role: [manager, product-manager, consultant, executive]
requires: [none]
inputs: [notes, text]
output: [plan, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [pre-wiring, stakeholder-meetings, objections, decision-meeting, buy-in]
pairs_with:
  prompts: [build-decision-request-deck, plan-stakeholder-alignment, drill-presentation-qa, plan-backup-slides]
  personas: [presentation-designer]
args:
  - name: presentation
    description: What you will present, the decision or support you need, and the date.
    type: text
    required: true
  - name: stakeholders
    description: The people who will be in the room or influence it, their roles, what you know of their views and concerns, and your relationship with each.
    type: text
    required: true
  - name: deck_summary
    description: The main points or slide titles of your current deck. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Who to see and in what order, Conversation plans, Deck changes to expect, In the room]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan pre-wiring: the short private conversations before a big presentation that decide most outcomes. Senior people dislike being surprised in front of peers; an objection raised for the first time in the meeting tends to stall the decision even if it could have been answered. Pre-wiring means seeing the people whose support or objection matters most, sharing the core recommendation (not the whole deck), asking what would worry them and what they need to see, and then genuinely adjusting: adding their data, changing the option, or crediting their input. The order matters: start with likely allies and people with expertise the proposal relies on, then the sceptics whose concerns you can now answer, and brief the final decision maker last or through the right channel. Pre-wiring is not lobbying in secret; each person should hear the same facts, and the meeting should still be where the decision is made.

Presentation: {{presentation}}

Stakeholders:
{{stakeholders}}
{{#deck_summary}}Current deck: {{deck_summary}}{{/deck_summary}}
</context>

<task>
1. Rank the stakeholders by how much their view affects the outcome and how likely they are to object, and pick who to pre-wire (usually three to six people). Say who can be covered by a short note instead.
2. Set the order and timing, leaving enough time before the presentation to change the deck.
3. For each person, write a conversation plan: the purpose in one sentence, what to share, two or three open questions to draw out concerns, the objections you expect and a first answer, what you could offer or change, and how to close (what you will ask them to do in the room, if anything).
4. Write a short request message to book each conversation.
5. List the deck changes these conversations are likely to drive, such as backup slides, a changed option or added data.
6. Plan the room: who might speak in support, how to acknowledge input received ("following a conversation with finance, we added..."), and what to do if someone raises a new objection.
</task>

<constraints>
- Same facts for everyone; do not suggest telling different stakeholders different things.
- Do not invent stakeholders' views; where unknown, plan to ask.
- Respect hierarchy and protocol: if a stakeholder should be approached through their manager or a formal channel, say so.
- Keep each conversation plan short enough for a 15 to 20 minute meeting.
</constraints>

<output_format>
## Who to see and in what order
A table: person, why, expected stance, order, by when.

## Conversation plans
One subsection per person, with the booking message.

## Deck changes to expect
Bullets.

## In the room
Bullets.
</output_format>
