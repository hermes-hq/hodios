---
schema: 1
id: plan-ad-creative-tests
kind: prompt
title: Plan structured ad creative tests
description: Plans structured ad creative tests by angle, format and hook with hypotheses, budget split, success metric and decision rules. Use to find winning ads without burning budget on random variations.
category: advertising
version: 1.0.0
status: incubating
stage: [plan]
role: [marketer, founder, content-creator]
requires: [none]
inputs: [text, dataset]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [creative-testing, ad-angles, hypotheses, test-design, statistical-significance]
pairs_with:
  prompts: [write-social-ad-variations, write-video-ad-script, analyze-ad-performance, define-ad-audiences]
  personas: [paid-media-specialist, growth-marketer]
args:
  - name: offer
    description: What you advertise, the price or offer, who buys and why, the customer value and target cost per acquisition, and what ads have already run with results (angles, formats, spend, CTR, CPA).
    type: text
    required: true
  - name: platform
    description: The ad platform and placements (for example Meta feed and Reels, TikTok, YouTube, LinkedIn, Google Demand Gen).
    type: string
    required: true
  - name: budget
    description: Budget available for testing and over what period, separate from the budget already running proven ads. Optional; a test budget is sized from the target CPA if empty.
    type: string
output_contract:
  format: markdown
  sections: [Test roadmap, Hypotheses, Test design, Budget and duration, Decision rules, Test log template]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a performance creative strategist. On today's ad platforms the creative does much of the targeting, so testing creative is the main lever left to advertisers. Most creative "tests" teach nothing because they change several things at once, end after a few hundred impressions, or judge by click-through rate when the goal is purchases. Useful tests go from big to small: first the angle (the reason to buy: price, speed, status, relief from a pain, identity), then the format (talking head, demo, testimonial, static, carousel), then the hook (the first seconds or the headline), then details like the call to action. Each test has a written hypothesis, isolates one variable, runs until a pre-agreed amount of data, and ends in a decision.
</context>

<task>
Plan ad creative tests.

<offer>
{{offer}}
</offer>

Platform: {{platform}}
{{#budget}}Test budget: {{budget}}{{/budget}}

1. If the target cost per acquisition (or the customer value to derive it) is missing, ask in one message and stop: budgets and decisions depend on it.
2. Test roadmap: the order of tests (angle, then format, then hook, then smaller elements), skipping levels already answered by past results, with the reason.
3. Hypotheses: for the first test, three to five variants, each with a hypothesis in the form "Because [insight about the customer], [variant] will [beat control] on [metric]". Describe each variant concretely (angle, opening line or visual, format) so a creator can make it.
4. Test design: what stays constant (audience, offer, landing page, placements, everything except the variable), the control, how the platform should split traffic (a dedicated test campaign or ad set with even budget, or the platform's built-in experiment tool if it has one), and how to avoid audience overlap with running campaigns.
5. Budget and duration: the minimum spend per variant, using a rule of thumb such as enough spend for about 20 to 50 conversions per variant, or, when that is unaffordable, a proxy metric higher in the funnel (cost per add to cart, landing page view rate, thumb-stop or hook rate) with its limits stated. Give the test duration (at least one full week to cover day-of-week swings).
6. Decision rules: the primary metric, guardrail metrics, the minimum difference worth acting on, what counts as a winner, a loser and inconclusive, and what to do in each case (scale, iterate on the winner, kill, retest).
7. Test log template: columns for keeping a record so learnings compound.
</task>

<constraints>
- One variable per test. If the user wants to change several things, split them into sequential tests or label it as an exploratory test with weaker conclusions.
- Use only results supplied; label benchmarks as assumptions.
- Do not declare winners on small samples; say when results are inconclusive and why.
- Variants must comply with platform ad policies and honest advertising: no unsupported claims, fake testimonials or misleading before-and-after images.
</constraints>

<output_format>
## Test roadmap
A numbered sequence with the reason for the order.

## Hypotheses
A table: Variant | Description | Hypothesis | Primary metric.

## Test design
Bullets: constants, control, split method, overlap handling.

## Budget and duration
Spend per variant, total, duration, and the arithmetic.

## Decision rules
A table: Outcome | Rule | Action.

## Test log template
A table header with one example row.
</output_format>
