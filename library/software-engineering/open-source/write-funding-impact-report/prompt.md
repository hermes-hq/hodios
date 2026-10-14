---
schema: 1
id: write-funding-impact-report
kind: prompt
title: Write a funding impact report for an open-source project
description: Writes a report to an open-source project's sponsors, grant funder or community on what the money paid for, what changed for users, honest shortfalls and what the next period needs.
category: open-source
version: 1.0.0
status: incubating
stage: [review]
role: [maintainer]
requires: [none]
inputs: [text, notes]
output: [report, post]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
depth: specific
tags: [sponsorship, grant-report, transparency, open-collective, project-funding]
pairs_with:
  prompts: [write-sponsorship-ask, choose-oss-funding-model, write-release-announcement-kit]
  personas: [open-source-maintainer]
args:
  - name: funding
    description: Where the money came from in the period (sponsors, a grant, a company, a fiscal host), how much, and what it was promised or meant to pay for.
    type: text
    required: true
  - name: work_done
    description: What happened in the period - releases, issues closed, security fixes, maintainer hours paid, infrastructure costs, new contributors, anything that slipped and why. Notes and links are fine.
    type: text
    required: true
  - name: audience
    description: Who the report is for; a grant funder needs deliverables against the plan, sponsors and the community want a readable update.
    type: enum
    enum: [sponsors-and-community, grant-funder, company-sponsor]
    default: sponsors-and-community
output_contract:
  format: markdown
  sections: [Summary, Where the money went, What changed for users, What did not go to plan, What comes next, Thanks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Sponsors and funders rarely stop paying because a project missed a goal; they stop because they never heard what the money did. A good report connects money to outcomes users feel ("the 2.0 migration tool, built with 120 paid hours, cut upgrade issues by half") instead of listing commits, shows the spending plainly, and is honest about what slipped. Grant funders also expect the report to follow the deliverables in the agreement. Company sponsors want something they can show internally. Maintainers often undersell unglamorous work such as security fixes, triage and dependency upgrades, which is usually what keeps users safe.
</context>

<task>
Write a funding impact report for {{audience}}.

<funding>
{{funding}}
</funding>

<work_done>
{{work_done}}
</work_done>

1. Summary: three to five sentences on the period, the funding and the biggest outcome for users.
2. Where the money went: a plain breakdown by category (maintainer time, contractors, infrastructure, security audits, events, fees) with amounts or shares only as given. If amounts are missing, say "amount not provided" rather than estimating.
3. What changed for users: the outcomes, each tied to the work and, where possible, to evidence from the input (a release, an issue count, a downstream adoption). Include maintenance and security work and explain why it matters.
4. What did not go to plan: what slipped, why, and what you are doing about it. If {{audience}} is grant-funder, map this to the agreed deliverables with status.
5. What comes next: priorities for the next period and what they need (hours, money, reviewers), with a specific, modest ask.
6. Thanks: credit sponsors as they wish to be named and contributors by handle where given.
7. If {{audience}} is sponsors-and-community, also give a short version for a blog or social post of under 150 words.
</task>

<constraints>
- Use only the figures and facts supplied. Never invent amounts, hours, download counts or user numbers.
- Do not overstate impact; say "we expect" where the effect is not yet measured.
- Do not name sponsors who may not want to be listed unless the input says they agreed.
</constraints>

<output_format>
## Summary
A short paragraph.

## Where the money went
Table: Category | Amount or share | What it paid for.

## What changed for users
Bullets, each with its evidence.

## What did not go to plan
Bullets, or a deliverables table for grant funders.

## What comes next
Bullets ending with the ask.

## Thanks
A short paragraph, then the short post version if requested.
</output_format>
