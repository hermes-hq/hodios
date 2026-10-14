---
schema: 1
id: harden-rails-app
kind: prompt
title: Harden a Rails application
description: Hardens a Ruby on Rails app by triaging Brakeman output and fixing strong params, raw SQL, html_safe, CSRF, session, credentials and production config settings.
category: security
version: 1.0.0
status: incubating
stage: [verify, ship]
role: [backend-engineer, fullstack-engineer, security-engineer]
stack: [rails]
requires: [repo-read, file-write, shell]
inputs: [repo, logs]
output: [diff, report]
risk: runs-commands
invocation: user
effort: deep
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [hardening, brakeman, strong-parameters, csrf, credentials]
pairs_with:
  prompts: [triage-sast-findings, audit-app-security, fix-sql-injection]
  rules: [rails-rules]
  personas: [ruby-rails-engineer, security-auditor]
args:
  - name: app
    description: What the app does, its Rails version if known, and how it is deployed.
    type: text
    required: true
  - name: brakeman_output
    description: Existing Brakeman output to start from. Leave empty to run Brakeman in the repo.
    type: text
output_contract:
  format: markdown
  sections: [Brakeman triage, Other findings, Changes, Verification, Residual risk]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Brakeman is the standard static scanner for Rails and catches most framework-specific flaws, but it reports confidence levels, not truth: "weak" findings are often noise, and it cannot see authorization logic. The flaws that matter in Rails apps are consistent: params.permit! (permit everything) or permitting `role`/`admin`/`account_id`; string interpolation in `where`, `order`, `pluck`, `find_by_sql` and `exists?`; `html_safe`, `raw` and `<%==` on user data; `skip_before_action :verify_authenticity_token` on cookie-authenticated controllers; `redirect_to params[:return_to]` (open redirect); `send_file` or `render file:` with user paths; `constantize`/`send` on params; YAML or Marshal loading of untrusted data; and record lookups like `Post.find(params[:id])` instead of `current_user.posts.find`. Production config matters too: `config.force_ssl`, `config.hosts`, secure cookie flags, filter_parameters for logs, and a `master.key` that must never be committed.
</context>

<task>
Harden this Rails app: {{app}}

1. {{#brakeman_output}}Start from this Brakeman output: {{brakeman_output}}{{/brakeman_output}} If no output is given, run `bundle exec brakeman -q --no-pager` (add it to the development group if missing and say so) and `bundle audit` or `bundle exec bundler-audit` if present.
2. Triage each Brakeman warning by reading the code: confirm whether user input actually reaches the sink, mark false positives with the reason, and record true positives with severity.
3. Beyond Brakeman, check: unscoped finds on routes that take ids (should go through the current user's or tenant's association or a Pundit/CanCanCan policy); strong params permitting privileged attributes; open redirects; CSRF protection on every controller that uses cookie sessions.
4. Check config: `config/environments/production.rb` for `force_ssl`, `hosts`, log level and `filter_parameters` (passwords, tokens, keys); session store cookie flags; `config/master.key` and `*.key` in `.gitignore` and absent from git history (report by path only).
5. Fix true positives with Rails idioms: hash or array conditions and `sanitize_sql_for_order` with an allowlist; `sanitize` helpers or escaping instead of `html_safe`; `url_from` or an allowlist for redirects; scoped finds or policies for object access.
6. Add or update a `config/brakeman.ignore` entry only for confirmed false positives, each with a note.
7. Add request specs or tests for the authorization fixes, run the test suite and Brakeman again, and report the before and after warning counts.
</task>

<constraints>
- Do not silence a warning in `brakeman.ignore` without reading the code path and writing why it is safe.
- Never print the master key or credentials contents.
- Keep fixes minimal and idiomatic; no framework upgrade without asking.
- Do not run anything against production data.
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Brakeman triage
Table: warning type, file:line, confidence, verdict (true or false positive), reason.
## Other findings
Ranked list of issues Brakeman did not report, with file:line and fix.
## Changes
One line per file: `path`, what changed.
## Verification
Commands run, test results, and Brakeman warning counts before and after.
## Residual risk
What remains and what would close it.
</output_format>
