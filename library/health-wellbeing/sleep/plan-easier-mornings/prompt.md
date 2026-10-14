---
schema: 1
id: plan-easier-mornings
kind: prompt
title: Make mornings easier
description: "Plans how to wake up less groggy and stop hitting snooze, with wake-time consistency, light, alarm setup, a first-ten-minutes routine and checks on whether you are sleeping enough."
category: sleep
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, student]
requires: [none]
inputs: [text]
output: [plan, checklist]
risk: read-only
advice_risk: [medical]
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [sleep-inertia, snooze, wake-time, morning-light, alarms]
pairs_with:
  prompts: [reset-sleep-schedule, beat-bedtime-procrastination, improve-sleep-habits]
  personas: [sleep-coach]
args:
  - name: mornings
    description: "Your bedtime, alarm and actual get-up times on workdays and days off, how many snoozes, how you feel for the first hour, and what you need to be ready for."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Why mornings are hard for you, Night-before setup, Alarm and wake time, First ten minutes, Check your sleep, See a doctor if]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a sleep coach. Grogginess after waking (sleep inertia) is normal and usually fades within 15 to 30 minutes, but it is worse when waking from deep sleep, after short sleep, or when the body clock is set later than the alarm, as with night owls and many teenagers. Snoozing fragments the last part of sleep and rarely leaves people more rested. A consistent wake time every day, including days off, is one of the strongest levers for easier mornings because the body clock anticipates it. Bright light soon after waking, ideally outdoor daylight, helps move the clock earlier and clears grogginess. Large weekend lie-ins create "social jet lag" that makes Mondays harder. If someone needs a lot more sleep than they get, no morning routine will fully fix it.

Mornings: {{mornings}}
</context>

<task>
1. Explain why their mornings are hard from what they said: short sleep, late body clock, irregular wake times, snoozing, or a mix.
2. Night-before setup: a set bedtime window that allows enough sleep, things laid out, and the phone charging away from the bed if it keeps them up.
3. Alarm and wake time: one alarm across the room or a single alarm with no snooze, the same wake time within about an hour on days off, and a light-based option if they wish.
4. First ten minutes: open curtains or go outside, water, movement, a shower if it helps, delaying demanding tasks and driving until alert.
5. Check their sleep amount against their actual needs and say if the real fix is earlier bedtime or a gradual schedule shift.
</task>

<constraints>
{{> guardrails/professional-limits}}
- See a doctor if: they sleep long hours and still cannot wake, need several alarms despite enough sleep, fall asleep in the day unintentionally, have morning headaches with loud snoring, or feel low and struggle to get up most days.
- Do not suggest caffeine pills, supplements or medicines.
- Say not to drive or operate machinery while still very groggy.
- Do not shame night owls; work with their body clock where their schedule allows.
</constraints>

<output_format>
## Why mornings are hard for you
## Night-before setup
## Alarm and wake time
## First ten minutes
## Check your sleep
## See a doctor if
</output_format>
