---
schema: 1
id: explain-heart-test-results
kind: prompt
title: Explain heart test results
description: Explains the terms and numbers in an ECG, echocardiogram, stress test or heart rhythm monitor report in plain language and lists questions for the clinician, without judging the result.
category: medical-prep
version: 1.0.0
status: incubating
stage: [learn]
role: [individual, parent]
subject: [medicine]
requires: [none]
inputs: [document, text]
output: [explanation, table, questions]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [ecg, echocardiogram, stress-test, holter-monitor, cardiology, plain-language-health]
pairs_with:
  prompts: [explain-imaging-report, explain-lab-results, prepare-doctor-questions, build-symptom-log]
  personas: [health-navigator]
args:
  - name: report
    description: The report text as written, including the numbers and the conclusion or impression. Remove your name, date of birth and ID numbers.
    type: text
    required: true
  - name: test_type
    description: Which test it was, if you know.
    type: enum
    enum: [ecg, echocardiogram, stress-test, rhythm-monitor, not-sure]
    default: not-sure
  - name: reason
    description: Why the test was done and how you feel now, for example "palpitations", "pre-op check", "breathless on stairs". Optional.
    type: text
output_contract:
  format: markdown
  sections: [Check first, What this test measures, Terms and numbers explained, What this explanation cannot tell you, Questions for your clinician]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people read cardiac test reports, which are often released through portals or handed over with little explanation. Each test measures something different: an ECG records the heart's electrical activity for a few seconds (rhythm, rate, intervals such as PR, QRS and QTc, axis, and patterns such as bundle branch block or ST and T wave changes); an echocardiogram is an ultrasound of the heart's structure and pumping (chamber sizes, wall thickness, ejection fraction, diastolic function, valve narrowing or leaking graded from trace to severe, pressures); a stress test looks at how the heart responds to exercise or medicine (workload in METs, heart rate reached, symptoms, ECG changes, or perfusion images); and a rhythm monitor (Holter, patch or event recorder) records over days and reports extra beats, runs, pauses and whether symptoms matched the rhythm. Machine-printed ECG interpretations ("borderline", "possible", "cannot rule out") are automated screening statements that a clinician reviews and often overrules; trace valve leaks and occasional extra beats are very common; and normal ranges vary by laboratory, age and sex. Significance always depends on symptoms, history and other results, which the clinician has.

<report>
{{report}}
</report>
Test: {{test_type}}
{{#reason}}Reason and how they feel: {{reason}}{{/reason}}
</context>

<task>
1. Check first: if they now have chest pain or pressure, severe breathlessness, fainting, or a racing heartbeat with dizziness, tell them to call emergency services before reading anything else. If the report says "urgent", "critical", "discussed with" or recommends immediate action, tell them to contact the ordering clinician today.
2. What this test measures: three or four plain sentences on what this test (identify it from the report if {{test_type}} is not-sure) shows and does not show.
3. Terms and numbers explained: a table of every term, abbreviation and measurement in the order it appears, with a plain general meaning, the unit, and the reference range only if the report itself prints one. For graded findings (such as mild, moderate or severe valve leaking, or diastolic function grades) explain what the scale is. For machine-generated ECG statements, say they are automated and confirmed or overruled by the clinician.
4. Explain the hedging phrases present, such as "non-specific", "borderline", "cannot exclude", "clinical correlation", "within normal limits", "technically difficult study".
5. What this explanation cannot tell you: two or three lines on why significance depends on their symptoms, history and other tests.
6. Questions for your clinician: top three first, then questions tied to specific findings, including whether this explains the symptoms that led to the test, whether anything needs follow-up or repeat testing and when, whether any activity, driving or medicine change is needed, and which symptoms should make them seek help.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never say a result is normal, abnormal, dangerous or nothing to worry about for this person, and never diagnose or suggest treatment, even if asked.
- Do not invent reference ranges; use only ranges printed in the report, or say ranges vary by lab, age and sex.
- Quote the report's words; do not add, drop or reinterpret findings.
- If a term is unfamiliar, say so rather than guessing.
- Remind them to remove identifiers if present.
</constraints>

<output_format>
## Check first
One to three lines.
## What this test measures
## Terms and numbers explained
Table: Term or value as written | Plain meaning | Notes.
## What this explanation cannot tell you
## Questions for your clinician
Top 3, then the rest.
</output_format>
