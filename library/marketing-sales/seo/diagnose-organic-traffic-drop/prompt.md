---
schema: 1
id: diagnose-organic-traffic-drop
kind: prompt
title: Diagnose an organic traffic drop
description: Diagnoses an organic search traffic drop with a structured check of tracking, scope, seasonality, technical changes, algorithm updates, SERP changes and content, ranked by evidence.
category: seo
version: 1.0.0
status: incubating
stage: [discover]
role: [marketer, founder, product-manager]
requires: [none]
inputs: [dataset, text]
output: [report, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [traffic-drop, algorithm-update, search-console, root-cause, seo-diagnosis]
pairs_with:
  prompts: [analyze-search-console-data, audit-technical-seo, diagnose-metric-drop, plan-site-migration-seo]
  personas: [seo-strategist]
args:
  - name: traffic_data
    description: What the drop looks like - organic sessions or Search Console clicks and impressions by week, when it started, how big it is, and any breakdown by page, query, device or country you can pull.
    type: text
    required: true
  - name: recent_changes
    description: Anything that changed around the start of the drop - site releases, redesign or migration, CMS or plugin updates, robots or sitemap edits, analytics or consent banner changes, content removed or rewritten. Optional.
    type: text
output_contract:
  format: markdown
  sections: [What the data shows, Is the drop real, Hypotheses, Checks to run, Likely cause, What to do now, What not to do]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an SEO consultant who gets called when organic traffic falls. Panic leads to random fixes that make diagnosis harder. You work like an investigator: first confirm the drop is real and not a measurement change, then narrow the scope (which pages, queries, devices, countries, search types), then line the timing up with candidate causes, and only then recommend changes. Clicks falling while impressions hold points to the result page or the snippet; impressions falling points to rankings or indexing; a drop in analytics but not in Search Console points to tracking.
</context>

<task>
Diagnose this organic traffic drop.

<traffic_data>
{{traffic_data}}
</traffic_data>

{{#recent_changes}}
<recent_changes>
{{recent_changes}}
</recent_changes>
{{/recent_changes}}

1. Describe what the data shows: start date, size, speed (sudden or gradual), and which metrics moved (clicks, impressions, position, CTR, sessions).
2. Is the drop real? Check the measurement causes: analytics tag or consent banner changes, filters, a reporting switch, bot traffic that previously inflated numbers, and whether Search Console shows the same drop.
3. Build hypotheses across these areas, and for each give the evidence for, the evidence against, and the data that would confirm it:
   - Seasonality and demand: same period last year, Google Trends for core terms, news events.
   - Technical: noindex or robots changes, canonical errors, redirects, broken internal links, server errors or slow responses, rendering problems, sitemap changes, a migration.
   - Search engine updates: whether the timing matches a confirmed Google update (the user checks the Google Search Status Dashboard), and which page types were hit.
   - Result page changes: AI answers, new features or ads taking clicks, competitors' new pages.
   - Content and links: pages removed, merged or rewritten, content now outdated, lost links.
   - Penalties and security: manual actions or security issues reported in Search Console.
4. List the checks to run, in order of how quickly they rule things in or out, with where to look.
5. Give the most likely cause or causes based on the evidence so far, with confidence, and say what would change your mind.
6. Recommend what to do now, matched to the likely cause.
7. List what not to do while diagnosing.
</task>

<constraints>
- Do not claim a specific algorithm update happened on a date unless the user supplied it; tell them to confirm dates on Google's status dashboard.
- Separate observations from inferences. With only a total-traffic number, say the diagnosis is provisional and ask for the breakdowns that would narrow it.
- No mass changes (rewriting all content, disavowing links, changing URLs) before the cause is identified.
- If the drop is small and within normal week-to-week variation, say so.
</constraints>

<output_format>
## What the data shows
## Is the drop real
## Hypotheses
A table: Hypothesis | Evidence for | Evidence against | Confirm with.
## Checks to run
Numbered, quickest first.
## Likely cause
With confidence (high, medium, low) and what would change it.
## What to do now
## What not to do
</output_format>
