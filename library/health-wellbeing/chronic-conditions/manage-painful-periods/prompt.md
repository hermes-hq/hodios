---
schema: 1
id: manage-painful-periods
kind: prompt
title: Manage painful or heavy periods
description: Builds a plan for painful or heavy periods - a cycle and symptom log, self-care, options to discuss with a doctor, and signs such as endometriosis or anaemia worth raising.
category: chronic-conditions
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [preferences]
output: [plan, checklist]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [period-pain, heavy-periods, dysmenorrhoea, menstrual-health, endometriosis, symptom-diary]
pairs_with:
  prompts: [build-symptom-log, prepare-doctor-questions, prepare-contraception-consultation, plan-training-around-menstrual-cycle]
args:
  - name: periods
    description: Age, how painful (0 to 10) and for how many days, how heavy (how often you change pads, tampons or cups, flooding, clots), cycle length, and how long it has been like this.
    type: text
    required: true
  - name: impact
    description: What it stops you doing (work, school, sport, sleep), what you have tried, other symptoms (pain between periods or during sex, bowel or bladder pain, tiredness, dizziness), contraception, and country. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Get urgent help if, Worth booking an appointment for, Self-care plan, Your cycle log, Options to ask a doctor about, What to say at the appointment]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help someone with painful or heavy periods take control: track what actually happens, use self-care that works, and go to a doctor with the evidence that gets them taken seriously. What gynaecology nurses know: period pain that stops someone going to school or work is common but not something they must simply put up with; conditions such as endometriosis, adenomyosis and fibroids are often diagnosed years late because pain is normalised. Heavy bleeding is defined by its effect on life as much as by volume: changing protection every one to two hours, flooding through clothes, clots larger than a small coin, or bleeding longer than about a week are worth raising, and heavy bleeding can cause iron deficiency (tiredness, breathlessness, feeling cold). Self-care that helps: heat on the abdomen or back, regular gentle movement, and anti-inflammatory painkillers, which work best when started at the first sign of pain and taken regularly for the worst days, if they are safe for that person (a pharmacist checks this). Hormonal contraception options and other treatments are a conversation for a doctor or nurse. A symptom log over two or three cycles is the single most useful thing to bring.

Periods: {{periods}}
{{#impact}}Impact and history: {{impact}}{{/impact}}
</context>

<task>
1. Check first for urgent signs: severe one-sided lower abdominal pain with a missed period or possible pregnancy, fainting or feeling very faint, soaking through protection every hour for several hours, fever with pelvic pain, or sudden very severe pain. If present, tell them to seek urgent care now.
2. List signs worth booking a routine appointment for, based on what they said: pain that stops normal life or is getting worse, pain not helped by self-care, pain between periods or during or after sex, bleeding between periods or after sex, heavy bleeding as defined above, tiredness or breathlessness that could mean low iron, bowel or bladder pain around periods. Name endometriosis, adenomyosis and fibroids as things a doctor can consider, without saying they have them.
3. Give a self-care plan for the days before and during the period: heat, movement, sleep, when to start pain relief (with "ask a pharmacist which is safe for you" and no doses), and how to plan the worst days at work or school.
4. Give a simple log to keep for two or three cycles: day of cycle, pain score, bleeding (number of products and how full, flooding, clots), what helped, days missed.
5. List options a doctor or nurse may discuss (examination, blood test for iron, ultrasound, hormonal and non-hormonal treatments, referral) so they know what to ask about, without recommending one.
6. Add a short script for the appointment if they have felt dismissed before: the facts from the log, the impact, and the specific question.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not diagnose or say pain is "normal" or "nothing to worry about".
- No medicine doses. Note that anti-inflammatory painkillers are not safe for everyone (for example some people with asthma, stomach ulcers, kidney problems or pregnancy) and a pharmacist checks.
- For someone under 16, address the parent or young person in an age-appropriate way and encourage involving a trusted adult and a doctor.
- Use inclusive language: people who have periods.
{{> output/uncertainty}}
</constraints>

<output_format>
## Get urgent help if
## Worth booking an appointment for
## Self-care plan
## Your cycle log
## Options to ask a doctor about
## What to say at the appointment
</output_format>
