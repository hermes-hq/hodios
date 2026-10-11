---
schema: 1
id: review-express-handler-change
kind: prompt
title: Review an Express route handler change
description: Reviews Express or Node.js route handlers for async errors that never reach the error middleware, double responses, middleware order bugs and unchecked request input.
category: code-review
version: 1.0.0
status: incubating
stage: [review]
role: [backend-engineer, fullstack-engineer]
stack: [express]
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
tags: [middleware, async-errors, request-validation, rest-api, pull-request]
pairs_with:
  personas: [backend-engineer]
  prompts: [review-pull-request, review-error-handling]
args:
  - name: diff
    description: The diff with file paths, including route files, middleware and the app setup file where middleware is registered.
    type: text
    required: true
  - name: context
    description: Express major version (4 and 5 handle rejected promises differently), Node version, database and validation library in use, and whether the app runs behind a proxy or load balancer.
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
Express bugs are mostly control-flow bugs. In Express 4, a rejected promise from an `async` handler is not passed to the error middleware: the unhandled rejection crashes the process on Node 15 and later (or, if an `unhandledRejection` listener swallows it, the request hangs until the client times out), unless the handler catches and calls `next(err)` or a wrapper does it. Express 5 forwards rejected promises, so the version decides the finding. Responding twice is the other classic: a branch that calls `res.status(400).json(...)` without `return` falls through to a second `res.json`, which throws "Cannot set headers after they are sent", and calling `next()` after responding does the same downstream. Middleware runs in registration order: body parsers registered after a router leave `req.body` undefined, an auth middleware added below a route does not protect it, and the error handler must take four arguments and be registered last. Request input is less typed than it looks: `req.query.id` can be an array (`?id=1&id=2`) and, with Express 4's default `extended` query parser, an object (`?id[$ne]=1`), which turns into NoSQL injection when passed straight to MongoDB and into type confusion elsewhere; `parseInt` returns `NaN` silently. `req.ip` and `X-Forwarded-For` are only trustworthy with the right `trust proxy` setting. Module-level variables are shared by all concurrent requests.
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

1. If you can read the repository, open each changed handler in full, the app setup file that registers middleware and routers, and the error middleware, before judging any hunk. If you only have the diff, say which conclusions depend on code you could not see.
2. Trace every path through each changed handler and confirm it ends in exactly one response or one `next(err)`: missing `return` after a response, responses inside callbacks plus another after them, `next()` called after responding, and paths that end without responding at all.
3. Check async error flow for the stated Express version: async handlers or middleware without try/catch or a wrapper on Express 4, promises not awaited (floating), errors thrown inside callbacks or event handlers that no middleware can catch, and stream `pipe` without error handling.
4. Check middleware order and registration: parsers, auth, rate limiting and CORS registered before the routes they must cover, routers mounted at the intended path, and the four-argument error handler registered last.
5. Check request input: types of `req.query`, `req.params` and `req.body` assumed rather than validated, objects or arrays passed into database queries, `parseInt` or `Number` results used without a `NaN` check, missing size limits on bodies or uploads, and `req.ip` used for security decisions without `trust proxy` configured.
6. Check shared state and responses: module-level mutable variables written per request, error responses that send stack traces or internal messages, and status codes left at the default 200 for failures.
7. For each finding, write the concrete input, request or sequence of events that triggers it and what goes wrong. Drop any finding you cannot trigger from the code you have read.
8. Rate each finding: high (hanging requests or crashes from unhandled rejections, auth bypass from middleware order, injection through query objects), medium (double-response errors, wrong status codes clients rely on), low.
9. List the tests that would fail on the current code and pass once it is fixed.
</task>

<constraints>
- State the Express version you assumed; if it is unknown, say which findings apply only to Express 4.
- Use the validation library and error-wrapper pattern the codebase already has; do not introduce a new framework.
- At most 10 findings, most severe first. No style, naming or formatting comments unless they cause a defect.
- Stay read-only: do not edit files, push, or run commands that change state. Running read-only checks (type checker, linter, tests) is fine and worth reporting.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Verdict
One line: approve | approve-with-nits | request-changes, and the main reason.
## Findings
Numbered. Each: severity, `path:line`, the route and method, the defect, the triggering request (method, path, body or query), the fix in one or two sentences.
## Missing tests
Bullets naming the case each test covers, or "None".
## Questions
Versions, settings or business rules you need confirmed, or "None".
</output_format>
