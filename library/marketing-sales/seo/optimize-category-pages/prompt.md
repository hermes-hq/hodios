---
schema: 1
id: optimize-category-pages
kind: prompt
title: Optimise e-commerce category pages
description: Optimises e-commerce category pages with titles, headings and intro copy, faceted navigation and pagination rules, internal links and breadcrumb schema, with a per-page action list.
category: seo
version: 1.0.0
status: incubating
stage: [review, build]
role: [marketer, founder, copywriter]
subject: [ecommerce]
requires: [none]
inputs: [text, url, dataset]
output: [table, copy, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [category-pages, faceted-navigation, ecommerce-seo, collection-pages, crawl-budget]
pairs_with:
  prompts: [audit-on-page-seo, write-meta-tags, build-internal-linking-plan, write-schema-markup]
  personas: [seo-strategist]
args:
  - name: category_pages
    description: The category pages to optimise - URLs, current title and H1, intro text, number of products, filters offered and their URL patterns, target keywords, and any Search Console data you have.
    type: text
    required: true
  - name: platform
    description: The e-commerce platform, for example Shopify, WooCommerce, Magento or a custom build. Optional; it changes how filters and duplicate URLs are handled.
    type: string
output_contract:
  format: markdown
  sections: [Summary, Page recommendations, Faceted navigation rules, Pagination and sorting, Internal linking, Structured data, Platform notes, Check after changes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an e-commerce SEO specialist. Category pages usually carry the most valuable commercial searches in a shop ("women's trail running shoes"), yet they are often the weakest pages: a generic H1, no useful text, and filters that generate thousands of crawlable URL combinations which dilute signals and waste crawl. Good category pages target one clear intent, help shoppers choose with a short intro and useful filters, expose only the filter combinations that people actually search for as indexable pages, and link to and from related categories.
</context>

<task>
Optimise these category pages.

<category_pages>
{{category_pages}}
</category_pages>

{{#platform}}Platform: {{platform}}{{/platform}}

1. Summarise the main problems across the pages in three to five bullets.
2. For each page, recommend: the primary keyword and intent, a title tag (about 60 characters or fewer), an H1, and intro copy of 40 to 80 words that helps a shopper choose (range, key differences, who it is for), placed above the products. Optionally suggest a short buying-guide block or FAQ below the products when the category is considered (high price or complex choice).
3. Faceted navigation rules: classify each filter as index (a combination with its own search demand, such as brand or a key type, which gets a static URL, unique title, H1 and intro), crawl but not index, or keep out of the crawl (sort orders, price sliders, multi-select combinations, session parameters). Explain how to implement each with canonical tags, noindex, robots rules or not linking, and warn that robots.txt blocking stops a page being crawled, so a noindex on it will not be seen.
4. Pagination and sorting: each paginated page is crawlable with a self-referencing canonical (not canonicalised to page one), sort parameters are canonicalised to the default, and infinite scroll has paginated links underneath.
5. Internal linking: links from the main navigation and parent categories, links between sibling categories, links from product pages back up, and from relevant guides.
6. Structured data: BreadcrumbList on category pages; explain that Product markup belongs on product pages, not on category listings.
7. Platform notes for the stated platform, for example duplicate product URLs under collection paths on Shopify, tag pages on WooCommerce, or layered navigation on Magento. Mark anything you are unsure of for the platform as "verify".
8. List what to check after the changes go live.
</task>

<constraints>
- Do not invent search volumes; when demand data is missing, label filter-demand judgements as estimates and say how to validate them.
- Intro copy is for shoppers first: no keyword stuffing, no long text blocks pushing products off the first screen.
- Use only product facts from the input; leave slots where the intro needs specifics you do not have.
- If no pages or URLs are given, ask for them and stop.
</constraints>

<output_format>
## Summary
## Page recommendations
Per page: Primary keyword | Title | H1 | Intro copy | Optional guide or FAQ.
## Faceted navigation rules
A table: Filter | Example URL | Treatment (index, crawl not index, keep out of crawl) | How to implement | Reason.
## Pagination and sorting
## Internal linking
## Structured data
## Platform notes
## Check after changes
</output_format>
