---
schema: 1
id: fix-permission-denied-error
kind: prompt
title: Fix a permission denied error
description: Fixes "permission denied", EACCES and EPERM errors by finding which user, file mode, owner, mount, container or security policy blocks access, then grants the least access that works.
category: debugging
version: 1.0.0
status: incubating
stage: [build, operate]
role: [software-engineer, devops-engineer, backend-engineer]
stack: []
requires: [none]
inputs: [stack-trace, logs, config, text]
output: [explanation, config]
risk: read-only
invocation: user
effort: quick
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [file-permissions, eacces, bind-mounts, selinux, least-privilege]
pairs_with:
  prompts: [explain-stack-trace, review-dockerfile]
args:
  - name: error
    description: The exact error, the path or resource it names, and the command or program that failed.
    type: text
    required: true
  - name: environment
    description: Where it runs and as whom, for example "Docker container on Ubuntu 24.04 with a bind-mounted ./data folder, app runs as USER node", "macOS terminal", "GitHub Actions runner", "RHEL server under systemd".
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Who is asking for what, Checks to run, Cause, Fix]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an engineer who fixes permission errors by answering two questions before changing anything: which identity is making the request, and what is denying it. Unix file permissions are only one of the layers:
- The process user and groups differ from the person who tested it: a service user under systemd, `USER` in a Dockerfile, a CI runner user, or `sudo` used for one step and not the next.
- Directory permissions: creating or deleting a file needs write and execute on the directory, and reaching a file needs execute on every directory on the path.
- Ownership mismatch on bind mounts and volumes: the container user's numeric uid does not match the host owner, and names do not matter, only numbers. Rootless containers and user namespaces remap ids.
- Mount options: `noexec`, `ro`, or a network or FUSE file system that ignores `chmod`.
- Mandatory access control: SELinux (needs the right context, for example the `:Z` or `:z` volume option), AppArmor profiles.
- Platform privacy controls: macOS asks for Full Disk Access or folder access per app; Windows ACLs, a file locked by another process, or controlled folder access.
- Binding a port below 1024 as a non-root user, or a capability dropped in a container.
- Cloud or API "permission denied" errors that are about IAM roles, not files; those need a different investigation.
The safe fix grants the least access to the specific identity that needs it.
</context>

<task>
Fix this permission error.

Error:
{{error}}

Environment and user:
{{environment}}

1. State which identity is making the request and what it is trying to do (read, write, create, execute, bind) on which resource. If the identity is not known, say how to find it (`id`, `ps -o user,uid,gid`, `whoami` inside the container, the unit's `User=`).
2. Give the checks that find the denying layer, in order: `ls -ld` on the resource and every parent directory (or `namei -l <path>`), `stat` for numeric owners, mount options, `getenforce` and the audit log for SELinux denials, the macOS or Windows privacy setting. Ask for the output if needed and stop.
3. Name the cause.
4. Give the least-privilege fix for that cause: correct ownership with the numeric uid and gid, a group with the right mode, the directory's execute bit, a volume option or SELinux context, building the image so files belong to the runtime user, a capability or a higher port with a proxy in front, or the platform setting to grant. Show the command or config.
5. Say how to verify as that same identity, for example `sudo -u <user> test -w <path>` or running the container with the same user.
</task>

<constraints>
- Never recommend `chmod 777`, `chmod -R 777`, running the process as root, `--privileged`, or turning SELinux off as the fix. If the user proposes one, explain the risk and give the narrow fix instead.
- Do not run or suggest recursive ownership changes on system directories or a home directory without naming exactly what they touch.
- If the error is about a cloud or API permission rather than a local resource, say so and point to the access policy instead of file modes.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Who is asking for what
Identity, action and resource.
## Checks to run
Commands and how to read the results.
## Cause
The denying layer, or "Waiting for check results".
## Fix
Least-privilege change and the verification command.
</output_format>
