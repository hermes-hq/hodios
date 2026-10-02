---
schema: 1
id: check-manuscript-reporting
kind: prompt
title: Check a manuscript against its reporting guideline
description: Checks a manuscript against its reporting guideline, such as CONSORT, PRISMA, STROBE, ARRIVE or COREQ, item by item, and lists what is missing and where to add it. For authors and reviewers.
category: peer-review
version: 1.0.0
status: incubating
stage: [review, verify]
role: [researcher, student, editor]
requires: [none]
inputs: [document]
output: [checklist, table, report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [reporting-guidelines, equator-network, consort, prisma, strobe, arrive, coreq, manuscript]
pairs_with:
  prompts: [write-methods-section, write-peer-review, appraise-study-quality]
  personas: [research-methodologist]
args:
  - name: manuscript
    description: The full manuscript, including the title, abstract, methods, results, discussion, figures and tables (described if needed), and any supplementary material.
    type: text
    required: true
  - name: guideline
    description: The reporting guideline, for example "CONSORT", "PRISMA 2020", "STROBE", "ARRIVE 2.0", "COREQ", "SRQR", "STARD", "TRIPOD", "CARE", "SPIRIT". Leave empty to have it chosen from the design.
    type: string
output_contract:
  format: markdown
  sections: [Guideline and design, Summary, Item-by-item check, Priority fixes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Reporting guidelines, collected by the EQUATOR Network, list the minimum information readers need to understand, appraise and replicate a study of a given design: CONSORT for randomised trials, SPIRIT for trial protocols, PRISMA for systematic reviews, STROBE for observational studies, ARRIVE for animal research, STARD for diagnostic accuracy, TRIPOD for prediction models, COREQ for interviews and focus groups, SRQR for qualitative research in general, CARE for case reports, and extensions for specific designs (such as cluster trials). Many journals require a completed checklist at submission. Checking reporting is not the same as judging quality: a well-reported study can still be weak, and a missing item is a reporting gap, not proof that something was not done.
</context>

<task>
Check this manuscript{{#guideline}} against {{guideline}}{{/guideline}}.
<manuscript>
{{manuscript}}
</manuscript>

1. Identify the study design from the methods. Confirm the guideline fits, or choose the right one if none was given, and name any relevant extension (for example CONSORT for cluster trials, PRISMA for abstracts, STROBE extensions). If the stated guideline does not fit the design, say so and use the right one.
2. Go through the guideline item by item, in its order and grouped by its sections (title and abstract, introduction, methods, results, discussion, other information). For each item: a short paraphrase of what it asks, a status (reported, partly reported, not reported, not applicable), where it is reported (section and a short quote), and what to add if it is not fully reported.
3. Give special attention to the items reviewers most often find missing for this design, for example for trials: allocation concealment, who was blinded, the pre-specified primary outcome, the participant flow diagram, harms and registration; for systematic reviews: the full search strategy, the risk-of-bias method and certainty of evidence; for observational studies: the handling of confounders and missing data; for qualitative studies: researcher reflexivity and the sampling rationale.
4. Summarise: the number of items fully, partly and not reported, and the overall picture.
5. List the priority fixes: the gaps an editor or reviewer would most likely raise, with suggested wording or the information to add.
</task>

<constraints>
- Paraphrase checklist items in your own words, and do not reproduce long checklist text. Use item numbers only if you are confident of them for the version used; otherwise use section and topic labels, and tell the user to complete the official checklist from the guideline's website for submission.
- Judge only from the text provided. If figures, tables or supplements are referenced but not included, mark the dependent items "cannot check: [material] not provided".
- Do not assume something was done because it is usual; a missing item is "not reported".
- This is a reporting check, not a quality appraisal. Point to a risk-of-bias assessment if the user wants a judgement on validity.
- If the manuscript is long, check every item, keeping each table row short; do not skip sections.
</constraints>

<output_format>
## Guideline and design
Design, guideline used (with extension), and why.
## Summary
Counts by status and two or three sentences on the overall picture.
## Item-by-item check
Table: section | item (paraphrased) | status | where reported (quote) | what to add.
## Priority fixes
Numbered list, most important first, each with suggested wording or the information needed.
</output_format>
