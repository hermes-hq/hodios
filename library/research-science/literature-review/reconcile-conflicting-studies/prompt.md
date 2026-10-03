---
schema: 1
id: reconcile-conflicting-studies
kind: prompt
title: Reconcile conflicting studies
description: Explains why studies on the same question disagree by comparing populations, interventions, measures, designs, analyses, bias and chance, and says what evidence would settle it.
category: literature-review
version: 1.0.0
status: incubating
stage: [review, learn]
role: [researcher, student, individual]
requires: [none]
inputs: [document, text]
output: [explanation, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [conflicting-evidence, heterogeneity, effect-modification, study-comparison, evidence-appraisal]
pairs_with:
  prompts: [appraise-study-quality, build-literature-matrix, read-paper-with-me, plan-meta-analysis]
  personas: [research-methodologist]
args:
  - name: studies
    description: The studies that disagree - abstracts, methods and results sections, or your notes - with each one's population, design, measures and main numbers if you have them.
    type: text
    required: true
  - name: question
    description: The question they seem to answer differently, for example "Does intermittent fasting lead to more weight loss than daily calorie restriction?".
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Do they really conflict, Side-by-side comparison, Likely explanations, What would settle it, Bottom line]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
When two studies seem to give opposite answers, the explanation is usually in the details: they studied different people, compared different things, measured outcomes differently or at different times, used designs with different vulnerability to bias, or were too small for either result to be reliable. Sometimes the "conflict" is only in the headlines and the confidence intervals overlap. Readers often pick the study they prefer or average the two; a careful reader works out which differences could produce the disagreement, which study better answers their own question, and what evidence would resolve it.
</context>

<task>
Explain the disagreement between these studies on the question below.
<question>
{{question}}
</question>
<studies>
{{studies}}
</studies>

1. Check whether they truly conflict. Compare effect sizes and confidence intervals, not just "significant" versus "not significant"; overlapping intervals or the same direction with different precision may mean no real conflict. Check whether they answer the same question at all.
2. Compare the studies element by element: population and setting; intervention or exposure (dose, duration, delivery, adherence); comparator; outcome definition, measurement tool and timing; design; sample size and power; analysis choices (adjustment set, handling of missing data, per-protocol versus intention-to-treat, subgroups); risk of bias; funding and conflicts of interest; publication date and context.
3. For each difference, judge whether it could plausibly produce the disagreement and in which direction, and rank the explanations from most to least plausible. Name effect modification (a real difference between populations or contexts) separately from bias and chance.
4. Say which study better answers the question as the user stated it, and why, without dismissing the other.
5. Say what would settle it: a specific analysis, a study design, a subgroup, or an existing kind of evidence such as a systematic review.
</task>

<constraints>
- Use only details in the supplied material. Where a detail needed for the comparison is missing, say "not reported in what you gave me" instead of guessing.
- Do not decide by design hierarchy alone; a large observational study can be more informative than a tiny trial for some questions. Explain the trade-off.
- Keep claims proportionate: "could explain" rather than "explains" unless the material shows it.
- Name funding or conflicts only as a reason to look harder, not as proof of bias.
</constraints>

<output_format>
## Do they really conflict
Two or three sentences with the numbers.
## Side-by-side comparison
A table: element | study A | study B (more columns if more studies) | could this explain the disagreement?
## Likely explanations
Ranked list, each with the reasoning and its direction of effect.
## What would settle it
Specific analyses or studies.
## Bottom line
What a careful reader should conclude now, in plain language, with the remaining uncertainty.
</output_format>
