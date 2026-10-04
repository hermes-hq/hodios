---
schema: 1
id: write-observability-queries
kind: prompt
title: Write observability queries
description: Writes PromQL, LogQL, TraceQL, SQL or vendor queries for an operational question, explains each part and warns about traps such as rate windows, counter resets and label cardinality.
category: incident
version: 1.0.0
status: incubating
stage: [operate, build]
role: [sre, backend-engineer, devops-engineer]
stack: []
requires: [none]
inputs: [text, config]
output: [code, explanation]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [promql, logql, traceql, histograms, query-traps]
pairs_with:
  prompts: [design-service-dashboard, design-alerting-rules, define-slos]
args:
  - name: question
    description: The operational question in plain words, for example "error ratio by route over the last hour" or "p99 latency by app version". Include the metric, log or span names and labels you have, and the scrape or sampling interval if known.
    type: text
    required: true
  - name: query_language
    description: Query language to write in. sql covers log or trace stores queried with SQL; other means a vendor language you name in the question.
    type: enum
    enum: [promql, logql, traceql, sql, other]
    required: true
  - name: use
    description: Where the query will run, which changes window and resolution choices.
    type: enum
    enum: [dashboard, alert, ad-hoc]
    default: dashboard
output_contract:
  format: markdown
  sections: [Query, How it works, Traps, Variants, Assumptions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write a query that answers one operational question correctly, and explain it so the reader can change it safely. Most wrong graphs come from a few traps: graphing a raw counter instead of its rate; a rate window shorter than about four scrape intervals, which gives gaps and spikes; averaging percentiles across instances instead of aggregating histogram buckets first; dropping the `le` label before `histogram_quantile`; dividing series whose labels do not match; ratios over tiny request counts; log queries that parse every line before filtering; and grouping by a high-cardinality label (user id, request id, full URL) that explodes cost.

Query language: {{query_language}}
Used for: {{use}}
</context>

<task>
<question>
{{question}}
</question>

1. Restate the question as a precise measure: numerator and denominator for ratios, the percentile and population for latency, the time window, and the grouping.
2. Write the query using only the names and labels given. For PromQL: `rate` or `increase` on counters, `sum by (...)` before dividing, `histogram_quantile` over `sum by (le, ...) (rate(..._bucket[w]))`. For LogQL: stream selector and line filters before parsers, then `| json` or `| logfmt`, then metric functions. For TraceQL: span conditions with scoped attributes and the aggregate. For SQL: time bucketing, filters on indexed time columns first, and explicit handling of nulls.
3. Pick the window for the use: dashboard windows match the step (for example `$__rate_interval`); alert windows match the alert's intent; ad-hoc can be wider. Say why.
4. Explain each part in one line, top to bottom.
5. List the traps that apply to this query and how the query avoids them, plus any it cannot avoid (counter resets are handled by `rate` but not by subtracting raw values; low traffic makes ratios jumpy, so add a minimum-count guard).
6. Give one or two useful variants (another grouping, top-k, comparison to one week earlier with `offset`).
</task>

<constraints>
- Never invent metric, label, stream or attribute names. If one is needed and missing, write it as `<placeholder>` and list it under Assumptions.
- Use syntax valid for the named language; if a function depends on the version or vendor, say so.
- Avoid grouping by unbounded labels; if the question needs it, use top-k and explain the cost.
- If the question is ambiguous (which errors count, which percentile), state the choice made and how to change it.
</constraints>

<output_format>
## Query
One fenced code block.
## How it works
Numbered lines, one per part.
## Traps
Bullets: trap and how it is handled.
## Variants
One or two fenced blocks with a one-line purpose each.
## Assumptions
Bullets, or "None".
</output_format>
