---
schema: 1
id: remove-rails-model-callbacks
kind: prompt
title: Remove tangled Rails model callbacks
description: Replaces ActiveRecord callbacks that send emails, call APIs or update other models with explicit service calls, keeping the same side effects in the same order and transaction.
category: refactoring
version: 1.0.0
status: incubating
stage: [maintain]
role: [backend-engineer, fullstack-engineer]
stack: [rails]
requires: [repo-read, file-write, shell]
inputs: [file, repo]
output: [plan, diff]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: mid
reasoning: recommended
level: expert
tags: [activerecord-callbacks, service-objects, side-effects, transactions]
pairs_with:
  prompts: [move-logic-out-of-controllers, decouple-for-testability]
  personas: [ruby-rails-engineer]
  rules: [rails-rules]
args:
  - name: model
    description: The model with the callbacks, as a path or pasted code, and the paths that save it (controllers, jobs, imports, console scripts).
    type: text
    required: true
  - name: test_command
    description: The command that runs the tests, if not the usual one (for example "bin/rails test" or "bundle exec rspec").
    type: string
output_contract:
  format: markdown
  sections: [Callback map, Save paths, Target shape, Diff, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a Rails engineer. Callbacks are fine for keeping a record's own data consistent (normalising an email in `before_validation`, setting a slug). They become a problem when they do work about other things: sending emails, calling payment or CRM APIs, creating records in other tables, enqueuing jobs. Then every `save` anywhere (an admin edit, a data fix in the console, a seed, a test factory) triggers those side effects, tests need stubs everywhere, and the order of `before_save`, `after_save` and `after_commit` across concerns decides behaviour nobody can see in one place.

Ordering and transaction details that a refactor must preserve or deliberately change: `before_*` and `after_save` run inside the transaction (an exception rolls the save back; an email sent there goes out even if the transaction later rolls back); `after_commit` runs after commit, outside it; callbacks run in declaration order, including those added by concerns and gems; `update_column`, `update_all`, `insert_all` and `delete` skip callbacks, so some paths already bypass them; `saved_change_to_attribute?` only works in after callbacks; and a `throw :abort` in a before callback halts the save.

The target: data-consistency callbacks stay on the model; cross-cutting side effects move to an explicit operation (a service object or a model method like `Order#place!`) that the save paths call, wrapping the transaction and enqueuing jobs after commit. Paths that should not trigger the side effects (imports, admin fixes) simply do not call the operation, and that difference is listed explicitly.
</context>

<task>
Untangle the callbacks on {{model}}.

1. Map every callback, including those from concerns and gems, in execution order: hook, method, what it does, whether it touches other models or external systems, and whether it runs inside or after the transaction.
2. Find every save path for the model and which callbacks each one triggers today, including paths that skip callbacks.
3. Propose the target shape: which callbacks stay (own data only), which side effects move into which explicit operation, the transaction boundary, and when jobs and emails are enqueued. For each save path, say whether it calls the operation, and list paths whose behaviour would change. Wait for approval.
4. Pin today's behaviour with tests per save path (records created, jobs enqueued, emails delivered, external calls), then move callbacks one at a time, updating the save paths, running the tests{{#test_command}} with `{{test_command}}`{{/test_command}} after each.
5. Report the diff, the tests, and any path where behaviour changed by agreement.
</task>

<constraints>
- Same side effects, order and transaction semantics on every save path, except agreed changes listed per path.
- Keep callbacks that only maintain the record's own data.
- Do not send emails or call external services inside a transaction that can still roll back.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Callback map
Table: order, hook, method, effect, inside or after transaction.
## Save paths
Table: path, callbacks triggered today, behaviour after.
## Target shape
Operations, remaining callbacks and transaction boundary.
## Diff
The change.
## Check
Tests per save path and results.
</output_format>
