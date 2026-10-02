---
schema: 1
id: write-media-kit
kind: prompt
title: Write a creator media kit
description: Writes a creator media kit with an audience snapshot, reach and engagement figures, formats, past partnerships, packages and rates. Use before approaching brands or answering their enquiries.
category: content-strategy
version: 1.0.0
status: incubating
stage: [build]
role: [content-creator, writer]
inputs: [text, dataset]
output: [docs, table, copy]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [media-kit, brand-deals, rate-card, audience-demographics]
pairs_with:
  prompts: [pitch-brand-sponsorship, plan-creator-monetization, write-podcast-ad-read]
args:
  - name: creator_profile
    description: Who you are, what you make, on which platforms, how often, your content style, and past brand partnerships with any results you can share.
    type: text
    required: true
  - name: metrics
    description: Your numbers per platform with the date range, for example followers, average views or listens per post, engagement, email list size and open or click rates, plus audience demographics from your analytics.
    type: text
    required: true
  - name: rates
    description: Your rates or price ranges per deliverable, if you have them, and what is included (usage rights, revisions, exclusivity).
    type: text
output_contract:
  format: markdown
  sections: [Media kit, Rate card, Design notes, Fill before sending]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help creators prepare media kits that brand and agency partnership managers actually read. They skim for a few things: who the audience is (demographics, location, interests), how many people a post really reaches (average views or listens per piece, not just followers), how engaged they are, what formats are available, proof from past partnerships, and what it costs. Clear, dated, honest numbers build trust; inflated or undated numbers are spotted quickly and end conversations. A media kit is usually one or two pages, designed to be scanned, exported as a PDF or shared as a link.
</context>

<task>
<creator_profile>
{{creator_profile}}
</creator_profile>

<metrics>
{{metrics}}
</metrics>

<rates>
{{rates}}
</rates>

1. **Intro.** Two or three sentences: who the creator is, what they make, for whom, and why their audience trusts them.
2. **Audience snapshot.** Demographics, top locations and interests from the metrics. Mark any missing piece as a placeholder.
3. **Reach and engagement.** A table per platform: followers or subscribers, average views or listens per piece, engagement rate, and the date range. State how the engagement rate is calculated (for example interactions divided by views), and calculate it only from the numbers given.
4. **Formats.** What a brand can buy on each platform: dedicated pieces, integrations, short mentions, stories, newsletter placements, live segments, bundles, and add-ons (usage rights for the brand's own channels, paid boosting, exclusivity periods, extra revisions).
5. **Past partnerships.** Brands and results exactly as given. If none, replace this section with a "What working with me looks like" section: the process, timelines and what the brand receives (draft review, reporting after the campaign).
6. **Packages and rate card.** Use the given rates. If none were given, do not invent prices: provide the package structure with `[RATE]` placeholders and a short note on how to set rates from the creator's own numbers (for example average views divided by 1,000 multiplied by a chosen rate per thousand, adjusted for engagement, production effort, usage rights and exclusivity).
7. **Contact and next step.** How to reach the creator and what to include in an enquiry.
</task>

<constraints>
- Use only the numbers supplied, with their date ranges. Never round up, inflate, or invent figures, demographics, partner names or results.
- Prefer average views or listens over follower counts as the headline reach figure; say so in the design notes if the creator only gave followers.
- Include a line stating that sponsored content will be clearly disclosed to the audience.
- Keep the copy tight: the whole kit should fit on one or two pages.
</constraints>

<output_format>
## Media kit
The full kit in Markdown, in the order above, ready to lay out.

## Rate card
A table: package | deliverables | includes | price (or `[RATE]`).

## Design notes
Layout suggestions for a one or two page PDF: which figures to make large, where photos or screenshots of past work go, and which analytics screenshots to keep ready on request.

## Fill before sending
Every placeholder and every figure to update before sending.
</output_format>
