---
schema: 1
id: plan-weekly-promotion-routine
kind: prompt
title: Plan a weekly promotion routine
description: Builds a small-hours weekly marketing routine for a solo owner - the few activities with the best return for their business, a weekly checklist and a 15-minute monthly review.
category: marketing-strategy
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [founder, consultant, individual]
requires: [none]
inputs: [text]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [marketing-routine, solo-owner, time-boxing, past-customers, review-requests]
pairs_with:
  prompts: [choose-marketing-channels, write-local-business-profile, ask-clients-for-referrals, plan-local-seo, design-attribution-survey]
  personas: [main-street-growth-advisor]
args:
  - name: business
    description: What you sell, typical price and how often customers buy again, where customers come from today (word of mouth, Google, social, walk-ins, repeat), and how they get in touch.
    type: text
    required: true
  - name: hours_per_week
    description: Hours per week you can honestly give to marketing.
    type: number
    default: 2
  - name: current_activities
    description: What you do now for marketing, how often, and what seems to work or not. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Where your customers come from, What to focus on, Weekly routine, Weekly checklist, Monthly 15-minute review, What to stop]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help solo owners, freelancers, tradespeople and market traders who do their own marketing in the gaps of a full working week. With a couple of hours a week, the danger is spreading effort across every channel and doing none of them well, or chasing new followers while the cheapest customers (past customers, referrals, people already searching for you) go untended. The routine that works is small, repeatable, booked into the diary like a job, and built around the two or three activities that match how this business actually gets customers. For most local and service businesses, those are asking for reviews after every job, staying in touch with past customers, keeping the search and map profile fresh, and replying fast to enquiries.

Time available: {{hours_per_week}} hours per week
</context>

<task>
<business>
{{business}}
</business>

{{#current_activities}}<current_activities>
{{current_activities}}
</current_activities>{{/current_activities}}

1. If you do not know what the business sells or how customers find it today, ask for that and stop.
2. Summarise where customers come from and which sources are cheapest to grow (repeat, referral, search). If unknown, say so and make tracking the first task.
3. Pick at most three focus activities that fit the hours and the business: for example review requests after each job, a monthly email or message to past customers, a weekly profile or social post with a recent job, calling lapsed customers, a referral ask, or one local partnership. Give the reason for each and the expected effect in plain terms, not invented numbers.
4. Turn them into a weekly routine that fits the hours: fixed time slots (for example 45 minutes Monday morning, 15 minutes after each job), batching (photograph jobs as you go, write four posts in one sitting), and templates to reuse.
5. Write a weekly checklist of five to eight ticks.
6. Write a monthly 15-minute review: enquiries by source, jobs or sales won, reviews gained, what to repeat, what to drop.
7. List what to stop or pause to free the time, with the reason.
</task>

<constraints>
- The routine must fit the stated hours; show the minutes per activity and the total.
- Use only supplied facts; no invented results, follower counts or response rates.
- Prefer channels the owner already has over new ones; add a new channel only if the current ones cannot reach the customers.
- Review requests must follow platform rules: ask every customer, never only happy ones, and never offer rewards for reviews.
- Messages to past customers need their consent where local rules require it; flag this.
</constraints>

<output_format>
## Where your customers come from
Three to five bullets.

## What to focus on
Up to three activities, each with why and what it should change.

## Weekly routine
Table: When | Activity | Minutes | Template or tool. Total row.

## Weekly checklist
Tick-box list.

## Monthly 15-minute review
Questions and the numbers to record.

## What to stop
Bullets with reasons.
</output_format>
