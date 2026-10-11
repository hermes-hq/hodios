---
schema: 1
id: plan-small-business-social-media
kind: prompt
title: Plan social media for a small business starting out
description: Plans social media for a small business starting out - which one or two platforms, three content pillars, a weekly rhythm the owner can keep, the first month of posts and what to measure.
category: social-media
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, marketer]
inputs: [text, preferences]
output: [plan, table, post]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [owner-run, platform-choice, posting-rhythm, first-month, local-customers]
pairs_with:
  prompts: [write-social-bio, write-local-business-facebook-posts, plan-sustainable-posting-schedule]
  personas: [social-media-manager]
args:
  - name: business
    description: What you sell, to whom, where (local, national, online), price level, how customers find you now, and what you can show (products, process, place, people).
    type: text
    required: true
  - name: time
    description: Hours per week you or your staff can realistically give to social media, and your comfort with photos, video and writing.
    type: string
    required: true
  - name: current
    description: "Optional: accounts you already have, follower counts, and what you have tried."
    type: text
output_contract:
  format: markdown
  sections: [Platform choice, Pillars, Weekly rhythm, First month, Profile setup, What to measure]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Small business owners usually start social media by opening accounts everywhere, posting daily for three weeks, and stopping. What works is narrower: one or two platforms where their customers already spend time (local services often do best on Facebook, Instagram and Google Business Profile; visual products on Instagram, Pinterest or TikTok; B2B services on LinkedIn), a rhythm sized to the hours they actually have, and a small set of pillars that show the product, the people and the proof. Short phone video of real work tends to outperform polished graphics. Replying to comments and messages quickly matters as much as posting. Followers are a weak measure; enquiries, bookings, saves and messages say more.

<business>
{{business}}
</business>
Time available: {{time}}
{{#current}}
<current>
{{current}}
</current>
{{/current}}
</context>

<task>
1. If the business or customers are unclear, ask one question and stop.
2. Platform choice: recommend one main platform and at most one secondary, with reasons tied to where these customers are and what the owner can produce. Say which to skip for now and why. Mention a Google Business Profile or equivalent map listing for local businesses.
3. Pillars: three pillars (for example product, behind the scenes, customer proof or local community), each with example post types.
4. Weekly rhythm: posts per week, formats and a batching routine that fits the stated hours, plus a daily ten-minute reply habit.
5. First month: a table of posts with week, pillar, format, idea and the hook line; write the first two posts in full.
6. Profile setup: bio points, profile photo, contact and booking details, highlights or pinned posts.
7. What to measure monthly: a few numbers tied to sales (enquiries, messages, bookings, link clicks, saves), and how to decide what to change.
</task>

<constraints>
- Do not promise follower or sales numbers.
- Do not invent products, prices, reviews or customer stories; use [ADD: ...] markers.
- Fit everything to the stated hours; if the plan needs more, cut it.
</constraints>

<output_format>
## Platform choice
Main, secondary, skip for now, with reasons.
## Pillars
Three bullets with example post types.
## Weekly rhythm
Bullets.
## First month
Table: Week | Pillar | Format | Idea | Hook; then the first two posts in full.
## Profile setup
Checklist.
## What to measure
Bullets.
</output_format>
