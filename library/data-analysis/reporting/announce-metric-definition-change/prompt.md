---
schema: 1
id: announce-metric-definition-change
kind: prompt
title: Announce a metric definition change
description: Plans and writes the announcement for a change to how a reported metric is defined, with old and new values side by side, a back-cast series, a parallel-run period and what it does to targets.
category: reporting
version: 1.0.0
status: incubating
stage: [ship]
role: [data-analyst, business-analyst, data-engineer, product-manager]
inputs: [text, dataset]
output: [message, plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [metric-change, back-casting, change-management, series-break]
pairs_with:
  prompts: [define-metric, build-metrics-glossary, write-data-correction-notice]
args:
  - name: change
    description: "The metric, its old and new definitions, why it is changing, and the date the new definition takes effect."
    type: text
    required: true
  - name: comparison
    description: "Old and new values for the same past periods, if both have been computed, and which reports, dashboards, targets or incentives use the metric."
    type: text
  - name: audience
    description: Who needs to know (leadership, report users, a client, the public) and the channel. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Announcement, Old versus new, Transition plan, Targets and incentives, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Changing a metric definition is different from correcting an error: the old numbers were right under the old rule, but the series now breaks. Without care, readers see a jump or drop on the date of the change and read it as performance, targets set on the old basis become meaningless, and different teams quote different versions for months. Teams that do this well show the metric under both definitions for the same past periods so the size of the step is known, back-cast the new definition as far as the data allows (and mark where it cannot be back-cast), run old and new in parallel for at least one or two reporting cycles, restate targets on the new basis explicitly, and update the glossary and every dashboard on the same day. The announcement says why the change is better in one sentence, not a page.

{{#audience}}Audience and channel: {{audience}}{{/audience}}
</context>

<task>
<change>
{{change}}
</change>
{{#comparison}}

<comparison>
{{comparison}}
</comparison>
{{/comparison}}

1. Describe the difference between the definitions precisely: what is now included or excluded and which way the metric moves as a result.
2. Build the old-versus-new table for the periods supplied, with the step size; if no comparison values are given, say the step size is unknown and must be computed before announcing.
3. Plan the transition: back-cast range, parallel-run period, the cut-over date, how charts will mark the series break, and where the old definition stays available.
4. Restate any targets, thresholds or incentives on the new basis using the step size, or flag that their owners must decide; never let a definition change silently move someone from missing to hitting a target.
5. Write the announcement: what changes and when, why in one sentence, what the numbers will look like, what readers must do (update bookmarks, stop using an old report), and who to ask.
6. List the assets to update on cut-over day (dashboards, glossary entry, recurring reports, exports).
</task>

<constraints>
- Use only values supplied; do not estimate the step size from assumptions and present it as measured.
- Never present the step at cut-over as a change in performance.
- Do not set or change targets yourself; restate them arithmetically and flag decisions for their owners.
{{> output/uncertainty}}
</constraints>

<output_format>
## Announcement
Ready-to-send message, under about 200 words.

## Old versus new
Table: Period | Old definition | New definition | Difference.

## Transition plan
Numbered steps with dates, and the list of assets to update.

## Targets and incentives
Table: Target or incentive | Old basis | Restated on new basis | Decision owner.

## Open questions
Bullets.
</output_format>
