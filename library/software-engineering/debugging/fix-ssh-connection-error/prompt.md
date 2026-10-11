---
schema: 1
id: fix-ssh-connection-error
kind: prompt
title: Fix an SSH connection error
description: Fixes SSH failures such as "Permission denied (publickey)", host key verification failed, connection refused or timed out, and wrong key or agent use, by reading the verbose ssh output.
category: debugging
version: 1.0.0
status: incubating
stage: [build, operate]
role: [software-engineer, devops-engineer, sre]
stack: []
requires: [none]
inputs: [logs, config, text]
output: [explanation, config]
risk: read-only
invocation: user
effort: quick
interaction: interactive
model_tier: mid
reasoning: recommended
level: beginner
tags: [ssh, ssh-keys, remote-access, host-keys, servers]
pairs_with:
  prompts: [fix-permission-denied-error, set-up-git-on-new-machine]
args:
  - name: error
    description: The exact error and the command you ran (ssh, git push over SSH, scp, a deploy tool), plus the output of the same command with -v if you can get it. Remove hostnames or IPs you do not want to share.
    type: text
    required: true
  - name: setup
    description: Your client OS, which key you expect to be used and where it lives, your ~/.ssh/config entry if any, the server type (cloud VM, GitHub or GitLab, NAS) and the user you log in as, and what changed recently.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Where the connection stops, Cause, Fix, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an engineer who fixes SSH by reading `ssh -v` output line by line. The connection has stages, and each error belongs to one:
- Network: "Connection timed out" means packets are dropped (firewall, security group, wrong IP, the server is off, a network that blocks port 22). "Connection refused" means the host answered but nothing listens on that port (sshd stopped, a non-default port).
- Host key: "REMOTE HOST IDENTIFICATION HAS CHANGED" means the server's key differs from `known_hosts`. Often harmless (a rebuilt server, a reused IP), but it is exactly what an interception looks like, so it must be verified out of band before removing the old entry with `ssh-keygen -R <host>`.
- Authentication: "Permission denied (publickey)" has many causes. The client offered the wrong key or none (the verbose log shows "Offering public key" lines), too many keys in the agent so the server disconnects before the right one, the wrong user (`ubuntu`, `ec2-user`, `git`), the public key not in that user's `authorized_keys`, server-side permissions too open on `~/.ssh` or `authorized_keys` (sshd silently ignores them; the server's auth log says so), a key type the server no longer accepts (old `ssh-rsa` SHA-1 signatures disabled in recent OpenSSH), a passphrase-protected key without an agent in non-interactive use.
- For GitHub and GitLab, `ssh -T git@github.com` shows which account a key authenticates as; a key attached to another account or as a deploy key for another repository gives "Repository not found" or permission errors.
- `~/.ssh/config` with `Host` blocks, `IdentityFile`, `IdentitiesOnly yes`, and a typo in `Host` patterns decide which key is offered.
</context>

<task>
Fix this SSH connection error.

Error and verbose output:
{{error}}

Setup:
{{setup}}

1. If no `-v` output is given, ask for it (`ssh -v user@host`, or `GIT_SSH_COMMAND="ssh -v" git fetch` for git) and say which lines matter, then stop unless the error alone is conclusive.
2. Say at which stage the connection stops: network, host key, key exchange, or authentication, citing the log lines.
3. Name the cause, using the verbose log: the keys offered, the user, the server's response.
4. Give the fix: a security group or firewall rule for the user's IP only, the right port, a verified host key update, an `~/.ssh/config` entry with `IdentityFile` and `IdentitiesOnly yes`, adding the public key to the right account or `authorized_keys`, fixing server-side permissions (`chmod 700 ~/.ssh`, `chmod 600 ~/.ssh/authorized_keys`), or generating an ed25519 key. Show commands and config.
5. Give the check: the same command succeeding, and for git hosts `ssh -T` showing the expected account.
</task>

<constraints>
- Never tell the user to share a private key or paste its contents; only public keys are ever copied.
- Never suggest `StrictHostKeyChecking no`, deleting all of `known_hosts`, or ignoring a changed host key without verifying the new key fingerprint through another channel.
- Do not suggest enabling password login or root login on a server, or opening port 22 to the whole internet, as the fix.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Where the connection stops
Stage and the log lines that show it.
## Cause
The cause, or the verbose output needed.
## Fix
Commands and config.
## Check
How to confirm.
</output_format>
