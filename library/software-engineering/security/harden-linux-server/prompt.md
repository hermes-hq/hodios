---
schema: 1
id: harden-linux-server
kind: prompt
title: Harden a Linux server
description: Hardens a Linux server in a safe order (SSH, users, firewall, updates, unused services, logging, mandatory access control) with a check and rollback per step. Use on new or inherited servers.
category: security
version: 1.0.0
status: incubating
stage: [operate, ship]
role: [devops-engineer, sre, security-engineer, backend-engineer]
stack: []
requires: [none]
inputs: [text, config]
output: [plan, checklist, script]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
tags: [server-hardening, ssh, firewall, cis-benchmark, linux]
pairs_with:
  personas: [security-auditor]
  prompts: [deploy-to-vps, harden-web-app-config]
args:
  - name: distribution
    description: Distribution and version, for example "Ubuntu 24.04", "Debian 12", "Rocky Linux 9" or "Amazon Linux 2023".
    type: string
    required: true
  - name: services
    description: What the server must keep doing - public services and ports, who logs in and how, management agents, and whether it runs containers.
    type: text
output_contract:
  format: markdown
  sections: [Before you start, Steps, Service notes, Verify, Not covered]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Hardening guides are long and unordered, and the order is what causes outages: a firewall enabled before SSH is allowed, password login disabled before key login was tested, SELinux or AppArmor switched off to make an app work, and sysctl values copied from a decade-old blog that break networking. A useful hardening pass removes the most exposure first, changes one thing at a time, proves it can still be reached after each change, and leaves the service doing its job. Benchmarks such as the CIS benchmarks go deeper and are the reference for audits.
</context>

<task>
Harden a {{distribution}} server.
{{#services}}
It must keep providing:
{{services}}
{{/services}}

1. If you do not know which services and ports must stay reachable or how administrators log in, ask and stop; hardening without that list breaks things.
2. **Before you start:** a snapshot or backup, and out-of-band console access from the provider confirmed working.
3. Steps, in this order, each with the reason, the commands for {{distribution}}, a "Check:" line and a "Rollback:" line:
   1. Apply all updates and reboot if the kernel changed.
   2. Named admin accounts with sudo; no shared logins; lock unused accounts.
   3. SSH: key-only authentication, no root login, an `AllowUsers` or `AllowGroups` list, a short `LoginGraceTime`. Validate the config with `sshd -t` and test a new session before closing the current one.
   4. Firewall default-deny inbound, allowing SSH (ideally from known addresses) and the listed services, using the distribution's tool (ufw, firewalld or nftables). Note that Docker publishes ports around ufw and how to handle it if containers run.
   5. Automatic security updates and how reboots are handled.
   6. Remove or disable what is not needed: list listening sockets (`ss -tulpn`) and enabled units, and disable anything not on the service list.
   7. Brute-force protection for SSH (fail2ban or sshguard) if SSH is reachable from the internet.
   8. Time sync, persistent journald with size limits, auditd with a small rule set for authentication, sudo and changes to users and SSH config, and shipping logs off the host if possible.
   9. Keep SELinux or AppArmor enforcing; show how to read denials and fix policy instead of disabling it.
   10. Service sandboxing for the server's own systemd units (`NoNewPrivileges`, `ProtectSystem`, `PrivateTmp`, a dedicated user), and file permissions on secrets.
   11. A small set of kernel parameters with a reason each (for example `kernel.kptr_restrict`, reverse-path filtering, ignoring ICMP redirects), nothing that changes networking the services rely on.
4. Finish with a scan (Lynis or the distribution's OpenSCAP profile) and say how to read its output.
</task>

<constraints>
- One change at a time, each verified; never batch SSH and firewall changes together.
- Do not change the SSH port as a security measure in place of keys; mention it only as noise reduction.
- Use commands and package names that exist on {{distribution}}; if unsure, say so.
- Do not install agents, scanners or repositories beyond what a step needs.
</constraints>

<output_format>
## Before you start
Checklist.
## Steps
The numbered steps with commands, "Check:" and "Rollback:" lines.
## Service notes
Anything specific to the listed services (ports, users, sandboxing options).
## Verify
A final checklist of what should now be true, with commands.
## Not covered
Bullets: what full CIS-level hardening, intrusion detection or compliance would add.
</output_format>
