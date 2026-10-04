---
schema: 1
id: fix-spa-route-announcements
kind: prompt
title: Fix route changes in single-page apps
description: Fixes silent navigation in client-side routed apps by managing focus, page titles, live announcements and scroll on route change, plus toasts and loading states.
category: accessibility
version: 1.0.0
status: incubating
stage: [build, verify]
role: [frontend-engineer, fullstack-engineer]
requires: [none]
inputs: [file, text]
output: [code, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [client-side-routing, focus-management, live-regions, page-title, screen-reader]
pairs_with:
  personas: [accessibility-specialist]
  prompts: [fix-keyboard-navigation, audit-web-accessibility, write-screen-reader-test-plan]
  rules: [frontend-accessibility-rules]
args:
  - name: router_code
    description: The router setup, the root layout or app shell, and any existing toast, loading or title code.
    type: text
    required: true
  - name: framework
    description: The framework, so the fix uses its router hooks.
    type: enum
    enum: [react, vue, angular, svelte, other]
    default: react
output_contract:
  format: markdown
  sections: [What users experience now, Fix, Async states, Test checklist]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
In a server-rendered site, following a link loads a new page: the browser resets focus, the screen reader announces the new title, and the user starts at the top. A client-side router swaps content without any of that. A screen-reader user activates a link and hears nothing; focus stays on a link that may no longer exist, or falls back to `body`; the tab title still names the old page; and a keyboard user has to tab through the whole header again. Toasts appear and vanish unheard, and spinners say nothing. The fix is small but must be consistent: one route-change handler in the app shell, not ad hoc code per page.
</context>

<task>
Fix route-change accessibility in this {{framework}} app:

<router_code>
{{router_code}}
</router_code>

1. Describe what a screen-reader and keyboard user experiences today on a route change, based on the code.
2. Implement one route-change handler in the app shell, using the router's after-navigation hook (for example a location effect, `afterEach`, `NavigationEnd`, `afterNavigate`):
   - Title: set `document.title` to "Page name - Site name" for every route, from route metadata, after data needed for the name has loaded.
   - Focus: move focus to the new page's `h1` (with `tabindex="-1"` and no visible outline change on programmatic focus, or a subtle one), or to the `main` landmark if there is no heading. Do not move focus on the first page load, on query-string-only changes such as filters and sorting, or when a hash targets an in-page anchor.
   - Announcement: if focus moves to the heading, the heading is read and no extra announcement is needed. If the design cannot move focus, announce "Navigated to Page name" in one persistent, visually hidden `aria-live="polite"` region that exists from the first render.
   - Scroll: restore scroll on back and forward, go to top on new navigation, and let the focus move do the rest.
   - Skip link: keep a "Skip to main content" link as the first focusable element and make sure it still works after route changes.
3. Async states: loading indicators announce "Loading results" politely only if loading takes longer than about one second, and the result is announced ("24 results"); errors use `role="alert"` sparingly. Toasts use a single polite live region, stay at least 5 seconds or until dismissed, never hold the only copy of important information, and pause on hover and focus; toasts with actions must be reachable or duplicated elsewhere.
4. Focus after in-page changes the router does not see: deleting an item, closing a modal, or submitting a form that replaces itself. Name where focus goes in each case.
5. Note framework built-ins that already do part of this (for example a framework route announcer) and do not duplicate them; if two announce, remove one.
</task>

<constraints>
- One live region per politeness level, created at startup. Never create a live region and fill it in the same tick.
- Do not use `role="alert"` or `aria-live="assertive"` for navigation.
- Do not invent router APIs; if the version is unclear from the code, ask or mark the hook as [check version].
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## What users experience now
Three to five bullets.

## Fix
The route-change handler, the live region component and changes to the shell, in {{framework}}, with comments.

## Async states
Code or rules for loading, results, errors and toasts, and focus after in-page changes as a table: Event | Focus goes to | Announcement.

## Test checklist
Numbered steps with NVDA or VoiceOver and keyboard only: follow a link, use back, change a filter, delete an item, trigger a toast; the expected announcement and focus for each.
</output_format>
