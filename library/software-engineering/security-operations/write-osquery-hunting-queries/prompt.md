---
schema: 1
id: write-osquery-hunting-queries
kind: prompt
title: Write osquery hunting queries
description: Writes osquery SQL to hunt across endpoints for persistence, odd processes, listening ports and rogue extensions, with expected baselines, stacking advice and safe scheduling.
category: security-operations
version: 1.0.0
status: incubating
stage: [operate]
role: [security-engineer]
requires: [none]
inputs: [text]
output: [code, explanation, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [osquery, threat-hunting, endpoint-visibility, persistence, fleet-management]
pairs_with:
  prompts: [write-threat-hunt-plan, write-siem-query, investigate-windows-persistence, triage-compromised-linux-server]
  personas: [detection-engineer]
args:
  - name: hunt_goal
    description: What you are looking for, such as new persistence, processes running from temp folders, unexpected listening ports, browser extensions or SSH keys, and why now.
    type: text
    required: true
  - name: platforms
    description: Operating systems in scope and rough fleet size, for example "800 Windows 11 laptops, 60 Ubuntu servers, 300 macOS".
    type: string
    required: true
  - name: tooling
    description: How you run osquery - osqueryi on one host, Fleet, Kolide, an EDR live query feature, or scheduled packs to a SIEM.
    type: string
    default: "live queries from a fleet manager"
  - name: baseline
    description: Optional notes on what is normal - standard software, admin tools, agents, golden image contents.
    type: text
output_contract:
  format: markdown
  sections: [Assumptions, Queries, Reading the results, Stacking across the fleet, Scheduling and cost, Limits]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
osquery exposes live operating system state as SQL tables, which makes it good at questions a SIEM cannot answer from logs: what is installed, running and listening right now. Hunters get poor results when they write a query per host instead of stacking results across the fleet, when they use tables that do not exist on a platform (`scheduled_tasks` is Windows, `launchd` is macOS, `crontab` and `systemd_units` are Linux), when they hash every file under a broad path and stall endpoints, or when they treat every unsigned binary as malicious. Least frequency of occurrence works: an entry seen on 3 of 900 hosts deserves a look, the same entry on 880 hosts is usually the golden image. Some signals are strong on their own, such as a process whose binary is deleted from disk (`processes.on_disk = 0`) or a shell owned by a web server user.
</context>

<task>
Write osquery hunting queries for:

<hunt_goal>
{{hunt_goal}}
</hunt_goal>

Platforms: {{platforms}}
Tooling: {{tooling}}
{{#baseline}}

<baseline>
{{baseline}}
</baseline>
{{/baseline}}

1. Restate the hunt as two to five concrete questions, each answerable from osquery tables on the stated platforms.
2. For each question, write one query per platform that needs it. Use only tables and columns you are confident exist (for example `processes`, `listening_ports`, `process_open_sockets`, `startup_items`, `services`, `scheduled_tasks`, `registry`, `wmi_event_filters`, `launchd`, `crontab`, `systemd_units`, `authorized_keys`, `users`, `chrome_extensions`, `kernel_modules`, `signature`, `authenticode`, `hash`). Join on `pid` or `path` to add context such as the binary path, parent, user and signer.
3. Keep queries cheap: filter on indexed or required columns, constrain `file` and `hash` to specific directories, avoid recursive `%%` globs on whole disks, and say which queries are only safe on a single host.
4. For each query, describe what normal looks like given the baseline and the specific values that would make a row suspicious (user-writable paths such as AppData, ProgramData, /tmp or /dev/shm; deleted binaries; unsigned binaries in system folders; listeners on all interfaces from user processes; extensions with broad permissions installed outside policy).
5. Give a stacking approach: which columns to group by across hosts and a threshold for "rare" relative to fleet size.
6. Say which queries are worth scheduling, at what interval, and whether to use differential results, and which should stay ad hoc.
7. List what osquery cannot see for this hunt (for example short-lived processes between polls unless event tables are enabled, kernel rootkits that lie to user space) and what to use instead.
</task>

<constraints>
- Read-only queries only. Do not suggest osquery extensions or actions that change the host.
- Never invent table or column names. If you are not sure a column exists on a platform, say so and tell the user to check with `.schema <table>` in osqueryi.
- Do not label a row malicious from one attribute. Suspicion needs a reason that fits the hunt.
{{> output/uncertainty}}
</constraints>

<output_format>
## Assumptions
Platforms, osquery version assumptions, event tables enabled or not.

## Queries
For each question: a heading, the platform, one fenced `sql` block, and one line on its cost.

## Reading the results
Table: Query | Normal | Suspicious when | First follow-up.

## Stacking across the fleet
Group-by columns and rarity thresholds.

## Scheduling and cost
Which to schedule, interval, differential or snapshot, and which to keep ad hoc.

## Limits
What this hunt cannot see and the complementary source.
</output_format>
