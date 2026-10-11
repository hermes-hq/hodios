---
schema: 1
id: write-search-log
kind: prompt
title: Write up the searches you ran for a review
description: Turns rough notes of searches already run into a reproducible search log for a thesis or review appendix, with databases, platforms, dates, full strings, limits, results and changes.
category: literature-review
version: 1.0.0
status: incubating
stage: [build, ship]
role: [researcher, student]
requires: [none]
inputs: [notes]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [search-strategy, prisma-s, reproducibility, thesis]
pairs_with:
  prompts: [build-search-string, deduplicate-search-results, write-prisma-flow-report]
  personas: [research-librarian]
args:
  - name: searches
    description: Your notes on the searches as they were run - databases, platform, date, the strings, limits, number of results, and anything you changed. Paste search histories exported from the databases if you have them.
    type: text
    required: true
  - name: review_type
    description: The kind of work, for example "systematic review", "scoping review", "PhD literature review chapter".
    type: string
    default: systematic review
  - name: other_methods
    description: Other ways you found sources - citation chasing, hand searching, contacting authors, websites, registries - with dates and counts.
    type: text
output_contract:
  format: markdown
  sections: [Search summary, Database searches, Full search strings, Other methods, Changes and deviations, Missing details]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Examiners and journal reviewers increasingly expect the search behind a review to be reproducible, and PRISMA-S sets out what to report: each database by name and the platform or interface used, the dates of coverage and the date each search was run, the full search strategy for every database exactly as run, limits and filters, other methods (registers, websites, citation searching, contacting authors), whether the strategy was peer reviewed or adapted from an earlier one, updates, the number of records from each source, and the deduplication method. Most students and many researchers reconstruct this from memory at the end, and the gaps show: a string that does not match the result count, "PubMed" without a date, limits applied but not reported. A search log written from the actual histories, with gaps flagged rather than filled, fixes this.
</context>

<task>
Write a search log for this {{review_type}} from my notes.
<searches>
{{searches}}
</searches>
{{#other_methods}}
<other_methods>
{{other_methods}}
</other_methods>
{{/other_methods}}

1. Identify each distinct search: database, platform or interface, date run, coverage dates, string, limits and filters, and results.
2. Write a short summary paragraph for the methods section: which sources were searched, when, and how, in past tense.
3. Build the database search table.
4. Reproduce each full search string exactly as given, one block per database, keeping line numbers for line-by-line histories.
5. Record other methods with dates and counts.
6. Record changes and deviations: strings revised after testing, searches rerun, limits added, updates. Say where these must be reported as deviations from a protocol.
7. List every missing or inconsistent detail (no date, no platform, a count that does not match the history, a limit mentioned but not in the string) as a question to resolve, and note which PRISMA-S items are not yet covered.
</task>

<constraints>
- Copy strings and counts exactly. Never correct, reformat or complete a search string, even if it has an obvious error; flag the error instead.
- Never fill in a missing date, platform, coverage range or count. Write [missing] and list it.
- Keep the methods paragraph strictly descriptive of what was done; no claims of comprehensiveness.
- Distinguish the database (for example MEDLINE) from the platform (for example Ovid or PubMed); if the notes do not say, flag it.
- If the notes describe searches that were not actually run (only planned), say this log is for executed searches and point to building the strategy first.
</constraints>

<output_format>
## Search summary
One paragraph for the methods section.
## Database searches
Table: database | platform | coverage | date searched | limits and filters | results.
## Full search strings
One code block per database.
## Other methods
Table: method | details | date | records.
## Changes and deviations
Bullets.
## Missing details
Numbered questions, then uncovered PRISMA-S items.
</output_format>
