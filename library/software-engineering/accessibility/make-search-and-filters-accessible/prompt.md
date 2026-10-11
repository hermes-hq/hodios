---
schema: 1
id: make-search-and-filters-accessible
kind: prompt
title: Make search results and faceted filters accessible
description: Makes a search page with faceted filters accessible, with labelled filter groups, announced result counts, keyboard-friendly applied-filter chips and focus that survives result updates.
category: accessibility
version: 1.0.0
status: incubating
stage: [build]
role: [frontend-engineer, fullstack-engineer]
stack: [javascript]
requires: [repo-read, file-write]
inputs: [file, repo, text]
output: [code, tests]
risk: edits-files
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [search-ui, filters, result-count, focus-management, ecommerce-ui]
pairs_with:
  personas: [accessibility-specialist]
  prompts: [add-live-region-announcements, manage-focus-after-ui-updates, fix-form-accessibility, make-infinite-scroll-accessible]
args:
  - name: search_ui
    description: The search box, filter panel, applied-filter chips, sort control and results list code or file paths, and whether filters apply instantly or on a button press.
    type: text
    required: true
  - name: framework
    description: The UI framework.
    type: string
    default: react
output_contract:
  format: markdown
  sections: [Problems found, Search box and results, Filters, Applied filters and sort, Tests and manual check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Search and filter pages combine every hard pattern: a form, live results, dynamic counts and controls that disappear. The usual failures: a search input with only a magnifier icon and placeholder; results that change silently after a filter is ticked; the filter checkbox re-rendering and losing focus because its key changed; filter groups that are a heading plus loose checkboxes with no `fieldset` and `legend`, so "Blue" is announced without "Colour"; counts like "(24)" read without context; applied-filter chips with an "x" named "Remove" or nothing; and a mobile filter drawer that is not a dialog. Whether filters apply instantly or on "Apply" changes the design: instant filtering must keep focus on the control the user changed and announce the new count politely after a short pause; WCAG 3.2.2 is respected as long as the change does not move focus or context unexpectedly. The search form itself should be a `search` landmark (the `search` element or `role="search"`).
</context>

<task>
Make this {{framework}} search and filter UI accessible.

<search_ui>
{{search_ui}}
</search_ui>

1. Read the code and list the problems against the failures in the context; mark anything inferred.
2. Search box and results: a `search` landmark, a label for the input, a named submit button, a heading for the results with the count ("Results, 24 products"), each result with a heading or link that makes sense on its own, and a clear no-results message with suggestions.
3. Filters: group each facet in `fieldset` and `legend` (or a group role with a name), expose counts as part of the label in a readable form, use native checkboxes and radios, make collapsible groups real disclosure buttons with `aria-expanded`, and make a mobile filter drawer a modal dialog with focus moved in and returned on close.
4. Updates: keep stable keys so the changed control keeps focus; announce the new result count politely after updates settle; when results empty, say so. If filters apply on a button, announce the count after applying and leave focus on the button or move it to the results heading, and say which.
5. Applied filters and sort: chips named "Remove filter: Colour Blue"; after removing a chip, move focus to the next chip, or to the filters heading if none remain; "Clear all" announced; sort as a labelled native `select` or a properly named control, with the current sort announced.
6. Pagination or load more: point to make-infinite-scroll-accessible if the list loads continuously; otherwise a `nav` with a name and `aria-current` on the current page.
7. Write tests for the names, the count announcement and focus after filtering and chip removal. Run them and report results.
</task>

<constraints>
- Do not move focus to the results every time a checkbox changes.
- Do not announce the count on every keystroke in the search box.
- Reuse existing form, chip and dialog components; fix them at the source if they are the problem.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Problems found
Numbered, with WCAG criterion.

## Search box and results
Diffs.

## Filters
Diffs.

## Applied filters and sort
Diffs and the focus rule for chip removal.

## Tests and manual check
Test code, command result, short manual check.
</output_format>
