---
schema: 1
id: upgrade-react-router-major-version
kind: prompt
title: Upgrade React Router to a new major version
description: Upgrades React Router to v6 or v7, mapping Switch, nested routes, hooks, history use and data loading APIs, with future flags and route-by-route checks.
category: migration
version: 1.0.0
status: incubating
stage: [maintain]
role: [frontend-engineer, fullstack-engineer]
stack: [react]
requires: [repo-read, file-write, shell]
inputs: [repo, text]
output: [diff, report]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [client-routing, breaking-changes, future-flags, spa]
pairs_with:
  prompts: [upgrade-major-dependency, upgrade-react-major-version]
args:
  - name: current_version
    description: The React Router (or react-router-dom) version the app uses today.
    type: string
    required: true
  - name: target_version
    description: The version to move to.
    type: string
    default: "the latest stable major"
  - name: project
    description: How routes are defined (JSX, config objects), whether the app uses data routers, server rendering, Remix, or a framework.
    type: text
output_contract:
  format: markdown
  sections: [Starting point, Route map, Changes made, Verification, Follow-ups]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
React Router majors change how routes are matched, not only what things are called. From v5 to v6: `Switch` became `Routes`, `component` and `render` props became an `element` prop, route matching ranks routes instead of taking the first match (so `exact` disappears and route order stops mattering), nested routes render through `<Outlet>` and use relative paths, `useHistory` became `useNavigate`, `Redirect` became `Navigate`, `withRouter` and the `history` object are gone, and regex paths and optional params changed. Code that reaches into `history.listen` or blocks navigation needs a real replacement, and `Prompt` has no one-to-one equivalent. From v6 to v7: the package name collapses to `react-router`, the future flags (`v7_startTransition`, `v7_relativeSplatPath` and the others) describe exactly what changes, so turning them on one at a time in v6 is the safe path; v7 also offers framework mode (the Remix successor), which is a separate, optional move. The usual failure is a route that silently stops matching, which no compiler catches, so the upgrade needs a list of every URL and a check of each.
</context>

<task>
Upgrade React Router from {{current_version}} to {{target_version}}.
{{#project}}
About the project:
{{project}}
{{/project}}

1. Find every route definition, every use of router hooks, `history`, `withRouter`, redirects, navigation blocking, and links with relative paths. Record the package versions.
2. Build a route map: every URL pattern the app serves today and the component it renders, including nested and catch-all routes. This is the checklist for the end.
3. Run build, type check and tests and record the baseline.
4. Get the official migration guide for each major in between. Fetch it if you can; otherwise ask the user to paste it and stop.
5. If the current major supports future flags for the target, turn them on one at a time, fixing what each breaks, before changing the package version.
6. Upgrade one major at a time. Convert routes (`Switch` to `Routes`, `element` props, nested routes with `Outlet`, relative paths), hooks (`useNavigate`, `useParams`, `useLocation`), redirects and the `withRouter` consumers. Use official codemods if they exist and review their output.
7. Replace removed capabilities deliberately: navigation blocking, `history.listen`, regex paths. Say what you chose for each.
8. Leave framework mode or data routers out unless the user asked for them.
9. Run the checks, then walk the route map in the running app: each URL renders the same component, params are read correctly, redirects and 404s behave as before, and back and forward buttons work.
</task>

<constraints>
- Every URL in the route map must still match after the upgrade, or the change must be listed and agreed.
- Do not adopt loaders, actions or framework mode as part of a version upgrade unless asked.
- Do not keep a compatibility package in place permanently without saying so.
{{> guardrails/no-hardcoding-to-pass-tests}}
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Starting point
Versions, how routes are defined, baseline results.
## Route map
Table: URL pattern, component, status after upgrade (same, changed, removed).
## Changes made
Grouped by pattern (routes, hooks, redirects, blocking, history), with files.
## Verification
Checks before and after; route map walk results.
## Follow-ups
Optional moves such as data routers or framework mode, and anything not verified.
</output_format>
