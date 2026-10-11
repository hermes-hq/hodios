---
schema: 1
id: review-ansible-playbook-change
kind: prompt
title: Review an Ansible playbook change
description: Reviews an Ansible playbook or role change for non-idempotent tasks, shell used where a module exists, handler and become mistakes, leaked secrets and unsafe host targeting.
category: code-review
version: 1.0.0
status: incubating
stage: [review]
role: [devops-engineer, sre]
stack: [ansible]
requires: [repo-read]
inputs: [diff, file]
output: [report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [idempotency, configuration-management, handlers, ansible-vault, pull-request]
pairs_with:
  personas: [devops-engineer]
  prompts: [review-pull-request, write-ansible-playbook, review-iac-plan]
  rules: [iac-style-rules]
args:
  - name: diff
    description: The diff with file paths, including inventory, group_vars and host_vars, roles and templates the change touches.
    type: text
    required: true
  - name: context
    description: Ansible core version, target operating systems, how the playbook is run (by hand, CI, AWX or Tower), the inventory groups it targets in production, and whether it must support check mode.
    type: text
output_contract:
  format: markdown
  sections: [Verdict, Findings, Missing tests, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An Ansible change is good when running it twice changes nothing the second time, and when running it against the wrong hosts is hard. `command` and `shell` tasks always report changed and always run unless they have `creates`, `removes` or a `changed_when` and a check, so they break idempotency, hide drift and fire handlers every time; most have a module (`apt`, `dnf`, `copy`, `template`, `user`, `systemd`, `file`, `get_url`, `unarchive`) that is idempotent and supports check mode. `lineinfile` with a `regexp` that does not match the line it inserts appends a new line on every run. File `mode: 644` without quotes is read as the decimal number 644, which is not octal 0644, so permissions end up wrong; use `"0644"`. Handlers run once at the end of the play, only if notified by name (a typo fails or silently does nothing depending on version), and are skipped if the play fails first unless `force_handlers` is set or handlers are flushed. Variable precedence surprises reviewers: role `defaults` are overridden by almost everything, `vars` in a role override inventory, and `--extra-vars` override all. A `when:` on a variable holding the string "false" (from `--extra-vars` or a prompt) is not a boolean: older versions treat it as true and ansible-core 2.19 rejects non-boolean conditionals, so cast with `| bool`. `ignore_errors: true` hides real failures. Secrets belong in Vault or an external store and tasks that handle them need `no_log: true`, or they appear in output and logs. `hosts: all` without `serial` or `max_fail_percentage` updates every server at once and leaves no healthy ones if the change is bad.
</context>

<task>
<diff>
{{diff}}
</diff>

{{#context}}
<context_given>
{{context}}
</context_given>
{{/context}}

1. If you can read the repository, open each changed playbook, role and template in full, the inventory groups and variables they use (defaults, vars, group_vars, host_vars), and the handlers they notify, before judging any hunk. Run `ansible-lint` and `ansible-playbook --syntax-check` if available and report the results. If you only have the diff, say which conclusions depend on files you could not see.
2. For each task, say whether a second run would report changed or change anything. Flag `command` and `shell` without `creates`, `removes` or `changed_when`, `lineinfile` regexps that do not match their own line, downloads and package installs without pinned versions or checksums, and tasks that cannot run in check mode when the team relies on `--check --diff`.
3. Flag `shell` or `command` where a module exists, and shell tasks that interpolate variables without quoting.
4. Check handlers and privilege: notify names that match handlers, handlers needed before later tasks without `meta: flush_handlers`, service restarts versus reloads, `become` set wider than needed, `become_user` to an unprivileged user with the known temp file pitfalls, and file modes written as unquoted numbers.
5. Check variables and conditions: precedence that will override or be overridden unexpectedly, undefined variables without defaults, `when` conditions on strings, `ignore_errors` or `failed_when: false` hiding failures, and secrets in plain text or tasks handling secrets without `no_log`.
6. Check targeting and rollout: `hosts` patterns that match more than intended, missing `serial` or `max_fail_percentage` for changes that restart services, `run_once` and `delegate_to` used on the wrong host, and no health check between batches.
7. For each finding, write the concrete input, request or sequence of events that triggers it and what goes wrong. Drop any finding you cannot trigger from the code you have read.
8. Rate each finding: high (secrets leaked, all hosts changed at once with a breaking change, wrong permissions or users created, tasks that run destructive commands every time), medium (drift hidden by always-changed tasks, handlers not firing, check mode broken), low.
9. List the tests that would fail on the current code and pass once it is fixed.
</task>

<constraints>
- Do not run the playbook against any inventory; only syntax checks, lint and `--check --diff` against a non-production inventory the user confirms.
- Prefer modules from `ansible.builtin` and collections already used in the repository.
- At most 10 findings, most severe first. No style, naming or formatting comments unless they cause a defect.
- Stay read-only: do not edit files, push, or run commands that change state. Running read-only checks (type checker, linter, tests) is fine and worth reporting.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Verdict
One line: approve | approve-with-nits | request-changes, and the main reason.
## Findings
Numbered. Each: severity, `path:line`, the task or play, the defect, what happens on the first run, the second run, or the wrong host, the fix in one or two sentences.
## Missing tests
Bullets naming the case each test covers, or "None".
## Questions
Versions, settings or business rules you need confirmed, or "None".
</output_format>
