---
schema: 1
id: flask-rules
kind: rule
title: Flask rules
description: Standing rules for Flask apps covering the app factory, blueprints, config per environment, no global state, SQLAlchemy session scope, input validation, CSRF and error handlers.
category: conventions
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer]
stack: [flask]
requires: [none]
output: [code]
risk: read-only
invocation: user
model_tier: mid
level: intermediate
depth: specific
tags: [app-factory, blueprints, sqlalchemy, csrf, wsgi]
applies_to: ["**/*.py", "**/templates/**/*.html"]
pairs_with:
  rules: [python-style-rules, api-design-rules]
  personas: [python-engineer]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
When you write or change code in this Flask app:

**Know the project first**
- Check the Flask version and the extensions in use (Flask-SQLAlchemy or plain SQLAlchemy, Flask-Migrate, Flask-WTF, Flask-Login, marshmallow or pydantic). Follow them; do not add a second library for the same job.

**Structure**
- Create the app in a `create_app(config=None)` factory. Initialise extensions unbound at module level (`db = SQLAlchemy()`) and bind them in the factory with `init_app`. No app object created at import time in library modules.
- Group routes into blueprints per feature, registered in the factory with a URL prefix. Keep view functions thin; put business logic in service modules that do not import `request`.
- Avoid circular imports: models and services import the extension objects, never the app.

**State and context**
- No module-level mutable state for per-request or per-user data; the app runs in several processes and threads. Use `g` for per-request values, the session for small per-user values, and a database or cache for shared data.
- Use `current_app` inside requests and CLI commands instead of importing the app. Background threads and tasks need an explicit `app.app_context()`.

**Configuration**
- Load config from a class or file per environment and from environment variables (`app.config.from_prefixed_env()` or the project's method). `SECRET_KEY` and credentials never appear in the repository.
- Never run with `debug=True` or the Werkzeug debugger in production; it allows code execution. Serve with a WSGI server (gunicorn, waitress), not `app.run()`.

**Database**
- Use one SQLAlchemy session per request (Flask-SQLAlchemy handles this; with plain SQLAlchemy, a `scoped_session` removed in `teardown_appcontext`). Commit once per unit of work and roll back on error.
- Avoid N+1 queries with `selectinload` or `joinedload` for relations used in a list. Use the 2.x `select()` style if the project does.
- Change the schema only through migrations (Alembic or Flask-Migrate), reviewed and committed with the model change.

**Input, output and security**
- Validate request JSON and form data with the project's schema library or WTForms before use; return 400 with a clear error. Never trust `request.args` types.
- Enable CSRF protection (Flask-WTF `CSRFProtect`) for any browser form or cookie-authenticated endpoint.
- Rely on Jinja auto-escaping; never mark user content `|safe` or build HTML with `Markup` from user input.
- Use `url_for` for links and redirects; validate redirect targets from query strings to avoid open redirects.
- Set `SESSION_COOKIE_SECURE`, `SESSION_COOKIE_HTTPONLY` and `SESSION_COOKIE_SAMESITE` in production.

**Errors and logging**
- Register error handlers (`@app.errorhandler` or `@bp.app_errorhandler`) that return JSON for API routes and templates for pages, with a consistent shape. Use `abort()` with a status code rather than returning ad hoc tuples everywhere.
- Log with `current_app.logger` or the project's logger, never `print`.

**Before you finish**
- Run the tests with the test client and app factory (`app = create_app(test_config)`), covering success, validation failure and auth failure for routes you changed. Say what you ran.
