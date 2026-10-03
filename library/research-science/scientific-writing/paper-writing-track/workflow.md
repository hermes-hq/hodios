---
schema: 1
id: paper-writing-track
kind: workflow
title: Paper writing track
description: Takes a manuscript from target journal and outline through methods and results, introduction and discussion, title and abstract, and a pre-submission check, pausing for approval between steps.
category: scientific-writing
version: 1.0.0
status: incubating
stage: [plan, build, review]
role: [researcher, student]
requires: [none]
inputs: [notes, dataset, document]
output: [outline, article, checklist]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [manuscript, imrad, journal-submission, reporting-guidelines, paper-drafting]
pairs_with:
  prompts: [choose-target-journal, write-methods-section, write-results-section, write-introduction-section, write-discussion-section, write-abstract, check-manuscript-reporting, verify-citations, write-journal-cover-letter]
  personas: [research-methodologist, peer-reviewer]
  rules: [academic-writing-rules]
args:
  - name: study_summary
    description: The study - question, design, participants or materials, analyses, key results (paste the numbers or tables), sources you plan to cite with notes, and any drafts or notes you already have.
    type: text
    required: true
  - name: target_journal
    description: The journal you intend to submit to, with its article type and author guidelines if you have them. If empty, step 1 proposes a shortlist.
    type: string
  - name: slug
    description: Short kebab-case name for the paper, used for the folder the step artifacts are saved in.
    type: string
    default: paper
steps:
  - {id: outline, file: steps/01-outline.md, stage: plan, gate: approve, artifact: "papers/{{slug}}/01-target-and-outline.md"}
  - {id: methods-results, file: steps/02-methods-results.md, stage: build, gate: approve, artifact: "papers/{{slug}}/02-methods-results.md"}
  - {id: intro-discussion, file: steps/03-intro-discussion.md, stage: build, gate: approve, artifact: "papers/{{slug}}/03-introduction-discussion.md"}
  - {id: abstract, file: steps/04-abstract.md, stage: build, gate: approve, artifact: "papers/{{slug}}/04-title-abstract.md"}
  - {id: presubmission, file: steps/05-presubmission.md, stage: review, gate: none, artifact: "papers/{{slug}}/05-presubmission-check.md"}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
Writes a research paper the way experienced authors do: venue and message first, then methods and results while the numbers are fixed, then the introduction and discussion that frame them, then the title and abstract, and finally a check of the whole manuscript as an editor and reviewer would read it. Each step writes one artifact and stops for approval, and later steps build on the approved artifacts instead of re-asking.

<study>
{{study_summary}}
</study>

{{#target_journal}}Target journal: {{target_journal}}. Follow its article type, word limits and section headings throughout, and say where its guidelines are needed but not supplied.{{/target_journal}}

Rules for every step:
- The data and the author's notes are the only source of results. Never invent numbers, participants, findings, references or quotations; mark gaps as [MISSING: ...] and list them at the end of each artifact.
- Cite only sources the author supplied, by the key or reference they gave. Every other claim that needs support gets [CITE: what the source must show].
- Keep claims proportional to the design: causal language only with a design that supports it, and the same conclusion stated the same way in every section.
- Track word counts against the journal's limits, and keep terminology, abbreviations, group names and numbers identical across sections.
- Remind the author once, at the start, to follow the journal's policy on disclosing AI assistance; the author is responsible for every word submitted.
