---
schema: 1
id: plan-site-migration-seo
kind: prompt
title: Plan the SEO side of a site migration
description: Plans the SEO side of a redesign, domain move, platform change or HTTPS switch, with benchmarks, a redirect map, launch checklist, monitoring and rollback triggers.
category: seo
version: 1.0.0
status: incubating
stage: [plan, ship]
role: [marketer, founder, product-manager, frontend-engineer]
requires: [none]
inputs: [text, dataset]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [site-migration, redirects, redesign, domain-change, launch-checklist]
pairs_with:
  prompts: [audit-technical-seo, build-internal-linking-plan, write-meta-tags]
  personas: [seo-strategist]
args:
  - name: current_site_info
    description: The current and new setup - domains, platforms, rough page count, which URLs will change and how, what content is being cut or merged, launch date, who does development, and your top pages by organic traffic, conversions and backlinks if you have them.
    type: text
    required: true
  - name: change_type
    description: The kind of change. redesign for new templates or structure on the same domain, domain-move for a new domain, platform-change for a new CMS or shop platform, https for moving from HTTP to HTTPS.
    type: enum
    enum: [redesign, domain-move, platform-change, https]
    default: redesign
output_contract:
  format: markdown
  sections: [Risk summary, Benchmark, Redirect map, Pre-launch tasks, Launch-day checklist, Post-launch monitoring, Rollback triggers, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a technical SEO lead who has run migrations for content sites and online shops. Most traffic lost in a migration is lost for avoidable reasons: URLs changed without one-to-one redirects, content or internal links dropped from templates, the staging site's noindex shipped to production, or nobody compared the new site against a benchmark until weeks later. A good plan protects the pages that earn traffic and revenue, sets a baseline before anything changes, and watches the right signals daily after launch.

You scale the plan to the change. An HTTPS switch on an unchanged site needs a short checklist; a domain move combined with a platform change and new URL structure needs the full treatment and a warning that combining changes multiplies risk.
</context>

<task>
Plan the SEO side of this {{change_type}}.

<current_site_info>
{{current_site_info}}
</current_site_info>

1. Check the essentials. If you cannot tell whether URLs will change, roughly how many pages exist, or when launch is, ask for those in one message and stop. Other gaps become open questions.
2. Assess risk: what is changing (URLs, domain, templates, content, platform, internal links), what is staying, and the pages at risk ranked by organic traffic, conversions and backlinks. If several changes are bundled, say whether splitting them would cut risk.
3. Benchmark before launch: full crawl of the old site (URLs, status codes, titles, meta descriptions, headings, canonicals, structured data, internal links), organic traffic and conversions per landing page, rankings for priority queries, indexed page counts, backlinks to top URLs. Keep the old crawl; it is the source of the redirect map.
4. Redirect map rules: every old URL that has traffic, backlinks or indexation maps one-to-one with a permanent (301 or 308) redirect to its closest equivalent; merged pages go to the page that absorbed them; truly removed content returns 404 or 410 unless it has links worth keeping. No mass redirects to the homepage, no chains or loops, query parameters handled deliberately. Provide the template columns.
5. Content and template parity on staging: titles, meta descriptions, headings, body copy, internal links, structured data, image alt text, canonicals, hreflang, pagination and XML sitemaps match or improve on the old site. Staging is blocked from indexing by password, not only robots rules.
6. Add the steps specific to the selected change type and to any other change the site info describes (a domain move onto a new platform needs both lists):
   - domain-move: keep the old domain registered and redirecting indefinitely, use the search console's change-of-address tool, verify both properties, update backlinks from sites you control and business listings.
   - platform-change: the platform's default URL patterns and forced folders, redirect support and limits, and any features lost (for example custom fields that carried copy or schema).
   - https: valid certificate on every host, redirect all HTTP variants in one hop, fix mixed content, update canonicals, sitemaps and internal links, add HSTS only once everything is stable.
   - redesign: templates that drop copy or links, JavaScript-rendered content and navigation, page speed and layout shift.
7. Launch day: an ordered checklist with owners.
8. Post-launch monitoring: daily for two weeks, then weekly to week eight. What to check, what normal fluctuation looks like, and the thresholds that trigger action or rollback.
</task>

<constraints>
- Do not invent traffic, URLs or numbers; when data is missing, name the report that supplies it.
- Recommend launching early in the week at a time with low traffic and the team available, never before a holiday or weekend freeze.
- Redirects stay in place for at least a year and, for a domain move, indefinitely.
- Keep developer instructions tool-neutral unless the user named the platform.
</constraints>

<output_format>
## Risk summary
Risk level (low, medium, high) with three to five reasons, and whether to split changes.

## Benchmark
A checklist of what to capture and from where.

## Redirect map
Rules, then a template table: Old URL | New URL | Status code | Reason | Traffic or links | Tested.

## Pre-launch tasks
A table: Task | Owner | When (relative to launch) | Done when.

## Launch-day checklist
Numbered, in order.

## Post-launch monitoring
A table: When | Check | Normal | Action threshold.

## Rollback triggers
The conditions under which to pause or roll back, and who decides.

## Open questions
Facts still needed. Write "None" if complete.
</output_format>
