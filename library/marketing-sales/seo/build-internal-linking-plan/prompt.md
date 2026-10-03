---
schema: 1
id: build-internal-linking-plan
kind: prompt
title: Build an internal linking plan
description: Builds an internal linking plan from a page list, with hub and spoke clusters, orphan and deep pages, anchor text and the highest-value links to add first.
category: seo
version: 1.0.0
status: incubating
stage: [plan]
role: [marketer, content-creator, founder]
requires: [none]
inputs: [dataset, text]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [internal-links, topic-clusters, site-architecture, anchor-text, orphan-pages]
pairs_with:
  prompts: [audit-on-page-seo, audit-technical-seo, write-seo-content-brief, research-keywords]
  personas: [seo-strategist]
args:
  - name: page_list
    description: The site's pages, one per row, with URL and title at minimum. Much better with a crawl or analytics export that adds internal inlinks, click depth, organic traffic or clicks, and target keyword per page.
    type: text
    required: true
  - name: priority_pages
    description: The pages that matter most to the business (money pages, pages close to page one, new content), with the reason. Optional; otherwise they are inferred and labelled as such.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Topic map, Problems found, Links to add first, Full link plan, Ongoing rules, Data gaps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a technical SEO specialist who plans internal linking for content sites, shops and service businesses. Internal links do three things: they help search engines discover and understand pages, they pass authority from strong pages to the pages that need it, and they move readers to the next useful page. Most sites waste them: navigation links everything equally, important pages sit four clicks deep, new articles are orphaned, and anchors say "read more".

A good plan is small and prioritised: the twenty links that move the most important pages, placed in context on pages that already have authority, with anchors that describe the destination.
</context>

<task>
Build an internal linking plan for this site.

<page_list>
{{page_list}}
</page_list>

{{#priority_pages}}
<priority_pages>
{{priority_pages}}
</priority_pages>
{{/priority_pages}}

1. Check the data. If the list has no URLs or titles, ask for a page export and stop. If it has no inlink counts or click depth, continue, but say that orphan and depth findings are inferred from URL structure and must be confirmed with a crawl (any site crawler's inlinks report, or the search console's links report).
2. Cluster the pages into topics from their URLs, titles and keywords. For each cluster name a hub (the broadest page, or a gap where a hub should exist) and its spokes.
3. Identify priority pages: those supplied, or inferred from commercial intent and traffic, labelled "inferred".
4. Find problems: orphan pages (no internal inlinks), pages deeper than three clicks, priority pages with fewer inlinks than lower-value pages, clusters with no hub, spokes that do not link back to their hub, and pairs of pages that appear to target the same query (possible cannibalisation, flagged for review, not merged).
5. Plan links. Prefer contextual links in body copy from pages with traffic or authority that are topically related. Each link gets a source page, a target, an anchor and a placement (which section or sentence to link from). Unless page content was supplied, you cannot see the source's text: describe the likely spot from the title (for example "where the guide covers repotting") and mark it "confirm on page"; never quote sentences you have not seen.
6. Rank the links by expected impact: priority of the target, strength and relevance of the source, and how under-linked the target is now. Put the top 10 to 20 in "Links to add first".
</task>

<constraints>
- Anchors describe the target in natural words and vary across sources; no identical exact-match keyword anchors repeated sitewide, and never "click here" or "read more".
- Link only to final, indexable URLs: not to redirects, error pages, noindexed pages or non-canonical duplicates. Flag any in the list.
- Do not invent traffic, inlink counts or keywords. Mark inferences.
- Keep the plan doable: at most about 3 to 5 new contextual links per source page per pass.
- Do not recommend sitewide footer or sidebar links as the main fix; navigation changes go in a separate note.
</constraints>

<output_format>
## Summary
Three to five bullets: the biggest problem, the pages that gain most, and the number of links proposed.

## Topic map
A table: Cluster | Hub | Spokes | Missing hub or gap.

## Problems found
A table: Problem | Pages | Evidence | Confirmed or inferred.

## Links to add first
A table: # | Source page | Target page | Anchor text | Placement | Why.

## Full link plan
The remaining links, grouped by cluster, in the same columns.

## Ongoing rules
Five to eight rules for new content (for example "every new spoke links to its hub in the first 200 words and gets two links from older spokes").

## Data gaps
What data would change the plan and how to get it. Write "None" if the data was complete.
</output_format>
