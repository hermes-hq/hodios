---
schema: 1
id: implement-protected-routes
kind: prompt
title: Implement protected and role-gated routes
description: Implements signed-in and role-gated routes in a single-page app or Next.js app, with safe redirects, no flash of protected content, and server-side enforcement behind every client guard.
category: implementation
version: 1.0.0
status: incubating
stage: [build]
role: [frontend-engineer, fullstack-engineer, security-engineer]
stack: [nextjs, vue]
requires: [repo-read, file-write, shell]
inputs: [spec, repo]
output: [code, tests]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: mid
reasoning: recommended
level: intermediate
tags: [route-guards, auth, authorization, open-redirect, middleware]
args:
  - name: routes
    description: Which routes need sign-in, which need a role, and what users without access should see.
    type: text
    required: true
  - name: auth_setup
    description: How auth works now, for example "Auth.js sessions", "JWT in memory from our API", "Clerk". Leave empty to detect it.
    type: text
output_contract:
  format: markdown
  sections: [Access map, Changes, Tests, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A route guard in the browser is a user-experience feature, not security: anyone can call the API directly or edit the client bundle. The real check must happen wherever data is served. Typical bugs: the protected page renders for a moment before the auth state loads; the redirect back after login uses an unvalidated `returnTo` parameter, creating an open redirect; Next.js middleware is the only check, though middleware can be misconfigured by its matcher and has had bypass vulnerabilities, so pages, route handlers and server actions must check again; role checks are copied into each page and drift; and 401 (not signed in) and 403 (signed in, not allowed) are treated the same.
</context>

<task>
Protect these routes:

{{routes}}

{{#auth_setup}}
Auth setup: {{auth_setup}}
{{/auth_setup}}

1. Read the router setup, auth library and session shape, existing guards, layouts, and the API or server code behind these routes.
2. Build an access map: route, required state (public, signed in, role or permission), what to do when missing (redirect to login, show 403 page, hide the link).
3. Implement one reusable guard instead of per-page checks:
   - SPA (React Router, Vue Router): a wrapper route or `beforeEach` guard that waits for auth to resolve, shows a loading state meanwhile, and redirects or renders a 403 view.
   - Next.js App Router: check the session in the server layout or page for the segment (and in every route handler and server action it uses); use middleware (renamed `proxy` in Next.js 16) only as an early redirect, never as the sole check.
4. Preserve the destination: pass `returnTo` on redirect to login, and after login accept it only if it is a same-origin relative path (starts with a single `/`, not `//` or a scheme).
5. Enforce on the server: confirm each API endpoint or data loader behind these routes checks the same rule; add checks where missing and list them.
6. Keep role logic in one place (a `can(user, permission)` helper or the project's policy layer) used by both route guards and UI that hides links.
7. On logout, clear cached user data (query caches, stores) and redirect.
8. Write tests: signed-out redirect with `returnTo`, wrong-role 403, allowed access, an external `returnTo` rejected, and a direct API call without rights refused. Run tests, type check and lint.
</task>

<constraints>
- Never treat hiding a link or a client guard as the access control.
- Do not store tokens in `localStorage` as part of this change if the project uses httpOnly cookies.
- Do not redirect to any URL taken from the query string without validating it.
{{> guardrails/scope-discipline}}
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Access map
Table: Route | Requires | Unauthenticated | Wrong role | Server check location.

## Changes
One line per file: `path`, what changed.

## Tests
One line per test.

## Verification
Commands run and their real results.
</output_format>
