---
schema: 1
id: write-sponsor-campaign-report
kind: prompt
title: Write a sponsor campaign report
description: Writes the report a creator sends a sponsor after a campaign - deliverables with links and dates, results against agreed goals, audience response, honest notes on what underperformed, and learnings.
category: creator-business
version: 1.0.0
status: incubating
stage: [review]
role: [content-creator]
inputs: [dataset, notes]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [campaign-report, sponsor-reporting, campaign-metrics, audience-sentiment, brand-relations]
pairs_with:
  prompts: [write-sponsor-renewal-proposal, read-stream-analytics]
  workflows: [brand-deal-track]
  personas: [creator-business-manager]
args:
  - name: campaign
    description: "What was agreed: deliverables, goals or KPIs, the reporting the agreement asks for and when."
    type: text
    required: true
  - name: results
    description: "Your numbers per deliverable from platform analytics (views, reach, watch time, engagement, clicks, code uses, sales if shared), dates and links, and notable comments."
    type: text
    required: true
  - name: benchmarks
    description: "Optional. Your usual numbers for comparable non-sponsored content."
    type: text
output_contract:
  format: markdown
  sections: [Summary, Deliverables delivered, Results against goals, Audience response, What we learned, Appendix checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Many sponsorship agreements require a results report within a set time, and brands that receive a clear, honest one are much more likely to book again. Brands care about the goals they set (reach, clicks, code uses, sales, sentiment), not every metric the platform shows, and they compare against what they were promised or what the creator's media kit implied. A good report leads with a one-paragraph summary, lists each deliverable with date and link, puts results next to the agreed goals, and shows context such as the creator's usual performance for similar content. Underperformance should be stated plainly with a likely reason and what would be done differently, because brands can see their own tracking data and spin damages trust. Screenshots of platform analytics are often expected as proof. Comments and audience questions are useful qualitative data, but they must be real quotes, not summaries that overstate enthusiasm. Metrics definitions differ across platforms (views, reach, impressions), so name each one.
</context>

<task>
<campaign>
{{campaign}}
</campaign>

<results>
{{results}}
</results>

{{#benchmarks}}
<benchmarks>
{{benchmarks}}
</benchmarks>
{{/benchmarks}}

1. **Summary:** a short paragraph: what ran, headline results against goals, and one learning.
2. **Deliverables delivered:** a table of each deliverable with platform, date, link placeholder and whether it matched the brief.
3. **Results against goals:** a table of each goal with target, actual and source; name each metric as the platform defines it and add their usual performance for context if given.
4. **Audience response:** real comment quotes they provided grouped by theme (interest, questions, objections), and recurring questions the brand could answer.
5. **What we learned:** what worked, what underperformed and the likely reason, and what would be done differently, honestly.
6. **Appendix checklist:** screenshots and exports to attach, and the date the report is due under the agreement.
</task>

<constraints>
- Use only the numbers and comments provided; never invent or round up results.
- State underperformance plainly; no spin.
- Name each metric and its source; do not mix views, reach and impressions.
- Keep the report readable in under three minutes.
</constraints>

<output_format>
## Summary
## Deliverables delivered
Table: deliverable | platform | date | link | matched brief.

## Results against goals
Table: goal | target | actual | source.

## Audience response
## What we learned
## Appendix checklist
Checkbox list.
</output_format>
