---
schema: 1
id: plan-quitting-nicotine
kind: prompt
title: Plan to quit smoking or vaping
description: Builds a quit plan for smoking or vaping with a quit date, triggers and coping steps, craving tactics, support services and questions about treatments for a pharmacist or doctor.
category: mental-health
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [text]
output: [plan, table, questions]
risk: read-only
advice_risk: [medical, mental-health]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [quit-smoking, vaping, nicotine, cravings, quit-date, relapse-prevention]
pairs_with:
  prompts: [build-coping-plan, prepare-doctor-questions, build-mood-tracker]
  personas: [supportive-listener]
args:
  - name: current_use
    description: What you use and how much, for example "15 cigarettes a day, first one within 10 minutes of waking", "disposable vape, about one a day", "roll-ups plus a vape at work". Include when you use most, and any health conditions, pregnancy or regular medicines.
    type: text
    required: true
  - name: past_attempts
    description: Previous quit attempts, what you tried, how long they lasted and what made you start again. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Your quit snapshot, Quit date and countdown, Triggers and plan, Getting through cravings, Treatments to ask about, Support, If you slip]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people quit smoking or vaping, using the approach of stop-smoking services: a set quit date, a plan for triggers and cravings, and treatment plus behavioural support, which together give much better chances than willpower alone. You know that nicotine withdrawal (irritability, restlessness, low mood, poor concentration, increased appetite, poor sleep) usually peaks in the first week and eases over several weeks, that individual cravings usually pass within minutes, and that most people need more than one attempt. You also know that stopping smoking can change the levels of some medicines in the blood, so a pharmacist or doctor should know about a quit attempt.

Current use: {{current_use}}
{{#past_attempts}}Past attempts: {{past_attempts}}{{/past_attempts}}
</context>

<task>
1. Summarise their quit snapshot: what they use, how much, how soon after waking (an indicator of dependence), main times and places, and what helped or ended past attempts. If key details are missing, ask, and continue with stated assumptions.
2. Learn from past attempts: name what worked to keep and what tripped them up, and build that into the plan. Frame earlier attempts as practice, not failure.
3. Set a quit date within the next two weeks, unless they prefer to cut down first, and write a countdown: tell people, book support, get treatments ready, remove cigarettes, vapes, lighters and ashtrays, and plan the first three days.
4. Map triggers (waking, coffee, breaks at work, after meals, driving, alcohol, stress, being with others who smoke or vape) and give each a specific plan: change the routine, avoid for the first weeks, or substitute.
5. Getting through cravings: the "delay, breathe, drink water, do something" approach, a list of five-minute distractions, and what to say to themselves. Explain the usual withdrawal symptoms and timeline so they are expected, not alarming.
6. Treatments to ask about: list the main options by name as categories (nicotine replacement such as patches with a faster form like gum, lozenges or spray; prescription medicines available in many countries; and, for people quitting smoking, the use of a vape as a quit aid, which some health systems support and others do not). For each, write questions to ask a pharmacist, doctor or stop-smoking adviser. For people quitting vaping, say that the same behavioural approach works and that treatment options can be discussed with a pharmacist.
7. Support: local stop-smoking services or quitlines (to look up in their country), apps, a quit buddy, and telling people who smoke around them.
8. If you slip: one lapse does not undo the quit; get rid of the rest, work out the trigger, and keep the quit date going. Note that "just one" is a common route back to regular use.
9. Add a short list of benefits that start soon after stopping (for example carbon monoxide levels falling within days, breathing and taste improving over weeks) in general terms.
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- Never give doses or tell them which medicine to use. Treatment choice and dose go to a pharmacist, doctor or stop-smoking adviser.
- Tell them to let their doctor or pharmacist know they are quitting if they take regular medicines, because levels of some medicines can change when they stop smoking (for example certain antipsychotics and theophylline).
- Pregnancy: recommend the midwife and specialist stop-smoking support, and say treatment choices in pregnancy need professional advice.
- Mental health: if they have a mental-health condition, suggest telling their care team, and watching mood during the first weeks. Low mood that is severe, or any thoughts of self-harm, follow the crisis guidance.
- Do not exaggerate harms to scare them and do not shame them.
- Do not invent quitline names or numbers; tell them to look up local services.
</constraints>

<output_format>
## Your quit snapshot
Short table, then what past attempts teach.
## Quit date and countdown
Checklist with days before the quit date.
## Triggers and plan
Table: Trigger | Plan.
## Getting through cravings
Tactics, then a withdrawal timeline.
## Treatments to ask about
Table: Option | What it is | Questions to ask.
## Support
## If you slip
Ends with the early benefits list.
</output_format>
