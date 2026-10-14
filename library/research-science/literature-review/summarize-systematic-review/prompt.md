---
schema: 1
id: summarize-systematic-review
kind: prompt
title: Summarise a systematic review
description: Summarises a published systematic review or meta-analysis into its question, what was included, pooled results, heterogeneity, certainty of evidence and what it changes for practice or research.
category: literature-review
version: 1.0.0
status: incubating
stage: [discover, review]
role: [researcher, student]
requires: [none]
inputs: [document]
output: [summary]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [systematic-review, meta-analysis, grade, evidence-synthesis]
pairs_with:
  prompts: [interpret-forest-plot, summarize-paper, write-critically-appraised-topic]
  personas: [research-methodologist]
args:
  - name: review
    description: The review's full text, or at least the abstract, methods, results (including the summary of findings table) and discussion.
    type: text
    required: true
  - name: purpose
    description: Why you are reading it, for example "deciding whether to update our ward protocol" or "background for a grant".
    type: text
output_contract:
  format: markdown
  sections: [Question and scope, What was included, Main results, Certainty and quality, What it means, Caveats]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Systematic reviews sit at the top of many evidence hierarchies, so their conclusions get quoted without the details that decide what they mean. Readers need different things from a review than from a single study: how current the search is (a review searched five years ago may miss the trials that matter), what was actually included (often fewer, smaller and older studies than the title suggests), whether results were pooled and with what heterogeneity, the certainty of evidence per outcome (often rated with GRADE), and the risk of bias in the included studies. They also need a sense of the review's own quality: a registered protocol, a comprehensive search, duplicate screening and appraisal, and appropriate pooling are what tools such as AMSTAR 2 look for. A conclusion of "no evidence of effect" from three small trials is not "evidence of no effect", and a precise pooled estimate from high-risk studies is not strong evidence.
</context>

<task>
Summarise this systematic review.
<review>
{{review}}
</review>
{{#purpose}}The reader's purpose: {{purpose}}{{/purpose}}

1. State the review question (PICO or equivalent), the review type (systematic review with or without meta-analysis, network meta-analysis, review of qualitative evidence, umbrella review), and the search date.
2. Describe what was included: number of studies and participants, designs, settings and countries, dates, and comparators. Note how much of the evidence comes from the largest one or two studies, if reported.
3. Report the main results per primary outcome with numbers as given: pooled estimate, interval, number of studies and participants, heterogeneity, and any absolute effects. Say which outcomes were not pooled and why.
4. Report the certainty of evidence per outcome if the review rates it, and the reasons for downgrading. Report the overall risk of bias of the included studies.
5. Flag the review's own strengths and weaknesses visible in the text (registered protocol, search breadth, duplicate screening, handling of heterogeneity and publication bias), stating that this is a quick check, not a formal AMSTAR 2 appraisal.
6. Say what it means for the reader's purpose, and how far the review's conclusions follow from its results.
7. List caveats: age of search, gaps in populations or outcomes, conflicts of interest or funding if stated.
</task>

<constraints>
- Use only the text given; copy every number exactly. If the text is an abstract only, say so in the first line and limit the summary.
- Distinguish "no evidence of an effect" from "evidence of no effect", and say which the results support.
- Do not upgrade certainty: if the review rates evidence as low or very low certainty, the summary says so next to the result.
- Do not add newer studies from memory; if the search date is old, say newer evidence may exist and should be searched for.
- Do not give individual medical or policy advice; describe what the evidence supports.
</constraints>

<output_format>
**Citation:** as given. **Review type and search date:** one line.
## Question and scope
One or two sentences.
## What was included
Bullets.
## Main results
Table: outcome | studies (participants) | effect as reported | heterogeneity | certainty.
## Certainty and quality
Bullets.
## What it means
Two to four sentences tied to the purpose.
## Caveats
Bullets.
</output_format>
