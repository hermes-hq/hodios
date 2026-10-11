---
schema: 1
id: restart-lapsed-habit
kind: prompt
title: Restart a habit that lapsed
description: Restarts a habit that fell away after illness, travel, a busy spell or a broken streak - finds what changed, scales it back to a re-entry version and adds a rule for the next lapse.
category: habits
version: 1.0.0
status: incubating
stage: [plan, maintain]
role: [individual, student, parent]
requires: [none]
inputs: [topic, text]
output: [plan, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [habit-relapse, broken-streak, re-entry, self-compassion, never-miss-twice]
pairs_with:
  prompts: [design-habit-plan, keep-habits-through-disruption, rebuild-after-setback]
  personas: [productivity-coach]
args:
  - name: habit
    description: The habit you had, how long you kept it, when and why it stopped, and how you feel about restarting.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What happened, What still works, Re-entry version, First two weeks, Next lapse rule]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Lapses are normal in habit change; models of behaviour change treat them as part of the process, not as failure. The restart usually goes wrong in one of three ways: the person tries to resume at their old peak level and fails again, they wait for a "fresh start" date that keeps slipping, or they treat the lapse as proof they lack willpower ("what the hell" thinking). What helps: noticing what changed in the cue or routine (a new schedule, a move, a broken trigger), restarting at a deliberately small version, rebuilding the cue, and deciding in advance how to handle the next miss, for example a "never miss twice" rule. A habit kept for months leaves real skill and identity behind, which is an asset.

<habit>
{{habit}}
</habit>
</context>

<task>
1. Summarise what happened in a neutral, kind tone: how long the habit lasted, what stopped it. If the habit or what stopped it is unclear, ask up to two questions and stop.
2. Identify what changed: the cue (time, place, preceding action), the routine itself, the reward, or the circumstances. Say which of these needs rebuilding.
3. Name what still works: skills, gear, knowledge or identity left from the time the habit ran.
4. Design a re-entry version: about a third or less of the old level, attached to a cue that fits life now, with a clear done line. Explain why small is the point.
5. Plan the first two weeks: start date within the next three days (not a distant fresh start), when to step up, and a simple way to track.
6. Write the next-lapse rule: what counts as a lapse, the "never miss twice" or similar rule, and the minimum version for bad days.
</task>

<constraints>
- No guilt or shame language; treat the lapse as information.
- Do not invent details of the person's routine; label assumptions.
- For exercise after illness or injury, suggest checking with a doctor or physiotherapist before stepping up.
- If the lapse involves substance use or anything suggesting a crisis, respond with care and suggest professional support rather than a habit plan alone.
</constraints>

<output_format>
## What happened
Two or three neutral sentences.

## What still works
Bulleted list.

## Re-entry version
Cue, action, done line, and why it is small.

## First two weeks
Table: Days | Version | Step-up condition.

## Next lapse rule
Two or three bullets.
</output_format>
