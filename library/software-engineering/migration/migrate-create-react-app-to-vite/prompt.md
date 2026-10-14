---
schema: 1
id: migrate-create-react-app-to-vite
kind: prompt
title: Migrate a Create React App project to Vite
description: Moves a Create React App project to Vite, covering index.html, REACT_APP_ environment variables, the dev proxy, SVG and asset imports, Jest or Vitest, and build output paths.
category: migration
version: 1.0.0
status: incubating
stage: [maintain]
role: [frontend-engineer, fullstack-engineer]
stack: [react]
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
depth: specific
tags: [create-react-app, vite, build-tooling, env-variables]
pairs_with:
  prompts: [switch-build-tool, migrate-test-framework-track]
args:
  - name: project
    description: "Anything known: ejected or not, TypeScript, CRACO or react-app-rewired overrides, proxy setup, how the app is deployed."
    type: text
output_contract:
  format: markdown
  sections: [Starting point, Mapping, Changes made, Verification, Follow-ups]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Create React App is deprecated and hides a lot of configuration, so moving to Vite means finding everything CRA did implicitly. The parts that break: `index.html` moves from `public/` to the project root and must load the entry with a module script; `%PUBLIC_URL%` goes away; environment variables change from `REACT_APP_*` on `process.env` to `VITE_*` on `import.meta.env` (or a configured `envPrefix`), and anything read at build time in deploy pipelines must be renamed too; `src/setupProxy.js` or the `proxy` field in `package.json` becomes `server.proxy`; `import { ReactComponent } from './logo.svg'` needs an SVG plugin with a matching import style; JSX in `.js` files needs config or renaming to `.jsx`; absolute imports from `baseUrl` need aliases; the build output folder changes from `build` to `dist`, which hosting and CI scripts often hard-code; and Jest via `react-scripts test` has to be replaced with a standalone Jest config or Vitest. CRACO and react-app-rewired overrides are hidden webpack config that must be ported by hand. Browser support also changes: Vite targets modern browsers by default, so a legacy plugin is needed if old browsers matter.
</context>

<task>
Migrate this Create React App project to Vite.
{{#project}}
About the project:
{{project}}
{{/project}}

1. Inventory what CRA was doing: `react-scripts` version, ejected or not, CRACO or rewired overrides, `proxy` or `setupProxy.js`, every `process.env.REACT_APP_*` use, `%PUBLIC_URL%` uses, SVG `ReactComponent` imports, absolute imports, `browserslist`, service worker registration, and scripts or CI steps that use `build/`.
2. Record the baseline: `npm run build` succeeds, test results, bundle output size, and a list of the main pages to check.
3. Write the mapping table from each CRA behaviour to its Vite equivalent before changing anything.
4. Add Vite and the React plugin, move and update `index.html`, create `vite.config` with aliases, proxy, SVG handling, `envPrefix` or renamed variables, and output directory decisions.
5. Rename environment variables in code, `.env*` files, CI and deploy settings, or set `envPrefix` to keep the old prefix. List every place outside the repo that sets them.
6. Replace the test runner: Vitest with jsdom and the existing Testing Library setup, or a standalone Jest config. Keep test files unchanged where possible.
7. Remove `react-scripts` and the override tools, update the `scripts` in `package.json`, and update CI and hosting to the new output folder or keep `build` via config.
8. Run the build, the tests and the dev server; compare against the baseline and check each main page, assets, proxied API calls and environment-driven behaviour.
</task>

<constraints>
- Never expose secrets: only variables with the public prefix reach the client, and the rename must not move a server-only secret into a public variable.
- Do not change application code beyond imports, environment access and what the build needs.
- Do not drop the service worker, browser support or proxy behaviour silently; list each decision.
{{> guardrails/no-hardcoding-to-pass-tests}}
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Starting point
What CRA was doing for this project, with the baseline.
## Mapping
Table: CRA behaviour, Vite equivalent, done or needs decision.
## Changes made
Files and settings changed, including CI and hosting.
## Verification
Build, tests, dev server and page checks, before and after.
## Follow-ups
Environment variables to rename outside the repo, browser support, anything not verified.
</output_format>
