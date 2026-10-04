---
schema: 1
id: design-content-experiment
kind: prompt
title: Design a content experiment
description: Designs a small content experiment on format, length, timing or a series, with a hypothesis, one change, enough posts and weeks to learn something, one metric and a decision rule agreed in advance.
category: content-strategy
version: 1.0.0
status: incubating
stage: [plan, verify]
role: [content-creator, marketer]
requires: [none]
inputs: [text, dataset]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [hypothesis, test-design, posting-time, format-test, decision-rule, noise]
pairs_with:
  prompts: [analyze-content-performance, build-content-measurement-plan, plan-content-calendar]
  personas: [content-strategist]
args:
  - name: question
    description: What you want to find out, for example "do carousels get more saves than single images?", "is a weekly live worth it?", "should my videos be under 60 seconds?".
    type: text
    required: true
  - name: current_baseline
    description: "Your recent numbers for the metric that matters, with how many posts they come from and how much they vary, for example \"last 12 reels, 800 to 6,000 views, median 1,900; saves 10 to 80\"."
    type: text
    required: true
  - name: platform
    description: Where the experiment runs, for example "Instagram", "YouTube", "newsletter".
    type: string
    default: not stated (infer it from the question and baseline, or ask)
output_contract:
  format: markdown
  sections: [Hypothesis, What changes and what stays fixed, Metric, Sample and duration, Run sheet, Decision rule, Threats to the result]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a creator or social media manager turn a hunch into an experiment that can actually answer a question. Most creator "tests" are a single post in a new format, compared against whatever happened last week, while the topic, hook, day and trend all changed too. Social numbers are very noisy: one post can be several times the median for reasons nobody controls. A useful experiment changes one thing, keeps the rest as fixed as practical, runs enough posts to see past the noise, uses the median rather than the average, picks one metric tied to the goal before starting, and writes down in advance what result would make them switch, keep or drop the idea. When a clean test is impossible, it says so and offers a practical "trial with honest caveats" instead.

Platform: {{platform}}
</context>

<task>
<question>
{{question}}
</question>

<baseline>
{{current_baseline}}
</baseline>

1. Hypothesis: "If we [change], then [metric] will [direction, rough size], because [reason]."
2. What changes and what stays fixed: the single variable, and the things to hold steady (topic mix, posting time, length, hook style, calls to action, paid boosts off). If the question bundles several changes, split it and pick the first test.
3. Metric: one primary metric that fits the goal (saves, shares, completion rate, clicks, replies, sign-ups) and one guardrail metric that must not drop. Explain why reach or views alone would mislead, unless the question is about reach.
4. Sample and duration: from the spread in their baseline, estimate how many posts per variant are needed. Rule of thumb: at least 6 to 10 posts per variant, more when the baseline varies widely (the largest post several times the median). Alternate or pair variants over the same weeks rather than running one before the other, so seasonality and platform changes hit both. Give the number of weeks this takes at their cadence.
5. Run sheet: a table scheduling which post is which variant, with topics matched as pairs where possible.
6. Decision rule written now: compare medians; call a difference meaningful only if it is large relative to the baseline spread (for example the variant's median beats the control's by at least 20 to 30% and most pairs point the same way). State what you will do for win, lose and unclear (unclear means pick the cheaper option or keep testing for a set extra period).
7. Threats to the result: novelty effects, trends, holidays, platform changes, one viral outlier, and how to note them.
</task>

<constraints>
- Do not claim statistical significance from small samples; describe results as directional evidence.
- Do not invent baseline numbers; if they are missing or come from fewer than about 8 posts, ask for more or plan a baseline-gathering period first.
- Keep the experiment within their normal cadence; no extra posts that would change the account's behaviour.
- No engagement bait, fake accounts or bought engagement to "help" a variant.
</constraints>

<output_format>
## Hypothesis
One sentence.

## What changes and what stays fixed
Two bullet lists.

## Metric
Primary and guardrail, with one line each.

## Sample and duration
Posts per variant, total weeks, and the reasoning from their baseline in two or three lines.

## Run sheet
Table: week | post | variant | topic | notes.

## Decision rule
Bullets for win, lose and unclear.

## Threats to the result
Bullets.
</output_format>
