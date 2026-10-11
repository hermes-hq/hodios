---
schema: 1
id: prepare-for-blood-test
kind: prompt
title: Prepare for a blood test
description: Explains how to prepare for a blood test you have been sent for, such as fasting, medicines, timing and hydration, what happens on the day, and what to ask about getting results.
category: medical-prep
version: 1.0.0
status: incubating
stage: [plan, learn]
role: [individual, parent]
subject: [medicine]
requires: [none]
inputs: [text]
output: [checklist, explanation, questions]
risk: read-only
advice_risk: [medical]
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [blood-test, phlebotomy, fasting-blood-test, lab-tests, needle-fear]
pairs_with:
  prompts: [explain-lab-results, build-medication-list, prepare-doctor-questions]
  personas: [health-navigator]
args:
  - name: tests
    description: The tests as written on your form or in your message from the clinic, for example "FBC, U&E, LFT, lipids, HbA1c", "fasting glucose", "TSH", "lithium level". If you do not know, write what you were told.
    type: text
    required: true
  - name: medicines
    description: Medicines and supplements you take, with timing, for example "metformin twice a day, insulin at night, biotin hair supplement". Optional.
    type: text
  - name: concerns
    description: Anything that worries you, for example "I faint at needles", "my veins are hard to find", "I'm diabetic and worried about fasting", "it's for my 6-year-old". Optional.
    type: text
output_contract:
  format: markdown
  sections: [Check with the clinic, Your tests and how to prepare, On the day, If needles worry you, Getting your results]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help someone prepare for a routine blood test. Most blood tests need no preparation at all, and people often fast unnecessarily or, worse, skip medicines they should take. A few tests do need preparation, and getting it wrong means a misleading result or a repeat visit: fasting glucose and some lipid or triglyceride tests (usually water only for a set number of hours, as the clinic instructs), tests that are timed (for example some hormones in the morning, or a medicine level taken just before the next dose), and tests affected by recent heavy exercise, alcohol or some supplements (high-dose biotin can interfere with some lab methods, including some thyroid and heart tests). People with diabetes who are asked to fast need specific advice on their medicines to avoid low blood sugar. The ordering clinic's instruction always wins over general information.

Tests: {{tests}}
{{#medicines}}Medicines and supplements: {{medicines}}{{/medicines}}
{{#concerns}}Concerns: {{concerns}}{{/concerns}}
</context>

<task>
1. Check with the clinic: list the specific points they should confirm with whoever ordered the test or the lab: whether fasting is needed and for how long, whether to take their usual medicines that morning, any timing requirement, and whether to bring the form or a sample. If they take insulin or diabetes tablets and fasting is mentioned, make "ask how to adjust your diabetes medicines while fasting" the first item.
2. Your tests and how to prepare: a table with each test they listed, what it generally measures in one plain line, and whether it commonly needs any preparation ("usually none", "often fasting, confirm", "timed, confirm", "unknown abbreviation, ask"). Never invent a meaning for an abbreviation you do not recognise.
3. Flag supplements or habits from their notes that are worth mentioning to the clinic (for example biotin, recent hard exercise, alcohol the night before), as questions, not instructions to stop anything prescribed.
4. On the day: drink water unless told otherwise (it makes veins easier to find), wear a sleeve that rolls up, bring their medicine list and a snack for after a fasting test, how long it usually takes, and aftercare (press firmly for a minute or two, keep the plaster on, bruising is common; a growing swelling, numbness or pain spreading down the arm is a reason to call).
5. If needles worry you (include only if relevant, or a short version otherwise): tell the person taking blood, ask to lie down if they have fainted before, look away, slow breathing, the applied-tension technique for people who faint (tensing the large muscles of the arms, legs and body for 10 to 15 seconds, releasing, repeating) unless they have a heart or blood pressure condition, and asking about numbing cream for children or needle-phobic adults.
6. Getting your results: questions to ask: when results usually come back, how they will be told (portal, call, letter, appointment), whether they will be contacted if results are normal, and who to ask if they hear nothing. Say plainly that "no news" should not be assumed to mean good news; ask the clinic what to expect.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never tell them to stop, skip or delay a prescribed medicine. Every change goes through the clinic or pharmacist.
- Do not state fasting durations or timing as a rule for their test; give the common pattern and tell them to confirm it.
- Do not interpret results or predict what the test will show.
- For a child, adapt the day-of advice (preparing them honestly, comfort, distraction) and keep the tone calm.
- Keep it short and practical.
</constraints>

<output_format>
## Check with the clinic
Numbered list, most important first.
## Your tests and how to prepare
Table: Test as written | What it generally measures | Preparation commonly needed.
## On the day
## If needles worry you
## Getting your results
</output_format>
