---
schema: 1
id: plan-chronic-condition-self-management
kind: prompt
title: Plan chronic condition self-management
description: Builds a self-management routine for a diagnosed chronic condition from the care team's plan, with daily tasks, tracking, a traffic-light action plan and appointment preparation.
category: medical-prep
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [individual, parent]
subject: [healthcare]
requires: [none]
inputs: [notes, text]
output: [plan, table, checklist, questions]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [chronic-conditions, self-management, action-plan, health-tracking, routines, carers]
pairs_with:
  prompts: [build-symptom-log, build-medication-list, plan-activity-pacing, prepare-doctor-questions]
  personas: [health-navigator]
  workflows: [doctor-visit-track]
args:
  - name: condition_and_plan
    description: The diagnosed condition and everything your care team told you to do, for example medicines, monitoring and targets, diet or activity advice, the warning signs they gave, and your next appointments. Add what your days look like and what you find hard. No names or ID numbers.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Check first, Your plan in one view, Daily routine, Weekly and monthly tasks, Tracking log, Action plan, Before each appointment, Gaps to ask your care team about]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people living with a long-term condition (such as diabetes, asthma, COPD, heart failure, high blood pressure, kidney disease, arthritis or epilepsy) turn their care team's instructions into a routine they can keep up. Self-management programmes work by making the plan concrete: small daily habits tied to existing routines, simple tracking, a written action plan that says what to do when things change, and arriving at appointments with data and questions. The care team sets the plan; you make it usable.

<condition_and_plan>
{{condition_and_plan}}
</condition_and_plan>
</context>

<task>
1. Check for anything urgent in what they wrote (symptoms they describe as happening now that sound severe, or readings they describe as far outside what they were told). If present, lead with contacting their care team, an urgent advice line or emergency services.
2. Summarise the plan in one view: the condition, the goals or targets the team gave (quoted), medicines and monitoring as written, and lifestyle advice as given.
3. Build a daily routine that anchors each task to something they already do (with breakfast, when brushing teeth, at bedtime). Include medicines as written, checks or readings the team asked for, and the advice given about food, activity, rest or breathing techniques. Keep it short enough to follow on a bad day; mark which items matter most.
4. Add weekly and monthly tasks: refills and ordering ahead, checking supplies and expiry dates, foot or skin checks if advised, device cleaning, and scheduled tests.
5. Create a tracking log with only the measures the team asked for, plus symptoms, how the day went and questions to ask. Suggest paper, spreadsheet or app, and say what to bring to appointments.
6. Write a traffic-light action plan:
   - **Green (my usual):** what usual looks like for them and the routine to keep.
   - **Amber (getting worse):** signs and the actions the care team gave for this zone, and who to contact today.
   - **Red (emergency):** signs that need emergency services.
   Fill the zones ONLY with thresholds, readings and actions the care team gave. Where the team has not given them, write "[ask your care team: what reading or sign means I should …]" and add it to the gaps list. You may list general emergency signs (chest pain, trouble breathing, collapse, confusion) in red, labelled as general.
7. Appointment preparation: a short template covering what has gone well, the log summary, problems (side effects, missed doses, cost or access), the three most important questions, and what they want to change.
8. Gaps to ask the care team about: everything the plan did not specify that a person would need to self-manage safely (targets, sick-day rules, what to do about a missed dose, when to call).
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never set targets, thresholds or doses yourself, never suggest adjusting medicines, and never recommend a diet, supplement or exercise programme beyond what the team advised. Turn those needs into questions for the team.
- Quote the team's words for targets and instructions; do not convert units.
- If what they wrote is not a diagnosed condition with a plan (for example symptoms without a diagnosis), say this prompt is for an existing plan and suggest preparing for a doctor's appointment instead.
- Be realistic: if the routine looks heavy, say which parts are essential and suggest discussing the rest with the team. Mention that it is common to find this hard, and that a diabetes educator, specialist nurse, pharmacist or self-management course may be available locally.
- Plain language, no blame for missed days.
</constraints>

<output_format>
## Check first
One line, or urgent steps.
## Your plan in one view
## Daily routine
Table: When | Task | Why it matters (from your plan) | Essential?
## Weekly and monthly tasks
Checklist.
## Tracking log
A table template with the columns to track.
## Action plan
Three labelled zones: Green, Amber, Red.
## Before each appointment
A fill-in template.
## Gaps to ask your care team about
Numbered questions.
</output_format>
