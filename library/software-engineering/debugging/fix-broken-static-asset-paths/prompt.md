---
schema: 1
id: fix-broken-static-asset-paths
kind: prompt
title: Fix images, CSS or scripts that 404 after deploy
description: Fixes images, stylesheets, fonts or scripts that load locally but 404 after deploy, from base paths and subfolder hosting, public folder rules, CDN prefixes, SPA fallbacks and filename case.
category: debugging
version: 1.0.0
status: incubating
stage: [ship, operate]
role: [frontend-engineer, fullstack-engineer]
stack: []
requires: [none]
inputs: [logs, config, file, text]
output: [explanation, diff]
risk: read-only
invocation: user
effort: quick
interaction: interactive
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [static-assets, base-path, cdn, spa-routing, deploy-errors]
pairs_with:
  prompts: [fix-failed-platform-deployment, fix-stale-cache-bug]
args:
  - name: symptom
    description: Which assets fail and how, with the failing URLs from the browser network tab, for example "the page loads but /assets/index-3fa2.js is 404", "images 404 only on /blog/post pages", "fonts blocked", "blank page on GitHub Pages".
    type: text
    required: true
  - name: setup
    description: The framework and bundler (Vite, Next.js, Create React App, Angular, Django, Rails), where it is hosted and under which URL (root domain or a subpath such as /app/), any CDN, the base path or asset prefix config, and how assets are referenced in code.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Requested versus actual location, Cause, Fix, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a front-end engineer who fixes broken assets by comparing the URL the browser requests with the URL where the file actually lives after the build. The usual mismatches:
- Hosting under a subpath (`example.com/app/`, GitHub Pages project sites, a reverse proxy prefix) while the build assumes the root, so `/assets/x.js` points to the domain root. Each tool has a base setting: Vite `base`, Next.js `basePath` and `assetPrefix`, Create React App `homepage` or `PUBLIC_URL`, Angular `--base-href`, and the proxy must forward the prefix consistently.
- Relative paths in HTML or CSS (`img/logo.png` without a leading slash) resolve against the current page URL, so they work on `/` and break on `/blog/post`. CSS `url()` resolves relative to the CSS file, not the page.
- Files outside the public or static folder are not copied into the build unless imported; files inside it are served as-is without hashing, at the root path.
- Case-sensitive file names on Linux hosts and object storage (`Logo.PNG` versus `logo.png`).
- Single-page apps: the server's fallback that returns `index.html` for unknown routes also returns HTML for missing JS files, giving "Unexpected token '<'" or a MIME type error instead of a 404.
- Stale HTML after a deploy referencing hashed bundles that no longer exist, when HTML is cached by a CDN or browser but old assets were deleted.
- Backend frameworks: Django needs `collectstatic` and a `STATIC_URL` served by something in production (`DEBUG=False` stops Django serving them); Rails needs precompiled assets and the right `config.public_file_server` or proxy setting.
- CDN or storage: the asset prefix points to a CDN that was not uploaded to, or the bucket objects lack the right content type. Fonts from another origin need CORS headers.
</context>

<task>
Fix these broken asset URLs.

Symptom:
{{symptom}}

Setup:
{{setup}}

1. If you can read the repository, open the bundler and framework config, the HTML template, the code or CSS that references the failing assets, and the server or hosting config, and look at the build output folder if one exists.
2. For each failing asset, compare the requested URL with where the file is in the build output and where it is served from. Put this in a table.
3. Name the mismatch: base path, relative path resolution, public folder rule, case, SPA fallback, stale HTML, missing collect or precompile step, or CDN upload and headers. If the input does not show the build output or the served URL, give the check (list the output folder, request the asset URL directly and read the status and content type) and stop.
4. Give the fix as a config or code diff: set the base or asset prefix for the real hosting path, use imports or root-relative paths through the framework's helper, move files into the public folder or import them, correct the case, exclude asset paths from the SPA fallback, keep previous hashed assets for one release and stop caching HTML long-term, or add the collect or precompile step to the deploy.
5. Give a check: build locally with the production base, serve the output under the same path as production, and load a deep link page with the network tab open.
</task>

<constraints>
- Do not fix by hard-coding the full production domain into asset URLs; keep URLs configurable per environment.
- Do not set `DEBUG=True` in production to make Django serve static files.
- Do not invent config option names; name them for the framework version given, and say when they changed between versions.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Requested versus actual location
Table: Asset | Requested URL | Actual location | Status.
## Cause
The mismatch, or the check to run.
## Fix
Diff.
## Check
Production-like local test.
</output_format>
