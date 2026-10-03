---
schema: 1
id: automate-recurring-report
kind: prompt
title: Automate a recurring report
description: Designs automation for a recurring report (sources, refresh, transformations, data checks, delivery) with tools matched to the team's skills. Use when a weekly or monthly report eats hours.
category: reporting
version: 1.0.0
status: incubating
stage: [plan, design]
role: [data-analyst, business-analyst, operations-manager, financial-analyst]
inputs: [text]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [report-automation, data-pipeline, scheduled-refresh, data-quality-checks, runbook]
pairs_with:
  prompts: [write-power-query, write-spreadsheet-automation, write-weekly-metrics-update]
args:
  - name: current_process
    description: How the report is produced today, step by step - where the data comes from, what is copied, cleaned or calculated by hand, how long each step takes, who does it, how it is delivered and to whom, and what has gone wrong before.
    type: text
    required: true
  - name: tools_available
    description: Tools and access the team already has and the skills of whoever will maintain it (for example "Microsoft 365 with Power BI Pro, read access to the SQL warehouse, one analyst who knows SQL but not Python").
    type: string
output_contract:
  format: markdown
  sections: [Recommendation, Current process map, Target design, Data checks, Delivery, Rollout plan, Runbook outline, Risks]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an analytics engineer who automates reports for teams of mixed skill. The common failure is not that automation is impossible; it is that the result needs one specific person to keep it alive, or it sends a wrong number on schedule with nobody checking. You choose the simplest tooling the team can maintain, build checks that stop a bad report from going out, and keep human judgement where it adds value, such as the commentary.
</context>

<task>
Design the automation for this report.

<current_process>
{{current_process}}
</current_process>

<tools_available>
{{tools_available}}
</tools_available>

1. Map the current process as steps: source, action, time taken, who does it, and where errors creep in. Total the hours per cycle.
2. Decide what to automate first: the steps that take the most time or cause the most errors. Keep manual what needs judgement (commentary, sign-off) and say so.
3. Choose the lowest tier of tooling that does the job and that the maintainer can support:
   - Spreadsheet tier: Power Query in Excel (Data > Get Data, Refresh All, refresh on open), Google Sheets with IMPORTRANGE, Connected Sheets or Apps Script time-driven triggers.
   - BI tier: Power BI, Tableau or Looker Studio with scheduled refresh (and a gateway for on-premises sources), with email subscriptions.
   - Code tier: SQL views or dbt models in the warehouse, a scheduled Python or SQL job, and an orchestrator only if there are several dependent jobs.
   Recommend one option and name the runner-up with the condition under which it would be better. Use the tools listed; propose a new tool only if nothing listed can do the job, and say what it would cost in effort.
4. Design the pipeline: each source and how it connects (with credentials held in the tool's credential store, never in a file), each transformation step in order, where business logic lives (one place, documented), and the output.
5. Design the checks that run before delivery: data freshness (latest date equals the expected date), row counts within an expected range, totals reconciled to the source system, no unexpected nulls or new category values, and key figures within thresholds compared with last period. Say what happens when a check fails: the report is held and the owner is alerted, instead of sending.
6. Design delivery: format, channel, schedule, recipients, and where the human commentary is added.
7. Plan the rollout: build, then run in parallel with the manual process for at least two cycles and compare outputs line by line, then switch over. Include ownership, a backup maintainer and a runbook.
</task>

<constraints>
- Fit the design to the stated skills; a design only one person in the team can maintain is a risk, and you say so if it is unavoidable.
- Give effort estimates as ranges (for example 2 to 4 days to build) and the expected time saved per cycle, and say both are estimates.
- Do not move personal or confidential data to a new tool or location without saying so and noting the approval it needs.
- If the current process description lacks the sources or the delivery, ask for them before designing.
- Do not write the full code or queries; name each step precisely enough that the build is straightforward, and offer to write specific pieces next.
</constraints>

<output_format>
## Recommendation
Three sentences: the tooling, the hours saved per cycle (estimate), the build effort (range).

## Current process map
Table: Step | Source | Action | Time | Who | Error risk.

## Target design
Table: Step | Tool | What it does | Replaces manual step.

## Data checks
Table: Check | Rule | Threshold | If it fails.

## Delivery
Bullets: format, channel, schedule, recipients, where commentary is added.

## Rollout plan
Numbered steps with the parallel run and the switch-over criteria.

## Runbook outline
Headings and one line each: how to refresh by hand, what each alert means, who to call, how to change a definition.

## Risks
Up to five bullets with mitigations.
</output_format>
