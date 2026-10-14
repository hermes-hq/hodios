---
schema: 1
id: assess-referee-report-quality
kind: prompt
title: Assess the quality of a referee report
description: Rates a referee report as a handling editor would, for coverage, specificity, evidence, tone and fit with the recommendation, and drafts reviewer feedback or a weighting note.
category: peer-review
version: 1.0.0
status: incubating
stage: [review]
role: [editor, researcher]
requires: [none]
inputs: [text, document]
output: [report, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [referee-report, editorial-process, reviewer-feedback, review-quality]
pairs_with:
  prompts: [write-meta-review, write-editor-decision-letter, fix-review-tone]
args:
  - name: report
    description: The referee report, including any confidential comments to the editor.
    type: text
    required: true
  - name: manuscript_summary
    description: A short summary of the manuscript and its main methods, so coverage can be judged.
    type: text
    required: true
  - name: purpose
    description: Why you are assessing it, for example "decide how much weight to give it", "feedback to a trainee reviewer" or "reviewer database rating".
    type: string
output_contract:
  format: markdown
  sections: [Ratings, Strengths of the report, Problems, Weight in the decision, Feedback to the reviewer]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Editors routinely receive reports that are too short to be useful, that review a different paper than the one submitted, that recommend rejection with only minor comments (or acceptance despite major ones), that ask for the reviewer's own work to be cited, that are hostile, or that look machine-generated: generic praise and criticism that would fit any paper. Validated instruments such as the Review Quality Instrument rate whether a report discusses importance, originality, methods, presentation and interpretation, and whether comments are constructive and substantiated. An editor needs a quick judgement of how much weight a report deserves, and sometimes feedback for a trainee or a note for the reviewer database. Problems in a report are judged on the text, not on who wrote it.
</context>

<task>
Assess this referee report{{#purpose}} in order to {{purpose}}{{/purpose}}.
<report>
{{report}}
</report>
<manuscript_summary>
{{manuscript_summary}}
</manuscript_summary>

1. Rate the report on: coverage of importance and originality, methods, results and interpretation, and presentation; specificity (locations and concrete requests); substantiation (reasons given); constructiveness; tone; and consistency between comments and recommendation. Use a 1 to 5 scale with a one-line reason each.
2. Name what the report does well.
3. Name problems: missed areas given the manuscript's methods, unsupported claims, requests beyond the paper's scope, apparent self-citation requests, tone problems, and signs of generic text that do not engage with this manuscript.
4. Judge how much weight the report should carry in the decision, and which of its points the editor should pass to the authors as essential, optional or not at all.
5. If the purpose calls for it, draft short, respectful feedback to the reviewer.
</task>

<constraints>
- Judge the report on its text; do not speculate about the reviewer's identity or motives.
- Say "possible" rather than certain when flagging self-citation requests or generic machine-like text; explain the signal.
- Do not judge the manuscript itself beyond what the summary supports.
- Feedback to the reviewer thanks them once, is specific, and suggests at most three improvements.
</constraints>

<output_format>
## Ratings
A table: dimension | score | reason.
## Strengths of the report
Bullets.
## Problems
Numbered.
## Weight in the decision
Two or three sentences, then each point labelled essential, optional or drop.
## Feedback to the reviewer
A short message, or "Not requested".
</output_format>
