---
schema: 1
id: prepare-ib-internal-assessment
kind: prompt
title: Plan an IB internal assessment
description: Plans an IB internal assessment such as a maths exploration or science investigation, with a personal research question, method, data plan, timeline and the criteria to hit.
category: studying
version: 1.0.0
status: incubating
stage: [plan]
role: [student]
requires: [none]
inputs: [topic, preferences]
output: [plan, table, questions]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [ib-diploma, internal-assessment, maths-exploration, scientific-investigation, research-question, assessment-criteria]
pairs_with:
  prompts: [structure-lab-report, give-lab-report-feedback]
  workflows: [extended-essay-track]
  rules: [academic-integrity-rules]
args:
  - name: subject
    description: The IB subject and level, such as "Maths AA HL", "Physics SL", "Psychology HL", "Economics SL", "History HL".
    type: string
    required: true
  - name: idea
    description: Optional idea, interest or rough question, and any data, equipment or access the student has.
    type: text
  - name: weeks_left
    description: Weeks until the final IA deadline set by the school.
    type: number
    required: true
output_contract:
  format: markdown
  sections: [The task and its criteria, From idea to research question, Method and data plan, Analysis plan, Timeline, Risks and integrity, Questions for you]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Each IB subject's internal assessment is a different task with its own criteria, length and rules: a mathematical exploration judged on presentation, communication, personal engagement, reflection and use of mathematics; a scientific investigation judged on research design, data analysis, conclusion and evaluation; and other tasks such as a historical investigation, economics commentaries or a psychology experiment. Criteria and lengths are revised with new subject guides. Across subjects, the strongest IAs start from a genuinely personal, narrow question; use a method the student can carry out with the time and resources they have; collect enough of the right data; and leave room for analysis and evaluation instead of description. Teachers can give limited feedback on a draft, so the plan matters.
</context>

<task>
Plan the internal assessment for {{subject}} with {{weeks_left}} weeks until the school deadline.
{{#idea}}
<student_idea>
{{idea}}
</student_idea>
{{/idea}}

1. **The task and its criteria.** Describe the IA task for {{subject}} as you understand it: what is produced, the approximate length or page limit, and the criteria with what each rewards. Label it "check against your current subject guide and your teacher", and ask the student to paste the criteria if their school uses a newer guide than you know. If {{subject}} is unclear, ask.
2. **From idea to research question.** If an idea was given, test it for personal engagement, focus, feasibility and fit with the criteria, and show how to narrow it with questions. If not, ask four questions that help the student find one from their interests, and show three kinds of question that work for this subject using invented examples outside the student's topic. The student writes the final question.
3. **Method and data plan.** What a sound method needs in this subject: for sciences, variables, controls, range and number of trials, uncertainties, equipment and a risk assessment; for a maths exploration, the mathematics to be used at the right level and how it will be applied and checked; for social sciences and humanities, sources, sampling, ethics and consent. Flag ethics issues (human participants, animals, surveys of minors) and say they need teacher approval.
4. **Analysis plan.** What analysis the criteria will reward (graphs with uncertainties, statistical tests where appropriate, mathematical justification, evaluation of sources) and how to leave room for it within the length limit.
5. **Timeline.** A week-by-week plan across {{weeks_left}} weeks to the deadline, with the teacher's draft check, data collection with a buffer for repeats, and final checks.
6. **Risks and integrity.** What usually goes wrong (data collection overruns, a question that turns out too broad, too much description) and how to avoid it. Remind the student that the IA must be their own work, that teachers check authenticity, and to follow the school's AI policy and keep notes.
7. **Questions for you.** Up to five questions whose answers would sharpen the plan.
</task>

<constraints>
- Plan and coach; do not write any part of the IA, choose a final research question for the student, or generate data.
- Never invent criteria marks, page limits or rules you are not sure of; mark uncertainty and point to the subject guide.
- Keep experiments safe and school-feasible; flag anything that needs supervision or approval.
- If the weeks left are too few for the proposed method, say so and suggest a smaller scope.
</constraints>

<output_format>
Use the section headings from the output contract. Criteria as a table: Criterion | What it rewards | What this plan does about it. Timeline as a table: Week | Task | Checkpoint. Questions as a numbered list.
</output_format>
