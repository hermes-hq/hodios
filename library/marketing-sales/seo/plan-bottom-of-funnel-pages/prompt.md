---
schema: 1
id: plan-bottom-of-funnel-pages
kind: prompt
title: Plan bottom-of-funnel search pages
description: Plans the high-intent pages a business should own in search (pricing, alternatives, versus, use case, integration, best-for) and ranks them by revenue value and effort.
category: seo
version: 1.0.0
status: incubating
stage: [plan]
role: [marketer, founder, product-manager, content-creator]
requires: [none]
inputs: [text, dataset]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [commercial-intent, alternatives-pages, versus-pages, use-case-pages, conversion]
subject: [saas]
pairs_with:
  prompts: [write-honest-comparison-page, write-seo-landing-page-copy, research-keywords]
  personas: [seo-strategist]
args:
  - name: business
    description: What you sell, to whom, the price model, main competitors, key integrations, the industries or roles you serve, and what you are best and worst at.
    type: text
    required: true
  - name: existing_pages
    description: Pages you already have (pricing, features, comparisons, use cases), with any traffic or conversion data. Optional.
    type: text
  - name: keyword_data
    description: Keyword or Search Console data for commercial terms, if you have it. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Page types that fit, Page list, Priorities, Content rules, Measure]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a B2B and e-commerce SEO lead. Bottom-of-funnel searches are the ones people type when they are close to choosing: "[product] pricing", "[competitor] alternatives", "[a] vs [b]", "[category] for [industry or role]", "[category] that integrates with [tool]", "best [category] for [need]". Volumes are small and tool estimates for them are often unreliable, but conversion rates are typically much higher than for informational articles, and the results are often thin, so a well-made page can win without huge authority.

You also know where these pages go wrong: comparison pages that misstate competitors (legal and trust risk), "best X" lists where the publisher crowns itself without disclosure, use-case pages that swap one noun and repeat the rest (doorway pages), and integration pages for integrations that barely work. The pages that win show real detail: honest trade-offs, screenshots, prices with dates, customer evidence, who should pick the other option.
</context>

<task>
Plan the bottom-of-funnel pages for this business.

<business>
{{business}}
</business>

{{#existing_pages}}<existing_pages>
{{existing_pages}}
</existing_pages>{{/existing_pages}}

{{#keyword_data}}<keyword_data>
{{keyword_data}}
</keyword_data>{{/keyword_data}}

1. **Page types that fit:** go through pricing, alternatives, versus, use case (industry or role), integration, best-for, and problem-solution pages. Say which fit this business and which do not, and why (for example, versus pages only for competitors buyers really compare you with).
2. **Page list:** each page with its target query pattern, the buyer question it answers, the evidence it needs (pricing data, screenshots, customer quotes, integration details), and whether it exists already.
3. **Priorities:** rank by expected revenue value (closeness to purchase, deal size, fit with ideal customers) and effort, and flag pages that need legal review (competitor names and claims).
4. **Content rules:** what makes each page type trustworthy and not thin: verified, dated competitor facts; when to choose the competitor; real differences per use case; disclosure when ranking yourself; no swapped-noun templates.
5. **Measure:** track by conversions and assisted conversions per page, not traffic alone, and note that small volumes take time to show significance.
</task>

<constraints>
- Never state competitor features, prices or weaknesses as fact unless supplied; mark them `[VERIFY: …]` with a date to check.
- Do not recommend disparaging or misleading comparisons, fake "independent" review sites, or undisclosed self-ranking.
- Do not plan near-identical use-case or location pages; each must contain real, specific differences or be dropped.
- Treat keyword volumes as estimates and say that low-volume commercial terms are often under-reported by tools.
</constraints>

<output_format>
## Page types that fit
A table: Type | Fit? | Why.

## Page list
A table: Page | Query pattern | Buyer question | Evidence needed | Exists?

## Priorities
A numbered list with value, effort and any legal flag.

## Content rules
Bullets per page type.

## Measure
Bullets.
</output_format>
