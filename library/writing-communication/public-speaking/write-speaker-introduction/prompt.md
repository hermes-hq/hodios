---
schema: 1
id: write-speaker-introduction
kind: prompt
title: Write a speaker introduction
description: Writes a one-minute introduction for a speaker from their bio, built around why this audience should listen now, with name pronunciation and facts to check with the speaker.
category: public-speaking
version: 1.0.0
status: incubating
stage: [build]
role: [individual, manager, teacher, executive]
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
depth: specific
tags: [speaker-introduction, conference, host, speaker-bio]
pairs_with:
  prompts: [write-emcee-script, give-vote-of-thanks, write-opening-or-closing-remarks]
args:
  - name: bio
    description: The speaker's bio, as supplied by them or the organiser, plus anything you know personally that they are happy to have shared.
    type: text
    required: true
  - name: talk
    description: The talk title or topic and the audience, for example "'Fixing hospital discharge' to 120 ward managers", "after-dinner talk at the rotary club".
    type: string
    required: true
  - name: seconds
    description: Target length in seconds. 45 to 90 is normal.
    type: number
    default: 60
output_contract:
  format: markdown
  sections: [Introduction, Length, Check with the speaker]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An introduction has one job: make the audience want to hear this person on this topic, then get out of the way. Reading the full bio aloud does the opposite; a list of degrees, titles and awards in a monotone is the most common way introductions fail. Strong introductions answer three questions in under a minute: why this topic matters to this audience, why this person is the one to talk about it (two or three credentials that bear on the topic, not all of them), and one human detail that makes them a person. They end with the speaker's name and the talk title said clearly, and a cue for applause, and they never steal the speaker's material, reveal their punchline or set expectations the speaker then has to live down ("the funniest person you'll ever hear"). Mispronouncing the speaker's name, or using an outdated title, is the mistake speakers remember.
</context>

<task>
Write an introduction for a speaker. Talk and audience: {{talk}}. Target: {{seconds}} seconds.
<bio>
{{bio}}
</bio>

1. If the bio is missing the speaker's name or anything connecting them to the topic, ask for it and stop.
2. Pick the two or three credentials or experiences from the bio that make this person credible on this topic for this audience. Leave out the rest.
3. Find one human detail in the bio (where they are from, an unusual path, something they do outside work) if there is one; skip it if there is none rather than invent one.
4. Structure: a line on why the topic matters to this room; the chosen credentials, said as what they did rather than a list of titles; the human detail; "Please welcome [name], with [talk title]" and a cue for applause.
5. Keep to about 2.2 words per second of the target and write it to be spoken, with the name at the end so the speaker walks up to applause.
</task>

<constraints>
- Use only facts in the bio. Never inflate titles, add awards, or invent a personal detail.
- Do not summarise or pre-empt the talk's content or punchline.
- No hype the speaker has to live up to ("you are in for the talk of your life").
- Use the speaker's name and pronouns as given; flag any you cannot be sure how to pronounce.
</constraints>

<output_format>
## Introduction
The text, ending with the name, talk title and applause cue.
## Length
"N words, about S seconds".
## Check with the speaker
Name pronunciation (with a phonetic placeholder to fill), current title, any fact from an older bio, and whether the human detail is okay to share.
</output_format>
