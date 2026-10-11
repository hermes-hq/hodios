---
schema: 1
id: plan-tiktok-ads-campaign
kind: prompt
title: Plan a TikTok ads campaign
description: Plans a TikTok ads campaign with objective and optimisation event, automated versus manual setup, targeting, creative volume, Spark Ads, tracking and early optimisation rules.
category: advertising
version: 1.0.0
status: incubating
stage: [plan]
role: [marketer, founder, content-creator]
requires: [none]
inputs: [text]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
stack: [tiktok]
tags: [spark-ads, creative-volume, learning-phase, events-api, short-form-video]
pairs_with:
  prompts: [write-video-ad-script, write-social-ad-variations, plan-ad-creative-tests, write-creator-brief]
  personas: [ad-creative-strategist, paid-media-specialist]
  workflows: [ad-campaign-launch-track]
args:
  - name: business
    description: What you sell, price point, who buys, countries, and where the sale happens (own site, TikTok Shop, app, lead form).
    type: text
    required: true
  - name: goal
    description: The result you want and any target cost per result or ROAS.
    type: string
    required: true
  - name: budget
    description: Monthly or daily budget and currency.
    type: string
    required: true
  - name: creative_capacity
    description: How many short videos you can produce per week or month, and whether you work with creators.
    type: string
  - name: tracking
    description: Pixel and Events API status, events firing, and attribution tool if any. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Fit check, Campaign setup, Targeting, Creative plan, Tracking, First two weeks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The user wants to advertise on TikTok. TikTok is creative-led: the targeting matters less than the video, and ads that look like ads get skipped in the first seconds. What experts know: creative fatigues faster than on most platforms, so the plan must be sized to how many videos the user can make; native-looking content (people talking to camera, demos, reactions, trends adapted to the product) outperforms polished brand films; Spark Ads, which run organic posts from the brand's or a creator's account, keep social proof and usually look more native; automated campaign options (TikTok calls the current one Smart+) work when tracking is clean and creative is plentiful, while manual campaigns help when testing specific creative or audiences; the optimisation event must be fed enough volume per ad group, and frequent edits restart learning; the pixel plus server-side Events API improves match rates; and audience skews younger in many markets, so fit must be checked before spending.
</context>

<task>
Business: {{business}}
Goal: {{goal}}
Budget: {{budget}}
{{#creative_capacity}}Creative capacity: {{creative_capacity}}{{/creative_capacity}}
{{#tracking}}Tracking: {{tracking}}{{/tracking}}

1. Fit check: is the audience on TikTok, can the product be shown in a short video, and can the user supply enough creative? If creative capacity is very low, say so and size the plan down.
2. Campaign setup: objective, optimisation event (the deepest one the budget can feed), automated (Smart+) versus manual with the reason, number of campaigns and ad groups, budget level and bid strategy to start. If the user sells through TikTok Shop, note that shop-specific campaign types exist and should be checked.
3. Targeting: broad by default with location, age and language set honestly, custom audiences and lookalikes where data exists, and exclusions (purchasers, existing customers).
4. Creative plan: number of videos at launch and per week, hooks and formats to cover (talking head, demo, problem and solution, unboxing, comparison, creator testimonial), Spark Ads from brand or creator posts and the authorisation they need, captions and on-screen text, and when to replace a video.
5. Tracking: pixel events, Events API, deduplication, and what to verify before launch.
6. First two weeks: hands-off period, daily checks, and decision rules (for example, pause an ad that has spent a set multiple of the target cost per result without a conversion, keep winners and make variations of them). State the rules as starting points the user tunes to their numbers.
</task>

<constraints>
- Do not state TikTok minimum budgets, learning-phase thresholds, ad specs or policy as fact; describe them and point to TikTok's current Ads Manager help.
- Do not invent CPMs, CPAs or benchmarks; use labelled assumptions.
- Remind the user that ads must follow TikTok advertising policies and that creator content used as ads needs permission and disclosure.
- Do not plan targeting under-18s for age-restricted products.
</constraints>

<output_format>
## Fit check
Verdict and the main risk.

## Campaign setup
A table: Campaign | Objective | Optimisation event | Automated or manual | Budget.

## Targeting
Bullets per ad group with exclusions.

## Creative plan
A table: Video | Hook | Format | Source (brand, creator, Spark) | Launch week.

## Tracking
Checklist.

## First two weeks
Hands-off rules, daily checks, pause and scale rules.
</output_format>
