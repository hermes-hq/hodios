---
schema: 1
id: write-monthly-social-report
kind: prompt
title: Write a monthly social report
description: Writes a one-page monthly social media report from platform exports for a manager, board or client, with results against goals, what worked, fair comparisons and next month's changes.
category: social-media
version: 1.0.0
status: incubating
stage: [review]
role: [marketer, content-creator, manager]
requires: [none]
inputs: [dataset, text]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [social-analytics, stakeholder-update, month-on-month, engagement-rate]
pairs_with:
  prompts: [run-social-media-audit, compare-period-performance, write-monthly-business-review]
  personas: [social-media-manager]
args:
  - name: metrics_export
    description: This month's numbers and last month's, pasted from platform analytics or a spreadsheet (followers, reach, impressions, engagements, clicks, video views, top posts, number of posts), plus any campaign, budget or event that month.
    type: text
    required: true
  - name: goals
    description: What social media is supposed to achieve and the targets, if any (for example "grow newsletter sign-ups from social to 150 a month; get 40 volunteers for the summer fair").
    type: text
    required: true
  - name: reader
    description: Who reads the report. Board reports are shortest and most strategic; client reports explain the agency's work and next steps.
    type: enum
    enum: [manager, board, client]
    default: manager
output_contract:
  format: markdown
  sections: [Headlines, Results against goals, What worked, What did not, Next month, Notes on the numbers]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A social media manager or nonprofit comms person must report the month to someone who does not live in the dashboards. Weak reports paste every metric, celebrate impressions and follower counts that do not connect to any goal, compare months unfairly (a month with a paid campaign or a viral post against a normal one, 28 days against 31), and give no decision. A useful report leads with three results tied to goals, explains causes in plain words, and ends with what will change. It fits on one page.

Reader: {{reader}}
</context>

<task>
<metrics_export>
{{metrics_export}}
</metrics_export>

<goals>
{{goals}}
</goals>

1. Map each goal to the metrics that actually show progress (sign-ups, clicks, enquiries, volunteers, sales) and treat reach, impressions and followers as supporting context. If a goal has no matching metric in the export, say what to track.
2. Compute changes month on month with the arithmetic shown: absolute and percentage change, rates per post (engagement per post, clicks per post) when the number of posts changed, and engagement rate as engagements divided by reach where both exist, stating the formula used. Note differences in days, posting volume, paid boosts or one-off events that make a comparison unfair.
3. Pick the three headline results that matter most to the goals, good or bad.
4. Explain what worked and what did not, using the top and bottom posts: format, topic, timing, hook. Say "likely" when inferring a cause; one month is not proof.
5. Propose two or three changes for next month, each with the metric that will show whether it worked.
6. Adapt to the reader: manager gets operational detail; board gets three headlines, one chart suggestion and the ask in under 200 words before the table; client gets work done, results and next steps.
7. Define any metric the reader may not know in one plain sentence, in the notes.
</task>

<constraints>
- Use only the numbers given; check the arithmetic; mark gaps as [X] and never invent benchmarks or industry averages.
- Do not claim a post or campaign caused an outcome without evidence; separate correlation from cause.
- No jargon without a plain explanation (reach, impressions, CTR, saves).
- The whole report fits one page (about 450 words plus one table).
- If there are no numbers, or no goals, ask for them and stop.
</constraints>

<output_format>
## Headlines
Three bullets, each a result with its number and what it means.

## Results against goals
Table: goal | target | this month | last month | change | status (on track, behind, no data).

## What worked
Bullets with the post or campaign and the likely reason.

## What did not
Bullets.

## Next month
Two or three changes, each with the metric to watch.

## Notes on the numbers
Formulas used, unfair comparisons, missing data, and plain definitions.
</output_format>
