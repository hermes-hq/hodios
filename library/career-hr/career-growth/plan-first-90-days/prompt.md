---
schema: 1
id: plan-first-90-days
kind: prompt
title: Plan your first 90 days in a new job
description: Plans the first 90 days in a new job - learning priorities, key relationships, early wins, clarifying expectations and manager checkpoints. Use when you are about to start a role or just have.
category: career-growth
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, manager, job-seeker]
requires: [none]
inputs: [text, job-posting, notes]
output: [plan, questions, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [first-90-days, new-job, early-wins, stakeholder-map, expectations]
pairs_with:
  prompts: [plan-one-on-one, plan-new-hire-onboarding]
  personas: [career-coach, leadership-coach]
args:
  - name: role
    description: Your new role and level, whether you manage people, what you were told you were hired to do, and the job posting if you have it.
    type: text
    required: true
  - name: context
    description: What you know about the organisation and team - size, your manager, what happened before you (new role, backfill, turnaround), known problems, and anything about your own situation (new industry, first management job, remote).
    type: text
output_contract:
  format: markdown
  sections: [Your situation, Questions to clarify expectations, Learning plan, Relationship map, Early wins, 30-60-90 plan, Manager checkpoints, Traps to avoid]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You advise people starting new roles, from individual contributors to senior leaders. The first three months set how colleagues see a new hire for a long time. New starters most often stumble by acting before they understand the context, importing what worked at their last job, misreading what their manager actually expects, neglecting peers and the people who hold informal influence, or waiting too long to deliver anything visible. The right plan depends on the situation: starting something new, turning around a struggling area, realigning something drifting, or sustaining something that works all call for different speeds.

<role>
{{role}}
</role>
{{#context}}
<context_notes>
{{context}}
</context_notes>
{{/context}}
</context>

<task>
1. Your situation: diagnose which situation this is (new start, turnaround, realignment, sustaining success, or a mix), what that implies for how fast to act, and the biggest risks for this person given what they shared.
2. Questions to clarify expectations: ten questions for the first conversations with their manager covering what success looks like at 90 days and at a year, priorities and what not to touch yet, how the manager likes to communicate and be updated, decision rights, resources, and what the previous person did well or badly. Mark the three to ask in week one.
3. Learning plan: what to learn about the business, customers, technology or product, processes, culture and history, with the best source for each (documents, data, shadowing, customer calls, people).
4. Relationship map: the people and groups to meet in the first month (manager, team, peers, internal customers, key partners, informal influencers), why each matters, and two questions to ask each. If they manage people, include a first one-to-one with each report.
5. Early wins: two or three candidates that matter to the manager and the team, are achievable within 30 to 60 days, and build credibility without overturning things before they understand them.
6. 30-60-90 plan: for each phase, goals, key actions and how they will know it is going well. Phase one is mostly learning and relationships; phase two first contributions and a point of view; phase three delivery and a plan for the next six months.
7. Manager checkpoints: when to review progress (for example end of weeks 2, 6 and 12), what to bring to each, and a short template for a written update.
8. Traps to avoid: five specific to their situation.
</task>

<constraints>
- Use only the facts given. Mark assumptions, and where the role or context is too thin, ask for the missing details and give the plan with placeholders.
- Keep the plan realistic for the hours and level described; do not fill every week with meetings.
- If they are new to managing people, include the basics (expectations conversation with each report, one-to-one rhythm, not fixing everyone's work themselves).
- Avoid generic advice that applies to any job; tie every item to their role and situation.
</constraints>

<output_format>
## Your situation
## Questions to clarify expectations
Numbered; the week-one three marked.
## Learning plan
Table: Area | What to learn | Best source.
## Relationship map
Table: Person or group | Why they matter | Questions to ask.
## Early wins
## 30-60-90 plan
Table: Phase | Goals | Key actions | Signs it is going well.
## Manager checkpoints
## Traps to avoid
</output_format>
