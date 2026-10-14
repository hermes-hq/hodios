---
schema: 1
id: write-lab-leaving-handover
kind: prompt
title: Write a handover for leaving a lab
description: Writes the handover a researcher leaves when moving on, covering samples and their locations, data and code, unfinished experiments, reagents, protocols, duties and who owns what next.
category: lab-work
version: 1.0.0
status: incubating
stage: [operate, ship]
role: [researcher, student]
requires: [none]
inputs: [notes, text]
output: [docs, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [handover, leaving-the-lab, sample-inventory, data-handover, offboarding]
pairs_with:
  prompts: [set-up-sample-tracking, write-lab-notebook-entry, write-lab-protocol]
  personas: [lab-manager]
args:
  - name: notes
    description: Rough notes on what you have - samples and where they are, data locations, ongoing experiments, special reagents or cell lines, protocols you wrote, instruments you are responsible for, collaborations.
    type: text
    required: true
  - name: leaving
    description: When you leave, who is taking over (if known), and whether a paper from your work is still in progress.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Summary, Samples and materials, Data and code, Unfinished work, Protocols and know-how, Duties and contacts, Open questions, Checklist before the last day]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
When someone leaves a lab, the costly losses are boxes nobody can identify, raw data on a personal laptop, experiments only one person knew how to run, and samples that cannot be used because nobody knows the consent, licence or material transfer terms. A useful handover is specific enough that a stranger could find every tube and file, says what is safe to discard, and records the terms attached to materials. Lab and institutional rules on data retention and ownership apply, and the principal investigator decides what is kept.
</context>

<task>
Write my lab handover.

<notes>
{{notes}}
</notes>

<leaving>
{{leaving}}
</leaving>

1. Summary: who, when, the projects, and who takes over each.
2. Samples and materials: a table with item, exact location (freezer, rack, box, position), quantity, labels as written, status (keep, transfer, discard after a date), and terms attached (consent, licence, transfer agreement, biosafety or regulated status) where relevant.
3. Data and code: where raw and processed data live on lab or institutional storage, file naming, analysis code and its environment, what is backed up, and what must be moved off personal devices before leaving.
4. Unfinished work: for each experiment or paper, where it stands, the next step, and what someone needs to finish it.
5. Protocols and know-how: protocols to find or write up, tricks that are not written down yet (flag these to write before leaving).
6. Duties and contacts: rota duties, instrument responsibilities, orders pending, collaborators to introduce.
7. Open questions for the principal investigator.
8. A checklist for the last two weeks.
</task>

<constraints>
- Use only what is in the notes; where a location, quantity or term is missing, leave a visible gap such as "[location?]" rather than inventing it.
- Do not decide what to discard; mark items "proposed discard - PI to confirm".
- Keep personal data about research participants out of the handover itself; point to where it is held under the lab's rules.
</constraints>

<output_format>
## Summary
## Samples and materials
| Item | Location | Quantity | Label | Status | Terms |
## Data and code
## Unfinished work
## Protocols and know-how
## Duties and contacts
## Open questions
## Checklist before the last day
</output_format>
