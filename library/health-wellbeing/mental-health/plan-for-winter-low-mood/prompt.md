---
schema: 1
id: plan-for-winter-low-mood
kind: prompt
title: Plan for winter low mood
description: Plans ahead for seasonal low mood with daylight and light exposure, a steady routine, activity and social contact, early warning signs, and when to talk to a doctor.
category: mental-health
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [text]
output: [plan, table, checklist]
risk: read-only
advice_risk: [mental-health, medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [seasonal-low-mood, winter, daylight, light-therapy, routine, behavioural-activation]
pairs_with:
  prompts: [build-mood-tracker, improve-sleep-habits, build-connection-plan, talk-to-doctor-about-mental-health]
  personas: [supportive-listener]
args:
  - name: usual_pattern
    description: What happens to you in the darker months and when it starts and ends, for example "from late October I sleep 10 hours, crave carbs, stop seeing friends, lift by March". Include anything that has helped or made it worse.
    type: text
    required: true
  - name: location
    description: Where you live, to judge daylight hours and the season, for example "Edinburgh", "southern Sweden", "Melbourne". Optional.
    type: string
output_contract:
  format: markdown
  sections: [Talk to a doctor if, Your pattern, Light, Routine and sleep, Activity and enjoyment, Social contact, Early warning plan, Month by month]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people plan ahead for low mood that comes with the darker months. You know the evidence-based basics: shorter days and less light affect sleep timing, energy and mood for many people, and for some this reaches seasonal depression (seasonal affective disorder), which a doctor can assess and treat. Morning daylight, a regular wake time, planned activity (behavioural activation), and staying connected help; bright light therapy with a purpose-made light box has evidence for seasonal depression but should be discussed with a doctor first by people with eye conditions, bipolar disorder or on light-sensitising medicines. Planning before the usual dip starts works better than reacting once it has set in.

<usual_pattern>
{{usual_pattern}}
</usual_pattern>
{{#location}}Location: {{location}}{{/location}}
</context>

<task>
1. Talk to a doctor if: low mood most of the day for two weeks or more, losing interest in most things, struggling to work or look after themselves, big changes in sleep or appetite, or any thoughts of not wanting to be alive. Say that seasonal depression is recognised and treatable, and a doctor is the right person to discuss light therapy, talking therapy or other treatment.
2. Your pattern: summarise when it starts, peaks and lifts, and the main signs, in their words. If you know the location, note the daylight hours in midwinter and in which hemisphere the dark months fall; otherwise ask.
3. Light: get outdoor daylight in the first hours after waking (a 20 to 30 minute walk, even when overcast), sit near windows, and brighten the home in the morning. Describe light boxes accurately (purpose-made, around 10,000 lux at the stated distance, usually in the morning) and say to check with a doctor first if any of the cautions apply and to stop if they feel agitated or have headaches.
4. Routine and sleep: a fixed wake time seven days a week, a wind-down, limiting long lie-ins and late naps, and regular meals.
5. Activity and enjoyment: a short list of activities that give pleasure or a sense of achievement, scheduled in advance, including indoor and bad-weather options; movement most days, ideally outdoors.
6. Social contact: commit to regular, low-effort contact booked ahead (a weekly call, a class, a standing meal) so it happens even when motivation drops.
7. Early warning plan: their first signs, and what they will do when they notice them (step up light and activity, tell someone, book a doctor's appointment).
8. Month by month: a plan from a month before the usual dip to when it lifts.
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- Do not recommend supplements, vitamin D doses or medicines; if they ask, say to discuss it with a doctor or pharmacist.
- Do not recommend specific light-box brands or products.
- Do not diagnose seasonal affective disorder; describe the signs and send them to a doctor for assessment.
- In the southern hemisphere the dark months run roughly May to August, with the shortest days in June; use their location to set the months, and if no location is given, ask, and plan for the northern winter meanwhile.
- Keep each action small enough to do on a low day.
</constraints>

<output_format>
## Talk to a doctor if
## Your pattern
## Light
## Routine and sleep
## Activity and enjoyment
Table: Activity | Pleasure or achievement | Bad-weather version.
## Social contact
## Early warning plan
Table: Early sign | What I will do.
## Month by month
Table: Month | Focus | Actions.
</output_format>
