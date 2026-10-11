---
schema: 1
id: prepare-sleep-doctor-appointment
kind: prompt
title: Prepare for a doctor's appointment about sleep
description: Turns your sleep diary, symptoms and a partner's observations into a one-page summary and questions for a doctor. Use before an appointment about a sleep problem.
category: sleep
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [notes, text]
output: [summary, questions, checklist]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [appointment-prep, sleep-diary, snoring, daytime-sleepiness, cbt-i, patient-questions]
pairs_with:
  prompts: [improve-sleep-habits, get-used-to-cpap]
  personas: [sleep-coach]
args:
  - name: sleep_story
    description: What is wrong, since when, how it affects your day, your usual sleep times, what you have tried, and anything a bed partner has noticed (snoring, stopping breathing, kicking, talking, acting out dreams).
    type: text
    required: true
  - name: health_background
    description: Medicines and supplements, other conditions, caffeine and alcohol, work pattern, and anything else you want the doctor to know. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Urgent first, One-page summary, What to bring, Questions to ask, What to expect]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people prepare to talk to a doctor about sleep, without diagnosing. Short appointments go better when the patient opens with the main problem, how long it has lasted and how it affects the day, then gives numbers from a sleep diary (one to two weeks of bedtimes, time to fall asleep, wakings, wake time), a description of daytime sleepiness in concrete situations (dozing while reading, watching TV, as a passenger, in traffic), and what a bed partner has seen. Doctors commonly ask about snoring and breathing pauses, restless legs, unusual events at night, mood, medicines, alcohol and caffeine, and shift work. Many people with long-standing insomnia do not know that cognitive behavioural therapy for insomnia (CBT-I) is a recognised first treatment and that they can ask about it.

Sleep story: {{sleep_story}}
{{#health_background}}Background: {{health_background}}{{/health_background}}
</context>

<task>
1. Urgent first: if anything in the constraints' urgent list applies, say it first and plainly.
2. One-page summary: the main problem in one sentence; when it started and what changed; typical night (diary averages if given, else estimates marked "approx."); daytime effects in concrete situations; partner's observations; what they have tried and the result; medicines, caffeine, alcohol and work pattern. Use their words; do not translate them into diagnoses.
3. What to bring: the summary, a sleep diary (with a template if they have none: two weeks if time allows), a list of medicines and supplements, a partner's description or a short phone audio recording of snoring if they have one, and their questions.
4. Questions to ask: five to eight, chosen for their story, for example what could be causing this, whether a sleep study is needed, whether a referral for CBT-I is possible, whether any current medicine could affect sleep, what to do about driving in the meantime, and what to try while waiting.
5. What to expect: in general terms, the doctor may ask questions and use questionnaires, examine them, and may refer to a sleep service; waiting times and what tests are offered differ by country and health system.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not suggest a diagnosis or name a likely disorder as what they have. You may list the topics the doctor will want to ask about.
- Urgent list: falling asleep while driving or at work; breathing pauses with choking and severe sleepiness; sudden collapse or muscle weakness with strong emotion; chest pain or breathlessness at night; harming themselves or others during sleep; thoughts of suicide. For driving, advise not to drive until assessed; for danger, local emergency services.
- No advice on medicines, doses, or stopping or changing anything prescribed.
- Do not reproduce copyrighted questionnaires; describe the kinds of situations instead.
- Keep the summary to what they told you.
</constraints>

<output_format>
## Urgent first
Omit if nothing applies.
## One-page summary
## What to bring
A checklist, plus a diary template table if needed.
## Questions to ask
Numbered.
## What to expect
</output_format>
