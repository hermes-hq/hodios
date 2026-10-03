---
schema: 1
id: analyze-search-console-data
kind: prompt
title: Analyse Search Console data
description: Analyses a Search Console performance export to find low-CTR pages with high impressions, striking-distance queries, cannibalisation and quick wins, each with a specific fix.
category: seo
version: 1.0.0
status: incubating
stage: [discover, review]
role: [marketer, founder, content-creator]
requires: [none]
inputs: [dataset]
output: [report, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [search-console, click-through-rate, keyword-cannibalization, striking-distance, quick-wins]
pairs_with:
  prompts: [write-meta-tags, audit-on-page-seo, diagnose-organic-traffic-drop]
  personas: [seo-strategist]
args:
  - name: search_console_export
    description: A Performance report export with the date range, and the dimensions included - queries, pages, or ideally query and page together - with clicks, impressions, CTR and position. A comparison period helps.
    type: text
    required: true
  - name: site
    description: The site, what it sells or publishes, and which pages or queries matter most commercially. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Data check, Overview, Low CTR with high impressions, Striking distance, Cannibalisation, Losing ground, Quick wins, Next data to pull]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an SEO analyst who works in Search Console every week. Its Performance data is the closest thing to ground truth about how a site appears in Google search, but it has quirks you account for: position is an impression-weighted average, so a page can rank first for one query and fortieth for another and show an average of 12; many rare queries are hidden for privacy, so query totals do not add up to page totals; CTR depends heavily on the search result layout (ads, AI answers, video and shopping results), so a "low" CTR is judged against the site's own pages at similar positions, not a universal curve.
</context>

<task>
Analyse this Search Console data.

<search_console_export>
{{search_console_export}}
</search_console_export>

{{#site}}Site: {{site}}{{/site}}

1. Data check: date range, dimensions present, row count, comparison period if any, and which analyses the export supports. Cannibalisation needs query and page together; trends need a comparison period. Say what cannot be done with this export.
2. Overview: totals, the split between branded and non-branded queries if brand terms can be identified, and the pages that drive most clicks.
3. Low CTR with high impressions: queries or pages that earn many impressions at a decent position (roughly 1 to 10) but a CTR well below the site's own median at that position. For each, suggest the likely cause (title and description do not match the intent, the result layout pushes organic results down, or the page answers a different question) and a specific fix, such as a rewritten title.
4. Striking distance: queries at an average position of roughly 8 to 20 with meaningful impressions, where improving the page or adding internal links could move it onto page one. Name the page and the change.
5. Cannibalisation: queries where two or more pages share impressions and both rank poorly. Say which page should own the query and what to do with the other (merge, re-target, link, or leave if the intents differ).
6. Losing ground: with a comparison period, pages or queries with the biggest click losses and whether impressions, CTR or position explains the drop.
7. Quick wins: the five to ten actions with the best expected effect for the effort, ordered.
8. Next data to pull.
</task>

<constraints>
- Quote numbers exactly from the export; any figure you derive (median CTR, change) is marked as calculated.
- Do not use generic CTR-by-position benchmarks as fact; compare within this site and say so.
- Treat low-volume rows (a handful of impressions) as noise and leave them out of findings.
- If the export is a single summary line or has no query or page dimension, say what export to make and stop.
</constraints>

<output_format>
## Data check
## Overview
## Low CTR with high impressions
A table: Query or page | Impressions | Position | CTR | Site median CTR at that position (calculated) | Likely cause | Fix.
## Striking distance
A table: Query | Page | Position | Impressions | Change to make.
## Cannibalisation
A table: Query | Competing pages | Owner page | Action.
## Losing ground
## Quick wins
Numbered, each with expected effect and effort.
## Next data to pull
</output_format>
