---
schema: 1
id: write-pr-plan
kind: prompt
title: Write a PR plan
description: Writes a 6 or 12 month PR plan with outcome objectives tied to the business, audiences and messages, a story bank, a calendar, resources and measurement.
category: public-relations
version: 1.0.0
status: incubating
stage: [plan]
role: [marketer, founder, executive]
requires: [none]
inputs: [text, notes, document]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [pr-plan, earned-media, story-bank, pr-calendar, measurement]
pairs_with:
  prompts: [write-coverage-report, build-media-list, pitch-journalist]
  personas: [pr-strategist]
args:
  - name: organisation
    description: What you do, for whom, where, your stage or size, past coverage, and what makes you credible to journalists.
    type: text
    required: true
  - name: business_goals
    description: The business or mission goals PR should support in this period (for example hiring, sales in a new region, policy change, fundraising).
    type: text
    required: true
  - name: resources
    description: People and hours available, budget, spokespeople, and whether you have an agency. Optional.
    type: text
  - name: horizon
    description: Plan length, 6 or 12 months.
    type: enum
    enum: ["6 months", "12 months"]
    default: "12 months"
output_contract:
  format: markdown
  sections: [Objectives, Audiences and messages, Story bank, Calendar, Resources, Measurement, Risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a head of communications writing a {{horizon}} PR plan. Plans that work start from what the business needs (who must think or do what differently) and work back to stories, outlets and spokespeople, rather than starting from "get into big media". They set outcome objectives that can be checked, keep a story bank of real, provable stories with the evidence each needs, spread effort across news moments the organisation controls (launches, data, milestones) and ones it can join (seasonal moments, sector news, awards), and stay realistic about capacity: one person part-time can sustain perhaps one proactive story a month done well. Measurement is set up at the start, not invented at the end.

<organisation>
{{organisation}}
</organisation>

<business_goals>
{{business_goals}}
</business_goals>
{{#resources}}
<resources>
{{resources}}
</resources>
{{/resources}}
</context>

<task>
1. Objectives: two to four objectives, each linked to a business goal, written as outcomes (for example "target buyers in Poland recognise us as a specialist in X, shown by Y") with a measure and a target. Add output targets only as supporting measures.
2. Audiences and messages: the priority audiences, what each needs to believe or know, the outlets and channels that reach them (trade, regional, national, newsletters, podcasts, broadcast), and three key messages with proof points from the input.
3. Story bank: ten to fifteen story ideas, each with type (announcement, data, expert comment, customer story, opinion, event, award), the audience, the hook or timing, the evidence or asset it needs, and readiness (ready, needs work, idea only).
4. Calendar: a month-by-month table across the horizon with planned stories, known seasonal or sector moments the user should verify, reactive commentary opportunities, and quiet periods for preparation.
5. Resources: who does what, hours per month, spokesperson training needs, tools, budget lines, and what to drop if capacity is lower than planned.
6. Measurement: how each objective is measured, the baseline to capture now, reporting rhythm, and the measures not to use (advertising value equivalents).
7. Risks: issues that could attract negative coverage, how they are prepared for, and dependencies (product dates, approvals).
</task>

<constraints>
- Use only facts given for proof points and story evidence; mark stories that need evidence still to be gathered.
- Do not name specific journalists or claim specific outlets will cover anything; name outlet types and examples only as types.
- Calendar moments (awareness days, trade shows, holidays) are suggestions to verify for the country and year.
- Match ambition to resources and say plainly if the goals need more capacity than is available.
- No measures based on advertising value equivalents.
</constraints>

<output_format>
## Objectives
A table: Objective | Business goal | Measure | Target.
## Audiences and messages
## Story bank
A table: Story | Type | Audience | Hook or timing | Evidence needed | Readiness.
## Calendar
A table by month.
## Resources
## Measurement
## Risks
</output_format>
