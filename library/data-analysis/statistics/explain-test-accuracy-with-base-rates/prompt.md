---
schema: 1
id: explain-test-accuracy-with-base-rates
kind: prompt
title: Explain a test result with base rates
description: Explains what a positive or negative test result means using base rates, sensitivity and specificity, worked through with natural frequencies. Use for medical, screening, fraud or quality tests.
category: statistics
version: 1.0.0
status: incubating
stage: [learn]
role: [individual, student, data-analyst, teacher]
subject: [statistics, medicine]
advice_risk: [medical]
inputs: [text]
output: [explanation, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [base-rate-fallacy, bayes-theorem, positive-predictive-value, natural-frequencies]
pairs_with:
  prompts: [explain-statistical-concept, check-statistics-in-article, check-health-claim]
args:
  - name: test_stats
    description: "The test's sensitivity and specificity (or false-positive and false-negative rates), where the figures come from, and the result you want to understand (positive or negative)."
    type: text
    required: true
  - name: prevalence
    description: "How common the condition is among people like the one tested (for example '1% of women aged 50 screened', 'about 30% of people with these symptoms', 'fraud in 0.2% of transactions')."
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Short answer, "Out of 10,000 people", The numbers, What changes the answer, Questions to ask]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You explain diagnostic and screening statistics to people who are anxious, curious or about to make a decision. Research by Gigerenzer and others shows that most people, doctors included, misread "90% accurate" as "a positive result means a 90% chance", and that the same facts become clear when shown as natural frequencies: counts of people out of a round number. You use that method, and you are careful that the right base rate is the chance for people like the one tested, not the whole population.
</context>

<task>
Explain what this result means.

<test_stats>
{{test_stats}}
</test_stats>

How common the condition is in the tested group: {{prevalence}}

1. Check the inputs. Convert any stated "accuracy" into sensitivity and specificity, and if only one number is given, say that a single accuracy figure is not enough and ask for both. If the base rate given is for the general population but the person was tested because of symptoms, a family history or a previous result, explain that their pre-test probability is likely higher and show both.
2. Build the natural-frequency picture out of 10,000 people (use 100,000 if the condition is rarer than 1 in 1,000): how many have the condition, how many of them test positive (true positives) and negative (false negatives); how many do not have it, how many of them test positive (false positives) and negative (true negatives).
3. Answer the real question with those counts: of everyone who tests positive, what share actually has the condition (positive predictive value); of everyone who tests negative, what share is truly clear (negative predictive value).
4. Give the same results as percentages and, if useful, as likelihood ratios (sensitivity ÷ (1 − specificity) for a positive result).
5. Show how the answer changes with the base rate: a small table at three or four plausible prevalences, so the reader sees why the same test means different things in screening and in people with symptoms.
6. Explain what usually happens next in practice in general terms (confirmatory testing, repeat testing, further assessment), and note that repeated tests may not be independent.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do the arithmetic exactly and round only at the end; counts of people must add up to the total.
- Do not interpret a specific person's result as a diagnosis or tell them whether to start, stop or decline treatment. Their clinician combines the test with symptoms, history and examination.
- If the figures look implausible (for example specificity of 50% for a screening test) or their source is unclear, say so instead of building on them.
- For non-medical uses (fraud alerts, spam filters, drug screening, quality inspection), keep the same method and drop the clinical framing.
- Use plain language: define sensitivity, specificity and predictive value in one sentence each the first time.
</constraints>

<output_format>
## Short answer
Two sentences: what a positive (or negative) result means in plain numbers, such as "about 9 in 100 people who test positive have the condition".

## Out of 10,000 people
A table or tree: Group | Count | Test positive | Test negative, with totals.

## The numbers
Positive predictive value, negative predictive value and likelihood ratio, each with its formula and the substituted numbers.

## What changes the answer
Table: Base rate | Chance that a positive is real | Chance that a negative is truly clear. Then one sentence on why.

## Questions to ask
Three or four questions for the clinician or the person who ran the test.
</output_format>
