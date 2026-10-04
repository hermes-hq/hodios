---
schema: 1
id: build-forensic-timeline
kind: prompt
title: Build a forensic timeline
description: Builds a forensic timeline from parsed host and log artefacts, normalising time zones, correlating events, separating attacker actions from normal activity and listing evidence gaps.
category: security-operations
version: 1.0.0
status: incubating
stage: [review]
role: [security-engineer]
requires: [none]
inputs: [logs, text]
output: [table, report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [dfir-timeline, forensics, event-correlation, mitre-attack, evidence-gaps]
pairs_with:
  prompts: [investigate-cloud-audit-logs, analyze-suspicious-script, write-threat-intel-brief]
  personas: [soc-analyst]
  workflows: [ransomware-response-track]
args:
  - name: artefacts
    description: Parsed events from the investigation - event log entries, file system timestamps, prefetch or shimcache entries, shell history, EDR telemetry, proxy, VPN or authentication logs - each with its source and timestamp.
    type: text
    required: true
  - name: scope
    description: What the timeline covers - hosts, accounts and the time window under investigation, such as "WS-042 and the svc_sql account, 12-15 September".
    type: string
    required: true
  - name: timezone_notes
    description: What you know about each source's clock - which are UTC, which are local time and where, known clock drift, and how each tool exported its timestamps.
    type: text
  - name: output_timezone
    description: The timezone to normalise every timestamp to, as UTC or an IANA name.
    type: string
    default: UTC
output_contract:
  format: markdown
  sections: [Scope and assumptions, Clock notes, Timeline, Attack narrative, Evidence gaps, Next artefacts]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A forensic timeline turns scattered artefacts into an account of what the attacker did, when, and with which access. The common errors are mixing time zones (one source in local time, another in UTC, so the "first" event is an hour off), trusting a single timestamp that can be altered (file system created times can be timestomped), filling gaps with assumptions, and labelling every unusual event as malicious. Investigators, lawyers and insurers may rely on this timeline later, so every row must cite its source, and every classification must say how sure it is.
</context>

<task>
Build a timeline for this scope: {{scope}}

<artefacts>
{{artefacts}}
</artefacts>
{{#timezone_notes}}

<timezone_notes>
{{timezone_notes}}
</timezone_notes>
{{/timezone_notes}}

1. If the artefacts lack timestamps or sources, or the scope is missing, say what is needed and stop.
2. Clock notes: for each source, state the timezone you assume and why (from the notes, from the format, or unknown), the precision, and known caveats. Typical caveats: Windows event logs stored in UTC but often exported in the viewer's local time; FAT and some archive timestamps in local time with two-second precision; syslog lines without a year or zone; browser and application timestamps in different epochs; NTFS `$STANDARD_INFORMATION` times that can be altered while `$FILE_NAME` times usually are not. If a source's zone is unknown, keep it in a separate column and do not merge it silently.
3. Normalise every timestamp to {{output_timezone}} in ISO 8601 and sort.
4. Correlate: group events that describe the same action across sources (a logon event, a process start and a network connection within seconds from the same account), and mark the pivot points such as first attacker access, privilege change, lateral movement, persistence, data access and exfiltration.
5. Classify each row: attacker activity (confirmed by direct evidence), suspicious (consistent with the attack but with an innocent explanation possible), normal, or unknown. Give the reason in a few words and an ATT&CK tactic where it applies.
6. Write the narrative of the attack in phases, citing row numbers, and keep confirmed and inferred steps apart.
7. List evidence gaps: periods with no data, sources that rolled over or were cleared (a cleared log is itself evidence), and hosts or accounts in scope with no artefacts.
8. Before answering, check that no row was dropped or duplicated, that every row has a source, and that the narrative cites only rows that exist.
</task>

<constraints>
- Never invent events or fill a gap with what "probably happened"; write the gap.
- Distinguish absence of evidence from evidence of absence: no log entry may mean no logging.
- Work only from the artefacts provided; recommend that analysis is done on verified copies with hashes recorded, not on original evidence.
- Do not name a threat actor; attribution is out of scope.
{{> output/uncertainty}}
</constraints>

<output_format>
## Scope and assumptions
Bullets.

## Clock notes
Table: Source | Assumed timezone | Basis | Precision | Caveats.

## Timeline
Table: # | Time ({{output_timezone}}) | Source | Host | Account | Event | Classification | Tactic | Note.

## Attack narrative
Phases with row references; inferred steps marked "(inferred)".

## Evidence gaps
Bullets with the time range or source and why it matters.

## Next artefacts
Numbered list of what to collect next and the question each would answer.
</output_format>
