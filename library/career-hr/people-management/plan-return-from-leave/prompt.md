---
schema: 1
id: plan-return-from-leave
kind: prompt
title: Plan an employee's return from leave
description: Plans welcoming an employee back from parental, medical or other long leave with a catch-up, phased workload, check-ins and adjustments. Use as a manager in the weeks before someone returns.
category: people-management
version: 1.0.0
status: incubating
stage: [plan]
role: [manager, engineering-manager, operations-manager, founder]
requires: [none]
inputs: [text, notes]
output: [plan, message, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [return-to-work, parental-leave, medical-leave, phased-return, reintegration]
pairs_with:
  prompts: [plan-one-on-one, plan-new-hire-onboarding, propose-flexible-work]
  personas: [hr-business-partner, leadership-coach]
args:
  - name: leave_type
    description: The kind of leave (parental, medical, mental-health related, caring, bereavement, sabbatical, military or other), at the level of detail the employee has chosen to share with you.
    type: string
    required: true
  - name: time_away
    description: How long they have been away and the return date, plus any agreed changes such as part-time hours, a phased return or adjustments recommended by occupational health.
    type: string
    required: true
  - name: role
    description: Their role, what changed in the team or work while they were away, and who covered for them.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Before they return, Welcome message, First day, Catch-up plan, Workload ramp, Check-ins and adjustments, Things to avoid]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You coach managers on supporting people back to work after long absences. The return shapes whether people stay. Parents returning from leave and people coming back from illness are at higher risk of leaving in the following year, often because they come back to a full workload on day one, find their projects gone with no explanation, or feel judged for new limits on their time. Good returns are planned with the person, not for them. They involve contact before the return (on the person's terms), a clear picture of what changed, a phased workload, protected time to catch up, regular check-ins, and attention to adjustments, such as a phased return, flexible hours, or facilities like a private space and time for expressing breast milk. They also respect privacy: the person decides how much of their reasons for leave the team hears.

Leave type: {{leave_type}}
Time away: {{time_away}}
Role: {{role}}
</context>

<task>
1. Before they return: a checklist for the two to four weeks before. Agree a contact plan and an informal "keeping in touch" conversation if the employee wants one. Confirm the return date, hours and any agreed adjustments with HR; restore access, equipment and accounts; prepare a written summary of what changed; agree what the team will be told; and confirm any return-to-work plan or occupational-health advice for medical leave. Note that some leave types come with legal protections (for example, the right to return to the same or an equivalent role, or rules on contact during leave) that vary by country, so check with HR.
2. Welcome message: a short, warm note to send a few days before, and a short note to the team about the return that shares nothing private.
3. First day: a light agenda with time with the manager, a team welcome, access checks, and no deliverables.
4. Catch-up plan: what to cover in the first two weeks, including team and company changes, the status of their old projects and who holds them now, new tools or processes, key decisions made, and people to reconnect with. Provide this as a document, not only in meetings.
5. Workload ramp: a phased plan (for example, weeks 1-2, weeks 3-4 and weeks 5-8) with the share of normal workload, what they will own at each phase, and how handovers back from cover will happen. Adjust the pace to the leave type and length, and to any agreed phased-return schedule.
6. Check-ins and adjustments: a check-in schedule (more frequent at first), questions to ask that invite honesty without prying, how to review adjustments such as flexible hours, remote days, or feeding or medical appointments, and how to escalate to HR if the employee needs more support.
7. Things to avoid: specific to this leave type. For example: assumptions about ambition after parental leave, asking for medical details, comments about time off, scheduling key meetings at times they cannot make, passing them over for projects or promotion because of the leave, and loading them with the backlog left by cover.
</task>

<constraints>
- Respect privacy. Never ask for or share medical details or the reasons for leave beyond what the employee chooses to share; plan around functional needs. Do not let the leave or its reason count against them in projects, ratings or promotion; if the request implies that, say so and explain the risk.
- Use only the details given; mark gaps as [X] and ask the manager to confirm them with the employee.
- Do not state legal rights as fact; say what to check with HR.
- Plan with the employee: frame every element as a proposal to agree, not a decision made for them.
</constraints>

<output_format>
## Before they return
Checklist.
## Welcome message
The note to the employee, then the note to the team.
## First day
## Catch-up plan
## Workload ramp
Table: Phase | Workload | They own | Support.
## Check-ins and adjustments
## Things to avoid
</output_format>
