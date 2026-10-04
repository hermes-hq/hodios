---
schema: 1
id: write-threat-hunt-plan
kind: prompt
title: Write a threat hunting plan
description: Writes a hypothesis-driven threat hunting plan with data sources, queries to run, expected benign baselines, what a finding looks like and how to turn results into detections.
category: security-operations
version: 1.0.0
status: incubating
stage: [plan]
role: [security-engineer]
requires: [none]
inputs: [text, schema]
output: [plan, code, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [threat-hunting, hypothesis-driven, mitre-attack, baselining, data-gaps]
pairs_with:
  prompts: [write-siem-query, write-sigma-rule, map-detection-coverage, write-threat-intel-brief]
  personas: [detection-engineer]
args:
  - name: hypothesis
    description: What you suspect and why - for example "an attacker is using scheduled tasks for persistence on servers, prompted by a recent intel report" - or a rough idea to sharpen.
    type: text
    required: true
  - name: data_sources
    description: The telemetry you actually have, with retention - EDR process and network events, Windows event logs, Sysmon, DNS, proxy, firewall, authentication, cloud audit logs.
    type: text
    required: true
  - name: siem
    description: The platform and query language to write queries in, such as KQL, SPL, ES|QL or SQL. Leave empty for platform-neutral pseudocode.
    type: string
    default: ""
  - name: timebox_hours
    description: How many analyst hours the hunt may take.
    type: number
    default: 8
output_contract:
  format: markdown
  sections: [Hypothesis, Scope, Data check, Hunt queries, Baseline and analysis, What a finding looks like, Escalation, Outputs]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A hunt looks for attacker activity that existing detections miss. Hunts that produce nothing useful usually start from a vague idea ("look for bad stuff"), discover halfway through that the needed telemetry is missing, drown in results with no baseline of what normal looks like, or end without writing anything down. A good hunt has a testable hypothesis tied to an attacker technique, checks data availability first, defines in advance what a finding looks like, and ends in durable outputs whatever the result: new detections, data gaps to fix, hardening tickets, or a documented negative.
</context>

<task>
Plan a hunt:

<hypothesis>
{{hypothesis}}
</hypothesis>

<data_sources>
{{data_sources}}
</data_sources>

Query language: {{siem}} (if empty, write readable pseudocode with field names stated). Time box: {{timebox_hours}} hours.

1. Sharpen the hypothesis into one testable statement: actor behaviour, technique (ATT&CK name, id marked `[VERIFY]` if unsure), where it would happen, and in what time window. If the input is too vague to choose a technique or a place, propose two or three candidate hypotheses and ask which to pursue, then stop.
2. Scope: systems, accounts and look-back period, limited by retention.
3. Data check: for each data source needed, say whether the input shows it is available, what fields the hunt relies on, and the gap if it is not. If a critical source is missing, say whether the hunt can still proceed and with what blind spot.
4. Hunt queries: three to six queries that move from broad to narrow, each with the question it answers, the query, the fields assumed, and the expected volume. Prefer techniques that surface rare behaviour: stacking (least frequent values across hosts), first-seen analysis, parent-child outliers, time-of-day and peer comparison.
5. Baseline and analysis: what legitimate activity will appear (software deployment, backup agents, admin scripts) and how to set it aside without hiding an attacker who imitates it.
6. Define a finding in advance: the specific observations that would count as confirmed malicious, suspicious-needs-escalation, or benign.
7. Escalation: what to do if something is found mid-hunt (stop hunting, preserve evidence, hand to incident response with the query and results).
8. Outputs: detection candidates (in plain language, ready for a rule), data gaps to fix, hardening opportunities, and how to document a negative result.
9. Check that each query uses only fields named in the data check and fits the time box; trim if not.
</task>

<constraints>
- Do not invent data sources or fields the user did not list; label assumed fields clearly.
- Queries are for the defender's own environment. Do not suggest active probing of systems outside it.
- Keep the plan within the time box; mark optional queries if it would run over.
{{> output/uncertainty}}
</constraints>

<output_format>
## Hypothesis
One sentence, then the technique and why it is plausible here.

## Scope
Bullets.

## Data check
Table: Source | Available? | Fields used | Retention | Gap.

## Hunt queries
Numbered; each with Question, Query (fenced block), Fields assumed, Expected volume.

## Baseline and analysis
Bullets.

## What a finding looks like
Three short lists: Confirmed malicious, Escalate, Benign.

## Escalation
Short numbered list.

## Outputs
Detection candidates, data gaps, hardening, documentation.
</output_format>
