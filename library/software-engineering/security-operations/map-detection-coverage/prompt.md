---
schema: 1
id: map-detection-coverage
kind: prompt
title: Map detection coverage to attack techniques
description: Maps an organisation's existing detections to attack techniques, finds coverage gaps for its threat profile and prioritises new detections by likelihood, impact and data availability.
category: security-operations
version: 1.0.0
status: incubating
stage: [plan, review]
role: [security-engineer]
requires: [none]
inputs: [text, document]
output: [table, plan, report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [mitre-attack, coverage-gaps, detection-backlog, threat-informed-defense, data-sources]
pairs_with:
  prompts: [write-sigma-rule, write-threat-hunt-plan, write-threat-intel-brief]
  personas: [detection-engineer]
args:
  - name: detections
    description: Your current detection inventory - rule names with a line on what each detects, its data source, status (production, testing, disabled) and noise level if known. An export from the SIEM or EDR is fine.
    type: text
    required: true
  - name: threat_profile
    description: Who is likely to attack you and how - industry, size, internet-facing assets, recent incidents, intel reports you trust, and techniques you care most about.
    type: text
    required: true
  - name: data_sources
    description: The telemetry you collect and its coverage - EDR on which share of hosts, which logs, retention - so gaps can be split into missing rules and missing data.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Coverage matrix, Gaps that matter, Prioritised backlog, Data gaps, Caveats]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Coverage maps are easy to make misleading. Painting every technique green because one rule mentions it hides that the rule catches one procedure out of dozens; mapping against the whole ATT&CK matrix produces a backlog of hundreds of items nobody will finish; and ignoring telemetry turns "write a rule" into a task that cannot be done. A useful map starts from the techniques this organisation's likely attackers actually use, rates each mapped rule honestly, separates rule gaps from data gaps, and ends with a short backlog the team can deliver this quarter.
</context>

<task>
Map this detection inventory against the threat profile.

<detections>
{{detections}}
</detections>

<threat_profile>
{{threat_profile}}
</threat_profile>
{{#data_sources}}

<data_sources>
{{data_sources}}
</data_sources>
{{/data_sources}}

1. If the inventory has rule names with no indication of what they detect, ask for one-line descriptions or the logic and stop.
2. From the threat profile, select the 15 to 30 techniques that matter most (initial access, execution, persistence, privilege escalation, credential access, lateral movement, exfiltration and impact techniques typical of the stated attackers). Explain the selection in a few lines.
3. Map each detection to techniques. Rate coverage per technique: none, partial (some procedures, or only in some environments), or good (multiple procedures, tested, low noise). Disabled or untested rules count as none or partial and say so. A rule mapped to a technique only by name, with logic that would miss common variants, is partial at best.
4. For each gap, say whether the blocker is a missing rule (data exists) or missing data (rule cannot be written yet).
5. Prioritise new detections with a simple score: likelihood for this profile, impact if missed, data availability, and effort. Show the score inputs, not just the total.
6. Recommend data source improvements ranked by how many priority techniques each would unlock.
7. Before answering, check every rule in the inventory appears in the matrix or in an "unmapped" list, and that no technique id is invented (mark uncertain ids `[VERIFY]`).
</task>

<constraints>
- Coverage means detection of behaviour, not the existence of a rule with a matching tag; be conservative.
- Do not invent detections, telemetry or threat intelligence; use only what is supplied and mark inferences.
- Keep the backlog short enough to deliver: at most ten items for the next quarter, the rest in a parked list.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Three to five sentences: overall picture, biggest risk, top three actions.

## Coverage matrix
Table: Tactic | Technique | Mapped detections | Coverage | Data available? | Note. Followed by "Unmapped detections" if any.

## Gaps that matter
Bullets: technique, why it matters for this profile, blocker (rule or data).

## Prioritised backlog
Table: # | Detection to build | Technique | Likelihood | Impact | Data | Effort | Score.

## Data gaps
Ranked bullets with the techniques each would unlock.

## Caveats
What the map cannot show (rule quality without testing, procedure variety) and how to validate it, such as replaying known attack simulations in a test environment.
</output_format>
