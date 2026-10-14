---
schema: 1
id: build-accessibility-into-team-process
kind: prompt
title: Build accessibility into a team's delivery process
description: Sets up accessibility checks across a team's design, development, code review, QA and release process, with owners, definition of done, tooling, training and a way to measure progress.
category: accessibility
version: 1.0.0
status: incubating
stage: [plan]
role: [engineering-manager, tech-lead, product-manager, designer]
requires: [none]
inputs: [text, notes]
output: [plan, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [shift-left, definition-of-done, accessibility-program, team-process, team-enablement]
pairs_with:
  personas: [accessibility-specialist]
  prompts: [write-accessibility-acceptance-criteria, set-up-automated-accessibility-checks, review-mockup-for-accessibility, prioritize-accessibility-findings]
args:
  - name: team
    description: Team size and roles, how work flows today (design tool, tickets, code review, QA, release cadence), the product's platforms, and current accessibility knowledge.
    type: text
    required: true
  - name: situation
    description: What prompted this - a failed audit, customer procurement requirements, a complaint, a regulation, or simply wanting to do better - and any existing backlog of issues.
    type: text
output_contract:
  format: markdown
  sections: [Where accessibility breaks today, Process changes by stage, Definition of done, Tooling, Roles and training, Measuring progress, First 90 days]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Teams that fix an audit and stop see the same issues return within two releases, because new work keeps producing them. What works is putting a small, cheap check at each stage where an issue is created, and making one person accountable without making them the only person who cares. Design: accessibility annotations and a contrast and target-size check before handoff. Tickets: acceptance criteria for keyboard, names, focus and announcements on UI stories. Code: lint rules (for example eslint-plugin-jsx-a11y), shared accessible components, and a reviewer checklist of five or six items. Testing: automated scans in CI with a baseline so new violations fail the build, component tests that query by role and name, and a short manual keyboard and screen-reader pass on changed flows. Release: a gate for blocker-level issues on key journeys. Programmes stall in predictable ways: one champion burns out, training happens once and fades, the checklist is too long to use, CI checks are set to warn and ignored, and design systems ship inaccessible components that every team copies. Progress is better measured by blockers on key journeys and the trend of new issues than by an automated score.
</context>

<task>
Design an accessibility process for this team.

<team>
{{team}}
</team>
{{#situation}}
<situation>
{{situation}}
</situation>
{{/situation}}

1. Map the team's current flow and say, stage by stage, where accessibility issues are most likely being introduced and missed. Mark assumptions.
2. For each stage (discovery, design, ticket writing, development, code review, QA, release, support), propose the smallest check that would catch issues there, who owns it, and the time it adds. Keep the total realistic for this team's size.
3. Write a definition of done for UI work: five to eight testable items covering keyboard, names, focus, contrast, zoom and announcements, plus "passes CI accessibility checks".
4. Recommend tooling that fits the stack: linting, CI scanning with a baseline, component test conventions, a design plugin for contrast, and the screen readers to test with. State what each cannot catch.
5. Define roles: an accountable owner, champions per team with protected time, and when to bring in external auditors or disabled user testers. Plan role-based training (designers, developers, QA, PMs, content) with short, repeated sessions rather than a single course.
6. Define how to measure progress: blockers on key journeys, new issues per release, time to fix, coverage of manual checks, and user feedback, with a simple reporting rhythm.
7. Plan the first 90 days: what to start in week one, what to add by day 30 and 60, how to handle the existing backlog without stopping feature work, and the first decision points.
</task>

<constraints>
- Fit the plan to the team's size; do not propose a dedicated accessibility department for a team of six.
- Do not present automated scores as proof of accessibility.
- Do not give legal advice; if the situation involves a regulation or legal claim, say that obligations should be confirmed with counsel and keep the plan technical.
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Where accessibility breaks today
Bullets by stage.

## Process changes by stage
Table: stage | check | owner | time added.

## Definition of done
Checklist.

## Tooling
Table: tool or practice | catches | misses.

## Roles and training
Bullets.

## Measuring progress
Bullets with the metric and how it is collected.

## First 90 days
Week 1, days 2 to 30, days 31 to 60, days 61 to 90.
</output_format>
