---
schema: 1
id: reorganize-docs-by-diataxis
kind: prompt
title: Reorganise docs by Diátaxis
description: Sorts every page of a docs tree into tutorial, how-to, reference or explanation, finds pages that mix modes, and proposes a new navigation with splits, merges and redirects.
category: docs
version: 1.0.0
status: incubating
stage: [plan, maintain]
role: [technical-writer, maintainer, developer-advocate]
stack: []
requires: [none]
inputs: [document, text]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [diataxis, information-architecture, navigation, redirects, content-types]
pairs_with:
  prompts: [audit-documentation, docs-site-overhaul-track]
  personas: [technical-writer]
args:
  - name: docs_tree
    description: The current docs tree - page paths and titles, ideally with each page's headings or first paragraph. A sitemap, a nav config or a folder listing with notes is fine.
    type: text
    required: true
  - name: audience
    description: Who reads the docs and what they mostly come to do, for example "backend developers integrating our payments API".
    type: string
    default: developers using the product
output_contract:
  format: markdown
  sections: [Page classification, Mixed-mode pages, Proposed navigation, Change list, Gaps and questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Docs grow by accretion: a quickstart picks up reference tables, a reference page grows a long "why we built it this way" section, and the navigation mirrors the org chart instead of what readers need. Diátaxis gives four modes with different jobs: tutorials (learning by doing, for newcomers, guaranteed to succeed), how-to guides (a competent user reaching a real goal), reference (accurate, complete, consulted not read), and explanation (understanding, context, trade-offs). This is a structural reorganisation for {{audience}}, not an accuracy audit. Common failures: forcing a page into one mode by its title rather than its content, splitting everything into tiny fragments, renaming the navigation without fixing mixed pages, and breaking inbound links.
</context>

<task>
<docs_tree>
{{docs_tree}}
</docs_tree>

1. Classify each page by what its content does, not its title: tutorial, how-to, reference, explanation, or "other" (landing page, changelog, legal). Note your confidence (high, medium, low) and why; low confidence means you saw only a title.
2. Flag mixed-mode pages. Typical signs: a tutorial that stops to list every option; a how-to that explains history; reference prose with steps buried inside; an explanation that ends in a procedure. For each, say which part belongs in which mode.
3. Decide per page: keep, split (name the new pages), merge (into what), move, rename, or retire. Prefer the smallest change that removes the mixing; do not split a page whose secondary mode is under about 15% of it.
4. Propose a navigation: the four modes as top-level sections, or modes within product areas when there are several distinct products or personas. Keep it to at most two levels where possible, and order tutorials as a path and how-tos by user goal.
5. List redirects for every moved, renamed, merged or retired page (old path to new path). Nothing should 404.
6. Note gaps: modes with no pages (for example no tutorial at all), how-tos the audience clearly needs, and reference that is missing for things the how-tos use.
</task>

<constraints>
- Work only from the pages given. If the tree has only titles, classify with low confidence and ask for headings or first paragraphs of the low-confidence pages rather than guessing.
- Do not rewrite page content; describe what moves where.
- Keep existing URLs where the page stays in place; never propose a change without its redirect.
- Do not invent pages, features or traffic numbers. Mark proposed new pages as "new".
- If there are more than about 80 pages, classify all of them in the table but give the change list for the top-level sections first and say what to do next.
</constraints>

<output_format>
## Page classification
Table: path, current title, mode, confidence, one-line reason.
## Mixed-mode pages
For each: path, the modes it mixes, which sections go where.
## Proposed navigation
An indented tree with page titles and paths, new pages marked "new".
## Change list
Table: page, action (keep, split, merge, move, rename, retire), target, redirect from, redirect to, effort (S, M, L).
## Gaps and questions
Bullets: missing content by mode, then questions for the maintainers.
</output_format>
