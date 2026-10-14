---
schema: 1
id: plan-purple-team-exercise
kind: prompt
title: Plan a purple team exercise
description: Plans an authorised purple team exercise that safely emulates chosen attacker techniques, measures whether each was logged, alerted, triaged and contained, and turns gaps into fixes.
category: security-operations
version: 1.0.0
status: incubating
stage: [plan, verify]
role: [security-engineer]
requires: [none]
inputs: [text]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [purple-team, adversary-emulation, detection-validation, mitre-attack, rules-of-engagement]
pairs_with:
  prompts: [map-detection-coverage, plan-security-tabletop, write-sigma-rule, write-threat-hunt-plan]
  personas: [detection-engineer]
args:
  - name: threat_focus
    description: The threats to emulate - a named threat actor from a report you trust, a scenario such as ransomware precursors or cloud credential theft, or a list of ATT&CK technique ids.
    type: text
    required: true
  - name: environment
    description: The test environment and estate - operating systems, identity platform, cloud, EDR and SIEM in use, and which hosts or accounts may be used for testing.
    type: text
    required: true
  - name: detections_today
    description: What you believe already detects these techniques, so the exercise can confirm or disprove it. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Scope and rules of engagement, Test plan, Measurement, Schedule and roles, Safety and cleanup, Results template]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A purple team exercise is the red and blue teams in the same room: one runs a technique, the other watches what their tools see, and both fix gaps on the spot. Its value is in measurement that goes beyond "did an alert fire". Each test lands in one of five outcomes: not logged at all, logged but no alert, alerted but triaged wrongly or too slowly, alerted and triaged correctly, or prevented outright. Exercises go wrong when nobody wrote down who authorised them, when tests run on fragile production systems without change approval, when the techniques chosen do not match the threats the organisation actually faces, when test artefacts are left behind, or when the results become a slide nobody acts on.
</context>

<task>
Plan a purple team exercise.

<threat_focus>
{{threat_focus}}
</threat_focus>

<environment>
{{environment}}
</environment>
{{#detections_today}}

<detections_today>
{{detections_today}}
</detections_today>
{{/detections_today}}

1. Write scope and rules of engagement: the written authorisation needed and from whom, test hosts and accounts (prefer dedicated test machines and accounts that mirror production builds), out-of-scope systems, time windows, a stop word, who must be told (the SOC on duty, IT operations, any managed security provider so it does not escalate to customers or law enforcement).
2. Select 8 to 15 techniques that fit the threat focus, in the order an attacker would use them, each with its ATT&CK id. Drop techniques that do not fit the environment and say why.
3. For each technique, describe the test at the level of "what the test does and what telemetry it should create" using benign, well-known test methods (for example open-source atomic test libraries or built-in administration tools used the way attackers do). Name the expected log source and the detection expected to fire.
4. Define measurement: the five outcomes above, time to alert, time to triage, and whether the analyst reached the right conclusion. Note where prevention blocked a test and whether the block was logged.
5. Set the schedule and roles: operator, observers per tool, scribe, facilitator, decision owner for any change made during the day.
6. Safety and cleanup: snapshot or rebuild test hosts, remove created accounts, files, scheduled tasks and registry keys, revert config changes, and confirm cleanup in writing. List the tests that must never run on production.
7. Provide a results template and how each gap becomes a ticket (new log source, new detection, tuning, playbook change) with an owner and a retest date.
</task>

<constraints>
- Defensive validation only. Do not write working malware, exploit code, credential-dumping tools or evasion steps; describe tests at the level needed to plan and measure them.
- Do not invent threat actor behaviour. If a named actor is given without a source, ask for the report or use the techniques the user listed.
- Do not claim any detection exists; mark the user's beliefs as "to confirm".
- Require written authorisation before any test; if the user indicates they lack it, stop at the planning document and say so.
</constraints>

<output_format>
## Scope and rules of engagement
Bullets, including the authorisation line and the stop word.

## Test plan
Table: Order | Technique (ATT&CK id) | Test summary | Expected telemetry | Expected detection.

## Measurement
The outcome scale and the timings to record.

## Schedule and roles
Short schedule and a role list.

## Safety and cleanup
Checklist.

## Results template
Table: Technique | Outcome | Time to alert | Time to triage | Gap | Ticket | Retest date.
</output_format>
