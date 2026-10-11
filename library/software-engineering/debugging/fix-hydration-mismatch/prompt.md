---
schema: 1
id: fix-hydration-mismatch
kind: prompt
title: Fix a hydration mismatch error
description: Fixes server-rendered pages whose client hydration fails or flickers, finding the time, locale, random, browser-only or invalid-HTML difference between server and client render.
category: debugging
version: 1.0.0
status: incubating
stage: [build]
role: [frontend-engineer, fullstack-engineer]
stack: [react, vue]
requires: [none]
inputs: [stack-trace, file, text]
output: [explanation, diff]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [hydration, ssr, server-rendering, react-server-components]
pairs_with:
  prompts: [fix-css-layout-bug, fix-date-time-bug]
  personas: [react-engineer]
args:
  - name: error
    description: The hydration warning or error from the browser console, with the diff of text or attributes if the framework printed one, and what users see (flicker, wrong content, broken buttons).
    type: text
    required: true
  - name: component_code
    description: The component or page code named in the error, plus any layout, provider or browser extension that may be involved.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What differs between server and client, Cause, Fix, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a frontend engineer who knows that hydration requires the first client render to produce exactly the markup the server sent. When it does not, React or Vue warns, may discard and re-render the subtree, and event handlers can attach to the wrong nodes. The difference almost always comes from one of these:
- Values that differ between two renders: `Date.now()`, `new Date()` formatted in the server's time zone versus the user's, `Math.random()`, generated ids (use `useId` in React), locale-dependent number and date formatting.
- Browser-only state read during render: `window`, `localStorage`, `navigator`, media queries, cookies available only on one side, a theme read from storage.
- Invalid HTML nesting the browser repairs before hydration: `<div>` inside `<p>`, `<a>` inside `<a>`, a table without `<tbody>`, interactive elements nested inside buttons.
- Data fetched differently on server and client, or stale cached data on one side.
- Browser extensions (translators, password managers, dark-mode tools) and CDN or proxy features that rewrite HTML before the client runs.
- Conditional rendering on `typeof window !== 'undefined'`, which is itself a mismatch.
The right fix makes the first client render match, then changes the client-only part after mount (an effect, a client-only component, or rendering a stable placeholder). Suppressing the warning is acceptable only for a single unavoidable value such as a timestamp, with React's `suppressHydrationWarning` on that one element.
</context>

<task>
Fix this hydration mismatch.

Error and symptoms:
{{error}}

Code:
{{component_code}}

1. Say exactly what differs between server and client output, from the framework's diff if printed, otherwise from the code. If the diff could come from a browser extension, say how to rule it out (a private window with extensions off).
2. Name the cause from the list above, pointing at the line.
3. Fix it so the first client render matches the server: pass the value from the server, format with a fixed time zone and locale or defer formatting to after mount, use framework id helpers, move browser-only reads into an effect or a client-only boundary, correct the HTML nesting. Show a diff.
4. If the client-only content must appear immediately (for example a theme), give the pattern that avoids a flash, such as setting a class from a small inline script before hydration or reading a cookie on the server.
5. Say how to check: the console is clean on a hard reload, with the server's and the browser's time zones set differently, and with JavaScript disabled the server HTML is still sensible.
</task>

<constraints>
- Do not fix it by turning off server rendering for the whole page or wrapping large trees in `suppressHydrationWarning`; that hides real bugs.
- Do not use `typeof window` checks in render as the fix.
- Match the framework and version the user is on; App Router and Pages Router in Next.js, and Vue 3 versus Nuxt, have different tools.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## What differs between server and client
The differing text, attribute or element.
## Cause
The cause and the line.
## Fix
A diff, plus the no-flash pattern if needed.
## Check
How to confirm it is fixed.
</output_format>
