---
schema: 1
id: generate-third-party-notices
kind: prompt
title: Generate a third-party notices file
description: Generates a third-party notices file listing every shipped dependency with its licence text and copyright lines, from the lockfile and installed packages, ready to bundle.
category: docs
version: 1.0.0
status: incubating
stage: [ship, maintain]
role: [software-engineer, maintainer, devops-engineer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [repo]
output: [docs, config, report]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [licence-attribution, notice-file, open-source-licenses, release-artifacts]
pairs_with:
  prompts: [audit-dependency-licenses, choose-software-license, write-release-process-doc]
args:
  - name: artifact
    description: What ships and to whom - for example a desktop app installer, a Docker image, a mobile app, a JavaScript bundle served to browsers, or a library published to a registry.
    type: text
    required: true
  - name: notes
    description: Existing tooling or a previous notices file, the output format wanted (text, Markdown, HTML, an in-app screen) and where it must appear.
    type: text
output_contract:
  format: markdown
  sections: [Files written, Coverage, Needs manual attention, How to regenerate]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most permissive licences (MIT, BSD, Apache-2.0, ISC) allow redistribution on one condition: the copyright notice and licence text go with the software. Apache-2.0 also requires carrying the contents of a dependency's NOTICE file. A notices file that lists only package names and licence identifiers does not meet that condition, and neither does one generated from the full dependency tree including dev and build tools, which is padded and still misses things: vendored code copied into the source, fonts, icons, binaries downloaded at build time, and system packages in a container image. The set that matters is what is actually distributed in the artifact. Licence metadata in package manifests is sometimes missing or wrong, so the text should come from the LICENSE file in the installed package. This is attribution work, not legal advice on licence compatibility.
</context>

<task>
Generate a third-party notices file for: {{artifact}}
{{#notes}}Notes: {{notes}}{{/notes}}

1. Identify the ecosystems and lockfiles, and which dependencies end up in the shipped artifact (production dependencies, bundled code, native libraries, container base image packages). Exclude dev-only and build-only tools unless they inject code into the output.
2. Prefer an established generator for the ecosystem if the repo already uses one or one is standard (for example license-checker or the bundler's licence plugin for JavaScript, pip-licenses for Python, cargo-about for Rust, go-licenses for Go). Confirm with the user before installing a new tool.
3. For each shipped package: name, version, licence identifier, copyright lines, full licence text from the installed package's LICENSE file, and the NOTICE contents where present. Deduplicate identical licence texts by grouping packages under a single copy, keeping each package's own copyright lines.
4. Find what generators miss: vendored or copied code, fonts, icons, images, downloaded binaries. Add them by hand with their source.
5. Write the notices file in the requested format, wire the regeneration command into the build or release script if the user wants that, and report coverage.
</task>

<constraints>
- Take licence text from the package's files, not from memory or a generic template; if a package has no licence file, list it under manual attention.
- Do not decide whether a licence is compatible or acceptable; flag copyleft, unknown, custom and missing licences for the owner or legal review.
- Do not edit dependency versions or remove packages.
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Files written
Path of the notices file and any build or script changes.
## Coverage
Counts by licence, packages included, and what was excluded as dev-only with the rule used.
## Needs manual attention
Packages with missing, unknown, custom or copyleft licences, and hand-added items with sources.
## How to regenerate
The exact command and when to run it.
</output_format>
