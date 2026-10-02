---
schema: 1
id: analyze-content-performance
kind: prompt
title: Analyze content performance
description: Analyses a content metrics export to find what is working against a stated goal, with fair comparisons and caveats, and proposes the next three experiments. Use for a monthly content review.
category: content-strategy
version: 1.0.0
status: incubating
stage: [review]
role: [content-creator, marketer, founder]
inputs: [dataset, text]
output: [report, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [content-analytics, experiments, vanity-metrics, engagement-rate]
pairs_with:
  prompts: [plan-content-calendar, define-content-pillars]
  personas: [content-strategist]
args:
  - name: metrics
    description: The metrics export (CSV or pasted table) with one row per piece of content, including publish date, platform, format, topic or pillar, and the metrics available (impressions, reach, views, watch time, clicks, saves, shares, comments, follows, sign-ups).
    type: text
    required: true
  - name: goal
    description: What content is meant to achieve (for example "newsletter sign-ups", "qualified leads", "watch time"). Leave empty to have one proposed as an assumption.
    type: string
output_contract:
  format: markdown
  sections: [Headline, Data check, What is working, What is not, Next three experiments]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a content analyst. Content data is noisy and easy to misread: one viral post skews averages, older posts have had more time to accumulate views, platforms define "impressions", "reach" and "views" differently, and follower growth changes the baseline from month to month. Likes and impressions are often vanity metrics; what matters is the metric closest to the goal (sign-ups, leads, saves, shares, watch time). A useful review compares like with like, says how confident it is given the sample size, and ends in experiments that change one thing at a time.
</context>

<task>
Analyse this content performance data.

<goal>
{{goal}}
</goal>

<metrics>
{{metrics}}
</metrics>

1. If the goal is empty, propose the most plausible one from the metrics available and mark it as an assumption. Name the metric that best reflects the goal (the north-star metric for this review) and one or two supporting metrics.
2. Data check: state the date range, the number of pieces by platform and format, missing or inconsistent fields, and outliers. Note where pieces are too recent to compare fairly with older ones.
3. Normalise before comparing: use rates (for example engagement or saves per impression, click-through, sign-ups per 1,000 views) and medians rather than means where outliers exist. Compare within the same platform and format.
4. What is working: the three to five patterns most linked to the goal metric (by pillar, format, topic, hook style, length, day or time), each with the numbers behind it, the sample size, and a confidence label: strong (consistent across many pieces), suggestive (a few pieces), or anecdotal (one piece).
5. What is not working: patterns that consume effort without moving the goal metric, including high-vanity, low-goal content.
6. Next three experiments: each with a hypothesis, the single change to make, the metric to watch, how many pieces or weeks to run it, and the result that would count as success.
</task>

<constraints>
- Compute only from the data given and show the arithmetic for key numbers. Never invent metrics, benchmarks or industry averages.
- Do not claim causation from correlation; say "is associated with" unless the data comes from a controlled test.
- If the data has fewer than about ten pieces per comparison group, say that conclusions are tentative.
- If the export is unreadable or lacks any metric related to the goal, say what is needed and stop.
</constraints>

<output_format>
## Headline
Two or three sentences: the most important finding and the recommended focus.

## Data check
Bullets.

## What is working
A table: pattern | evidence (numbers and n) | confidence.

## What is not
A table: pattern | evidence | suggestion.

## Next three experiments
A numbered list with hypothesis, change, metric, duration and success threshold.
</output_format>
