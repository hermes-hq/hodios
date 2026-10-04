---
schema: 1
id: write-search-ranking-report
kind: prompt
title: Write a search progress report
description: Writes a monthly search progress report for a client or owner from supplied data, leading with organic leads and sales, then visibility, rankings with caveats, work done, causes and next month's plan.
category: seo
version: 1.0.0
status: incubating
stage: [review]
role: [consultant, marketer]
requires: [none]
inputs: [dataset, notes, text]
output: [report, summary]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [client-reporting, monthly-report, organic-leads, progress-updates]
pairs_with:
  prompts: [analyze-search-console-data, diagnose-organic-traffic-drop]
args:
  - name: data
    description: This month's and comparison figures - organic leads, sales or revenue from analytics, clicks and impressions from the webmaster tool, rankings for tracked terms, map listing calls and direction requests if local. Say the date ranges.
    type: text
    required: true
  - name: work_done
    description: What was done this month (pages published or updated, technical fixes, links earned, profile updates) with dates.
    type: text
    required: true
  - name: audience
    description: Who reads it - the business owner you work for, an agency client, or your manager.
    type: enum
    enum: [owner, client, manager]
    default: client
output_contract:
  format: markdown
  sections: [Headline, Leads and sales from search, Visibility, Rankings, Work done, What moved and why, Next month, Data notes]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write monthly search reports for freelance consultants and in-house marketers. Bad reports open with rankings and traffic charts, hide declines, and claim every rise as the result of the work. Readers want to know three things: is search bringing more business, why, and what happens next. A trustworthy report leads with leads and sales, compares with both last month and the same month last year where seasonality matters, separates what the work caused from what the market or a search update did, and is honest about declines. Reader: {{audience}}.
</context>

<task>
<data>
{{data}}
</data>

<work_done>
{{work_done}}
</work_done>

1. Compute changes from the supplied figures: month on month and year on year where both exist, as numbers and percentages. Show the arithmetic only in Data notes.
2. Headline: one or two sentences on business results, then the single most important thing this month.
3. Leads and sales: organic enquiries, calls, bookings or revenue, and conversion rate, with comparison.
4. Visibility: impressions and clicks, top gaining and losing pages or queries.
5. Rankings: tracked terms that moved, with the caveat that positions vary by location, device and personalisation and are a sample, not the whole picture.
6. Work done: plain list linked to the outcomes it targets.
7. What moved and why: for each notable change, the most likely cause with confidence (the work, seasonality, a search engine update, a tracking change, competition). Use "likely" and "too early to tell" honestly; content usually needs weeks to months to show effect.
8. Next month: three to five planned actions, each with the result it aims for.
9. Adjust tone to the reader: an owner gets plain words and money; a client gets plain words plus what they need to approve or supply; a manager gets results against targets and resource asks.
</task>

<constraints>
- Use only the supplied numbers; never invent figures, causes or comparisons. If a figure is missing, say "not available" and what to set up to get it.
- Do not hide or soften declines; explain them with the same care as gains.
- Do not claim causation for changes that coincide with the work unless the evidence supports it.
- If there are no lead or sales figures at all, say so in the headline and recommend conversion tracking as a next-month action.
- Keep it under about 600 words excluding tables.
</constraints>

<output_format>
## Headline
Two sentences.

## Leads and sales from search
Table: Measure | This month | Last month | Same month last year | Change.

## Visibility
Table plus up to three bullets.

## Rankings
Table: Term | Position now | Before | Note, then the caveat in one line.

## Work done
Bullets.

## What moved and why
Bullets: change, likely cause, confidence.

## Next month
Numbered actions with aims; any approvals or inputs needed from the reader.

## Data notes
Date ranges, sources, arithmetic, gaps.
</output_format>
