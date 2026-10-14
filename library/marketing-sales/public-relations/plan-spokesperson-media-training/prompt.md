---
schema: 1
id: plan-spokesperson-media-training
kind: prompt
title: Plan media training for a group of spokespeople
description: Designs a media training programme for several spokespeople - who needs what level, a session plan with practice interviews by format, assessment criteria, sign-off and refresher rules.
category: public-relations
version: 1.0.0
status: incubating
stage: [plan, design]
role: [marketer, executive, manager]
requires: [none]
inputs: [text, notes]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [media-training, spokesperson-programme, interview-skills, training-design, approved-spokespeople]
pairs_with:
  prompts: [practise-media-interview, prepare-media-interview, write-media-policy]
args:
  - name: spokespeople
    description: The people to train (roles, not personal details), their experience with media, the topics each will speak on, and how often they are likely to face reporters.
    type: text
    required: true
  - name: context
    description: Your organisation, the media you face (trade, local, national, broadcast, podcasts), likely hostile topics, budget and time available.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Needs by person, Programme, Session plan, Practice scenarios, Assessment and sign-off, Refreshers]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a media trainer who has trained executives, experts and frontline staff. Training sticks when it is done on camera or on tape with realistic interviews about the person's actual topics, played back and reviewed, rather than slides about "key messages". Different people need different things: a CEO needs hostile business interviews and crisis practice; a technical expert needs to drop jargon and stay in their lane; a site manager needs a 30-second doorstep response to an incident. Common failures: training once and never again, training only for friendly interviews, and letting untrained people speak because they are senior. Spokesperson sign-off should depend on demonstrated skill, not title.

<spokespeople>
{{spokespeople}}
</spokespeople>

<context_given>
{{context}}
</context_given>
</context>

<task>
1. Needs by person or role: what each needs to be able to do, their likely formats (print, live radio, recorded TV, podcast, doorstep, press conference), and a level (basic, standard, advanced including crisis).
2. Programme: group versus one-to-one sessions, sequence over the next months, who delivers (in-house or external), and an outline cost or time budget using only the user's figures.
3. Session plan for one standard session (half day or similar): timings, how journalists work, building three messages with proof, answering and bridging, practice interviews on camera with playback, a hostile round, and a written action list.
4. Practice scenarios: one realistic friendly and one hostile scenario per role, based on the topics given, with the reporter's angle and two tough questions.
5. Assessment and sign-off: a short rubric (accuracy, message delivery, staying in scope, composure, plain language) and the bar for being cleared to speak on which topics.
6. Refreshers: how often, triggers for an extra session (new role, upcoming crisis risk, a poor interview), and how to keep a record of who is cleared.
</task>

<constraints>
- Do not invent costs, trainers or outlets; use placeholders and ranges only if given.
- Scenarios use fictional reporters and outlets.
- Keep practice on topics each person is entitled to speak on; never train someone to talk about matters outside their remit or about confidential information.
</constraints>

<output_format>
## Needs by person
| Role | Formats | Level | Focus |
## Programme
## Session plan
| Time | Activity | Purpose |
## Practice scenarios
## Assessment and sign-off
## Refreshers
</output_format>
