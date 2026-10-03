---
schema: 1
id: write-iep-goals
kind: prompt
title: Draft measurable IEP goals
description: Drafts measurable IEP or support-plan goals from a student's present levels, with baseline, condition, criterion, progress monitoring and accommodations for the team to discuss.
category: teaching
version: 1.0.0
status: incubating
stage: [plan]
role: [teacher]
requires: [none]
inputs: [notes, text]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [iep, special-education, smart-goals, progress-monitoring, accommodations, inclusion]
pairs_with:
  prompts: [differentiate-lesson, plan-student-behavior-support]
  personas: [special-education-advisor]
args:
  - name: present_levels
    description: What the student can do now in this area, with data where possible (assessment scores, work samples, observations, current supports). Use initials, not the student's name.
    type: text
    required: true
  - name: area
    description: The area the goals target.
    type: enum
    enum: [reading, writing, math, behaviour, communication, independence]
    required: true
  - name: grade
    description: Optional grade or age and setting, e.g. "Grade 3, general education classroom with 45 minutes of resource support daily".
    type: string
output_contract:
  format: markdown
  sections: [Summary of present levels, Gaps in the data, Annual goals, Short-term objectives, Progress monitoring, Accommodations to discuss, Notes for the team]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A support-plan goal is only useful if two different people would agree, a year later, whether it was met. Most weak goals fail the same way: no baseline ("will improve reading"), no condition ("when given…"), a criterion that cannot be measured ("with 80% understanding"), or a target that ignores where the student actually is. A strong goal grows out of the present levels: it names the specific skill, the condition under which it will be shown, an observable behaviour, a criterion and a timeframe, and it comes with a plan for how progress will be measured often enough to adjust teaching. The plan itself is a team decision with the family and specialists; the teacher brings a well-reasoned draft.
</context>

<task>
Draft goals in **{{area}}** for this student{{#grade}} ({{grade}}){{/grade}}.

<present_levels>
{{present_levels}}
</present_levels>

If the present levels describe a different area from {{area}}, or too little to write any goal (no skill described at all), say so and ask for the missing information instead of drafting goals.

1. Summarise the present levels in 3 to 5 bullets: current performance with numbers, strengths to build on, and how the need affects access to grade-level learning.
2. List the data that is missing for strong goals (for example no baseline fluency score, no frequency count for the behaviour) and how to collect it quickly. Where a baseline is missing, write the goal with a bracketed placeholder such as "[baseline: __ words correct per minute]" rather than inventing a number.
3. Write 1 to 3 annual goals. Each has:
   - the skill, stated specifically (not "reading" but "decoding CVC and CVCe words" or "reading grade 2 passages aloud");
   - the condition ("given a grade 2 passage not seen before", "during independent work time with a visual checklist");
   - the observable behaviour;
   - the criterion (a rate, accuracy, frequency or rubric level that can be counted, plus how many trials or probes, e.g. "in 4 of 5 consecutive weekly probes");
   - the timeframe;
   - the baseline it starts from.
   Set ambitious but realistic targets for the gap and the time, and explain the target in one line (for example typical weekly growth rates for curriculum-based measures, where they apply).
4. Break each annual goal into 2 or 3 short-term objectives or benchmarks that build towards it.
5. For each goal, give the progress-monitoring method: the tool or probe type, how often, who collects it, and the decision rule (for example "if 4 consecutive data points fall below the aim line, the team reviews the intervention").
6. Suggest accommodations to discuss, separating accommodations (change how the student learns or shows learning) from modifications (change what is expected). Tie each to a need in the present levels.
</task>

<constraints>
- Goals describe the student's observable behaviour, not adult actions ("will be given…") or services.
- Never diagnose or suggest a disability category, and do not interpret medical or psychological reports beyond what the teacher wrote. If the notes suggest an unassessed need, say the team may want to ask a specialist about it.
- Use only facts in the present levels. Bracket anything assumed.
- Strengths-first, respectful language: describe skills and needs, not deficits of the person ("reads 42 words correctly per minute", not "a poor reader").
- Requirements for these plans differ by country, state and school (for example IEPs in the US, EHC plans in England, IPPs or support plans elsewhere). Say that the format must be adapted to local rules and that goals are agreed by the full team, including the family and, where appropriate, the student.
- For behaviour goals, the goal names the replacement behaviour to increase, not only the behaviour to decrease.
- Use the student's initials only. If the notes contain a full name, do not repeat it.
</constraints>

<output_format>
## Summary of present levels
Bullets.
## Gaps in the data
Bullets: missing data → how to collect it.
## Annual goals
Numbered goals as single sentences, each followed by a line: Condition | Behaviour | Criterion | Timeframe | Baseline, and one line on why the target is realistic.
## Short-term objectives
Under each goal number, 2 or 3 benchmarks.
## Progress monitoring
Table: Goal | Measure | Frequency | Who | Decision rule.
## Accommodations to discuss
Table: Need from present levels | Accommodation or modification | Type.
## Notes for the team
Questions for the family and specialists, and local-format reminders.
</output_format>
