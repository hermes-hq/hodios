---
schema: 1
id: prepare-to-reduce-sleeping-pills
kind: prompt
title: Prepare to cut down sleeping pills
description: "Prepares you to talk to your prescriber about reducing or stopping prescribed sleeping pills, with a sleep diary, your reasons, questions to ask and CBT-I supports to start now."
category: sleep
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [text]
output: [plan, questions, checklist]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [sleeping-pills, tapering, rebound-insomnia, prescriber-conversation, sleep-diary, cbt-i]
pairs_with:
  prompts: [prepare-sleep-doctor-appointment, reframe-sleep-worries, plan-middle-of-night-waking]
  personas: [sleep-coach]
args:
  - name: medicine
    description: "The sleeping medicine you take (name if you know it), how long you have taken it, and whether you take it every night or only some nights. You do not need to give the dose."
    type: text
    required: true
  - name: reasons
    description: "Why you want to cut down, such as morning grogginess, worry about dependence, a fall, pregnancy plans, or it no longer working."
    type: text
    required: true
  - name: sleep_now
    description: "How you sleep now with the medicine, and what happens on nights without it, if there are any."
    type: text
    required: false
output_contract:
  format: markdown
  sections: [Do not stop suddenly, Your reasons and goal, Two-week sleep diary, Questions for your prescriber, Supports to start now, What to expect while cutting down]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people get ready for a conversation with the person who prescribes their sleeping medicine. Most people who take sleeping pills for months can reduce or stop them, and doing it gradually with the prescriber is safer and more likely to stick than stopping on their own. After regular use, stopping suddenly often brings rebound insomnia for a few nights, which people misread as proof they "cannot sleep without it". With benzodiazepines and the related "z-drugs", sudden stopping after long or high use can cause withdrawal effects that need medical oversight, so a taper is planned by the prescriber, who also knows about sedating antidepressants or other medicines used for sleep. Starting CBT-I routines before and during a taper (a regular wake time, a sleep window matched to actual sleep, leaving the bed when wide awake, handling sleep worries) improves the chance of success. A sleep diary gives the prescriber real numbers rather than impressions. Older adults have strong reasons to reduce: falls, confusion and next-day impairment, including when driving.

Medicine: {{medicine}}
Reasons: {{reasons}}
{{#sleep_now}}Sleep now: {{sleep_now}}{{/sleep_now}}
</context>

<task>
1. Say clearly, first, not to stop or change the medicine without the prescriber, and why (rebound insomnia, and withdrawal risk with some medicines).
2. Turn their reasons into a short statement they can say at the appointment, with a realistic goal (fewer nights, a lower dose, or stopping) for the prescriber to shape.
3. Give a two-week sleep diary template to fill before the appointment: bedtime, time to fall asleep, wakings, final wake, time out of bed, medicine taken (yes or no), alcohol and caffeine, how they felt the next day.
4. Write questions for the prescriber, tailored to their medicine and reasons: what a gradual plan would look like, what withdrawal or rebound to expect, what to do on a bad night, whether CBT-I or a referral is available, review points, and who to contact if it goes badly.
5. Suggest CBT-I supports they can start now that do not involve changing the medicine: a fixed wake time, getting up when wide awake, a wind-down, and handling sleep worries.
6. Explain what to expect: some worse nights are common and usually pass; how to treat a bad night without going back to full use; when to call the prescriber.
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- Never write a taper schedule, dose reductions, percentages or timelines. The prescriber sets those.
- If they have already stopped suddenly and have shaking, confusion, seeing or hearing things, a fast heartbeat, or a seizure, say to get urgent medical help now.
- If they want to stop without telling their prescriber, explain the risks plainly and encourage them to talk to the prescriber or a pharmacist; still offer the diary and CBT-I supports.
- Do not set a strict sleep window or sleep restriction schedule. Say that shortening time in bed is best planned with the prescriber or a CBT-I clinician, especially if they drive or do safety-critical work, or have epilepsy or bipolar disorder.
- Do not suggest swapping to over-the-counter aids, alcohol or cannabis to replace the medicine.
- Do not judge them for taking the medicine.
</constraints>

<output_format>
## Do not stop suddenly
## Your reasons and goal
## Two-week sleep diary
Table: Day | Bed | Asleep after | Wakings | Final wake | Out of bed | Medicine taken | Alcohol and caffeine | Next day.
## Questions for your prescriber
## Supports to start now
## What to expect while cutting down
</output_format>
