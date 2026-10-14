---
schema: 1
id: diagnose-cpa-spike
kind: prompt
title: Diagnose a sudden CPA spike
description: Finds why ad cost per acquisition suddenly jumped by checking tracking, reporting lag, account changes, learning resets, auction, creative, site and seasonality in order of likelihood.
category: advertising
version: 1.0.0
status: incubating
stage: [operate, review]
role: [marketer, founder, consultant]
requires: [none]
inputs: [dataset, text]
output: [report, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [cpa, performance-drop, root-cause, change-history, conversion-rate, cost-decomposition]
pairs_with:
  prompts: [analyze-ad-performance, diagnose-ad-fatigue, choose-bidding-strategy, check-ad-landing-message-match]
  personas: [paid-media-specialist, local-ads-advisor]
  workflows: [ad-account-turnaround-track]
args:
  - name: metrics
    description: Before and after numbers (daily or weekly) for spend, impressions, CPM, clicks, CTR, CPC, conversions, conversion rate and CPA, ideally per campaign. Include the date the spike started.
    type: text
    required: true
  - name: platform
    description: Ad platform and campaign types affected.
    type: string
    required: true
  - name: changes
    description: Anything that changed around that time (change history, budgets, bids, new ads, site releases, checkout, prices, stock, promotions, competitors). Optional.
    type: text
  - name: backend_data
    description: Orders or leads in your own system for the same days, to compare with the platform. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Most likely cause, Checks in order, Evidence table, Fix now, Prevent next time]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The user's cost per acquisition has jumped and they need to know why before they change anything. Panic edits (cutting budgets, swapping bids, pausing everything) often make it worse by resetting learning. What experts know: decompose CPA into CPM, CTR and conversion rate (CPA = CPM / 1000 / CTR / conversion rate, or CPC divided by conversion rate) to see which link broke; then check causes in order of how often they explain sudden jumps: tracking broke or double-counting stopped (platform conversions fell but backend sales did not); reporting lag makes the last few days look bad; an account change (budget jump, bid target change, new campaign, edits) reset learning; auction pressure (CPM up across campaigns, seasonal peaks, a competitor); creative fatigue (CTR decaying on the main ad); the site or offer (conversion rate down: slow page, broken form or checkout, out of stock, price change, shipping change); and platform-side issues. One cause usually dominates, but two can coincide.
</context>

<task>
Platform: {{platform}}
<metrics>
{{metrics}}
</metrics>
{{#changes}}Changes: {{changes}}{{/changes}}
{{#backend_data}}Backend data: {{backend_data}}{{/backend_data}}

1. Decompose the CPA change into CPM, CTR (or CPC) and conversion rate changes, with the percentage contribution of each. Do this per campaign if data allows.
2. Walk through the checks in order: tracking and backend comparison, reporting lag, account changes and learning, auction, creative, site and offer, seasonality, platform issues. For each, state what the data shows, verdict (likely, possible, ruled out) and the extra check needed.
3. Name the most likely cause with confidence level, and a second if two causes overlap.
4. Fix now: the specific actions for the likely cause, and actions to avoid (for example not touching budgets during learning, not pausing campaigns because of lagged data).
5. Prevent next time: alerts, change logs, staged edits, and tracking checks.
</task>

<constraints>
- Show the decomposition arithmetic. Do not invent missing numbers; say what data would settle a check.
- Do not recommend several big changes at once; one change, then observe.
- Do not blame the platform's algorithm without evidence; say when the data cannot distinguish causes.
</constraints>

<output_format>
## Most likely cause
Two to four lines with confidence.

## Checks in order
Numbered list: check, finding, verdict, next step if unsure.

## Evidence table
A table: Metric | Before | After | Change | What it points to.

## Fix now
Actions and actions to avoid.

## Prevent next time
Checklist.
</output_format>
