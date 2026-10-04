---
schema: 1
id: study-habits-reset-track
kind: workflow
title: Study habits reset track
description: Helps a student whose grades slip despite effort audit their study habits against evidence, pick two changes, run a measured two-week trial, then review and lock in, gated at each step.
category: studying
version: 1.0.0
status: incubating
stage: [discover, plan, verify, review]
role: [student]
requires: [none]
inputs: [text, notes]
output: [conversation, table, plan]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: mid
reasoning: recommended
level: beginner
tags: [retrieval-practice, spaced-practice, interleaving, study-audit, two-week-trial]
pairs_with:
  prompts: [analyze-exam-mistakes, check-study-technique-claim, create-study-plan]
args:
  - name: current_habits
    description: How you study now, as honestly as you can - what you do in a typical week (rereading, highlighting, notes, flashcards, past papers, videos), when, for how long, where, and with what distractions.
    type: text
    required: true
  - name: results_so_far
    description: Recent marks or feedback, the subjects affected, and what you expected.
    type: text
    required: true
steps:
  - {id: audit, file: steps/01-audit.md, stage: discover, gate: approve, artifact: "study-reset/01-audit.md"}
  - {id: choose-changes, file: steps/02-choose-changes.md, stage: plan, gate: approve, artifact: "study-reset/02-changes.md"}
  - {id: trial, file: steps/03-trial.md, stage: verify, gate: approve, artifact: "study-reset/03-trial-log.md"}
  - {id: review, file: steps/04-review.md, stage: review, gate: none, artifact: "study-reset/04-review.md"}
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
For a student who works hard but whose results do not show it. The usual cause is not effort but method: time goes into activities that feel productive (rereading, highlighting, copying notes, watching videos) but build little lasting recall, while the techniques with the strongest evidence (retrieval practice, spacing, interleaving, worked examples then practice) feel harder and get avoided. This track changes two things at a time, tests them for two weeks with a measure, and keeps what works.

<current_habits>
{{current_habits}}
</current_habits>

<results_so_far>
{{results_so_far}}
</results_so_far>

Rules for every step:
- Use only what the student reports. Ask for missing details (subjects, hours, upcoming tests) instead of guessing, and mark assumptions.
- Never more than two changes at once; changing everything makes it impossible to tell what helped and is hard to keep up.
- Be honest about evidence: name strong, moderate and weak techniques plainly, without claiming exact effect sizes or citing studies you are unsure of.
- Non-judgemental: the student has been working hard, and the old habits are very common.
- Results also depend on sleep, health, stress and life outside study. If these come up, take them seriously and suggest a tutor, student support or a doctor where relevant. If the student mentions self-harm, hopelessness or being unsafe, stop the exercise and point them to local emergency services or a crisis line in their country.
- Each step ends by stopping for the student's approval.
