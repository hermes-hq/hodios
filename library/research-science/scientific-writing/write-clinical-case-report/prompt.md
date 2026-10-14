---
schema: 1
id: write-clinical-case-report
kind: prompt
title: Write a clinical case report
description: Writes a clinical case report for journal submission following the CARE guideline, with a timeline, de-identification check, consent reminder and a discussion limited to one case.
category: scientific-writing
version: 1.0.0
status: incubating
stage: [ship]
role: [researcher]
requires: [none]
inputs: [notes, text]
output: [article, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [case-report, care-guideline, clinical-writing, patient-consent, de-identification]
subject: [medicine, healthcare]
pairs_with:
  prompts: [write-abstract, choose-target-journal, write-discussion-section, format-citations]
  personas: [academic-writing-coach]
args:
  - name: case
    description: De-identified case notes covering presentation, history, examination, investigations with results, diagnosis, treatment, follow-up and outcome, with dates as relative times (day 1, week 3).
    type: text
    required: true
  - name: why_notable
    description: What makes the case worth reporting (rare presentation, unexpected treatment response, adverse event, diagnostic lesson), and any literature you have with citations.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Privacy check, Case report, Timeline, CARE checklist, Gaps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Case reports document a single patient's unusual presentation, diagnosis, treatment response or adverse event, and remain an important early signal in medicine. The CARE guideline sets the expected content: a title with "case report", keywords, an abstract, an introduction with why the case matters, patient information, clinical findings, a timeline, diagnostic assessment (including challenges and differential diagnosis), therapeutic interventions, follow-up and outcomes, a discussion with strengths and limitations and relevant literature, the patient's perspective where possible, and informed consent. Journals require written consent from the patient (or guardian) for publication, and removal of identifiers; rare conditions plus details like age, location, occupation and dates can identify someone even without a name. The commonest scientific fault is over-generalising: one case can raise a hypothesis or prompt vigilance, never prove a treatment works or a cause.
</context>

<task>
Write a case report from:
<case>
{{case}}
</case>
<why_notable>
{{why_notable}}
</why_notable>

1. Check privacy first: list any direct or indirect identifiers in the notes (names, exact dates, places, occupation, unique events, image details) and replace or generalise them. Remind the user that written publication consent is required and that the journal's consent form should be used.
2. Write the report in CARE order: title, keywords, a short structured or unstructured abstract, introduction, patient information, clinical findings, timeline, diagnostic assessment, therapeutic intervention, follow-up and outcomes, discussion, patient perspective placeholder, and a consent statement placeholder.
3. Build a timeline table from the relative dates.
4. In the discussion, say what the case adds, compare only with supplied literature, give the differential diagnosis reasoning, state limitations, and phrase take-away lessons as hypotheses or points of vigilance.
5. Fill the CARE checklist with where each item is addressed, and list gaps.
</task>

<constraints>
- Use only the supplied clinical facts and literature; never invent results, doses, outcomes or references. Mark missing items as [TO ADD].
- Never include identifying details; generalise ages to ranges or use them only when clinically essential, and remove exact dates and places.
- Do not claim causation or efficacy from one case.
- This is writing support for a clinician-author; do not give treatment advice for the patient.
</constraints>

<output_format>
## Privacy check
A table: identifier found | change made. Then the consent reminder.
## Case report
The full draft with CARE headings.
## Timeline
A table: time | event | key result.
## CARE checklist
A table: item | section | status.
## Gaps
Bullets.
</output_format>
