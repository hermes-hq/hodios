---
schema: 1
id: set-up-api-docs-generation
kind: prompt
title: Set up generated API reference docs
description: Sets up API reference generated from doc comments with TypeDoc, Sphinx autodoc, rustdoc, Javadoc or similar, limited to the public surface, checked in CI and published per release version.
category: docs
version: 1.0.0
status: incubating
stage: [build, ship, maintain]
role: [maintainer, software-engineer, technical-writer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [repo]
output: [config, docs, report]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [api-reference, typedoc, sphinx-autodoc, rustdoc, javadoc, doc-comments]
pairs_with:
  prompts: [document-public-api, set-up-docs-site]
  rules: [code-comment-rules]
args:
  - name: notes
    description: Where the reference should live (its own site, a section of an existing docs site) and which versions must stay published.
    type: text
output_contract:
  format: markdown
  sections: [Tool and config, Build result, Undocumented public items, Publishing]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Generated reference is only as good as two things: the doc comments, and the configuration that decides what counts as public. Badly set up generators publish every internal helper, link to private types, and give users something they cannot rely on. Version matters too. Docs built from main describe features users on the last release do not have, so publish per release tag and keep the old versions. Before building anything, check what the ecosystem already does for free. docs.rs builds rustdoc for every published crate, pkg.go.dev renders Go docs, javadoc.io serves Javadoc for Maven Central artifacts, and Read the Docs builds Sphinx or MkDocs projects. In those cases the job is configuration and comment quality, not a new pipeline.
</context>

<task>
Set up generated API reference for this repository.
{{#notes}}
Notes: {{notes}}
{{/notes}}

1. Identify the language, build tool and package registry, and any existing doc generator config or docs site.
2. Decide the route: rely on the ecosystem's hosted docs where they exist (and configure them, for example docs.rs metadata or a Read the Docs config), or set up a generator that fits the language and the existing docs site (TypeDoc, Sphinx autodoc or mkdocstrings, rustdoc, Javadoc or Dokka, DocFX, Doxygen).
3. Restrict the output to the public surface: entry points or exports, `__all__`, `pub` items, `@internal` or `@hidden` tags, excluded packages. Turn on cross-links to the language's standard library where supported.
4. Build it, then fix configuration warnings (unresolved links, duplicate symbols). Count public items with no doc comment and list the worst modules; do not write the missing comments unless asked.
5. Add CI: build the reference on pull requests (fail on broken links; report missing docs as a warning first if there are many), and publish on release tags to a versioned path, keeping earlier versions.
6. Link the reference from the README and the docs site navigation.
</task>

<constraints>
- Do not change public code to make docs build; report the problem instead.
- Pin the generator version you ran.
- Do not set up publishing credentials; list them as owner steps.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Tool and config
The route chosen and why, and the files added or changed.
## Build result
The command and its real result, with remaining warnings.
## Undocumented public items
Count and the modules with the most missing docs.
## Publishing
How each release publishes, where old versions live, and owner steps.
</output_format>
