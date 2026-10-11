---
schema: 1
id: spec-search-behaviour
kind: prompt
title: Specify in-product search behaviour
description: Specifies in-product search for engineers, covering what is indexed, matching and typo rules, ranking, permission filtering, freshness, empty results and how quality is checked.
category: product
version: 1.0.0
status: incubating
stage: [plan, design]
role: [product-manager, business-analyst, backend-engineer, fullstack-engineer]
stack: []
requires: [none]
inputs: [spec, notes, text]
output: [docs, table, questions]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [search, relevance, permissions, requirements]
pairs_with:
  prompts: [design-search-experience, design-search-index, list-feature-edge-cases]
args:
  - name: feature_description
    description: What people search for (records, documents, products, people), where the search box lives, and what they are usually trying to find.
    type: text
    required: true
  - name: context
    description: Data volume, languages, permission model, existing search technology, and complaints about current search.
    type: text
output_contract:
  format: markdown
  sections: [Scope and index, Matching rules, Ranking, Permissions and freshness, Results and empty states, Quality checks, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
"Add search" is one of the most under-specified tickets in software. Engineers then guess: which fields are searched, whether "invoice 1042" matches "INV-1042", whether a typo still finds the record, whether exact title matches beat a word buried in a comment, and whether results respect permissions. The incidents that follow are predictable: search results that leak titles of records the user cannot open, a record created a minute ago that cannot be found, a customer searching by email or order number and getting nothing because only names were indexed, and results ranked by recency when people wanted the exact match. A good search spec states what is in the index field by field, the matching rules (prefix, typo tolerance, stemming, exact phrases, identifiers, accents and case), a ranking order people can reason about, permission filtering applied before results are counted or shown, an acceptable freshness delay, and a short list of real queries that must return the right result first.
</context>

<task>
<feature>
{{feature_description}}
</feature>
{{#context}}
<context_from_user>
{{context}}
</context_from_user>
{{/context}}

1. Define scope: which object types are searchable, which fields of each are indexed (with weight: high, normal, low or not indexed), which fields must never be indexed (secrets, private notes, personal data that should not surface), and whether archived or deleted items appear.
2. Write matching rules: whole words versus prefix while typing, typo tolerance and its limits (short words and identifiers should not be fuzzy), stemming and synonyms, accents and case, quoted phrases, identifiers and codes (order numbers, emails, SKUs) matched exactly including common formatting variants, and minimum query length.
3. Define ranking as an ordered list: exact identifier match, exact title match, field weights, then tie-breakers such as recency or popularity, and any boosts for the user's own or recently viewed items. Keep it explainable.
4. Specify permissions and freshness: results filtered by the same access rules as the item pages, counts and facets computed after filtering, snippets that never show text the user cannot see, and the maximum delay between a change (create, edit, delete, permission change) and search reflecting it.
5. Specify results and empty states: result layout data (title, type, snippet, highlight), filters or facets if any, pagination limit, what a no-results page offers (spelling suggestion, clear filters, create new), and behaviour on very broad queries.
6. Write quality checks: 10 to 20 realistic queries from the user's domain with the expected top result, plus performance targets (for example time to first results) stated as targets to confirm.
7. List open questions with a recommended default marked as a proposal.
</task>

<constraints>
- Search must never reveal titles, snippets or counts of items the user cannot open; say so explicitly.
- Do not choose a search engine or vendor; describe behaviour. Mention technology only if the user already uses it.
- Do not apply typo tolerance to identifiers, codes or email addresses unless the user asks for it.
- If the searchable objects or who searches are unclear, ask instead of assuming a generic site search.
- Latency and freshness numbers are proposals for the team to confirm, not facts.
</constraints>

<output_format>
## Scope and index
Table: object, field, weight, notes.
## Matching rules
Numbered rules with an example query for each.
## Ranking
Ordered list.
## Permissions and freshness
Bullets.
## Results and empty states
Bullets.
## Quality checks
Table: query, expected top result, why.
## Open questions
Numbered: question, recommended default (proposal).
</output_format>
