---
schema: 1
id: deploy-static-site-to-cdn
kind: prompt
title: Deploy a static site or SPA to a CDN
description: Deploys a static site or single-page app to S3 with CloudFront, Cloudflare Pages or Netlify, with SPA routing, per-file cache headers, security headers and cache invalidation on release.
category: devops
version: 1.0.0
status: incubating
stage: [ship]
role: [frontend-engineer, fullstack-engineer, devops-engineer]
stack: []
requires: [repo-read, file-write]
inputs: [repo, text]
output: [config, checklist]
risk: edits-files
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [static-hosting, single-page-app, cache-headers, cache-invalidation, s3, cloudfront]
pairs_with:
  prompts: [set-up-domain-and-https, configure-cdn-caching, write-github-actions-workflow]
args:
  - name: site
    description: The site (framework and build output folder, SPA or multi-page, client-side routes), where it should be hosted, and the domain.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Setup, Caching rules, Config, Deploy, Verify, Follow-ups]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Static hosting looks trivial until the first release: users keep the old version because `index.html` was cached for a day, deep links to client-side routes return 404 on refresh, a public S3 bucket serves files directly and bypasses the CDN, and a deploy that uploads new files and deletes old ones in the wrong order breaks pages for users who loaded the previous HTML. The fix is a two-tier cache policy: content-hashed assets (`app.3f9c1.js`) cached for a year as immutable, and HTML cached briefly or revalidated every time; a rewrite of unknown paths to `index.html` for SPAs only (multi-page sites need real 404s); a private bucket reachable only through the CDN; and uploads ordered so new assets exist before the HTML that references them, with old assets kept for a while.
</context>

<task>
Deploy this static site:
<site>
{{site}}
</site>

1. Read the project: framework, build command and output folder, whether filenames are content-hashed, client-side routing, existing headers or redirects files, and any CI.
2. If the host is not chosen, recommend one in a sentence (managed static hosting such as Cloudflare Pages or Netlify for simplicity, S3 plus CloudFront when the team is already on AWS) and continue.
3. Caching: hashed assets `Cache-Control: public, max-age=31536000, immutable`; HTML and unhashed files such as `manifest.json` `no-cache` or a short max-age; set per file type in the host's headers file or upload metadata.
4. Routing: SPA fallback to `index.html` with a 200 only for SPAs; real 404 page for multi-page sites; redirects for old URLs if given.
5. Security headers: HSTS, `X-Content-Type-Options`, `Referrer-Policy`, and a starter Content-Security-Policy in report-only mode if none exists.
6. For S3 plus CloudFront: private bucket with origin access control, default root object, the SPA fallback done with a CloudFront function or error response mapping, and an invalidation of HTML paths only on release.
7. Write the CI deploy job: build, upload assets first, then HTML, keep old hashed assets (no delete-on-sync for them), and invalidate or purge HTML. Use OIDC or the platform's integration instead of stored keys where possible.
8. Run the build locally if possible and confirm hashed filenames exist.
</task>

<constraints>
- Never make the bucket public when a CDN sits in front of it.
- Never set long cache lifetimes on HTML or on unhashed files.
- Do not invent config keys for a host; say when unsure.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Setup
Host, origin, routing mode and domain, in bullets.

## Caching rules
A table: file pattern, Cache-Control value, reason.

## Config
Headers, redirects or infrastructure files with paths and contents.

## Deploy
The CI job with path and contents, and the upload order.

## Verify
Build result and the header checks to run after deploy (for example with curl -I on an asset and on index.html).

## Follow-ups
DNS and certificate steps, CSP tightening, and credentials to create. "None" if empty.
</output_format>
