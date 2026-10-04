---
schema: 1
id: analyze-load-test-results
kind: prompt
title: Analyse load test results
description: Interprets k6, JMeter, Locust or Gatling results, finding the knee where latency climbs, separating load-generator limits from server saturation, and judging the pass criteria.
category: performance
version: 1.0.0
status: incubating
stage: [verify, review]
role: [sre, backend-engineer, qa-engineer]
requires: [none]
inputs: [logs, dataset, text]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [load-testing, capacity, saturation, latency-percentiles, k6, jmeter]
pairs_with:
  prompts: [plan-load-test, write-k6-load-test, profile-hot-path]
  personas: [performance-engineer, site-reliability-engineer]
args:
  - name: results
    description: The test output, ideally per stage (load, throughput, p50, p95, p99, errors), the test profile, server metrics for the same period (CPU, pools, database) and the load generator's own CPU.
    type: text
    required: true
  - name: pass_criteria
    description: The thresholds the test had to meet, for example "p95 under 300 ms and errors under 0.1% at 800 requests per second".
    type: text
    default: "none stated; propose criteria and judge against them, labelled as proposed"
output_contract:
  format: markdown
  sections: [Verdict, Validity of the test, Where it breaks, Bottleneck evidence, Next tests, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The user has run a load test and needs to know what it means. Pass criteria: {{pass_criteria}}.

Load test output is easy to misread. Averages hide tail latency; a summary over the whole run mixes ramp-up with steady state; a closed model (fixed virtual users) slows its own request rate when the server slows, hiding saturation (coordinated omission), whereas an open model (arrival rate) shows it; and the load generator itself often saturates first (CPU, network, ephemeral ports, connection limits), producing a fake ceiling. Errors also need reading: a 0% error rate with p99 at the client timeout means requests were not failing, they were waiting.
</context>

<task>
<results>
{{results}}
</results>

1. Check validity first: the test model (open or closed), whether a steady state was reached at each stage and held long enough (several minutes), whether the load generator was saturated (its CPU above about 80%, dropped iterations, k6 `dropped_iterations`, JMeter or Locust warnings), whether the target environment and data volume resemble production, and whether caches were warm. Say what the validity problems mean for the conclusions.
2. Build the load-versus-latency picture per stage: offered load, achieved throughput, p50, p95, p99, error rate. Find the knee: the load where p95 or p99 starts rising faster than load, or achieved throughput stops tracking offered load. Use Little's law (concurrency = throughput × latency) as a sanity check on reported numbers.
3. Separate client limits from server saturation, and locate the server bottleneck using utilisation, saturation and errors per resource (USE method): CPU, memory and GC, thread or worker pools, database connections and slow queries, locks, downstream services, rate limits, and network. Tie each conclusion to a metric in the input; where server metrics are missing, say which to collect.
4. Read errors by type and time: timeouts, 5xx, connection resets, 429s; whether they start at the knee.
5. Judge each pass criterion as pass, fail or cannot tell, with the number. If criteria were not given, propose ones tied to the service's needs and label them proposed.
6. Recommend the next tests: re-run with fixes, a test to confirm the suspected bottleneck (for example double the connection pool and see if the knee moves), a soak test for leaks, or a spike test; and what to change in the test itself.
</task>

<constraints>
- Quote the numbers you use from the input; do not invent metrics.
- Never call a test passed when its validity is in doubt; say "cannot tell" and why.
- Distinguish evidence from hypothesis for each bottleneck.
{{> output/uncertainty}}
</constraints>

<output_format>
## Verdict
Table: criterion | threshold | measured | pass, fail or cannot tell. Then one sentence on capacity: the highest load that met the criteria.
## Validity of the test
Bullets, each with its effect on the conclusions.
## Where it breaks
Table: stage | offered load | throughput | p50 | p95 | p99 | errors. Then the knee and how it was found.
## Bottleneck evidence
Ranked list: resource, evidence, confidence.
## Next tests
Numbered, each with the question it answers.
## Questions
Missing data that would change the conclusions.
</output_format>
