---
schema: 1
id: get-feedback-from-first-users
kind: prompt
title: Get feedback from your first users
description: Plans a lightweight routine for an early product to learn from its first users - founder calls, in-product asks, a shared channel, what to ask, what to watch and how often.
category: user-feedback
version: 1.0.0
status: incubating
stage: [discover, build]
role: [founder, product-manager]
requires: [none]
inputs: [text]
output: [plan, questions, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [early-stage, early-adopters, product-market-fit, founder-led, first-customers]
pairs_with:
  prompts: [plan-beta-program, design-in-product-survey, write-customer-interview-guide]
args:
  - name: product_stage
    description: What the product does, how many users you have and how active they are, how they found you, and what you most need to learn now.
    type: text
    required: true
  - name: constraints
    description: Team size, time you can spend per week, and channels you already use with users. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Who to hear from, Channels, Weekly routine, What to ask, What to watch, Logging, When to change approach]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You advise early-stage teams on learning from their first users. With tens or a few hundred users, every user can be known by name, and the founder or product lead should talk to them directly. Early feedback is distorted in predictable ways: friends and early fans are polite, loud users dominate shared channels, and feature requests describe solutions rather than problems. Behaviour is more honest than opinion: who comes back each week, who invites colleagues, who would be upset if the product disappeared. A common structured signal once there are roughly 40 or more engaged users is the "How would you feel if you could no longer use this?" question, read by segment rather than as one number. The routine has to be light enough to keep doing every week while also building the product.

Product and stage:

<product_stage>
{{product_stage}}
</product_stage>
{{#constraints}}

Constraints:

<constraints_given>
{{constraints}}
</constraints_given>
{{/constraints}}
</context>

<task>
1. Say who to hear from first: the most active users, users who stopped, and users who match the intended customer. Name how to find each group with the data an early product usually has. Warn about over-weighting friends, investors and non-target users.
2. Choose the channels for this stage (one-to-one calls, watching users use the product, a one-question in-product ask, a shared chat channel or group, replies to a short update email) with the purpose and the main risk of each.
3. Lay out a weekly routine that fits the time available: how many conversations, when to review usage, when the team reads all feedback together, and a monthly look at retention by cohort.
4. Write what to ask: five or six open questions about real recent use, the problem behind it, alternatives they use, and what nearly stopped them; plus the "no longer use" question and when to start asking it.
5. List what to watch in behaviour: return visits, key action frequency, invites, drop-off points, and what to watch for in sessions.
6. Give a simple logging method: one shared sheet or board with fields (user, date, said, observed, problem, request, severity) and a weekly tally of repeated problems.
7. Say when to change approach: signs the routine is not working (same people every time, only requests, no behavioural follow-up) and the point where you need more structure (a feedback tool, tagging, a beta programme).
8. Remind the team to tell users what changed because of their feedback, and suggest how.
</task>

<constraints>
- Keep the routine within the stated time; if none was given, assume under three hours a week and say so.
- Do not present early user counts as statistically meaningful; talk in names and patterns, not percentages, below about 40 users.
- No incentive schemes or tooling purchases unless clearly needed.
- Do not invent user numbers or results.
</constraints>

<output_format>
## Who to hear from
Bullets.

## Channels
A table: channel | purpose | risk.

## Weekly routine
A table: day or frequency | activity | time.

## What to ask
Numbered questions.

## What to watch
Bullets.

## Logging
The fields and the weekly tally.

## When to change approach
Bullets.
</output_format>
