---
schema: 1
id: plan-device-and-browser-matrix
kind: prompt
title: Plan a device and browser test matrix
description: Chooses which devices, OS versions, browsers and screen sizes to test from usage analytics and risk, split into must-test, sampled and emulator-only tiers. Use before a release cycle.
category: testing
version: 1.0.0
status: incubating
stage: [plan, verify]
role: [qa-engineer, mobile-engineer, frontend-engineer, tech-lead]
requires: [none]
inputs: [dataset, text]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [device-matrix, cross-browser, device-farm, compatibility-testing, test-coverage]
pairs_with:
  prompts: [write-test-plan, write-native-ui-tests, write-e2e-test]
args:
  - name: app_type
    description: What you ship.
    type: enum
    enum: [web, ios, android, cross-platform]
    required: true
  - name: usage_data
    description: Analytics exports or rough shares by browser and version, OS version, device model, screen size and country. Paste what you have; "none yet" is fine.
    type: text
    default: "none provided"
  - name: budget
    description: Testing capacity - devices on hand, device-farm minutes or money per month, tester hours per release, and release frequency.
    type: string
    default: "not stated; size a minimal and a recommended option"
output_contract:
  format: markdown
  sections: [Coverage target, Matrix, Why these, Time and cost, Review triggers]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The user leads QA for a {{app_type}} product and must decide where to spend limited device and browser testing. Testing everything is impossible; testing only the team's own new phones and latest Chrome misses the users who struggle most. Good matrices are driven by real usage weighted by risk: older OS versions with different permission or WebView behaviour, low-memory Android devices, small and very large screens, WebKit behind most iOS browsers (Chrome on iOS is not Chrome on Android), tablets and foldables if the layout adapts, and the browsers that business customers are locked into.

Usage data: {{usage_data}}. Budget: {{budget}}.
</context>

<task>
1. Set a coverage target: the share of active users the must-test tier should represent (a common target is 80-90% of sessions), and the minimum supported versions. If usage data is missing, say which report to pull (browser and OS version, device model, viewport, by sessions or revenue), and build a provisional matrix from public-knowledge defaults labelled [VERIFY WITH YOUR DATA].
2. Group the data into dimensions that change behaviour: rendering engine and major version (Blink, WebKit, Gecko), OS major version, screen size class, device performance class (low, mid, high RAM and CPU), input type (touch, mouse, keyboard, screen reader), and locale or right-to-left if relevant. Merge versions that behave the same.
3. Rank combinations by usage share multiplied by risk; add high-risk low-share items deliberately (oldest supported OS, a low-end Android device, an iPhone SE-size screen, Safari on iOS, a tablet, a screen reader).
4. Split into tiers:
   - Tier 1 must-test on real devices or real browsers every release (about 3-6 configurations).
   - Tier 2 sampled: rotated across releases or covered by automated runs in a cloud device or browser farm.
   - Tier 3 emulator or simulator only, or responsive checks for layout.
   - Unsupported: stated explicitly, with the message users see if any.
   For cross-platform apps, build the tiers per OS (Android and iOS side by side) and add the WebView or embedded browser version if any screens are web content.
5. Map test types to tiers: full regression on tier 1, smoke and automated suites on tier 2, layout checks on tier 3.
6. Size the time and cost: hours per release per tier and device-farm minutes, compared with the budget; give a minimal and a recommended option if the budget is unclear. Do not quote prices; give the quantities to price.
7. Say when to revisit the matrix: each quarter, a new major OS or browser release, a usage shift above a threshold (for example a configuration crossing 5% of sessions), or a crash spike on one device family.

If any of these are missing, do not invent them: mark them [X] in the matrix, state the assumption you sized with, and ask for them in a short "Questions" line at the end of Time and cost: the minimum supported OS or browser versions, the release frequency (to turn monthly farm minutes into per-release capacity), and the devices the team already owns.
</task>

<constraints>
- Never present usage shares or device statistics as fact without the user's data; label defaults [VERIFY WITH YOUR DATA].
- Do not quote device-farm prices; give quantities to price.
- Keep tier 1 small enough to run every release within the budget.
</constraints>

<output_format>
## Coverage target
Two or three sentences with the target share and minimum versions.
## Matrix
Table: tier | platform or browser | version | device or viewport | why it is in | share of usage.
## Why these
Bullets for each deliberate high-risk inclusion and each notable exclusion.
## Time and cost
Table: tier | test type | hours per release | farm minutes per release. Then the comparison with the budget.
## Review triggers
Bullets.
</output_format>
