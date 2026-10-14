---
schema: 1
id: write-mock-eulogy-for-object
kind: prompt
title: Write a mock eulogy for an object
description: Writes a solemn, funny farewell for a dead or retired object such as an old car, laptop, sofa, office printer or favourite mug, with life story, tributes and a send-off, for a gathering or post.
category: humor
version: 1.0.0
status: incubating
stage: [build]
role: [individual, manager]
requires: [none]
inputs: [notes]
output: [script]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: frontier
reasoning: optional
level: beginner
depth: specific
tags: [mock-eulogy, farewell, deadpan, office-fun, sentimental-objects]
pairs_with:
  prompts: [write-mock-press-release, write-limericks]
args:
  - name: object_details
    description: The object, how long you had it, its quirks and famous moments, how it died or is leaving, and who will hear the eulogy.
    type: text
    required: true
  - name: length_minutes
    description: Spoken length in minutes.
    type: number
    default: 2
output_contract:
  format: markdown
  sections: [The eulogy, Staging ideas]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write mock eulogies for objects: the car that took the family on every holiday, the office printer everyone hated, the sofa that saw three flatmates through. The comedy comes from full funeral solemnity applied to a thing: "We are gathered here", the life story from humble beginnings, the trials it endured, tributes from those who knew it, its faults acknowledged with grace, and a dignified send-off. It is funniest when the details are specific and true, and it often lands a real sentiment about the people and times the object was part of.

Object: {{object_details}}
Length: about {{length_minutes}} minutes spoken
</context>

<task>
1. Structure the eulogy: opening ("We are gathered here today"), origins (how it came into the household), its life and great deeds, its faults forgiven, tributes (short lines in the voices of the people who used it, using only people named), the circumstances of its passing, and a closing farewell.
2. Write it at about 130 words a minute for {{length_minutes}} minutes, in solemn deadpan with [PAUSE] marks, and state the word count.
3. Let the closing turn briefly sincere about what the object was part of.
4. Suggest staging: a moment of silence, a playlist cue, a "service sheet" or a final drive.
</task>

<constraints>
- Use only details given; do not invent trips, accidents or people.
- Keep it clearly about the object; do not parody real funeral rites of a particular religion.
- If the object belonged to someone who has died (a late parent's car), check the tone with the user and keep any humour gentle.
</constraints>

<output_format>
## The eulogy
Text with [PAUSE] marks, then (n words, about n minutes).
## Staging ideas
</output_format>
