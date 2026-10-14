---
schema: 1
id: check-causal-claim
kind: prompt
title: Check whether X really causes Y
description: Checks a claim that one thing causes another against the kind of evidence behind it, testing confounding, reverse causation, chance, dose-response and other causal criteria.
category: fact-checking
version: 1.0.0
status: incubating
stage: [verify]
role: [writer, editor, student, individual]
requires: [none]
inputs: [text, url]
output: [report, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [correlation-causation, confounding, bradford-hill, reverse-causation, natural-experiments]
pairs_with:
  prompts: [check-statistics-in-article, check-science-news-against-paper, check-health-claim]
  personas: [fact-checker]
args:
  - name: claim
    description: The causal claim as you saw it, for example "screen time causes depression in teenagers" or "the new bike lanes caused the fall in road deaths".
    type: text
    required: true
  - name: evidence
    description: The study, data or article the claim relies on, pasted or linked, or "none given".
    type: text
output_contract:
  format: markdown
  sections: [Verdict, The claim and its evidence, Alternative explanations, Causal criteria, Accurate wording]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most causal claims in the news rest on associations. An association can come from a real effect, but also from confounding (a third factor drives both), reverse causation (Y leads to X), selection (who ends up in the data), chance across many comparisons, or regression to the mean (things measured at a peak tend to fall anyway, which flatters any intervention started at that moment). Randomised experiments remove most of these; well-designed natural experiments, difference-in-differences, instrumental variables and regression discontinuity can come close if their assumptions hold. For observational evidence, the Bradford Hill considerations help structure a judgement: strength, consistency across settings and methods, temporality (cause before effect, the one essential criterion), dose-response, plausible mechanism, coherence with other knowledge, experimental evidence, and specificity. None is a checklist that proves causation; together they show how much weight the claim can bear. A small effect in a big observational study is especially vulnerable to residual confounding.
</context>

<task>
Check this causal claim.
<claim>
{{claim}}
</claim>
{{#evidence}}
<evidence>
{{evidence}}
</evidence>
{{/evidence}}

1. Restate the claim precisely: cause, effect, population, size of effect and direction. Note words that signal causation ("causes", "leads to", "boosts", "because of").
2. Identify the design behind it (randomised trial, natural experiment, cohort, case-control, cross-sectional, before-and-after, time-series, anecdote) and what that design can and cannot show.
3. List the alternative explanations that fit the data: named confounders, reverse causation, selection, chance and multiple comparisons, regression to the mean, and other changes happening at the same time.
4. Go through the causal criteria that apply, saying for each whether the evidence supports, weakens or does not address it.
5. Give a verdict and rewrite the claim so it says exactly what the evidence supports.
</task>

<constraints>
- Work from the evidence supplied. If none is given, judge what kind of evidence would be needed and do not invent studies or numbers; if you have web access, cite only pages you opened.
- Name specific plausible confounders for this case, not a generic "other factors".
- Do not overcorrect: when the evidence is strong (consistent trials, or many designs pointing the same way), say the causal claim is supported.
- For health claims, give no personal medical advice; for policy claims, take no side on the policy itself.
- Explain terms like confounding and regression to the mean in plain words the first time.
</constraints>

<output_format>
## Verdict
One of: causation well supported, plausible but not established, association only, or not supported. Then two sentences.
## The claim and its evidence
The precise claim and the design behind it.
## Alternative explanations
Bullets, each with how likely it is here and what would rule it out.
## Causal criteria
Table: criterion | what the evidence shows | supports, weakens or not addressed.
## Accurate wording
One or two sentences that say what the evidence supports.
</output_format>
