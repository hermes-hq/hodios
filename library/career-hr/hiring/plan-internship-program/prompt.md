---
schema: 1
id: plan-internship-program
kind: prompt
title: Design an internship programme
description: Designs an internship programme with real projects, mentors, a weekly schedule, learning goals, fair evaluation and a path to full-time offers. Use when starting or fixing an internship scheme.
category: hiring
version: 1.0.0
status: incubating
stage: [plan, design]
role: [manager, engineering-manager, recruiter, founder]
requires: [none]
inputs: [text, notes]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [internships, early-careers, graduate-hiring, intern-mentors, intern-projects]
pairs_with:
  prompts: [design-interview-loop, plan-new-hire-onboarding, design-mentoring-program, write-job-description]
  personas: [recruiter, hr-business-partner]
args:
  - name: organisation
    description: Your organisation, the teams that will host interns, the fields (engineering, marketing, finance...), the country, and whether interns will be paid, remote, hybrid or on site.
    type: string
    required: true
  - name: number_of_interns
    description: How many interns you plan to host.
    type: number
    required: true
  - name: weeks
    description: Length of the internship in weeks.
    type: number
    default: 10
output_contract:
  format: markdown
  sections: [Programme goals, Projects, Mentors and managers, Schedule, Learning plan, Evaluation, Conversion to full-time, Before launch]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design early-career programmes. Strong internships are a hiring pipeline and a reputation builder at once. Interns leave telling peers whether the work was real, whether someone invested in them, and whether they were treated fairly. Most programmes fail on preparation, not intent. Projects are not scoped before day one, mentors have no time set aside, the interns do busywork, the evaluation is one manager's gut feeling in the last week, and offers come too late to compete. Good programmes have scoped projects that ship something by the end, a mentor and a manager with protected time, a weekly rhythm, mid-point feedback, and an offer decision process that is explicit and fair.

<organisation>
{{organisation}}
</organisation>
Interns: {{number_of_interns}}
Length: {{weeks}} weeks
</context>

<task>
1. Programme goals: three measurable goals (for example, the offer-acceptance rate, intern satisfaction, and projects shipped), plus what the organisation and the interns each get out of it.
2. Projects: criteria for a good intern project (real value, scoped to ship in about two-thirds of the time, low risk if unfinished, a clear owner). Give a one-page project brief template and two example project ideas per host team, inferred from the organisation description and marked as examples to replace.
3. Mentors and managers: separate the roles (the manager sets goals and evaluates; the mentor is a day-to-day guide and does not evaluate), the time commitment for each per week, how to choose and prepare them, and a mentor-to-intern ratio for {{number_of_interns}} interns.
4. Schedule: a week-by-week plan for {{weeks}} weeks: pre-arrival (equipment, accounts, project brief ready), week one onboarding, project milestones, a mid-point review, social and cohort events, a final presentation, and an exit survey. Adjust the timing to the length given.
5. Learning plan: the skills interns should build, both technical and professional. Cover regular learning sessions, shadowing, and how to make sure remote or hybrid interns get the same access.
6. Evaluation: a short rubric with three to five criteria and behavioural anchors for each level. Include the mid-point feedback conversation, the evidence managers must collect, and a calibration step across hosts so that offers are not one person's opinion.
7. Conversion to full-time: the offer decision timeline (ideally before the internship ends), who decides, how return offers are made and followed up, and how to keep in touch with those who are not converted but did well.
8. Before launch: a checklist covering budget and pay, approvals, legal and visa checks, the recruiting timeline, accessibility and adjustments, and a feedback loop for next year. Note that internship pay, working-hours and student-visa rules vary by country and should be checked with HR or legal; recommend paying interns at least the applicable minimum wage, because unpaid internships are restricted in many places and exclude people who cannot afford them.
</task>

<constraints>
- Fit the scale: a programme for 2 interns should be simple, one for 40 needs coordinators and cohort structure. Say what changes at their scale.
- Do not state legal requirements as fact; flag what to verify locally.
- Use only the details given; mark assumptions and missing facts as [X] and ask about the most important ones at the end.
- Treat interns as junior colleagues: no busywork-only projects and no unpaid overtime.
- If the plan is really to fill ordinary staff roles with unpaid or underpaid interns, say so, explain the legal and fairness risk, and offer a paid alternative instead of designing it.
</constraints>

<output_format>
## Programme goals
## Projects
Criteria, brief template, example ideas.
## Mentors and managers
Table: Role | Responsibilities | Hours per week | Preparation.
## Schedule
Table: Week | Milestone | Owner.
## Learning plan
## Evaluation
Rubric table: Criterion | Developing | Meets | Exceeds.
## Conversion to full-time
## Before launch
Checklist, then up to three questions.
</output_format>
