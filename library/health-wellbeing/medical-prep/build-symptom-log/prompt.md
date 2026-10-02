---
schema: 1
id: build-symptom-log
kind: prompt
title: Build a symptom log
description: Creates a symptom diary template tailored to a condition, or turns logged entries into a clear, counted one-page summary for a clinician without diagnosing. Use before and after tracking symptoms.
category: medical-prep
version: 1.0.1
status: incubating
stage: [plan, review]
role: [individual, parent]
subject: [medicine]
requires: [none]
inputs: [notes, text]
output: [table, summary, questions]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [symptom-diary, health-tracking, patient-advocacy, chronic-conditions]
pairs_with:
  prompts: [prepare-doctor-questions, explain-diagnosis]
args:
  - name: condition_or_symptoms
    description: The condition or symptoms you are tracking, for example "migraines", "IBS flare-ups", "my son's eczema", "dizzy spells".
    type: text
    required: true
  - name: entries
    description: Your logged entries, in any format. Optional; leave empty to get a template to start logging.
    type: text
output_contract:
  format: markdown
  sections: [Your log template, How to rate severity, Logging tips, Summary for your clinician, Questions to ask, Get checked sooner if]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "The template now ends with the warning signs to act on, not only the summary."}
---
<context>
Clinicians make better decisions with a few weeks of consistent records than with a memory of "it's been bad lately". A good diary is quick enough to fill in every day, records good days as well as bad ones, captures what the clinician will ask about, and is summarised honestly: counts and co-occurrences, not conclusions.

Tracking: {{condition_or_symptoms}}
{{#entries}}
Logged entries:
<entries>
{{entries}}
</entries>
{{/entries}}
</context>

<task>
If no entries were provided, build a template:
1. Choose fields: date and time, symptom, severity 0–10, duration, possible triggers or context (sleep, food, activity, stress, menstrual cycle, weather, as relevant), medicines taken with dose and effect, impact on daily life, and notes. Add fields specific to {{condition_or_symptoms}} (for example aura and nausea for migraine; stool type on the Bristol Stool Scale for bowel symptoms; position and arm for blood pressure readings; peak flow for asthma).
2. Give severity anchors so ratings stay consistent (0 none, 3 noticeable but can carry on, 5 hard to ignore and limits some activities, 7 stops most activities, 10 worst imaginable).
3. Add logging tips: log at the same time each day, record symptom-free days too, log for at least 2–4 weeks, keep it short.

If entries were provided, summarise them for a clinician:
1. Period covered, number of days with entries, and days with no entry.
2. Count accurately: number of episodes, how often per week, severity (range and typical), duration, time of day.
3. Patterns as co-occurrence only: "poor sleep noted the night before on 3 of 5 headache days". List which entries support each pattern.
4. Medicines used: how many days, and the effect the person recorded.
5. Impact on work, school, sleep or activities.
6. Gaps and inconsistencies in the data.
7. Questions for the clinician based on the summary.
Then suggest any fields to add to the template going forward.
</task>

<constraints>
{{> guardrails/professional-limits}}
- No diagnoses and no causal claims. Triggers are "noted together", never "caused by".
- Never fill in missing data or round counts to make a pattern look stronger. Recount before you write the summary.
- Keep the person's own words for symptom descriptions.
- If any entry describes something that needs prompt attention (rapidly worsening symptoms, a sudden severe headache, chest pain, fainting, blood in vomit or stool, new weakness or numbness, or a very unwell child), say so at the top: contact a doctor promptly or emergency services if it is happening now.
- The clinician summary must fit on one printed page.
</constraints>

<output_format>
Without entries:
## Your log template
A table with the column headings and one example row.
## How to rate severity
## Logging tips
## Get checked sooner if
Short list tied to the symptoms tracked, so the person knows what not to just log.

With entries:
## Summary for your clinician
Period and overview (two lines); table: Measure | Value; patterns noticed, each with its supporting entries; medicines and effect; impact on daily life; gaps.
## Questions to ask
## Get checked sooner if
Short list tied to the symptoms tracked.
</output_format>
