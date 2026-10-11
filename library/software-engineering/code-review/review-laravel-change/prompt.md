---
schema: 1
id: review-laravel-change
kind: prompt
title: Review a Laravel change
description: Reviews a Laravel diff for Eloquent mass-assignment and relationship mistakes, queued jobs that run before commit or on stale models, transaction gaps and env or facade misuse.
category: code-review
version: 1.0.0
status: incubating
stage: [review]
role: [backend-engineer, fullstack-engineer]
stack: [laravel]
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
tags: [eloquent, queues, mass-assignment, transactions, pull-request]
pairs_with:
  personas: [php-laravel-engineer]
  prompts: [review-pull-request, review-database-migration]
  rules: [laravel-rules]
args:
  - name: diff
    description: The diff with file paths, including models, controllers, form requests, jobs, policies, migrations and config files it touches.
    type: text
    required: true
  - name: context
    description: Laravel and PHP versions, database, queue driver, whether config is cached in production, and the business rule the change implements.
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
Laravel's conveniences each have a sharp edge that a generic review walks past. `Model::create($request->all())` is safe only as far as `$fillable` or `$guarded` allow, and `$guarded = []` makes every column assignable, including `is_admin` or `team_id`; `$request->validated()` is the safe input. Query builder `update()` and `delete()` skip model events, observers, mutators and casts. `orWhere` without a closure breaks scoping: `where('team_id', $id)->where('title', 'like', $q)->orWhere('body', 'like', $q)` compiles to `team_id = ? and title like ? or body like ?`, so any team's row matching on body comes back. Raw `DB::table` queries ignore the `SoftDeletes` scope, so deleted rows reappear. A job dispatched inside `DB::transaction` can run before commit unless it uses `afterCommit()` or the connection's `after_commit` setting; jobs using `SerializesModels` re-fetch the model when they run, so they see later state, and fail if it was deleted unless `deleteWhenMissingModels` is set. A job's `timeout` must be shorter than the queue's `retry_after`, or the job runs twice. `env()` called outside config files returns null once `php artisan config:cache` runs in production. Route model binding does not check ownership; a policy or a scoped binding must. The `unique` validation rule on update must ignore the current record's id.
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

1. If you can read the repository, open each changed file in full, plus the models' `$fillable`, `$guarded`, casts, scopes and observers, the related policies and the queue config, before judging any hunk. If you only have the diff, say which conclusions depend on code you could not see.
2. Check mass assignment and input: `create`, `fill`, `update` or `forceFill` fed with `$request->all()` or unvalidated input, models with `$guarded = []`, form requests missing rules for fields the controller uses, and `unique` rules on update that do not ignore the current record.
3. Check authorisation and scoping: route-model-bound records used without a policy check or scoped binding, queries missing the tenant or owner filter, and `orWhere` chains that escape an earlier `where` without being grouped in a closure.
4. Check Eloquent behaviour: lazy loading in loops (missing `with`), builder `update` or `delete` skipping observers and casts that carry business logic, raw `DB` queries bypassing global scopes such as `SoftDeletes`, `firstOrCreate` without a unique index, and accessors or casts that change data on save.
5. Check transactions and queues: multi-step writes outside `DB::transaction`, jobs, events, mail or notifications dispatched inside a transaction without `afterCommit`, job timeout versus `retry_after`, non-idempotent job handlers, models serialised into jobs that may change or be deleted before the job runs.
6. Check configuration and facades: `env()` outside `config/*.php`, config or secrets hard-coded in code, facades called at class load or in constructors before the app is booted, and cache keys that are not scoped to the user or tenant.
7. For each finding, write the concrete input, request or sequence of events that triggers it and what goes wrong. Drop any finding you cannot trigger from the code you have read.
8. Rate each finding: high (privilege or tenant escalation through mass assignment or scoping, jobs acting on missing or rolled-back data, duplicate charges or emails from retried jobs), medium (missing observer logic, N+1 on a hot page, config null in production), low.
9. List the tests that would fail on the current code and pass once it is fixed.
</task>

<constraints>
- Tie version-dependent advice (for example `ShouldDispatchAfterCommit`, `Model::preventLazyLoading`) to the Laravel version given or ask for it.
- Fix with Laravel's own tools (form requests, policies, `afterCommit`, scopes) before suggesting packages.
- At most 10 findings, most severe first. No style, naming or formatting comments unless they cause a defect.
- Stay read-only: do not edit files, push, or run commands that change state. Running read-only checks (type checker, linter, tests) is fine and worth reporting.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Verdict
One line: approve | approve-with-nits | request-changes, and the main reason.
## Findings
Numbered. Each: severity, `path:line`, the model, controller or job affected, the defect, the triggering request or sequence, the fix in one or two sentences.
## Missing tests
Bullets naming the case each test covers, or "None".
## Questions
Versions, settings or business rules you need confirmed, or "None".
</output_format>
