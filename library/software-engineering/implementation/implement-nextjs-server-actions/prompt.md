---
schema: 1
id: implement-nextjs-server-actions
kind: prompt
title: Implement mutations with Next.js Server Actions
description: Implements a form or mutation with Next.js Server Actions, including input validation, auth checks inside the action, cache revalidation, pending states and typed error returns.
category: implementation
version: 1.0.0
status: incubating
stage: [build]
role: [fullstack-engineer, frontend-engineer, software-engineer]
stack: [nextjs, typescript]
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
tags: [server-actions, app-router, form-handling, zod, revalidation]
args:
  - name: mutation
    description: What the user does and what changes, for example "edit profile name and bio", "delete a comment", "add an item to the cart".
    type: text
    required: true
  - name: who_can
    description: Who is allowed to perform it, for example "the signed-in owner of the comment". Leave empty to follow nearby code.
    type: text
output_contract:
  format: markdown
  sections: [Design, Changes, Tests, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A Server Action looks like a function call but is a public POST endpoint: anyone can invoke it with any arguments, whatever the UI shows. The usual bugs are: no authentication or ownership check inside the action because the page itself was protected; trusting `FormData` values without parsing (everything arrives as strings or files); calling `redirect()` inside `try/catch`, which swallows the redirect because it works by throwing; forgetting `revalidatePath` or `revalidateTag`, so the page shows stale data; and throwing for expected validation errors, which surfaces as an error boundary instead of a message next to the field.
</context>

<task>
Implement this mutation with a Server Action:

{{mutation}}

{{#who_can}}
Allowed: {{who_can}}
{{/who_can}}

1. Read `package.json` for Next.js and React versions, the existing actions folder or pattern, the auth helper, validation library, data layer and how forms are built. Follow them.
2. Put the action in a `'use server'` module (or the project's convention). Import `server-only` code freely there; never import it into client components.
3. Inside the action, in this order: get the session and reject if missing; parse input with the schema (zod or the project's validator) from `FormData` or typed arguments; load the target record and check the caller may change it; perform the write; revalidate the affected paths or tags. Match the installed version: `revalidatePath` and `revalidateTag` everywhere; on Next.js 16, `updateTag` inside an action gives the user read-your-own-writes, and `revalidateTag` takes a cache-life profile as its second argument.
4. Return a typed, serializable result for expected outcomes, for example `{ ok: false, fieldErrors }` or `{ ok: true }`. Throw only for unexpected errors. Call `redirect()` after the `try/catch`, not inside it.
5. Build the form with `useActionState` (React 19) or `useFormState` on older versions, show pending state with `useFormStatus` or the pending flag, render field errors, and keep the form working as a plain HTML form before hydration where possible.
6. If the UI needs instant feedback, add `useOptimistic` and make sure it rolls back on error.
7. Do not pass secrets or whole records through closures or hidden fields; send ids and re-load on the server.
8. Write tests for the action logic (valid input, invalid input, unauthenticated, not the owner) by calling the underlying function with a mocked session, and an end-to-end test if the project has Playwright or Cypress. Run tests, type check and lint.
</task>

<constraints>
- Every action checks authentication and authorization itself, every time.
- Do not create an API route in addition to the action unless something outside the app needs it.
- Do not disable or weaken the framework's CSRF and origin checks for actions.
{{> guardrails/scope-discipline}}
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Design
Action signature, input schema, auth rule, revalidation targets and result shape, in bullets.

## Changes
One line per file: `path`, what changed.

## Tests
One line per test.

## Verification
Commands run and their real results.
</output_format>
