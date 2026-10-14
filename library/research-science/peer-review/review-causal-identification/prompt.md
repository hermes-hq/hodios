---
schema: 1
id: review-causal-identification
kind: prompt
title: Referee a paper's causal identification strategy
description: Referees the identification strategy of an observational paper, such as difference-in-differences, IV or regression discontinuity, and lists the tests that would make its causal claim credible.
category: peer-review
version: 1.0.0
status: incubating
stage: [review]
role: [researcher, data-scientist]
requires: [none]
inputs: [document]
output: [report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [causal-inference, econometrics, difference-in-differences, instrumental-variables, regression-discontinuity, manuscript]
pairs_with:
  prompts: [review-statistical-methods, estimate-causal-effect, write-peer-review]
  personas: [statistician, peer-reviewer]
args:
  - name: paper
    description: The paper's research design, data, identification and results sections, including robustness tables.
    type: text
    required: true
  - name: field
    description: The field and venue, for example "applied microeconomics, field journal" or "health policy".
    type: string
output_contract:
  format: markdown
  sections: [The causal claim, Identifying assumption, Threats, Requested analyses, Interpretation and external validity, Overall assessment]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
In economics, policy and epidemiology, referee reports centre on identification: what variation identifies the effect, and what must be true for it to be causal. Each design has known weak points. Difference-in-differences needs parallel trends (pre-trends shown, not just asserted) and, with staggered adoption, two-way fixed effects can be biased by heterogeneous effects, so modern estimators or event studies are expected; anticipation and composition changes also matter. Instrumental variables need relevance (first-stage strength, not just significance) and exclusion (argued, since it cannot be tested), and estimate a local effect for compliers. Regression discontinuity needs no manipulation of the running variable (density tests), balance of covariates at the cutoff, and sensible bandwidth and functional form choices. Synthetic control needs good pre-period fit and placebo inference. Across designs: clustering at the level of treatment assignment, few treated clusters, multiple outcomes, and specification searching. A good referee names the identifying assumption in one sentence, says which threat is most serious here, and asks for the specific test that would address it.
</context>

<task>
Referee the identification in this paper{{#field}} ({{field}}){{/field}}.
<paper>
{{paper}}
</paper>

1. State the causal claim and the estimand (for example average effect on the treated, local effect for compliers) in one or two sentences.
2. Name the design and state its identifying assumption in plain words, applied to this setting.
3. Assess the evidence for the assumption that the paper provides, and list the threats specific to this setting, ranked by how much they could change the conclusion.
4. Check inference: clustering level versus assignment, number of clusters, and multiple-hypothesis concerns.
5. Request specific analyses for each major threat (for example an event-study plot, a heterogeneity-robust estimator, first-stage F statistics, a density test, placebo outcomes or placebo cutoffs, alternative bandwidths, randomisation inference), and say what result would reassure.
6. Judge the interpretation: whether the estimand matches the policy claim, and how far the result generalises.
7. Give an overall assessment of whether the causal claim is credible now, credible with the requested analyses, or not supportable with this design.
</task>

<constraints>
- Name assumptions as untestable when they are (exclusion restrictions, parallel trends after treatment) and ask for argument and indirect evidence, not proof.
- Do not demand a different design unless the current one cannot identify the effect; explain why if so.
- Do not invent estimates, test statistics or institutional facts about the setting; ask the authors for them.
- Each request says what result would reassure and what would not.
- Remind the reviewer that the paper is confidential and to check the venue's AI-use policy.
</constraints>

<output_format>
One reminder line, then:
## The causal claim
## Identifying assumption
## Threats
Numbered, most serious first.
## Requested analyses
Numbered: analysis, which threat it addresses, what would reassure.
## Interpretation and external validity
## Overall assessment
One line, then the reasons.
</output_format>
