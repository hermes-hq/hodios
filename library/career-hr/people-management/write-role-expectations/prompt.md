---
schema: 1
id: write-role-expectations
kind: prompt
title: Write expectations for a report's role
description: Writes a clear expectations document for one report's role covering outcomes, responsibilities, decision rights, ways of working and what good looks like at their level.
category: people-management
version: 1.0.0
status: incubating
stage: [plan]
role: [manager, engineering-manager, operations-manager, founder]
requires: [none]
inputs: [notes, document]
output: [docs, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [role-clarity, expectations, decision-rights, raci, levelling]
pairs_with:
  prompts: [set-goals-for-direct-report, build-career-ladder, plan-one-on-one]
  personas: [leadership-coach]
args:
  - name: role
    description: The role and level, the team it sits in, what the job description says (paste it if you have one), and what you actually need from the person day to day.
    type: text
    required: true
  - name: friction
    description: Where expectations have been unclear or caused friction so far, for example overlaps with a colleague, decisions they should or should not make alone, or quality bars that were assumed. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Purpose of the role, Outcomes, Responsibilities, Decision rights, Ways of working, What good looks like, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help managers write down what they expect from someone's role, which is the most common missing piece behind performance problems. Job descriptions are written to hire and are too generic to manage by; career ladders describe a level across many roles. What a person needs is a short document for their actual job: why the role exists, the outcomes it owns, the recurring responsibilities, which decisions they make alone, which they make after consulting someone and which they escalate, the working norms (hours, response times, how to flag risks), and concrete examples of what meets and exceeds the bar at their level. Unclear decision rights cause most of the friction between peers and between report and manager. Expectations work only when they are discussed and agreed, then revisited when the role changes.

<role>
{{role}}
</role>
{{#friction}}
<friction>
{{friction}}
</friction>
{{/friction}}
</context>

<task>
1. Purpose of the role: two or three sentences on why the role exists and who it serves.
2. Outcomes: three to five outcomes the role owns, each phrased as a result someone could check.
3. Responsibilities: the recurring work, grouped (for example delivery, quality, collaboration, people), with rough share of time if known.
4. Decision rights: a table of the decisions this role touches and whether the person decides alone, decides after consulting (name the role to consult), recommends for someone else to decide, or escalates. Address each friction point given.
5. Ways of working: the norms that matter for this role (availability, response times, how to raise risks early, documentation, meetings they own). Only include norms the manager has given or that clearly follow from the role; mark others as suggestions.
6. What good looks like: for each outcome, one example of meeting the bar and one of exceeding it, calibrated to their level.
7. Open questions: what the manager must decide or check (with HR, their own manager or peers) before sharing, and three questions to discuss with the report when agreeing it.
</task>

<constraints>
- Use only the facts given; mark gaps [X]. Do not invent targets or metrics.
- Keep it to what fits on about two pages; this is a working document, not a job description.
- Expectations must be about work and behaviour at work, not personality.
- If the role described is clearly overloaded (more than one person's job), say so plainly.
</constraints>

<output_format>
## Purpose of the role
## Outcomes
## Responsibilities
## Decision rights
Table: Decision | Decides alone | Consults | Recommends | Escalates.
## Ways of working
## What good looks like
Table: Outcome | Meets the bar | Exceeds the bar.
## Open questions
</output_format>
