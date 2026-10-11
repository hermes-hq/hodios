---
schema: 1
id: summarize-reviews-of-my-business
kind: prompt
title: Summarise reviews of your own business
description: Summarises a local business's own online reviews into what customers praise, recurring complaints, operational fixes, trends over time and which reviews still need a reply.
category: summarization
version: 1.0.0
status: incubating
stage: [review]
role: [founder, operations-manager, manager]
requires: [none]
inputs: [text, dataset]
output: [summary, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [online-reviews, local-business, customer-complaints, service-improvement, star-ratings]
pairs_with:
  prompts: [summarize-reviews-before-buying, respond-to-online-review, summarize-survey-comments]
args:
  - name: reviews
    description: Your reviews with star rating, date and text, copied from the review sites you use. Include replies you already posted if any.
    type: text
    required: true
  - name: business
    description: What the business is and anything that changed recently (new menu, new staff, renovation, price change), with dates.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [The picture in brief, What customers praise, Recurring complaints, Changes over time, Fixes to consider, Reviews to answer]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help an owner or manager of a cafe, salon, shop, hotel, garage or other local business learn from their own reviews. Owners tend to read the latest one-star review and react; the useful signal is in patterns. Experienced operators read complaints for the underlying process (three reviews about "rude staff" on Saturday mornings may be an understaffing problem), compare before and after a change, notice what customers praise so it is protected, and separate fixable operations from taste. Star averages hide a lot: a 4.4 can include a growing cluster of complaints about the same thing. They also reply to unanswered critical reviews quickly, calmly and without arguing.

<reviews>
{{reviews}}
</reviews>

Business: {{business}}
</context>

<task>
1. Count reviews by star rating and by period, and state the date range covered.
2. List what customers praise, with counts and short quotes; name staff only as the reviews do.
3. List recurring complaints with counts, quotes, and the likely process behind each (staffing, wait times, booking, cleanliness, pricing clarity, product quality), marked as a likely cause rather than a fact.
4. Compare before and after any change the owner mentioned; say if the sample is too small to tell.
5. Suggest fixes for the top complaints, practical for a small business, ordered by impact and effort.
6. List critical or mixed reviews that have no reply yet, with the point each reply should address.
7. Flag reviews that look fake or off-topic only where there is a specific sign (wrong business, impossible details), without accusing anyone.
</task>

<constraints>
- Use only the reviews given. Do not invent counts, causes or customer details.
- Do not suggest asking only happy customers for reviews, buying reviews, offering rewards for ratings, or reporting genuine negative reviews to get them removed.
- Keep quotes exact and short; do not repeat customers' full names.
- If there are fewer than about 15 reviews, say patterns are tentative.
</constraints>

<output_format>
## The picture in brief
Three to five lines with counts and date range.

## What customers praise
Table: Theme | Count | Quote

## Recurring complaints
Table: Complaint | Count | Quote | Likely cause (to check)

## Changes over time
Bullets.

## Fixes to consider
Numbered, with impact and effort.

## Reviews to answer
Table: Date | Rating | Point to address
</output_format>
