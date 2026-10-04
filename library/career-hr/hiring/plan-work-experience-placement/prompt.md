---
schema: 1
id: plan-work-experience-placement
kind: prompt
title: Plan a work experience placement
description: Plans a one or two week work experience placement for a school or college student, with safeguarding and insurance checks, a daily schedule of real tasks, a supervisor and an end reference.
category: hiring
version: 1.0.0
status: incubating
stage: [plan]
role: [manager, founder, teacher]
requires: [none]
inputs: [text]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [work-experience, young-workers, school-placement, safeguarding, early-careers, host-employer]
pairs_with:
  prompts: [plan-internship-program, plan-new-hire-onboarding, write-reference-letter]
args:
  - name: workplace
    description: What your workplace does, its size, the teams or areas the student could join, hazards on site (machinery, vehicles, chemicals, lone working), and who could supervise.
    type: text
    required: true
  - name: student_age
    description: The student's age in years. Rules on hours, breaks and permitted tasks are stricter for younger students.
    type: number
    required: true
  - name: days
    description: Number of working days in the placement.
    type: number
    default: 5
  - name: country
    description: Country (and region, if rules differ) where the placement happens, so the checks can point to the right official guidance. Leave empty for a general version.
    type: string
output_contract:
  format: markdown
  sections: [Before the placement, Supervisor brief, Day by day, Safeguarding basics, End of placement, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help employers, often small ones, host a school or college student for a short unpaid work experience placement. A good placement gives the student real, useful tasks with someone looking out for them, a taste of several roles, and a reference they can use. Placements go wrong when nobody is assigned to the student, the days are spent watching or photocopying, nobody checks the hazards for a young person, insurance and the school's paperwork are left to the first morning, or the student ends up alone with one adult out of sight. Schools and colleges normally have their own placement agreement, health and safety checks and contact teacher; the employer's job is to fill them in honestly and follow them.

<workplace>
{{workplace}}
</workplace>
Student age: {{student_age}}
Placement length: {{days}} days
{{#country}}Country: {{country}}{{/country}}
</context>

<task>
1. If the workplace description gives no idea of the work or the site (for example "a company"), ask what the business does and what hazards exist, and stop.
2. Before the placement: a checklist with who does each item and by when. Include the school or college's placement agreement and contact teacher; a risk assessment that considers a young person aged {{student_age}} (inexperience, unfamiliar hazards, tasks or equipment young workers must not use, hours and breaks); confirming with the employer's insurer that work experience students are covered; any background checks the school or local rules expect of the supervisor; emergency contacts, medical needs and any learning or access needs shared by the school; and joining instructions for the student (start time, dress, what to bring, who to ask for).
3. Supervisor brief: one named supervisor and a backup, what they do each day (morning plan, midday check-in, end-of-day review), and how to give feedback to a teenager.
4. Day by day: a schedule for {{days}} days with real tasks from the workplace description, spread across different roles or teams, with a learning goal per day, a short project the student owns across the placement, and time to talk to people about their careers. Day one is induction: site safety, fire and first aid, welfare facilities, confidentiality, phone and social media rules.
5. Safeguarding basics: practical rules for staff (work in open or shared spaces, contact only through work channels, no personal social media contact, no lifts home alone), and what to do if the student discloses something worrying or is hurt: who to tell at the school, the same day.
6. End of placement: a feedback conversation, a short certificate or summary of what they did, and a reference template covering reliability, tasks done, strengths and one area to develop.
7. Open questions: anything the plan assumes that the employer must confirm.
</task>

<constraints>
- Rules on young workers' hours, breaks, prohibited tasks, insurance and checks differ by country and change. Name the kind of rule to check and the official source to check it with{{#country}} in {{country}}{{/country}}, and never state limits or legal requirements as settled facts.
- Use only tasks plausible for this workplace. Exclude anything the risk assessment would likely rule out for a {{student_age}}-year-old and say why.
- Keep the schedule realistic for a student: shorter days if young, regular breaks, and nothing that depends on a client-facing role they are not ready for without supervision.
- No unpaid work that replaces a paid role: tasks are for learning and contribution, not cover for a gap in staffing.
- Before answering, check that every day has a named supervisor, a real task and a learning goal, and that each checklist item has an owner.
</constraints>

<output_format>
Markdown with these headings:
## Before the placement
Checklist table: Item | Owner (employer, school, student) | When.
## Supervisor brief
## Day by day
Table: Day | Morning | Afternoon | Learning goal | Supervisor.
## Safeguarding basics
## End of placement
Including the reference template with [placeholders].
## Open questions
</output_format>
