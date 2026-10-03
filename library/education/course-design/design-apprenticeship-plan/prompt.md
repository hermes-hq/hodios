---
schema: 1
id: design-apprenticeship-plan
kind: prompt
title: Design an apprenticeship training plan
description: Designs an on-the-job training plan for an apprentice or trainee with a competency matrix, rotations, sign-offs, mentoring and review points. For trades, workshops and small businesses.
category: course-design
version: 1.0.0
status: incubating
stage: [plan, design]
role: [manager, founder, operations-manager]
requires: [none]
inputs: [notes, preferences]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [apprenticeship, on-the-job-training, competency-matrix, trades, apprentice-mentor, workplace-learning]
pairs_with:
  prompts: [design-onboarding-curriculum, run-training-needs-analysis, evaluate-training-effectiveness]
  personas: [corporate-trainer]
args:
  - name: role
    description: The trade or role the apprentice is training for and the workplace, e.g. "electrician apprentice in a 6-person domestic electrical firm", "commis chef in a 40-cover restaurant".
    type: string
    required: true
  - name: competencies
    description: The skills and knowledge the apprentice must reach, from an official standard if one applies or your own list, plus anything the business especially needs.
    type: text
    required: true
  - name: months
    description: Length of the plan in months.
    type: number
    default: 12
output_contract:
  format: markdown
  sections: [Plan overview, Competency matrix, Rotations and timeline, Sign-offs, Mentoring, Review points, Logbook template, Assumptions and checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An apprenticeship succeeds when the apprentice moves steadily from watching to doing under supervision to working independently, with every step recorded and checked by someone competent. In small businesses the risk is the opposite of a classroom: apprentices get stuck on the same low-level jobs because they are useful, or are left alone on tasks before they are safe. A plan fixes this with a competency matrix, a sequence of rotations or job types, clear sign-off evidence, regular mentoring, and formal reviews. Many countries have official apprenticeship standards, off-the-job training requirements, college components and end-point or trade assessments; those rules vary and must be checked rather than assumed.
</context>

<task>
Design a {{months}}-month training plan for an apprentice in the role **{{role}}**.

<competencies>
{{competencies}}
</competencies>

1. If the competencies are a short list of headings with no detail, break each into observable tasks a competent worker performs, and mark this breakdown "drafted, confirm with your standard or assessor". If you do not know whether an official standard or licence applies, ask the user which country or framework applies, or say clearly that they must check.
2. **Plan overview:** what the apprentice will be able to do at the end, the progression stages (for example: induction and safety, supervised core tasks, wider range with less supervision, independent work with checks), and how off-the-job learning (college days, courses, study time) fits around the work.
3. **Competency matrix:** each competency broken into tasks, with a four-level scale: 1 = has seen it done and can explain it; 2 = does it under direct supervision; 3 = does it independently with work checked; 4 = competent and could show someone else. Give the target level and target month for each task.
4. **Rotations and timeline:** month by month, the kinds of jobs, areas or sites the apprentice works on, which competencies each builds, and who supervises. Make sure no competency is starved because the apprentice is always kept on the most useful job.
5. **Sign-offs:** for each safety-critical or high-risk task, the evidence needed (observed several times, a work sample, a question-and-answer check), who is competent to sign, and the rule that the apprentice must not do it unsupervised before sign-off.
6. **Mentoring:** who mentors, weekly check-in format (15 minutes is enough: what went well, what was hard, what to try next week, logbook review), and how the mentor's time is protected.
7. **Review points:** formal reviews (for example at 1, 3, 6, 9 and 12 months) with the apprentice, mentor and any college or assessor, what is reviewed, and what happens if progress is behind (extra practice, changed rotation, support for learning needs).
8. **Logbook template:** a simple record the apprentice fills in after each job and the mentor countersigns.
</task>

<constraints>
- Safety first: anything involving electricity, gas, heights, machinery, chemicals, food safety, vehicles or vulnerable people is gated behind supervision and sign-off, and you do not invent the legal requirements for it; tell the user to confirm them with the relevant regulator, awarding body or insurer.
- Do not state funding rules, wage rates, off-the-job hour requirements or legal obligations as fact; list them under "Assumptions and checks".
- Keep paperwork light enough for a small business: one matrix, one logbook, short reviews.
- Write the plan so it is fair and supportive: progress gaps are treated as a training problem first, not a disciplinary one.
</constraints>

<output_format>
## Plan overview
Short paragraphs and the progression stages.
## Competency matrix
Table: Competency | Task | Target level (1-4) | Target month | Current level (blank to fill).
## Rotations and timeline
Table: Months | Work focus | Competencies built | Supervisor.
## Sign-offs
Table: Task | Evidence | Signed by | Unsupervised only after.
## Mentoring
Bullets plus the weekly check-in agenda.
## Review points
Table: Month | Who | What is reviewed | If behind.
## Logbook template
Fields to fill in.
## Assumptions and checks
Bullets: what to confirm with the standard, college, regulator or insurer.
</output_format>
