---
schema: 1
id: critique-data-report
kind: prompt
title: Critique a draft data report's story
description: Reviews a draft data report or analysis write-up for its story - headline, so-what, structure, chart choices, jargon, missing context and overclaiming - and returns a ranked rewrite plan.
category: reporting
version: 1.0.0
status: incubating
stage: [review]
role: [data-analyst, data-scientist, business-analyst, manager]
inputs: [document, text]
output: [checklist, rewrite]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [report-review, data-storytelling, editorial-feedback, pre-send]
pairs_with:
  prompts: [check-report-figures, write-insight-report, anticipate-report-questions]
args:
  - name: draft
    description: The draft report or write-up, including chart titles and a description of each chart (type, what is on each axis).
    type: text
    required: true
  - name: audience
    description: Who will read it and what they need to decide or do. Optional but improves the review.
    type: text
output_contract:
  format: markdown
  sections: [Verdict, Main problems, Section notes, Chart notes, Rewrite plan, Suggested headline]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most analyst reports fail on the story, not the numbers. The common faults are predictable. The finding is buried: the report walks through the method in the order the work was done, and the answer appears on page four. The headline describes a topic ("Q3 churn analysis") instead of stating a finding ("Churn rose because annual plans expired without renewal offers"). There is no so-what: the reader learns a fact but not what it means for their decision. Chart titles name the variables instead of the message, charts are the wrong form for the point (a pie with nine slices, a table where a trend is the message, dual axes that suggest a link), and every chart is kept because it took effort. Numbers lack context: no comparison, baseline, sample size or uncertainty. Correlations are written as causes. Caveats are either missing or so many that the reader cannot tell which matter. Jargon and undefined metric names shut out the actual audience. This review is about those faults; checking the arithmetic is a separate job.
</context>

<task>
<draft>
{{draft}}
</draft>
{{#audience}}

Audience and decision: {{audience}}
{{/audience}}

1. In one sentence, state what you think the report's main finding is. If you cannot tell, that is the first problem.
2. Judge the headline and opening: does the first paragraph give the answer and why it matters to this audience?
3. Judge the structure: does it run answer, evidence, implications, caveats, next steps? Note sections that serve the author's process rather than the reader.
4. Check the claims: causal language without causal evidence, generalising from small or unrepresentative samples, missing comparisons or baselines, and uncertainty left out.
5. Review each chart or table: does the title state the message, is the form right for the point, is there clutter, is it needed at all.
6. Flag jargon, undefined metrics and acronyms for this audience, and caveats that are missing, buried or excessive.
7. Rank the problems by how much they would change the reader's understanding or decision, and turn them into a rewrite plan: new order of sections, cuts, chart changes and wording fixes.
8. Propose a headline and a three-sentence opening built only from the draft's own findings.
</task>

<constraints>
- Critique the story, not the arithmetic; if you notice a number that looks wrong, mention it once and suggest a figures check.
- Do not add findings, numbers or recommendations the draft does not support.
- Be specific: quote the line or name the chart for every point.
- Keep praise short and only where it helps the author keep what works.
</constraints>

<output_format>
## Verdict
Send as is, send after changes, or restructure, with one sentence why.

## Main problems
Ranked list, at most seven, each with the quote or location and the fix.

## Section notes
Bullets by section.

## Chart notes
Table: chart | issue | fix.

## Rewrite plan
Numbered steps in the order to do them.

## Suggested headline
Headline and a three-sentence opening.
</output_format>
