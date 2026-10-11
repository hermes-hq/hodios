---
schema: 1
id: design-customer-facing-dashboard
kind: prompt
title: Design a customer-facing dashboard
description: "Designs in-app analytics for a product's own customers: metrics they care about, comparisons, empty and partial-data states, permissions, exports and help text."
category: data-visualization
version: 1.0.0
status: incubating
stage: [design]
role: [product-manager, designer, data-analyst, fullstack-engineer]
subject: [saas]
inputs: [text, spec]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [embedded-analytics, in-app-reporting, dashboard-ux, product-design]
pairs_with:
  prompts: [design-customer-facing-analytics, design-kpi-cards, design-chart-interactions, define-metric]
  rules: [chart-design-rules]
  personas: [data-visualization-designer]
args:
  - name: product
    description: "The product and who the customers are (roles, technical level, plan tiers), what data the product holds about their usage or results, and what they ask support about today."
    type: text
    required: true
  - name: goals_and_limits
    description: "What the dashboard should achieve (show value, reduce support tickets, drive upgrades), and limits: data freshness, plan gating, privacy rules, the front-end stack or embedded BI tool."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Users and jobs, Metrics, Page layout, States, Permissions and plans, Exports and help, Out of scope]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design analytics pages that a product shows to its own customers. They differ from internal dashboards: customers are not analysts and visit rarely; they want to know whether the product is working for them and what to do next; every number is effectively a promise and will be compared with invoices, exports and their own records; a new account has no data, so empty states are the first impression; metrics must be defined in customer language, not internal event names; multiple roles inside one customer see different things; and showing other customers' data, even as benchmarks, needs aggregation thresholds and privacy review. Good customer dashboards lead with outcome metrics tied to the value the customer bought, give a comparison (previous period, goal, or an anonymised benchmark), link each metric to an action in the product, and make export easy, because customers will report upwards.
</context>

<task>
Design the customer-facing dashboard.

<product>
{{product}}
</product>

<goals_and_limits>
{{goals_and_limits}}
</goals_and_limits>

1. Identify user types inside a customer account (for example admin, manager, individual user) and the two or three jobs each brings to the page, such as proving value to a boss or spotting a problem.
2. Choose metrics: outcome metrics first, then activity metrics that explain them; each with a customer-language name, definition, unit, comparison, how it maps to data the product holds, and the action it links to. Reject vanity or confusing metrics with a reason.
3. Lay out the page: headline cards, one chart per question, a date range control with sensible defaults, filters by the customer's own dimensions (team, project, location), and drill-down to the records behind a number.
4. Design states: new account with no data (explain what will appear and how to get there), partial data (a period still filling, data delay with "updated at" time), errors, and very large or very small accounts where charts break.
5. Set permissions and plan gating: who sees what, how gated features are previewed without fake data, and whether benchmarks across customers are shown, with minimum group sizes and a privacy review.
6. Specify exports and help: CSV and PDF or image exports that match on-screen numbers, scheduled email reports if wanted, metric definitions in tooltips or a help panel, and a feedback link.
7. List what is out of scope for the first version.
</task>

<constraints>
- Every metric shown must reconcile with other places customers see the same number (invoices, exports, API); flag any metric where this is at risk.
- Never show data from other customers except as aggregated benchmarks above a stated minimum group size, and flag this for privacy and legal review.
- Do not show fake or sample data as if it were the customer's; label previews clearly.
- Do not choose data infrastructure here; point to the architecture decision as a separate step.
</constraints>

<output_format>
## Users and jobs
Table: User type | Jobs | What they need to see.

## Metrics
Table: Metric (customer name) | Definition | Comparison | Data source | Linked action.

## Page layout
Ordered description or text wireframe.

## States
Table: State | What the user sees.

## Permissions and plans
Bullets.

## Exports and help
Bullets.

## Out of scope
Bullets.
</output_format>
