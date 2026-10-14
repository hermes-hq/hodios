---
schema: 1
id: interpret-forest-plot
kind: prompt
title: Interpret a forest plot from a meta-analysis
description: Walks a reader through a published meta-analysis forest plot, covering scale and null line, study weights, the pooled estimate, heterogeneity and what conclusion the plot can support.
category: literature-review
version: 1.0.0
status: incubating
stage: [review, learn]
role: [researcher, student]
requires: [none]
inputs: [image, document]
output: [explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [meta-analysis, forest-plot, heterogeneity, evidence-synthesis]
pairs_with:
  prompts: [summarize-systematic-review, interpret-paper-statistics, appraise-study-quality]
  personas: [research-methodologist]
args:
  - name: plot
    description: The forest plot. Attach the image if your tool accepts images, or transcribe it - study names, estimates, intervals, weights, the pooled line, heterogeneity statistics and the axis labels (which side favours what).
    type: text
    required: true
  - name: question
    description: What you want from it, for example "does this support using the drug?" or "I need to explain this in journal club".
    type: text
output_contract:
  format: markdown
  sections: [How to read this plot, Study by study, Pooled result, Heterogeneity, What it supports, What the plot cannot tell you]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A forest plot packs a meta-analysis into one figure, and most of its meaning is in details readers skip. Each row is a study: the square is its estimate, its size shows its weight, and the line is its confidence interval. The vertical line of no effect sits at 1 for ratios (odds, risk, hazard ratios, shown on a log scale) and at 0 for differences (mean or standardised mean differences). The labels under the axis say which side favours which group, and they are sometimes reversed from what readers expect. The diamond is the pooled estimate, its width the pooled interval; some plots add a prediction interval showing where the effect in a new setting might fall. Heterogeneity (I-squared, tau-squared, the Q test) says how much the studies disagree beyond chance, and with high heterogeneity a single pooled number may hide real differences. Common misreadings: counting "significant" studies, ignoring that one large study dominates, reading fixed-effect and random-effects results as interchangeable, and treating a precise diamond as high-certainty evidence when the studies are at high risk of bias.
</context>

<task>
Interpret this forest plot.
<plot>
{{plot}}
</plot>
{{#question}}The reader wants: {{question}}{{/question}}

1. Identify the outcome, the comparison, the effect measure, the scale (log or linear), where the line of no effect is, and which side favours which group according to the labels. Check that the labels agree with the outcome's direction (for example whether a higher score is better or worse and which group was subtracted from which) and flag any mismatch for checking in the paper.
2. Go through the studies: how many, which carry most weight and why (size, events, precision), which intervals cross the line of no effect, and any study that sits apart from the others.
3. Read the pooled estimate and its interval in plain words, including the model (fixed-effect or random-effects) if stated, and the prediction interval if shown.
4. Interpret heterogeneity: the I-squared and other statistics as given, what level of inconsistency they suggest, whether it shows by eye, and any subgroup results with a test for subgroup differences.
5. Say what conclusion the plot supports and how strongly, and what further information the conclusion depends on.
6. List what the plot cannot show: risk of bias in the included studies, publication bias (unless a funnel plot or test is given), the certainty of evidence, the size of effect that matters, and applicability.
</task>

<constraints>
- Read values only from what is provided. If something is unreadable or missing (axis labels, weights, the model), say so instead of guessing; never infer the favoured side from colour or position alone.
- Do not vote-count significant studies; explain why the pooled estimate and interval matter more.
- Keep conclusions at the strength the plot allows. Mention that certainty also depends on risk of bias, inconsistency, imprecision, indirectness and publication bias (the GRADE domains).
- If the plot reports ratios, do not convert to absolute effects unless a baseline risk is given; then show the calculation.
- Do not give personal medical or policy advice from the plot.
</constraints>

<output_format>
## How to read this plot
Bullets: outcome, comparison, measure, scale, line of no effect, which side favours what.
## Study by study
Short paragraph or table: study | weight | estimate and interval as given | note.
## Pooled result
Two to three sentences.
## Heterogeneity
Two to three sentences.
## What it supports
Two to three sentences.
## What the plot cannot tell you
Bullets.
</output_format>
