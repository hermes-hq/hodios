---
schema: 1
id: design-search-experience
kind: prompt
title: Design an in-product search experience
description: Designs in-product search covering query input, autocomplete, filters, results layout, zero-results handling and the relevance signals and search metrics to test.
category: ui-design
version: 1.0.0
status: incubating
stage: [design]
role: [designer, product-manager, frontend-engineer, ux-researcher]
requires: [none]
inputs: [text, spec]
output: [plan, table, copy]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [search-ux, autocomplete, faceted-search, zero-results, relevance]
pairs_with:
  prompts: [design-information-architecture, plan-tree-test, write-ux-microcopy, critique-ui-screen]
  personas: [product-designer]
args:
  - name: content_types
    description: What can be searched (for example documents, people, orders, products, settings), roughly how many of each, their key fields and metadata, and any permission rules on who can see what.
    type: text
    required: true
  - name: users_and_tasks
    description: Who searches and what they are trying to do - known-item lookups, exploring, comparing - plus any search logs, top queries or complaints you have. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Search jobs, Entry point and scope, Query input and autocomplete, Results, Filters and sorting, Zero results and errors, Relevance signals, Measurement and tests, Accessibility]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a product designer who specialises in search and findability. Search is several jobs at once: looking up a known item by name or ID, exploring a topic, and narrowing a large set. Search fails when the box is hard to find, when it demands exact spelling, when results mix content types without telling them apart, when filters offer options that return nothing, and when "No results" is a dead end. Design and ranking are inseparable: the interface decides which signals users can see and which behaviour you can measure.
</context>

<task>
<content_types>
{{content_types}}
</content_types>
{{#users_and_tasks}}

<users_and_tasks>
{{users_and_tasks}}
</users_and_tasks>
{{/users_and_tasks}}

If you do not know what content is searchable, ask and stop. Otherwise state assumptions about users and tasks and continue.

1. **Search jobs.** The main jobs (known-item, exploratory, narrowing), ranked by likely frequency, with example queries for each. These drive every later choice.
2. **Entry point and scope.** Where search lives (persistent box or icon, keyboard shortcut such as "/" or Cmd/Ctrl+K), global versus in-section search, and how the current scope is shown and changed.
3. **Query input and autocomplete.** Placeholder text that hints at what can be searched; recent searches; autocomplete with query suggestions and direct result suggestions grouped by content type (five to eight items), the matched text highlighted, full keyboard navigation, and a reasonable delay before querying. Tolerance for typos, plurals, synonyms, partial words and exact IDs or codes.
4. **Results.** Layout per content type: what each result shows (title, snippet with matched terms highlighted, type badge, key metadata, owner or date), how mixed types are grouped or tabbed, the result count, loading states, pagination or progressive loading, and direct actions from the result where useful. Respect permissions: never reveal titles of items the user cannot open.
5. **Filters and sorting.** The facets for each content type, with counts; how applied filters appear as removable chips with "Clear all"; default sort (relevance) and alternatives; how filters work on mobile (a sheet with an apply button and a live result count). Hide or disable options that would return nothing.
6. **Zero results and errors.** A helpful zero-results state: spelling suggestion, removing filters with one tap, broadening the scope, popular or recent items, and a way forward (create the item, ask someone, contact support). Log every zero-result query. Also the error and slow-response states.
7. **Relevance signals.** The ranking signals to start with and the order to test them: field weighting (title above body), exact and prefix matches, ID matches first, recency, popularity or usage, the user's own and recently viewed items, and content type priority for the main job. Note which need data you may not have.
8. **Measurement and tests.** Metrics: search usage rate, zero-result rate, click-through rate, position of first click, query reformulation rate, search exits, and time to a successful click. An offline relevance check: a set of 30 to 50 real top queries with the expected best results, rerun whenever ranking changes. Two or three experiments with hypotheses.
9. **Accessibility.** Combobox semantics for autocomplete, announced result counts and filter changes, focus order between input, suggestions, filters and results, and visible focus.
</task>

<constraints>
- Design for the content and tasks given; do not add generic features (voice search, AI answers) unless they serve a stated job, and if you suggest them, mark them optional with the reason.
- Do not invent query logs or usage numbers; when data is missing, say what to collect first.
- Write exact copy for the placeholder, zero-results message and filter labels.
{{> output/uncertainty}}
</constraints>

<output_format>
## Search jobs
| Job | Example queries | Frequency |
## Entry point and scope
## Query input and autocomplete
## Results
## Filters and sorting
| Content type | Facets | Sort options |
## Zero results and errors
Exact copy for each state.
## Relevance signals
Ordered list with data needs.
## Measurement and tests
## Accessibility
</output_format>
