---
schema: 1
id: analyze-feedback-on-new-release
kind: prompt
title: Analyse feedback on a new release
description: Analyses feedback in the days after a release to separate change aversion from real problems, with themes, severity, reach, a metrics check and a hold, fix, guide or roll back recommendation.
category: user-feedback
version: 1.0.0
status: incubating
stage: [ship, operate]
role: [product-manager, designer, engineering-manager]
requires: [none]
inputs: [text, dataset]
output: [report, table, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [change-aversion, release-reaction, redesign, rollback-decision, post-launch]
pairs_with:
  prompts: [compare-feedback-before-after-change, detect-emerging-feedback-issue, triage-user-reported-bugs]
args:
  - name: release
    description: What changed, when it shipped, to whom (percentage rollout, segments), and whether users can switch back.
    type: text
    required: true
  - name: feedback
    description: Feedback since the release - tickets, reviews, social posts, survey comments - with dates and counts where possible.
    type: text
    required: true
  - name: metrics
    description: Key usage and support numbers before and after, for example task completion, feature usage, retention, contact rate. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Release and data, Themes, Change aversion or real problem, Metrics check, Severity and reach, Recommendation, Messages]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help product teams read the reaction to a release. Visible changes, especially redesigns, almost always draw a burst of negative feedback. Some of it is change aversion: long-time users disliking a difference, asking where things moved, missing the old version, with no real loss of ability; it usually fades within a few weeks as people adapt. Some of it is a real problem: users unable to finish tasks, bugs, slower workflows, lost capabilities, accessibility regressions, or confusion that also hits new users. The signals that separate them are behavioural (task completion, time on task, usage of the changed area, support contacts, retention), who complains (only veterans, or new users too), what they say (preference language versus "I can't…"), and the trend over days. Decisions range from holding steady and helping users adapt, to fixing forward, adding an option, or rolling back, and should weigh severity, reach and reversibility.

Release:

<release>
{{release}}
</release>

Feedback:

<feedback>
{{feedback}}
</feedback>
{{#metrics}}

Metrics:

<metrics>
{{metrics}}
</metrics>
{{/metrics}}
</context>

<task>
1. Summarise the release and the data: what changed, exposure, feedback volume by day and source, and what is missing (for example no metrics or no pre-release baseline).
2. Group the feedback into themes with counts, trend by day, who raises them (tenure, segment where known) and a verbatim quote each.
3. Classify each theme as likely change aversion, real problem, or unclear, using the signals: preference versus inability language, who complains, behaviour, trend. State the evidence and what would change the classification.
4. Check the metrics if given: compare before and after for task completion, usage of the changed area, support contacts and retention, and note seasonality or rollout effects. If not given, list exactly which numbers to pull and what each result would mean.
5. Rate each real problem for severity and reach, and flag anything that needs immediate action (data loss, blocked core tasks, accessibility regressions, security).
6. Recommend per theme: hold and guide (in-product tips, help article, announcement), fix forward, add an option or setting, or roll back, with reasons tied to severity, reach and reversibility, and a date to re-check.
7. Draft messages: a short public or in-app note acknowledging the change and how to do the top tasks, and a support macro for the main complaints.
</task>

<constraints>
- Do not label feedback as change aversion without evidence; when unsure, mark it unclear.
- Do not invent metrics or counts.
- Never dismiss accessibility regressions or blocked tasks as change aversion.
- Do not promise a rollback or option in user messages unless decided.
</constraints>

<output_format>
## Release and data
Bullets.

## Themes
A table: theme | count | trend | who | quote.

## Change aversion or real problem
A table: theme | classification | evidence | what would change it.

## Metrics check
Bullets or a table.

## Severity and reach
A table for real problems.

## Recommendation
Per theme, with a re-check date.

## Messages
The user note and the support macro.
</output_format>
