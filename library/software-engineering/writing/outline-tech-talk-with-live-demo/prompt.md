---
schema: 1
id: outline-tech-talk-with-live-demo
kind: prompt
title: Outline a tech talk with a live demo
description: Outlines a conference or meetup talk built around a live demo, with the one idea, a timed structure, a demo script with checkpoints, slides versus editor, a recorded fallback and a failure plan.
category: writing
version: 1.0.0
status: incubating
stage: [plan, design]
role: [software-engineer, developer-advocate, maintainer]
stack: []
requires: [none]
inputs: [topic, notes, text]
output: [outline, script, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [live-coding, conference-talk, meetup, demo-script, demo-fallback]
pairs_with:
  prompts: [write-conference-talk-proposal, drill-presentation-qa]
  personas: [developer-advocate]
args:
  - name: topic
    description: What the talk is about, what you want to demo (the code, tool or system), the audience and event, and anything you already have (a repo, a blog post, an accepted abstract).
    type: text
    required: true
  - name: length_minutes
    description: Slot length in minutes including questions.
    type: number
    default: 25
  - name: demo_risk
    description: What could fail live, for example "needs internet and a cloud account", "GPU model takes 40 seconds to load", "conference wifi".
    type: text
output_contract:
  format: markdown
  sections: [The one idea, Timed outline, Demo script, Slides versus editor, Failure plan, Rehearsal checklist]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A live demo is the most memorable part of a technical talk and the most likely to fail. Demo talks go wrong when the demo is a tour of features instead of proof of one idea, when typing eats the time budget, when the audience cannot read the screen, when the demo depends on wifi or an account with rate limits, and when the speaker has no plan for the moment it breaks. The slot is {{length_minutes}} minutes.
</context>

<task>
<topic>
{{topic}}
</topic>
{{#demo_risk}}
<demo_risk>
{{demo_risk}}
</demo_risk>
{{/demo_risk}}

1. Write the one idea: a single sentence the audience should repeat afterwards, and what they will be able to do or believe that they could not before. Cut anything that does not serve it.
2. Build a timed outline that fits the slot with about 10% slack and time for questions if the slot includes them: hook (the problem, shown not described), the idea, the demo in two to four acts, recap, call to action. Give minutes per section and a running clock.
3. Write the demo script, act by act: starting state (branch, terminal, open files, data loaded), each action, what the audience should see, the line you say while it runs, and a checkpoint (a git tag, a saved file or a prepared terminal) you can jump to if a step fails. Prefer pasting prepared snippets or using an editor snippet over typing anything longer than a line; never type secrets on screen.
4. Decide what goes on slides versus in the editor or terminal: slides for the problem, diagrams and the recap; live for the moment of proof. Specify font size (at least 20pt in the editor, larger terminal font, high-contrast theme), a clean desktop, notifications off and a separate presenter profile.
5. Write the failure plan: for each risk, the symptom, the 30-second recovery (jump to checkpoint, switch to the recorded fallback, use cached responses), and the line you say so the audience stays with you. Include a full screen recording of the demo as a fallback and when to switch to it (a failure that will not resolve in 30 seconds).
6. Write a rehearsal checklist: full run-throughs with a timer, a run on the venue setup or the projector resolution, an offline run, and what to set up 30 minutes before.
</task>

<constraints>
- Fit the slot: if the topic needs more time than the slot allows, say what to cut instead of compressing everything.
- Do not invent product features or commands; use what the topic describes and mark guesses as [X].
- Keep the demo deterministic: fixed data, pinned versions, no dependence on live third-party services unless there is a cached fallback.
- If the audience or event is missing, assume a mixed-level developer meetup and say so.
</constraints>

<output_format>
## The one idea
One sentence, plus one line on the audience takeaway.
## Timed outline
Table: section, minutes, running clock, what happens.
## Demo script
Per act: starting state, steps (action, what they see, what you say), checkpoint.
## Slides versus editor
Two short lists, then setup settings.
## Failure plan
Table: risk, symptom, recovery, line to say.
## Rehearsal checklist
Checkbox list.
</output_format>
