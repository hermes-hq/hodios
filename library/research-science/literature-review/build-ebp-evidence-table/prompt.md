---
schema: 1
id: build-ebp-evidence-table
kind: prompt
title: Build an evidence table for an EBP project
description: Builds an evidence table for a nursing or allied health evidence-based practice project, rating each source's level and quality on a named hierarchy such as Johns Hopkins.
category: literature-review
version: 1.0.0
status: incubating
stage: [review]
role: [student, researcher]
subject: [healthcare]
requires: [none]
inputs: [document, notes]
output: [table, summary]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [evidence-based-practice, evidence-table, levels-of-evidence, johns-hopkins, nursing-research]
pairs_with:
  prompts: [write-critically-appraised-topic, appraise-study-quality, build-literature-matrix]
  personas: [research-methodologist]
args:
  - name: question
    description: The EBP question, ideally in PICO form, for example "In adult inpatients (P), does hourly rounding (I) compared with usual care (C) reduce falls (O)?"
    type: text
    required: true
  - name: sources
    description: The sources to tabulate, with full text or at least methods and results for each. Include guidelines, reviews, studies and quality-improvement reports.
    type: text
    required: true
  - name: hierarchy
    description: The level-of-evidence scheme your programme or organisation uses.
    type: enum
    enum: [johns-hopkins, melnyk-fineout-overholt, oxford-cebm, other]
    default: johns-hopkins
  - name: template
    description: Your required table columns, if your programme supplies a template.
    type: text
output_contract:
  format: markdown
  sections: [Question, Evidence table, Level and quality summary, Synthesis, Practice recommendation, Gaps and next steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Evidence-based practice projects in nursing and allied health (practice change proposals, DNP and capstone projects, unit-level quality work) are built on an evidence table: one row per source with its design, sample, findings, and a level and quality rating on the hierarchy the organisation uses. In the Johns Hopkins model, levels run from I (experimental studies such as RCTs, and systematic reviews of RCTs) through II (quasi-experimental studies, and systematic reviews of quasi-experimental studies alone or mixed with RCTs), III (non-experimental and qualitative studies, and systematic reviews that include them), IV (clinical practice guidelines and consensus statements from recognised expert bodies) to V (literature reviews, quality improvement and programme evaluations, case reports, and expert opinion based on experience), with quality rated A (high), B (good) or C (low or major flaws) using the model's appraisal tools. Melnyk and Fineout-Overholt use seven levels: I systematic reviews or meta-analyses of RCTs, II single well-designed RCTs, III controlled trials without randomisation, IV case-control and cohort studies, V systematic reviews of descriptive and qualitative studies, VI single descriptive or qualitative studies, VII expert opinion. Common mistakes: rating a source by what it calls itself rather than its design, rating level and calling it quality, giving a guideline a research level, rating from the abstract, and a synthesis that counts sources instead of weighing them. Hierarchies are updated between editions, so the user's programme version governs.
</context>

<task>
Build an evidence table using the {{hierarchy}} hierarchy for this question:
<question>
{{question}}
</question>
{{#template}}
Required columns:
{{template}}
{{/template}}
<sources>
{{sources}}
</sources>

1. Restate the question in PICO form and note anything vague that would affect inclusion.
2. For each source, extract: citation as given, purpose, design (from the methods, not the label), setting and sample, intervention or exposure, outcomes and measures, key findings with numbers as reported, and limitations.
3. Assign the level on the chosen hierarchy with a one-line reason tied to the design. For "other", ask for the scheme's levels or use a clearly labelled generic design-based ranking.
4. Assign quality using the hierarchy's quality criteria (for Johns Hopkins A, B or C), giving the main reasons. Mark ratings made on limited text as provisional.
5. Summarise the body of evidence: counts by level and quality, consistency of findings, and an overall strength judgement in the hierarchy's own terms (for Johns Hopkins, along the lines of strong and compelling with consistent results, good and consistent, good but conflicting, or little or no evidence).
6. Synthesise by outcome, weighing higher-level and higher-quality sources more, and noting where findings disagree.
7. State a practice recommendation at the strength the evidence allows (for example consider a pilot, change practice, do not change practice, more evidence needed), with organisational fit and feasibility to check.
</task>

<constraints>
- Extract only from the text given; copy numbers exactly. Never fill a cell from memory; write "not reported".
- Rate design from the methods. If a source's label and methods disagree, rate the methods and note it.
- Rating quality needs the methods; a rating from an abstract alone is provisional and must be labelled so.
- Say that ratings should be checked against the hierarchy edition and appraisal tools the programme requires, and ideally done independently by two people.
- The recommendation informs a practice change process; it does not replace organisational approval, local policy or clinical judgement.
</constraints>

<output_format>
## Question
PICO and any notes.
## Evidence table
Table with the required columns, or: source | design | sample and setting | intervention | outcomes | key findings | limitations | level | quality.
## Level and quality summary
Counts and a one-line overall rating.
## Synthesis
Short paragraphs by outcome.
## Practice recommendation
Two or three sentences.
## Gaps and next steps
Bullets.
</output_format>
