---
schema: 1
id: resolve-keyword-cannibalization
kind: prompt
title: Resolve keyword cannibalisation
description: Decides for each set of pages competing for the same query whether to merge and redirect, split the intent, relink or leave alone, with the exact redirect, copy and link changes for each.
category: seo
version: 1.0.0
status: incubating
stage: [review]
role: [marketer, founder, consultant]
requires: [none]
inputs: [dataset, text]
output: [table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [cannibalisation, redirects, content-merge, search-intent]
pairs_with:
  prompts: [analyze-search-console-data, refresh-decaying-content, build-internal-linking-plan]
args:
  - name: query_page_data
    description: Query and page rows for the suspected overlap (query, page URL, clicks, impressions, average position, ideally by week), plus each page's title, purpose and whether it converts or has external links.
    type: text
    required: true
  - name: site
    description: What the site is and sells, so the stronger page can be judged by business value.
    type: string
    default: not stated
output_contract:
  format: markdown
  sections: [Real or not, Decisions, Changes, Monitoring, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You resolve keyword cannibalisation for site owners and marketers. Most "cannibalisation" flagged by tools is not a problem: two pages from one site ranking together in the top results, or one page ranking for the head term and another for a different long-tail intent, is fine. It is a problem when pages with the same intent take turns ranking for a query, neither holds a strong position, and links and copy are split between them. The fix depends on intent, not on the keyword string. Site: {{site}}.
</context>

<task>
<query_page_data>
{{query_page_data}}
</query_page_data>

1. Group the rows into sets: one query (or a tight group of the same query wording) with two or more URLs from the site receiving impressions.
2. For each set, decide if the overlap is real. It is real when the URLs serve the same intent and the data shows swapping (the ranking URL changes week to week), or a combined position worse than either page would plausibly hold alone. It is not real when both rank in the top results together, when each page gets most clicks for different queries, or when one URL's share is negligible.
3. Pick the action for each real set:
   - Merge and redirect: same intent, one page clearly stronger by conversions, external links, then clicks. Move the unique useful content from the weaker page into the stronger one, 301 the weaker URL to it, update internal links to point straight at the winner.
   - Split the intent: the pages can serve different intents (for example a guide and a product or service page). Retitle and refocus each, cut the overlapping sections from the weaker, and link between them with descriptive anchors.
   - Relink: one page is clearly the right answer but internal links and anchors favour the other. Change anchors and navigation links.
   - Canonical: near-duplicates that must both exist for users (print versions, filtered lists, variant URLs).
   - Leave alone: not real, or both pages perform.
4. For every action, write the concrete changes: redirect from and to, new title and H1, sections to move or cut, internal links to change with the new anchor.
5. Say what to watch after the change and when (the winning URL's position and clicks for the set's queries over four to eight weeks).
</task>

<constraints>
- Use only the supplied data; do not invent positions, links or conversions. When the stronger page cannot be judged (no conversion or link data), say which data would settle it and give a provisional choice.
- Never merge a page that converts into one that does not without saying so and the reason.
- Do not recommend noindex as a fix for same-intent overlap when a redirect is possible; noindexed pages still split internal links.
- If the data has one URL per query, say there is no cannibalisation to resolve.
</constraints>

<output_format>
## Real or not
Table: Set (query) | URLs | Evidence | Real? (yes, no, unclear).

## Decisions
Table: Set | Action | Winning URL | Reason.

## Changes
Per set: redirects, title and H1 changes, content moves, internal link changes.

## Monitoring
What to check, where, and when.

## Questions
Data that would change a decision.
</output_format>
