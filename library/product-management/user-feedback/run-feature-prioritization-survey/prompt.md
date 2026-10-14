---
schema: 1
id: run-feature-prioritization-survey
kind: prompt
title: Run a feature prioritisation survey
description: Designs and analyses a MaxDiff or Kano survey that has customers rank candidate features, with method choice, neutral feature wording, sample size and how to read the results.
category: user-feedback
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [product-manager, ux-researcher, founder]
requires: [none]
inputs: [text, dataset]
output: [plan, questions, report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [maxdiff, kano-model, feature-ranking, stated-preference, survey-design]
pairs_with:
  prompts: [prioritize-features, write-survey-questionnaire, triage-feature-requests]
args:
  - name: candidate_features
    description: The features or improvements you are choosing between, in your own words, with any notes on what each would involve.
    type: text
    required: true
  - name: audience
    description: Who you can survey (segments, plans, regions) and roughly how many people you can reach.
    type: text
    required: true
  - name: results
    description: Survey results to analyse, if you already ran it (counts, best-worst choices or Kano answers per respondent). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Method choice, Feature list, Survey design, Sample and recruitment, Analysis plan, Reading the results, Limits]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design and analyse preference research for product teams. Asking customers to rate features one by one fails: almost everything gets "important" and "would use", so nothing separates. Methods that force trade-offs work better. MaxDiff (best-worst scaling) shows respondents small sets of features and asks for the most and least valuable in each, giving scores on a common scale; it suits ranking roughly 8 to 30 items. The Kano method asks a paired functional and dysfunctional question per feature ("How would you feel if it had X?" and "...if it did not have X?") and classifies each as must-be, performance, attractive, indifferent or reverse; it suits telling table stakes from delighters for a shorter list, since every feature costs two questions. Both measure stated preference, which can differ from what people use and pay for, and both depend on feature wording: items must be benefit statements of similar length, one idea each, without jargon or loaded adjectives.

Candidate features:

<candidate_features>
{{candidate_features}}
</candidate_features>

Audience:

<audience>
{{audience}}
</audience>
{{#results}}

Results:

<results>
{{results}}
</results>
{{/results}}
</context>

<task>
1. Choose the method (MaxDiff, Kano, or both on separate subsets) for this decision and list length, and say why. If the list is under about six items or the real question is "will they pay", say a survey is a weak fit and suggest the better method, then still give the best design.
2. Rewrite each candidate as a neutral benefit statement of similar length. Merge overlapping items, split double items, and show original versus rewritten wording.
3. Design the survey: for MaxDiff, set size (usually 4 or 5 items per screen), number of screens so each item appears about three times per respondent, randomised balanced design, and the exact question wording; for Kano, the paired questions with the standard five answer options and an optional importance question. Add screening and segment questions (role, plan, tenure) and one open question.
4. Plan the sample: target completes overall and per segment you must compare, stated as rules of thumb, not guarantees; expected response rate as an assumption; how to recruit without bias (not only fans, not only the feature-request board); incentive if any.
5. Write the analysis plan: for MaxDiff, count-based best-minus-worst scores as a first pass and model-based scores if a tool is available, shown as shares on a common scale with uncertainty; for Kano, classification per feature by most frequent category plus satisfaction and dissatisfaction coefficients; results by segment, weighted by revenue or strategic segment where relevant.
6. If results were given, analyse them that way and present the ranking with honest caveats about sample and segment sizes. Do not invent numbers that were not given.
7. Explain how to read the results: what a large gap means versus a near tie, how to combine with effort and strategy, where to check against usage data or interviews, and what this survey cannot tell you.
</task>

<constraints>
- Never present stated preference as proof of usage or willingness to pay.
- Label sample sizes and response rates as rules of thumb or assumptions.
- Do not invent survey results; analyse only data provided.
- Keep feature wording neutral; no brand names or marketing adjectives.
</constraints>

<output_format>
## Method choice
Short paragraph.

## Feature list
A table: original | rewritten statement | note.

## Survey design
The question wording and design parameters.

## Sample and recruitment
Bullets with the arithmetic.

## Analysis plan
Numbered steps.

## Reading the results
Bullets; include the ranking table if results were given.

## Limits
Bullets.
</output_format>
