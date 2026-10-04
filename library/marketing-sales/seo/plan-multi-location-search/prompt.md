---
schema: 1
id: plan-multi-location-search
kind: prompt
title: Plan search for multiple locations
description: Plans search for a business with several branches, with one profile and page per real site, unique local content, review handling per branch, linking and a split of head office and branch duties.
category: seo
version: 1.0.0
status: incubating
stage: [plan]
role: [marketer, operations-manager, founder]
subject: [retail]
requires: [none]
inputs: [text, notes]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [multi-location, branches, franchises, location-pages, review-management]
pairs_with:
  prompts: [plan-local-seo, audit-business-citations, write-service-area-pages]
  personas: [local-seo-consultant]
args:
  - name: locations
    description: Each branch - address, whether customers visit it, services or stock that differ, opening hours, staff contact, review count and rating, and whether it is owned or franchised.
    type: text
    required: true
  - name: current_setup
    description: How things work now - who controls the map profiles, the website structure for locations, how reviews are handled, any agency, and known problems (duplicates, closed branches still listed). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Situation, Profiles, Location pages, Reviews per branch, Structure and linking, Who owns what, Rollout, Do not do]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan search for businesses with several branches: shop chains, clinic groups, gyms, franchised trades. Multi-location search breaks down in management more than in tactics: profiles created by different managers and agencies, duplicates and closed branches still live, one generic "Locations" page, reviews answered at one branch and ignored at another, and nobody sure who changes holiday hours. The plan has to fix both: one accurate profile and one useful page per real location, and a clear split of who does what.
</context>

<task>
<locations>
{{locations}}
</locations>

{{#current_setup}}<current_setup>
{{current_setup}}
</current_setup>{{/current_setup}}

1. Situation: count real locations (staffed premises customers visit or that serve an area), service-area versus storefront branches, and problems visible in the input.
2. Profiles: one map profile per real location, all owned by a central business account with branch managers as managers, not owners; consistent brand name with no keywords, a location descriptor only if the branch uses one on its signage; correct primary category per branch; branch-specific hours, phone and services; process for closed or moved branches and duplicates.
3. Location pages: a locator page plus one page per branch with unique content: address, map, hours, direct phone, parking and access, services or stock specific to that branch, staff, photos of that branch, branch reviews, local FAQs; LocalBusiness structured data per page; profile links pointing to the branch page, not the homepage.
4. Reviews per branch: a request process staff can run, response times and templates, escalation of negative reviews to head office, and branch-level reporting.
5. Structure and linking: URL pattern (/locations/city-area/), links from service pages to branches offering them, breadcrumbs, and how to add or remove a branch.
6. Who owns what: head office versus branch versus agency, as a responsibility table (brand, profiles, hours, photos, reviews, page content, reporting).
7. Rollout in phases: fix data and duplicates first, then pages, then reviews and reporting.
</task>

<constraints>
- Never recommend profiles for places without staffed premises, virtual offices, or keywords in names; explain suspension risk if asked.
- Location pages must differ in real content; no swapped-name templates.
- Do not invent branch details, review counts or rankings; mark gaps [X].
- For franchises, note where the franchise agreement decides who owns profiles and content, and say to check it.
- If the number of locations or what customers do there is unclear, ask and stop.
</constraints>

<output_format>
## Situation
Bullets.

## Profiles
Table: Branch | Profile status | Primary category | Fixes.

## Location pages
URL pattern, the page template's sections, and per-branch unique content to gather.

## Reviews per branch
Process, response standards, reporting.

## Structure and linking
Bullets.

## Who owns what
Table: Task | Head office | Branch | Agency or other.

## Rollout
Table: Phase | Weeks | Tasks | Done when.

## Do not do
Bullets with reasons.
</output_format>
