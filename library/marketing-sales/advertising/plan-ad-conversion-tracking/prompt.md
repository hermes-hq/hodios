---
schema: 1
id: plan-ad-conversion-tracking
kind: prompt
title: Plan ad conversion tracking
description: Plans conversion tracking for a small business's ads, covering which actions count, values, primary versus secondary goals, call tracking, offline uploads, consent effects and a test checklist.
category: advertising
version: 1.0.0
status: incubating
stage: [plan, verify]
role: [founder, marketer, consultant]
requires: [none]
inputs: [text]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [conversion-tracking, call-tracking, offline-conversions, consent-mode, conversion-values, measurement-plan]
pairs_with:
  prompts: [audit-search-ads-account, analyze-ad-performance, audit-website-privacy-compliance]
  personas: [local-ads-advisor, paid-media-specialist]
  workflows: [first-search-campaign-track]
args:
  - name: business
    description: What you sell, how customers buy (online checkout, booking form, phone call, quote then job, walk-in), average sale or job value, how many of each enquiry type turn into sales, and the website platform and booking or CRM tools you use.
    type: text
    required: true
  - name: conversion_actions
    description: The actions people take after clicking an ad that you can think of (calls, forms, bookings, purchases, chats, directions, sign-ups), and anything you already track.
    type: text
    required: true
  - name: platforms
    description: The ad platforms in use or planned, for example "Google Ads and Meta". Optional; the plan stays platform-neutral if empty.
    type: string
output_contract:
  format: markdown
  sections: [What to optimise for, Conversion map, Call and offline tracking, Consent and data gaps, Test checklist]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The user runs or is setting up ads for a small business and needs to know what to track before spending more. Ad platforms optimise toward whatever is marked as a conversion, so the choice decides who the ads find. Small-business tracking breaks in familiar ways: page views or button clicks counted as leads; every action marked primary so the platform chases cheap clicks on a phone number; calls not tracked at all in businesses where most customers phone; duplicate counting when a thank-you page reloads or two tags fire; no way to tell which leads became paying jobs; and consent banners that silently drop a share of conversions in regions that require consent.
</context>

<task>
<business>
{{business}}
</business>

<conversion_actions>
{{conversion_actions}}
</conversion_actions>

{{#platforms}}Platforms: {{platforms}}{{/platforms}}

1. If you cannot tell how customers buy, the average value, or the website and booking tools, ask in one message and stop.
2. What to optimise for: the one or two actions closest to revenue that happen often enough to optimise on (as a rule of thumb, tens per month per campaign). If true sales are too rare, pick a qualified step (booked appointment, call over 60 seconds) and explain the trade-off.
3. Conversion map: each action with how it is detected (thank-you page, form submit event, booking tool callback, call tracking number, purchase event with value), whether it is primary (used for bidding) or secondary (observed only), a value (sale value for purchases; for leads, average job value times close rate), and the counting rule (every conversion for purchases, one per click for leads).
4. Calls: tracked numbers on the site and in call ads or extensions, a minimum call length to count, how to handle existing printed numbers, and recording or disclosure duties to check.
5. Offline: how to feed back which leads became sales (click ID captured in a hidden form field or CRM, a weekly or monthly upload), and a simpler fallback (a source column in a spreadsheet) for owners without a CRM.
6. Consent and data gaps: where consent is required, untracked conversions shrink reported results; explain modelled conversions in plain words, what share of data may be missing, and that the banner must still give a real choice.
7. Test checklist: test conversions for every action, no duplicates on reload, values passed correctly, cross-domain or booking-tool redirects, and a monthly comparison of platform conversions with the business's own records (a gap over about 20 to 30% means something is broken or miscounted).
</task>

<constraints>
- Stay platform-neutral unless platforms are named; when naming settings, say they should be confirmed against the platform's current help pages.
- Do not invent close rates or values; use the user's figures or mark [NEEDED].
- Do not suggest tracking that collects personal data without a lawful basis or consent where it is required; for privacy-law questions, say a privacy professional should confirm.
- Prefer the fewest actions that answer the business question; flag tracking that would add noise.
</constraints>

<output_format>
## What to optimise for
The primary action(s) and the reason, in three to five lines.

## Conversion map
A table: Action | How detected | Primary or secondary | Value | Counting | Notes.

## Call and offline tracking
Bullets for calls, then for offline feedback.

## Consent and data gaps
Bullets.

## Test checklist
A checklist the owner or developer can tick.
</output_format>
