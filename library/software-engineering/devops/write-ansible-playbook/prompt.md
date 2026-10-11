---
schema: 1
id: write-ansible-playbook
kind: prompt
title: Write an Ansible playbook
description: Writes an idempotent Ansible playbook or role from a manual setup procedure, with modules instead of shell, handlers, check mode, vaulted secrets, inventory layout and an idempotency test.
category: devops
version: 1.0.0
status: incubating
stage: [build]
role: [devops-engineer, sre]
stack: [ansible]
requires: [none]
inputs: [notes, text, spec]
output: [code, docs]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [configuration-management, idempotency, ansible-roles, ansible-vault, provisioning, linux-servers]
pairs_with:
  personas: [devops-engineer]
  prompts: [deploy-to-vps, harden-linux-server]
args:
  - name: procedure
    description: The manual steps or shell script the playbook replaces (packages, users, files, services, firewall), and the target operating systems and versions.
    type: text
    required: true
  - name: inventory
    description: Optional. Host groups and environments, for example "3 web servers and 1 database server in staging and production".
    type: text
output_contract:
  format: markdown
  sections: [Assumptions, Layout, Code, Secrets, Test and run]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An Ansible playbook is only worth having if it is idempotent: a second run on a configured host reports no changes. Playbooks translated line by line from shell scripts fail that test because they use `shell` and `command` for things modules already do (packages, users, files, services, lines in config files, firewall rules), restart services on every run instead of through handlers, download installers without checksums, and store passwords in plain variables. Experienced authors also know the details: `command` tasks need `creates`, `removes` or `changed_when` to be honest; templates beat `lineinfile` for files the playbook owns; variables belong in `group_vars` and `host_vars` with role defaults for everything else; `become` should be scoped to the tasks that need it; `--check --diff` should work so changes can be reviewed before applying; and fully qualified collection names (`ansible.builtin.copy`) avoid ambiguity.
</context>

<task>
<procedure>
{{procedure}}
</procedure>
{{#inventory}}
Inventory: {{inventory}}
{{/inventory}}

1. List assumptions about target OS versions, Ansible version, connection user and privilege escalation.
2. Propose the layout: inventory per environment, `group_vars` and `host_vars`, one role per concern with `defaults`, `tasks`, `handlers` and `templates`, and a top-level playbook.
3. Translate each manual step into a module with fully qualified names. Where no module fits and `command` or `shell` is unavoidable, make it idempotent with `creates`, `removes` or `changed_when` and `failed_when`.
4. Use handlers for restarts and reloads, templates with validation (for example `validate:` on config files that support a syntax check), and checksums on downloads.
5. Move secrets to Ansible Vault or an external lookup, with `no_log: true` on tasks that handle them.
6. Make the playbook safe to preview with `--check --diff` and mark tasks that cannot run in check mode.
7. Add a test: a Molecule scenario or, at minimum, an idempotency run (apply twice, second run shows no changes) and lint with ansible-lint.
</task>

<constraints>
- Do not put secrets, real hostnames or IPs in the output; use placeholders.
- Use only modules and options you are confident exist; mark uncertain ones to verify against the collection documentation.
- Keep behaviour identical to the manual procedure unless a step is unsafe; flag unsafe steps rather than silently changing them.
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Assumptions
Bullets.

## Layout
Directory tree.

## Code
One code block per file, with the file path as a heading.

## Secrets
What is vaulted and how to create and use the vault.

## Test and run
Commands for lint, check mode, apply and the idempotency check.
</output_format>
