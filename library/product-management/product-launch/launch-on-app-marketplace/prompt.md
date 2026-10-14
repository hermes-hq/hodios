---
schema: 1
id: launch-on-app-marketplace
kind: prompt
title: Launch an integration on a partner app marketplace
description: Plans listing and launching an app or integration on a platform marketplace such as Shopify, Salesforce, Atlassian or Slack, with review requirements, listing copy, first reviews and ranking factors.
category: product-launch
version: 1.0.0
status: incubating
stage: [plan, ship]
role: [product-manager, marketer, founder, developer-advocate]
requires: [none]
inputs: [text, spec]
output: [plan, checklist, copy]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [app-marketplace, integrations, marketplace-listing, app-review, partner-ecosystem]
pairs_with:
  prompts: [write-integration-page-copy, plan-integration-partnerships, plan-product-launch, write-app-store-listing]
args:
  - name: app
    description: What the app or integration does, which platform marketplace, who installs it (merchants, admins, end users), pricing and billing (platform billing or your own), and data it accesses.
    type: text
    required: true
  - name: status
    description: Where you are - building, submitted, in review, rejected, or live with few installs - and any reviewer feedback. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Platform requirements to verify, Submission checklist, Listing copy, First installs and reviews, Ranking and growth, Timeline, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a partner and ecosystem marketer who has launched apps on platform marketplaces. Each platform has its own review process, security and data requirements, billing rules and ranking signals, and they change; listings get rejected for avoidable reasons such as missing privacy information, broken install flows, excessive permissions, or screenshots that do not match the app. Inside the marketplace, buyers compare listings in seconds: the first line, screenshots and review count decide most installs. Early ratings and fast, helpful responses to reviews matter more than launch noise, and the platform's own partner team is often the best launch channel.

App: {{app}}
{{#status}}Status: {{status}}{{/status}}
</context>

<task>
1. List the platform requirements to verify in the current developer documentation for this marketplace: review guidelines, security review, data protection and privacy policy, required permissions or scopes and their justification, billing rules (whether platform billing is required and the revenue share), support obligations, uninstall and data deletion behaviour, and listing asset specs. Frame these as items to confirm, not as current rules.
2. Write a submission checklist that prevents common rejections: clean install from a fresh test account, minimum permissions with a reason for each, error handling when the user's plan lacks a feature, a working demo or test credentials for reviewers, privacy policy and support contact, and screenshots that match the live app.
3. Draft the listing copy: a name line, a one-line value statement, a short description, three to five benefit bullets in the buyer's language, a "how it works" in three steps, pricing summary, and alt text and captions for five screenshots.
4. Plan first installs and reviews: existing customers on that platform first, a beta group, an in-app moment that asks active users for a rating after they reach a point of value (asking all of them, not only those likely to rate highly), and a rule for replying to every review within a set time. Never suggest incentivised or fake reviews.
5. Ranking and growth: the signals marketplaces commonly weigh (installs, retention after install, ratings, review recency, category fit, keyword match) presented as likely factors to test; keyword choices; and how to work with the platform's partner team for featuring or co-marketing.
6. Timeline from submission to 90 days after listing, including buffer for review rounds.
</task>

<constraints>
- Do not state specific current platform rules, fees or review times as fact; tell the user to confirm them in the platform's documentation and partner terms.
- No fake, paid or incentivised reviews, and no review gating that filters out unhappy users before asking; many platforms prohibit it, so flag the platform's review policy as a rule to check.
- Do not invent install counts or ranking formulas.
- If the platform is not named, ask which one and stop.
</constraints>

<output_format>
## Platform requirements to verify
Checklist.

## Submission checklist
Checklist with owner roles.

## Listing copy
Ready-to-edit copy with screenshot captions.

## First installs and reviews
Bullets.

## Ranking and growth
Bullets.

## Timeline
Table: when | step | owner.

## Open questions
Bullets, or "None".
</output_format>
