---
schema: 1
id: handle-sideline-abuse
kind: prompt
title: Handle abuse from the sideline
description: Plans how a coach or club handles a parent or spectator abusing a referee, players or coaches - what to do in the moment, when to stop the game, the report and the follow-up.
category: sports
version: 1.0.0
status: incubating
stage: [operate, plan]
role: [individual, operations-manager]
requires: [none]
inputs: [text, notes]
output: [plan, script, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [touchline-behaviour, spectator-abuse, respect-for-officials, de-escalation, club-welfare, youth-sports]
pairs_with:
  prompts: [write-referee-incident-report, plan-team-season]
args:
  - name: incident
    description: What happened or keeps happening - who (by role, such as "a home parent"), what was said or done, to whom, and whether children or a young referee were involved. No names.
    type: text
    required: true
  - name: your_role
    description: Your role, for example "home team coach", "club welfare officer", "league organiser" or "parent volunteer".
    type: string
    required: true
  - name: rules
    description: Any club or league code of conduct, sanctions or reporting process you know of. Optional.
    type: text
output_contract:
  format: markdown
  sections: [How serious is this, In the moment, Words to use, After the match, Stopping it happening again]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help coaches, welfare officers and organisers deal with abusive behaviour from parents and spectators. Sideline abuse is a main reason young referees quit and children drop out. What works in the moment: one calm designated adult, usually not the coach in the middle of a game, approaches the person privately, names the behaviour briefly and states the expectation; the referee has authority to stop or abandon a game, and the coach supports that decision. Arguing back, shouting across the pitch or physical contact makes it worse. Afterwards, what happened must be written down promptly and factually and passed to the club or league through its process, especially when a child or a young official was targeted, because that can be a safeguarding matter.

Incident:
{{incident}}

My role: {{your_role}}
{{#rules}}

Known rules and process:
{{rules}}
{{/rules}}
</context>

<task>
1. Judge how serious it is: low-level (moaning, coaching from the sideline), abusive (insults, aggressive shouting, intimidation of an official or child), or dangerous (threats, discriminatory abuse, violence). Say which and why.
2. In the moment: who should step in, what they do and do not do, when to ask the referee to pause, when the coach should take the team off, and when to call security or emergency services.
3. Words to use: short, calm lines for approaching the person, for supporting the referee, and for talking to players afterwards, especially children who heard it.
4. After the match: what to write down (time, words used, witnesses, who was affected) and who to tell under the club or league process, including the welfare or safeguarding lead if a child or young official was involved.
5. Stopping it happening again: a respect message to all parents, a designated spectator area or marshal, a code of conduct to sign, staged sanctions, and support for the referee.
</task>

<constraints>
- Safety first: never advise physical intervention; if anyone is at risk, the answer is to stop the game and call emergency services.
- Keep reports factual and free of opinion or exaggeration.
- Do not advise naming or shaming the person publicly, including on social media or in group chats.
- Treat discriminatory abuse and threats as serious and reportable whatever the club's culture.
- Processes and sanctions differ by league and country; say what to check rather than inventing specific rules.
</constraints>

<output_format>
## How serious is this
## In the moment
Numbered steps.
## Words to use
## After the match
## Stopping it happening again
</output_format>
