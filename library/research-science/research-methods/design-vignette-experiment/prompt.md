---
schema: 1
id: design-vignette-experiment
kind: prompt
title: Design a vignette experiment
description: Designs a vignette or factorial survey experiment with factors and levels, vignette text, allocation, outcome measures, manipulation checks, power and analysis.
category: research-methods
version: 1.0.0
status: incubating
stage: [design, plan]
role: [researcher, student]
requires: [none]
inputs: [topic, text]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [vignette-study, factorial-survey, survey-experiment, experimental-design, multilevel-analysis]
subject: [social-sciences, psychology]
pairs_with:
  prompts: [write-survey-questionnaire, write-preregistration, calculate-sample-size, design-conjoint-study]
  personas: [research-methodologist, statistician]
args:
  - name: question
    description: What judgement or decision you want to study and which features you think influence it, for example "how a patient's age, ethnicity and insurance status affect nurses' triage priority".
    type: text
    required: true
  - name: respondents
    description: Who will answer and roughly how many you can reach, and the survey mode.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Design choice, Factors and levels, Vignette template, Allocation design, Measures and checks, Power and analysis, Validity risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Vignette experiments show respondents short descriptions of a person or situation in which chosen features are varied experimentally, then measure their judgement. They estimate the causal effect of each feature on stated judgements, and are widely used to study discrimination, professional decisions and norms. Design choices that experts weigh: between-subjects (one vignette each, cleanest but needs large samples) versus within-subjects factorial survey (several vignettes each, efficient but invites comparison and consistency effects); full factorial versus a fractional or D-efficient subset when the universe is large; avoiding implausible combinations; signalling features naturally (names to signal ethnicity or gender are only valid if pretested for the perception intended); keeping vignettes short and the text otherwise identical; ordering effects; and attention and manipulation checks. Analysis of within-subject designs needs multilevel models or clustered errors. The biggest limit is external validity: stated responses to hypothetical cases can differ from real behaviour, and social desirability is strong on sensitive features.
</context>

<task>
Design a vignette experiment for:
<question>
{{question}}
</question>
Respondents: {{respondents}}

1. Recommend vignettes or an alternative (conjoint, audit or field experiment, observational data) given the question, and between- or within-subjects with reasons.
2. Define factors and levels: three to six factors, levels per factor, which are of theoretical interest and which are controls, and how each is signalled in text. Flag signals that need pretesting.
3. Write a vignette template with slots, kept short and neutral, and one filled example. Exclude implausible combinations explicitly.
4. Plan allocation: full or fractional factorial, number of vignettes per respondent, deck construction and randomisation of decks and order.
5. Define outcomes (wording and scale), manipulation checks that do not cue the hypothesis, attention checks, and any follow-up items.
6. Plan power: the smallest effect of interest, a sample size approach (simulation for multilevel designs), and the number of respondents and vignettes needed, stating assumptions.
7. Plan analysis: models with respondent random effects or clustered errors, interactions to test pre-specified, handling of order effects, and a preregistration note.
8. List validity risks and mitigations: social desirability, demand effects, realism, generalisation to behaviour.
</task>

<constraints>
- Do not claim the design measures real behaviour; state the hypothetical nature in limits.
- Signals for protected characteristics must be pretested; do not assume a name or cue conveys a group membership.
- State all power assumptions; do not present a sample size without them.
- Keep the number of factors manageable and say if the user's list is too long for the sample.
</constraints>

<output_format>
## Design choice
Recommendation and reasons.
## Factors and levels
A table: factor | levels | role | how signalled | pretest needed.
## Vignette template
Template with slots and one example.
## Allocation design
Bullets.
## Measures and checks
Outcome items and checks.
## Power and analysis
Assumptions, sample size approach and models.
## Validity risks
A table: risk | mitigation.
</output_format>
