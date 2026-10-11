---
schema: 1
id: fix-failed-platform-deployment
kind: prompt
title: Fix a failed deploy on a managed platform
description: Fixes a failed or broken deploy on Vercel, Netlify, Render, Heroku, Railway or Fly.io from its build and runtime logs, covering env vars, build commands, runtime versions, ports and health checks.
category: debugging
version: 1.0.0
status: incubating
stage: [ship, operate]
role: [fullstack-engineer, frontend-engineer, backend-engineer]
stack: []
requires: [none]
inputs: [logs, config, text]
output: [explanation, config]
risk: read-only
invocation: user
effort: quick
interaction: interactive
model_tier: mid
reasoning: recommended
level: beginner
tags: [paas, build-logs, environment-variables, hosting, works-locally]
pairs_with:
  prompts: [debug-production-only-bug, fix-module-import-error]
args:
  - name: logs
    description: The build log and, if the build passed, the runtime log from the platform, from the first error to the end. Remove any secrets that appear.
    type: text
    required: true
  - name: project
    description: The platform, framework and versions, the build and start commands, the package manager and lock file, the configured runtime version, and what changed since the last successful deploy.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Where the deploy failed, Cause, Fix, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an engineer who has fixed many "works on my machine, fails on deploy" problems on managed platforms. The first split is build versus runtime, then the usual suspects for each:
- Build fails: a different Node, Python or Ruby version than local (set it in the platform settings or the version file the platform reads); a lock file missing, out of date or from another package manager, so installs resolve differently; devDependencies skipped in production installs while the build needs them; case-sensitive imports that work on macOS or Windows; TypeScript or lint errors treated as fatal in CI mode (`CI=true` makes some tools treat warnings as errors); missing environment variables needed at build time (public variables in frontend frameworks are inlined at build, so adding them later needs a rebuild); out-of-memory during the build.
- Build passes but the app fails at runtime: the server does not listen on the `PORT` the platform provides, or binds `localhost`; the start command is wrong; a health check path returns non-200 so the platform marks the deploy failed; serverless function size or timeout limits; native modules built for another OS; file writes to a read-only or ephemeral file system; database migrations not run.
- Environment variables set for one environment (preview versus production) or one scope (build versus runtime) only.
The platform's log has the first real error; later errors are often consequences.
</context>

<task>
Fix this failed deploy.

Logs:
{{logs}}

Project and platform:
{{project}}

1. If you can read the repository, open the package manifest and lock file, the platform config file (for example `vercel.json`, `netlify.toml`, `render.yaml`, `Procfile`, `fly.toml`), runtime version files and the server start code before answering.
2. Say whether it failed at install, build, start or health check, and quote the first real error line.
3. Name the cause, comparing the platform's environment with the local one (runtime version, package manager, env vars, OS, file system). If the log is cut off before the first error, ask for the full log and stop.
4. Give the fix: a pinned runtime version, a regenerated lock file, a corrected build or start command, `PORT` and `0.0.0.0` binding, the env var set in the right environment and scope with a redeploy, a health check path, or moving writes to object storage. Show the config or code change and the platform setting to change.
5. Give a check: reproduce the platform build locally with the same command and versions (or a clean clone with a production install), then redeploy and confirm the health check and one real page or endpoint.
</task>

<constraints>
- Do not suggest disabling type checking, linting or tests in the build to get it green unless you say what that hides and the user chooses it.
- Never ask for secret values; refer to variables by name.
- Platform settings and limits change; name the setting to look for and say when you are unsure of the exact label or number.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Where the deploy failed
Phase and the first real error.
## Cause
The difference between platform and local that explains it.
## Fix
Config, code or setting change.
## Check
Local reproduction and post-deploy check.
</output_format>
