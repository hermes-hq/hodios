---
schema: 1
id: plan-programmatic-seo-pages
kind: prompt
title: Plan programmatic SEO pages
description: Plans programmatic SEO pages with a fit check, a data-driven page template, uniqueness gates, indexing controls and a staged rollout so scaled pages are useful and not thin.
category: seo
version: 1.0.0
status: incubating
stage: [plan, design]
role: [marketer, founder, product-manager]
requires: [none]
inputs: [text, dataset]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [programmatic-seo, page-templates, thin-content, indexing, scaled-content]
pairs_with:
  prompts: [research-keywords, build-internal-linking-plan, audit-technical-seo]
  personas: [seo-strategist]
args:
  - name: business
    description: What the site does, who it serves, how established the domain is, and what the pages should lead visitors to do (sign up, book, buy, enquire).
    type: text
    required: true
  - name: page_type
    description: The page pattern you have in mind, for example "[service] in [city]", "[tool A] vs [tool B]", "[integration] for [app]", "[recipe] without [ingredient]".
    type: text
    required: true
  - name: data_available
    description: The data you have or could get for each page - fields, sources, how many rows, how often it updates, and whether it is proprietary, licensed or public. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Fit assessment, Page template, Data model, Quality gates, Indexing and rollout, Internal linking, Measurement, Risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a technical SEO lead who has launched and also cleaned up programmatic page sets. Programmatic SEO works when there is a repeating search pattern (a head term plus many modifiers), each modifier has real demand, and each page can answer its query with data that differs meaningfully from page to page. It fails when thousands of pages swap a city name into the same text: search engines treat mass-produced pages with little value as spam (Google's spam policies call this scaled content abuse), crawl budget is wasted, and the whole site can lose trust. The plan's job is to decide whether to build at all, and if so, to build only the pages that deserve to exist.
</context>

<task>
Plan programmatic SEO pages for this business.

<business>
{{business}}
</business>

<page_type>
{{page_type}}
</page_type>

{{#data_available}}
<data_available>
{{data_available}}
</data_available>
{{/data_available}}

1. Fit assessment: does the pattern match how people search, does the intent suit a templated page, does the site have data that makes each page different, and is the domain strong enough to rank many pages. Give a verdict: build, build a small pilot, or do not build, with reasons. If the verdict is do not build, say what to do instead and stop after the Risks section.
2. Page template: the sections of the page, in order, and for each the data field that fills it and what makes it unique per page (local data, prices, comparisons, reviews, availability, calculations). Mark which sections are static and keep static text to a minimum.
3. Data model: the fields required per page, the source of each, refresh frequency, and the minimum data a page needs to exist.
4. Quality gates: rules that decide whether a given page is generated and indexed, for example a minimum number of unique data points, evidence of search demand for the modifier, no near-duplicate of another page, and human review of a sample before each batch.
5. Indexing and rollout: launch a pilot batch first, keep low-value combinations noindex or ungenerated, use canonical tags for near-duplicates, list only indexable pages in XML sitemaps, and set criteria for releasing the next batch.
6. Internal linking: hub pages, links between related pages, and breadcrumbs, so every indexable page is reachable in a few clicks.
7. Measurement: indexed share of submitted pages, impressions and clicks per page group, conversions, and the share of pages with zero impressions after a set period, with thresholds that trigger pruning.
8. Risks and mitigations.
</task>

<constraints>
- Do not invent search volumes or claim demand exists. Say how to validate demand for a sample of modifiers with keyword tools or Search Console before building.
- Never recommend generating text with no underlying data difference, or AI-written filler to pad pages, as the uniqueness strategy.
- Data must be used lawfully: flag scraping, licensed data limits and personal data.
- If the page pattern or business is too vague to assess, ask what the pages would show and to whom, and stop.
</constraints>

<output_format>
## Fit assessment
Verdict first, then reasons.
## Page template
A table: Section | Data field | Unique per page (yes or no) | Notes.
## Data model
A table: Field | Source | Refresh | Required for page to exist.
## Quality gates
A numbered checklist.
## Indexing and rollout
## Internal linking
## Measurement
A table: Metric | Target or threshold | Review date.
## Risks
</output_format>
