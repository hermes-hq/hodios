---
schema: 1
id: upgrade-ubuntu-server-release
kind: prompt
title: Upgrade an Ubuntu server to the next LTS release
description: Plans and runs an Ubuntu Server LTS upgrade, in place or by rebuilding, with package and service inventory, snapshot, third-party repository checks, post-upgrade service tests and a rollback.
category: migration
version: 1.0.0
status: incubating
stage: [maintain, operate]
role: [devops-engineer, sre, backend-engineer]
requires: [shell]
inputs: [text, config]
output: [plan, checklist, report]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
tags: [ubuntu, linux, do-release-upgrade, server-maintenance, end-of-life]
pairs_with:
  prompts: [upgrade-database-major-version, plan-maintenance-window, write-cloud-init-script]
args:
  - name: target_release
    description: The Ubuntu LTS release to reach, for example "24.04" or "26.04".
    type: string
    required: true
  - name: notes
    description: "Current release, what the server runs (web server, database, language runtimes, Docker), third-party repositories or PPAs, whether it is a cloud VM with snapshots, how much downtime is acceptable, and whether it is managed by config management."
    type: text
output_contract:
  format: markdown
  sections: [Inventory, Approach, Runbook, Post-upgrade checks, Rollback]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Ubuntu LTS upgrades go one LTS at a time (20.04 to 22.04 to 24.04); you cannot skip one. `do-release-upgrade` only offers the next LTS after its first point release unless forced, which is a sensible signal to wait for. There is no supported downgrade, so the rollback is a snapshot or a rebuilt server, and taking it is not optional. The upgrade disables third-party repositories and PPAs, which must be re-enabled for the new release (if the vendor publishes one) or those packages go stale. The packaged versions of everything move: PHP, Python, PostgreSQL and others jump a major version, so a system Python bump breaks virtual environments that link to the old interpreter, and a PostgreSQL package upgrade leaves the old cluster running beside an empty new one until it is migrated. Newer releases mark the system Python as externally managed, so `pip install` into it is refused. Config files you edited trigger prompts to keep yours or take the maintainer's version; the right answer is usually to diff and merge. OpenSSH changes between releases (for example socket activation and stricter algorithms) can lock you out of a remote server. For servers built by automation, rebuilding on the new release and cutting over is often safer than upgrading in place.
</context>

<task>
Plan and run the upgrade of this server to Ubuntu {{target_release}}.
{{#notes}}
Notes:
{{notes}}
{{/notes}}

1. Inventory the server (ask the user to run read-only commands if you have no access): release, kernel, installed packages and their origin, third-party repositories, running services and listening ports, cron jobs and timers, language runtimes and virtual environments, databases and their versions, Docker, edited files under `/etc`, disk space.
2. Choose the approach: in-place upgrade, or rebuild on the new release and cut over. Recommend one with reasons (automation in place, downtime allowed, how hand-configured the server is).
3. For each important package or service, note the version change between releases and what it implies (runtime major bumps, database cluster migration, removed packages). Check each third-party repository supports the target.
4. Write the runbook: backups and a snapshot, full update and reboot on the current release, run the upgrade inside `tmux` or `screen` with a second SSH session open, how to answer config file prompts, re-enable repositories, reboot.
5. Write post-upgrade checks: SSH on a new session before closing the old one, each service started and answering, logs clean, virtual environments recreated, database cluster migrated and old one kept until verified, cron and timers running, firewall rules intact.
6. Write the rollback: restore the snapshot or switch back to the old server, with the point after which data written on the new system would be lost.
</task>

<constraints>
- Never run the upgrade, reboot, or remove packages without the user's explicit go-ahead; give commands for them to review.
- Require a snapshot or full backup that has been checked before the upgrade starts.
- Do not recommend skipping an LTS or forcing a pre-point-release upgrade on production without stating the risk.
- Do not guess package versions in the target release; tell the user how to check them if unsure.

{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Inventory
What runs on the server and what changes with the release.
## Approach
In-place or rebuild, with reasons.
## Runbook
Numbered steps with commands, expected output and decision points.
## Post-upgrade checks
Checklist per service.
## Rollback
Trigger, steps, data-loss boundary.
</output_format>
