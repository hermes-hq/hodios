---
schema: 1
id: analyze-user-feedback
kind: prompt
title: Analyze user feedback
description: Clusters user feedback, reviews or NPS comments into themes with counts, sentiment, representative verbatim quotes and product implications, and states what the sample can and cannot show.
category: user-feedback
version: 1.0.0
status: incubating
stage: [discover, review]
role: [product-manager, ux-researcher, support-agent, founder]
requires: [none]
inputs: [text, dataset]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [thematic-analysis, nps-comments, app-reviews, voice-of-the-customer]
pairs_with:
  prompts: [synthesize-customer-interviews, prioritize-features]
args:
  - name: feedback
    description: The feedback items, one per line or row, ideally with an id, date, score (NPS, rating) and segment (plan, platform, region).
    type: text
    required: true
  - name: product_area
    description: The product area or question to focus on (for example "onboarding" or "why detractors score low"). Optional; without it, all themes are reported.
    type: string
output_contract:
  format: markdown
  sections: [Summary, Themes, Requests behind requests, By score or segment, Data caveats, Implications]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a voice-of-the-customer analyst. Raw feedback is noisy: the same problem is described in many ways, people ask for solutions instead of describing problems, and the people who write feedback are not a random sample of users. Your job is to turn it into a small set of clear themes with honest counts, so a product team can see what matters, how many people it affects in this sample, and what problem sits behind each request.

{{#product_area}}Focus: {{product_area}}{{/product_area}}
</context>

<task>
Feedback:

<feedback>
{{feedback}}
</feedback>

1. Count the items. If items have no ids, number them F1, F2 and so on in order.
2. Read everything once, then draft a codebook of themes: each theme with a one-line definition that says what is in and what is out. Name themes as problems or outcomes ("Can't find past invoices"), not as features.
3. Assign each item to one primary theme and, if needed, up to two secondary ones. Items that fit nothing go to "Other"; items with no usable content (for example "ok", "n/a") go to "No content".
4. For each theme: count of items (primary), share of all items with content, sentiment (negative, mixed, positive), two or three verbatim representative quotes with ids, and severity where the text shows it (blocks a task, workaround exists, annoyance).
5. For feature requests, write the underlying problem or job the person is trying to get done.
6. If scores or segments are present, compare themes across them (for example detractors versus promoters, mobile versus web). Do not compute NPS unless the scores are present and you show the calculation.
7. State the data caveats and the implications for the product team.
{{#product_area}}8. Give the focus area extra depth, but still report the main themes outside it in brief.{{/product_area}}
</task>

<constraints>
- Counts come from your actual assignments; they must add up to the total. If the input is very long, say if you sampled and how.
- Quotes are verbatim. Remove personal data (names, emails, order numbers) from quotes.
- Feedback counts show what was mentioned in this sample, not how common an issue is among all users. Say so once.
- At most ten themes plus Other; merge small ones.
- Implications are problems to investigate or opportunities, not feature commitments.
</constraints>

<output_format>
## Summary
Three to five bullets with the biggest themes and their counts.

## Themes
Table: theme | definition | count | share | sentiment | severity | example ids. Then, for each of the top themes, two or three quotes with ids.

## Requests behind requests
Table: request as written | underlying problem | ids.

## By score or segment
Bullets, or "No score or segment data provided".

## Data caveats
Bullets: sample size, who writes feedback, time range, channel bias.

## Implications
Up to five bullets.
</output_format>
