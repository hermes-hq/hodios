---
schema: 1
id: plan-app-install-campaign
kind: prompt
title: Plan an app install campaign
description: Plans paid app install campaigns on Google, Apple Ads and Meta with in-app events to optimise, store page assets, iOS and Android attribution, and CPI targets from user value.
category: advertising
version: 1.0.0
status: incubating
stage: [plan]
role: [marketer, founder, product-manager]
requires: [none]
inputs: [text]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [app-install, user-acquisition, skadnetwork, cost-per-install, app-store, mobile-attribution]
pairs_with:
  prompts: [plan-media-budget, plan-ad-creative-tests, write-video-ad-script, localize-app-store-listing]
  personas: [paid-media-specialist]
  workflows: [ad-campaign-launch-track]
args:
  - name: app
    description: What the app does, iOS, Android or both, countries, current organic installs per day, and store rating.
    type: text
    required: true
  - name: monetisation
    description: How the app makes money (subscription, in-app purchase, ads, marketplace fee), trial-to-paid rate, retention and average revenue per user if known.
    type: text
    required: true
  - name: budget
    description: Monthly budget and currency, and the payback period the business can accept.
    type: string
    required: true
  - name: measurement
    description: Analytics and attribution in place (mobile measurement partner, Firebase, SDKs), in-app events tracked, and consent prompts used. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Unit economics, Channel plan, Events and optimisation, Store assets, Attribution setup, Launch and readout]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The user wants paid installs for a mobile app. Installs are a vanity metric: cheap installs from people who never open the app twice burn money. What experts know: the target cost per install comes from what an installer is worth within the payback window, so it is derived, not picked; campaigns should optimise toward an in-app event that predicts value (trial start, registration, first purchase) once volume allows, starting with installs only when it does not; iOS attribution is limited by the App Tracking Transparency prompt and runs through Apple's privacy-preserving frameworks (SKAdNetwork and its successor AdAttributionKit), with delayed, aggregated postbacks, so conversion value mapping must be designed for the first days of use; a mobile measurement partner or the platforms' SDKs are needed to compare channels; Apple Ads (formerly Apple Search Ads) captures high-intent App Store searches, Google App campaigns span Search, Play, YouTube and display, and Meta app campaigns scale with creative; and the store page converts or loses the click, so screenshots, the first lines of the description and custom product pages per audience matter as much as the ads.
</context>

<task>
App: {{app}}
Monetisation: {{monetisation}}
Budget: {{budget}}
{{#measurement}}Measurement: {{measurement}}{{/measurement}}

1. Unit economics: from monetisation data, estimate revenue per install within the payback window (show the formula: install to activation to paying rate times revenue per payer over the window), and derive a maximum cost per install and a target cost per key event. Label every assumed rate. If key numbers are missing, give the formula and ask for them.
2. Channel plan: which of Apple Ads, Google App campaigns, Meta and any other channel to start with, in what order, with budget split and the reason (intent, scale, creative needs, OS mix).
3. Events and optimisation: the event funnel to track (install, open, registration, trial, purchase), which event each campaign optimises for at launch and when to move deeper, and the volume each needs to learn (tell the user to check each platform's current guidance).
4. Store assets: screenshot order and messages, preview video, first lines of the description, ratings and reviews health, and custom product pages or store listing experiments to match ad angles.
5. Attribution setup: SDK or mobile measurement partner, consent prompt timing and copy that explains the benefit honestly, iOS conversion value schema for the first days of use, deduplication between platform-reported and partner-reported installs, and deep links for retargeting.
6. Launch and readout: first 30 days by week, cohort metrics to read (day 1 and day 7 retention, cost per trial, cost per payer, early revenue), and rules for pausing, shifting and scaling.
</task>

<constraints>
- Do not invent CPIs, conversion rates or benchmarks; derive targets from the user's numbers or labelled assumptions.
- Platform features, attribution frameworks and privacy rules change; tell the user to confirm current options in each platform's docs and Apple's and Google's developer documentation.
- Do not suggest fingerprinting, incentivised installs disguised as organic, or ways around the tracking consent prompt.
- Judge campaigns on cohort value, not install counts.
</constraints>

<output_format>
## Unit economics
The formula, the inputs used, the resulting maximum CPI and target cost per key event.

## Channel plan
A table: Channel | Campaign type | Optimisation event | Budget share | Why.

## Events and optimisation
Event funnel and when to move each campaign to a deeper event.

## Store assets
Checklist with suggested screenshot sequence and custom page ideas.

## Attribution setup
Checklist covering SDK or partner, consent, iOS conversion values and deep links.

## Launch and readout
Week-by-week plan, cohort metrics and decision rules.
</output_format>
