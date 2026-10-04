---
schema: 1
id: design-site-structure-for-search
kind: prompt
title: Design site structure for search
description: Designs a small business site's pages and URLs from its services, products and areas, with one page per search intent, navigation, breadcrumbs, slugs and what to leave out, as a sitemap table.
category: seo
version: 1.0.0
status: incubating
stage: [design, plan]
role: [founder, marketer, designer]
requires: [none]
inputs: [text, notes]
output: [table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [site-architecture, url-structure, navigation, page-planning]
pairs_with:
  prompts: [plan-new-site-search-launch, build-internal-linking-plan, design-information-architecture]
args:
  - name: offerings
    description: Every service, product group or offer, with a note on which ones bring the most money, and any existing pages and URLs if you are rebuilding.
    type: text
    required: true
  - name: audience_and_area
    description: Who the customers are, where they are (one town, several areas, national, international), and the questions they ask before buying. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Principles, Sitemap, Homepage, Navigation and breadcrumbs, Leave out, Redirects, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design page structures for small business sites being planned or rebuilt. The two common errors pull in opposite directions: everything crammed onto one "Services" page so no page matches any specific search, or dozens of near-identical pages for every synonym and town. The right structure gives each distinct customer need its own page, groups pages the way customers think, keeps every important page within about three clicks of the homepage, and uses short, stable URLs that will not need changing.
</context>

<task>
<offerings>
{{offerings}}
</offerings>

{{#audience_and_area}}<audience_and_area>
{{audience_and_area}}
</audience_and_area>{{/audience_and_area}}

1. List the distinct search intents: for each offering, what a customer would search to find it and whether two offerings are really the same need (merge them) or different needs (separate pages). Synonyms and near-variants share one page.
2. Decide the page types needed: homepage, service or product group pages, individual service or product pages where demand and content justify them, location pages only for areas with real local content, about, contact, pricing if the business shares it, FAQ or guide pages for common pre-purchase questions, case studies or reviews.
3. Build the hierarchy at most three levels deep and the URL for each page: lowercase, hyphens, short descriptive words, no dates, no file extensions, no repeated words, place names only on location pages, and a folder only when it groups real children (/services/boiler-repair/).
4. Homepage: what it must say in the first screen (what, for whom, where, how to act) and which pages it links to.
5. Navigation and breadcrumbs: main menu items (seven or fewer), footer links, breadcrumb trail per level, and the contextual links between related pages.
6. Leave out: pages that would be thin or duplicate (tag archives, one page per synonym, empty location pages, separate pages for tiny variations), and what to do with them instead.
7. If rebuilding, map every old URL supplied to its new URL for a 301 redirect; merged pages redirect to the page that absorbed them.
</task>

<constraints>
- Base pages on the offerings and audience given; do not invent services, areas or search volumes. Mark assumed demand as an assumption.
- If the offerings are unclear (a single vague line), ask what is sold and to whom, and stop.
- Keep the structure maintainable by the team implied; flag pages that need ongoing content.
</constraints>

<output_format>
## Principles
Three to five bullets on the choices made for this site.

## Sitemap
Table: Page | URL | Parent | Search intent it answers | In main menu (yes, no) | Priority.

## Homepage
Bullets: first-screen message and links.

## Navigation and breadcrumbs
Main menu, footer, breadcrumb examples, key contextual links.

## Leave out
Table: Page idea | Why not | Instead.

## Redirects
If rebuilding: table Old URL | New URL | Note, covering every existing URL supplied (301 to the closest new page, never all to the homepage). Otherwise "New site, no redirects needed".

## Questions
What to confirm before building.
</output_format>
