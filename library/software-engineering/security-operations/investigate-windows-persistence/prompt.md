---
schema: 1
id: investigate-windows-persistence
kind: prompt
title: Investigate Windows persistence
description: Checks a Windows host for persistence in run keys, services, scheduled tasks, WMI subscriptions, startup folders and COM hijacks, and separates malicious entries from normal software.
category: security-operations
version: 1.0.0
status: incubating
stage: [operate, review]
role: [security-engineer]
requires: [none]
inputs: [logs, text]
output: [report, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [autoruns, windows-persistence, scheduled-tasks, wmi, registry, endpoint-triage]
stack: [powershell]
pairs_with:
  prompts: [investigate-windows-event-logs, triage-soc-alert, plan-evidence-acquisition, build-forensic-timeline]
  personas: [soc-analyst]
args:
  - name: findings
    description: Output from Autoruns or autorunsc, PowerShell listings of services, scheduled tasks, WMI subscriptions and run keys, or EDR persistence data for the host.
    type: text
    required: true
  - name: host_context
    description: What the host is (user laptop, server role), who uses it, why you suspect it, and the standard software on it.
    type: text
output_contract:
  format: markdown
  sections: [Coverage check, Suspicious entries, Likely benign, Commands to fill gaps, Evidence to collect, Removal plan]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Windows has dozens of autostart locations, and attackers prefer the ones defenders forget: WMI event subscriptions (`__EventFilter`, `CommandLineEventConsumer`, `__FilterToConsumerBinding`), per-user COM hijacks under `HKCU\Software\Classes\CLSID` that override the machine entry, Image File Execution Options `Debugger` values, Winlogon `Userinit` and `Shell`, services with a `ServiceDll` under svchost, and scheduled tasks whose security descriptor was removed so they do not show in Task Scheduler. Autoruns covers most of these when run as administrator with "Hide Microsoft entries" and signature verification. A legitimate updater and a malicious loader can look alike; the useful signals are a binary in a user-writable path (AppData, ProgramData, Temp, Users\Public), an unsigned or mismatched publisher, a LOLBin launcher (`mshta`, `rundll32`, `regsvr32`, `wscript`, `powershell -enc`), a random or lookalike name, and a creation time that fits the incident. Attackers often plant two mechanisms, so removing the first one found is rarely the end.
</context>

<task>
Review these persistence findings:

<findings>
{{findings}}
</findings>
{{#host_context}}

<host_context>
{{host_context}}
</host_context>
{{/host_context}}

1. Check coverage: which autostart categories the findings include (run keys, RunOnce, services and drivers, scheduled tasks, WMI, startup folders, Winlogon, IFEO, AppInit, COM, LSA packages, Office add-ins, browser extensions, BITS jobs) and which are missing.
2. Go through every entry that is not a verified Microsoft or known vendor component, and rate it suspicious, needs checking or likely benign with the specific reason.
3. For suspicious entries, extract the launch command, binary path, signer, hash if given and any URL or IP, defanged (`hxxp`, `[.]`).
4. Give read-only commands to fill the coverage gaps, such as `autorunsc -a * -c -h -s -m` run as administrator, `Get-ScheduledTask | Where-Object {$_.TaskPath -notlike '\Microsoft\*'}`, `Get-CimInstance -Namespace root\subscription -ClassName __EventFilter` (and the consumer and binding classes), and `Get-ItemProperty` on the relevant keys.
5. List evidence to collect before anything is removed: the binaries and their hashes, the task XML, registry key exports, WMI repository, relevant event logs (7045, 4697, 4698, Sysmon 12 to 14 and 19 to 21 if present) and a triage collection.
6. Write a removal plan only for entries rated suspicious, ordered so the attacker cannot re-create one from another, with a check that each was removed, and a note on whether rebuilding the host is the safer choice.
</task>

<constraints>
- Do not call an entry malicious because it is unsigned or unfamiliar alone; say what would confirm it.
- Do not recommend deleting anything before evidence is collected, and mark removal steps as requiring the incident lead's approval.
- Never invent vendor names or claim a hash is known bad. Suggest a reputation lookup by hash instead.
- If the host had administrator-level compromise, say that cleaning in place may miss persistence and recommend a rebuild decision.
{{> output/uncertainty}}
</constraints>

<output_format>
## Coverage check
Covered and missing autostart categories.

## Suspicious entries
Table: Location | Entry | Launch command | Signer | Why suspicious | Confidence.

## Likely benign
Short table of entries reviewed and why they look normal.

## Commands to fill gaps
Fenced `powershell` block, read-only commands only.

## Evidence to collect
Checklist.

## Removal plan
Ordered steps with verification, labelled "after approval", plus the rebuild recommendation.
</output_format>
