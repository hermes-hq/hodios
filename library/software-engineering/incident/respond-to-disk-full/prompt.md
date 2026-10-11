---
schema: 1
id: respond-to-disk-full
kind: prompt
title: Respond to a full disk in production
description: Handles a full disk or volume in production by freeing space safely, finding what grew, avoiding deleting open or needed files, and preventing the next one.
category: incident
version: 1.0.0
status: incubating
stage: [operate]
role: [sre, devops-engineer, backend-engineer]
stack: []
requires: [none]
inputs: [logs, text]
output: [plan, checklist, summary]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [disk-full, no-space-left, log-rotation, inodes, deleted-open-files]
pairs_with:
  prompts: [triage-production-alert, write-runbook, design-alerting-rules]
  personas: [site-reliability-engineer]
args:
  - name: situation
    description: The host or volume, what runs on it, the error you see (for example "No space left on device"), and any pasted output of df -h, df -i, du or the database's own size views.
    type: text
    required: true
  - name: environment
    description: OS and setup (VM, container, Kubernetes node, managed database), what logs, data or build artefacts live there, and whether the volume can be resized online.
    type: text
output_contract:
  format: markdown
  sections: [Current read, Next step, Do not delete, Summary]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help an engineer recover a host or volume that ran out of space. Full disks break things in odd ways: databases stop accepting writes or crash, logs stop, package managers corrupt state, and applications fail with misleading errors. The order that keeps people out of trouble is: buy headroom safely, find what grew, fix the growth, prevent recurrence. Experts know a few traps: deleting a log file that a process still holds open frees nothing (`lsof +L1` shows deleted-but-open files; truncate them or restart the writer instead); `df` can say full while `du` finds little, which means deleted-open files, a mount hidden under another mount, or reserved blocks; "No space left" with free bytes means inodes are exhausted (millions of tiny files, often sessions, cache or mail queue); and never delete database files, write-ahead logs or transaction logs by hand, which corrupts the database. Postgres WAL usually grows because of a stuck replication slot or failing archive command; MySQL binlogs need `PURGE BINARY LOGS`, not `rm`. On Kubernetes nodes, container logs, images and emptyDir volumes are the usual growth, and disk pressure evicts pods. Resizing a cloud volume is often the fastest safe headroom, but the filesystem must be grown too.
</context>

<task>
<situation>
{{situation}}
</situation>
{{#environment}}
<environment>
{{environment}}
</environment>
{{/environment}}

1. Restate what is full (bytes or inodes, which mount) and what is failing because of it. If the evidence is missing, ask for `df -h` and `df -i` first.
2. Give the safest way to get headroom now, in this order of preference: expand the volume online if possible (plus the filesystem grow command), compress or move old rotated logs and artefacts, clean package or build caches with the tool's own command, truncate (not delete) a huge open log file. Label each command as read-only or write, and say what it frees and what it risks.
3. Find what grew: `du -xh --max-depth=1` from the mount point down, `lsof +L1` for deleted-open files, inode counts per directory for inode exhaustion, the database's own size views for data or WAL.
4. Identify the cause and the real fix: log rotation missing or broken, debug logging left on, a stuck replication slot or archive, a job writing temp files without cleanup, data growth that needs a bigger volume or retention.
5. Prevention: alert on percentage used and on rate of growth (hours until full), log rotation with size caps, retention on artefacts and backups.
6. Each turn, end with one next step and what you need back from the user.
</task>

<constraints>
- Never suggest deleting database data files, WAL, binlogs or transaction logs by hand; use the database's own commands and warn about replication or recovery effects.
- Never suggest `rm -rf` on a broad path. Every delete command names exact files or uses a dry-run listing first, and the user confirms before running it.
- Say when a step restarts or interrupts a service.
- Do not claim to see the host; work from pasted output only.
{{> output/uncertainty}}
</constraints>

<output_format>
Each turn:
**Current read:** what is full and the likely cause.
**Next step:** the command or action, labelled read-only or write, what it frees or shows, and its risk.
**Do not delete:** files on this host that look tempting but must not be removed, when relevant.

Closing:
## Summary
What filled up and why, what was freed or resized, the lasting fix, and the alert or rotation added.
</output_format>
