---
schema: 1
id: write-benchmark-report
kind: prompt
title: Write a benchmark report
description: Writes up performance benchmark results with the setup, method, numbers with variance, honest caveats and what the results do and do not show. Use before sharing benchmark claims.
category: writing
version: 1.0.0
status: incubating
stage: [verify]
role: [software-engineer, backend-engineer, tech-lead]
requires: [none]
inputs: [dataset, notes]
output: [report, article]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [benchmarks, percentiles, latency, throughput, reproducibility]
pairs_with:
  prompts: [analyze-load-test-results, write-tech-blog-post]
args:
  - name: results
    description: The raw or summarised benchmark numbers, ideally per run, with units.
    type: text
    required: true
  - name: setup
    description: Hardware, OS, versions, configuration, dataset, warm-up, number of runs and how the benchmark was driven. Whatever you have.
    type: text
    required: true
  - name: audience
    description: "internal: a team or design-review report. public: a blog post or README section others may quote."
    type: enum
    enum: [internal, public]
    default: internal
output_contract:
  format: markdown
  sections: [Report, Claims checked, Missing for reproducibility]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Benchmark write-ups are quoted long after the context is forgotten, so a sloppy one does lasting damage. The common faults: a single run reported as fact, means without spread, percentages that hide tiny absolute differences, "2x faster" from a microbenchmark generalised to a whole system, comparisons where one side was tuned and the other ran defaults, no warm-up for JIT or caches, and missing versions so nobody can reproduce it. Readers trust a benchmark that states its limits more than one that claims a sweeping win.
</context>

<task>
Write a {{audience}} benchmark report from these inputs.

<results>
{{results}}
</results>

<setup>
{{setup}}
</setup>

1. State the question the benchmark answers in one sentence (for example "Does the new serializer reduce p99 latency for 1 KB payloads?") and the headline answer, scoped exactly to what was measured.
2. Describe the setup so someone else could repeat it: hardware, OS, runtime and library versions, configuration, dataset or payload, load pattern, warm-up, run count, and what was compared against what.
3. Present results in a table with units, sample size and spread (standard deviation, min and max, or percentiles). Use medians and tail percentiles for latency, not only means. Give absolute numbers next to every relative change.
4. Interpret: which differences are larger than run-to-run noise, which are not, and the likely cause if the inputs explain it. Say plainly when a difference is within noise.
5. List threats to validity: fairness of configurations, environment noise, dataset representativeness, microbenchmark versus real workload, and anything the inputs reveal as uncontrolled.
6. Check every claim in the report against the numbers given, and record each check.
</task>

<constraints>
- Use only numbers from the inputs. Never compute a statistic the data does not support; if there is only one run, say so and do not report variance.
- No superlatives ("blazing", "massively"). Relative claims must name the baseline and the workload.
- If {{audience}} is public, include the versions and a reproduction note, and flag anything that compares against a competitor's product so the author can check fairness and licence terms that restrict publishing benchmarks.
- If the setup is too thin to support any conclusion, say that first and still write the report as a draft.
</constraints>

<output_format>
## Report
Title, Question and answer, Setup, Results (table), Interpretation, Limits, Next measurements worth running.

## Claims checked
| Claim in the report | Supporting numbers | Holds? |

## Missing for reproducibility
Bullets: details a reader would need to repeat the run, or "None".
</output_format>
