---
schema: 1
id: migrate-angularjs-to-angular
kind: prompt
title: Migrate an AngularJS app to modern Angular
description: Plans and starts moving an AngularJS 1.x app to modern Angular (or another framework) with preparation work, a hybrid app, downgraded and upgraded pieces, and a screen-by-screen order.
category: migration
version: 1.0.0
status: incubating
stage: [plan, maintain]
role: [frontend-engineer, fullstack-engineer, tech-lead]
stack: [angular, javascript]
requires: [repo-read, file-write, shell]
inputs: [repo, text]
output: [plan, diff, report]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: expert
tags: [ngupgrade, legacy-code, hybrid-app, strangler-fig, end-of-life]
pairs_with:
  prompts: [plan-incremental-migration, upgrade-angular-major-version]
args:
  - name: target
    description: The framework to move to.
    type: string
    default: "modern Angular"
  - name: notes
    description: "AngularJS version, size (screens, directives, services), build setup (script tags, Gulp, webpack), router (ngRoute or UI-Router), test coverage, team constraints."
    type: text
output_contract:
  format: markdown
  sections: [Assessment, Preparation, Hybrid approach, Migration order, First slice, Risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
AngularJS has been out of support since the end of 2021, and big-bang rewrites of these apps usually stall. The proven route is incremental. What experienced people know: preparation pays off before any new framework code. That means moving to component-style directives (`.component()`, `controllerAs`, one-way bindings), removing `$scope` inheritance and `$rootScope` event buses, using a module bundler instead of script-tag ordering, and adding TypeScript and tests around the screens to be moved. For modern Angular, the hybrid approach runs both frameworks in one page: `UpgradeModule` (or the lighter `downgradeModule` when change detection cost matters) bootstraps them together, `downgradeComponent` and `downgradeInjectable` expose new pieces to AngularJS, and `UpgradeComponent` wraps old directives for use in new code. Two routers in one app are a common source of pain, so decide early which router owns which URLs. Migrating leaf components and stateless services first, then whole routes, keeps each step shippable. For a different target framework there is no official hybrid, so the strangler approach is route by route, with the old and new apps behind the same domain sharing auth and session.
</context>

<task>
Plan this migration to {{target}} and deliver the first slice.
{{#notes}}
Notes:
{{notes}}
{{/notes}}

1. Assess the code: count screens, directives, controllers, services and filters; find `$scope` inheritance, `$rootScope` events, `$watch`-heavy code, jQuery use, global state, the router, the build, and test coverage. Note any third-party AngularJS modules and their replacements.
2. Recommend the approach for {{target}} (hybrid with ngUpgrade for Angular, or route-by-route strangling for other frameworks) with the reasons and costs for this codebase.
3. List preparation work in order (bundler, TypeScript, component-style directives, removing scope inheritance and event buses, tests) and estimate it relative to the rest.
4. Propose the migration order: shared services and leaf components first, then routes, with criteria for when a route is fully moved and when AngularJS can be removed.
5. Set up the hybrid or strangler skeleton on a branch, keeping the existing app working.
6. Migrate one small, low-risk piece end to end (a service and a leaf component used on one screen), with tests, and show how it is wired into the old app.
7. Run the existing tests and smoke test the affected screens.
</task>

<constraints>
- Do not propose a big-bang rewrite unless the user asks; if the app is small enough for one, say so with reasons.
- Keep the app shippable after every step; no long-lived branch holding half the migration.
- Do not invent replacement libraries; name candidates only when you are sure they exist, and mark them for checking.
- Do not change behaviour while moving code; fixes go in separate commits.

{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Assessment
Size, patterns found, third-party modules, coverage.
## Preparation
Ordered prep tasks with rough relative effort.
## Hybrid approach
Chosen approach, routing ownership, bootstrap setup.
## Migration order
Phases with entry and exit criteria.
## First slice
What was migrated, how it is wired, tests and results.
## Risks
Performance, routing, team skills, timeline risks and mitigations.
</output_format>
