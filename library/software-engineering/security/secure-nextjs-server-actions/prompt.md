---
schema: 1
id: secure-nextjs-server-actions
kind: prompt
title: Secure Next.js server actions and route handlers
description: Audits Next.js App Router server actions, route handlers and middleware for missing auth checks, secrets reaching client components and unvalidated input, then fixes them.
category: security
version: 1.0.0
status: incubating
stage: [build, verify]
role: [fullstack-engineer, frontend-engineer, security-engineer]
stack: [nextjs, typescript]
requires: [repo-read, file-write, shell]
inputs: [repo]
output: [diff, report, tests]
risk: runs-commands
invocation: user
effort: deep
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [app-router, server-actions, authorization, input-validation, server-only]
pairs_with:
  prompts: [implement-nextjs-server-actions, review-nextjs-server-components-change, review-auth-flow]
  rules: [nextjs-rules]
  personas: [security-auditor]
args:
  - name: scope
    description: The app, folder or feature to audit, e.g. "the whole app/ directory" or "app/(dashboard)/billing".
    type: text
    required: true
  - name: auth
    description: How users are authenticated and how roles or tenants are modelled, e.g. "Auth.js sessions, org_id on every row". Leave empty to detect it.
    type: text
output_contract:
  format: markdown
  sections: [Attack surface, Findings, Changes, Tests, Verification, Residual risk]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
In the Next.js App Router every exported server action (`"use server"`) is a public POST endpoint: its action id ships in the client bundle of any page that uses it, and anyone can call it with arguments of their choosing, whatever the UI shows. Hiding a button or checking the role in a layout protects nothing: layouts do not re-run on every action call or client navigation, and middleware is easy to bypass through matcher gaps and must never be the only check (a 2025 advisory showed the `x-middleware-subrequest` header skipping middleware entirely in unpatched versions). Arguments to actions arrive as untrusted, serialised input; TypeScript types are not validation. The second classic leak is data, not code: a server component that passes a whole database row to a client component ships every field to the browser, and a module imported from a client component is bundled for the browser along with any `process.env` value it reads that has the `NEXT_PUBLIC_` prefix. Closures in inline server actions are encrypted, but the values they capture still should not be secrets the action trusts blindly.
</context>

<task>
Audit and fix {{scope}}.
{{#auth}}Auth model: {{auth}}{{/auth}}

1. Read `package.json` for the Next.js version and flag it if it is below a release that fixed a known middleware or action vulnerability; do not upgrade without saying so.
2. List every server action (files and inline functions with `"use server"`), every `route.ts` handler and every `middleware.ts` matcher. For each, note who should be allowed to call it.
3. For each action and handler, check inside the function itself: the session is read and verified, the user is authorised for this specific object (ownership or tenant check on the id passed in, not just "logged in"), and input is parsed with a schema (Zod or the project's existing validator) that rejects unknown fields.
4. Find data leaks to the client: props passed from server to `"use client"` components that carry whole records, tokens or internal fields; server-only modules (database clients, secret readers) importable from client code; `NEXT_PUBLIC_` variables that hold secrets.
5. Check middleware: matcher coverage, whether any route relies on middleware alone, and redirects built from user input (open redirect).
6. Fix with the smallest change that follows existing patterns: a shared `requireUser`/`requireRole` helper called at the top of each action, a DTO or `select` that returns only needed fields, `import "server-only"` in server modules, and schema validation. Return generic errors, not stack traces.
7. Add tests that call each fixed action or handler directly as an unauthenticated user and as a user from another tenant, and assert denial. Run the tests, type check and lint.
</task>

<constraints>
- Treat every exported action as reachable by anyone; never accept "the UI does not show it" as a control.
- Do not move auth into middleware only, and do not remove existing checks.
- Do not change the auth provider, session strategy or database schema; propose those separately.
- Never print secret values you find; refer to them by variable name and file.
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Attack surface
Table: file, action or route, intended caller, auth check present (yes/no), object-level check (yes/no), validation (yes/no).
## Findings
Ranked list: severity, file:line, what an attacker can do, fix.
## Changes
One line per file: `path`, what changed.
## Tests
One line per test and what it proves.
## Verification
Commands run and their actual results.
## Residual risk
What remains, such as framework version, rate limiting or CSRF assumptions, and what would close it.
</output_format>
