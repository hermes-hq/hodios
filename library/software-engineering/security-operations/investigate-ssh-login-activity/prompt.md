---
schema: 1
id: investigate-ssh-login-activity
kind: prompt
title: Investigate SSH login activity
description: Reads SSH authentication logs to separate background brute-force noise from real successful or suspicious logins, checks key fingerprints and sessions, and recommends hardening.
category: security-operations
version: 1.0.0
status: incubating
stage: [operate, review]
role: [security-engineer, devops-engineer]
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
tags: [ssh, auth-log, brute-force, linux-forensics, key-fingerprints]
pairs_with:
  prompts: [triage-compromised-linux-server, investigate-risky-sign-in, build-forensic-timeline]
  personas: [soc-analyst]
args:
  - name: auth_logs
    description: Lines from /var/log/auth.log, /var/log/secure or journalctl for sshd, plus `last` or `lastb` output if you have it.
    type: text
    required: true
  - name: context
    description: Who should log in, from where (office, VPN, bastion IPs), with keys or passwords, and the authorized key fingerprints you expect.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Background noise, Successful logins, Suspicious activity, Checks to run, Hardening]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Any SSH port on the internet receives thousands of failed logins a day, and most of it is noise. The lines that matter are the successes: `Accepted password for` or `Accepted publickey for <user> from <ip> port <n> ssh2: <type> SHA256:<fingerprint>`. A success from an address that just produced many failures, a password success where only keys should work, an unknown key fingerprint, a root login, a login at an unusual hour or from an unexpected country, and a session followed quickly by `sudo` or new users are the signals. `Invalid user` lines show usernames that do not exist and are almost always scanning; `Failed password for <real user>` from many addresses means real account names are known. Key fingerprints in the log can be matched to `authorized_keys` entries with `ssh-keygen -lf`. Logs on the host can be altered by someone with root, so a clean log on a box with other signs of compromise proves little.
</context>

<task>
Analyse these SSH logs:

<auth_logs>
{{auth_logs}}
</auth_logs>
{{#context}}

<context_notes>
{{context}}
</context_notes>
{{/context}}

1. Summarise the period covered, number of failed attempts, distinct source addresses and usernames tried, and whether the volume looks like ordinary internet scanning.
2. List every successful login: time, user, source address, method (password or publickey) and key fingerprint, and whether it matches the expected users, sources and keys in the context.
3. Flag suspicious patterns: success after failures from the same source, password success when keys are expected, unknown fingerprints, root logins, logins from addresses that also appear in failures, new users or sudo use soon after login, gaps or truncation in the log.
4. For each flagged item, give the benign explanation to rule out (an admin on a new network, a deploy tool, a new key not yet documented) and what would confirm or rule it out.
5. Give read-only commands to go further: match fingerprints against every `authorized_keys` file, `last` and `lastlog`, sudo entries in the same log, `journalctl -u ssh` or `-u sshd` for the window, and the shell history of the user (noting it can be edited).
6. Recommend hardening ordered by impact: disable password authentication, `PermitRootLogin no` or `prohibit-password`, `AllowUsers` or `AllowGroups`, restrict the port to VPN or bastion addresses, MFA for SSH where available, fail2ban or sshguard for noise, and key inventory and rotation. Say that changing the port only reduces noise.
7. If a suspicious success is likely real, say so plainly and point to the compromised server triage.
</task>

<constraints>
- Do not treat failed attempts alone as a compromise.
- Do not invent geolocation or reputation for addresses; suggest the user look them up.
- Warn before any `sshd_config` change that it can lock admins out, and to keep an existing session open while testing with `sshd -t` and a second login.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Three to five sentences with the overall verdict.

## Background noise
Counts and the top usernames and sources tried.

## Successful logins
Table: Time | User | Source | Method | Fingerprint | Expected?

## Suspicious activity
Numbered items with evidence, benign explanation and how to settle it.

## Checks to run
Fenced `bash` block of read-only commands.

## Hardening
Ordered list with the `sshd_config` lines and the lockout warning.
</output_format>
