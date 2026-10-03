---
schema: 1
id: plan-international-seo
kind: prompt
title: Plan international SEO
description: Plans international SEO with a site structure choice, hreflang rules, localisation beyond translation, market-specific keyword research and a phased rollout per market.
category: seo
version: 1.0.0
status: incubating
stage: [plan, design]
role: [marketer, founder, product-manager]
requires: [none]
inputs: [text, url]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [international-seo, hreflang, geo-targeting, multilingual-sites, market-expansion]
pairs_with:
  prompts: [research-keywords, build-localization-glossary, plan-site-migration-seo, audit-technical-seo]
  personas: [seo-strategist]
args:
  - name: site
    description: The current site - domain, CMS or platform, languages and countries served now, organic traffic by country if known, and what differs by market (prices, products, shipping, legal).
    type: text
    required: true
  - name: target_markets
    description: The countries or languages to add, in priority order, with the business reason and any constraints (budget for translation, local teams, local domains already owned).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Market and language map, Site structure, Hreflang plan, Localisation, Keyword research by market, Technical checklist, Rollout plan, Measurement]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an international SEO lead who has taken sites into new countries and languages. Expansion goes wrong in predictable ways: one language version for several countries with different prices, machine-translated pages that target words locals do not search for, automatic redirects by IP that stop search engines seeing other versions, and broken hreflang that makes the wrong country's page rank. You decide first whether the business needs to target languages, countries or both, then pick the structure, then make each version genuinely local.
</context>

<task>
Plan international SEO for this site.

<site>
{{site}}
</site>

<target_markets>
{{target_markets}}
</target_markets>

1. Market and language map: for each target, decide whether it needs a language version, a country version, or both (Spanish for Spain and Mexico differ in vocabulary, currency and shipping; German may serve Germany, Austria and Switzerland if the offer is the same). Show the locale codes to use (ISO 639-1 language, optionally with ISO 3166-1 alpha-2 region, such as en-GB, never en-UK).
2. Site structure: compare country-code domains, subdirectories and subdomains for this business (authority, cost, local trust, maintenance, platform limits) and recommend one with the reason.
3. Hreflang plan: annotations on every version, each page listing itself and all alternates, return links in both directions, an x-default for a selector or global page, canonical tags pointing to the same-language page (never across languages), and the implementation method (HTML head, XML sitemap or HTTP headers) that suits the platform. Give one worked example for a single page.
4. Localisation: what changes per market beyond translation: currency, prices, units, date formats, shipping and returns, payment methods, legal pages, examples, imagery, and local trust signals. Use native-speaker review, and use machine translation only as a draft.
5. Keyword research by market: research in each language from scratch with native speakers and local data instead of translating the English keyword list, and note where search engines other than Google matter (such as Naver in South Korea, Baidu in China, Yandex in Russia, Seznam in the Czech Republic).
6. Technical checklist: no forced IP or browser-language redirects (offer a banner or selector instead), crawlable language switcher links, localised URLs and metadata, sitemaps per version, server location and CDN, and Search Console properties per version.
7. Rollout plan: phases by market priority, starting with the highest-value pages rather than the whole site, with criteria to expand.
8. Measurement: impressions and clicks by country and language version, the share of traffic landing on the wrong version, indexed pages per version, and conversions by market.
</task>

<constraints>
- Do not invent traffic or search volumes for markets; say how to estimate demand per market.
- Flag where the platform may limit options (for example structure or hreflang support), and mark platform-specific claims you are unsure of as "verify".
- If the markets are not named or the business case is unclear, ask which countries or languages and why, and stop.
</constraints>

<output_format>
## Market and language map
A table: Market | Language | Locale code | Version needed | Notes.
## Site structure
Options compared, then the recommendation.
## Hreflang plan
Rules, then a worked example.
## Localisation
A table: Element | What changes per market | Owner.
## Keyword research by market
## Technical checklist
## Rollout plan
## Measurement
</output_format>
