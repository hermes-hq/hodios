---
schema: 1
id: ansible-rules
kind: rule
title: Ansible rules
description: Standing rules for Ansible playbooks and roles covering idempotent modules over shell, FQCN names, variable precedence, vault for secrets, handlers, check mode and safe rollouts.
category: conventions
version: 1.0.0
status: incubating
stage: [build]
role: [devops-engineer, sre]
stack: [ansible]
requires: [none]
output: [config]
risk: read-only
invocation: user
model_tier: mid
level: intermediate
tags: [idempotency, configuration-management, ansible-roles, ansible-vault, playbooks]
applies_to: ["**/playbooks/**/*.yml", "**/roles/**", "**/inventory/**", "**/group_vars/**", "**/host_vars/**", "**/site.yml"]
pairs_with:
  rules: [iac-style-rules]
  prompts: [write-ansible-playbook, review-ansible-playbook-change]
  personas: [devops-engineer]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
When you write or change Ansible code in this project:

**Know the setup first**
- Check the ansible-core version, the collections in `requirements.yml`, the inventory layout and existing roles. Add to an existing role when the task belongs to it; follow its variable naming and directory structure.

**Modules and idempotency**
- Use a purpose-built module (`ansible.builtin.package`, `template`, `user`, `systemd_service`, `lineinfile`, cloud and database collections) instead of `shell` or `command`. Running the play twice must report no changes the second time.
- When `command` or `shell` is unavoidable, make it idempotent with `creates`, `removes` or a check task, and set `changed_when` and `failed_when` to reflect reality. Use `command` over `shell` unless you need pipes or redirection, and quote variables.
- Use fully qualified collection names (`ansible.builtin.copy`, `community.general.ufw`) for every module.
- Prefer `template` over many `lineinfile` edits for files you own. Validate configs before they replace the live file (`validate:` with the service's check command).

**Structure**
- Playbooks stay short and call roles. Each role has `defaults/main.yml` documenting every variable with a sensible default, and uses role-prefixed variable names (`nginx_worker_processes`) to avoid collisions.
- Put environment-specific values in `group_vars` and `host_vars`, not in roles. Keep variable precedence simple; do not set the same variable at many levels.
- Name every task and play with a clear description.

**Handlers and services**
- Restart or reload services through handlers notified by the tasks that change their config, not with unconditional restart tasks. Use `reload` when the service supports it.
- Use `meta: flush_handlers` only when a later task needs the restarted service.

**Secrets**
- Keep secrets in Ansible Vault or an external secret lookup, never plain text in the repository. Set `no_log: true` on tasks that handle secrets so they do not appear in output.

**Safety**
- Support check mode: tasks should work with `--check` and `--diff`, or set `check_mode` deliberately where they cannot.
- Roll out to production in batches with `serial` and `max_fail_percentage`, with health checks between batches for services behind a load balancer.
- Destructive tasks (removing users, packages, data, firewall rules) need explicit variables that default to off, and you never run a playbook against production hosts yourself; give the command for a person to run, starting with `--check --diff` and `--limit`.
- Avoid `ignore_errors: true`; handle expected failures with `failed_when` or `block`/`rescue`.

**Before you finish**
- Run `ansible-lint` and `ansible-playbook --syntax-check`, then Molecule tests for roles if the project has them, or a check-mode run against a test host. Say what you ran.
