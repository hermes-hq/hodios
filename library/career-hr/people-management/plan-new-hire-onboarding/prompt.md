---
schema: 1
id: plan-new-hire-onboarding
kind: prompt
title: Plan new-hire onboarding
description: Builds a 30-60-90 day onboarding plan for a new hire with goals per phase, people to meet, early wins, check-ins and success signals. Use before a new team member starts.
category: people-management
version: 1.0.0
status: incubating
stage: [plan]
role: [manager, engineering-manager, operations-manager, founder]
requires: [none]
inputs: [notes, spec]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [onboarding-plan, 30-60-90, early-wins, buddy-system]
pairs_with:
  prompts: [plan-one-on-one, write-job-description]
args:
  - name: role
    description: The new hire's role and level.
    type: string
    required: true
  - name: team
    description: The team and context - what the team does, the key people and stakeholders by role, tools and systems, current priorities, what the new hire will own, work mode, and the start date.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Before day one, First week, Days 1-30, Days 31-60, Days 61-90, People to meet, Check-ins, Success signals]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a manager who has onboarded many people well and a few badly. The badly onboarded ones spent weeks waiting for access, met people randomly, and were judged at 90 days against expectations nobody wrote down. Good onboarding is planned before day one, moves from learning to contributing to owning, gives the new hire an early, real win, connects them to the people they need, and makes expectations explicit with regular check-ins.

Role: {{role}}

<team>
{{team}}
</team>
</context>

<task>
1. Before day one: accounts and equipment, a welcome message, a named onboarding buddy (a peer, not the manager), the first-week calendar, and pre-reading kept short.
2. First week, day by day: a welcome and team introduction, the manager's 1:1 setting expectations, setup, the product or service from the customer's view, how the team works (rituals, tools, decision-making), and a small first task completed by the end of the week.
3. Days 1-30 (learn): goals for understanding the domain, the systems and the people; 2-3 learning tasks; one early win that is real, visible and low-risk.
4. Days 31-60 (contribute): goals for contributing to core work with growing independence; a meaningful piece of work they own with support.
5. Days 61-90 (own): goals for owning an area or a responsibility as the role expects; a first improvement they propose; expectations for the 90-day review.
6. People to meet: by role, with why each matters and what to ask them, in order of priority, spread over the first weeks.
7. Check-ins: weekly 1:1s, the buddy's role, and formal checkpoints at 30, 60 and 90 days with questions for both sides (including what the hire's fresh eyes notice).
8. Success signals: what "on track" looks like at each milestone, and early warning signs to act on.
</task>

<constraints>
- Fit the plan to the role and level: a senior hire should be shaping direction by day 90; a junior hire needs more structure and pairing.
- Use the people, tools and priorities from the team context; where they are missing, use roles (for example "the product manager") and list the gaps.
- Keep the first two weeks from overload: at most 2-3 new things per day and protected time to absorb.
- For remote or hybrid teams, include deliberate ways to build relationships (paired work, short intro calls, a team social).
- Do not invent company policies, systems or people.
</constraints>

<output_format>
## Before day one
Checklist with an owner per item.
## First week
Table: Day | Focus | Activities.
## Days 1-30
Goals, tasks and the early win.
## Days 31-60
## Days 61-90
## People to meet
Table: Who (role) | Why | What to ask | By when.
## Check-ins
## Success signals
Table: Milestone | On track looks like | Warning signs.
</output_format>
