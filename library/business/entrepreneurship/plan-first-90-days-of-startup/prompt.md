---
schema: 1
id: plan-first-90-days-of-startup
kind: prompt
title: Plan your first 90 days as a founder
description: Plans a new founder's first 90 days - the few goals that matter, weekly milestones, what to ignore for now, and checkpoints that decide whether to continue, change course or stop.
category: entrepreneurship
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, individual]
requires: [none]
inputs: [text]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [ninety-day-plan, founder-focus, milestones, not-to-do-list, checkpoints]
pairs_with:
  prompts: [validate-business-idea, find-first-customers, run-founder-weekly-check-in, review-first-months-of-trading]
  personas: [startup-mentor]
args:
  - name: starting_point
    description: The business and where it is today - idea, evidence so far, any product, customers or revenue - plus whether you are full time or part time and the date you start.
    type: text
    required: true
  - name: resources
    description: Hours a week, money available for the 90 days, cofounders or help, and your personal runway in months.
    type: text
    required: true
  - name: worries
    description: What you are tempted to spend time on, or what feels urgent (logo, website, company formation, fundraising, an app). Optional.
    type: text
output_contract:
  format: markdown
  sections: [The goal for 90 days, Three outcomes, Week-by-week milestones, Not now, Checkpoints, Weekly rhythm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help new founders plan their first 90 days. Founders in this phase lose months to work that feels productive but proves nothing: polishing a brand, building features before anyone has paid, forming companies and opening accounts, attending events, and pitching investors too early. The first 90 days should produce evidence: customers who pay or commit, a repeatable way to reach them, and a clear view of what the product must do. A good plan has one headline goal, at most three outcomes with numbers, weekly milestones that can be checked, an explicit not-now list, and checkpoints where the founder decides whether to continue, change course or stop.

<starting_point>
{{starting_point}}
</starting_point>

<resources>
{{resources}}
</resources>
{{#worries}}
<worries>
{{worries}}
</worries>
{{/worries}}
</context>

<task>
1. Set the 90-day goal: one sentence describing the evidence the business will have on day 90, sized to the starting point and resources.
2. Pick three outcomes with numbers (for example "12 customer interviews and 5 paid pre-orders", "a channel that brings 20 qualified leads a week", "first version used weekly by 10 customers"). Explain why each matters at this stage.
3. Write week-by-week milestones for 13 weeks, grouped in three phases, with the hours each needs. Keep admin and setup to the minimum needed to take money legally.
4. Build the not-now list from the founder's worries and common traps, with when each item would become worth doing.
5. Set checkpoints at days 30, 60 and 90: what to measure, and the thresholds for continue, change course or stop.
6. Suggest a weekly rhythm: a planning slot, outreach or selling blocks, building blocks, and a 30-minute review against the milestones.
</task>

<constraints>
- Fit the plan to the stated hours and money. Do not assume a team, budget or skills that were not mentioned.
- Do not invent market facts or results. Thresholds are suggestions the founder should adjust, explained from their situation.
- Keep at most three outcomes; if the founder lists more, choose and explain what was dropped.
- Registration, tax and licences are checks to make before taking money in the founder's country, not steps to skip; keep them brief.
</constraints>

<output_format>
## The goal for 90 days
## Three outcomes
Table: Outcome | Number | Why now.
## Week-by-week milestones
Table: Week | Milestone | Hours.
## Not now
Table: Item | When it becomes worth doing.
## Checkpoints
Table: Day | Measure | Continue if | Change course if | Stop if.
## Weekly rhythm
</output_format>
