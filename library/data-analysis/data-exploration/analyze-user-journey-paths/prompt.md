---
schema: 1
id: analyze-user-journey-paths
kind: prompt
title: Analyse user journey paths
description: Analyses the common paths users take before and after a key event in event data, collapses noise into readable steps, and finds where journeys loop, stall or end.
category: data-exploration
version: 1.0.0
status: incubating
stage: [discover]
role: [product-manager, data-analyst, ux-researcher, marketer]
requires: [none]
subject: [saas, ecommerce]
inputs: [dataset, text]
output: [report, table, code]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [path-analysis, event-data, user-flows, sessions, sequence-analysis]
pairs_with:
  prompts: [analyze-conversion-funnel, analyze-web-analytics, analyze-feature-adoption, build-cohort-analysis]
  personas: [data-analyst]
args:
  - name: key_event
    description: The event to anchor on (for example "first purchase", "cancelled subscription", "opened the export feature") and whether you want paths leading to it, away from it, or both.
    type: text
    required: true
  - name: event_data
    description: The event table - columns (user or session id, event name, timestamp, page or screen, properties), the list of event names with volumes, the period and the tool or database it lives in. A sample is fine.
    type: text
    required: true
  - name: question
    description: What you are trying to learn (for example "why do trial users not reach the dashboard", "what do people do right before cancelling").
    type: text
output_contract:
  format: markdown
  sections: [Headline, Data checks, Path definition, Top paths, Loops and stalls, Paths that end without the event, Code, What to test next]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a product analyst who does path analysis. Raw event streams produce thousands of unique paths, most seen once, so the real work is reducing noise without hiding the story: collapse repeated identical events, map dozens of event names into a dozen meaningful steps, cap path length, and decide the session or time window before counting anything. A path table without these decisions is unreadable, and one with the wrong decisions is misleading. Funnels answer "how many got through steps I chose"; path analysis answers "what did people actually do", which is where surprises live.
</context>

<task>
Analyse the paths around "{{key_event}}".

<event_data>
{{event_data}}
</event_data>

{{#question}}The question: {{question}}{{/question}}

1. Data checks: duplicate events, bot or internal users, events firing twice on reload, timestamp time zones and ordering ties, users with no id who cannot be stitched across sessions. Say which of these change path counts.
2. Path definition: the window (for example the 5 steps or 30 minutes before the key event, or the user's first session), how repeats are collapsed (A, A, A becomes A, with the count kept separately), and a mapping table from raw event names to readable steps with an "other" bucket.
3. Top paths: the 10 to 15 most common collapsed paths with users and share, plus the share covered by "everything else" so the reader knows how concentrated behaviour is.
4. Step-to-step view: for each step, the most common next steps and the share who exit, as a table that can be drawn as a Sankey diagram.
5. Loops and stalls: users who bounce between the same two or three steps (for example settings and help, or cart and shipping page), long gaps between steps, and the steps most often followed by exit. Give time between steps as medians, not means.
6. Compare paths for users who reached the key event and similar users who did not, in the same window, and name the steps or loops that differ most.
7. Give runnable code (SQL with window functions such as LAG and string aggregation, or pandas) that builds the collapsed paths and the step-to-step table.
8. What to test next: two to four specific hypotheses with the experiment or research that would check each.
</task>

<constraints>
- Paths show what happened, not why. Do not claim a step causes conversion or churn; frame differences as hypotheses.
- Do not invent event names, volumes or paths. If only a sample is given, show the method on the sample and label figures as illustrative.
- State every collapsing and mapping decision; different choices give different top paths.
- If identity stitching is weak (many anonymous sessions), say which conclusions are affected.
</constraints>

<output_format>
## Headline
Three sentences: the dominant path, the biggest loop or stall, and the clearest difference between users who reach the event and those who do not.

## Data checks
Bullets.

## Path definition
Window, collapsing rules, and a table: Raw event | Step name.

## Top paths
Table: Rank | Path | Users | Share, with the share covered by everything else. Then the step-to-step table: Step | Next step | Share | Exit share.

## Loops and stalls
Table: Pattern | Users | Median time | Exit rate after.

## Paths that end without the event
Comparison table of reached versus did not reach.

## Code
One code block.

## What to test next
Numbered hypotheses with how to test each.
</output_format>
