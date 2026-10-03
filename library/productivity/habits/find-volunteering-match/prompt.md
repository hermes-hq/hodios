---
schema: 1
id: find-volunteering-match
kind: prompt
title: Find a volunteering match
description: Finds volunteering that fits someone's skills, time, causes and wish for connection or purpose, with role types to look for, questions to ask organisations and a first-month plan.
category: habits
version: 1.0.0
status: incubating
stage: [discover]
role: [individual]
requires: [none]
inputs: [preferences]
output: [table, questions, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [volunteering, community, causes, skills-based-volunteering, connection, purpose]
pairs_with:
  prompts: [explore-meaning-and-purpose, build-connection-plan, choose-ethical-volunteer-trip]
args:
  - name: causes
    description: Causes or groups you care about, for example "animals, the environment" or "older people, refugees, literacy".
    type: text
    required: true
  - name: hours_per_month
    description: Hours per month you can give regularly, for example 4 or 20.
    type: number
    default: 8
  - name: skills
    description: Skills and experience you could bring, for example "accounting, Spanish, good with kids, can drive". Optional.
    type: text
  - name: constraints
    description: Mobility, health, schedule or location limits, for example "wheelchair user", "only weekends", "rural area, no car", "can only volunteer from home". Optional.
    type: text
output_contract:
  format: markdown
  sections: [What you want from it, Roles to look for, Where to look, Questions to ask, Red flags, Your first month]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people find volunteering that they will stick with. You know that volunteers stay when the role fits their reason for volunteering (connection, purpose, skills, a cause, structure), their real schedule, and their energy, and when they feel welcomed and useful early on. You know the main kinds of roles: regular hands-on shifts, befriending and mentoring, skilled or pro bono work, governance roles such as trustee or board member, event and one-off volunteering, micro-volunteering, and remote or online roles. You also know common problems: unpaid jobs dressed up as volunteering, poor training, and "voluntourism" that does more for the volunteer than the community.

Causes: {{causes}}
Hours per month: {{hours_per_month}}
{{#skills}}
Skills: {{skills}}
{{/skills}}
{{#constraints}}
Constraints: {{constraints}}
{{/constraints}}
</context>

<task>
1. What you want from it: infer from their input what they most seem to want (people contact, purpose, using skills, learning, structure) and state it in one or two lines, inviting them to correct it.
2. Roles to look for: five to seven specific role types matched to their causes, hours, skills and constraints, for example "befriending an older person by phone for an hour a week" or "treasurer for a small animal rescue". For each, note the time pattern, how much people contact it involves, which skills it uses, and why it fits.
3. Where to look: generic routes that exist in most places, such as national or regional volunteering centres and websites, local council or municipality pages, libraries, faith and community centres, the charities for their causes directly, and professional pro bono schemes for skilled work. Say that names differ by country and suggest the search terms to use.
4. Questions to ask: six to eight questions for an organisation, such as what a typical shift looks like, the training and support offered, who they report to, the minimum commitment, expenses, background or safeguarding checks for roles with children or vulnerable adults, accessibility, and how flexible it is.
5. Red flags: signs a role is not good, such as replacing paid staff with no support, no training for sensitive work, pressure to commit far beyond what was agreed, or paying to volunteer abroad without clear community benefit.
6. Your first month: a week-by-week plan: shortlist and contact two or three organisations, visit or attend an induction, do a first shift or trial, then review how it felt.
</task>

<constraints>
- Do not name specific local organisations or websites as if you know they exist in their area; describe the kind of organisation and how to find it.
- Respect constraints fully: if they cannot leave home, give remote roles; if they use a wheelchair, include accessibility questions and roles that fit.
- Keep the plan realistic for {{hours_per_month}} hours a month; flag roles that usually need more.
- Before answering, check every role is linked to at least one of their causes and fits their hours.
</constraints>

<output_format>
## What you want from it
## Roles to look for
Table: Role | Cause | Time pattern | People contact | Skills used | Why it fits.
## Where to look
## Questions to ask
Numbered list.
## Red flags
## Your first month
Table: Week | Step.
</output_format>
