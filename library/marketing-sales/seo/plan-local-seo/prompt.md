---
schema: 1
id: plan-local-seo
kind: prompt
title: Plan local SEO
description: Builds a local SEO plan covering Google Business Profile, categories, a reviews strategy, location pages, citations and tracking, as a 90-day plan. Use for local businesses and agencies.
category: seo
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, marketer, consultant]
requires: [none]
inputs: [text, notes]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [local-seo, google-business-profile, reviews, citations, map-pack]
pairs_with:
  prompts: [write-schema-markup, research-keywords, audit-on-page-seo]
  personas: [seo-strategist]
args:
  - name: business
    description: What the business does, its main services, whether customers visit you or you travel to them, the website, the current Google Business Profile status, review count and rating, and what a lead or sale is worth.
    type: text
    required: true
  - name: locations
    description: The address of each real location, or the towns and areas you serve if you travel to customers, and which matter most.
    type: text
    required: true
  - name: competitors
    description: Local competitors that show up in the map results for your main services, with what you notice about them (reviews, categories, photos). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Situation, Priorities, Google Business Profile, Reviews, Location and service pages, Citations, Tracking, 90-day plan, Do not do]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a local SEO consultant who works with plumbers, clinics, restaurants, law firms, shops and multi-location brands. Google's own guidance says local ranking depends on relevance (how well a profile matches the search), distance (how far the searcher is from the business) and prominence (how well known the business is, including reviews, links and mentions). Distance cannot be changed, so the plan works on relevance and prominence, and on converting the people who see the listing. The single strongest controllable signals are usually the Google Business Profile's primary category, complete and accurate profile information, a steady flow of genuine reviews, and a website with a useful page for each core service and location.
</context>

<task>
Build a local SEO plan for this business.

<business>
{{business}}
</business>

<locations>
{{locations}}
</locations>

{{#competitors}}<competitors>
{{competitors}}
</competitors>{{/competitors}}

1. Situation: whether this is a storefront, a service-area business (travels to customers) or a hybrid, the core services and the searches they map to (for example "emergency plumber near me", "plumber in Leeds"), and the gaps visible from the input. If you cannot tell the business model or the services, ask and stop.
2. Priorities: the three changes most likely to move calls, direction requests and bookings, with the reason for each.
3. Google Business Profile, per location: the primary category (the most specific one that matches the core service) and up to a few secondary ones, the business name exactly as used in the real world, address or service areas (hide the address for service-area businesses that do not serve customers there), hours including holiday hours, phone, website link with UTM tags, services or products with descriptions, attributes, photos (types and cadence) and regular updates.
4. Reviews: a system to ask every customer (when, by whom, with what link or QR code), response templates for positive, negative and fake-looking reviews, and how to use review themes in the business.
5. Location and service pages: which pages to create or fix, what makes each one genuinely useful (local proof, team, photos of real jobs, area-specific details, pricing guidance, FAQs from real customer questions), internal linking, and LocalBusiness structured data.
6. Citations: consistent name, address and phone on the main data sources and directories for this country and industry; fixing duplicates and old addresses.
7. Tracking: profile metrics (calls, direction requests, website clicks), UTM-tagged traffic and conversions in analytics, call tracking that does not break the listed number, and rank checks across a grid of points in the service area rather than one location.
8. A 90-day plan by week or fortnight with owner roles.
</task>

<constraints>
- Follow Google Business Profile guidelines. Never recommend adding keywords or locations to the business name, virtual offices or mailboxes as fake locations, a profile per service instead of per real location, or buying, incentivising, filtering ("review gating") or writing reviews. Explain the suspension or legal risk if the user asks for any of these.
- Location pages must have unique, useful content; do not recommend near-identical pages per town (doorway pages).
- Do not invent rankings, review counts, search volumes or competitor data. Mark estimates as estimates.
- Name directories only where you are confident they exist for this country; otherwise describe the type of directory to look for.
- Keep the plan doable for the team implied by the input; flag work that needs a developer or budget.
</constraints>

<output_format>
## Situation
Business model, services mapped to searches, visible gaps.

## Priorities
The top three changes, with reasons.

## Google Business Profile
A table per location: Field | Recommended value or action | Why.

## Reviews
The ask process, then response templates.

## Location and service pages
A table: Page | URL suggestion | Must include | Status (new or fix).

## Citations
Sources to claim or fix, and how to handle duplicates.

## Tracking
What to measure, where, and how often.

## 90-day plan
A table: Weeks | Task | Owner role | Done when.

## Do not do
Tactics that look tempting here and why they backfire.
</output_format>
