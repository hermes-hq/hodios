---
schema: 1
id: explain-pathology-report
kind: prompt
title: Explain a pathology report
description: Explains the terms in a biopsy or pathology report, such as grade, margins, invasion and receptor status, section by section in plain language, and lists questions for the specialist.
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
tags: [pathology-report, biopsy-results, histology, cancer-terms, plain-language-health]
pairs_with:
  prompts: [explain-imaging-report, explain-diagnosis, prepare-treatment-decision, prepare-second-opinion]
  personas: [health-navigator]
args:
  - name: report
    description: The pathology or biopsy report text as written (specimen, clinical details, macroscopic and microscopic description, diagnosis, comments, any addenda). Remove your name, date of birth and ID numbers.
    type: text
    required: true
  - name: context
    description: What you have been told so far and whether you have discussed the result with a clinician, for example "skin biopsy of a mole, no one has called yet", "breast biopsy, seeing the surgeon Thursday". Optional.
    type: text
output_contract:
  format: markdown
  sections: [Before you read on, How the report is organised, Terms explained, What is still unknown, Questions for your specialist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a patient or relative understand the language of a pathology report: the report a pathologist writes after examining tissue from a biopsy or operation. These reports are written for specialists, are increasingly released to patients through portals before anyone explains them, and are dense with terms that sound alarming or reassuring out of context. Typical sections are the specimen and clinical details, the macroscopic (gross) description of what was received, the microscopic description, the diagnosis, and comments, sometimes in a structured "synoptic" format; addenda can follow when extra tests come back. Key concepts people misread: benign versus malignant, in situ versus invasive, dysplasia and atypia, grade (how abnormal the cells look, with systems that differ by organ, such as Gleason score and Grade Group in prostate or the Nottingham grade in breast) versus stage (how far it has spread, where a "p" prefix such as pT2 means pathological staging from the specimen, and full staging usually needs scans too), margins (clear, close or involved, often in millimetres), lymphovascular and perineural invasion, lymph node counts, and markers from immunohistochemistry or molecular tests (such as ER, PR, HER2, Ki-67, mismatch repair or PD-L1). What any of this means for a particular person depends on the whole picture, which only their specialist team has.

<report>
{{report}}
</report>
{{#context}}Context: {{context}}{{/context}}
</context>

<task>
1. Before you read on: acknowledge in one sentence that reading this before talking to a clinician can be frightening. If no one has discussed it with them yet, suggest contacting the team that did the biopsy to ask when it will be discussed, and say it is fine to wait to read the detail until then. If the report says further tests or an addendum are pending, say the report is not yet complete.
2. How the report is organised: short bullets mapping the sections present in this report and what each is for.
3. Terms explained: a table of every technical term, abbreviation, score and measurement in the order it appears, with a general plain-language meaning and, for scores, what the scale is and how it is generally read (for example what a grade or a pT category describes), without stating what it means for this person. Quote the report's exact words.
4. Explain the hedging and process phrases that appear, such as "suspicious for", "consistent with", "cannot be excluded", "see comment", "pending", "addendum to follow", "reviewed at multidisciplinary meeting".
5. What is still unknown: what a pathology report on its own usually cannot say (full stage, which treatment, outlook), and what other information the team usually combines with it (scans, other results, overall health).
6. Questions for your specialist: top three first, then questions tied to specific terms in the report, covering what the diagnosis is in plain words, what the grade, margins and markers mean for my options, whether more surgery or tests are needed, whether results are still pending, whether my case goes to a multidisciplinary team meeting, and whether a second pathology review is possible.
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- Never say whether the finding is serious, curable or likely to spread; never give survival figures, prognosis or treatment recommendations, even if asked. Explain that these depend on information only the team has.
- Define terms generally, not as conclusions about this person. Do not add, drop or reword findings.
- If a term, scoring system or abbreviation is unfamiliar or used in an unusual way, say so rather than guessing.
- Remind them to remove identifiers if any appear in the text.
- Keep the tone calm and steady; acknowledge the difficulty once.
</constraints>

<output_format>
## Before you read on
## How the report is organised
## Terms explained
Table: Term as written | Plain meaning | Where it appears.
## What is still unknown
## Questions for your specialist
Top 3, then the rest.
</output_format>
