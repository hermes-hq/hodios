---
schema: 1
id: write-award-acceptance-speech
kind: prompt
title: Write an award acceptance speech
description: Writes a short award acceptance speech to the time allowed, with gracious thanks that name what people did, one personal moment and a clean ending, plus a shorter version if time is cut.
category: public-speaking
version: 1.0.0
status: incubating
stage: [build]
role: [individual, executive, manager, artist]
requires: [none]
inputs: [text, notes]
output: [script]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [acceptance-speech, thank-you, awards-ceremony, gratitude, short-speech]
pairs_with:
  prompts: [mark-up-script-for-delivery, rehearse-speech-with-feedback, write-speech]
  personas: [speechwriter]
args:
  - name: award
    description: The award, who gives it, the event and audience, and whether you know you have won or are preparing just in case.
    type: text
    required: true
  - name: material
    description: What the award is for, the people you want to thank and what each actually did, and any story or meaning it has for you.
    type: text
    required: true
  - name: time_limit
    description: How long you may speak.
    type: string
    default: "90 seconds"
  - name: tone
    description: For example warm, funny, humble, formal, or a short point you want to make. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Speech, Short version, Delivery notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Acceptance speeches go wrong in three ways: a list of names read off a phone that means nothing to the room, running long while the music starts, and false modesty or self-congratulation that makes the audience wince. Good ones are short, thank the people who gave the award and the other nominees first, name a few people with what they did ("Ana, who rewrote the grant at 2am") instead of listing twenty, share one true moment or what the work means, and end on a line that lets the room applaud. At spoken pace, about 130 words is a minute. Winners who did not expect to win still need a ready version, and ceremonies often cut time on the night, so a 30-second version is worth having.

<award>
{{award}}
</award>
<material>
{{material}}
</material>
Time limit: {{time_limit}}
{{#tone}}Tone: {{tone}}{{/tone}}
</context>

<task>
1. Work out the word budget from the time limit at about 130 words a minute, leaving a few seconds for applause.
2. Open by thanking the awarding body briefly and acknowledging the other nominees or the field.
3. Thank people: choose the few who matter most and say what each did. Group the rest ("everyone at the clinic") rather than listing them. Name a team where the award belongs to a team.
4. Add one personal moment or meaning, drawn only from the material.
5. If the user wants to make a point (a cause, a message), give it one or two sentences and keep it gracious.
6. End with a clear closing line and "thank you".
7. Write a 30-second version that keeps the thanks and the closing line.
8. Add delivery notes: where to pause, what to have in hand, and how to walk up and leave.
</task>

<constraints>
- Use only names, roles and stories the user gave. Do not invent anecdotes, quotes or achievements, even if asked; if no true moment is given, ask for one or write the speech without it.
- Stay within the word budget; give the word count of each version.
- No jokes at the expense of other nominees, the organisers or named people.
- If the material lists more names than the time allows, say which you kept, which you grouped, and why, and suggest another way to credit everyone (a written thank-you, a slide, a team message).
- Keep private details about third parties (patients, clients, children) to what the user gave, and flag any that could identify someone who has not agreed to it.
</constraints>

<output_format>
## Speech
The full speech, then its word count.
## Short version
The 30-second version, then its word count.
## Delivery notes
Bullets.
</output_format>
