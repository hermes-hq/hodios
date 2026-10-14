---
schema: 1
id: choose-subdomain-vs-subfolder
kind: prompt
title: Choose subfolder, subdomain or separate domain
description: Decides where a blog, store, help centre, app or country site should live (subfolder, subdomain or separate domain) by weighing search, technical and business trade-offs.
category: seo
version: 1.0.0
status: incubating
stage: [plan, design]
role: [founder, marketer, product-manager, architect]
requires: [none]
inputs: [text]
output: [report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [site-architecture, subdomains, domain-strategy, url-structure, decision-making-framework]
pairs_with:
  prompts: [design-site-structure-for-search, plan-international-seo, plan-site-migration-seo]
  personas: [seo-strategist]
args:
  - name: what
    description: What needs a home (blog, shop, docs, help centre, app, community, landing pages, a country or language version) and how it relates to the main site's topic and audience.
    type: text
    required: true
  - name: constraints
    description: The platforms involved (for example the main site on Webflow, the shop on Shopify), team and hosting limits, budget for a reverse proxy, and whether content already lives somewhere with traffic and links.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Recommendation, Trade-offs, How to implement, If it already exists elsewhere, What would change the answer]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an SEO architect. This is a long-running debate. Google has said publicly that it handles subdomains and subfolders well and that either can work. Many practitioners nonetheless report that moving content from a subdomain into a subfolder helped it rank, which they attribute to the content sharing the main site's signals and internal links more directly. Treat both as part of the evidence; the honest position is that a subfolder is the lower-risk default for content meant to support the main site's search visibility, while a subdomain is reasonable when the content is genuinely separate (an app, a status page, a different audience or product) or when platforms make a subfolder impractical.

Practical factors often decide it: a subfolder on a different platform needs a reverse proxy or edge routing, which adds cost and failure modes; tracking, cookies and analytics behave differently across subdomains; separate domains split brand and links and are usually justified only for distinct brands or for country targeting via ccTLDs. Moving existing content later means a migration with redirects and a temporary dip risk, so the cost of change is part of the decision.
</context>

<task>
Recommend where this should live.

<what>
{{what}}
</what>

<practical_limits>
{{constraints}}
</practical_limits>

1. **Recommendation:** subfolder, subdomain or separate domain, with the URL pattern and a two to three sentence reason.
2. **Trade-offs:** compare the options on search (shared signals, topical relevance, internal linking), technical effort (reverse proxy, platform limits, CDN), analytics and cookies, brand, and maintenance. Mark evidence types: search engine statements versus practitioner reports.
3. **How to implement:** for the recommended option, the concrete setup: reverse proxy or edge rules if needed (with what to test: canonical, sitemaps, redirects, assets, caching), Search Console property setup, navigation and internal links between the parts, and shared or separate analytics.
4. **If it already exists elsewhere:** if content already lives on a subdomain or another domain with traffic, whether moving is worth it, and if so the migration essentials: one-to-one 301 map, updated canonicals and sitemaps, internal links, and monitoring.
5. **What would change the answer:** the conditions that would flip the recommendation.
</task>

<constraints>
- Do not state as fact that subfolders always outrank subdomains, or that they are identical for search; present both the search engine's statements and practitioner observations.
- Do not recommend a migration of content with established traffic without weighing its cost and risk.
- Keep platform claims general and tell the user to confirm their platform supports the setup (for example reverse proxy compatibility).
</constraints>

<output_format>
## Recommendation
The choice, URL pattern and short reason.

## Trade-offs
A table: Factor | Subfolder | Subdomain | Separate domain.

## How to implement
A numbered list.

## If it already exists elsewhere
Bullets, or "Not applicable".

## What would change the answer
Bullets.
</output_format>
