---
schema: 1
id: deploy-to-vps
kind: prompt
title: Deploy an app to a VPS
description: Takes an app from a fresh VPS to production with a non-root user, firewall, process manager, reverse proxy, TLS, repeatable deploys and rollback. Use when self-hosting on a single server.
category: devops
version: 1.0.1
status: incubating
stage: [ship, operate]
role: [fullstack-engineer, backend-engineer, founder, devops-engineer]
stack: []
requires: [none]
inputs: [text]
output: [plan, config, script]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
tags: [vps, self-hosting, systemd, deployment, rollback]
pairs_with:
  prompts: [harden-linux-server, write-reverse-proxy-config, set-up-domain-and-https]
args:
  - name: app
    description: The app - language and runtime, how it is built and started, port, database and other services, environment variables it needs, and the domain it should serve.
    type: text
    required: true
  - name: provider
    description: VPS provider and operating system image, for example "Hetzner, Ubuntu 24.04" or "DigitalOcean, Debian 12".
    type: string
output_contract:
  format: markdown
  sections: [Architecture, Steps, Files, Deploying updates, Rollback, Maintenance]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "SSH changes go in a drop-in that cloud-image defaults cannot override and are checked with sshd -T, and Docker ports are bound to localhost because Docker bypasses the host firewall."}
---
<context>
A single server is a fine home for many apps, but hand-built servers fail in familiar ways: the app runs as root inside a terminal multiplexer and dies on reboot, SSH password login invites brute-forcing, the firewall is enabled before SSH is allowed and locks the owner out, secrets sit in a world-readable file, deploys edit files in place with no way back, the disk fills with logs, and nobody notices the site is down. The reader will run every command themselves, so order matters and each step needs a check.
</context>

<task>
Deploy this app to a VPS{{#provider}} ({{provider}}){{/provider}}:
<app>
{{app}}
</app>

1. If the runtime, the start command, the port or the database situation is unknown, ask and stop. Choose Docker Compose or a native systemd service from how the app is built (an existing Dockerfile tips it to Compose) and say why in one sentence.
2. Write the steps in this order, each with commands for the given operating system and a "Check:" line:
   1. First login and updates; create a non-root user with sudo and install the reader's SSH public key.
   2. In a second terminal, confirm key login as the new user works. Only then disable root login and password authentication in a drop-in file that sorts first in `/etc/ssh/sshd_config.d/` (cloud images often ship a file there that turns password login back on, and the first value read wins), validate with `sshd -t`, confirm the effective values with `sshd -T`, and reload, keeping the first session open until the check passes.
   3. Firewall: allow SSH first, then 80 and 443, then enable it (ufw on Debian and Ubuntu, firewalld on RHEL family).
   4. Automatic security updates (unattended-upgrades or dnf-automatic).
   5. Runtime or Docker installed from the official repositories; a dedicated system user that owns the app.
   6. Configuration: an environment file owned by the app user with mode 600, never committed.
   7. Process manager: a systemd unit with `Restart=on-failure`, the app user, the environment file and basic sandboxing (`NoNewPrivileges`, `ProtectSystem`), or a Compose file with restart policies and health checks. The app listens on localhost only. With Docker, publish ports as `127.0.0.1:PORT:PORT` or not at all, because ports Docker publishes bypass ufw and firewalld rules.
   8. Reverse proxy with automatic TLS (Caddy is the shortest path; nginx with certbot if the reader prefers), proxying to the local port.
   9. Database: if it runs on the same box, bind it to localhost and schedule a nightly dump copied off the server.
   10. Logs with rotation (journald limits or Docker log options) and an external uptime check.
3. Deploys: a script that builds or pulls a new release into a timestamped directory (or a new image tag), runs migrations, switches a `current` symlink (or recreates the container), restarts and runs a health check, keeping the last few releases.
</task>

<constraints>
- Never suggest disabling SSH password login, changing the SSH port or enabling the firewall before the reader has proved they can still get in.
- Do not expose the database or the app port to the internet.
- Install software only from the distribution's or the vendor's signed package repositories, never by piping a downloaded script into a shell.
- This is a deployment guide, not full hardening; point to a hardening checklist for audit logging, intrusion detection and kernel settings.
</constraints>

<output_format>
## Architecture
Three bullets: what runs where, what is exposed, where data and backups live.
## Steps
The numbered steps above with commands and "Check:" lines.
## Files
Fenced blocks with paths: unit or Compose file, proxy config, environment file template with placeholder values, deploy script.
## Deploying updates
How to run a deploy and what the health check verifies.
## Rollback
The exact commands to return to the previous release.
## Maintenance
Monthly checklist: updates, backup restore test, disk space, certificate renewal.
</output_format>
