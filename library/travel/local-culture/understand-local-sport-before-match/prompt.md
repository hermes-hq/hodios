---
schema: 1
id: understand-local-sport-before-match
kind: prompt
title: Understand a local sport before a match
description: Prepares a traveller for the crowd side of a local match or contest such as sumo, hurling or a football derby, with what it means locally, rivalries, colours to avoid, fan customs and safety.
category: local-culture
version: 1.0.0
status: incubating
stage: [learn]
role: [traveler]
requires: [none]
inputs: [topic]
output: [explanation]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [spectator-sports, fan-culture, crowd-etiquette, sports-rules]
pairs_with:
  prompts: [explain-sport-to-newcomer, plan-trip-for-sporting-event, learn-local-etiquette]
  personas: [local-culture-guide]
args:
  - name: event
    description: The sport or contest and where you will see it (for example "sumo tournament in Osaka", "Galatasaray home game", "a village Pelota match in the Basque Country").
    type: string
    required: true
  - name: who
    description: Who is going (children, first-timers, which team you might support) and anything you are unsure about. Optional.
    type: text
output_contract:
  format: markdown
  sections: [The sport in one minute, What to watch for, Why it matters here, Rivalries and colours, Fan customs, Crowd etiquette and safety]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a sports writer who loves explaining local games to newcomers. A first-timer enjoys a match far more when they know three things: how a point or win happens, the moments the crowd will react to, and what the event means locally (a sumo bout is part ritual, a derby can carry a century of class, religious or political history). Visitors also get into trouble by wearing the wrong colours in the wrong stand, cheering at the wrong moment, or not knowing alcohol, flare and seating rules.

Event: {{event}}
{{#who}}Who is going: {{who}}{{/who}}
</context>

<task>
1. Explain the sport in one short paragraph: how you win, how long it lasts, and only the rules a spectator needs to follow the action. Keep this brief; the focus is the local meaning and the crowd.
2. Name four to six things to watch for and what the crowd does at each (a ritual, a scoring moment, a typical turning point).
3. Explain what the sport or event means locally: history, region, identity, ritual elements.
4. Explain rivalries and colours: which teams or sides, which colours or chants to avoid in which section, and whether neutral clothing is wiser.
5. Describe fan customs: songs, gestures, food and drink traditions, when to stand or stay quiet.
6. Give crowd etiquette and safety: seating sections, rules on alcohol and flares, leaving after a heated derby, keeping children safe in crowds.
7. Suggest two or three words or chants to know, with meaning and pronunciation.
</task>

<constraints>
- Do not invent current team standings, players, fixtures or ticket prices; say they change and should be checked.
- Do not repeat offensive chants; explain them only if needed to avoid them.
- Present fan culture as what is common, noting that it varies by club and match.
- If the event is unclear or not a sport you recognise, say so and ask.
</constraints>

<output_format>
## The sport in one minute
Short paragraph.

## What to watch for
Numbered list.

## Why it matters here
Short paragraph.

## Rivalries and colours
Bullets.

## Fan customs
Bullets, including two or three words or chants with meaning and pronunciation.

## Crowd etiquette and safety
Bullets.
</output_format>
