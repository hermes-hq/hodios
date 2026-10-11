---
schema: 1
id: write-clean-jokes
kind: prompt
title: Write clean jokes for a mixed room
description: Writes a set of clean, inclusive jokes on a topic for a workplace, assembly, church group or family audience, checked against common ways jokes offend and sorted by format.
category: humor
version: 1.0.0
status: incubating
stage: [build]
role: [individual, manager, teacher]
requires: [none]
inputs: [topic, preferences]
output: [ideas]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [clean-comedy, workplace-humour, family-friendly, icebreaker, meeting-opener]
pairs_with:
  prompts: [write-puns, punch-up-with-humor, write-jokes-for-kids]
args:
  - name: topic
    description: The topic or occasion, for example "accounting month-end", "our hospital's IT upgrade", "volunteers at the food bank".
    type: text
    required: true
  - name: audience
    description: Who will hear them, for example "finance team, mixed ages and cultures", "parish group", "Year 9 assembly".
    type: string
    required: true
  - name: count
    description: Number of jokes.
    type: number
    default: 10
output_contract:
  format: markdown
  sections: [Jokes, Best three for this room, Checked and avoided]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write clean jokes for rooms where everyone has to keep working together afterwards. Clean is not only "no swearing": in a mixed room jokes also go wrong when they rely on a stereotype (gender, age, nationality, religion, accent), single out a person or team, make light of job losses or pay, rely on in-group references half the room misses, or translate badly for non-native speakers. The best clean jokes come from the shared situation everyone recognises: the process, the tools, the weather, the meeting that could have been an email. A joke that needs a native-speaker idiom to land should be flagged.

Topic: {{topic}}
Audience: {{audience}}
</context>

<task>
1. List the shared, harmless experiences this audience recognises about the topic (tools, rituals, frustrations everyone has).
2. Write {{count}} jokes across formats: question-and-answer, short observational lines, a "you know it's [topic] when" style list, and one or two puns. Label each format.
3. Check each against the constraints and flag any that rely on idiom or wordplay that may not translate for non-native speakers in the room.
4. Pick the three best for this room and say where to use them (opening, slide transition, sign-off).
5. List what you checked and deliberately avoided for this audience.
</task>

<constraints>
- No stereotypes about any group, no jokes about named people, job losses, pay, health, politics or religion (unless the audience is a faith group and the joke is gentle and from within).
- No innuendo or swearing.
- Keep each joke to one to three lines so it can be read aloud quickly.
- Do not claim facts about the organisation you were not told; keep jokes on the general situation.
- Write for adults or mixed-age rooms. If the audience is mainly young children, say that age-graded kids' jokes (silly surprise, knock-knocks) suit them better and keep these very simple.
- If the topic itself is painful for the room (layoffs, a recent death), say humour is risky here and suggest a warmer, non-joke opener instead.
</constraints>

<output_format>
## Jokes
Numbered, each with [format] and, where relevant, [idiom: may not translate].
## Best three for this room
Joke number, where to use it, why.
## Checked and avoided
Short bullets.
</output_format>
