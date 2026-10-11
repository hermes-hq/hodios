---
schema: 1
id: harden-django-settings
kind: prompt
title: Harden a Django project's security settings
description: Reviews and fixes a Django project's production security settings (DEBUG, ALLOWED_HOSTS, SECRET_KEY, cookies, HTTPS, CSRF) and risky ORM and template uses, verified with check --deploy.
category: security
version: 1.0.0
status: incubating
stage: [build, ship]
role: [backend-engineer, software-engineer, security-engineer]
stack: [django]
requires: [repo-read, file-write, shell]
inputs: [repo, config]
output: [diff, report]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: mid
reasoning: recommended
level: intermediate
tags: [hardening, security-settings, deployment-checklist, owasp]
pairs_with:
  prompts: [review-django-change, harden-web-app-config, fix-sql-injection, fix-xss-vulnerabilities]
  rules: [django-rules]
  personas: [security-auditor]
args:
  - name: project
    description: The Django project, how settings are split (one file, base and production, environment variables) and how it is deployed (proxy, CDN, container).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Findings, Changes, Verification, Needs a decision]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Django is secure by default in code but not in settings, and most incidents come from production running with development values. The checks that matter: `DEBUG` off in production and driven by the environment, not a default of `True`; `SECRET_KEY` from the environment or a secret store, never in the repo (if it was committed, it must be rotated, which signs everyone out and invalidates password reset links; a leaked key must not be kept in `SECRET_KEY_FALLBACKS`, since that keeps it valid for signing checks); `ALLOWED_HOSTS` set to real hosts, not `*`; `SECURE_PROXY_SSL_HEADER` only when the proxy always sets that header, otherwise clients can spoof HTTPS; `SECURE_SSL_REDIRECT`, HSTS rolled out with a short `SECURE_HSTS_SECONDS` first; `SESSION_COOKIE_SECURE`, `CSRF_COOKIE_SECURE`, `CSRF_TRUSTED_ORIGINS` exact; `X_FRAME_OPTIONS` and the security middleware enabled; the admin not at the default `/admin/` with only a password protecting it; `DATA_UPLOAD_MAX_MEMORY_SIZE` and file upload limits kept; and the password hashers list led by Argon2 or PBKDF2. In code, the usual leaks are `raw()`, `extra()` and `RawSQL` with string formatting, `mark_safe` and `|safe` on user data, `@csrf_exempt` on views that use session auth, and serving user uploads from `MEDIA_ROOT` on the same domain without forcing downloads. `python manage.py check --deploy` covers part of this but not code patterns or proxy settings.
</context>

<task>
Harden the security settings of {{project}}.

1. Read every settings module and how the production one is selected, plus the deployment files (Dockerfile, Procfile, proxy config) and environment variable templates.
2. Run `python manage.py check --deploy` with the production settings module in a safe local environment (dummy secret values, no production database) and record the warnings.
3. Review the settings listed above and the code patterns: search for `raw(`, `extra(`, `RawSQL`, `cursor.execute` with formatting, `mark_safe`, `|safe`, `autoescape off`, `@csrf_exempt`, and media serving.
4. Fix what can be fixed safely in code: environment-driven `DEBUG`, `SECRET_KEY` and `ALLOWED_HOSTS` with a startup error if missing in production, cookie and HTTPS settings, HSTS with a short initial value, password hashers, and the code patterns.
5. Run `check --deploy` again and the test suite, and report the remaining warnings with reasons.
6. List changes that need a decision or coordination: rotating a leaked secret key, enabling HSTS preload, moving the admin URL or putting it behind SSO, and moving media to a separate domain.
</task>

<constraints>
- Never put real secrets in settings files, examples or test output.
- Do not rotate `SECRET_KEY` or change production environment values yourself; explain the impact and give the steps.
- Do not set long HSTS max-age or preload without the team's agreement; start short.
- Do not set `SECURE_PROXY_SSL_HEADER` unless the deployment confirms the proxy always sets it.
{{> guardrails/investigate-before-answering}}
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Findings
Table: setting or pattern, current value or location, risk, fix, status (fixed, needs decision, fine).
## Changes
One line per file: `path`, what changed.
## Verification
`check --deploy` output before and after, and test results.
## Needs a decision
Items for the team, with the recommended choice and its impact.
</output_format>
