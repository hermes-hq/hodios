---
schema: 1
id: decide-discontinued-product-pages
kind: prompt
title: Decide on discontinued product pages
description: Decides per product what to do with out-of-stock, seasonal and discontinued product pages (keep, add alternatives, redirect or remove) from traffic, links and return dates, with the page changes.
category: seo
version: 1.0.0
status: incubating
stage: [maintain]
role: [founder, marketer, operations-manager]
subject: [ecommerce, retail]
requires: [none]
inputs: [dataset, text]
output: [table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [out-of-stock, discontinued-products, redirects, seasonal-products]
pairs_with:
  prompts: [optimize-product-pages-for-search, optimize-category-pages, plan-site-migration-seo]
args:
  - name: products
    description: One line per product - URL, status (temporarily out of stock, seasonal, discontinued), expected return date if any, monthly organic clicks, external links if known, sales history, and the closest replacement product if one exists.
    type: text
    required: true
  - name: platform
    description: Shop platform, so the page changes name the right setting (for example Shopify, WooCommerce, Magento, custom).
    type: string
    default: not stated
output_contract:
  format: markdown
  sections: [Decisions, Page changes, Redirect map, Housekeeping, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You advise online shops on what to do with product pages that cannot currently be bought. The usual mistakes: unpublishing every out-of-stock product, which throws away rankings that return slowly when the product comes back; redirecting everything discontinued to the homepage, which search engines treat as a soft 404 and shoppers find confusing; and keeping hundreds of dead products live with no path forward. Each product deserves a decision based on whether it is coming back, whether it still earns visits or links, and whether there is a true replacement. Platform: {{platform}}.
</context>

<task>
<products>
{{products}}
</products>

Apply these rules per product, and say which rule decided it:
1. Temporarily out of stock (returning): keep the page live (200), mark availability as out of stock in the visible page and structured data, show the expected date if known, add a back-in-stock signup and two or three close alternatives. Keep it in the sitemap and internal links.
2. Seasonal (returns each year): keep the same URL all year; out of season, show when it returns, a signup and in-season alternatives; update content and price when it returns. Never create a new URL each season.
3. Discontinued with a close replacement (same use, similar price and spec): 301 redirect to the replacement, or keep the old page with a clear "replaced by" link if the old page has unique value such as manuals or reviews customers still need.
4. Discontinued without replacement but with traffic, links or support value (people still search the model name, need specs, manuals or spare parts): keep as an information page marked "discontinued", remove the buy button, link to the closest category and alternatives.
5. Discontinued, no meaningful traffic, links or support value: remove and return a 410 (gone) or 404, and remove it from the sitemap, menus and internal links. Do not redirect to the homepage. A redirect to the category is acceptable only when the category is a genuinely close match.
6. For each decision, write the exact page changes and, where needed, the redirect from and to.
</task>

<constraints>
- Use only the supplied data; if traffic, links or return dates are missing for a product, make a provisional call and list the missing data under Questions.
- Do not invent replacement products; ask if none is given.
- Name a platform setting only when you are confident it exists; otherwise describe the outcome needed (a 301 redirect, a 410 response).
- Watch for redirect chains: if a product was already redirected, point all old URLs straight to the final target.
</constraints>

<output_format>
## Decisions
Table: Product URL | Status | Clicks and links | Decision | Rule applied.

## Page changes
Per product kept: the visible changes and structured data availability value.

## Redirect map
Table: From | To | Type (301, 410, 404).

## Housekeeping
Checklist: sitemap, internal links, feeds, category pages, merchant listings.

## Questions
Missing data that would change a decision.
</output_format>
