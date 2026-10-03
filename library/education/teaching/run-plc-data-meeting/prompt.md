---
schema: 1
id: run-plc-data-meeting
kind: prompt
title: Plan a PLC data meeting
description: Plans a professional learning community data meeting with a protocol, the data to bring, analysis questions, a decision on one instructional change and follow-up commitments.
category: teaching
version: 1.0.0
status: incubating
stage: [plan]
role: [teacher, manager]
requires: [none]
inputs: [topic, dataset]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [plc, data-team, meeting-protocol, collaborative-inquiry, instructional-improvement, common-assessment]
pairs_with:
  prompts: [analyze-class-assessment-results, plan-intervention-group, write-lesson-observation-feedback]
  personas: [instructional-coach]
args:
  - name: data_focus
    description: The data and question the team is looking at, e.g. "results of our common Grade 6 fractions assessment" or "Year 9 reading comprehension, the inference questions on the autumn test".
    type: text
    required: true
  - name: team
    description: Optional description of the team, e.g. "four Grade 6 maths teachers and an instructional coach", "English department, 7 people".
    type: string
  - name: minutes
    description: Meeting length in minutes.
    type: number
    default: 45
output_contract:
  format: markdown
  sections: [Purpose and outcome, Pre-work and data to bring, Roles and norms, Agenda, Analysis questions, Decision, Commitments and follow-up, Notes template]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Data meetings help students only when they end with teachers doing something different in class next week. They usually fail in three ways: the data is too broad (overall percentages or grades) to point to anything teachable; the talk jumps straight from numbers to explanations that blame students, families or last year's teacher; or the meeting ends with "let's keep an eye on it". Structured protocols prevent this by separating what we see from what we infer, looking at item-level results and actual student work, focusing on what is within the team's control (instruction), and ending with one specific, shared change and a date to check whether it worked.
</context>

<task>
Plan a {{minutes}}-minute PLC data meeting{{#team}} for {{team}}{{/team}} on:

<data_focus>
{{data_focus}}
</data_focus>

1. **Purpose and outcome:** the question the meeting answers and the concrete output (one agreed instructional change, a regrouping plan, a reteach lesson).
2. **Pre-work and data to bring:** exactly which data each teacher brings (item-level or standard-level results, not only totals; 3 to 5 samples of student work at different levels, anonymised; the task or questions themselves), how to prepare it (for example a shared spreadsheet with one row per item), and a 10-minute pre-task such as solving the assessment items themselves and predicting the hardest one.
3. **Roles and norms:** facilitator, timekeeper, note-taker, and 4 or 5 norms, including "describe before interpreting" and "talk about instruction, not students' backgrounds".
4. **Agenda:** a timed protocol adding up to {{minutes}} minutes, for example: purpose and norms; what do we notice (observations only, no inferences); what do we wonder; looking at student work for the highest-leverage gap; root cause in instruction; deciding one change; planning the change concretely; commitments; meeting reflection.
5. **Analysis questions:** 6 to 10 questions to drive each phase (for example "Which items did fewer than 60% of students answer correctly?", "What do the wrong answers have in common?", "Which class did better on item 7, and what did that teacher do differently?", "What misconception would produce this answer?").
6. **Decision:** how the team chooses one instructional change: criteria (affects many students, within our control, can be done in the next two weeks, measurable) and a format for writing it ("In the next two weeks, we will… when teaching…, and we will know it worked if…").
7. **Commitments and follow-up:** who does what by when, the short common check the team will use to measure the change, and the date of the follow-up meeting.
8. **Notes template:** a one-page template for the note-taker.
</task>

<constraints>
- Keep the conversation about instruction and evidence; include a facilitator move to redirect comments that blame students or families.
- Student data stays anonymised in shared notes; refer to students by code or initials, and to classes rather than individual teachers when sharing outside the team.
- Comparing classes is for learning from each other, not for ranking teachers; say so in the norms.
- If {{minutes}} minutes is short (under about 30), move data organisation and first noticing into pre-work and keep the meeting for interpretation, the decision and commitments.
- If the data focus is too vague to analyse (for example "our results"), narrow it to one assessment and one skill area and say so.
</constraints>

<output_format>
## Purpose and outcome
## Pre-work and data to bring
Bullets per person or role.
## Roles and norms
## Agenda
Table: Minutes | Step | What happens | Output. Times add up to {{minutes}}.
## Analysis questions
Grouped by agenda step.
## Decision
Criteria and the decision sentence format.
## Commitments and follow-up
Table: Who | What | By when | Evidence.
## Notes template
A copyable template.
</output_format>
