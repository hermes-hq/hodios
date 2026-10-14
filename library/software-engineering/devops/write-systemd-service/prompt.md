---
schema: 1
id: write-systemd-service
kind: prompt
title: Write a systemd service or timer
description: Writes a systemd service or timer unit for an app or job, with restart policy, dependencies, an environment file, sandboxing directives, resource limits and journald logging.
category: devops
version: 1.0.0
status: incubating
stage: [build, operate]
role: [devops-engineer, backend-engineer, sre]
stack: [bash]
requires: [none]
inputs: [spec, config]
output: [config, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
depth: specific
tags: [systemd, linux-services, systemd-timer, process-supervision]
pairs_with:
  prompts: [deploy-to-vps, harden-linux-server, write-cloud-init-script]
args:
  - name: program
    description: What runs (command line, language runtime, working directory), whether it is a long-running service or a scheduled job, the port, files it writes, and what it depends on (database, network, mounts).
    type: text
    required: true
  - name: distro
    description: Linux distribution and version, which sets the systemd version and available directives.
    type: string
output_contract:
  format: markdown
  sections: [Units, Environment file, Install, Operate, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most hand-written unit files run the app as root, restart forever in a tight loop, start before the network or database is usable, and read secrets from the unit file itself, which is world-readable. Better defaults are cheap: a dedicated system user or `DynamicUser=yes`, `Restart=on-failure` with `RestartSec` and start-limit settings, `After=` plus `Wants=network-online.target` (and an application-level retry, since "network online" does not mean the database is up), secrets in an `EnvironmentFile` readable only by root or in `LoadCredential=`, and sandboxing (`ProtectSystem=strict`, `ProtectHome`, `PrivateTmp`, `NoNewPrivileges`, `ReadWritePaths` for the directories it writes, `StateDirectory`/`LogsDirectory`). `Type=` must match how the program behaves: `simple` or `exec` for foreground processes, `notify` only if it calls sd_notify, `forking` only for daemons that fork. For scheduled work, a timer with `Persistent=true` catches up after downtime, which cron does not, and `RandomizedDelaySec` avoids every machine running at once. `systemd-analyze security <unit>` scores the sandboxing.
</context>

<task>
Write systemd units for:
{{program}}
{{#distro}}
Distribution: {{distro}}
{{/distro}}

1. Decide service, timer plus oneshot service, or socket activation, and say why. If the command or how the program runs (foreground or daemonising) is unclear, ask and stop.
2. Write the `.service` unit: `Description`, `Documentation` if known, dependencies (`After`, `Wants`, `Requires` only for hard dependencies, `RequiresMountsFor` for mounts), the right `Type`, `ExecStart` with absolute paths, `WorkingDirectory`, `User`/`Group` or `DynamicUser`, `EnvironmentFile`, `Restart=on-failure`, `RestartSec`, `StartLimitIntervalSec`/`StartLimitBurst`, `TimeoutStopSec` that matches graceful shutdown, and `KillSignal` if the app needs a specific one.
3. Add sandboxing directives that the program tolerates, with `ReadWritePaths` or `StateDirectory` for what it writes; leave out any that would break it, and say which and why.
4. Resource limits if useful: `MemoryMax`, `CPUQuota`, `LimitNOFILE`, `TasksMax`.
5. For a timer: `OnCalendar` (with the time zone stated), `Persistent=true`, `RandomizedDelaySec`, `AccuracySec`, and a oneshot service that cannot overlap with itself.
6. Logging to journald via stdout and stderr, with `SyslogIdentifier`.
7. Write the environment file template with placeholders and the required permissions.
</task>

<constraints>
- Never put secrets inside the unit file; use an environment file with mode 0600 or `LoadCredential`.
- Do not run the service as root unless it truly needs it, and then say which capability it needs and use `AmbientCapabilities` instead where possible.
- Only use directives supported by the stated systemd version; if the version is unknown, mark directives newer than systemd 247.
- You write files and commands; do not run `systemctl` against the user's machine.
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Units
One fenced `ini` block per unit, with its path under `/etc/systemd/system/`.
## Environment file
The template and `chmod`/`chown` commands.
## Install
Commands: create user and directories, `systemctl daemon-reload`, `enable --now`, and for timers `list-timers`.
## Operate
Commands for status, logs (`journalctl -u ... -f`), restart, and `systemd-analyze verify` and `security`.
## Notes
Bullets: any sandboxing left out and why, and behaviour to know.
</output_format>
