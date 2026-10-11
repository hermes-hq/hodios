---
schema: 1
id: compare-benchmark-runs
kind: prompt
title: Compare benchmark runs
description: Decides whether the difference between two sets of benchmark or performance-test results is real or noise, from spread, run counts, distribution shape and setup, and says what would settle it.
category: performance
version: 1.0.0
status: incubating
stage: [verify, review]
role: [software-engineer, backend-engineer, qa-engineer]
stack: []
requires: [none]
inputs: [dataset, text]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [benchmarking, statistical-testing, noise, regression-detection, variance]
pairs_with:
  prompts: [write-microbenchmark, analyze-load-test-results, set-performance-budgets]
  personas: [performance-engineer]
args:
  - name: baseline_results
    description: The baseline runs (raw samples per run if possible, or summaries with spread), and how they were produced.
    type: text
    required: true
  - name: candidate_results
    description: The candidate runs in the same form.
    type: text
    required: true
  - name: threshold
    description: The smallest change that matters to you, such as 5% on median latency.
    type: string
    default: not stated
output_contract:
  format: markdown
  sections: [Verdict, Comparison, Noise and validity checks, What would settle it]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
"It got 4% faster" from one run each is usually noise. Benchmark results are noisy and often not normally distributed: they have long right tails, outliers from GC or interrupts, and sometimes two modes (for example a cache hit and miss path, or a CPU that boosts on some runs). A fair comparison uses several independent runs per side, compares medians or other robust statistics with their spread, uses a test that does not assume normality when distributions are skewed (such as Mann-Whitney U or bootstrapped confidence intervals, as tools like benchstat do), and checks the size of the change against the noise and against the threshold that matters. Differences in machine, runtime version, data, warm-up or background load invalidate the comparison no matter what the statistics say.

Threshold that matters: {{threshold}}
</context>

<task>
Baseline:
{{baseline_results}}

Candidate:
{{candidate_results}}

1. Check the setup is comparable: same machine or instance type, runtime and dependency versions, data, warm-up and run procedure. List any difference and whether it invalidates the comparison.
2. Describe each side: number of runs and samples, median, spread (interquartile range or standard deviation), coefficient of variation, outliers, and whether the distribution looks skewed or bimodal.
3. Compare: the change in the median (and the mean if reported) as a percentage, with a confidence interval or a non-parametric test result if the raw samples allow it. Show the arithmetic or method so it can be checked.
4. Decide one of: real improvement, real regression, no meaningful difference, or inconclusive. Compare the effect with the noise and with the threshold.
5. If inconclusive or invalid, say exactly what to run next: how many runs, how to reduce noise (pinning, idle machine, longer runs, interleaving A and B runs), and which statistic to compare.
</task>

<constraints>
- Use only the numbers given; never fill in missing samples.
- If only single summaries are given with no spread, say the comparison cannot be judged and why.
- Do not call a change significant without stating the method; label any approximate calculation as approximate.
{{> output/uncertainty}}
</constraints>

<output_format>
## Verdict
One line: the decision and the size of the change with its uncertainty.
## Comparison
Table: metric | baseline | candidate | change | interval or test result.
## Noise and validity checks
Bullets.
## What would settle it
Bullets, or "Nothing needed".
</output_format>
