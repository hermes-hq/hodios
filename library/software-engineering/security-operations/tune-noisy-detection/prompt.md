---
schema: 1
id: tune-noisy-detection
kind: prompt
title: Tune a noisy detection rule
description: Tunes one security detection that floods analysts with false positives, clustering the noise and proposing narrow exclusions that keep the true positives and do not hand attackers a blind spot.
category: security-operations
version: 1.0.0
status: incubating
stage: [maintain, review]
role: [security-engineer]
requires: [none]
inputs: [text, logs]
output: [code, report, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [false-positives, detection-tuning, alert-fatigue, exclusions, detection-as-code]
pairs_with:
  prompts: [write-sigma-rule, write-siem-query, map-detection-coverage]
  personas: [detection-engineer]
args:
  - name: rule
    description: The detection rule or query as deployed, with its intent (what attack it should catch) if you know it.
    type: text
    required: true
  - name: alert_sample
    description: A sample of recent alerts from the rule with the fields analysts saw and how each was closed (false positive, benign, true positive). 20 or more rows is better than 5.
    type: text
    required: true
  - name: rule_language
    description: The rule format or SIEM language, e.g. Sigma, KQL, SPL, EQL, YARA-L. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Noise clusters, Tuning options, Recommended change, What this could blind, Validation, Change record]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A detection that cries wolf trains analysts to close it unread, which is worse than no detection. The usual fixes make it worse in a different way: excluding a process by name (attackers rename binaries), excluding a whole host group or all admin accounts (the accounts attackers want most), raising a threshold until the true positives also disappear, or suppressing the rule entirely. Good tuning starts by grouping the noise into a few clusters with a shared cause, then excludes each cluster on attributes an attacker cannot easily copy: full path plus signer, parent process, a specific service account on a specific host, a command line pattern anchored at both ends. Every exclusion is written down with an owner and a review date, and the rule is re-tested to prove the attack it exists for still fires.
</context>

<task>
Tune this detection{{#rule_language}} ({{rule_language}}){{/rule_language}}.

<rule>
{{rule}}
</rule>

<alert_sample>
{{alert_sample}}
</alert_sample>

1. Restate what attack behaviour the rule is meant to catch. If the intent is unclear from the rule, say what you assumed.
2. Group the sample into noise clusters: the shared cause (a backup agent, a deployment tool, an IT script, a scanner), the number of alerts, and the fields that identify the cluster. Keep the true positives and anything undetermined in their own group.
3. For each cluster, list tuning options and rate each for how much noise it removes and how easily an attacker could hide inside it: narrow exclusion on stable attributes, adding a required condition to the main logic, splitting into a high-fidelity alert and a lower-severity hunting query, enrichment that auto-closes known-good, or fixing the noisy source itself (for example asking IT to sign their script).
4. Recommend one change set and write the tuned rule or the exclusion in the rule's own syntax, with comments naming each exclusion's reason.
5. Say plainly what the change could blind: which attacker technique or variant would now pass, and what other detection or hunt covers it.
6. Give a validation plan: replay the past 30 to 90 days with old and new logic and compare counts; confirm every known true positive still fires; run a safe simulation of the target behaviour; watch the alert rate for two weeks.
7. Write a change record: rule, change, reason, expected alert reduction, owner, review date.
</task>

<constraints>
- Never exclude on a value an attacker controls alone (process name, file name, a user-agent string, a command line fragment that is not anchored).
- Never recommend disabling the rule or excluding all privileged accounts or a whole subnet; if the rule is beyond saving, say so and propose a replacement.
- Do not invent alert counts or field values; compute from the sample and say the sample size.
- Do not claim the tuned rule was tested.
{{> output/uncertainty}}
</constraints>

<output_format>
## Noise clusters
Table: Cluster | Cause | Count in sample | Identifying fields.

## Tuning options
Table: Option | Noise removed | Evasion risk | Effort.

## Recommended change
The tuned rule or exclusion in one fenced block, then a short explanation.

## What this could blind
Bullets with the covering control for each.

## Validation
Numbered steps.

## Change record
A short table ready to paste into the detection repository or ticket.
</output_format>
