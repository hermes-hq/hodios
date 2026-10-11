---
schema: 1
id: run-creator-partnership-ads
kind: prompt
title: Run creator partnership ads
description: Plans brand-side partnership ads and Spark Ads run through creators' accounts, covering permissions, usage terms, disclosure, post selection, budgets and test rules.
category: advertising
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [marketer, founder, consultant]
requires: [none]
inputs: [text]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [partnership-ads, spark-ads, whitelisting, creator-content, usage-rights, ad-disclosure]
pairs_with:
  prompts: [write-creator-brief, evaluate-whitelisting-request, plan-tiktok-ads-campaign, analyze-creative-test-results]
  personas: [ad-creative-strategist, paid-media-specialist]
  workflows: [ad-campaign-launch-track]
args:
  - name: brand
    description: What you sell, target customer, platforms (Instagram, Facebook, TikTok), and paid social budget.
    type: text
    required: true
  - name: creators
    description: The creators you work with or plan to, their content so far (organic results if known), and what your agreement says about paid usage.
    type: text
    required: true
  - name: goal
    description: What the ads should achieve and the target cost per result.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Setup and permissions, Post selection, Campaign plan, Spend and test rules, Rights and disclosure, Creator terms checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The user is a brand that wants to run paid ads through creators' identities: Meta's partnership ads (where the ad shows both the creator and the brand) and TikTok Spark Ads (boosting a creator's or the brand's organic post with an authorisation code). These usually look more native and carry the creator's social proof, which often lowers costs compared with brand-handle ads. What experts know: permissions must be granted inside the platform by the creator and have durations and scopes, so the plan needs a request and renewal routine; the contract must cover paid usage, duration, territories, whether the brand can edit or create new ads from the content, and exclusivity, separately from the organic post fee; organic performance (hold rate, saves, comments) is a decent first filter for which posts to put money behind; disclosure labels are required by platforms and advertising rules; comments on boosted posts appear on the creator's content, so moderation must be agreed; and creator ads should be tested against the brand's own ads and each other, not assumed to win.
</context>

<task>
Brand: {{brand}}
Creators: {{creators}}
Goal: {{goal}}

1. Setup and permissions: for each platform, the steps the creator and brand each take (connecting accounts, granting partnership or ad authorisation, codes or approvals), how long access lasts, and a tracker for expiry dates. Tell the user to confirm the current steps in each platform's help.
2. Post selection: criteria for which posts to boost (organic hold rate, comments that show purchase intent, clear product use, hook in the first seconds), and when to commission new content made for ads instead.
3. Campaign plan: campaigns or ad sets for testing creator posts versus brand ads, audiences, optimisation event, and how many creator ads to run at once.
4. Spend and test rules: test budget per post, the result that promotes a post to scale, when to pause, and how to rotate creators to avoid fatigue.
5. Rights and disclosure: the paid partnership or branded content label, disclosure in captions, what claims creators can make (only true, substantiated ones), and comment moderation.
6. Creator terms checklist: items the agreement must cover for paid use (usage period, platforms, territories, edits and cut-downs, whitelisting or partnership access, exclusivity, fees for paid usage, renewal, takedown).
</task>

<constraints>
- Do not quote usage-right fees, platform permission durations or ad specs as fact; tell the user to check platform help and agree fees with the creator.
- Do not suggest running ads from a creator's identity without written agreement and in-platform permission.
- Do not plan undisclosed paid content.
- This is not legal advice; recommend having the creator agreement reviewed where the stakes justify it.
</constraints>

<output_format>
## Setup and permissions
Numbered steps per platform and an access tracker table: Creator | Platform | Access type | Granted | Expires.

## Post selection
Criteria checklist.

## Campaign plan
A table: Campaign or ad set | Ads | Audience | Optimisation event | Budget.

## Spend and test rules
Bullets.

## Rights and disclosure
Bullets.

## Creator terms checklist
Checklist.
</output_format>
