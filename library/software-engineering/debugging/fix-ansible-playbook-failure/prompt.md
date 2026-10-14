---
schema: 1
id: fix-ansible-playbook-failure
kind: prompt
title: Fix a failing Ansible playbook run
description: Fixes a failing Ansible run from its output, covering unreachable hosts, privilege escalation, undefined variables and precedence, module errors, handlers and tasks that are not idempotent.
category: debugging
version: 1.0.0
status: incubating
stage: [build, operate]
role: [devops-engineer, sre]
stack: [ansible]
requires: [repo-read, file-write, shell]
inputs: [logs, file, config]
output: [explanation, diff]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [playbooks, inventory, become, variable-precedence, idempotency]
pairs_with:
  prompts: [write-ansible-playbook, review-ansible-playbook-change, fix-ssh-connection-error]
  personas: [devops-engineer]
args:
  - name: output
    description: The failing task output, ideally with -vvv for connection problems, and the command used to run the playbook.
    type: text
    required: true
  - name: code
    description: The playbook, role tasks, inventory and variable files involved, or their paths, and the Ansible and Python versions on the controller.
    type: text
output_contract:
  format: markdown
  sections: [Failing task, Cause, Fix, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an Ansible engineer who reads the failure line by line. The failure classes and what they usually mean:
- UNREACHABLE!: SSH failed before any module ran. Wrong `ansible_host`, user or key, host key verification, a bastion not configured in `ansible_ssh_common_args`, or no Python on the target (the `raw` module or a `gather_facts: false` bootstrap fixes that). `-vvv` shows the exact SSH command.
- Privilege escalation: "Missing sudo password", "Timeout waiting for privilege escalation prompt", or permission denied inside a task. `become: true` scope, `become_user`, a sudoers rule requiring a TTY or password, and `become_user` to an unprivileged user failing on temporary files ("Failed to set permissions on the temporary files", often fixed by installing ACLs on the target or `pipelining`).
- `'dict object' has no attribute ...` or "is undefined": a variable defined in the wrong place, a typo, a fact not gathered, a `register` from a skipped task, or variable precedence (role defaults lose to inventory vars, which lose to play vars, `include_vars`, `set_fact` and extra vars). `ansible-inventory --host <host>` and a `debug: var=` task show the real value.
- Module errors: missing Python libraries on the target (for example a database module's driver), wrong module argument for the installed collection version, modules moved to collections (`ansible.builtin`, `community.general`) after upgrades.
- Changed every run or failing on rerun: `command` or `shell` without `creates`, `removes` or `changed_when`, `lineinfile` with a regexp that does not match its own line, and handlers not running because a play failed earlier (`--force-handlers` or `meta: flush_handlers`).
- Template errors from Jinja2: a value that starts with a Jinja2 expression but is not quoted, filters on undefined values, and `when:` conditions written with braces.
</context>

<task>
Fix this Ansible failure.

Output:
{{output}}
{{#code}}

Code:
{{code}}
{{/code}}

1. Identify the failing host, play, task and module, and the class of failure from the message.
2. Read the task, the role defaults and vars, the inventory and group vars for that host, and anything that sets the variables involved. Note the ansible-core and collection versions.
3. If the cause is not certain, give read-only checks: `ansible <host> -m ping -vvv`, `ansible-inventory --host <host>`, `--check --diff` on the play, a `debug` task, `--start-at-task` or `--limit` to rerun only what failed. Say what each result would mean.
4. Name the cause and give the smallest fix in the playbook, role, inventory or target setup. If the task is not idempotent, make it so (`creates`, `changed_when`, a proper module instead of `shell`).
5. Verify: rerun limited to the failing host, then run again to confirm the second run reports no unexpected changes. Run `ansible-lint` if the project uses it.
</task>

<constraints>
- Do not "fix" with `ignore_errors: true`, `failed_when: false` or a blanket `shell` workaround unless the failure is genuinely expected, and say why.
- Do not run the playbook against production hosts without asking; prefer `--check`, `--limit` and a staging host.
- Never put passwords or keys in playbooks or inventory in plain text; use Ansible Vault or the existing secret mechanism.
{{> guardrails/investigate-before-answering}}
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Failing task
Host, play, task, module and failure class.
## Cause
What went wrong and the evidence.
## Fix
The diff to playbook, role, inventory or target setup.
## Verification
The rerun and the idempotency check.
</output_format>
