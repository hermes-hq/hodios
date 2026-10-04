---
schema: 1
id: plan-mobile-app-launch
kind: prompt
title: Plan a mobile app launch
description: Plans a mobile app launch with store readiness, beta testing, a phased rollout with halt rules, review prompts, crash monitoring, support readiness and the first-week metrics to watch.
category: product-launch
version: 1.0.0
status: incubating
stage: [plan, ship]
role: [product-manager, founder, mobile-engineer, marketer]
stack: [ios, android]
inputs: [notes, text]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [app-store, staged-rollout, crash-monitoring, app-reviews, launch-checklist]
pairs_with:
  prompts: [plan-product-launch, write-launch-announcement, plan-beta-program, write-in-app-announcement]
args:
  - name: app
    description: What the app does, who it is for, whether this is a first release or a major update, the team, how it makes money, and what already exists (a web product, a waiting list, an existing app).
    type: text
    required: true
  - name: platforms
    description: Which app stores you are launching on.
    type: enum
    enum: [ios, android, both]
    default: both
  - name: launch_date
    description: The planned public launch date, and whether it is fixed (tied to an event or campaign) or flexible.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Launch summary, Timeline, Store readiness, Beta, Phased rollout, Review prompts, Monitoring, Support readiness, Launch day, First-week metrics, Risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a mobile product lead who has shipped consumer and business apps on both major app stores. Mobile launches differ from web launches in ways that catch teams out: store review can take days and can reject a build, a bad release cannot be rolled back instantly (only halted or replaced by a new build that must be reviewed again), users on old versions stay on them, early ratings stick to the listing, and crashes on devices nobody tested show up only at scale. Store rules, review times and required disclosures change often, so every rule-dependent step must be checked against the store's current guidelines.
</context>

<task>
Plan the launch of this app on {{platforms}} for {{launch_date}}.

<app>
{{app}}
</app>

1. If the app description does not say what the app does or whether this is a first release or an update, ask and stop.
2. Launch summary: the goal of the launch in one or two sentences, the audience, and whether {{launch_date}} looks realistic given the work below. Say plainly if it does not.
3. Timeline: working back from {{launch_date}}, the milestones (feature freeze, beta start, store submission with a buffer for review and possible rejection, rollout start, public announcement). Put the announcement after the build is approved and live, not before.
4. Store readiness: listing name, subtitle and description, keywords, screenshots and preview video, privacy disclosures and data-collection labels, age rating, support and privacy policy URLs, account deletion if the app has accounts, test account and notes for the store reviewer, in-app purchase or subscription setup, and localisation if relevant. Mark each item "check current store guidelines" where rules apply.
5. Beta: the store-provided testing tracks, how many testers and from where, what to ask them, and the exit criteria for leaving beta.
6. Phased rollout: the platform's staged or phased release options, the percentages and timing, and explicit halt rules (for example crash-free sessions below the team's threshold, a spike in a specific error, a payment failure). Include the hotfix path and its review time.
7. Review prompts: use only the platform's official in-app review request, ask after a moment of success rather than on first launch, respect the platform's limits on how often it appears, and never offer incentives for reviews or route only happy users to the store. Plan how the team will reply to reviews in the first two weeks.
8. Monitoring: crash and performance reporting, analytics events for the key funnel (install, open, sign-up, first key action), backend capacity, and alerting with an owner on call during rollout.
9. Support readiness: help articles, known issues, canned replies, a way for users to report bugs in the app, and how support escalates to engineering.
10. Launch day: an hour-by-hour runbook for the first day with owners.
11. First-week metrics: what to watch daily (crash-free rate, activation, day-1 retention, rating and review themes, store conversion from listing views, support volume) and the decision each might trigger.
12. Risks: the five most likely ways this launch goes wrong and the mitigation for each.
13. Before replying, check that the timeline leaves review buffer for every store being launched and that no step depends on a rollback the stores do not allow.
</task>

<constraints>
- Do not state specific review times, fees, percentages or policy details as fact; describe them in general terms and tell the team to confirm in the current store documentation.
- Do not invent metrics targets; propose how to set them from the team's baseline, or mark them `[set target]`.
- No tactics that break store rules: incentivised or fake reviews, review gating, keyword stuffing, misleading screenshots.
</constraints>

<output_format>
## Launch summary
## Timeline
A table: Date | Milestone | Owner.
## Store readiness
A checklist per store.
## Beta
## Phased rollout
Stages, then halt rules.
## Review prompts
## Monitoring
## Support readiness
## Launch day
A table: Time | Action | Owner.
## First-week metrics
A table: Metric | Watch for | Decision it triggers.
## Risks
</output_format>
