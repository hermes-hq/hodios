---
schema: 1
id: decide-post-boost
kind: prompt
title: Decide whether to boost a post
description: Decides whether a small business should pay to boost a social post and, if so, sets the goal, radius, audience, budget, duration and the result that justifies boosting again.
category: advertising
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, content-creator, individual]
subject: [retail, hospitality]
requires: [none]
inputs: [text]
output: [plan, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [boosted-posts, local-radius, first-ad-spend, small-budget, social-promotion]
pairs_with:
  prompts: [plan-local-advertising, write-social-ad-variations, target-slow-day-ads]
  personas: [local-ads-advisor]
args:
  - name: post
    description: The post text, what the image or video shows, when it went up, and how it did unpaid (likes, comments, shares, saves, messages, link clicks). Paste the numbers you can see.
    type: text
    required: true
  - name: goal
    description: What you want the boost to bring, in plain words (for example "more bookings for Thursday nights", "people to visit the new shop", "followers").
    type: string
    required: true
  - name: budget
    description: What you could spend, for example "30 EUR" or "up to 50 GBP this month". Optional; a small test amount is suggested if empty.
    type: string
output_contract:
  format: markdown
  sections: [Verdict, Why, Boost settings, What counts as worth it, Better option]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The user runs a shop, cafe, trade or small creator business and is looking at the "Boost" button for the first time. Boosting is a shortcut: it uses the post as the ad, with fewer targeting and optimisation choices than a full ads manager campaign. It works well for reach and engagement with people nearby, and badly when the real goal is sales, bookings or leads tracked on a website, because the boost will optimise for whatever is cheapest (likes, often from people who will never visit). Three mistakes waste most first boosts: boosting a post that did not interest followers unpaid, boosting with no specific action in mind, and choosing a wide audience far outside the area customers can reach.

Goal: {{goal}}
{{#budget}}Budget: {{budget}}{{/budget}}
</context>

<task>
<post>
{{post}}
</post>

1. If you cannot tell what the business sells, where its customers are, or what the post is, ask for those in one message and stop.
2. Judge the post: does it already show signs of interest unpaid (comments, shares, saves or messages above the account's usual level), is it clear to a stranger with no context, does it show the place, product or price, and does it ask for one action? A post that flopped with followers rarely improves with money.
3. Match the goal to what a boost can do. Reach, local awareness, profile visits, messages and event responses suit a boost. Website sales, booking forms, lead quality and anything needing conversion tracking suit a proper campaign; say so.
4. Decide: Boost, Boost after a fix (name the fix), or Do not boost. Give the deciding reason in one line.
5. If boosting: the button or objective to pick (messages, calls, profile visits or website visits, never "engagement" when the goal is customers), the radius in km or miles based on how far customers actually travel, age range only if the product requires it, a few interests at most, budget per day and duration (usually 3 to 7 days; enough for the platform to show it to a few thousand local people), and when to run it relative to the opening hours or the event.
6. Set the one result that would justify boosting again, as a number the owner can count: messages, calls, mentions at the till ("saw your post"), a code redeemed, or visits. Give a simple way to count it.
</task>

<constraints>
- Do not invent prices, reach or cost figures; any reach estimate is the platform's, to read on the boost screen before paying.
- Do not recommend targeting by sensitive personal traits, and say that housing, job and credit offers have restricted targeting.
- Keep the plan to settings a beginner can find; no jargon without a plain explanation.
- If the budget is so small the result could not be told apart from normal days, say so and suggest putting the money into a better post or a direct offer instead.
</constraints>

<output_format>
## Verdict
Boost, Boost after a fix, or Do not boost, and the reason in one line.

## Why
Three to five bullets on the post and the goal.

## Boost settings
A table: Setting | Choice | Why. Rows for button or objective, area and radius, audience, daily budget, duration, start time. Omit if not boosting.

## What counts as worth it
The one number to beat, how to count it, and when to check.

## Better option
When a proper campaign, an organic post or a direct offer would beat a boost here, in two to four lines.
</output_format>
