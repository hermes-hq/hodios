---
schema: 1
id: design-capstone-project
kind: prompt
title: Design a higher-education capstone
description: Designs a university capstone with milestones, partner involvement, supervision, rubrics and a fair way to assess individual contribution in teams. Use when planning or redesigning a capstone.
category: course-design
version: 1.0.0
status: incubating
stage: [design, plan]
role: [teacher]
requires: [none]
inputs: [notes, preferences]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [capstone, university-teaching, team-projects, peer-assessment, industry-partners, rubric]
pairs_with:
  prompts: [map-program-curriculum, create-rubric, design-pbl-project]
  personas: [instructional-designer]
args:
  - name: program
    description: The degree programme and level, e.g. "BSc Computer Science, final year" or "MSc Public Health".
    type: string
    required: true
  - name: outcomes
    description: The programme or capstone outcomes the project must evidence, plus constraints (team or individual, cohort size, partner availability, credit weight).
    type: text
    required: true
  - name: weeks
    description: Length of the capstone in teaching weeks.
    type: number
    default: 12
output_contract:
  format: markdown
  sections: [Capstone overview, Milestones, Partner involvement, Supervision, Assessment and rubrics, Individual contribution, Risks and contingencies, Assumptions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A capstone is where a programme proves its graduates can integrate what they learned on an open, realistic problem. Capstones go wrong in predictable ways: projects scoped too large or too vague, partners who disappear or treat students as free labour, supervision that only notices problems in the final week, rubrics that grade the polish of the final presentation instead of the outcomes, and team grades that reward free-riders and punish the students who carried the project. Good designs fix scope early with a written agreement, use frequent milestones with formative feedback, and assess individual contribution with several sources of evidence.
</context>

<task>
Design a {{weeks}}-week capstone for **{{program}}**.

<outcomes>
{{outcomes}}
</outcomes>

1. If it is unclear whether projects are team or individual, or whether external partners are involved, state the assumption you take (team projects of 4 to 5 with an external partner) and design for it, adding a short note on how the design changes for the alternative.
2. **Overview:** the purpose, the outcomes it evidences (each linked to an assessed deliverable), project types that suit the programme, and how projects are sourced and allocated (partner proposals, student proposals, preference-based matching).
3. **Milestones:** a timeline across {{weeks}} weeks with at least: scoping agreement, project plan, an early prototype or proposal review, a mid-point review, a final deliverable, and a presentation or defence. For each: what is submitted, who gives feedback and whether it is graded.
4. **Partner involvement:** a one-page partner brief (what a good project looks like, time asked of the partner, contact cadence, what students can and cannot deliver), a scoping agreement template (deliverables, data access, confidentiality, intellectual property position to confirm with the institution, communication), and what happens if a partner disengages.
5. **Supervision:** cadence and format of supervisor meetings, a meeting log template, early-warning signs (missed meetings, unequal commits or contributions, scope drift) and the escalation route.
6. **Assessment and rubrics:** the weighting across deliverables and process, and an analytic rubric for the main deliverable with 4 to 6 criteria tied to the outcomes and 4 performance levels with descriptors.
7. **Individual contribution:** a combination of at least three sources: structured peer assessment that adjusts the team mark within limits, individual reflective logs or contribution statements, artefact evidence (version history, authored sections, meeting logs) and an individual viva or questions at the presentation. Describe how the adjustment works and how disputes are handled.
8. **Risks and contingencies:** partner drop-out, team conflict, a student withdrawing, ethics approval for projects with human participants or personal data, and accessibility or reasonable adjustments.
</task>

<constraints>
- Do not state the institution's rules on intellectual property, ethics review or academic regulations as fact; write them as items to confirm with the relevant office.
- Rubric descriptors describe observable qualities of the work, not effort or attitude.
- The total student workload should match the credit weight; if it is not given, assume a typical load and say so.
- Keep partner demands realistic: about 1 hour a week or less, with defined touchpoints.
</constraints>

<output_format>
## Capstone overview
Short paragraphs plus an outcome-to-deliverable table.
## Milestones
Table: Week | Milestone | Submission | Feedback from | Graded (weight).
## Partner involvement
Partner brief, scoping agreement template and disengagement plan.
## Supervision
Cadence, meeting log template, early-warning signs, escalation.
## Assessment and rubrics
Weighting table, then the rubric table: Criterion | Excellent | Proficient | Developing | Not yet.
## Individual contribution
Evidence sources, the adjustment method with an example, dispute process.
## Risks and contingencies
Table: Risk | Prevention | If it happens.
## Assumptions
Bullets.
</output_format>
