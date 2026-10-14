---
schema: 1
id: set-up-experimentation-program
kind: prompt
title: Set up an experimentation programme
description: Sets up how a company runs product experiments - who can launch them, a review step, pre-registration, standard metrics, a results archive and decision rules - sized to its traffic and maturity.
category: product-metrics
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [product-manager, data-scientist, executive, data-analyst]
subject: [statistics]
requires: [none]
inputs: [text, notes]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [experimentation-culture, pre-registration, experiment-review, results-archive, test-governance, a-b-testing]
pairs_with:
  prompts: [design-ab-test, define-guardrail-metrics, write-experiment-readout, build-experiment-backlog]
args:
  - name: current_state
    description: How experiments run today (tools, who runs them, how many a month, how results are decided), recent problems, and data or analyst capacity.
    type: text
    required: true
  - name: traffic_and_goals
    description: Rough traffic or user volumes in the main product areas, and what the company wants from experimentation (faster learning, fewer bad launches, proof for investment).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Maturity and fit, Roles and ownership, The experiment lifecycle, Standard metrics, Review and decision rules, Archive and learning, First quarter rollout, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design the operating model for product experimentation. Tools are rarely the bottleneck. Programmes fail because anyone can launch a test with no stated hypothesis, metrics are chosen after the results come in, tests are stopped when they look good, the same failed idea is tested three times because nobody wrote down results, and leadership overrides results it dislikes. A good programme fits the company's traffic and maturity: a few well-run tests a month beat dozens of underpowered ones. Its core parts are a light pre-registration (hypothesis, primary metric, guardrails, sample size, duration, decision rule) written before launch, a quick review by someone with statistics skills, a shared set of standard metric definitions, a searchable archive of results including failures, and decision rules agreed in advance.
</context>

<task>
<current_state>
{{current_state}}
</current_state>

<traffic_and_goals>
{{traffic_and_goals}}
</traffic_and_goals>

1. Maturity and fit: where they are now (ad hoc, emerging, scaled), what traffic allows (roughly how many concurrent, adequately powered tests per area), and what to aim for in the next two quarters.
2. Roles and ownership: who proposes, who reviews design, who analyses, who decides, and who owns the platform and metric definitions. Fit it to the analyst capacity given.
3. The experiment lifecycle: steps from idea to decision, with a one-page pre-registration template (fields only) and the minimum checks before launch (sample size, SRM monitoring, guardrails, conflicts with other tests).
4. Standard metrics: a short list of company-wide metric definitions every test reports (primary candidates and guardrails), and who maintains them.
5. Review and decision rules: when a test can stop, what counts as a win, what happens with flat or negative results, and how overrides are recorded when leadership ships against the result.
6. Archive and learning: the record each test leaves, where it lives, and a monthly review of learnings and win rate.
7. First quarter rollout: what to set up in which order, with owners and a measure of whether the programme is working (share of tests pre-registered, share with a decision, time to decision).
</task>

<constraints>
- Size the process to the capacity given; a small team gets a light version, not a big-company bureaucracy.
- Do not recommend buying a specific vendor tool; describe capabilities needed and let the team choose.
- Do not promise that more tests means more wins; say that many tests show no effect and that this is useful information.
- If traffic or current practice is missing, ask for them and stop.
</constraints>

<output_format>
## Maturity and fit
Short assessment and target.

## Roles and ownership
Table: role | who | responsibility.

## The experiment lifecycle
Numbered steps, then the pre-registration template fields.

## Standard metrics
Table: metric | definition | use (primary or guardrail) | owner.

## Review and decision rules
Bullets.

## Archive and learning
Record fields and the monthly review.

## First quarter rollout
Table: weeks | action | owner. Then the programme health measures.

## Questions
What to confirm.
</output_format>
