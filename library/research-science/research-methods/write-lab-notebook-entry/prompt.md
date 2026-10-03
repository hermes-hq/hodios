---
schema: 1
id: write-lab-notebook-entry
kind: prompt
title: Write a lab notebook entry
description: Turns rough bench or field notes into a structured lab notebook entry with aims, materials, methods and deviations, raw observations, data locations and next steps, without filling gaps.
category: research-methods
version: 1.0.0
status: incubating
stage: [build]
role: [researcher, student]
subject: [biology, chemistry, physics]
requires: [none]
inputs: [notes, text]
output: [docs, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: "off"
level: beginner
tags: [lab-notebook, electronic-lab-notebook, record-keeping, reproducibility, alcoa, research-integrity]
pairs_with:
  prompts: [write-lab-protocol, write-data-management-plan, write-methods-section]
args:
  - name: notes
    description: Your rough notes - shorthand, timestamps, volumes, sample IDs, instrument settings, what went wrong, file names - plus the experiment date and the protocol it follows if there is one.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Notebook entry, Gaps to fill, Record-keeping notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A lab notebook is the primary record of research: it supports reproducibility, data integrity investigations, patents and the next person who picks up the project. Good records follow ALCOA+ principles (attributable, legible, contemporaneous, original, accurate, plus complete, consistent, enduring and available). An entry states what was intended, exactly what was done including deviations from the protocol, what was observed before any interpretation, where the raw data live, and what happens next. Entries lose their value when gaps are filled from memory or habit, when results are tidied, or when interpretation is mixed into observations.
</context>

<task>
Turn these notes into a structured notebook entry.
<notes>
{{notes}}
</notes>

1. Read the notes and extract every fact: dates and times, people, sample and specimen IDs, reagents with lot or catalogue numbers, concentrations, volumes, instrument names and settings, software versions, environmental conditions, file names.
2. Write the entry under these headings:
   - Header: experiment date, entry date, author, project, experiment ID, protocol reference and version.
   - Aim: the purpose and, if stated, the hypothesis or expected result.
   - Materials and equipment.
   - Methods as performed, step by step, with any deviation from the protocol marked "DEVIATION:" with its reason if given.
   - Observations and raw results exactly as recorded, with units, including failed or unexpected results.
   - Data location: raw file names and paths, as given.
   - Interpretation, clearly separated and labelled as preliminary.
   - Problems and next steps.
3. List every gap where the notes do not say something a reader would need to repeat the work.
</task>

<constraints>
- Never add a value, step, setting, time or result that is not in the notes. Write "[NOT RECORDED]" where it is missing, and never round or convert numbers without showing the original.
- Keep observations separate from interpretation; move any interpretive words in the notes ("worked", "contaminated") to the interpretation section and record the underlying observation if one was noted.
- Keep failed runs and outliers; do not drop or smooth anything.
- If the notes describe work done on a different date from the entry date, show both dates; this entry is a structured transcription and the original notes remain part of the record.
</constraints>

<output_format>
## Notebook entry
The entry under the headings above, with materials and settings in tables where there are several.
## Gaps to fill
A checklist of [NOT RECORDED] items, ordered by importance for repeating the work.
## Record-keeping notes
At most three short reminders specific to this entry, for example keeping the original handwritten notes, linking raw files, or witnessing if the lab requires it.
</output_format>
