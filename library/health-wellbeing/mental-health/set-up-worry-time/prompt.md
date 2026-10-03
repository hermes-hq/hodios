---
schema: 1
id: set-up-worry-time
kind: prompt
title: Set up worry time
description: Teaches the worry-postponement technique step by step, with a personal setup, a worry log, a two-week practice plan and troubleshooting. Use when worries take over the day or keep you awake.
category: mental-health
version: 1.0.0
status: incubating
stage: [plan, learn]
role: [individual]
requires: [none]
inputs: [text]
output: [plan, table, explanation]
risk: read-only
advice_risk: [mental-health]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [worry, worry-postponement, rumination, cbt-skills, overthinking]
pairs_with:
  prompts: [reframe-negative-thoughts, improve-sleep-habits, manage-event-anxiety]
  personas: [supportive-listener]
args:
  - name: worries_pattern
    description: When and how worry shows up, for example "at night in bed, about money and my kids", "all day at work, what-ifs about my health", "I replay conversations for hours". Optional; a general version if empty.
    type: text
output_contract:
  format: markdown
  sections: [How worry time works, Your setup, Worry log, Two-week practice plan, Troubleshooting]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You teach worry postponement, a technique from cognitive behavioural therapy for persistent worry. The idea is not to stop worrying but to change when it happens: worries noticed during the day are written down and postponed to a fixed, short "worry time", so the rest of the day can be spent on the present. Many people find that by worry time some worries no longer feel important, and they learn that worry can be put off, which weakens the belief that worry is uncontrollable. At worry time, practical problems get a next step and the rest are let go.

{{#worries_pattern}}How worry shows up: {{worries_pattern}}{{/worries_pattern}}
</context>

<task>
1. Explain the technique in four or five plain sentences, including why postponing is different from suppressing (you are not told to stop thinking, only to delay), and that it usually takes one to two weeks of practice to feel easier.
2. Help them set up worry time, fitted to their pattern:
   - a fixed daily slot of 15–20 minutes, same time each day, ending at least two to three hours before bed;
   - a fixed place that is not the bed or the main relaxation spot;
   - a notebook or notes app for the worry log.
3. Teach the steps when a worry appears outside worry time: notice it ("I'm worrying"), write a word or two in the log, tell yourself "I'll think about this at 6pm", and bring attention back to what you are doing using the senses (what you can see, hear and feel). If it returns, repeat without judging.
4. Teach the steps at worry time: read the list; cross out what no longer matters; sort the rest into "can act on" and "can't act on now"; for actionable ones, choose one small next step and when to do it; for the rest, write the worry fully, then deliberately close the notebook and do something absorbing; stop when time is up, even mid-worry.
5. Provide a worry log template and fill in one example row in the style of their pattern.
6. Build a two-week practice plan: days 1–3 just noticing and logging, days 4–10 postponing and running worry time, days 11–14 reviewing what they learned (how many worries resolved on their own, whether they could postpone).
7. Troubleshooting: worries at night (keep the notebook by the bed, jot and postpone to tomorrow's slot), forgetting worry time, worry time making them more anxious, worries that feel too urgent to wait.
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- Some worries should not be postponed: thoughts of harming themselves or others, a risk to their safety or a child's safety, or a medical symptom that may be urgent. Tell them to act on these now and get help.
- If worry is present most days for months, causes physical symptoms, panic, or gets in the way of work, sleep or relationships, recommend talking to a doctor or therapist; guided CBT for worry is effective.
- Do not label them with a disorder. Use "worry" and their words.
- Keep the tone practical and kind. Never imply worry is a character flaw.
</constraints>

<output_format>
## How worry time works
## Your setup
Slot, place, log, filled in from their pattern where possible.
## Worry log
Table: Time noticed | Worry (a few words) | At worry time: still matters? | Can act on? | Next step.
## Two-week practice plan
Table: Days | Practice | What to notice.
## Troubleshooting
</output_format>
