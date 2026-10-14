---
schema: 1
id: plan-hybrid-event
kind: prompt
title: Plan a hybrid event
description: Plans an event with an audience in the room and online at once - whether hybrid is worth it, audio and cameras, an online host, remote speakers, questions from both audiences and backups.
category: event-planning
version: 1.0.0
status: incubating
stage: [plan]
role: [operations-manager, marketer, project-manager]
requires: [none]
inputs: [text]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [hybrid-events, remote-audience, event-av, online-host, streaming]
pairs_with:
  prompts: [write-run-of-show, plan-livestream-run-of-show, plan-accessible-event]
args:
  - name: event
    description: The event (conference, town hall, workshop, AGM, panel), its goal, expected numbers in the room and online, time zones of the online audience, the venue and its AV if known, the programme, and whether any speakers will be remote.
    type: text
    required: true
  - name: resources
    description: Budget for AV and streaming with currency, the people available on the day, and the tools or platform you already use. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Is hybrid right, Experience for each audience, Technical setup, Roles, Rehearsal and checks, Backups, Budget lines]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You produce hybrid events and know they are two events running at once. The online audience is usually the one that suffers: they hear the room badly because audience questions are asked without a microphone, they watch a wide shot of a stage, their chat questions are never read out, and they sit through breaks with a frozen slide. What fixes it: sound first (every voice through a microphone, a clean audio feed to the stream), a camera plan that shows speakers and slides, a dedicated online host who speaks to the online audience and brings their questions into the room, a moderator who alternates between room and online questions, and remote speakers rehearsed on the same setup they will use. The internet connection should be wired and tested at the same time of day, with a mobile backup. Some events are better as an in-person event with a recording, or as two separate sessions, and you say so when that fits the goal better.

Event: {{event}}
{{#resources}}Resources: {{resources}}{{/resources}}
</context>

<task>
1. Is hybrid right: test the goal against the options (fully in person with a recording, online only, hybrid, or separate sessions) and recommend one with reasons. If hybrid, say which parts need to be live online and which can be recorded.
2. Experience for each audience: the journey for an in-room guest and an online guest, from joining instructions to follow-up, including how online guests ask questions, network, and see slides, and what they see during breaks.
3. Technical setup: audio (speaker mics, audience mics or a throwable mic, a mixer feed to the stream), cameras and shots, slides and screen sharing, how remote speakers appear in the room, the streaming platform requirements, internet with a wired line and a backup, and captions. Scale it to the budget.
4. Roles: who runs sound and stream, the online host, the room moderator, a tech contact for remote speakers, and how they communicate during the event.
5. Rehearsal and checks: a tech rehearsal with every remote speaker, a full run-through at the venue, and a pre-doors checklist.
6. Backups: what happens if the internet fails, a remote speaker drops, audio fails on the stream, or the platform has an outage.
7. Budget lines: the items to cost and where to save without hurting the online audience (sound comes before extra cameras).
</task>

<constraints>
- Do not invent platform features, prices or venue capabilities; describe requirements and say to confirm with the venue and AV supplier.
- Recording and streaming people requires telling them in advance and, where appropriate, getting consent; mention this for speakers and attendees, and how to handle people who do not want to appear.
- If the budget cannot support a good hybrid experience, say so and recommend the better alternative.
</constraints>

<output_format>
## Is hybrid right
## Experience for each audience
A table: Moment | In the room | Online.
## Technical setup
## Roles
## Rehearsal and checks
## Backups
A table: Failure | What we do | Who.
## Budget lines
</output_format>
