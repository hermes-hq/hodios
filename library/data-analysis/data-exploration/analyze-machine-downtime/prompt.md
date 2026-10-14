---
schema: 1
id: analyze-machine-downtime
kind: prompt
title: Analyse machine downtime and OEE losses
description: Analyses machine downtime logs for causes, MTBF, MTTR and OEE availability, performance and quality losses, and ranks the fixes that recover the most production capacity.
category: data-exploration
version: 1.0.0
status: incubating
stage: [discover, operate]
role: [operations-manager, manager, data-analyst, business-analyst]
requires: [none]
subject: [engineering]
inputs: [dataset, text]
output: [report, table, plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [oee, downtime, mtbf, mttr, manufacturing, maintenance]
pairs_with:
  prompts: [run-pareto-analysis, build-control-chart, analyze-process-cycle-times]
  personas: [data-analyst]
args:
  - name: downtime_log
    description: Stop events with machine or line, start and end time, reason code or free-text reason, and shift. Add planned production time, ideal cycle time or rated speed, units produced and units scrapped or reworked if you have them.
    type: text
    required: true
  - name: plant_context
    description: What the machines make, shift pattern, planned maintenance schedule, which line is the bottleneck if known, and what the reason codes mean.
    type: text
output_contract:
  format: markdown
  sections: [Headline, Data checks, OEE breakdown, Downtime by cause, Reliability metrics, Patterns, Ranked fixes, Assumptions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a manufacturing reliability engineer. Downtime logs are messy: "other" and "unknown" codes swallow a large share, short stops under a few minutes are often not logged at all and show up only as lost speed, and the same fault is coded differently by each shift. Overall equipment effectiveness (OEE) is availability times performance times quality, and it is only meaningful when planned production time and ideal cycle time are defined clearly. Time lost on the bottleneck is lost output for the whole plant; an hour saved elsewhere may be worth nothing. So you rank fixes by capacity recovered on the constraint, look at frequency (MTBF) and repair time (MTTR) separately because they call for different fixes, and treat the reason coding itself as a finding when it is poor.
</context>

<task>
Analyse this downtime data.

<downtime_log>
{{downtime_log}}
</downtime_log>

{{#plant_context}}Plant context: {{plant_context}}{{/plant_context}}

1. Data checks: overlapping or negative-duration events, stops spanning shift changes or midnight, planned stops (breaks, planned maintenance, changeovers) mixed with unplanned ones, and the share of time coded "other" or blank. If reason text is free-form, group it into a small set of causes and show the mapping.
2. OEE breakdown per machine or line, if the data allows: availability (run time divided by planned production time), performance (ideal cycle time times total count divided by run time), quality (good count divided by total count), and OEE. Show the minutes lost in each of the six big losses (breakdowns, setups and changeovers, small stops, reduced speed, start-up rejects, production rejects) where possible. If inputs are missing, compute what you can and say which part is missing.
3. Downtime by cause: Pareto of unplanned downtime minutes and of stop counts by cause and machine; they rank differently and both matter.
4. Reliability metrics: MTBF (operating time divided by number of failures) and MTTR (repair time divided by number of failures) per machine and main cause. High frequency with short repairs points to root-cause and small-stop work; rare but long stops point to spares, skills and repair procedures.
5. Patterns: by shift, day of week, product or changeover, operator crew, and time since last planned maintenance. Flag patterns with too few events to trust.
6. Ranked fixes: for the top causes, the likely fix type (root-cause analysis, preventive maintenance task, spares holding, changeover reduction (SMED), operator standard work, better reason coding), the production minutes or units recovered per month on the bottleneck, and how to verify the gain.
</task>

<constraints>
- Do not invent ideal cycle times, planned time or scrap counts; if they are missing, give availability-only results and say OEE cannot be computed.
- Do not diagnose a mechanical root cause from codes alone; propose the investigation and who should do it.
- Safety-related stops and lock-out events are not to be targeted for reduction without a safety review; say so if they appear.
- State every assumption about shift lengths and planned time.
</constraints>

<output_format>
## Headline
OEE or availability, the biggest loss, and the top fix with capacity recovered.

## Data checks
Bullets, including the cause mapping.

## OEE breakdown
Table: Machine | Availability | Performance | Quality | OEE | Biggest loss.

## Downtime by cause
Table: Cause | Minutes | Share | Stops | Machines most affected.

## Reliability metrics
Table: Machine or cause | Failures | MTBF | MTTR | Fix type implied.

## Patterns
Bullets with confidence notes.

## Ranked fixes
Numbered: fix, cause, capacity recovered, owner, how to verify.

## Assumptions
Bullets.
</output_format>
