---
schema: 1
id: plan-self-service-reporting
kind: prompt
title: Plan self-service reporting for an organisation
description: Plans self-service reporting with certified datasets, content tiers, rules for user-built reports, training by user type, ownership and the measures that show whether it is working.
category: reporting
version: 1.0.0
status: incubating
stage: [plan, design]
role: [data-analyst, data-engineer, manager, business-analyst]
inputs: [notes, text]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [self-service-bi, certified-datasets, bi-governance, data-literacy, semantic-layer]
pairs_with:
  prompts: [prune-report-inventory, build-metrics-glossary, set-up-report-request-intake, set-up-report-row-level-security]
args:
  - name: situation
    description: "The organisation and data team size, the BI tool, who wants to build their own reports and why, what exists today (central reports, spreadsheets, extracts) and the problems seen."
    type: text
    required: true
  - name: constraints
    description: Data sensitivity, licences, budget and time for training, and any rules from security or compliance. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Users and needs, Content tiers, Certified datasets, Rules for user-built content, Training and support, Governance, Rollout and measures]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Self-service reporting fails in two opposite ways. Locked down, nobody can answer their own questions and the data team becomes a queue. Opened up without structure, it produces hundreds of reports with ten versions of "revenue", nobody knows which to trust, and the data team spends its time explaining why numbers differ. What works is giving people a governed starting point, not raw tables: a small set of certified, documented datasets or semantic models with the metric definitions built in and security applied, owned by named people. Content is tiered: certified reports maintained centrally, team-level content with an owner, and personal sandboxes that are not shared widely. A simple path promotes useful user-built reports into a higher tier after review. Users differ: most only consume and filter, some explore and slice existing datasets, and a few build; each group needs different training and tools. Without regular review of usage and ownership, the sandbox becomes the sprawl, so the plan includes cleanup rules from the start.
</context>

<task>
<situation>
{{situation}}
</situation>
{{#constraints}}

<constraints_given>
{{constraints}}
</constraints_given>
{{/constraints}}

1. Summarise the goal and the main risks of the current state in three sentences.
2. Segment the users (consumers, explorers, builders, or the groups visible in the situation) with rough numbers if given, what each needs, and what each should be able to do.
3. Define content tiers: certified, team and personal (or an adapted set), with who builds, who reviews, where it lives, how it is labelled, and who can see it.
4. Choose the first certified datasets: the three to six subject areas that would answer most questions, with the metrics they must contain, the owner role, refresh, and security approach.
5. Write rules for user-built content: allowed sources, naming, sharing limits, handling of sensitive data, the promotion path and criteria, and cleanup of unused content (for example archive after a stated period without views).
6. Plan training and support by user group: format, length, and a support model (office hours, champions in each team, a help channel).
7. Set governance: the owners and their duties, how metric definitions are agreed and changed, and a regular review of usage, duplicates and ownership.
8. Plan the rollout in phases with a pilot team, and measures of success: share of questions answered without the data team, usage of certified content, number of duplicate metrics, and request volume to the data team.
</task>

<constraints>
- Fit the plan to the team size and tool given; do not assume features the tool lacks. If the tool is not named, stay tool-neutral.
- Do not invent the organisation's data sources or metrics; propose subject areas from the situation and label them as proposals.
- Respect stated security and compliance rules; never propose giving raw access to sensitive data as a shortcut.
- Present timelines and thresholds as starting points.
</constraints>

<output_format>
## Summary
## Users and needs
Table: group | approx. number | needs | can do.

## Content tiers
Table: tier | built by | reviewed by | location and label | audience.

## Certified datasets
Table: subject area | key metrics | owner role | refresh | security.

## Rules for user-built content
## Training and support
Table: group | training | support.

## Governance
## Rollout and measures
Phases, then a table: measure | baseline | target | how measured.
</output_format>
