---
schema: 1
id: plan-course-pilot
kind: prompt
title: Plan a course pilot
description: Plans a pilot run of a new course or module with a small learner group, what to measure, the feedback instruments and decision rules agreed in advance for launch, revise or drop.
category: course-design
version: 1.0.0
status: incubating
stage: [plan, verify]
role: [teacher, manager, consultant]
requires: [none]
inputs: [text, spec]
output: [plan, table, checklist, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [pilot-testing, beta-cohort, decision-rules, pre-post-test, learner-feedback, iterative-design]
pairs_with:
  prompts: [evaluate-training-effectiveness, analyze-course-evaluations, design-course-outline]
  personas: [instructional-designer]
args:
  - name: course_summary
    description: What the course is - audience, outcomes, format (live, online, blended), length, and what you are least sure about. Also who decides on launch and by when.
    type: text
    required: true
  - name: pilot_learners
    description: Roughly how many learners will take the pilot.
    type: number
    default: 15
output_contract:
  format: markdown
  sections: [Pilot questions, Pilot design, Measures, Instruments, Decision rules, Timeline and roles, Risks and limits]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Pilots often prove nothing: friendly volunteers rate it 4.6 out of 5, nobody measured whether they learned anything, and the launch decision was already made. A useful pilot tests the riskiest assumptions with learners who resemble the real audience, measures learning and time as well as satisfaction, finds the exact points where people get stuck, and agrees before it starts what results mean launch, revise or drop.

Pilot size: about {{pilot_learners}} learners.
</context>

<task>
<course_summary>
{{course_summary}}
</course_summary>

1. **Pilot questions:** turn the course's riskiest assumptions into three to five questions the pilot must answer (for example: can novices finish module 3 without help? does the course fit in the advertised hours? do learners reach outcome 2?).
2. **Pilot design:** who to recruit (real target learners, not colleagues or fans; include some likely to struggle), how many, incentives, whether to pilot the whole course or the riskiest modules, and live observation versus self-paced with analytics.
3. **Measures:** for each question, the measure and threshold: completion and drop-off point; learning gain (short pre and post check on the outcomes, or a performance task scored with a rubric); actual time per module against the plan; confusion points (where learners ask for help, rewind, fail an item or stall); usefulness and confidence ratings; accessibility issues.
4. **Instruments:** draft the pre and post check blueprint (items per outcome), a five- to eight-item feedback survey with at least two open questions, a think-aloud or observation protocol for three to five learners, a facilitator log, and a short exit interview guide.
5. **Decision rules:** written thresholds agreed in advance, for example launch if at least 80% complete and the median learner meets the outcome bar with time within 20% of plan; revise if one module fails a threshold; drop or rethink if most learners miss the core outcome. Adjust the numbers to the course and say why.
6. **Timeline and roles:** recruitment, run, analysis and decision dates, who owns each, and how pilot learners hear what changed.
</task>

<constraints>
- With around {{pilot_learners}} learners, treat numbers as signals, not proof; report counts as well as percentages and say what a small sample cannot show.
- Satisfaction alone never decides launch.
- Write neutral survey and interview questions. If asked to make the pilot produce good scores (leading questions, friendly-only recruits, hiding results), decline briefly, say why it would mislead the decision makers, and offer the smallest honest pilot that still fits the timeline, for example piloting the riskiest module only.
- Collect only the data needed; tell pilot learners what is collected and why, keep it anonymised in reports, and ask for consent for observation or recordings.
- Do not invent benchmarks for completion or satisfaction; if you suggest thresholds, label them as starting points to agree.
- If the summary lacks the outcomes or the audience, ask for them and stop.
</constraints>

<output_format>
## Pilot questions
Numbered.
## Pilot design
Bullets: recruits, size, scope, format.
## Measures
Table: Question | Measure | How collected | Threshold.
## Instruments
The check blueprint, survey items, observation prompts and interview questions.
## Decision rules
Table: Result | Decision | Action.
## Timeline and roles
Table: Date or week | Task | Owner.
## Risks and limits
Bullets.
</output_format>
