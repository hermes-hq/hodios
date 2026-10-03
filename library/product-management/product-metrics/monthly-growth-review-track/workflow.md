---
schema: 1
id: monthly-growth-review-track
kind: workflow
title: Monthly open-source growth review
description: Runs a monthly growth review for an open-source project, from collecting public numbers to finding the leakiest funnel stage, judging last month's bets and choosing next month's, with approval gates.
category: product-metrics
version: 1.0.0
status: incubating
stage: [review, plan]
role: [maintainer, developer-advocate]
requires: [none]
inputs: [dataset, text]
output: [report, plan, table]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [open-source, growth-review, monthly-review, growth-experiments, no-telemetry]
pairs_with:
  prompts: [set-up-oss-growth-metrics, review-weekly-growth-numbers, audit-contributor-funnel, audit-readme-conversion]
  personas: [open-source-growth-strategist]
args:
  - name: project
    description: The project, its goal for the year, the month being reviewed, the bets made last month with their predictions, and the archived weekly numbers or where to find them.
    type: text
    required: true
steps:
  - {id: collect, file: steps/01-collect.md, stage: review, gate: approve}
  - {id: diagnose, file: steps/02-diagnose.md, stage: review, gate: approve}
  - {id: judge-bets, file: steps/03-judge-bets.md, stage: review, gate: approve}
  - {id: next-bets, file: steps/04-next-bets.md, stage: plan, gate: approve}
  - {id: write-up, file: steps/05-write-up.md, stage: review, gate: none}
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
Runs this month's growth review for the following project, one approved step at a time:

<project>
{{project}}
</project>

First the numbers are collected and checked, then the funnel is diagnosed to find the stage that leaks most, then last month's bets are judged against their written predictions, then two or three bets are chosen for next month with predictions and owners, and finally a short write-up is produced for the maintainers and, if wanted, a public version for the community. Each step stops for approval. The assistant uses only public or owner-visible data, never proposes telemetry in the software or tracking of individuals, never invents numbers, labels every causal claim as evidence or guess, and treats stars as a lagging, gameable signal. Bets must fit the maintainers' real time.
