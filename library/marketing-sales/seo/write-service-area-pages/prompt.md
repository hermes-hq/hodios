---
schema: 1
id: write-service-area-pages
kind: prompt
title: Write service area pages
description: Writes town or neighbourhood pages for a trade or mobile service business that differ in real local detail, not swapped place names, and says which areas should not get a page.
category: seo
version: 1.0.0
status: incubating
stage: [build]
role: [founder, marketer, copywriter]
subject: [construction]
requires: [none]
inputs: [text, notes]
output: [copy, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [location-pages, doorway-pages, trades, mobile-services, local-proof]
pairs_with:
  prompts: [plan-local-seo, write-schema-markup, write-meta-tags]
args:
  - name: business
    description: What you do, your main services, where you are based, how far you travel, typical response or booking time, phone and how people book. Rough notes are fine.
    type: text
    required: true
  - name: areas
    description: The towns, suburbs or neighbourhoods you want pages for, and which ones bring the most or best-paid work.
    type: text
    required: true
  - name: local_proof
    description: Real material per area - jobs done there, customer reviews that name the area, photos you have, access or parking quirks, typical housing or building types, local rules you have dealt with. Optional but pages without it stay thin.
    type: text
output_contract:
  format: markdown
  sections: [Area decisions, Pages, Shared elements, Gaps to fill]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write service area pages for plumbers, electricians, cleaners, movers, mobile mechanics, dog groomers and similar businesses that travel to customers. The common mistake is one template copied per town with the place name swapped. Search engines treat those as doorway pages: they rarely rank, and at scale they can pull the whole site down. A town page earns its place only when it tells someone in that town something the main service page does not: jobs done nearby, how fast you get there, parking and access, the local building stock, local permits or rules to check, and reviews from neighbours. Where that material does not exist yet, the honest answer is a single "Areas we cover" page, not a thin page per town.
</context>

<task>
<business>
{{business}}
</business>

<areas>
{{areas}}
</areas>

{{#local_proof}}<local_proof>
{{local_proof}}
</local_proof>{{/local_proof}}

1. Gate every area. Count the real local material for it: completed jobs, reviews naming the area, own photos, area-specific practical detail (access, parking, housing type, distance and response time), and a local rule or authority worth mentioning. Decide:
   - own page: at least three kinds of real material, or a clearly distinct service mix or demand;
   - grouped page: several small neighbouring places covered by one regional page;
   - list only: named on the "Areas we cover" page until material exists.
2. For each own or grouped page, write:
   - title tag (under about 60 characters, service + area + brand) and meta description (under about 155 characters);
   - H1 and a URL slug such as /areas/clifton/;
   - an opening paragraph that answers what a local searcher wants first: do you cover this area, how soon, how to book;
   - "Recent jobs in [area]" built only from supplied jobs, each with the problem, the fix and a detail that proves it was local;
   - "Working in [area]" with the access, parking, building-type and travel notes supplied;
   - "Local rules to check" naming the kind of permission or authority involved (for example a conservation area, a parking permit, a building control sign-off), phrased as something to confirm with the council or landlord, never as settled law;
   - reviews quoted word for word from the supplied text, with first name or initial only;
   - three to five FAQs that differ by area, a call to action with phone and booking route, and links to the relevant service pages and the areas page.
3. Write the shared elements once: the "Areas we cover" page text and the LocalBusiness or Service structured data fields (areaServed per page, no fake street address in a town you have no premises in).
4. Check uniqueness: estimate how much of each page is shared boilerplate. If more than about half would be shared, downgrade the page to grouped or list-only and say why.
5. If no area qualifies (for example no local proof was given), do not write town pages anyway. Write the "Areas we cover" page in full, then for the one or two areas that bring the most or best-paid work a skeleton page marked "Not ready to publish", with [X] slots for the jobs, review and access note to collect first. Say how many real items would make it ready.
</task>

<constraints>
- Never invent jobs, reviews, customer names, photos, response times, prices, local laws or landmarks. Where a page needs a detail you were not given, write [X: what to add] and list it under Gaps to fill.
- Do not claim an office, depot or address in a town where the business has none.
- Use the place name where a person would naturally say it; no lists of towns stuffed into paragraphs or footers.
- If the business, its services or the areas are missing, ask for them and stop.
- Say plainly when an area should not get a page, even if the user asked for one.
</constraints>

<output_format>
## Area decisions
Table: Area | Real material found | Decision (own page, grouped, list only) | Reason.

## Pages
One block per page: title tag, meta description, H1, slug, then the page copy with its subheadings. Skeleton pages from step 5 carry "Not ready to publish" in their first line.

## Shared elements
"Areas we cover" page text, internal links, structured data fields per page.

## Gaps to fill
Per area: the placeholders to replace and the material to collect from the next jobs there (photo, review request, access note).
</output_format>
