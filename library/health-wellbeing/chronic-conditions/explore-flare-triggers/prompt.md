---
schema: 1
id: explore-flare-triggers
kind: prompt
title: Explore possible flare triggers
description: Looks for possible patterns between logged symptoms and factors such as sleep, activity, food or stress, with honest limits, and plans one-at-a-time checks to discuss with a clinician.
category: chronic-conditions
version: 1.0.0
status: incubating
stage: [review]
role: [individual]
requires: [none]
inputs: [notes, dataset, text]
output: [table, summary, questions]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [flare-triggers, symptom-diary, pattern-finding, correlation, self-tracking, migraine]
pairs_with:
  prompts: [build-symptom-log, plan-flare-day-logistics, prepare-doctor-questions]
args:
  - name: log
    description: Your symptom and daily log for at least a few weeks, pasted as text or a table (dates, symptom scores, sleep, activity, foods, stress, menstrual cycle, weather, anything you track). Remove names.
    type: text
    required: true
  - name: condition
    description: Your diagnosed condition and any triggers your care team has already identified or asked you to watch for. Optional.
    type: text
output_contract:
  format: markdown
  sections: [What the log can and cannot show, Possible patterns, What else could explain them, Careful checks, Questions for your care team]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people read their own symptom diaries without fooling themselves. People with conditions such as migraine, IBS, eczema, asthma, arthritis and fibromyalgia often search for triggers, and diaries can reveal useful patterns. They also mislead easily: a few weeks of data, many things tracked at once, delayed effects (a flare two days after a busy day), things that travel together (poor sleep, stress and takeaway food in the same week), early warning symptoms mistaken for triggers (craving chocolate before a migraine rather than chocolate causing it), and remembering the hits but not the misses. Cutting out foods or activities on weak evidence can shrink a life and, for food, risk nutrition. A good approach counts carefully, shows uncertainty, considers delays, and tests one change at a time for long enough, ideally with the care team's input.

<log>
{{log}}
</log>
{{#condition}}
<condition>
{{condition}}
</condition>
{{/condition}}
</context>

<task>
1. What the log can and cannot show: how many days, gaps, what is tracked consistently, and whether there is enough data. If the log is very short, say so and suggest how to keep tracking.
2. Possible patterns: for each candidate factor, count how often symptoms were worse with and without it, including a lag of one to three days where it makes sense. Show the counts, not just conclusions, and rate each as weak, possible or worth checking.
3. What else could explain them: confounders (things that happen together), reverse direction (early symptoms causing the behaviour), chance with small numbers, and changes in medicines or season.
4. Careful checks: for up to two of the strongest candidates, a plan to test one change at a time for a set period while keeping everything else steady, what to record, and how to judge the result. For any food elimination, say to do it only with a dietitian or doctor, especially for children, anyone underweight or with a history of disordered eating.
5. Questions for your care team: the patterns to show them and what to ask.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never call a factor a proven trigger, diagnose a new condition or allergy, or suggest changing medicines.
- Show your arithmetic; never invent entries or fill gaps in the log.
- If the log contains worrying signs (symptoms getting steadily worse, new symptoms, red flags), say to contact their clinician before looking for triggers.
</constraints>

<output_format>
## What the log can and cannot show
## Possible patterns
Table: Factor | Worse days with it | Worse days without it | Lag | Strength.
## What else could explain them
## Careful checks
## Questions for your care team
</output_format>
