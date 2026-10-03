---
schema: 1
id: plan-intervention-group
kind: prompt
title: Plan a six-week intervention group
description: Plans a six-week small-group intervention for students below benchmark with entry data, session plans, progress monitoring, decision rules and exit criteria.
category: teaching
version: 1.0.0
status: incubating
stage: [plan]
role: [teacher]
requires: [none]
inputs: [dataset, notes]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [intervention, mtss, response-to-intervention, progress-monitoring, small-group-instruction, tier-2]
pairs_with:
  prompts: [analyze-class-assessment-results, plan-phonics-lesson, write-iep-progress-report, run-plc-data-meeting]
  personas: [special-education-advisor]
args:
  - name: skill_gap
    description: The specific skill the students are below benchmark in, e.g. "reading multisyllabic words", "recall of multiplication facts to 10x10", "writing complete sentences with capital letters and full stops".
    type: text
    required: true
  - name: grade_level
    description: Grade, year or age of the students.
    type: string
    required: true
  - name: baseline_data
    description: Optional entry data per student (initials or codes only), e.g. "A.B. 32 wcpm, C.D. 41 wcpm; benchmark 70", plus the assessment used and group size.
    type: text
  - name: sessions_per_week
    description: Number of intervention sessions per week.
    type: number
    default: 3
output_contract:
  format: markdown
  sections: [Entry data and group, Goal and aim line, Diagnostic check, Session template, Six-week plan, Progress monitoring, Decision rules, Exit criteria, Communication]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Small-group intervention works when it is targeted at a precisely identified skill, delivered often and consistently with explicit teaching and plenty of practice with feedback, and judged by data rather than by how the sessions felt. Many interventions drift: the group is formed from a broad score ("below in reading"), sessions become extra homework help, and six weeks later no one can say whether it worked. A strong plan pins down the gap with a quick diagnostic, sets a measurable goal with an aim line from the baseline, follows a sequence of skills from easier to harder, monitors progress weekly with the same probe, and agrees in advance what the team will do if a student is not responding.
</context>

<task>
Plan a six-week intervention for **{{grade_level}}** students who are below benchmark in:

<skill_gap>
{{skill_gap}}
</skill_gap>
{{#baseline_data}}

Baseline data:
<baseline_data>
{{baseline_data}}
</baseline_data>
{{/baseline_data}}

Sessions: {{sessions_per_week}} per week for 6 weeks.

1. **Entry data and group:** summarise who qualifies and why. If there is no baseline, say which brief assessment to give and use bracketed placeholders such as "[baseline: __]" instead of inventing numbers. Recommend a group size (usually 3 to 6) and a session length that suits the age (state it), and flag any student whose data suggests a different need from the rest of the group.
2. **Goal and aim line:** a measurable six-week goal per student or for the group, using the same measure as the baseline, and the expected weekly growth that forms the aim line. Explain why the target is realistic.
3. **Diagnostic check:** a 5 to 10 minute check to pinpoint where in the skill each student breaks down (for example which syllable types, which fact families), and how it changes the starting point.
4. **Session template:** a fixed routine with timings (warm-up review, explicit teaching with modelling, guided practice with immediate corrective feedback, independent practice, a 1-minute check), and the exact error-correction routine.
5. **Six-week plan:** a table of the skill sequence week by week, from prerequisite to target, with example items or activities for each week and a cumulative review built in.
6. **Progress monitoring:** the probe to use (same type and difficulty each week), when, who gives it, and how to graph it against the aim line.
7. **Decision rules:** for example, after at least 6 data points, if the last 4 fall below the aim line, change one variable of the intervention (time, group size, focus, approach); if the last 4 are above, raise the goal or plan exit. Adjust to the data frequency.
8. **Exit criteria:** what score, sustained over how many probes, ends the intervention, and how the class teacher keeps the skill going.
9. **Communication:** what the class teacher, the family and, where relevant, the special education or learning support team are told and when.
</task>

<constraints>
- Every number you use comes from the data given or is a clearly marked placeholder or a stated typical-growth estimate.
- The intervention adds to core classroom teaching; it should not pull students from the same subject's core lesson unless the school chooses that. Say so.
- Do not diagnose or suggest a disability. If a student does not respond to well-delivered intervention, recommend that the school team review the data and consider next steps under local procedures.
- Use initials or codes only. Keep activities practical for one adult with a small group and common materials.
</constraints>

<output_format>
## Entry data and group
Table: Student | Baseline | Benchmark | Notes. Then group size and session length.
## Goal and aim line
Goals and weekly growth.
## Diagnostic check
Items and how to use the result.
## Session template
Table: Minutes | Phase | What happens. Then the error-correction script.
## Six-week plan
Table: Week | Focus | Example items or activities | Review.
## Progress monitoring
Probe, schedule, graphing.
## Decision rules
Bullets.
## Exit criteria
Bullets.
## Communication
Who, what, when.
</output_format>
