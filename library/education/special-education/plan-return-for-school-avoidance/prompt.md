---
schema: 1
id: plan-return-for-school-avoidance
kind: prompt
title: Plan a return for a pupil avoiding school
description: Plans a school's gradual, supported return for a pupil whose attendance has dropped because of anxiety or unmet needs, with the pupil's view, adjustments, a stepped timetable and family partnership.
category: special-education
version: 1.0.0
status: incubating
stage: [plan]
role: [teacher]
requires: [none]
inputs: [notes, text]
output: [plan, table, checklist]
risk: read-only
advice_risk: [mental-health]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
subject: [education-sector]
tags: [school-avoidance, attendance, anxiety-support, reintegration, part-time-timetable, family-partnership]
pairs_with:
  prompts: [gather-pupil-views-for-review, plan-sensory-friendly-classroom]
  personas: [special-education-advisor]
args:
  - name: pupil
    description: About the pupil (initials only) - age, attendance pattern and how long, what the pupil and family say makes school hard, known needs and support, what has been tried, what goes well, and professionals involved.
    type: text
    required: true
  - name: setting
    description: Country and school type. Optional; attendance rules and support services differ.
    type: string
output_contract:
  format: markdown
  sections: [Understanding the barriers, The pupil's view, Adjustments in school, Stepped return plan, Working with the family, When to involve others, Review]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a school plan how a pupil whose attendance has collapsed can come back. Long absence that starts with anxiety or distress is rarely "won't go"; often it is "can't go yet", driven by unmet learning or sensory needs, social difficulties, bullying, transitions or worries at home. Pushing for full-time attendance immediately, or treating the family as the problem, usually deepens avoidance; but leaving the pupil at home for months makes return harder. Experienced pastoral and inclusion leads find out what the pupil experiences as hard, fix what the school can change, agree a stepped plan with small, achievable steps starting from what the pupil can manage now, give a key adult and a safe base, keep a link while at home, and review often. Pupils with special educational needs, including autistic pupils, are over-represented in this group.

Pupil: {{pupil}}
{{#setting}}Setting: {{setting}}{{/setting}}
</context>

<task>
1. Understanding the barriers: from the information, list possible push factors (what makes school hard) and pull factors (what makes home easier), separating facts from hypotheses, and missing information.
2. The pupil's view: how to hear it in a way that suits them (a trusted adult, at home or a neutral place, visual tools or writing, no pressure), and questions to ask.
3. Adjustments in school: changes that address the barriers - a key adult, a safe base, arrival routines, a quiet start, sensory adjustments, lesson or seating changes, a pass for breaks, peer support, work set at the right level - and support for any unmet learning needs.
4. Stepped return plan: steps starting from what the pupil can do now (for example a visit after school, meeting the key adult, one favourite lesson), increasing gradually, each with a success criterion and a time frame that moves forward when the step is managed comfortably, and what happens after a setback.
5. Working with the family: regular contact, shared language, how mornings are handled at home and at school, and support for parents.
6. When to involve others: the school's health or mental health links, the family doctor, special educational needs services, and attendance or welfare services; and the urgent route if there are signs of risk.
7. Review: how often, what data (attendance per step, the pupil's own rating of anxiety or comfort), and who attends.
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- Do not diagnose anxiety disorders or other conditions; describe what is observed and recommend the right professional.
- If anything suggests self-harm, suicidal thoughts, abuse or neglect, the plan stops and the concern goes to the designated safeguarding lead the same day, and to emergency services if there is immediate danger.
- Attendance law, part-time timetable rules and services differ by country and school type; say to check local rules, and note that reduced timetables are usually expected to be short-term and reviewed.
- Never recommend physically forcing a pupil into school or using threats.
- Initials only.
</constraints>

<output_format>
## Understanding the barriers
Table: Push or pull factor | Evidence | Fact or hypothesis.
## The pupil's view
## Adjustments in school
## Stepped return plan
Table: Step | What happens | Success criterion | Expected time.
## Working with the family
## When to involve others
## Review
</output_format>
