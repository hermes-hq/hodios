---
schema: 1
id: migrate-express-4-to-5
kind: prompt
title: Upgrade an Express 4 app to Express 5
description: Upgrades an Express 4 app to Express 5, fixing route path syntax, removed methods, read-only req.query, body and query parser defaults, async error handling and middleware compatibility.
category: migration
version: 1.0.0
status: incubating
stage: [maintain]
role: [backend-engineer, fullstack-engineer]
stack: [express]
requires: [repo-read, file-write, shell]
inputs: [repo, text]
output: [diff, report]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [path-to-regexp, routing, middleware, breaking-changes]
pairs_with:
  prompts: [review-express-handler-change, upgrade-node-version, upgrade-major-dependency]
args:
  - name: notes
    description: "Node version, number of routes and routers, third-party middleware in use, how errors are handled today (express-async-errors, wrappers), and test coverage of the HTTP layer."
    type: text
output_contract:
  format: markdown
  sections: [Inventory, Changes made, Behaviour changes, Verification, Rollout]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Express 5 is small in features but has breaking changes that fail quietly. Route paths now use a newer path-to-regexp: wildcards must be named (`*` becomes `/*splat`, and `/{*splat}` if the root should match too), optional parts use braces (`/:file{.:ext}` instead of `:ext?`), and regular-expression characters inside string paths are no longer allowed. Removed or renamed APIs: `app.del` (use `app.delete`), `req.param()`, `res.sendfile` (use `res.sendFile`), `res.send(status)` with a number, `res.json(obj, status)` and similar two-argument forms, `res.redirect('back')`, and the singular `req.acceptsCharset`, `req.acceptsEncoding` and `req.acceptsLanguage` (use the plural forms). `req.query` is a getter and cannot be reassigned, which breaks sanitising middleware that overwrites it; the default query parser is now "simple", so `a[b]=1` no longer becomes a nested object. `req.body` is `undefined` when no body parser ran, `express.urlencoded` defaults to `extended: false`, `res.status()` rejects invalid codes, and `express.static` ignores dotfiles by default. A rejected promise in a handler or middleware now goes to the error handler, which makes wrappers like express-async-errors unnecessary but also changes what reaches error middleware. Express 5 needs Node 18 or newer. The Express team publishes a migration guide and codemods; codemods cover renames, not path syntax intent.
</context>

<task>
Upgrade this app from Express 4 to Express 5.
{{#notes}}
Notes:
{{notes}}
{{/notes}}

1. Read the app setup, every router and route definition, all middleware (own and third-party), error handlers and the HTTP tests. Confirm the Node version meets Express 5's minimum.
2. Inventory: route strings with `*`, `?`, `+`, `(` or regex characters; removed methods; code that assigns to `req.query` or relies on nested query objects; code that assumes `req.body` is an object; `res.redirect('back')`; async error wrappers.
3. Check each third-party middleware for Express 5 support and list incompatible ones with a replacement or decision.
4. Upgrade Express (and `@types/express` if used). Apply the official codemods if available, then fix route paths by hand, matching the old intent for each, and add a test for each changed path including edge cases such as the root path and trailing segments.
5. Fix the rest: renamed response methods, query handling (set the query parser explicitly if nested objects are needed), body guards, and remove async wrappers once you confirm rejections reach the error handler.
6. Run the full test suite and hit every changed route manually or with requests, comparing status codes and bodies with the Express 4 version.
</task>

<constraints>
- Do not change route matching behaviour unintentionally; list any route whose matching changed and why.
- Do not restore the extended query parser without noting its prototype-pollution and nesting implications for validation.
- Do not remove error-handling wrappers before tests prove rejections are handled.
- Only cite breaking changes confirmed in the Express 5 migration guide or seen failing.

{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Inventory
Table: change category, locations, fix.
## Changes made
Dependency changes, route path rewrites (old and new side by side), code changes.
## Behaviour changes
Anything that now behaves differently for clients, or "None".
## Verification
Tests added and run, manual route checks, middleware compatibility results.
## Rollout
Deploy plan and what to watch (404 rates, 500s, error handler logs).
</output_format>
