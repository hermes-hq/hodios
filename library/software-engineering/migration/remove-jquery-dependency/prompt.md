---
schema: 1
id: remove-jquery-dependency
kind: prompt
title: Remove jQuery from a codebase
description: Removes jQuery from a site or app by replacing selectors, events, AJAX, animations and plugins with native browser APIs or the existing framework, plugin by plugin, with behaviour checks.
category: migration
version: 1.0.0
status: incubating
stage: [maintain]
role: [frontend-engineer, fullstack-engineer]
stack: [javascript]
requires: [repo-read, file-write, shell]
inputs: [repo, text]
output: [diff, report, checklist]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [jquery, vanilla-js, dom-apis, bundle-size]
pairs_with:
  prompts: [modernize-javascript-syntax, upgrade-major-dependency]
args:
  - name: scope
    description: The pages, bundles or folders to clean up, or "whole codebase".
    type: string
    default: "whole codebase"
  - name: notes
    description: Browsers to support, framework in use if any, jQuery plugins you know about, and whether third-party scripts (CMS, analytics, widgets) also load jQuery.
    type: text
output_contract:
  format: markdown
  sections: [Inventory, Plan, Changes made, Verification, Remaining jQuery]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Removing jQuery is mostly about the parts that are not jQuery itself. Core calls map cleanly to native APIs (`querySelectorAll`, `classList`, `addEventListener`, `fetch`, `closest`, `dataset`), but the differences are where bugs hide: `$()` silently does nothing on an empty set while native code throws on `null`; `.on()` with a selector is event delegation and needs `event.target.closest()`; jQuery's `.ajax` rejects on HTTP errors and `fetch` does not; `.data()` caches and type-converts values while `dataset` returns strings; `.html()` and `.append()` with strings execute scripts and create XSS risk the same way `innerHTML` does; `.show()`/`.hide()` remember the previous display value; animations become CSS transitions or the Web Animations API; and `$(document).ready` becomes `DOMContentLoaded` or `defer`. The real blockers are plugins (date pickers, sliders, validation, DataTables) and third-party or CMS scripts that expect a global `$`. Those need a replacement library or a decision to keep jQuery on specific pages, and the global must stay until nothing on the page uses it.
</context>

<task>
Remove jQuery from: {{scope}}.
{{#notes}}
Notes:
{{notes}}
{{/notes}}

1. Inventory every jQuery use: script tags and imports, `$`/`jQuery` calls grouped by API (selectors, events and delegation, AJAX, DOM manipulation, effects, utilities like `$.each` and `$.extend`), every plugin, and any third-party script that relies on the global.
2. Record the baseline: which pages use which code, existing tests, and a manual check list of interactive behaviours (forms, menus, modals, validation, AJAX calls).
3. Write the plan: core API replacements, a replacement or keep decision for each plugin (name candidates, but do not install anything without approval), and the removal order (smallest, most isolated files first).
4. Replace calls file by file, keeping behaviour: null checks where `$()` was tolerant, delegated events with `closest()`, `fetch` with explicit `response.ok` checks and the same request format (form-encoded versus JSON), string values from `dataset` converted where needed.
5. Use `textContent` or DOM building instead of HTML strings where the content includes user data; where HTML strings are needed, keep the existing sanitising.
6. Remove the jQuery script or import only from bundles or pages where nothing, including third-party scripts, still needs it.
7. Run tests and the manual check list in each supported browser available, and compare bundle size before and after.
</task>

<constraints>
- Behaviour must stay the same; note any intentional difference.
- Do not introduce a new framework or a large utility library to replace jQuery without approval.
- Do not remove the global `$` while a plugin, inline script or third-party widget still needs it.
- Do not add `innerHTML` with unescaped user data.
{{> guardrails/no-hardcoding-to-pass-tests}}
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Inventory
Counts by API group, plugin list, third-party dependencies on the global.
## Plan
Table: plugin or feature, decision (native, replacement, keep for now), reason.
## Changes made
Per file, with the trickier behaviour differences called out.
## Verification
Tests and manual checks per page and browser; bundle size before and after.
## Remaining jQuery
Where it is still loaded and what would remove it.
</output_format>
