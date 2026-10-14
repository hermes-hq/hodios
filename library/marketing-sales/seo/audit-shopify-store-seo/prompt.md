---
schema: 1
id: audit-shopify-store-seo
kind: prompt
title: Audit a Shopify store's SEO
description: Audits a Shopify store for platform-specific search issues, such as collection-scoped product URLs, tag and filter pages, app bloat, theme speed, titles, structured data and Markets setup.
category: seo
version: 1.0.0
status: incubating
stage: [review]
role: [marketer, founder, operations-manager]
stack: [shopify]
subject: [ecommerce]
requires: [none]
inputs: [text, url, dataset]
output: [report, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [online-stores, duplicate-urls, theme-audit, collections, store-apps]
pairs_with:
  prompts: [optimize-product-pages-for-search, optimize-category-pages, audit-technical-seo]
args:
  - name: store
    description: The store's theme and version, apps installed, number of products and collections, markets or languages, and how navigation and filters work.
    type: text
    required: true
  - name: evidence
    description: Whatever you have, such as a crawl export, Search Console Pages report statuses, a product page's head HTML and internal links, the robots.txt, speed results and sample titles. Summaries are fine.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Summary, Platform issues, Content and templates, Speed and apps, Fix plan, Not checked]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an e-commerce SEO who has audited many Shopify stores. The platform handles a lot well (sitemaps, canonical tags, HTTPS) but has known patterns that need managing. Products are reachable at both `/products/handle` and `/collections/name/products/handle`; the canonical points to the first, but many themes link to the collection-scoped version, sending internal links and crawl to duplicates. Tag-filtered collection URLs (`/collections/name/tag`) and filter parameters can create large numbers of thin, near-duplicate pages. Variant URLs (`?variant=`) share the product canonical. Vendor and type collection URLs, blog tag pages and search pages add more. The sitemap is generated and cannot be edited directly, and robots.txt is changed through a `robots.txt.liquid` theme template.

Apps are a common source of trouble: each can inject scripts that slow pages, and removed apps often leave code behind. Review apps may or may not output review structured data; themes output their own Product markup, sometimes duplicating an app's. Shopify Markets can create localised subfolders with hreflang, which need checking. You judge by evidence and say what you could not check; platform behaviour changes over time, so you advise confirming current defaults.
</context>

<task>
Audit this Shopify store.

<store>
{{store}}
</store>

<evidence>
{{evidence}}
</evidence>

1. **Summary:** the three to five issues most likely to be costing traffic or sales, in plain words.
2. **Platform issues:** check collection-scoped product links (and the theme Liquid change that links to `/products/` URLs instead), tag and filter URLs (indexing and crawl), variant URLs, vendor and type pages, blog tags, internal search pages, pagination, robots.txt template edits, sitemap coverage, duplicate or conflicting canonicals, redirects for changed handles, and Markets hreflang if used.
3. **Content and templates:** product and collection title and meta templates, H1 usage in the theme, thin or manufacturer-copied descriptions, empty collections, image alt text, and structured data (Product, Offer, AggregateRating, BreadcrumbList): present, duplicated by an app, or mismatched with visible content.
4. **Speed and apps:** apps that add scripts on every page, leftover code from removed apps, oversized images, third-party scripts, and the theme's own weight; tie each to what speed data was supplied.
5. **Fix plan:** a prioritised table with the fix, where it is made (theme code, Shopify admin, app settings, content), effort, and how to verify.
6. **Not checked:** what the evidence did not cover and what to gather.
</task>

<constraints>
- Base findings on the evidence; label others as typical Shopify issues to check, not as facts about this store.
- Do not recommend blocking product or collection pages that earn traffic without checking Search Console data first.
- Warn that theme code edits should be made on a duplicate theme and tested before publishing.
- Do not recommend fake reviews or review markup for reviews that are not shown on the page.
- Platform defaults change; tell the user to confirm current behaviour where it matters.
</constraints>

<output_format>
## Summary
Three to five bullets.

## Platform issues
Findings with evidence.

## Content and templates
Findings with evidence.

## Speed and apps
Findings with evidence.

## Fix plan
A table: Priority | Fix | Where | Effort | Verify.

## Not checked
Bullets.
</output_format>
