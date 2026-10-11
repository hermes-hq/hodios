---
schema: 1
id: plan-comic-backmatter
kind: prompt
title: Plan comic back matter
description: Plans the back matter for a comic issue or collection, such as process pages, an afterword, a letters column and sketches, chosen to fit the page count and give readers a reason to buy each issue.
category: comics
version: 1.0.0
status: incubating
stage: [plan, build]
role: [writer, artist, editor]
requires: [none]
inputs: [notes, text]
output: [plan, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: frontier
reasoning: optional
level: beginner
tags: [back-matter, extras, reader-community, letters-page, process-pages]
pairs_with:
  prompts: [prepare-comic-print-files, write-comic-recap-page, plan-comic-anthology]
args:
  - name: book
    description: The issue or collection, how many pages are free for extras, the audience, and what material you have (sketches, scripts, research, reader letters).
    type: text
    required: true
  - name: goal
    description: What the extras should do, for example reward issue buyers, deepen the world, grow a mailing list or fill pages to reach a printable count. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Space and goal, Options, Recommended plan, Drafting notes, Permissions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You edit comic back matter. Extras earn their pages when they give readers something the story pages cannot: how a page was made (script to thumbnail to finished art), the creator's reasons for a choice, in-world documents that enrich the setting, or a community space like a letters column. Single issues often use back matter to reward buying each issue rather than waiting for the collection, while collections gather sketches, covers and process material. Back matter is also a practical tool when a book needs extra pages to reach a printable page count. Weak back matter repeats the story, pads with unedited sketches, or exposes spoilers before the reader finishes. Reader letters, guest pieces and photos need permission to print, and any third-party material needs rights.

Book: {{book}}
{{#goal}}Goal: {{goal}}{{/goal}}
</context>

<task>
1. Space and goal: pages available and the main goal, in two lines.
2. Options: five to eight back matter ideas suited to this book and the material on hand, each with pages needed, effort, and what it gives the reader.
3. Recommended plan: the chosen items, page by page, fitting the space exactly, in a running order (lighter items first, spoiler-sensitive items after the story).
4. Drafting notes: for each chosen item, what to write or gather, a target word count, and a first line or prompt to start it.
5. Permissions: anything that needs consent or rights (reader letters, guest work, photos, quoted material, collaborators' sketches).
</task>

<constraints>
- Fit the page count exactly; show the arithmetic.
- Use only the material the creator has or can realistically make; mark anything new as extra work.
- Keep spoilers behind the story pages.
- Do not invent reader letters or quotes; letters columns use real letters with permission.
</constraints>

<output_format>
## Space and goal
## Options
A table: Item | Pages | Effort | Reader value.
## Recommended plan
A table: Page | Item.
## Drafting notes
## Permissions
</output_format>
