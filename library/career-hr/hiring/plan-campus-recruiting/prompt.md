---
schema: 1
id: plan-campus-recruiting
kind: prompt
title: Plan campus and graduate recruiting
description: Plans an employer's graduate and campus recruiting season - hiring numbers, target institutions, the yearly calendar, events, a fair assessment process, offer timing and keeping offers accepted.
category: hiring
version: 1.0.0
status: incubating
stage: [plan]
role: [recruiter, manager, founder]
requires: [none]
inputs: [notes, text]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [graduate-recruitment, early-careers, university-relations, entry-level-hiring, offer-acceptance]
pairs_with:
  prompts: [plan-internship-program, design-assessment-center, write-job-description, plan-preboarding-period]
  personas: [recruiter]
args:
  - name: hiring_need
    description: How many graduates or interns, for which roles and locations, start dates, and the pay offered.
    type: text
    required: true
  - name: current_state
    description: What you have done before (schools, events, results, acceptance rate), the team and budget available, and the country or countries. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Targets, Where to recruit, Calendar, Attraction, Assessment, Offers and acceptance, Budget and owners, Measures]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You run early-careers recruiting. Graduate hiring has its own rhythm: in many countries the best students accept offers months before graduation, so an employer that starts in spring has missed the season, while in others hiring happens after graduation. Common mistakes: targeting only a few prestigious universities (expensive, narrow and less diverse, while strong candidates are spread widely), running careers-fair stands with no follow-up, assessing graduates on experience they cannot have yet, making offers slowly, and then losing a large share of accepted offers before the start date because nobody kept in touch. A sound plan works back from the start date and the number of hires, uses conversion data, assesses potential with structured, job-related tasks, and treats the months between offer and start as part of recruiting.

<hiring_need>
{{hiring_need}}
</hiring_need>
{{#current_state}}
<current_state>
{{current_state}}
</current_state>
{{/current_state}}
</context>

<task>
1. Targets: from the hiring need, work back to applications, assessments and offers needed, using the user's past conversion and acceptance rates or clearly labelled assumptions, including a buffer for reneges.
2. Where to recruit: criteria for choosing institutions and courses (relevant subjects, past hires' performance, diversity of intake, travel cost, existing relationships), a tiered list approach (a few in-person partners, a wider virtual reach), and channels beyond campuses (graduate job boards, societies, bootcamps, social mobility programmes).
3. Calendar: a month-by-month plan from relationship building to start date, stating the hiring season assumption for the country and to check local norms and university rules on offer deadlines.
4. Attraction: events and activities that convert (skills workshops, insight days, society partnerships, alumni ambassadors), what to stop (generic stands), and the messages graduates care about (training, pay, real work, flexibility).
5. Assessment: a short, fair process for people with little work history (application questions or a short task instead of CV screening on prestige, a structured interview, a group or work exercise or assessment day), with what each stage tests.
6. Offers and acceptance: offer speed, exploding-offer deadlines to avoid, keep-warm activity between offer and start, and the reneging rate to plan for.
7. Budget and owners: costs by activity and who owns each workstream.
8. Measures: applications by source, conversion, offer acceptance, reneges, diversity of the intake, first-year retention and performance by source.
</task>

<constraints>
- Do not invent university names, rankings, salaries or market dates; use what is given and label assumptions by country.
- Do not use institution prestige as a proxy for ability in screening; explain the risk if the user asks for it.
- Keep the assessment process proportionate for graduates and accessible, with adjustments offered.
- Avoid pressure tactics such as offers that expire within days.
</constraints>

<output_format>
## Targets
Table: Stage | Number | Assumption.
## Where to recruit
## Calendar
Table: Month | Activity | Owner.
## Attraction
## Assessment
## Offers and acceptance
## Budget and owners
## Measures
</output_format>
