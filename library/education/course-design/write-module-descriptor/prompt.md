---
schema: 1
id: write-module-descriptor
kind: prompt
title: Write a module descriptor
description: Writes a university or college module descriptor ready for validation, with aims, outcomes, indicative content, teaching methods, weighted assessment mapped to outcomes, study hours and reading.
category: course-design
version: 1.0.0
status: incubating
stage: [build, review]
role: [teacher]
requires: [none]
inputs: [notes, text]
output: [docs, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [module-specification, validation, quality-assurance, constructive-alignment, credit-hours, programme-approval]
pairs_with:
  prompts: [write-learning-objectives, plan-course-assessment-mix, write-course-syllabus, build-course-reading-list]
args:
  - name: module_title
    description: Working title of the module.
    type: string
    required: true
  - name: notes
    description: Everything you have - level or year, programme it sits in, what students should be able to do, topics, how it will be taught, ideas for assessment, prerequisites, any template headings your institution requires. Rough notes are fine.
    type: text
    required: true
  - name: credits
    description: Credit value of the module. The default assumes a 10-notional-hours-per-credit scheme (UK CATS); say if yours differs (for example ECTS at 25-30 hours).
    type: number
    default: 15
output_contract:
  format: markdown
  sections: [Module summary, Learning outcomes, Indicative content, Teaching and learning, Study hours, Assessment, Outcome to assessment map, Reading, Panel notes]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A module descriptor is a contract read by validation panels, external examiners, students and future colleagues. Panels send descriptors back for predictable reasons: outcomes that use "understand" or "appreciate", outcomes not mapped to any assessment, assessment that over-assesses for the credit, study hours that do not add up, content lists that are a lecture plan, outcomes pitched at the wrong level, and reading lists that are out of date or impossible to access. A good descriptor is concise, stable for several years (so content is "indicative"), and internally consistent.

Module: {{module_title}}. Credits: {{credits}}.
</context>

<task>
<notes>
{{notes}}
</notes>

1. Identify the level (for example first year, final year, master's) and the qualification framework descriptors that apply; pitch outcome verbs to it (identify and describe at entry level; analyse and apply in the middle; evaluate, synthesise and create at final year and master's).
2. Write a two- or three-sentence summary and two to four aims.
3. Write four to six learning outcomes as "On successful completion, students will be able to..." with one observable verb each. Split compound outcomes.
4. Write indicative content as five to eight themed headings, not a weekly schedule.
5. Describe the teaching and learning approach and how it supports the outcomes.
6. Calculate notional study hours as {{credits}} x 10 unless the notes give another ratio, split into scheduled teaching, guided independent study and assessment preparation. Totals must match.
7. Specify assessment: components, type, weighting, length or duration, and which outcomes each assesses; include formative assessment. Check every outcome is assessed and the volume is proportionate to {{credits}} credits.
8. Add prerequisites, an indicative reading list structure (two to four essential, more recommended), and accessibility and inclusive practice notes.
9. Note anything a panel will query and the decision it needs from the module leader.
</task>

<constraints>
- Use only what the notes give for topics, methods and assessment ideas; fill obvious gaps with clearly labelled suggestions.
- Do not invent books, authors, editions or URLs. Write reading entries as "[Core text on X - module leader to supply]" unless the notes name them.
- Do not invent institutional rules (word counts per credit, pass marks, resit rules); mark them [check your regulations].
- If the institution's template headings are given, use them in that order instead of the default headings, keeping the content.
- If the notes do not say what students will learn or the level, ask for those two things and stop.
</constraints>

<output_format>
## Module summary
Title, level, credits, prerequisites, summary, aims.
## Learning outcomes
Numbered.
## Indicative content
Bullets.
## Teaching and learning
Short paragraph.
## Study hours
Table: Activity | Hours. Total row equal to the notional hours.
## Assessment
Table: Component | Type | Weight | Length or duration | Outcomes assessed. Then a formative assessment line.
## Outcome to assessment map
Table: Outcome | Component(s).
## Reading
Essential and recommended, with placeholders.
## Panel notes
Bullets: likely queries and decisions needed.
</output_format>
