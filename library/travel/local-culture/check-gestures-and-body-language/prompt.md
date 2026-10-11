---
schema: 1
id: check-gestures-and-body-language
kind: prompt
title: Check gestures and body language
description: Explains which gestures, hand signs, touch, eye contact and personal-space habits mean something different at a destination, which to avoid, and which local gestures to recognise.
category: local-culture
version: 1.0.0
status: incubating
stage: [learn]
role: [traveler]
requires: [none]
inputs: [topic]
output: [table, explanation]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [gestures, nonverbal-communication, personal-space, cross-cultural]
pairs_with:
  prompts: [learn-local-etiquette, explain-cultural-misunderstanding]
  personas: [local-culture-guide]
args:
  - name: destination
    description: Country or region you are going to.
    type: string
    required: true
  - name: home_habits
    description: Where you are from or gestures you use a lot (thumbs up, OK sign, beckoning with a finger, hugging hello). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Gestures to avoid, Gestures you will see, Touch and greetings, Eye contact and space, Pointing, beckoning and counting]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an intercultural trainer specialised in nonverbal communication. Gestures cause more accidental offence than words because people do them without thinking: a thumbs up or OK sign is rude in some places, beckoning with a raised finger is used for dogs in others, the left hand is unclean for eating and giving in parts of South Asia, the Middle East and Africa, showing the soles of feet is insulting in many countries, and a head wobble or a nod can mean the opposite of what visitors assume. Counting on fingers, pointing with the chin or lips, eye contact with elders and personal space also vary. Meanings change by region and generation, and globalisation has softened many, so you rank by real risk.

Destination: {{destination}}
{{#home_habits}}Home habits: {{home_habits}}{{/home_habits}}
</context>

<task>
1. List the gestures from the user's habits and common Western habits that are risky here, ranked by how offensive they may be, with what to do instead.
2. List local gestures the user will see and should read correctly, including any that mean yes, no, come here, or go away differently.
3. Explain touch and greetings: handshakes, kisses, bows, touching between genders, touching heads (including children's), public affection.
4. Explain eye contact and personal space in conversation, queues and with elders or officials.
5. Explain pointing, beckoning, counting on fingers, passing objects and money, and use of the left hand.
6. Mark each item with how much locals usually forgive tourists for it.
</task>

<constraints>
- Present meanings as common and note regional or generational variation; do not claim a gesture means the same everywhere in a country.
- Do not stereotype; describe behaviours, not character.
- If the destination is too broad (for example "Africa" or "Asia"), say so and ask for countries, or give only cautious general points.
</constraints>

<output_format>
## Gestures to avoid
Table: Gesture | What it can mean here | Do instead | Forgiveness (high, medium, low).

## Gestures you will see
Table: Gesture | Usual meaning.

## Touch and greetings
Bullets.

## Eye contact and space
Bullets.

## Pointing, beckoning and counting
Bullets.
</output_format>
