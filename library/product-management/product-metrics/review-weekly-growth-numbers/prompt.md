---
schema: 1
id: review-weekly-growth-numbers
kind: prompt
title: Review an open-source project's weekly growth numbers
description: Turns a week of an open-source project's public numbers (traffic, referrers, downloads, stars, issues, contributors) into what changed, the likely cause and one action for next week. Use every week.
category: product-metrics
version: 1.0.0
status: incubating
stage: [review]
role: [maintainer, developer-advocate]
requires: [none]
inputs: [dataset, text]
output: [report, summary]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [open-source, weekly-review, growth-metrics, referrers, no-telemetry]
pairs_with:
  prompts: [set-up-oss-growth-metrics, monthly-growth-review-track, diagnose-metric-drop]
  personas: [open-source-growth-strategist]
args:
  - name: numbers
    description: This week's and last weeks' numbers - views and uniques, clones, top referrers and paths, downloads per channel, stars gained, new issues and their authors, PRs from first-time contributors, plus anything you did this week (posts, releases).
    type: text
    required: true
  - name: weeks_of_history
    description: How many past weeks are included, for judging noise.
    type: number
    default: 4
output_contract:
  format: markdown
  sections: [Headline, What moved, Why, One action, Data hygiene]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Weekly numbers for a small project are noisy: a single mention can triple views for two days, a CI pipeline can double downloads, and stars lag real use. A useful weekly review is short, separates signal from noise by comparing with several past weeks, ties changes to referrers and to what the team actually did, and ends with one action. It also notices what is missing, because GitHub keeps traffic data for only 14 days.
</context>

<task>
<numbers>
{{numbers}}
</numbers>
History included: {{weeks_of_history}} weeks.

If the numbers have no comparison period, say the review needs at least the previous week and ask for it, then give only the observations that do not need a comparison.

1. **Headline.** One sentence: the most important change this week, or "no meaningful change".
2. **What moved.** For each metric, the change versus last week and versus the average of the history. Call a change meaningful only if it is outside the recent range; say "within noise" otherwise.
3. **Why.** For each meaningful change, the most likely cause from the referrers, popular paths, release timing and the team's activities. Label causes as evidence-based or guesses. Check for distortions: a CI or mirror spike in downloads, bot clones, a burst of AI-generated issues.
4. **One action.** The single most useful thing to do next week (fix the page people land on and leave, follow up on a referrer, answer the new issue authors, ship the release), with the number that will show whether it worked.
5. **Data hygiene.** Missing weeks, metrics that need archiving before GitHub drops them, and definitions that changed.
</task>

<constraints>
- Do not invent numbers or causes; label guesses.
- Keep the whole review under 250 words; it is read weekly.
- Never treat a star change alone as success or failure.
</constraints>

<output_format>
## Headline
## What moved
| Metric | This week | Last week | Recent average | Meaningful? |
## Why
## One action
## Data hygiene
</output_format>
