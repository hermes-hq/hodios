---
schema: 1
id: write-embed-installation-guide
kind: prompt
title: Write an embed installation guide
description: Writes install instructions for a JavaScript widget or snippet across plain HTML, React, Next.js, WordPress and Shopify, with verification, consent and Content Security Policy notes.
category: docs
version: 1.0.0
status: incubating
stage: [build, ship]
role: [technical-writer, frontend-engineer, developer-advocate]
stack: [javascript]
requires: [repo-read, file-write]
inputs: [repo, file, text]
output: [docs]
risk: edits-files
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [embed-snippet, widget, content-security-policy, install-guide]
pairs_with:
  prompts: [write-installation-guide]
args:
  - name: snippet
    description: The embed code and loader script behaviour (what it injects, what it loads, globals, config options).
    type: text
    required: true
  - name: platforms
    description: Platforms to cover.
    type: string
    default: plain HTML, React, Next.js, WordPress and Shopify
output_contract:
  format: markdown
  sections: [Guide written, Requirements for site owners, Questions for the owners]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Embeds (chat widgets, analytics tags, booking or review widgets, payment buttons) are installed by people with very different skills, from a WordPress site owner pasting into a theme setting to a Next.js developer. They break in predictable ways: the snippet is pasted into a React component and runs twice or never, Next.js needs `next/script` with the right loading strategy, single-page apps need a call on route change, a strict Content Security Policy blocks the loader or its iframe, a cookie consent tool blocks it until consent, an ad blocker hides it, WordPress editors strip `<script>` tags from post content, and Shopify themes need it in the theme layout or an app embed. Each platform needs its own short, exact steps and a way to check it worked.
</context>

<task>
Write the installation guide for this embed:

<snippet>
{{snippet}}
</snippet>

Platforms: {{platforms}}.

1. Read the loader code or docs: where the snippet must go (head or end of body), what domains it loads from, whether it creates iframes, globals it exposes, config options, and whether it needs a call on route change.
2. Write a short "Before you start" (account, the site ID or key and where to find it).
3. For each platform, write exact steps:
   - Plain HTML: where to paste and why.
   - React: a component or hook that loads it once, cleans up on unmount if the loader supports it, and handles route changes.
   - Next.js: `next/script` with the right `strategy`, App Router and Pages Router placement.
   - WordPress: theme header option, a header-and-footer plugin, or `wp_enqueue_script` in a child theme, not post content.
   - Shopify: theme layout file or an app embed block, with the theme editor steps.
   - Any other platform asked for.
4. Add "Check it works": what the user should see, and how to confirm in the browser devtools Network and Console tabs.
5. Add Content Security Policy directives the site needs (`script-src`, `frame-src`, `connect-src`, `img-src`), derived from the domains the loader uses.
6. Add notes on cookie consent (which consent category the embed falls into, if known), ad blockers, and performance (async or defer loading).
7. Add troubleshooting for the common failures above.
</task>

<constraints>
- Every domain, option and global must come from the snippet or loader. Mark unknowns "to confirm".
- Do not tell site owners to disable their CSP or consent tool; give the minimal allowances instead.
- Do not present platform menu paths you are unsure of as exact; describe them generally and suggest checking the platform's docs.
- Use a placeholder site ID.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
Write the guide. Then reply with:
## Guide written
Path and platforms covered.
## Requirements for site owners
CSP directives, consent category and any server-side setup, as a checklist.
## Questions for the owners
Loader behaviour you could not confirm (route change support, cleanup, consent category).
</output_format>
