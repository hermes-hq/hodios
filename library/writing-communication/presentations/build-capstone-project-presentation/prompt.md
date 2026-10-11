---
schema: 1
id: build-capstone-project-presentation
kind: prompt
title: Build a capstone project presentation
description: Builds a final-year or capstone project presentation with the problem, approach, a demo plan, results against goals, honest limitations, who did what, and answers to likely assessor questions.
category: presentations
version: 1.0.0
status: incubating
stage: [plan, design]
role: [student]
requires: [none]
inputs: [document, notes]
output: [outline, plan, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [final-year-project, live-demo, marking-rubric, judges-questions, team-project]
pairs_with:
  prompts: [build-thesis-defence-slides, plan-backup-slides, drill-presentation-qa, plan-group-class-presentation]
  personas: [presentation-designer]
args:
  - name: project
    description: The project, the problem it addresses, who it was for (a client or partner if any), what you built or did, and the results or evaluation.
    type: text
    required: true
  - name: rules
    description: Time limit, format (talk, demo, poster session, expo), marking criteria and who assesses, such as academics, the client or industry judges.
    type: text
    required: true
  - name: team
    description: Team members and what each did, if it is a team project. Optional.
    type: text
output_contract:
  format: markdown
  sections: [The story in one paragraph, Slide plan, Demo plan, Results and limitations, Who presents what, Likely questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help students present a capstone or final-year project, in engineering, computing, design, business or any applied field. Assessors mark the problem and why it matters, the approach and the reasoning behind design choices, what was actually built, evidence that it works (testing, evaluation, client feedback) against the goals set at the start, reflection on limitations, and individual contribution. Teams lose marks by spending half the slot on background, showing a feature tour rather than solving the stated problem, a live demo that fails with no fallback, results with no comparison to goals, hiding what did not work, and uneven handovers where one person answers every question. A recorded demo or screenshots kept ready as a backup is standard practice. Industry judges care about usefulness and feasibility; academics care about method and reflection.

<project>
{{project}}
</project>

Rules and assessors: {{rules}}
{{#team}}Team: {{team}}{{/team}}
</context>

<task>
1. Write the project story in one paragraph: the problem, for whom, what you built, and the result against the goal.
2. Map the marking criteria to slides so every criterion has a place, and flag any criterion the project material does not yet cover.
3. Plan the slides to the time limit: problem and who has it, goals and success criteria set at the start, approach and key design decisions (with the alternatives you rejected and why), the demo, results and evaluation against goals, limitations and what you would do next, contributions, and close. Keep background short.
4. Plan the demo: the single scenario that shows the problem being solved, step by step, under three minutes if the slot is short, with setup checklist, test data prepared in advance, and a fallback (recorded video or screenshots) to switch to without apology if anything fails.
5. Present results honestly: what was measured, against what target, what fell short and why, using only the evaluation data given.
6. If it is a team project, split speaking roles so each person presents the part they did, with clean handovers, and decide who fields which kinds of questions.
7. List the questions assessors are most likely to ask (why this approach, how you tested it, what you would change, who did what, how it would scale or be maintained) with answer outlines and any backup slides needed.
</task>

<constraints>
- Do not invent results, test figures, user feedback or features. Use [result needed] where the material is missing evidence.
- Every result is compared with a goal or baseline; if no goal was set, say so and suggest how to frame the evaluation honestly.
- Include at least one slide on limitations and next steps.
- Fit the time limit, including demo time and any transitions, and say how many minutes are left for questions.
- Do not claim a client or partner endorsement unless the material states it.
</constraints>

<output_format>
## The story in one paragraph
Paragraph.

## Slide plan
Table: # | Slide title (assertion) | Content | Criterion covered | Minutes.

## Demo plan
Scenario steps, setup checklist, fallback.

## Results and limitations
Table: Goal | Measured result | Verdict | Note. Then limitations.

## Who presents what
Table or bullets with handover lines.

## Likely questions
Bullets: question, answer outline, backup slide.
</output_format>
