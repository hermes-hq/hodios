---
schema: 1
id: write-sigma-rule
kind: prompt
title: Write a Sigma detection rule
description: Writes a Sigma detection rule from an attack behaviour or log samples, with log source, selection and filter logic, false-positive notes, ATT&CK tags and positive and negative test events.
category: security-operations
version: 1.0.0
status: incubating
stage: [build]
role: [security-engineer]
requires: [none]
inputs: [logs, text]
output: [code, tests, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [sigma, detection-as-code, mitre-attack, false-positives, siem]
pairs_with:
  prompts: [write-siem-query, map-detection-coverage, write-threat-hunt-plan, write-yara-rule]
  personas: [detection-engineer]
args:
  - name: behaviour
    description: The attacker behaviour to detect, as specifically as you can - what runs, from where, with which arguments or network activity - plus the ATT&CK technique if known.
    type: text
    required: true
  - name: log_samples
    description: Real or sanitised log events that show the behaviour (malicious) and normal activity that looks similar (benign), with field names as your pipeline stores them.
    type: text
  - name: target_siem
    description: Optional backend to convert the rule for, such as Splunk, Microsoft Sentinel, Elastic or QRadar. Leave empty for the Sigma rule only.
    type: string
    default: ""
output_contract:
  format: markdown
  sections: [Assumptions, Rule, How it works, False positives and tuning, Test events, Conversion, Before you deploy]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Sigma is a vendor-neutral YAML format for log detections that converters turn into SIEM queries. Most weak Sigma rules fail in the same ways: the wrong `logsource` so the rule never runs, field names that do not exist in the target taxonomy, matching on an easily renamed file name instead of behaviour, `contains` on short strings that also appear in admin tooling, filters so broad they hide the attack, and no test events, so nobody knows whether the rule fires. A good rule detects the behaviour rather than one sample, documents its known false positives, and ships with events that prove it fires and events that prove it stays quiet.
</context>

<task>
Write a Sigma rule for this behaviour:

<behaviour>
{{behaviour}}
</behaviour>
{{#log_samples}}

<log_samples>
{{log_samples}}
</log_samples>
{{/log_samples}}

1. If the behaviour does not let you choose a log source (no platform, no telemetry type such as process creation, DNS, proxy, authentication or cloud audit), ask for that one fact and stop.
2. State the assumptions: product, category or service for `logsource`, the field names you rely on, and whether they follow the Sigma field taxonomy for that log source (for example `Image`, `ParentImage`, `CommandLine`, `OriginalFileName` for Windows process creation) or the field names in the samples.
3. Design the detection around what the attacker cannot easily change: the parent-child relationship, argument patterns, the PE `OriginalFileName` rather than the on-disk name, the API or event rather than the tool name. Use value modifiers deliberately (`|contains`, `|endswith`, `|startswith`, `|all`, `|re`, `|windash`, `|cidr`) and avoid leading-wildcard regex.
4. Put exclusions in named filters (`filter_main_*` for always-benign cases, `filter_optional_*` for environment-specific ones) and write the `condition` so each filter is visible. Every filter must be narrow enough that an attacker cannot simply step into it; say how an attacker could abuse each one.
5. Fill the metadata: `title`, a newly generated UUIDv4 `id`, `status: experimental`, `description`, `references` (only ones supplied or well known; otherwise leave a placeholder), `author` placeholder, `date` placeholder in YYYY-MM-DD, `tags` with `attack.<tactic>` and `attack.tNNNN` values, `falsepositives` and `level` (informational, low, medium, high, critical) justified by fidelity and impact.
6. Write test events as JSON objects with the same field names: at least two positive events (the behaviour, including one variant such as different casing or argument order) and at least two negative events (the closest legitimate activity). Walk each event through the condition and state whether it matches.
7. If a target backend is given ({{target_siem}}), show the likely converted query and the converter command shape (`sigma convert -t <backend> -p <pipeline> rule.yml`), labelled as unverified until run through the real converter. If none is given, say "Not requested".
8. Before answering, re-read the YAML: valid indentation, every selection referenced in the condition, no field used that is not in your stated assumptions, and each test event giving the outcome you claimed.
</task>

<constraints>
- Defensive use only. Describe attacker behaviour only as far as needed to detect it; do not write attack tooling or payloads.
- Never invent ATT&CK technique ids, references or field names. If unsure of a technique id, write the technique name and mark the id `[VERIFY]`.
- Prefer one precise rule over a broad rule plus a long exclusion list. If the behaviour needs two rules (for example a high-fidelity and a hunting variant), write both and say which is which.
- Use only the samples provided as evidence of field names and values; do not claim the rule was tested.
{{> output/uncertainty}}
</constraints>

<output_format>
## Assumptions
Bullets: log source, field naming, platform version or pipeline assumptions.

## Rule
One fenced `yaml` block with the complete rule.

## How it works
Three to six bullets explaining each selection and filter, and how an attacker might evade it.

## False positives and tuning
Known benign triggers, which filter handles each, and what to add per environment.

## Test events
Table: # | Type (positive or negative) | Why | Expected | Matches when traced. Then the events in one fenced `json` block.

## Conversion
The converted query and command, labelled unverified, or "Not requested".

## Before you deploy
A short checklist: validate the YAML with the Sigma tooling, replay the test events, run against 30 days of history to measure volume, set an owner and review date.
</output_format>

<examples>
A filter written well: `filter_main_sccm: ParentImage|endswith: '\CCM\CcmExec.exe'` with the note "an attacker would need to spawn from the configuration manager client, which already implies admin control of the host".
A filter written badly: `filter_admin: User|contains: 'admin'`, which silences the rule for any account an attacker names `admin`.
</examples>
