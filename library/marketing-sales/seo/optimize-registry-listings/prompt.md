---
schema: 1
id: optimize-registry-listings
kind: prompt
title: Optimize package registry and marketplace listings
description: Audits how an open-source project appears on npm, PyPI, crates.io, Homebrew, winget, Flathub or an editor marketplace and rewrites the metadata so people searching there find and trust it.
category: seo
version: 1.0.0
status: incubating
stage: [ship, maintain]
role: [maintainer, software-engineer, developer-advocate]
requires: [repo-read]
inputs: [config, text, url]
output: [config, report, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [open-source, package-registry, npm, homebrew, marketplace-listing, package-metadata]
pairs_with:
  prompts: [plan-directory-submissions, audit-readme-conversion, sharpen-project-pitch]
args:
  - name: listings
    description: The current manifest metadata (package.json, pyproject.toml, Cargo.toml, formula or cask, winget manifest, extension manifest) and links to the live listing pages.
    type: text
    required: true
  - name: project
    description: What the project does, who searches for it, and the words they use.
    type: text
  - name: registries
    description: Registries to cover.
    type: string
    default: every registry the project is published to or could be
output_contract:
  format: markdown
  sections: [Search terms, Listing audit, Metadata changes, Eligibility for new registries, Measuring]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Many developers find tools inside the registry or package manager they already use, and each one ranks and renders listings from manifest metadata: npm search uses the name, description and keywords; PyPI shows the summary and the long description from the README, with classifiers and project URLs in the sidebar; crates.io uses description, keywords (up to five) and categories from a fixed list; editor marketplaces use the display name, description, categories, keywords (capped) and icon. Package managers that curate have entry bars: Homebrew's acceptance policy sets notability thresholds (higher for a submission by the project's own author) and a minimum repository age, casks must pass macOS security checks, Flathub rejects command-line tools and asks for meaningful history, and classic-confinement snaps need manual review. A listing whose README images break, links point nowhere or description says nothing concrete loses the people who already found it. Registry rules change; current documentation wins over this summary.
</context>

<task>
<listings>
{{listings}}
</listings>
{{#project}}
Project:
{{project}}
{{/project}}
Registries: {{registries}}.

If no manifest or listing is given, ask for it and stop.

1. **Search terms.** List the six to ten words people would type in a registry search for this, from the category noun and the job, and say which ones the current metadata misses.
2. **Audit each listing** in {{registries}}: name and display name, description or summary (concrete, starts with what it is, within the registry's length norms), keywords, topics or categories (only from the registry's allowed set where it has one), README rendering on the registry (relative image paths and links that break off GitHub, badges that fail, missing install command for that registry), license field, repository, homepage, documentation and issue URLs, version and release notes link, icon or logo, deprecation of old package names.
3. **Metadata changes.** Write the corrected fields as diffs or snippets for each manifest. Use absolute URLs for images in READMEs that registries render. Do not stuff keywords; every keyword must describe the project.
4. **Eligibility for new registries.** For registries the project is not in yet, list the requirements from their documentation (age, popularity thresholds, signing, sandboxing, review time) and whether the project meets them, marking anything you could not check as UNVERIFIED.
5. **Measuring.** Name the public download or install statistics for each registry (download APIs, install analytics, release asset counts) and how to record them weekly.
</task>

<constraints>
- Do not invent registry rules, limits or category names; mark them UNVERIFIED if unsure and point to the documentation to check.
- No keyword stuffing, competitor names as keywords, or misleading names that imitate another package.
- Keep the license field exactly as the project's real license.
{{> output/uncertainty}}
</constraints>

<output_format>
## Search terms
## Listing audit
| Registry | Field | Current | Problem | Fix |
## Metadata changes
Snippets or diffs per manifest.
## Eligibility for new registries
| Registry | Requirement | Met? | Source |
## Measuring
</output_format>
