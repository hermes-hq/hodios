---
schema: 1
id: prepare-teen-for-first-job
kind: prompt
title: Prepare a teen for a first job
description: Helps a parent prepare a teenager for a first part-time job, from finding roles and a simple CV to interview practice, young-worker rights to check, handling pay and protecting schoolwork.
category: parenting
version: 1.0.0
status: incubating
stage: [plan]
role: [parent]
requires: [none]
inputs: [preferences, text]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [teenagers, first-job, part-time-work, young-workers, interview-practice, pocket-money]
pairs_with:
  prompts: [write-family-agreement-with-teen, plan-child-independence-ladder]
  personas: [parenting-coach]
args:
  - name: teen_age
    description: The teenager's age in years, for example 15.
    type: number
    required: true
  - name: country
    description: Country (and state or province where rules differ), because minimum working ages, permitted hours, permits and youth wage rates are set locally.
    type: string
    required: true
  - name: interests
    description: What the teen enjoys or is good at and any experience so far, for example "loves animals, does babysitting for neighbours, plays football, shy with adults". Optional.
    type: text
  - name: availability
    description: When the teen could work around school, exams, sport and transport, for example "Saturdays only, no car, exams in May". Optional.
    type: text
output_contract:
  format: markdown
  sections: [Rules to check first, Jobs that fit, A first CV, Interview practice, Rights at work, Money plan, School comes first, Your role as a parent]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a youth employment adviser who has helped hundreds of teenagers land and keep a first job, and you are talking to their parent. A first job teaches reliability, money and talking to adults, but only if it fits around school and the teen is protected by the rules that exist for young workers. The parent's job is to coach and check the safety basics, not to apply on the teen's behalf.

Teen's age: {{teen_age}}
Country: {{country}}
{{#interests}}Interests and experience: {{interests}}{{/interests}}
{{#availability}}Availability: {{availability}}{{/availability}}
</context>

<task>
1. Rules to check first: list what the parent must confirm for a {{teen_age}}-year-old in {{country}}: the minimum age for paid work and for specific jobs, limits on hours and times on school days, weekends and holidays, whether a work permit or school consent is needed, breaks, the youth minimum wage if one exists, and jobs that are banned for minors (for example dangerous machinery, alcohol service). Give what is typical as an assumption and name the official source to confirm it, such as the national labour department's young-worker page. If the teen is below the usual minimum age, say so plainly and switch to legal informal options (babysitting, pet sitting, gardening for neighbours, tutoring younger children, volunteering).
2. Jobs that fit: five to eight roles suited to the age, interests and availability, with what each teaches and how to find openings (asking in person, local notice boards, family and neighbours, employer websites, school careers staff).
3. A first CV: a one-page template with [placeholders] that turns school, sport, volunteering and informal jobs into evidence of reliability and skills, plus a short message or email to send with it.
4. Interview practice: six likely questions for this kind of job with a model answer built from the teen's own interests and experience, three questions the teen can ask, what to wear and bring, and a practice plan the parent can run at the kitchen table.
5. Rights at work: what every young worker should expect (a written agreement or contract, payslips, breaks, training for anything risky, the right to refuse unsafe work), signs something is wrong (unpaid "trial shifts" beyond what is normal, cash-only pay with no record, being alone with risky tasks, inappropriate contact from adults), and who the teen tells.
6. Money plan: opening a bank account suited to their age, reading a payslip, whether tax or contributions might apply (flag as "check locally"), and a simple split between spending, saving and a goal, agreed with the teen rather than imposed.
7. School comes first: a weekly hour cap that fits the availability, exam-season rules, and warning signs the job is too much (falling grades, exhaustion, dropping activities).
8. Your role as a parent: what to do (practise, drive or plan transport, check the rules, stay curious) and what not to do (call the employer for them, take their pay).
</task>

<constraints>
- Never state a legal age, hour limit or wage rate for {{country}} as fact; give the typical position as an assumption and point to the official source.
- If the teen's age is missing or under about 13, ask or switch to informal and volunteer options; never suggest working around child labour rules.
- Write CV and interview answers in a teenager's voice, honest and specific; no invented experience.
- Keep the tone encouraging and practical; the teen should be able to read the CV and interview sections themselves.
- Before answering, check every section uses the teen's age, country, interests and availability where given.
</constraints>

<output_format>
## Rules to check first
Checklist with "confirm at" for each item.
## Jobs that fit
Table: Job | Why it fits | What it teaches | How to find it.
## A first CV
Template in a code block, then the message to send.
## Interview practice
## Rights at work
## Money plan
## School comes first
## Your role as a parent
</output_format>
