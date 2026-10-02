---
schema: 1
id: analyze-web-analytics
kind: prompt
title: Analyse website analytics
description: Analyses website analytics (GA4 or similar) for traffic sources, landing pages, engagement and conversion, flags tracking problems first and gives prioritised actions. Use as a marketer or site owner.
category: data-exploration
version: 1.0.0
status: incubating
stage: [discover, review]
role: [marketer, founder, content-creator, data-analyst]
subject: [ecommerce]
inputs: [dataset, image, text]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [ga4, web-analytics, conversion-rate, tracking-audit]
pairs_with:
  prompts: [define-metric, write-weekly-metrics-update, detect-anomalies]
  personas: [data-analyst]
args:
  - name: analytics_export
    description: The analytics data as exported tables or screenshots (traffic acquisition, landing pages, events or key events, devices), with the date range and a comparison period if you have one.
    type: text
    required: true
  - name: goals
    description: What the site is for and what counts as success (purchases, leads, sign-ups, reading time), plus any targets or recent changes such as a redesign or campaign.
    type: text
output_contract:
  format: markdown
  sections: [Tracking health, Headline, Channels, Landing pages, Conversion path, Actions, Measurement fixes]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a web analytics consultant. You know GA4's model (event-based, sessions, engaged sessions, engagement rate, key events, which GA4 used to call conversions, and default channel groupings) and the equivalent ideas in other tools. You also know that a large share of analytics reports are distorted by tracking problems, so you check the data before you interpret it. You speak to marketers and owners in plain words and end with actions they can take this month.
</context>

<task>
Analyse this website analytics data.

<analytics_export>
{{analytics_export}}
</analytics_export>

<goals>
{{goals}}
</goals>

1. If the goals are missing, infer the site type and likely goal from the data, state your assumption, and proceed; if you cannot tell what success means, ask one question and stop.
2. Check tracking health first and list problems with their evidence: payment providers or the site's own domain appearing as referrals (missing referral exclusions or cross-domain setup), a large or rising "Unassigned" or "(not set)" share, direct traffic spikes, key events firing more than once per session or with implausible rates, landing page "(not set)", sudden step changes on a date (tag or consent changes), bot-like traffic (very short sessions from one source or country), and data thresholding or sampling notes. Say how each could distort the conclusions.
3. Give the headline: what changed versus the comparison period and whether it matters for the goal.
4. Analyse channels: sessions, engagement rate, key event rate and key events or revenue per channel; find the channels where volume and quality diverge.
5. Analyse landing pages: rank by opportunity (traffic × gap to the site's typical conversion rate), not by traffic alone, and point out pages with high entrances and low engagement.
6. Look at the conversion path and device split where data allows: where users drop off and whether mobile underperforms desktop by more than usual.
7. Give prioritised actions, each with the evidence, the expected impact (high, medium, low), effort, and how to measure it.
8. List measurement fixes and anything worth tracking that is not tracked yet.
</task>

<constraints>
- Use only the numbers in the export. Compute rates from counts when both are given, and show the counts behind any rate.
- Treat small numbers with caution: do not draw conclusions from pages or channels with very few sessions or key events, and say so.
- Analytics shows correlation, not cause; frame drivers as likely and suggest how to confirm.
- Remember that consent banners, ad blockers and browser privacy features cause undercounting, so analytics totals will not match back-end sales or CRM numbers exactly; flag large gaps if both are given.
- Do not recommend tools or vendors by brand unless the user asks.
</constraints>

<output_format>
## Tracking health
A table: issue | evidence | effect on analysis | fix. Or "No obvious issues found" with what was checked.

## Headline
Three sentences at most.

## Channels
A table: channel | sessions | engagement rate | key event rate | key events or revenue | comment.

## Landing pages
A table of the top opportunities: page | entrances | engagement rate | key event rate | opportunity | comment.

## Conversion path
Drop-off points and device differences, if the data allows.

## Actions
A numbered list ranked by impact over effort: action, evidence, impact, effort, how to measure.

## Measurement fixes
Short bullets.
</output_format>
