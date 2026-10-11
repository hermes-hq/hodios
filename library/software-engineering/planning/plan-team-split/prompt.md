---
schema: 1
id: plan-team-split
kind: prompt
title: Plan splitting an engineering team
description: Plans splitting a growing engineering team into two with ownership boundaries, who goes where, leads, shared rituals, on-call and a transition timeline.
category: planning
version: 1.0.0
status: incubating
stage: [plan]
role: [engineering-manager, tech-lead]
stack: []
requires: [none]
inputs: [notes, text]
output: [plan, table, message]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [team-topologies, team-structure, conways-law, ownership-boundaries, org-design, scaling-teams]
pairs_with:
  prompts: [map-system-ownership, reduce-bus-factor]
args:
  - name: team
    description: The current team (size, roles, seniority, who knows what), what it owns (services, features, customers), and why a split is being considered.
    type: text
    required: true
  - name: constraints
    description: Constraints such as available managers or leads, product priorities, people's preferences you know of, time zones, on-call needs.
    type: text
output_contract:
  format: markdown
  sections: [Should you split, Boundary options, Recommended split, People, Shared concerns, Transition plan, Announcement outline]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Teams usually need splitting at around eight to ten people, when stand-ups drag, decisions slow and nobody can hold the whole codebase in their head. Most splits fail on the boundary: dividing by layer (frontend and backend teams) or by an arbitrary list of tickets creates constant handoffs, while dividing by product area, user journey or a set of services with clear interfaces lets each team ship alone. By Conway's law, the boundary will shape the architecture, so it should follow seams that already exist or that you want. Other common failures: one team gets all the senior people or all the legacy work, on-call is left ambiguous, shared code has no owner, and people hear about the split through rumour.
</context>

<task>
Team: {{team}}
{{#constraints}}Constraints: {{constraints}}{{/constraints}}

1. Should you split: check the signals (size, coordination cost, distinct work streams) and alternatives (a sub-team for a project, better interfaces, a rotation). Say if splitting is premature.
2. Boundary options: two or three ways to divide ownership (by product area, by customer journey, by platform versus product, by service group), each with how many cross-team handoffs a typical feature would need, which shared code remains, and the effect on architecture.
3. Recommended split: what each team owns (services, repos, features, dashboards, backlogs) and its mission in one sentence.
4. People: a principle-based allocation (balance seniority and knowledge, give each team someone who knows each owned system, ask people's preferences first) and a draft allocation from the input marked as a draft for discussion. Name the lead or manager needs for each team.
5. Shared concerns: shared libraries and their owner, on-call (separate rotations or a shared one with a minimum size; a rotation needs about five or more people to be sustainable), cross-team rituals, architecture decisions that span both.
6. Transition plan: preference conversations, announcement, ownership transfer of each system, backlog split, a period with a shared stand-up, the date each team runs independently, and a review after about six weeks.
7. Announcement outline: what to say to the team, in what order, and the questions people will ask.
</task>

<constraints>
- Do not make assumptions about individuals beyond what is given; mark the people allocation as a draft to discuss with them.
- Tell people individually or as a team before any wider announcement; no surprises in public.
- Do not invent org facts, budgets or headcount.
{{> output/uncertainty}}
</constraints>

<output_format>
## Should you split
## Boundary options
Table: Option | Team A owns | Team B owns | Handoffs per feature | Shared code | Verdict.
## Recommended split
## People
Principles, then a draft table: Person or role | Team | Reason.
## Shared concerns
## Transition plan
Table: Week | Step | Owner.
## Announcement outline
</output_format>
