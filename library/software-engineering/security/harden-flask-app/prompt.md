---
schema: 1
id: harden-flask-app
kind: prompt
title: Harden a Flask app for production
description: Hardens a Flask app's secret key, debug mode, session cookies, CSRF, template escaping, file serving, upload limits, proxy handling and headers, verified with tests and a settings check.
category: security
version: 1.0.0
status: incubating
stage: [build, ship]
role: [backend-engineer, fullstack-engineer, security-engineer]
stack: [flask]
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
tags: [hardening, python-security, session-cookies, csrf, owasp]
pairs_with:
  prompts: [harden-web-app-config, fix-server-side-template-injection, fix-path-traversal, add-csrf-protection]
  rules: [flask-rules]
  personas: [security-auditor]
args:
  - name: app
    description: The Flask app, how it is served (gunicorn, uWSGI, behind which proxy), whether it renders pages, serves an API or both, and which extensions it uses (Flask-Login, Flask-WTF, SQLAlchemy).
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
Flask is small, so its security depends on settings and extensions the team may not know about. The debug mode Werkzeug debugger gives anyone who reaches it a Python console, so `debug=True` or `FLASK_DEBUG=1` in production is remote code execution, and `app.run()` is not a production server. Flask's default session is a signed cookie, not an encrypted one: users can read everything in it, and anyone with the `SECRET_KEY` can forge sessions, so the key must be long, random, outside the repository, and rotated if it leaked. Session cookies need `SESSION_COOKIE_SECURE`, `HTTPONLY` and `SAMESITE`, and `PERMANENT_SESSION_LIFETIME` should be bounded. There is no CSRF protection unless Flask-WTF's `CSRFProtect` or similar is enabled, including for AJAX posts with cookie auth. Jinja autoescaping is on only for templates ending in `.html`, `.htm`, `.xml`, `.xhtml` and (Flask 2.2+) `.svg`, so a `.txt` or `.j2` template rendering user data into HTML is not escaped; `render_template_string` with user input is server-side template injection, and `|safe` or `Markup()` on user data is XSS. `send_file` with a user path is path traversal; `send_from_directory` is the safe form. `MAX_CONTENT_LENGTH` is unset by default, so uploads are unlimited. Behind a proxy, `ProxyFix` with the correct `x_for` and `x_proto` counts makes `request.remote_addr` and URL scheme right; wrong counts let clients spoof them. Headers such as HSTS, CSP and frame options need an extension (Flask-Talisman) or an `after_request` hook.
</context>

<task>
Harden {{app}}.

1. Read the app factory or module, config classes and how production config is selected, extensions and their setup, blueprints and routes, templates, upload and file-serving code, and the server and proxy configuration.
2. Search for the risky patterns: `debug=True`, `app.run(`, hardcoded `SECRET_KEY`, `render_template_string`, `|safe`, `Markup(`, `send_file(` with request input, `redirect(` to request input, raw SQL with string formatting, and routes that change state on GET.
3. Fix what is safe in code: debug and secret from the environment with a startup error if the secret is missing in production; cookie flags and session lifetime; `CSRFProtect` with exemptions only for token-authenticated API routes; template rendering from files with autoescape; `send_from_directory` or an allowlist for downloads; `MAX_CONTENT_LENGTH`; `ProxyFix` with counts matching the real proxy chain; security headers with a CSP rolled out in report-only mode first.
4. Check login handling: the session cleared before `login_user` so pre-login data does not carry over (and the session id regenerated if a server-side store such as Flask-Session is used), Flask-Login `session_protection`, remember-me cookie flags (`REMEMBER_COOKIE_SECURE`, `REMEMBER_COOKIE_HTTPONLY`, `REMEMBER_COOKIE_SAMESITE`), and logout clearing the session.
5. Add tests with the test client for the cookie flags, a CSRF-protected form rejecting a missing token, an oversized upload, a traversal attempt on the download route, and debug off in production config. Run the suite and report results.
</task>

<constraints>
- Never put real secrets in code, examples or test output.
- Do not rotate the secret key or change production environment values yourself; explain that rotation signs every user out and give the steps.
- Do not exempt cookie-authenticated routes from CSRF protection.
- Do not enforce a strict CSP without a report-only phase.
{{> guardrails/investigate-before-answering}}
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Findings
Table: issue, location, risk, fix, status (fixed, needs decision, fine).
## Changes
One line per file: `path`, what changed.
## Verification
Tests run with real results.
## Needs a decision
Items for the team, with the recommended choice and its impact.
</output_format>
