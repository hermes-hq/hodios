---
schema: 1
id: define-mobile-app-kpis
kind: prompt
title: Define mobile app KPIs
description: Defines KPIs for a mobile app - installs to activation, day 1, 7 and 30 retention, crash-free users, store rating, notification opt-in and uninstalls - with formulas, platform splits and data sources.
category: product-metrics
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [product-manager, mobile-engineer, founder, marketer]
requires: [none]
inputs: [text]
output: [table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [mobile-app, app-retention, crash-free-rate, app-store-rating, push-opt-in, ios-and-android]
pairs_with:
  prompts: [define-north-star-metric, define-activation-metric, define-guardrail-metrics, write-tracking-plan]
args:
  - name: app
    description: What the app does, platforms (iOS, Android, both), business model (subscription, ads, in-app purchases, companion to a service), and whether there is also a web product.
    type: text
    required: true
  - name: current_measurement
    description: Optional. Analytics, crash reporting and store consoles you use, and figures you already track.
    type: text
output_contract:
  format: markdown
  sections: [KPI set, Definitions and sources, Platform and version splits, Measurement gaps, Review rhythm, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You define KPIs for a mobile app. Mobile differs from web in ways that change the metrics. Installs are not users: many installs never open the app, and reinstalls inflate counts. Store consoles, analytics tools and attribution tools all count installs and users differently, so each KPI needs one named source. Retention is usually tracked as day 1, 7 and 30 by install cohort, but the right horizon depends on the app's natural use. Quality shows in crash-free users and sessions, app-not-responding rates on Android, and store ratings, which react to specific releases, so metrics need splitting by app version. Platform privacy rules limit tracking (for example consent prompts for cross-app tracking), so attribution and some funnels are partial by design. Notification opt-in rate and uninstalls after notifications matter because the channel is easy to lose.

{{#current_measurement}}
<current_measurement>
{{current_measurement}}
</current_measurement>
{{/current_measurement}}
</context>

<task>
<app>
{{app}}
</app>

1. KPI set: 6-10 KPIs grouped as acquisition (installs to first open), activation, retention (cohort days chosen to fit the use rhythm), engagement, monetisation (fit to the model), quality (crash-free users, ANR rate on Android, store rating trend), and channel health (notification opt-in, uninstall rate). Mark the one or two to lead with.
2. Definitions and sources: exact formula, unit, window, and the one source of truth for each KPI, noting where store consoles and analytics will disagree and why.
3. Platform and version splits: which KPIs must be split by platform, app version, device class or country, and why.
4. Measurement gaps: what privacy rules, consent and SDK limits make unobservable or partial, and how to cope (modelled attribution, aggregated reports, surveys).
5. Review rhythm: what to watch daily during a release rollout (crash-free, ratings, ANR), weekly and monthly, with an alert threshold suggestion marked as a starting point.
</task>

<constraints>
- Do not invent current figures or industry benchmarks; thresholds are starting points to calibrate on the app's own history.
- Do not suggest tracking that bypasses platform consent rules or collects identifiers without consent.
- Fit monetisation KPIs to the stated business model only.
- If the app's purpose or platforms are unclear, ask and stop.
</constraints>

<output_format>
## KPI set
Table: group | KPI | lead or supporting.

## Definitions and sources
Table: KPI | formula | unit and window | source of truth | known discrepancies.

## Platform and version splits
Bullets.

## Measurement gaps
Bullets with the coping method.

## Review rhythm
Table: cadence | KPIs | starting alert threshold.

## Questions
What to confirm.
</output_format>
