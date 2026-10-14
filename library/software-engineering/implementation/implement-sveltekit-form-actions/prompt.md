---
schema: 1
id: implement-sveltekit-form-actions
kind: prompt
title: Implement SvelteKit load functions and form actions
description: Implements a SvelteKit page with server load functions, form actions with validation, progressive enhancement and correct redirect, error and auth handling in every action.
category: implementation
version: 1.0.0
status: incubating
stage: [build]
role: [frontend-engineer, fullstack-engineer]
stack: [svelte, typescript]
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
depth: specific
tags: [form-actions, progressive-enhancement, load-functions, server-side-validation]
pairs_with:
  prompts: [implement-form-validation, implement-protected-routes]
  rules: [svelte-rules]
args:
  - name: page_spec
    description: The page, the data it shows and the forms it submits, for example "account settings page with profile form and change-email form, signed-in users only".
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Routes, Changes, Tests, Verification, Decisions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a SvelteKit engineer building a page with server data and forms. SvelteKit's data flow is simple once its rules are respected:
- `+page.server.ts` load runs only on the server and may use secrets and the database. `+page.ts` load is universal and also runs in the browser, so it must never touch secrets.
- Form actions in `+page.server.ts` are endpoints of their own. A guard in a layout load does not protect them; check `locals.user` (set in `hooks.server.ts`) inside every action.
- Return `fail(400, { values, errors })` for invalid input so the page can show errors and refill fields. Never echo passwords or tokens back in `fail` data.
- In SvelteKit 2, `redirect()` and `error()` throw by themselves (no `throw` keyword); in SvelteKit 1 you write `throw redirect(...)`. Either way, calling them inside a `try` block whose `catch` swallows everything breaks them. Keep them outside the `try`, or rethrow with `isRedirect` and `isHttpError`. Use status 303 after a POST.
- Progressive enhancement: the form must work without JavaScript. `use:enhance` adds client behaviour; customise its callback only when needed (for example to keep the form filled), and remember that load functions rerun after a successful action.
- Validate on the server with the project's schema library (zod, valibot, or Superforms if it is used); client checks are a convenience.
- Built-in CSRF protection checks the request origin for form posts; never turn off `csrf.checkOrigin`.
- Svelte 5 components read `data` and `form` through `$props()`; Svelte 4 uses `export let`. Match the project.
</context>

<task>
Build this page:
{{page_spec}}

1. Read `svelte.config.js`, `package.json` (SvelteKit and Svelte versions), `hooks.server.ts`, an existing page with a form, and the validation and test setup. Follow them.
2. Write the route plan: load data, named actions, the validation for each, success and failure outcomes, redirects.
3. Implement the server load, the actions with validation and auth checks, and the page component with `use:enhance`, error display and refilled values.
4. Write tests: unit tests calling actions with a fake `RequestEvent` where the project does that, and a Playwright test that submits each form, including once with JavaScript disabled if the project already runs Playwright.
5. Run `svelte-check`, the tests and the linter. Fix what fails.
</task>

<constraints>
- Never put secrets or database calls in a universal load.
- Every action checks authorisation itself.
- Do not add packages the project does not already use without saying why.
{{> guardrails/scope-discipline}}
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Routes
A table: File | Load or action | Auth check | Success outcome | Failure outcome.
## Changes
One line per file: `path`, what changed.
## Tests
One line per test and the case it covers.
## Verification
Commands run and their actual results.
## Decisions
Choices the spec did not settle, and why.
</output_format>
