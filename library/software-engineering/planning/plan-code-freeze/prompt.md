---
schema: 1
id: plan-code-freeze
kind: prompt
title: Plan a code freeze
description: Plans a code or change freeze around a peak period or major release with dates, what is allowed, an exception process, staffing, and how to thaw safely afterwards.
category: planning
version: 1.0.0
status: incubating
stage: [plan, ship]
role: [engineering-manager, sre, devops-engineer, tech-lead]
stack: []
requires: [none]
inputs: [notes, text]
output: [plan, checklist, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [code-freeze, change-freeze, peak-season, release-management, exception-process]
pairs_with:
  prompts: [plan-stabilization-sprint, plan-team-capacity]
args:
  - name: reason
    description: Why freeze, for example holiday sales, year-end close, a major launch, a migration weekend, staff holidays.
    type: text
    required: true
  - name: window
    description: The freeze dates or the period it must cover.
    type: string
    required: true
  - name: setup
    description: How you deploy (continuous, weekly), what systems and teams are in scope, and anything already planned near the window.
    type: text
output_contract:
  format: markdown
  sections: [Freeze rules, Before the freeze, Exceptions, Staffing and on-call, Thaw plan, Announcement]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A freeze lowers the chance of a self-inflicted outage at the worst moment, but it has costs: a rush of risky merges just before it starts, a big batch of changes released all at once just after it ends, security fixes delayed, and work that piles up. Good freezes are as narrow as possible (scope by system and change type, not "nothing ships"), pull the cutoff for risky changes earlier than the freeze itself, keep a fast and clear exception path for security fixes and incident remediation, keep config and feature-flag changes under the same rules as code, and plan the thaw as carefully as the freeze. Freezing infrastructure changes and dependency upgrades matters as much as freezing application code.
</context>

<task>
Reason: {{reason}}
Window: {{window}}
{{#setup}}Setup: {{setup}}{{/setup}}

1. Freeze rules: the exact start and end (with time zone), which systems and change types are frozen (application deploys, infrastructure, database migrations, feature flags, third-party config, dependency upgrades), and what remains allowed (for example docs, internal tools, changes behind disabled flags if your team agrees). Use tiers if some systems need a stricter freeze than others.
2. Before the freeze: a soft cutoff for large or risky changes one to two weeks earlier, a load or rehearsal test if the reason is traffic, runbooks and dashboards checked, pending migrations completed, and on-call handover.
3. Exceptions: what qualifies (security fixes, incident fixes, legal or contractual needs), who can approve with a backup approver, what evidence is needed (tested, rollback plan, reviewed), and how exceptions are logged.
4. Staffing and on-call: who is on call and who is the escalation point during the freeze, especially around holidays; avoid leaving only junior engineers on call.
5. Thaw plan: a staged release of the backlog rather than everything on day one, the order of risky changes, extra monitoring on the first days, and a short review of what the freeze cost.
6. Announcement: a short message to engineering and stakeholders with the dates, rules, exception contact and thaw plan.
</task>

<constraints>
- Never block security fixes for the length of the freeze; give them an exception path.
- Do not invent dates or team names; use the ones given or placeholders.
- Do not suggest bypassing review or testing to "get things in" before the freeze.
{{> output/uncertainty}}
</constraints>

<output_format>
## Freeze rules
Table: System or change type | Rule | From | To.
## Before the freeze
Checklist with dates.
## Exceptions
## Staffing and on-call
## Thaw plan
## Announcement
</output_format>
