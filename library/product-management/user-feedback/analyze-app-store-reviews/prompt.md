---
schema: 1
id: analyze-app-store-reviews
kind: prompt
title: Analyse app store reviews
description: Analyses app store reviews by app version, platform, rating and theme to separate release bugs from lasting product complaints, explain rating changes and pick reviews worth a reply.
category: user-feedback
version: 1.0.0
status: incubating
stage: [review, operate]
role: [product-manager, mobile-engineer, support-agent, marketer]
requires: [none]
inputs: [dataset, text]
output: [table, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [app-reviews, star-ratings, mobile-app, release-quality, review-replies, ios-and-android]
pairs_with:
  prompts: [analyze-user-feedback, define-mobile-app-kpis, detect-emerging-feedback-issue, plan-mobile-app-launch]
args:
  - name: reviews
    description: Reviews with date, star rating, platform, app version, country or language, and text. An export from the store consoles is ideal.
    type: text
    required: true
  - name: app_context
    description: What the app does, recent releases and what changed, whether and when the app asks users for ratings, and the question you want answered.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Rating picture, Themes by rating, Release issues versus lasting complaints, Platform and country differences, Reviews worth a reply, Actions, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You analyse public app store reviews. They have their own quirks. The rating a store shows mixes old and new reviews, while what matters is the trend by app version. In-app rating prompts shape who reviews: a prompt after a success moment brings a wave of short five-star reviews, and removing it makes the average drop with nothing else changed. One-star spikes usually follow a release (crashes, a forced login, a removed feature, a price change) and fade if fixed, while lasting complaints (missing features, pricing, ads) persist across versions. Platforms differ: the same feature can work on iOS and break on some Android devices. Reviews in other languages hold country-specific issues (payments, localisation). And reviewers are a small, self-selected group, so reviews show what bothers people, not how common it is.
</context>

<task>
<reviews>
{{reviews}}
</reviews>

<app_context>
{{app_context}}
</app_context>

1. Rating picture: average rating and count by app version and platform, and the trend. Note any change in rating prompts that would explain shifts.
2. Themes by rating: themes in one-to-two-star, three-star and four-to-five-star reviews, with counts and short quotes.
3. Release issues versus lasting complaints: for each negative theme, whether it starts with a specific version (release issue) or appears across versions (lasting complaint).
4. Platform and country differences: themes concentrated on one platform, device mention or country.
5. Reviews worth a reply: reviews where a reply could help (bug now fixed, misunderstanding, a workaround exists, a support route is needed), with a reply approach. Avoid replies that argue or promise features.
6. Actions: for engineering (release bugs with version and platform), for product (lasting complaints), and for the rating prompt if it is badly timed.
</task>

<constraints>
- Do not treat review counts as prevalence among all users; recommend checking crash data or analytics for release issues.
- Quote only text given and keep quotes short; no reviewer names.
- Do not suggest asking only happy users to review, offering incentives for ratings or other practices that break store rules or mislead.
- If version or date is missing, say which conclusions that prevents.
{{> output/uncertainty}}
</constraints>

<output_format>
## Rating picture
Table: version | platform | reviews | average rating.

## Themes by rating
Table: rating band | theme | count | quote.

## Release issues versus lasting complaints
Table: theme | first version seen | across versions? | type.

## Platform and country differences
Bullets.

## Reviews worth a reply
Table: review summary | reason to reply | reply approach.

## Actions
Grouped by engineering, product, rating prompt.

## Questions
What to confirm.
</output_format>
