---
schema: 1
id: prepare-30-60-90-plan-for-interview
kind: prompt
title: Prepare a 30-60-90 day plan for an interview
description: Writes a 30-60-90 day plan to present or hand over in an interview, built from what you know about the role from outside, with assumptions flagged and questions to test them.
category: interview-prep
version: 1.0.0
status: incubating
stage: [build]
role: [job-seeker, manager]
requires: [none]
inputs: [job-posting, notes]
output: [plan, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [thirty-sixty-ninety, first-90-days, final-round, interview-deliverable]
pairs_with:
  prompts: [plan-first-90-days, prepare-interview-presentation, research-company]
  personas: [interview-coach]
args:
  - name: role
    description: The job posting or a description of the role, its level and who it reports to.
    type: text
    required: true
  - name: what_you_know
    description: What you have learned about the company and team - from interviews so far, the website, news, people you spoke to - and anything the interviewer said the role must fix.
    type: text
    required: true
  - name: format
    description: How it will be used, for example "one-page handout", "5-minute presentation", "talking points if asked". Optional.
    type: string
output_contract:
  format: markdown
  sections: [Assumptions, First 30 days, Days 31 to 60, Days 61 to 90, How to present it, Questions to test the plan]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a hiring manager who has seen many interview 30-60-90 plans. The plan is not really a plan; it is evidence of how the candidate thinks. Good ones show a listening phase before change, name the stakeholders they would meet, tie early wins to the problem the interviewer said the role must solve, and say what success at day 90 looks like in measurable terms. Weak ones are generic onboarding lists ("meet the team, learn the tools") or the opposite: a newcomer announcing sweeping changes to a business they have seen only from outside, which signals arrogance. The best ones state assumptions openly and invite correction, which turns the plan into a conversation.

<role>
{{role}}
</role>

<what_you_know>
{{what_you_know}}
</what_you_know>
{{#format}}
Format: {{format}}
{{/format}}
</context>

<task>
1. Assumptions: list the four to six things the plan depends on that the candidate cannot know from outside (team size, current state, priorities, tools), each marked [assumption].
2. First 30 days (learn): who to meet and what to ask each, what to read or observe, one small quick win that does not require changing anyone's work.
3. Days 31 to 60 (contribute): two or three priorities tied directly to the problems the interviewer mentioned, with a concrete deliverable each.
4. Days 61 to 90 (own): what the candidate will be accountable for, and two or three measurable signs of success at day 90, stated as targets to agree with the manager, not promises.
5. How to present it: a 60-second spoken version and, if a format was given, how to fit it (one page, slide count, timing).
6. Questions to test the plan: three questions to ask the interviewer that check the assumptions.
</task>

<constraints>
- Use only facts given by the candidate. Mark anything else as [assumption] or [verify]; never invent the company's metrics, tools or problems.
- No big changes before day 60 unless the interviewer said something is urgent; if they did, address it early and say why.
- Keep each phase to three to five bullets. A plan longer than a page is not read.
- Targets must be framed as proposals to agree, with no invented numbers presented as fact.
</constraints>

<output_format>
## Assumptions
## First 30 days
## Days 31 to 60
## Days 61 to 90
## How to present it
## Questions to test the plan
</output_format>
