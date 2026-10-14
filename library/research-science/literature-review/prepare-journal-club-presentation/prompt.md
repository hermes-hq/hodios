---
schema: 1
id: prepare-journal-club-presentation
kind: prompt
title: Prepare a journal club presentation
description: Prepares a journal club presentation of one paper with a critical walk through methods and results, discussion questions for the group and a bottom line for practice or research.
category: literature-review
version: 1.0.0
status: incubating
stage: [learn, review]
role: [student, researcher]
requires: [none]
inputs: [document]
output: [outline, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [journal-club, critical-appraisal, paper-presentation, discussion-questions]
pairs_with:
  prompts: [summarize-paper, appraise-study-quality, read-paper-with-me, plan-research-talk]
  personas: [research-methodologist]
args:
  - name: paper
    description: The paper's full text, or at least its abstract, methods, results and discussion.
    type: text
    required: true
  - name: audience
    description: Who attends, for example "first-year PhD students in ecology" or "hospital pharmacists".
    type: string
    required: true
  - name: minutes
    description: Length of your slot, including discussion.
    type: number
    default: 30
output_contract:
  format: markdown
  sections: [Why this paper, Slide plan, Critical appraisal, Discussion questions, Bottom line]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A journal club is not a conference talk about someone else's work. Its purpose is to practise critical reading together and decide what the paper means for the group's practice or research. Weak presentations retell the abstract slide by slide and leave five minutes for "any questions?", which produces silence. Strong ones spend little time on background, show the design in one picture, put the key figure or table on screen and walk the group through it, appraise the study with a checklist that fits its design (for example CONSORT or the relevant CASP or JBI checklist), and come with prepared questions that have more than one defensible answer. They end with a bottom line the group can argue with: would we change what we do, cite it, or replicate it?
</context>

<task>
Prepare a {{minutes}}-minute journal club presentation for {{audience}} on:
<paper>
{{paper}}
</paper>

1. Explain in two or three sentences why this paper is worth the group's time and what the presenter wants them to decide.
2. Identify the study design and the appraisal checklist that fits it.
3. Plan slides with timings: background (brief), question, design diagram, methods that matter for validity, the key figure or table (say which one and what to point at), secondary results, appraisal, discussion, bottom line. Keep at least a third of the time for discussion.
4. Appraise the paper: strengths, validity threats tied to specific methods or numbers, whether conclusions follow from results, and applicability to the audience's setting.
5. Write five to seven discussion questions, ordered from comprehension to judgement, each with a note on what a good answer would consider.
6. Write a provisional bottom line and a one-line alternative view for the group to test it against.
</task>

<constraints>
- Use only the supplied paper. Quote numbers exactly and do not add results, background facts or other studies from memory; mark where background needs a citation.
- If only an abstract is supplied, say the appraisal is limited and flag what the full text must answer.
- Pitch terminology to the audience and define methods terms they may not know.
- Keep timings within the slot.
</constraints>

<output_format>
## Why this paper
Two to three sentences.
## Slide plan
A table: slide | content | minutes | presenter note.
## Critical appraisal
Checklist named, then strengths and threats with page or section references.
## Discussion questions
Numbered, each with a facilitator note.
## Bottom line
The provisional bottom line and the alternative view.
</output_format>
