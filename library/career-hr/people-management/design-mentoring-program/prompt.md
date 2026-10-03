---
schema: 1
id: design-mentoring-program
kind: prompt
title: Design a workplace mentoring programme
description: Designs a workplace mentoring programme with goals, matching, structure, mentor and mentee guides, and evaluation. Use when launching or relaunching mentoring for a group of employees.
category: people-management
version: 1.0.0
status: incubating
stage: [plan, design]
role: [recruiter, manager, operations-manager, executive]
requires: [none]
inputs: [text, notes]
output: [plan, docs, questions]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [mentoring-programme, mentor-matching, employee-development, sponsorship, retention]
pairs_with:
  prompts: [find-mentor, plan-internship-program, build-development-plan, build-career-ladder]
  personas: [leadership-coach, hr-business-partner]
args:
  - name: organisation
    description: Your organisation - size, locations, remote or on site, and any past mentoring attempts and what happened to them.
    type: text
    required: true
  - name: audience
    description: Who the programme is for (new joiners, first-time managers, underrepresented groups, high-potential staff, a specific function), roughly how many mentees and potential mentors, and the problem it should solve.
    type: text
    required: true
  - name: months
    description: Length of one programme cycle in months.
    type: number
    default: 6
output_contract:
  format: markdown
  sections: [Goals and measures, Programme model, Matching, Structure and timeline, Mentor guide, Mentee guide, Support and safeguards, Evaluation, Launch checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design workplace mentoring programmes. Most programmes start with enthusiasm and fade by month two. Matches are made on job title alone, pairs meet once with no agenda, mentors receive no guidance, nobody checks in, and success is never defined. Programmes that last start from a specific problem (for example, new-joiner retention, promotion rates for a group, or building managers). They match on the mentee's goals, give pairs a light structure and a first-meeting agenda, train mentors briefly, provide a no-fault way to end a mismatch, check in at set points, and measure outcomes as well as satisfaction. Mentoring (advice and perspective) is different from sponsorship (using influence to open doors). Programmes aimed at advancement often need both.

<organisation>
{{organisation}}
</organisation>

<audience>
{{audience}}
</audience>
Cycle length: {{months}} months
</context>

<task>
1. Goals and measures: restate the problem, and set two or three outcome measures (for example, retention at 12 months, internal moves, or promotion rates compared with a baseline) and two participation measures (meeting frequency, completion). Say how to get a baseline.
2. Programme model: choose and justify the format: one-to-one, group or circle mentoring, reverse mentoring, peer mentoring, or a mix. Say whether to add a sponsorship element and how. Consider the ratio of available mentors to mentees.
3. Matching: an application form for mentees (goals, preferences, availability) and for mentors (strengths, capacity, what they can offer), the matching criteria in priority order (mentee goals first; avoid matching within the same reporting line), who matches and how, and a no-fault rematch process after the first two meetings.
4. Structure and timeline: a month-by-month plan for {{months}} months, covering the launch event, a first-meeting agenda, a recommended meeting rhythm, mid-point and end check-ins, a closing session, and an optional continuation. Suggest a topic or prompt per month that pairs can use or ignore.
5. Mentor guide: one page on the role, boundaries (confidentiality and its limits, not acting as the mentee's manager, when to refer to HR or support services), good questions to ask, sharing experience without prescribing, and a time commitment.
6. Mentee guide: one page on owning the relationship, setting goals for the cycle, preparing for meetings, asking for specific help, and how to give feedback or end a mismatch.
7. Support and safeguards: a coordinator role with hours per week, mentor training (60 to 90 minutes), recognition for mentors, a confidentiality statement, a route for concerns, and how to keep the programme inclusive across locations and time zones.
8. Evaluation: short surveys at the mid-point and end, the outcome data to collect at 6 and 12 months, and how to decide whether to run another cycle and what to change.
9. Launch checklist: steps and owners from approval to the first meetings.
</task>

<constraints>
- Scale the design to the numbers given. If there are far fewer mentors than mentees, choose group formats or limit the intake and say why.
- If the programme targets an underrepresented group, keep it open and respectful, avoid framing participants as deficient, and consider sponsorship. Note that eligibility rules based on protected characteristics can raise legal questions in some countries, and suggest checking with HR or legal.
- Use only the details given; mark assumptions as [X] and ask about the most important at the end. If the organisation, audience or problem is too vague to design for, ask three focused questions first and give only a labelled skeleton.
- Keep guides practical and short; no generic inspirational language.
</constraints>

<output_format>
## Goals and measures
Table: Measure | Baseline | Target | Source.
## Programme model
## Matching
## Structure and timeline
Table: Month | Milestone | Suggested topic.
## Mentor guide
## Mentee guide
## Support and safeguards
## Evaluation
## Launch checklist
Table: Step | Owner | By when.
</output_format>
