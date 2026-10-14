---
schema: 1
id: secure-third-party-scripts
kind: prompt
title: Secure third-party scripts on a website
description: Inventories third-party scripts on a site, removes or self-hosts what it can, adds Subresource Integrity, CSP and iframe limits, and plans for a compromised script provider.
category: security
version: 1.0.0
status: incubating
stage: [verify, operate]
role: [frontend-engineer, security-engineer, fullstack-engineer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [repo, url]
output: [report, diff, plan]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [subresource-integrity, tag-manager, client-side-supply-chain, csp, script-inventory]
pairs_with:
  prompts: [adopt-strict-csp, harden-web-app-config, vet-dependency]
  personas: [security-auditor]
args:
  - name: site
    description: The site or app, how scripts are added (hard-coded tags, a tag manager, npm packages loaded from a CDN), and which pages are sensitive (login, checkout, account).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Inventory, Decisions, Changes, Incident plan, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Every third-party script runs with the full rights of your page: it can read form fields, card numbers and session tokens and send them anywhere. Attacks such as Magecart skimmers and the 2024 takeover of the polyfill.io domain came through scripts sites loaded from someone else's server. Most sites have more scripts than anyone knows, because a tag manager lets marketing add tags without a code change and each tag can load more. Subresource Integrity (`integrity="sha384-..."` with `crossorigin`) pins the exact file, but only works for versioned, static files; analytics and widget loaders change constantly and cannot use it. For those, the controls are fewer of them, keeping them off sensitive pages, isolating widgets in sandboxed iframes on another origin, a CSP that limits where scripts load from and where data can be sent (`connect-src`, `form-action`), and governance over who can add tags. Payment pages have explicit requirements in PCI DSS v4 for an inventory, justification and integrity checks of scripts.
</context>

<task>
Secure third-party scripts on {{site}}.

1. Build the inventory from the repo (templates, layouts, `index.html`, tag manager snippet, CSP headers) and, if a URL is given and allowed, from the loaded page's network requests. For each script: origin, purpose, owner in the team, pages it runs on, whether it loads further scripts, and whether it is versioned.
2. Decide per script: remove (unused, duplicate, owner unknown), self-host and bundle (static libraries such as fonts, polyfills, UI libraries), keep with SRI (versioned files from a CDN), or keep and contain (dynamic vendor scripts).
3. Apply SRI with `crossorigin="anonymous"` to every kept static external file, and replace unversioned CDN URLs with pinned versions or bundled copies.
4. Remove all non-essential scripts from login, checkout, payment and account pages. Move embeddable widgets (chat, video, social) into sandboxed iframes or load them only on user action.
5. Restrict with CSP: `script-src` limited to what remains, `connect-src` and `form-action` limited so stolen data cannot be sent to arbitrary hosts, plus `report-to`.
6. Tag manager governance: who can publish, review before publish, and a block on custom HTML tags on sensitive pages if the tool supports it.
7. Write the incident plan for a compromised provider: how to remove a script within minutes (feature flag, tag manager pause, CSP change), who decides, and how to check what data it could have seen.
8. Make the code changes, build, and confirm the pages still work and the console shows no SRI or CSP errors.
</task>

<constraints>
- Do not add SRI to scripts that change without notice; it will break them. Say which ones and why.
- Only load the live site if the user owns it and gave the URL.
- Do not remove a script that has a business owner without listing it for their decision.
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Inventory
Table: script, origin, purpose, pages, versioned (yes or no), loads others (yes or no).
## Decisions
Table: script, decision (remove, self-host, SRI, contain), reason, owner sign-off needed (yes or no).
## Changes
One line per file: `path`, what changed.
## Incident plan
Numbered steps with who does what.
## Verification
Build, pages checked and actual results.
</output_format>
