---
schema: 1
id: write-website-performance-report
kind: prompt
title: Write a monthly website performance report
description: Writes a monthly website report for an owner or client with traffic by channel, conversions, top pages, the changes made and their measured effect, and tracking caveats.
category: reporting
version: 1.0.0
status: incubating
stage: [operate, review]
role: [marketer, consultant, founder, manager]
inputs: [dataset, text]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [web-analytics, ga4, site-traffic, conversion-rate, client-reporting]
pairs_with:
  prompts: [analyze-web-analytics, write-search-ranking-report, write-monthly-social-report, check-report-figures]
args:
  - name: analytics_data
    description: "This month's analytics export: users or sessions by channel and device, conversions or key events by channel, conversion rate, top landing pages with sessions and conversions, plus last month and the same month last year if available. Name the tool used."
    type: text
    required: true
  - name: changes_made
    description: "What changed on the site or in marketing this month, with dates: new pages, redesigns, speed work, campaigns, tracking or consent banner changes. Optional but needed for the effects section."
    type: text
  - name: goals
    description: What the site is for (leads, sales, bookings, donations, sign-ups), which conversions count, monthly targets and who reads the report. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Traffic, Conversions, Top pages, Changes made and their effect, Next month, Tracking notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Site owners and clients want to know whether the website is bringing in more of what it exists for, and whether the work done on it helped. Analysts who report websites well start from conversions, not traffic, because traffic can rise from bots, a viral post or low-intent visitors while enquiries fall. They know the common distortions: consent banners and browser privacy features hide a share of visitors, so a new or changed banner can drop measured traffic overnight; bot and referral spam spikes show as one-page sessions from odd sources; a change in which events count as conversions breaks every comparison; and "direct" traffic is partly untracked traffic from apps and email. Month-on-month changes are seasonal, so the same month last year is often the fairer comparison. Before-and-after comparisons for a site change are evidence, not proof, because other things changed at the same time; a cleaner check compares the changed pages with unchanged pages over the same period. Conversion rate by device often exposes a broken mobile form.

{{#goals}}Goals: {{goals}}{{/goals}}
</context>

<task>
<analytics_data>
{{analytics_data}}
</analytics_data>

{{#changes_made}}<changes_made>
{{changes_made}}
</changes_made>{{/changes_made}}

1. Check the data for tracking breaks: consent or tag changes, conversion definition changes, bot or spam spikes. List them before reporting any trend.
2. Report conversions and conversion rate in total, by channel and by device, against target, last month and the same month last year.
3. Report traffic by channel and device with the same comparisons, and say whether traffic changes reached conversions.
4. List the top landing pages by sessions and by conversions, and flag pages with high traffic and poor conversion.
5. For each change made, compare the affected pages or channel before and after, against an unaffected comparison where possible, and state the confidence in the effect.
6. Recommend three to five concrete actions for next month, each tied to a number in the report.
</task>

<constraints>
- Lead with conversions or the site's goal metric, not with traffic.
- Do not claim a change caused an effect without a comparison and a confidence statement.
- Do not compare across a tracking or definition change as if nothing happened; say what is comparable.
- Do not invent benchmarks for conversion rate or bounce rate; use only targets supplied.
- Plain language for a non-specialist owner; define any analytics term once.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Three to five sentences: goal conversions against target, the main driver, the effect of this month's changes, the top action.

## Traffic
Table: Channel | Users or sessions | Last month | Same month last year | Change.

## Conversions
Table: Channel or device | Conversions | Conversion rate | Last month | Same month last year | Target.

## Top pages
Table: Page | Sessions | Conversions | Conversion rate | Note.

## Changes made and their effect
Table: Change | Date | Measured effect | Comparison used | Confidence.

## Next month
Numbered actions with the figure behind each.

## Tracking notes
Bullets: breaks, spikes, definition changes, what to fix.
</output_format>
