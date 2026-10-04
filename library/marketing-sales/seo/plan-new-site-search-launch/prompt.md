---
schema: 1
id: plan-new-site-search-launch
kind: prompt
title: Plan search for a new site launch
description: Plans the first 90 days of search work for a brand new small business site, covering indexing setup, pages by intent, local profile, first real links and what results to expect when.
category: seo
version: 1.0.0
status: incubating
stage: [plan, ship]
role: [founder, marketer]
requires: [none]
inputs: [text, notes]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [site-launch, new-website, indexing, expectations]
pairs_with:
  prompts: [design-site-structure-for-search, plan-local-seo, write-meta-tags]
args:
  - name: business
    description: What the business sells, to whom and where, how customers buy or book, whether it serves a local area or ships widely, competitors you know of, and your budget and hours for marketing.
    type: text
    required: true
  - name: site_pages
    description: The pages planned or built, the platform, the domain (new or with history) and the launch date. Optional.
    type: text
output_contract:
  format: markdown
  sections: [What to expect, Before launch, Page set, 90-day plan, Do not spend on, Measures]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan the first three months of search for new shops, freelancers and service businesses. New owners make three costly mistakes: they launch with a leftover "noindex" or blocked site and wonder why nothing shows; they expect rankings in weeks and then buy link packages or an expensive retainer in a panic; and they publish lots of thin pages instead of a few strong ones matched to what customers search. A new site usually shows for its own name within days to a few weeks, picks up long-tail searches over the first months, and competes for busy terms only after many months of good pages and genuine mentions.
</context>

<task>
<business>
{{business}}
</business>

{{#site_pages}}<site_pages>
{{site_pages}}
</site_pages>{{/site_pages}}

1. What to expect: a realistic timeline for this business (brand searches, long-tail, local map results if local, competitive terms), as ranges and labelled as typical, not promised.
2. Before launch checklist: no noindex or password left on, robots.txt not blocking the site, XML sitemap, one preferred domain version with redirects, https, unique titles and descriptions, mobile check, analytics with the key conversion (call, form, booking, purchase) set up, verification in the main search engines' webmaster tools, sitemap submitted. If the domain has history or replaces an old site, add redirects from old URLs.
3. Page set by search intent: the few pages this business needs first (homepage, one page per main service or product group, location page if local, about, contact, FAQ answering real questions), each with the search it should answer. Fewer, stronger pages.
4. Local profile if customers are local: the map listing (claim, category, hours, photos, first reviews from real customers).
5. First links and mentions from real relationships: suppliers, partners, trade bodies, local groups, clients' credit pages, launch news to local press or niche communities.
6. A 90-day plan by fortnight: tasks, owner, time needed, within the stated budget and hours.
7. What not to spend on yet, and the signals that would justify paid help later.
8. Measures: impressions and indexed pages first, then clicks, then enquiries and sales, with when to look at each.
</task>

<constraints>
- Do not promise rankings or traffic; timeframes are typical ranges and depend on competition.
- Do not invent competitors, search volumes or budget figures. Ask for the business, offer and location if missing, and stop.
- No link buying, link exchanges, fake reviews or doorway pages.
- Keep the plan within the hours and budget given; if none given, assume a few hours a week and say so.
</constraints>

<output_format>
## What to expect
Table: Milestone | Typical timing | What it looks like.

## Before launch
Checklist.

## Page set
Table: Page | URL | Search it answers | Priority.

## 90-day plan
Table: Weeks | Task | Owner | Time.

## Do not spend on
Bullets with reasons.

## Measures
Table: Measure | Where to see it | When to start judging it.
</output_format>
