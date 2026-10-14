---
schema: 1
id: redesign-current-role
kind: prompt
title: Redesign your current role
description: Uses job crafting to reshape your current job toward your strengths and interests - tasks to grow, shrink or swap, relationships to build - with a proposal your manager can say yes to.
category: career-growth
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, software-engineer]
requires: [none]
inputs: [text, notes]
output: [table, plan, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [job-crafting, role-design, engagement, strengths]
pairs_with:
  prompts: [decide-whether-to-quit, build-development-plan, propose-flexible-work]
  personas: [career-coach]
args:
  - name: current_role
    description: Your role and the main tasks with rough share of your time, what energises you and what drains you, and the strengths or interests you are not using.
    type: text
    required: true
  - name: constraints
    description: What cannot change (core duties, targets, team needs), what your manager cares about, and any opportunities you have noticed.
    type: text
output_contract:
  format: markdown
  sections: [Where your time goes, Crafting options, What to change first, Proposal to your manager, Check in three months]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people improve the job they already have before they decide to leave it. Job crafting is the practice of reshaping a role from within: changing which tasks you do and how (task crafting), who you work with (relational crafting), and how you see the purpose of the work (cognitive crafting). Small, deliberate changes often restore energy and growth without a new job. It works when changes also serve the team: taking on work no one wants that suits you, swapping tasks with a colleague whose strengths differ, automating or streamlining a draining task, or adding a responsibility that fills a real gap. It fails when it means quietly dropping duties or asking for a dream job that ignores what the team needs.

<current_role>
{{current_role}}
</current_role>
{{#constraints}}
<constraints_given>
{{constraints}}
</constraints_given>
{{/constraints}}
</context>

<task>
1. Where your time goes: a table of tasks with share of time and an energy rating (energises, neutral, drains), and which strengths each uses. Note the pattern in two sentences.
2. Crafting options: six to ten specific options across task, relational and cognitive crafting: grow, shrink, swap, streamline or add tasks; new collaborators or mentoring; reframing the purpose of a draining but necessary task. For each, the benefit to them, the benefit to the team, and how much permission it needs (none, manager agreement, wider change).
3. What to change first: pick two or three options that are low cost and high impact, starting with what needs no permission, and say how to try them over the next month.
4. Proposal to your manager: a short written proposal for the options that need agreement: what changes, why it helps the team, how the affected work is covered, a trial period and how to judge it.
5. Check in three months: questions to judge whether the crafting worked and signals that the role cannot be reshaped enough, in which case leaving deserves a proper look.
</task>

<constraints>
- Never suggest dropping duties without agreement or shifting unwanted work onto colleagues unfairly.
- Respect the constraints given; do not propose changes that ignore core duties.
- Do not invent opportunities in their company; frame them as things to look for or ask about.
- Keep the proposal short and framed around team benefit.
</constraints>

<output_format>
## Where your time goes
Table: Task | Share of time | Energy | Strengths used.
## Crafting options
Table: Option | Type | Benefit to you | Benefit to team | Permission needed.
## What to change first
## Proposal to your manager
## Check in three months
</output_format>
