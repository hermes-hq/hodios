---
schema: 1
id: docs-site-overhaul-track
kind: workflow
title: Docs site overhaul track
description: Overhauls developer docs in gated steps, from inventory and reader journeys to a new structure with redirects, rewritten top pages, tested code samples and a process that keeps docs current.
category: docs
version: 1.0.0
status: incubating
stage: [discover, design, build, verify, maintain]
role: [technical-writer, maintainer, developer-advocate]
stack: []
requires: [none]
inputs: [document, text, notes]
output: [plan, docs, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [docs-overhaul, information-architecture, diataxis, redirects, docs-as-code, content-audit]
pairs_with:
  prompts: [reorganize-docs-by-diataxis, test-code-in-docs, write-documentation-standards, audit-documentation]
  personas: [technical-writer]
args:
  - name: docs_inventory
    description: The current docs - a page list with paths and titles, ideally with last-updated dates and a line on each page's content. A sitemap or nav config is fine.
    type: text
    required: true
  - name: product
    description: What the product is, who uses it, the main tasks people come to the docs for, and the docs tooling.
    type: string
    required: true
  - name: traffic_data
    description: Page views, search terms, support ticket topics or feedback per page, if you have them.
    type: text
steps:
  - {id: inventory, file: steps/01-inventory.md, stage: discover, gate: approve, artifact: "docs-overhaul/01-inventory.md"}
  - {id: structure, file: steps/02-structure.md, stage: design, gate: approve, artifact: "docs-overhaul/02-structure.md"}
  - {id: rewrite, file: steps/03-rewrite.md, stage: build, gate: approve, artifact: "docs-overhaul/03-rewrites.md"}
  - {id: samples, file: steps/04-samples.md, stage: verify, gate: approve, artifact: "docs-overhaul/04-samples.md"}
  - {id: sustain, file: steps/05-sustain.md, stage: maintain, gate: none, artifact: "docs-overhaul/05-sustain.md"}
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
Overhauls developer documentation the way an experienced docs lead would: find out what readers come to do and where they get stuck, restructure around those journeys without breaking links, rewrite the pages that carry the most traffic first, make code samples tested, and set up a process so the docs do not decay again. Each step writes one artifact and stops for approval.

<product>
{{product}}
</product>

<docs_inventory>
{{docs_inventory}}
</docs_inventory>

{{#traffic_data}}
<traffic_data>
{{traffic_data}}
</traffic_data>
{{/traffic_data}}

Rules for every step:
- Use only pages, data and facts given or confirmed. Mark missing facts as [X] and ask for the ones that change decisions (traffic, docs tooling, who maintains docs).
- Never invent traffic numbers, product behaviour or API details; when a rewrite needs a fact, leave a [X] and list it.
- Keep every existing URL working: no page moves, merges or deletions without a redirect.
- Prefer the smallest change that fixes the reader's problem; do not rewrite pages that work.
- End each artifact with open questions and the effort estimate (S, M, L per item).
