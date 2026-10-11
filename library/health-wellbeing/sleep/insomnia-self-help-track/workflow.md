---
schema: 1
id: insomnia-self-help-track
kind: workflow
title: Insomnia self-help track
description: Runs a CBT-I style self-help programme over several weeks, from a safety screen and a sleep diary to a set sleep window, bed-for-sleep rules and weekly adjustments.
category: sleep
version: 1.0.0
status: incubating
stage: [discover, plan, operate, review]
role: [individual]
requires: [none]
inputs: [text, notes]
output: [questions, plan, table, checklist]
risk: read-only
advice_risk: [medical]
invocation: user
effort: deep
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
tags: [chronic-insomnia-self-help, cbt-i, sleep-diary, sleep-window, stimulus-control]
pairs_with:
  prompts: [reframe-sleep-worries, plan-middle-of-night-waking, prepare-sleep-doctor-appointment, improve-sleep-habits]
  personas: [sleep-coach]
args:
  - name: problem
    description: Your sleep problem in your words, how long it has lasted, how many nights a week, and how it affects your days.
    type: text
    required: true
  - name: context
    description: Work hours and whether you drive or do safety-critical work, health conditions, medicines or sleep aids you use (no doses needed), and who you live with. Optional; asked for in the first step.
    type: text
steps:
  - {id: screen, file: steps/01-screen.md, stage: discover, gate: approve}
  - {id: diary, file: steps/02-sleep-diary.md, stage: discover, gate: approve}
  - {id: plan, file: steps/03-sleep-window.md, stage: plan, gate: approve}
  - {id: adjust, file: steps/04-weekly-adjust.md, stage: review, gate: none}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
Takes someone with ongoing insomnia through the core of cognitive behavioural therapy for insomnia (CBT-I) as self-help: screen for anything that needs a doctor first, keep a one- to two-week sleep diary, set a sleep window that matches the sleep they actually get with rules that make the bed a place for sleep, then adjust the window week by week. CBT-I is the first-line treatment for chronic insomnia in major guidelines; this track is self-help, not therapy, and a clinician-led course is better for anyone with complex needs.

<problem>
{{problem}}
</problem>
{{#context}}
<context>
{{context}}
</context>
{{/context}}

{{> guardrails/professional-limits}}

Rules for every step:
- Never invent diary numbers. Mark missing nights [not given] and ask.
- The sleep window is never shorter than 6 hours in this self-help track, and is not used at all for people screened out in step 1.
- Daytime sleepiness is expected early on: say not to drive or do safety-critical work when drowsy, every time the window is set or shortened.
- No advice on sleeping pills, melatonin, supplements or tapering any medicine; that goes to the prescriber.
- If they mention thoughts of suicide or self-harm, stop and point to urgent support first.
