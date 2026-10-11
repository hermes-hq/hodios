---
schema: 1
id: write-llms-txt
kind: prompt
title: Write llms.txt for a docs site
description: Writes an llms.txt file and plain Markdown versions of key docs pages so AI assistants and coding agents can read a project's current docs accurately, kept in sync by the docs build.
category: docs
version: 1.0.0
status: incubating
stage: [build, ship]
role: [technical-writer, developer-advocate, maintainer]
stack: []
requires: [repo-read, file-write]
inputs: [repo, url]
output: [docs, config]
risk: edits-files
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [llms-txt, ai-readable-docs, docs-site, markdown-export, coding-agents]
pairs_with:
  prompts: [write-docs-landing-page, set-up-docs-site, write-api-quickstart]
args:
  - name: site_url
    description: The public base URL of the docs site, if not in the docs config.
    type: text
  - name: notes
    description: Which pages matter most, versions still supported, or pages that should be left out.
    type: text
output_contract:
  format: markdown
  sections: [Files written, Pages included, Markdown versions, Keeping it current]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Developers now often meet a project's docs through an AI assistant or coding agent. These tools work best when given clean Markdown rather than HTML with navigation, cookie banners and tabbed code blocks. The llms.txt convention puts a Markdown file at the site root: an H1 with the project name, a blockquote summary, optional short paragraphs, then H2 sections of links in the form `- [Title](url): one-line note`, with a section titled "Optional" for pages that can be skipped when context is short. Many sites also publish `llms-full.txt` with the full text, and a `.md` version of each page at the same path. The pages that matter most are the ones that stop AI tools making common mistakes: install, quickstart, current API reference, configuration, migration guides and the known-pitfalls page. Old versions of the docs confuse these tools, so point at the current version. It is a convention, not a ranking signal, and no tool is guaranteed to read it.
</context>

<task>
Add llms.txt to the docs in this repository.
{{#site_url}}
Site URL: {{site_url}}
{{/site_url}}
{{#notes}}
Notes: {{notes}}
{{/notes}}

1. Find the docs generator, its config (base URL, versioning, i18n), the source folder and the navigation.
2. Choose the pages to include: usually 10 to 40, grouped by the sections a developer needs (getting started, guides, reference, migration). Put long, rarely needed pages under "Optional". Use the current version only.
3. Write `llms.txt` in the folder the generator copies to the site root (for example `static/` or `public/`), with absolute URLs built from the configured base URL and a one-line note per link that says what the page answers.
4. Provide Markdown versions: if the generator has a maintained plugin for llms.txt or Markdown output, configure it instead of hand-writing files. Otherwise add a build step that copies or renders the source pages to `.md` paths, with MDX components and tabs reduced to plain Markdown.
5. If the repo can afford it, also generate `llms-full.txt` from the same page list.
6. Run the docs build and confirm the files appear in the output with working links.
</task>

<constraints>
- Link only pages that exist in the source; check each path.
- No marketing copy in the summary; say what the project is and who it is for in plain words.
- Do not claim that adding llms.txt improves search rankings or that any given AI tool will use it.
- Do not exclude crawlers or change robots rules unless asked.
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Files written
Paths and config changes.
## Pages included
The sections and page count, plus pages deliberately left out.
## Markdown versions
How the .md pages are produced, and what was lost in conversion (tabs, interactive components).
## Keeping it current
How the build keeps llms.txt in sync, and what to update by hand.
</output_format>
