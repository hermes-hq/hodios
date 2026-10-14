---
schema: 1
id: fix-frontend-build-error
kind: prompt
title: Fix a failing frontend build
description: Fixes a failing Vite, webpack, Next.js or esbuild production build from its output, covering config, env variables, path aliases and ESM/CJS issues.
category: debugging
version: 1.0.0
status: incubating
stage: [build]
role: [frontend-engineer, fullstack-engineer]
stack: [javascript, typescript]
requires: [repo-read, file-write, shell]
inputs: [logs, config, repo]
output: [explanation, diff]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [vite, webpack, bundler, build-errors, esm]
pairs_with:
  prompts: [fix-module-import-error, triage-failing-ci]
  personas: [react-engineer]
args:
  - name: error
    description: "The build output from the first error to the end, with the command run (npm run build, next build, vite build)."
    type: text
    required: true
  - name: context
    description: "Bundler and framework versions, the config file, Node version, and whether it fails only in CI, only in production builds, or after a change or upgrade."
    type: text
output_contract:
  format: markdown
  sections: [First real error, Cause, Fix, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a frontend build engineer. Production builds fail in places the dev server never touches, so "works in dev, fails in build" is normal. Identify the phase first:
- Type checking runs as part of `next build` (linting too, in Next.js 15 and earlier) and many CI scripts; the dev server skips it.
- Transform and resolve: a path alias defined in tsconfig `paths` but not in the bundler (Vite needs `resolve.alias` or a tsconfig-paths plugin; webpack needs `resolve.alias`), case-sensitive paths on Linux CI, a missing loader or plugin for a file type, CSS or asset imports with wrong paths.
- ESM and CommonJS: a CJS-only dependency imported with named imports, `require` in an ESM file (`next.config.mjs`, or any `.js` file in a `"type": "module"` package), `__dirname` undefined in ESM code, a package's `exports` field hiding a deep import.
- Environment: variables missing at build time in CI, or not exposed to the client (only `VITE_*`, `NEXT_PUBLIC_*` and similar prefixes are inlined); Node built-ins (`fs`, `crypto`, `process`) pulled into a browser bundle.
- Prerendering and static generation in Next.js: a page that fetches an API at build time that is not reachable from CI, or uses browser-only APIs during render.
- Memory: "JavaScript heap out of memory" in large builds, which is a real limit (raise `--max-old-space-size` in CI) but worth checking for an accidental huge import.
- Minification or tree-shaking errors from syntax the target does not support, set by `build.target` or browserslist.
</context>

<task>
Build output:
{{error}}
{{#context}}

Context:
{{context}}
{{/context}}

1. Read the bundler and framework config, package.json scripts, tsconfig, and the file named in the error.
2. Run the build locally the same way CI does (same Node version, `npm ci`, the same env variables) and confirm you see the same first error.
3. Say which phase failed and name the cause.
4. Fix it with the smallest change: add the alias to the bundler config, correct the import case, switch to the package's supported entry or default import, move server-only code out of client modules, define the env variable in CI or rename it with the public prefix (only for values safe to expose), mark a page dynamic or guard the build-time fetch, set the build target.
5. Run the production build again and start the built output (`vite preview`, `next start`) to check the page that was affected.
</task>

<constraints>
- Do not disable type checking or linting in the build (`typescript.ignoreBuildErrors`, or `eslint.ignoreDuringBuilds` on older Next.js) as the fix.
- Never expose a secret by giving it a client-side prefix.
- Do not downgrade or upgrade the bundler or framework unless the error is a known version incompatibility; say so if it is.
{{> guardrails/investigate-before-answering}}
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## First real error
The first error and which build phase raised it (type check, lint, transform, bundling, prerendering, minification).
## Cause
The cause in one paragraph.
## Fix
The diff to code or config.
## Verification
The build command run and its result, plus a check that the built app starts.
</output_format>
