---
schema: 1
id: diagnose-sample-ratio-mismatch
kind: prompt
title: Diagnose a sample ratio mismatch
description: Confirms whether an experiment's group sizes really differ from the planned split, traces the cause through assignment, exposure logging, redirects, bots and filters, and says if results are usable.
category: product-metrics
version: 1.0.0
status: incubating
stage: [verify, review]
role: [data-analyst, data-scientist, product-manager, software-engineer]
subject: [statistics]
requires: [none]
inputs: [text, dataset, config]
output: [explanation, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [srm, chi-square, experiment-validity, assignment-bugs, trustworthy-experiments, a-b-testing]
pairs_with:
  prompts: [design-ab-test, write-experiment-readout, define-guardrail-metrics]
args:
  - name: experiment
    description: Planned split, randomisation unit, how assignment and exposure are logged, what the variant changes (including redirects, page weight or new code paths), and the date range.
    type: text
    required: true
  - name: counts
    description: Users or units per group overall, and if available by day, platform, browser, country, new versus returning, and traffic source.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Is there a mismatch, Where it concentrates, Likely causes, Checks to run, Can the result be used, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You investigate a sample ratio mismatch (SRM): an experiment planned as, say, 50/50 whose groups differ in size by more than chance allows. Even a small imbalance on large samples means something removed or added users non-randomly, so the treatment effect is biased in an unknown direction; the result should not be trusted until the cause is found. Typical causes: the variant redirects or loads slower so some users never log an exposure; bots or crawlers handled differently in one arm; the assignment hash or bucketing changed mid-test; a ramp-up from 10% to 50% counted wrongly; exposure logged after an action only one arm triggers; users switching devices with a different unit; filters or data pipelines dropping one arm's events; or the variant crashing on some platforms.
</context>

<task>
<experiment>
{{experiment}}
</experiment>

<counts>
{{counts}}
</counts>

1. Is there a mismatch: compute the expected counts from the planned split and a chi-square goodness-of-fit test (statistic and approximate p-value). Show the arithmetic. Common practice treats p below 0.001 as an SRM; explain what the test says here.
2. Where it concentrates: if breakdowns are given, run the same check per day and per segment. Say where the imbalance appears and where it does not; an imbalance that starts on one day or sits in one browser points at the cause.
3. Likely causes: rank three to five candidate causes that fit the pattern and the experiment's design, with the reasoning.
4. Checks to run: for each cause, a specific check (compare assignment logs to exposure logs, check bot filtering per arm, inspect the variant's error and load-time rates, check config changes on the day the imbalance starts, check the unit is stable across sessions).
5. Can the result be used: usually no until the cause is fixed. Say when a segment without imbalance can be analysed with care, and when the test must be rerun.
</task>

<constraints>
- Do not proceed to interpreting the treatment effect while an SRM is unexplained.
- Do not "fix" the imbalance by reweighting or dropping users to force the split; say why it hides the bias.
- Show the calculation; if only percentages are given, ask for counts because the test needs them.
- If the planned split or counts are missing, ask for them and stop.
{{> output/uncertainty}}
</constraints>

<output_format>
## Is there a mismatch
Expected vs observed table, chi-square and p-value, one-line verdict.

## Where it concentrates
Table: slice | control | treatment | p-value | imbalance.

## Likely causes
Ranked list with reasoning.

## Checks to run
Table: cause | check | what would confirm it.

## Can the result be used
Plain verdict and next step.

## Questions
What to confirm.
</output_format>
