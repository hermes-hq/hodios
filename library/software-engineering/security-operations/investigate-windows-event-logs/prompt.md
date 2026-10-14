---
schema: 1
id: investigate-windows-event-logs
kind: prompt
title: Investigate Windows event logs
description: Investigates Windows Security, Sysmon and PowerShell logs for logons, process creation, lateral movement and privilege use, naming the event IDs that matter and what they cannot show.
category: security-operations
version: 1.0.0
status: incubating
stage: [operate, review]
role: [security-engineer]
requires: [none]
inputs: [logs, text]
output: [report, table, explanation]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [windows-security-log, sysmon, lateral-movement, logon-events, event-ids]
pairs_with:
  prompts: [build-forensic-timeline, triage-soc-alert, write-siem-query, investigate-windows-persistence]
  personas: [soc-analyst]
args:
  - name: question
    description: What you need to know, such as "did this account log on to other servers", "what ran after the RDP session" or "was this admin account misused".
    type: text
    required: true
  - name: logs
    description: Exported events (EVTX converted to text, CSV, JSON or SIEM results) with timestamps, event IDs, hosts and accounts.
    type: text
    required: true
  - name: environment
    description: Optional notes - domain names, admin and service accounts, jump hosts, normal admin tools, audit policy and whether Sysmon is deployed.
    type: text
output_contract:
  format: markdown
  sections: [Question restated, Logging coverage, Timeline, Findings, Benign explanations checked, Next queries, Answer]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Windows logs answer most host questions if you know which events to read and what each one leaves out. 4624 logons only make sense with the logon type (2 interactive, 3 network, 4 batch, 5 service, 7 unlock, 9 NewCredentials, 10 RemoteInteractive) and the source address. 4648 shows explicit credentials, 4672 marks a privileged logon, 4625 and 4771 show failures, 4768, 4769 and 4776 show Kerberos and NTLM activity on domain controllers (RC4 encryption type 0x17 on 4769 for many services is a Kerberoasting signal). 4688 shows process creation but only includes the command line if that audit setting is on; Sysmon event 1 is richer. Persistence and change appear as 7045 and 4697 (service installed), 4698 (scheduled task), 4720 (user created), 4728, 4732 and 4756 (group membership), and 1102 or 104 (log cleared). PowerShell 4104 shows script blocks. RDP leaves 1149 and LocalSessionManager 21, 24 and 25. The common analyst mistake is concluding "no evidence" when the needed audit category was never enabled, or reading a type 3 logon from a file server as an interactive session.
</context>

<task>
Answer this question from the logs:

<question>
{{question}}
</question>

<logs>
{{logs}}
</logs>
{{#environment}}

<environment>
{{environment}}
</environment>
{{/environment}}

1. Restate the question as specific checks (which accounts, hosts, time window, which event IDs answer each check).
2. Check logging coverage first: which event IDs and channels appear, the time range covered, gaps or clears, timezone of the timestamps, and which needed events are absent because of audit policy, retention or missing Sysmon. Say what that means for the answer.
3. Build a timeline of relevant events, one per row, normalised to one timezone, decoding logon types, status codes and encryption types into plain words.
4. Group related events by logon ID, process GUID or session so a logon links to the processes it ran.
5. Name the findings: lateral movement paths (source host to target host with account and method), privilege use, new services, tasks or accounts, credential access signs, defence evasion such as log clearing.
6. For each finding, list the benign explanation (admin tooling, backup agents, monitoring, service accounts, patching) and whether the logs rule it in or out.
7. Write the next queries to run, in plain event-ID terms and, if the environment names a SIEM, in its query language.
8. Answer the question directly with a confidence level.
</task>

<constraints>
- Use only events present in the logs. Do not assume an event happened because it usually would.
- Absence of an event is evidence only if the audit category was enabled and the logs cover that period. Say so each time.
- Never invent event IDs or field meanings. If unsure, mark `[VERIFY]`.
- Treat hostnames, usernames and IPs as given; do not guess owners.
- Read-only analysis. Recommend containment through `triage-soc-alert` or the incident lead, not on your own.
{{> output/uncertainty}}
</constraints>

<output_format>
## Question restated
Bullets of concrete checks.

## Logging coverage
Present, missing and what the gaps mean.

## Timeline
Table: Time (UTC) | Host | Event ID | Account | Detail | Note.

## Findings
Numbered findings with the events that support each.

## Benign explanations checked
Table: Finding | Benign explanation | Ruled in or out | Why.

## Next queries
Numbered list.

## Answer
Two to four sentences with confidence: high, medium or low.
</output_format>
