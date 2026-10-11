---
schema: 1
id: review-nextjs-server-components-change
kind: prompt
title: Review a Next.js App Router change
description: Reviews a Next.js App Router diff for server and client boundary mistakes, secrets reaching the browser, caching and revalidation errors and unprotected server actions.
category: code-review
version: 1.0.0
status: incubating
stage: [review]
role: [frontend-engineer, fullstack-engineer]
stack: [nextjs]
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
tags: [server-components, server-actions, caching, app-router, pull-request]
pairs_with:
  personas: [react-engineer]
  prompts: [review-pull-request, review-ui-component-change]
  rules: [nextjs-rules]
args:
  - name: diff
    description: The diff, with file paths, including any `layout`, `page`, `route`, `actions` and middleware files it touches.
    type: text
    required: true
  - name: context
    description: Next.js version (caching defaults changed between 14 and 15), the auth library, the hosting platform, and which pages are meant to be per-user versus shared.
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
App Router bugs rarely fail in development. They show up as one user's data cached and served to another, an API key compiled into the client bundle, or a form that anyone can call with curl. The reviewer has to track three things for every changed file. Where it runs: a file with `"use client"` and everything it imports ships to the browser, while server components can read secrets and the database. What crosses the boundary: props passed from a server component to a client component are serialised into the page payload, so passing a whole database row sends every column to the browser even if the component shows one. How it is cached: whether `fetch`, route handlers and pages are cached by default depends on the Next.js version (15 stopped caching `fetch` and GET route handlers by default), `unstable_cache` and `"use cache"` cache by their key, and reading `cookies()` or `headers()` makes a route dynamic. Server actions (`"use server"`) are public POST endpoints: the page that renders the form is not a security check, so each action must authenticate, authorise the specific record and validate its input. Middleware is not a sufficient auth layer either; a 2025 vulnerability let crafted requests skip it entirely, so checks belong next to the data access. Smaller traps: `redirect()` and `notFound()` work by throwing, so a surrounding `try/catch` swallows them; only `NEXT_PUBLIC_` variables reach the client, and a server-only module imported by a client component either leaks or breaks at build.
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

1. If you can read the repository, open each changed file in full, check `package.json` for the Next.js version, and follow every import from a `"use client"` file before judging any hunk. If you only have the diff, say which conclusions depend on code you could not see.
2. Map the boundary: for each changed component, say whether it is a server or client component, and list the props that cross from server to client. Flag any that carry whole records, tokens, internal ids the user should not see, or values that cannot be serialised (functions other than server actions, class instances, Dates on older versions).
3. Check secrets and server-only code: environment variables read in client modules (anything without `NEXT_PUBLIC_` is undefined there; anything with it is public), server modules imported by client modules, and whether the `server-only` package guards modules that hold secrets or database access.
4. Check every server action and route handler: authentication inside the action, authorisation of the specific record id it receives (not just "is logged in"), input validation, and that the action does not trust hidden form fields such as price or user id.
5. Check caching and revalidation for the stated version: per-user data inside `unstable_cache`, `"use cache"` or a statically rendered page without the user in the key; mutations that do not call `revalidatePath` or `revalidateTag` for the views they change; `fetch` calls that are now cached or uncached by accident; `export const dynamic` or `revalidate` settings that contradict the data.
6. Check control flow and rendering: `redirect()` or `notFound()` inside `try/catch`, auth enforced only in middleware or only in a layout (layouts do not re-run on client navigation between sibling pages), and values that differ between server and client render (time, random, locale) causing hydration errors.
7. For each finding, write the concrete input, request or sequence of events that triggers it and what goes wrong. Drop any finding you cannot trigger from the code you have read.
8. Rate each finding: high (data shown to the wrong user, secret in the bundle, action callable without authorisation), medium (stale data after a mutation, hydration errors, broken redirects), low (an unneeded client boundary that only costs bundle size).
9. List the tests that would fail on the current code and pass once it is fixed.
</task>

<constraints>
- State the Next.js version you assumed and which findings change if it is different; do not quote caching defaults without tying them to a version.
- Do not recommend moving everything to client components or disabling caching globally as a fix; give the narrow fix.
- At most 10 findings, most severe first. No style, naming or formatting comments unless they cause a defect.
- Stay read-only: do not edit files, push, or run commands that change state. Running read-only checks (type checker, linter, tests) is fine and worth reporting.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Verdict
One line: approve | approve-with-nits | request-changes, and the main reason.
## Findings
Numbered. Each: severity, `path:line`, where the code runs (server, client, edge), the defect, the triggering request or user action, the fix in one or two sentences.
## Missing tests
Bullets naming the case each test covers, or "None".
## Questions
Versions, settings or business rules you need confirmed, or "None".
</output_format>
