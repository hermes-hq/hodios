---
schema: 1
id: set-up-docs-site
kind: prompt
title: Set up a docs site
description: Sets up a documentation site with Docusaurus, MkDocs Material, Sphinx or Starlight from existing Markdown, with navigation, search, optional versioning, broken-link checks and deploy on merge.
category: docs
version: 1.0.0
status: incubating
stage: [build, ship]
role: [technical-writer, maintainer, devops-engineer, developer-advocate]
stack: []
requires: [repo-read, file-write, shell]
inputs: [repo, notes]
output: [config, docs]
risk: runs-commands
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [docusaurus, mkdocs, sphinx, static-site, docs-deploy]
pairs_with:
  prompts: [reorganize-docs-by-diataxis, write-docs-landing-page, set-up-docs-linting]
args:
  - name: generator
    description: The site generator to use, or choose-for-me to pick one from the repo's ecosystem.
    type: enum
    enum: [choose-for-me, docusaurus, mkdocs-material, sphinx, starlight]
    default: choose-for-me
  - name: hosting
    description: Where the site will be hosted, such as GitHub Pages, Netlify, Vercel or an internal server.
    type: text
output_contract:
  format: markdown
  sections: [Choice and why, Files added, Build result, Owner steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The generator matters less than people think. What matters is that writing a page stays as easy as editing Markdown, that the build fails on broken links, and that merging to main publishes. Choose by ecosystem. Sphinx (or MkDocs with mkdocstrings) suits Python projects that need API docs from docstrings. Docusaurus suits JavaScript and React teams and has mature versioning. MkDocs Material is the quickest route to a clean, searchable site from plain Markdown. Starlight suits Astro users. Versioned docs are only worth it if users really run old major versions, because every version is another copy to maintain. Built-in local search is enough for most sites; hosted search services need an application or a paid plan. Common setup bugs are a wrong base path on GitHub Pages project sites, relative links that work on GitHub but not on the site, and deploys from pull requests from forks with write tokens.
</context>

<task>
Set up a docs site for this repository using {{generator}}.
{{#hosting}}
Hosting: {{hosting}}
{{/hosting}}

1. Inventory existing docs: the README, a docs folder, wiki exports, generated API docs, and the language and package manager of the repo.
2. If the generator is choose-for-me, pick one using the ecosystem and needs above and give the reason in two or three sentences.
3. Scaffold the site in a `docs/` or `website/` folder following the generator's current official setup, with pinned versions. Keep existing Markdown files where they are if the generator can read them; move files only when needed and keep git history by moving rather than copying.
4. Build navigation from the existing content, grouped by reader task. Add a minimal home page that links to the existing quickstart.
5. Turn on built-in search, strict broken-link checking (fail the build), edit-this-page links, and versioning only if the repo ships more than one supported major version.
6. Add CI: build on every pull request, deploy from the default branch to the hosting target, with least-privilege permissions and no deploy from fork pull requests.
7. Build locally, fix broken links the build reports in your new config, and list content links that were already broken.
</task>

<constraints>
- Ask before deleting or moving more than a handful of files, and never rewrite page content beyond link and front-matter fixes.
- Pin generator and plugin versions to ones you installed and saw build.
- Do not create secrets, DNS records or hosting accounts; list them as owner steps.
- Do not add analytics, cookie banners or third-party scripts unless asked.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Choice and why
The generator and the reason, plus whether versioning is on.
## Files added
Paths, grouped by config, content moves and CI.
## Build result
The build command and its real result, with remaining warnings.
## Owner steps
What a person must do to go live (enable Pages, DNS, secrets), as a checklist.
</output_format>
