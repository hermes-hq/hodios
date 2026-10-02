---
schema: 1
id: design-information-architecture
kind: prompt
title: Design an information architecture
description: Designs an information architecture with a content inventory, groupings, navigation model, labels and a sitemap, plus a tree test to check it. Use when structuring a website or app.
category: ui-design
version: 1.0.0
status: incubating
stage: [design, plan]
role: [designer, ux-researcher, product-manager, content-creator]
requires: [none]
inputs: [text, document]
output: [diagram, table, plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [information-architecture, navigation, sitemap, tree-testing, labelling]
pairs_with:
  prompts: [plan-card-sort, create-wireframe-spec, adapt-design-for-mobile]
  personas: [product-designer, ux-researcher]
args:
  - name: content
    description: What the site or app contains - a page list, a sitemap export, features or content types - and what is wrong with the current structure if there is one.
    type: text
    required: true
  - name: users_and_tasks
    description: Who uses it and the top tasks they come to do, ideally ranked, plus any research (search logs, analytics, card-sort results). Optional but strongly improves the result.
    type: text
output_contract:
  format: markdown
  sections: [Inputs and assumptions, Content inventory, Organisation, Navigation model, Labels, Sitemap, Validation plan]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most navigation mirrors the organisation chart or the order features were built in, so users must know how the company is structured to find anything. Labels are internal jargon ("Resources", "Solutions", "Hub"), and the same item lives in three places or none. A sound information architecture is built from the content and the users' top tasks, uses one clear organising scheme per level, labels things in the users' words, and is tested before anyone draws screens.
</context>

<task>
Design the information architecture.

<content>
{{content}}
</content>
{{#users_and_tasks}}
<users_and_tasks>
{{users_and_tasks}}
</users_and_tasks>
{{/users_and_tasks}}

1. **Inputs and assumptions.** Summarise the users and their top 5 to 10 tasks. If none were given, infer them from the content, mark them as assumptions, and recommend top-task research (a short survey or search-log review). If the content is too thin to structure (no pages, features or content types), ask up to three questions and stop.
2. **Content inventory.** List every content item or feature with its type, the user tasks it serves and a keep, merge, rewrite or remove recommendation. Flag duplicates, orphans and content that serves no task.
3. **Organisation.** Choose the organising scheme for each level and say why: by task, audience, topic, object or product type, or time. Avoid mixing schemes at the same level, and avoid audience splits ("For business") unless the audiences truly need different content, because users often do not know which group they belong to. Group content into 4 to 8 top-level sections where possible; balance breadth and depth so top tasks are reachable within 2 to 3 levels.
4. **Navigation model.** Specify the global navigation, local or section navigation, utility navigation (account, help, search, language), contextual links between related items, and the footer. Say which pattern fits the product (hierarchical menu, hub and spoke, faceted filters for large catalogues, a dashboard for task-heavy apps) and the role of search. Note how it adapts on small screens.
5. **Labels.** For each navigation label: the label, the content it covers, and why the wording matches users' language (from the research given, or marked as an assumption). Prefer specific nouns or task phrases over clever or generic words. Use the same term for the same thing everywhere.
6. **Sitemap.** Show the full structure as an indented tree with ids (1, 1.1, 1.1.1), marking items that appear in more than one place as cross-links, not duplicates.
7. **Validation plan.** A tree test of 8 to 10 tasks written as scenarios that do not use the labels, each with the correct destination(s), the target success rate and the target directness. Name the participants to recruit and what result would trigger a change. Add a card sort first if the groupings are uncertain.
</task>

<constraints>
- Structure only the content given. Do not invent pages or features; propose a missing page only when a top task has no home, and mark it "(proposed)".
- Every top task must have a clear path; list the path for each.
- Do not design visual layouts or screens; this is structure and labels.
{{> output/uncertainty}}
</constraints>

<output_format>
## Inputs and assumptions
## Content inventory
| Item | Type | Serves task(s) | Recommendation | Note |
## Organisation
## Navigation model
## Labels
| Label | Covers | Why this wording |
## Sitemap
An indented tree in a code block.
## Validation plan
| # | Tree-test scenario | Correct destination | Target success |
Then a "Top-task paths" list: task, then the path.
</output_format>
