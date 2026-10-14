---
schema: 1
id: review-manuscript-figures
kind: prompt
title: Review a manuscript's figures and tables
description: Reviews a manuscript's figures and tables as a referee, checking they match the text, show the data honestly, report error bars and sample sizes, and can be read without the main text.
category: peer-review
version: 1.0.0
status: incubating
stage: [review]
role: [researcher, editor]
requires: [none]
inputs: [document, image]
output: [report, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [figures, error-bars, data-presentation, image-integrity, manuscript]
pairs_with:
  prompts: [write-peer-review, screen-manuscript-for-integrity-issues, review-statistical-methods]
  personas: [peer-reviewer]
args:
  - name: figures
    description: The figures (attached or described in detail) and tables, with their legends, plus the results text that refers to them.
    type: text
    required: true
  - name: field
    description: Optional. The field, so field conventions apply, for example "cell biology" or "economics".
    type: string
output_contract:
  format: markdown
  sections: [Overall, Figure-by-figure issues, Consistency with the text, Integrity flags, Requests to authors]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Figures are where many readers form their view of a paper, and where many errors and some misconduct are found. Experienced referees check figures as data, not decoration. Recurring problems: bar charts of means that hide the distribution when n is small (show the individual points); error bars that are not defined (standard deviation, standard error and confidence intervals mean very different things) or not tied to an n; n that counts technical replicates as independent samples; axes truncated or broken without a mark, log scales unlabelled, or panels compared on different scales; "representative" images with no description of how they were chosen or quantified; numbers in a table that do not add up to the total or disagree with the text or abstract; colour schemes unreadable for colour-blind readers; and legends that do not say what was measured, in whom, and with which test. Image integrity concerns (duplicated panels, spliced bands, cloned regions) belong in confidential comments to the editor, with exact locations, not in the authors' report as accusations.
</context>

<task>
Review these figures and tables{{#field}} for a {{field}} paper{{/field}}.
<figures>
{{figures}}
</figures>

1. Give an overall view: do the figures carry the main findings, and is anything key missing or redundant?
2. For each figure and table, check: what is plotted and whether the chart type suits it; axes, scales and units; error bars defined and n stated (and whether n is biological or technical); individual data shown where n is small; statistical annotations defined; legend self-sufficient; readability, including colour-blind safety and font size.
3. Check consistency: numbers in figures and tables against the text, abstract and each other; totals that add up; percentages against their denominators.
4. Note anything that looks like a possible image or data integrity issue, with exact panel locations, for the editor only.
5. List concrete requests to the authors, numbered and tied to figure panels.
</task>

<constraints>
- Refer to figures by number and panel. Quote the values you compare.
- Do not recompute statistics you cannot see the data for; ask for the data or analysis instead.
- Treat apparent duplication or manipulation as a possible concern needing editorial checks, not a finding of misconduct, and keep it out of the author-facing requests.
- Follow field conventions where they differ (for example blots, micrographs, regression tables).
- If figures were described rather than shown, say that some checks were not possible.
</constraints>

<output_format>
## Overall
## Figure-by-figure issues
Table: figure or table | issue | why it matters | request.
## Consistency with the text
Bullets with the conflicting values.
## Integrity flags
For the confidential comments to the editor, or "None seen".
## Requests to authors
Numbered.
</output_format>
