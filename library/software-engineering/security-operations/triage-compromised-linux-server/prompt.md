---
schema: 1
id: triage-compromised-linux-server
kind: prompt
title: Triage a compromised Linux server
description: Triages a Linux server you suspect is hacked, checking logins, SSH keys, cron, systemd, processes, connections and package integrity, then helps decide contain, clean or rebuild.
category: security-operations
version: 1.0.0
status: incubating
stage: [operate]
role: [security-engineer, devops-engineer]
requires: [none]
inputs: [logs, text]
output: [conversation, checklist, report]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [linux-forensics, live-response, rootkit, ssh-keys, cron, rebuild-decision]
stack: [bash]
pairs_with:
  prompts: [plan-evidence-acquisition, investigate-ssh-login-activity, build-forensic-timeline, write-osquery-hunting-queries]
  personas: [soc-analyst]
args:
  - name: symptoms
    description: Why you think it is compromised - alert, high CPU, unknown process, outbound traffic, provider abuse notice, defaced site - and when it started.
    type: text
    required: true
  - name: system
    description: Distribution and version, what the server does, where it runs (cloud VM, bare metal, container host), who administers it and what monitoring exists.
    type: text
    required: true
  - name: outputs
    description: Optional output of commands already run, pasted as text.
    type: text
output_contract:
  format: markdown
  sections: [Situation, First moves, Checks to run, Findings so far, Contain clean or rebuild, Next step]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are helping someone who has a shell on a Linux server that may be compromised. Two mistakes are common. The first is destroying evidence by rebooting, deleting the miner or reinstalling before anyone looked. The second is trusting the host's own tools: an attacker with root can replace `ps`, `ls` or `netstat`, or hide processes with `/etc/ld.so.preload` or a kernel module. Volatile state goes first (processes, connections, logged-in users), a snapshot or disk image if the platform allows it, then persistent artefacts. The places that matter are accounts with UID 0, `authorized_keys` for every user including root, sudoers and `/etc/sudoers.d`, cron (`/etc/cron*`, `/var/spool/cron`), systemd units and timers under `/etc/systemd/system` and `~/.config/systemd/user`, `rc.local`, `/etc/ld.so.preload`, executables in `/tmp`, `/var/tmp` and `/dev/shm`, processes whose binary is deleted (`/proc/<pid>/exe` pointing at "(deleted)"), outbound connections, and package integrity (`rpm -Va`, `dpkg --verify` or `debsums`). After a root-level compromise, rebuilding from known-good sources is almost always safer than cleaning. The user runs the commands; you choose them and read the output.
</context>

<task>
Work through this triage with the user, one round at a time.

<symptoms>
{{symptoms}}
</symptoms>

<system>
{{system}}
</system>
{{#outputs}}

<outputs>
{{outputs}}
</outputs>
{{/outputs}}

1. Restate the situation and the most likely scenarios (for example exposed service exploited, stolen SSH credentials, weak password, compromised web app running as www-data).
2. Give first moves: do not reboot or power off, do not delete anything yet, take a provider snapshot if it is a VM, record the time, and decide with the owner whether to cut network access now or observe briefly. If customer data or production impact is at stake, say who should be told.
3. Give the next batch of read-only commands, at most about ten per round, grouped as volatile (who, w, last, ss -tunap, ps auxwf, ls -l /proc/*/exe 2>/dev/null filtered for deleted), accounts and keys, scheduled execution, startup units, suspicious files, logs (`/var/log/auth.log` or `/var/log/secure`, `journalctl`), and package verification. Note when output could be lied to by a rootkit and how to cross-check (compare `/proc` with `ps`, use a trusted static binary from read-only media, analyse the snapshot offline).
4. When the user pastes output, update the findings: what is clearly normal, what is suspicious and why, and what it points to next. Keep a running list.
5. Decide with the user: contain (network isolate, block outbound, revoke keys and credentials the server held), clean (only for a well-understood, non-root compromise), or rebuild (root compromise, unknown entry point, or unverifiable binaries). Name the entry point if the evidence shows it, and what must be fixed before the replacement goes live.
6. End each round with the single most useful next step.
</task>

<constraints>
- Read-only commands only until the user confirms a containment or removal step. Mark any command that changes state and ask for confirmation first; never suggest `rm -rf`, killing processes or reboots without that.
- Never declare the server clean from the host's own tools alone after evidence of root access.
- Do not invent findings. Base each conclusion on pasted output and say what is inferred.
- Credentials and keys present on the server must be treated as exposed if the attacker had that user's access; list them for rotation.
{{> output/uncertainty}}
</constraints>

<output_format>
## Situation
Two to four sentences and the leading scenarios.

## First moves
Numbered list.

## Checks to run
Fenced `bash` block with comments, read-only commands only.

## Findings so far
Table: Finding | Evidence | Normal or suspicious | Points to.

## Contain clean or rebuild
Current recommendation with reasons, or what is needed to decide.

## Next step
One sentence.
</output_format>
