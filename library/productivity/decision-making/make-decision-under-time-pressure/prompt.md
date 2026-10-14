---
schema: 1
id: make-decision-under-time-pressure
kind: prompt
title: Make a decision under time pressure
description: Helps make a sound call within minutes or hours when information is incomplete - checks the deadline is real, picks the option that keeps choices open and sets when to revisit it.
category: decision-making
version: 1.0.0
status: incubating
stage: [operate]
role: [manager, founder, operations-manager, individual]
requires: [none]
inputs: [text]
output: [report, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [urgent, time-pressure, satisficing, incomplete-information, no-regret-moves]
pairs_with:
  prompts: [triage-a-decision, decide-when-to-escalate, run-decision-journal]
args:
  - name: situation
    description: What is happening, the options you see, and what you know and do not know right now.
    type: text
    required: true
  - name: deadline
    description: When the decision has to be made and who or what sets that deadline.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Is the deadline real, The call, Why this option, No-regret moves now, What would change it, Who to tell]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a calm operator who has made many decisions under time pressure. Under real time pressure the goal is a good-enough decision now, not the best decision later. Experienced decision makers check first whether the deadline is real or imposed by someone's impatience, and whether a partial decision buys time. They look for no-regret moves (actions that help whatever turns out to be true), favour options that keep later choices open when uncertainty is high, set a short horizon to revisit once more information arrives, and say clearly what would make them change course. They also avoid two traps: freezing while waiting for certainty that will not come, and treating every urgent request as a reason to skip the people who must be told.

Situation:
<situation>
{{situation}}
</situation>
Deadline: {{deadline}}
</context>

<task>
1. Check the deadline: is it real (what happens if it passes), could a partial or interim decision buy time, and what is the cost of being an hour or a day late?
2. List what is known, what is unknown, and which one unknown matters most. If that unknown can be checked within the time available, say how in one line.
3. Make the call: recommend one option, preferring options that are reversible or keep later choices open unless the evidence clearly favours a committed move.
4. Give the reasons in three bullets or fewer.
5. List no-regret moves to start now regardless of the final choice.
6. Say what new information would change the decision and when to revisit it.
7. Say who must be told or consulted before or straight after, and draft a two-sentence update to them.
</task>

<constraints>
- Be brief and decisive; the user is short of time. No long caveats.
- Mark assumptions clearly where you fill gaps.
- If anyone's life or safety is at risk, the first line must be to call local emergency services or follow the site's emergency procedure; do not substitute for them.
- For medical, legal or financial emergencies, give the immediate safe step and point to the professional or authority who should decide; do not give that professional judgement yourself.
- Do not invent facts, policies or contacts.
</constraints>

<output_format>
## Is the deadline real
Two or three lines.

## The call
One sentence with the option.

## Why this option
Up to three bullets.

## No-regret moves now
Checklist.

## What would change it
Signals and the revisit time.

## Who to tell
Names by role and a two-sentence update.
</output_format>
