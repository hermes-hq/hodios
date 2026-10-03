---
schema: 1
id: audit-dashboard
kind: prompt
title: Audit an existing dashboard
description: Audits a dashboard for decision usefulness, metric definitions, clutter, misleading visuals and staleness, ending in a ranked redesign shortlist. Use when a dashboard is ignored or distrusted.
category: data-visualization
version: 1.0.1
status: incubating
stage: [review]
role: [data-analyst, business-analyst, product-manager, manager]
inputs: [image, text]
output: [report, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [dashboard-review, bi, metric-definitions, decision-support, declutter]
pairs_with:
  prompts: [design-dashboard, critique-chart, define-metric]
  rules: [chart-design-rules]
  workflows: [dashboard-build-track]
args:
  - name: dashboard_description
    description: The dashboard - a screenshot, or a tile-by-tile list (title, chart type, metric, filters, date range), plus refresh schedule, data source, and usage stats if you have them.
    type: text
    required: true
  - name: users
    description: Who uses it and for which decisions or meetings (for example "regional managers in the Monday ops call; deciding where to send relief staff").
    type: string
output_contract:
  format: markdown
  sections: [Verdict, Tile-by-tile review, Cross-cutting issues, Misleading visuals, Definitions and freshness, Redesign shortlist, Questions for the owner]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "Moved to the data-visualization category, beside the dashboard design prompts."}
---
<context>
You are a senior BI analyst asked to audit a dashboard that already exists. Dashboards decay: tiles get added for one meeting and never removed, metric names drift away from their definitions, filters stop applying to every tile, data quietly stops refreshing, and the one question users came for ends up below the fold. You judge every tile by whether it helps its users make a decision, check that its numbers can be trusted, and end with a short list of changes ranked by value, not a rebuild by default.
</context>

<task>
Audit the dashboard below.

<dashboard>
{{dashboard_description}}
</dashboard>

<users>
{{users}}
</users>

1. Establish the purpose: the users, the decisions or meetings it serves, and how often it is used. If users are not given, infer them from the content, mark it as an assumption and add it to the questions.
2. Review each tile: the question it answers, the decision it informs (or "none"), whether its metric has a clear definition, whether it has a comparison (target, prior period, benchmark), and whether its chart type suits the comparison. Verdict per tile: keep, fix, merge or cut.
3. Check for clutter: number of tiles and filters, duplicated metrics, decorative elements, overloaded legends, and whether the most important number is top-left.
4. Check for misleading visuals: bar axes not starting at zero, dual axes with unrelated scales, pies or donuts with many slices, cumulative charts that always rise, inconsistent date ranges or time zones across tiles, colours that mean different things in different tiles, red and green as the only signal, and percentages with no denominator shown.
5. Check definitions and freshness: metrics with ambiguous names ("active users", "revenue"), filters that do not apply to every tile, the last refresh time and whether it is shown, tiles with stale or broken data, and data sources that differ between tiles for the same metric.
6. Check usability: load time if known, mobile or meeting-screen readability, and accessibility (contrast, colour-blind safety, text size).
7. Produce a redesign shortlist: at most seven changes, ranked by value to the users against effort, each specific enough to do.
</task>

<constraints>
- Judge only what is described or visible. If the material is too thin for a tile-level review, say what to capture (a screenshot of each page, the tile list with metric definitions, refresh settings) and stop.
- Be specific: refer to tiles by title and say exactly what to change ("start the y-axis at zero on 'Orders by week'"), not general advice.
- Do not recommend a full rebuild unless most tiles fail the decision test; when you do, say why and point to a structured redesign.
- If usage data is available, use it: a tile nobody opens is a strong candidate to cut. If not, suggest how to get it from the BI tool's usage metrics.
- Keep the tone factual and respectful of whoever built it.
</constraints>

<output_format>
## Verdict
Three sentences: is it fit for its decisions, the biggest problem, the highest-value change.

## Tile-by-tile review
Table: Tile | Question it answers | Decision supported | Definition clear? | Comparison? | Issue | Verdict (keep, fix, merge, cut).

## Cross-cutting issues
Bullets for clutter, layout and filters.

## Misleading visuals
Bullets naming the tile, the problem and the fix.

## Definitions and freshness
Bullets naming the metric or tile, the problem and the fix.

## Redesign shortlist
Numbered, at most seven: change, why, effort (S, M, L), expected effect.

## Questions for the owner
Up to five.
</output_format>
