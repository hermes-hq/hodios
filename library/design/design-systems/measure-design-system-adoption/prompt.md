---
schema: 1
id: measure-design-system-adoption
kind: prompt
title: Measure design system adoption
description: Defines how to measure design system adoption with code and design-file coverage, detached instances, contribution rates and team satisfaction, plus a quarterly report format.
category: design-systems
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [designer, frontend-engineer, engineering-manager]
requires: [none]
inputs: [text, dataset]
output: [plan, report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [adoption-metrics, component-coverage, detached-instances, quarterly-report, design-system-health]
pairs_with:
  prompts: [audit-component-duplication, plan-design-system-governance, audit-hardcoded-styles-against-tokens]
  personas: [design-systems-lead]
args:
  - name: system
    description: The design system - what it contains (tokens, components, patterns), how it ships (package names, design library), its version history and how old it is.
    type: text
    required: true
  - name: teams
    description: The product teams and codebases that could use it, with their stacks and how many screens or apps each owns. Note teams that have opted out or are mid-migration.
    type: text
    required: true
  - name: tooling
    description: Tools available for gathering data, for example "GitHub monorepo, Figma Enterprise library analytics, Storybook, Jira, a yearly survey". Leave empty to get options per tool type.
    type: text
output_contract:
  format: markdown
  sections: [What adoption means here, Metrics, Data collection, Baseline and targets, Quarterly report template, Pitfalls]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Design system teams are asked "is it working?" and usually answer with a vanity number: package downloads, component count or Figma inserts. Those numbers rise while products still ship hand-rolled buttons and detached, overridden components. Useful adoption measurement separates reach (which teams use the system at all) from depth (how much of each product's UI is built from it), tracks drift (detached instances, overrides, hard-coded values), shows whether the system is healthy as a product (requests answered, contributions merged, release cadence), and asks the people who use it. It also accepts that 100% coverage is not the goal: some UI should stay local.
</context>

<task>
Design an adoption measurement plan for this system.

<system>
{{system}}
</system>

<teams>
{{teams}}
</teams>

{{#tooling}}Tooling available: {{tooling}}
{{/tooling}}If no tooling is listed, give a method for each tool type (repository, design tool, issue tracker, survey) and say which assumption you made.

1. **What adoption means here:** define reach, depth, drift, health and sentiment for this system in one line each, and state the decisions the numbers should inform (where to invest, which team needs help, what to deprecate).
2. **Metrics:** propose 6 to 10 metrics across those five groups. For each give the definition, the formula, the unit of analysis (team, repository, screen, file), the data source, how often to collect it, and a known weakness. Include at least:
   - code coverage, for example the share of rendered UI component instances, or of imports of UI primitives, that come from the system package, per repository;
   - design coverage, for example the share of component instances in active design files that come from the system library, and the detach rate;
   - drift, for example hard-coded colour and spacing values outside tokens, and overrides of system components;
   - version lag: how many releases behind each consumer is;
   - health: time to first response on requests, contributions merged per quarter;
   - sentiment: a short survey with a satisfaction score and an open question.
3. **Data collection:** explain how to gather each metric with the tooling, for example static analysis of imports and JSX or template usage in each repository, the design tool's library analytics, issue tracker labels and a survey cadence. Mark any method that needs a script or an admin plan, and say what to do if that access is not available.
4. **Baseline and targets:** say what to capture now as a baseline, why targets should be set per team rather than one global number, and give an example of a reasonable first-year target pattern with a note that the user should set the actual values.
5. **Quarterly report template:** a one-page template with a headline, a table per team (reach, depth, drift, version lag, trend arrows), health and sentiment, three insights with the evidence behind them, and the asks for the next quarter.
6. **Pitfalls:** gaming (wrapping a local component in a system one), metrics that punish teams with legacy code, counting design inserts without checking detaches, and surveys only the fans answer.
7. Before answering, check that every metric has a data source the user can actually reach; if a metric depends on data that the teams description shows does not exist, say so and offer a proxy.
</task>

<constraints>
- Do not invent current numbers for this system. Use placeholders such as `[x%]` in the report template.
- Do not present one metric as "the" adoption number; show what each measure misses.
- Keep the measurement work proportional: a system with one or two consuming teams needs a lighter plan than one with twenty, and say so.
{{> output/uncertainty}}
</constraints>

<output_format>
Markdown with the contract's sections in order. Metrics as a table with columns Group, Metric, Formula, Unit, Source, Frequency, Weakness. The report template as a fenced Markdown block the user can copy.
</output_format>
