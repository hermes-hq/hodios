---
schema: 1
id: migrate-wiki-to-docs-as-code
kind: prompt
title: Migrate a wiki to docs as code
description: Moves pages exported from Confluence, Notion, Google Docs or Word into Markdown in a repository, with triage, a clean structure, converted macros, fixed links and images, owners and redirects.
category: docs
version: 1.0.0
status: incubating
stage: [plan, build, maintain]
role: [technical-writer, maintainer, tech-lead]
stack: []
requires: [repo-read, file-write, shell]
inputs: [document, repo, notes]
output: [docs, plan, report]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [confluence, docs-as-code, content-migration, link-rewriting, wiki-export]
pairs_with:
  prompts: [reorganize-docs-by-diataxis, set-up-docs-site, fix-broken-docs-links]
args:
  - name: source
    description: Where the pages come from.
    type: enum
    enum: [confluence, notion, google-docs-or-word, other]
    required: true
  - name: export_path
    description: The folder in the working directory that holds the export, plus any page analytics or last-edited data.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Inventory and triage, Mapping, Converted, Needs a person]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Wiki migrations fail in two ways: everything gets moved, including years of dead pages, or the export is converted mechanically and the result is unreadable. Exports are messy. Confluence HTML is full of macros (info panels, expand blocks, Jira links, include-page, table of contents), merged-cell tables and attachments with hashed names. Notion Markdown exports add ID suffixes to every file and folder name and export databases as CSV. Word and Google Docs carry manual numbering and inline styles. Internal links point to page IDs that mean nothing in a repo. Only living content should move, so triage pages by last edit, views and owner first. Give each migrated page an owner, and leave the old pages with a pointer to the new location. Wikis also often contain pasted credentials, which must not be committed.
</context>

<task>
Migrate the {{source}} export in `{{export_path}}` into this repository's docs. Work in two passes and stop for confirmation between them.

Pass 1, plan:
1. Inventory every page: title, path in the old hierarchy, last edited date and author if present, size, and inbound links from other pages.
2. Triage each page as migrate, merge into another page, or archive (stale, duplicated or personal notes). Use dates and inbound links as evidence and mark guesses.
3. Propose the new structure and file names (lowercase slugs, no ID suffixes), and a mapping table from old page to new path.
4. Scan for secrets, personal data and internal-only hostnames, and list the pages that contain them.
5. Stop and present the plan for approval.

Pass 2, after approval:
6. Convert pages (with pandoc if available, otherwise by careful transformation). Map macros to the target generator's equivalents (admonitions, details blocks); replace Jira or ticket macros with plain links; flatten or simplify tables that do not survive conversion.
7. Move images and attachments to an assets folder with descriptive names and alt text placeholders, and update references.
8. Rewrite internal links using the mapping table. List links to archived pages and external targets.
9. Add front matter with owner and last-reviewed date if the docs use front matter.
10. Build the docs, fix conversion errors, and write the banner text to put on each old page pointing to the new location.
</task>

<constraints>
- Never commit secrets found in the export; remove them, list the pages and tell the user to rotate the credentials.
- Do not rewrite content beyond conversion clean-up; meaning stays the same.
- Do not access the wiki directly or delete anything there; work only from the export.
- Ask before archiving any page that has inbound links or was edited in the last year.
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Inventory and triage
Table: page, last edited, inbound links, decision, reason.
## Mapping
Table: old page, new path.
## Converted
After pass 2: pages converted, build result, and what was lost in conversion.
## Needs a person
Pages with secrets, unclear owners, broken macros or decisions to confirm, as a checklist.
</output_format>
