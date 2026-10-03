---
schema: 1
id: run-rapid-evidence-review
kind: prompt
title: Run a rapid evidence review
description: Runs a rapid evidence review to a deadline with a tight question, documented shortcuts in search and screening, and findings graded for certainty. For decision-makers who need evidence in weeks.
category: literature-review
version: 1.0.0
status: incubating
stage: [plan, review]
role: [researcher, consultant, business-analyst]
requires: [none]
inputs: [text, document]
output: [plan, report, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [rapid-review, evidence-synthesis, grade, evidence-summary, decision-support]
pairs_with:
  prompts: [write-systematic-review-protocol, build-search-string, screen-studies, appraise-study-quality, write-policy-brief]
  personas: [research-librarian, research-methodologist]
args:
  - name: question
    description: The decision the review must inform and the question behind it, with whoever asked for it and what they will do with the answer.
    type: text
    required: true
  - name: deadline
    description: When the answer is needed and how many people can work on it, for example "3 weeks, one researcher half-time".
    type: string
  - name: evidence
    description: Studies, reviews or abstracts you have already found, pasted with their key details. If given, the review screens, appraises and synthesises them; if empty, it produces the plan only.
    type: text
output_contract:
  format: markdown
  sections: [Scoped question, Rapid review plan, Findings, Limitations of this rapid review, Next steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A rapid review keeps the logic of a systematic review but simplifies chosen steps so evidence arrives in time to matter. The Cochrane Rapid Reviews Methods Group guidance sets the usual shortcuts: involve the requester to narrow the question, prefer existing systematic reviews, limit databases, dates and languages with a reason, have one reviewer screen while a second checks a sample of exclusions, do single extraction and risk-of-bias assessment with verification, and rate certainty with GRADE. The shortcuts are acceptable only if each is stated and its likely effect on the conclusions is reported. Rapid reviews go wrong when the question stays broad, when a narrative of whatever turned up is called a review, and when certainty is overstated to satisfy the requester.
</context>

<task>
Run a rapid evidence review for:
<question>
{{question}}
</question>
{{#deadline}}Deadline and team: {{deadline}}{{/deadline}}
{{#evidence}}
<evidence>
{{evidence}}
</evidence>
{{/evidence}}

1. Scope the question with the requester's decision in mind: write it in PICO (or PEO, SPIDER) form, narrow it to what can be answered in the time, and list what is deliberately left out. If the question is too vague to scope, ask up to three questions and stop.
2. Plan the review in steps sized to the deadline. For each step, state the full systematic-review method, the shortcut taken, and the risk it adds:
   - Search: an "existing reviews first" step (for example Epistemonikos, Cochrane Library, field databases), then two or three primary databases, date and language limits with reasons, and a draft concept-block search with [TERM TO CONFIRM] placeholders.
   - Screening: single reviewer with a second reviewer on 20% of exclusions, or dual screening of a calibration sample.
   - Extraction and risk of bias: a short form, single extraction with verification of key outcomes, and the appraisal tool per design.
   - Synthesis: narrative structured by outcome, meta-analysis only if studies are similar enough and time allows, and GRADE per critical outcome.
3. If evidence was supplied, screen each item against the scoped criteria, extract key data, appraise it briefly, synthesise by outcome and rate certainty. Report what the evidence says, how sure we can be, and what it does not cover.
4. State the limitations the shortcuts introduce and what a full systematic review might change.
</task>

<constraints>
- Without supplied evidence, do not present findings, study counts or effect sizes; give the plan and an empty findings template.
- With supplied evidence, use only what is there. Do not cite studies from memory as if found by the search; label any study you think the search should look for as "to check".
- Every certainty rating follows GRADE domains (risk of bias, inconsistency, indirectness, imprecision, publication bias) with a reason.
- Write the summary so the requester can act on it: lead with the answer and its certainty in plain words.
</constraints>

<output_format>
## Scoped question
The structured question, inclusions, exclusions and what was left out.
## Rapid review plan
A table: step | full method | shortcut | added risk | days. Then the draft search in a code block.
## Findings
If evidence was supplied: a bottom-line summary, then a table per outcome: outcome | studies | effect | certainty (high, moderate, low, very low) | reason. Otherwise the template to fill.
## Limitations of this rapid review
The shortcuts and their likely effect on the conclusions.
## Next steps
What to do next for the decision, and whether a full review is warranted.
</output_format>
