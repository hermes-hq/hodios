---
schema: 1
id: review-rails-change
kind: prompt
title: Review a Rails change
description: Reviews a Ruby on Rails diff for callback side effects, strong-params gaps, scope and association mistakes, unsafe migrations and background jobs enqueued before commit.
category: code-review
version: 1.0.0
status: incubating
stage: [review]
role: [backend-engineer, fullstack-engineer]
stack: [rails]
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
depth: specific
tags: [active-record, callbacks, schema-migrations, background-jobs, pull-request]
pairs_with:
  personas: [ruby-rails-engineer]
  prompts: [review-pull-request, review-database-migration]
  rules: [rails-rules]
args:
  - name: diff
    description: The diff with file paths, including models, controllers, jobs, migrations and `db/schema.rb` changes.
    type: text
    required: true
  - name: context
    description: Rails and Ruby versions, database (Postgres or MySQL), queue backend (Sidekiq, Solid Queue, GoodJob), table sizes for migrated tables and whether deploys run migrations before or after new code starts.
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
Rails code reads cleanly while doing a lot implicitly, so review means asking what each line triggers. Callbacks run on every save, including imports, console fixes and seeds; `update_column`, `update_all`, `insert_all` and `delete_all` skip both callbacks and validations. A job enqueued in `after_save` or inside a transaction can run before the commit and find no record, or run for a record that was rolled back; `after_commit` (or the per-job enqueue-after-commit setting in Rails 7.2+) fixes it. Model validations are not constraints: `validates :email, uniqueness: true` still lets two concurrent requests insert duplicates without a unique index. Strong parameters protect only the attributes they list, so permit! or permitting `role`, `admin` or `account_id` reopens mass assignment. Scopes built with string interpolation (`where("name = '#{params[:q]}'")`) are injectable; `default_scope` leaks into joins and `unscoped` calls; `find` raises where `find_by` returns nil. On a live app, migrations run while old code is still serving: removing a column needs `ignored_columns` first because Active Record caches the column list, renaming a column breaks the old code, and on Postgres an index on a large table needs `algorithm: :concurrently` with disable_ddl_transaction!. Jobs should take ids, not records, since a deleted record makes GlobalID deserialization fail, and must be safe to retry.
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

1. If you can read the repository, open each changed file in full, plus the models whose callbacks, validations and associations the change touches and `db/schema.rb` for the affected tables, before judging any hunk. If you only have the diff, say which conclusions depend on code you could not see.
2. Check callbacks and bypasses: new or changed callbacks that do external work (mail, HTTP, jobs) or save other records, callbacks that will now fire in bulk paths, and code using `update_column`, `update_all`, `insert_all` or `delete_all` where callbacks or validations carried business rules.
3. Check jobs: enqueued before commit (`after_save`, `after_create`, inside `transaction do`), arguments that are records or large hashes rather than ids, missing handling for a record deleted before the job runs, and work that is not idempotent under retry.
4. Check controllers and params: permit!, permitted attributes that grant ownership or privilege, records loaded with `Model.find(params[:id])` instead of through the current user's association, and missing authorization calls where the app uses Pundit or CanCanCan.
5. Check queries and associations: interpolated SQL, N+1 on collections rendered in views (missing `includes`), `dependent:` options missing or `dependent: :destroy` on associations with many rows, `default_scope` side effects, and `find_by` results used without a nil check.
6. Check migrations for a running app: column removal without `ignored_columns`, renames, non-concurrent indexes on large Postgres tables, `change` methods that cannot reverse, models referenced inside migrations, and uniqueness validations without a unique index.
7. For each finding, write the concrete input, request or sequence of events that triggers it and what goes wrong. Drop any finding you cannot trigger from the code you have read.
8. Rate each finding: high (mass assignment of privilege, injection, data loss or a migration that locks or breaks production, jobs running for missing or rolled-back records), medium (callbacks firing where they should not, N+1 on a hot path), low.
9. List the tests that would fail on the current code and pass once it is fixed.
</task>

<constraints>
- Tie version-dependent advice (enqueue-after-commit, `normalizes`, strict loading) to the Rails version given or ask for it.
- Prefer fixes that follow the app's existing conventions (service objects, concerns, policies) over introducing new gems.
- At most 10 findings, most severe first. No style, naming or formatting comments unless they cause a defect.
- Stay read-only: do not edit files, push, or run commands that change state. Running read-only checks (type checker, linter, tests) is fine and worth reporting.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Verdict
One line: approve | approve-with-nits | request-changes, and the main reason.
## Findings
Numbered. Each: severity, `path:line`, the model, controller or job affected, the defect, the triggering request, save path or deploy step, the fix in one or two sentences.
## Missing tests
Bullets naming the case each test covers, or "None".
## Questions
Versions, settings or business rules you need confirmed, or "None".
</output_format>
