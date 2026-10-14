---
schema: 1
id: design-new-elective-course
kind: prompt
title: Propose a new elective course
description: Writes a teacher's approval-ready proposal for a new school elective with rationale, evidence of demand, audience, outline, assessment, resources, costs and answers to likely objections.
category: course-design
version: 1.0.0
status: incubating
stage: [plan, design]
role: [teacher]
subject: [education-sector]
requires: [none]
inputs: [text, preferences]
output: [report, outline, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [elective-course, course-proposal, school-leadership, student-choice, course-approval, secondary-school]
pairs_with:
  prompts: [write-course-syllabus, write-learning-objectives, design-course-outline]
args:
  - name: idea
    description: The elective you want to teach, why, and what students would do in it.
    type: text
    required: true
  - name: school_context
    description: Grade levels, length (semester or year), class size, the approval process you know of, and any requirements (credits, standards, graduation pathways).
    type: text
    required: true
  - name: background
    description: Optional. Your qualifications and experience relevant to the subject.
    type: text
output_contract:
  format: markdown
  sections: [Proposal summary, Rationale and demand, Audience and prerequisites, Course outline, Assessment, Resources and costs, Fit with requirements, Likely questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help teachers get new electives approved. Approvers (department heads, principals, curriculum committees, boards) rarely say no to the idea itself; they say no because of practical questions the proposal did not answer: will enough students choose it, who teaches it if this teacher leaves, does it overlap an existing course, what does it cost, does it fit the timetable and staffing, does it count toward any credit or graduation requirement, is it accessible to all students regardless of prior courses or money, and how will we know it worked. A strong proposal is short, leads with student benefit, shows evidence of demand (a survey, interest list, links to pathways or local employers), and gives a believable unit outline and assessment plan.

<idea>
{{idea}}
</idea>
<school_context>
{{school_context}}
</school_context>
{{#background}}Teacher background: {{background}}{{/background}}
</context>

<task>
1. **Proposal summary:** title, grade levels, length, and a three-sentence pitch for students and approvers.
2. **Rationale and demand:** why this course, what students gain that current courses do not give, and how to show demand. If no evidence is given, write a short student interest survey (five questions) to run before submitting.
3. **Audience and prerequisites:** who it is for, prerequisites (keep them minimal), and how it supports students with diverse needs.
4. **Course outline:** six to ten units with a one-line description and approximate weeks each, and the major project or culminating task.
5. **Assessment:** the assessment mix, the culminating task, and how grades are decided.
6. **Resources and costs:** materials, technology, space, field trips or speakers, with rough cost items listed for the school to price (no invented prices), and options to run it at low cost.
7. **Fit with requirements:** how it fits credit, standards or pathway requirements as given; anything the user must confirm.
8. **Likely questions:** five objections an approver may raise (enrolment, overlap, staffing, cost, rigour) with a short answer to each.
</task>

<constraints>
- Do not invent standards codes, credit rules, enrolment numbers or survey results. Mark what must be confirmed [confirm].
- Keep the proposal to what a busy approver can read in five minutes, about two pages before any appendix.
- Avoid inflated claims ("will transform students' futures"); state concrete outcomes.
- If the idea is unclear (no topic or no grade level), ask and stop.
</constraints>

<output_format>
## Proposal summary
## Rationale and demand
Paragraph, then the survey if needed.
## Audience and prerequisites
## Course outline
Table: Unit | Weeks | Focus.
## Assessment
Table: Component | Weight | Description.
## Resources and costs
Table: Item | Needed for | Cost to confirm | Low-cost option.
## Fit with requirements
## Likely questions
Q and A pairs.
</output_format>
