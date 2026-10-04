---
schema: 1
id: plan-course-assessment-mix
kind: prompt
title: Plan a course's assessment mix
description: Plans the assessment mix across a whole course, balancing formative and summative work, covering every outcome, spreading student workload and marking load by week, and flagging clashes.
category: course-design
version: 1.0.0
status: incubating
stage: [plan, design, review]
role: [teacher]
requires: [none]
inputs: [text, spec]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [assessment-strategy, constructive-alignment, authentic-assessment, assessment-load, marking-workload, feedback-timing]
pairs_with:
  prompts: [design-course-outline, write-learning-objectives, create-rubric, write-module-descriptor]
  workflows: [assessment-design-track]
args:
  - name: outcomes
    description: The course or module learning outcomes, numbered if possible.
    type: text
    required: true
  - name: current_assessments
    description: Optional. Existing assessments with type, weighting, due week and length (e.g. "essay 2,500 words 40% week 8; exam 2h 60%"), plus cohort size, number of markers and any rules (minimum pass per component, resit rules).
    type: text
  - name: weeks
    description: Teaching weeks in the course, including any assessment weeks.
    type: number
    default: 12
output_contract:
  format: markdown
  sections: [Outcome evidence, Current mix audit, Proposed assessment mix, Feedback loop, Load by week, Integrity and inclusion, Assumptions and questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An assessment mix is judged as a whole, not item by item. Typical problems: every outcome claimed but two never actually assessed; everything due in the last two weeks so students cram and markers drown; one 100% exam that tests recall when the outcomes ask for application; feedback that arrives after the next task is already due; and over-assessment (five graded pieces for 15 credits). Good practice: each outcome assessed at least once summatively, formative tasks before each summative one with feedback in time to use, a variety of methods suited to the outcomes, a load students can sustain, and marking the team can turn round in the required time.

Course length: {{weeks}} weeks.
</context>

<task>
<outcomes>
{{outcomes}}
</outcomes>
{{#current_assessments}}
<current_assessments>
{{current_assessments}}
</current_assessments>
{{/current_assessments}}

1. **Read the outcomes:** for each, the verb and what kind of evidence would show it (performance, product, written argument, problem-solving under time, reflection). Flag outcomes that are not assessable as written.
2. **Audit the current mix** if given: coverage of each outcome, method fit, weightings, timing, word count or hours per credit, and feedback turnaround. If none is given, start from a blank design.
3. **Propose the mix:** two to four summative components (fewer for small modules) and a formative strand, each with method, what it assesses, weighting, length, due week and why this method fits. Prefer authentic tasks (realistic audiences, data, cases, products) where outcomes demand application. Give one lower-marking alternative where marking load is high.
4. **Feedback loop:** for each summative task, the formative task that comes before it and the week feedback must be back to be usable.
5. **Load check:** by week, student effort hours on assessment and marker hours (estimate per script x cohort, stated as an assumption). Flag weeks where several deadlines cluster, and the last-fortnight squeeze.
6. **Integrity and inclusion:** where the design is vulnerable to contract cheating or unacknowledged AI use, a change that makes the process visible (drafts, oral check, in-class component); and where it disadvantages groups (timed exams for some disabled students, unfamiliar formats for direct entrants), an adjustment or choice of format.
</task>

<constraints>
- Every outcome must be summatively assessed at least once; say which component and criterion carries it.
- Weightings add up to exactly 100%. Show the arithmetic.
- Do not invent institutional rules (credit-to-word-count ratios, turnaround days, resit rules). Use typical ranges labelled as assumptions and say to check the local regulations.
- Estimates of hours are ranges with the assumption shown.
- If outcomes are missing, ask for them and stop.
</constraints>

<output_format>
## Outcome evidence
Table: Outcome | Verb | Evidence that would show it | Assessable as written?
## Current mix audit
Bullets, or "No current mix supplied".
## Proposed assessment mix
Table: Component | Method | Outcomes | Weight | Length or duration | Due week | Why this method. Totals row.
## Feedback loop
Table: Formative task | Week | Feeds into | Feedback back by week.
## Load by week
Table: Week | Student assessment hours | Marker hours | Clash flag.
## Integrity and inclusion
Bullets.
## Assumptions and questions
Bullets.
</output_format>
