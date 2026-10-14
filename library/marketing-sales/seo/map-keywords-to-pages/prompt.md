---
schema: 1
id: map-keywords-to-pages
kind: prompt
title: Map keywords to pages
description: Assigns target keywords to a site's existing URLs as a keyword map, and flags pages with no target, keywords with no page, and pages competing for the same intent.
category: seo
version: 1.0.0
status: incubating
stage: [plan]
role: [marketer, content-creator, consultant, founder]
requires: [none]
inputs: [dataset, file, text]
output: [table, plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [keyword-mapping, site-inventory, search-intent, content-gaps]
pairs_with:
  prompts: [research-keywords, resolve-keyword-cannibalization, build-internal-linking-plan, analyze-search-console-data]
  personas: [seo-strategist]
args:
  - name: pages
    description: The site's indexable URLs with title and H1, or a crawl export. Add each page's purpose if titles are unclear, and top queries per page from Search Console if you have them.
    type: text
    required: true
  - name: keywords
    description: The keyword list to map, ideally grouped and with volume estimates. If empty, the map is built from the pages and their Search Console queries only.
    type: text
  - name: business
    description: What the business sells and which pages matter most for revenue. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Method, Keyword map, Overlaps, Pages without a target, Keywords without a page, Actions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an SEO consultant building the keyword map that a site's content and linking decisions hang on. A good map gives each indexable page one primary intent (a primary keyword plus the close variants that share the same results page) and gives each intent one page. The mapping unit is intent, not exact phrase: "crm for small business" and "small business crm software" belong to the same page; "what is a crm" does not. A practical test experts use is whether two keywords show largely the same top results; if they do, one page should serve both.

The map exposes three problems at once: pages with no clear target (often thin tag, archive or legacy pages), intents with no page (content gaps), and several pages aimed at one intent (cannibalisation risk). Search Console query data, when supplied, shows what a page actually ranks for, which often differs from what it was written for.
</context>

<task>
Build a keyword map for this site.

<pages>
{{pages}}
</pages>

{{#keywords}}<keywords>
{{keywords}}
</keywords>{{/keywords}}

{{#business}}<business>
{{business}}
</business>{{/business}}

1. **Method:** say how you grouped keywords into intents and which grouping calls were judgement rather than evidence (for example where SERP overlap was not checked). List the groupings worth confirming against live results.
2. **Keyword map:** for each page, the primary intent and keyword, secondary variants, the intent type, and a fit rating (good, partial, poor) between the page as it is and the target. Use Search Console queries where given to show what it ranks for now.
3. **Overlaps:** groups of pages that target or rank for the same intent, with a suggested owner page for each intent. Do not decide merges here in detail; flag them for a cannibalisation review.
4. **Pages without a target:** pages with no meaningful search intent. Say whether that is fine (contact, legal, login), or whether the page should be given a target, merged, or kept out of the index.
5. **Keywords without a page:** intents no page serves, with the page type needed and whether an existing page could be expanded instead.
6. **Actions:** a short ordered list: retitle or re-angle pages with poor fit, create pages for valuable gaps, send overlaps to review, and update internal links so anchors point to the owner page.
</task>

<constraints>
- One primary intent per page and one page per intent. If a page genuinely serves two intents, say so and explain why it is an exception.
- Do not invent search volumes or rankings; mark volumes as estimates when supplied and leave blank when not.
- Do not recommend deleting or redirecting pages from the map alone; overlaps need traffic, links and conversion data first.
- Keep homepage and core service pages on broad commercial terms; do not map informational queries to them.
</constraints>

<output_format>
## Method
Bullets.

## Keyword map
A table: URL | Primary keyword | Variants | Intent | Fit | Notes.

## Overlaps
A table: Intent | Competing URLs | Suggested owner | Why.

## Pages without a target
A table: URL | Recommendation.

## Keywords without a page
A table: Keyword group | Intent | Page type | New or expand existing.

## Actions
A numbered list.
</output_format>
