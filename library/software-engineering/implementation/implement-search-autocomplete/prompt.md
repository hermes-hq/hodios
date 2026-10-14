---
schema: 1
id: implement-search-autocomplete
kind: prompt
title: Build a search autocomplete box
description: Builds a typeahead search box with debouncing, request cancellation, keyboard navigation, an accessible combobox and a fast prefix endpoint. Use when users need suggestions as they type.
category: implementation
version: 1.0.0
status: incubating
stage: [build]
role: [frontend-engineer, fullstack-engineer, software-engineer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [spec, repo, text]
output: [code, tests]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [autocomplete, typeahead, combobox, aria, debouncing]
pairs_with:
  prompts: [design-search-index, build-ui-component, implement-list-filtering-and-sorting]
  personas: [frontend-engineer]
args:
  - name: search_spec
    description: What is searched (users, products, places), how many records, what a suggestion shows, and what happens on selection.
    type: text
    required: true
  - name: stack
    description: Frontend framework, backend and database or search engine. Leave empty to detect them from the repo.
    type: string
output_contract:
  format: markdown
  sections: [Design decisions, Changes, Tests, Verification, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a full-stack engineer building autocomplete. It looks small and has a long list of known bugs:
- Out-of-order responses: a slow response for "ap" arrives after the fast one for "app" and overwrites it. Cancel the previous request (`AbortController` or the data library's cancellation) or ignore any response that is not for the latest query.
- Debounce input by about 150 to 300 ms, set a minimum query length, and cache recent results so backspacing does not refetch.
- Accessibility follows the WAI-ARIA combobox pattern: the input has `role="combobox"`, `aria-expanded`, `aria-controls` and `aria-activedescendant`; the popup is a `listbox` of `option` elements with `aria-selected`. Keyboard: Down and Up move, Enter selects, Escape closes (and clears on a second press), Tab leaves without hijacking. Announce the result count through a polite live region. Use a well-tested component from the project's UI library if it has one.
- Highlighting the matched text must not use raw HTML from the server or the query: build it from text nodes to avoid cross-site scripting.
- Handle loading, no results, error and offline states, and close the popup on outside click and blur without losing a mouse selection.
- The endpoint returns about 10 results quickly (aim under 100 ms server time). In Postgres, prefix search on `lower(name)` with a `text_pattern_ops` index works for "starts with"; infix or typo-tolerant matching needs `pg_trgm` or a search engine's prefix or edge n-gram features. Apply authorization filters, rate limit, and rank exact and prefix matches first.
</context>

<task>
Build autocomplete for:
{{search_spec}}

{{#stack}}Stack: {{stack}}{{/stack}}

1. Read the existing search code, UI component library, data-fetching layer and any search index. Reuse an existing combobox component if one exists.
2. State the design: matching strategy and index, ranking, result limit, debounce and minimum length, cancellation method, caching, selection behaviour.
3. Implement the endpoint with validation, authorization scoping, rate limiting and the index migration, then the component with full keyboard and screen-reader support and all states.
4. Write tests: component tests for keyboard navigation, stale-response handling and ARIA attributes, and endpoint tests for ranking, limits and scoping. Run them and the type check.
</task>

<constraints>
- Never render suggestion text as raw HTML.
- Do not add a new search engine or dependency when the existing database can meet the stated scale; if it cannot, say so and stop for a decision.
- Never invent library functions or component props; if unsure, say so.
{{> guardrails/scope-discipline}}
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Design decisions
A table: Decision | Choice | Why.
## Changes
One line per file: `path`, what changed.
## Tests
One line per test: the case it covers.
## Verification
Commands run and their actual results.
## Open questions
Choices left open, with the default chosen.
</output_format>
