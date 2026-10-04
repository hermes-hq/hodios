---
schema: 1
id: plan-jee-neet-preparation
kind: prompt
title: Plan JEE or NEET preparation
description: Plans preparation for India's JEE or NEET with a syllabus map by weight, a weekly schedule alongside school, mock-test cycles, an error log and burnout safeguards.
category: exam-prep
version: 1.0.0
status: incubating
stage: [plan]
role: [student]
subject: [physics, chemistry, mathematics, biology]
requires: [none]
inputs: [preferences]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [jee-main, jee-advanced, neet, ncert, mock-tests, error-log, india]
pairs_with:
  prompts: [create-study-plan, analyze-exam-mistakes, plan-last-minute-revision]
  workflows: [exam-prep-track]
args:
  - name: exam
    description: The target exam. jee-main and jee-advanced cover physics, chemistry and mathematics; neet covers physics, chemistry and biology.
    type: enum
    enum: [jee-main, jee-advanced, neet]
    default: jee-main
  - name: months_left
    description: Months until the exam (or until the first session, for an exam with more than one sitting).
    type: number
    required: true
  - name: hours_per_day
    description: Realistic self-study hours per day on school days, outside school and any coaching classes.
    type: number
    default: 6
  - name: weak_subjects
    description: Optional weak subjects or chapters, current mock scores and whether the student is in Class 11, Class 12 or a dropper year.
    type: text
output_contract:
  format: markdown
  sections: [Where you stand, Syllabus map, Phase plan, Weekly schedule, Mock-test cycle, Error log, Safeguards]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
JEE and NEET are high-volume, high-competition exams where the deciding factors are coverage of the Class 11 and 12 syllabus, speed and accuracy under negative marking, and a disciplined loop of mock tests and error analysis. NEET is anchored closely to NCERT textbooks, especially for biology and inorganic chemistry. JEE Main rewards breadth and speed; JEE Advanced rewards depth, multi-concept problems and unusual question formats. Chapter weightings shift from year to year and the syllabus itself was revised recently, so any weighting is an estimate to check against the current official syllabus and recent papers. Students preparing alongside school boards, coaching and long travel often burn out by over-planning; a plan that fits real hours and protects sleep wins.
</context>

<task>
Build a preparation plan for `{{exam}}` with {{months_left}} months left, at about {{hours_per_day}} self-study hours a day.
{{#weak_subjects}}
<student_situation>
{{weak_subjects}}
</student_situation>
{{/weak_subjects}}

1. **Where you stand.** Summarise the situation in three lines. If Class 11, 12 or dropper status, or current mock scores, are missing and they change the plan, state the assumption you made and ask for the missing detail at the end.
2. **Syllabus map.** For each subject, group chapters into high, medium and lower weight based on recent patterns as you understand them, and mark which are Class 11 and which Class 12. Label the whole map "estimated from recent papers; verify against the current official syllabus". For neet, mark the chapters where NCERT line-by-line reading matters most. For jee-advanced, mark the chapters where depth beyond Main is needed.
3. **Phase plan.** Split {{months_left}} months into phases: coverage and backlog clearance, consolidation with chapter-wise tests, full-length mock phase, and final revision. Size each phase to the time left; if {{months_left}} is very short (under three months), drop new coverage of low-weight chapters and say so honestly.
4. **Weekly schedule.** A template week that fits {{hours_per_day}} hours on school days and more on weekends, rotating subjects daily, with problem practice in every session, a weekly revision block, a mock slot and a rest half-day. Weight time toward weak subjects without dropping strong ones.
5. **Mock-test cycle.** How often to take full-length mocks in each phase, under real timing, and a three-step analysis after each: classify every wrong or skipped question, re-solve without looking, and add a rule to the error log. Include negative-marking strategy: when to attempt, when to skip.
6. **Error log.** A template.
7. **Safeguards.** Sleep of at least seven hours, one protected rest block per week, exercise, signs of burnout (dread, falling scores despite more hours, insomnia), and what to do: cut volume, talk to a parent, teacher or counsellor.
</task>

<constraints>
- Never state exact chapter weightings, cut-offs, ranks or seat predictions as fact. Tell the student to check the official exam authority's site for the syllabus, pattern and dates.
- Do not promise a rank or a score.
- Do not recommend specific paid coaching or test series by brand.
- Respect the hours given; do not quietly assume 12-hour days.
{{> guardrails/crisis-safety}}
</constraints>

<output_format>
Use the section headings from the output contract. Syllabus map as one table per subject: Chapter group | Weight (high / medium / lower) | Class | Note. Phase plan as a table: Phase | Months | Goal | Checkpoint. Weekly schedule as a table: Day | Session | Subject | Activity | Hours. Error log as a table template: Date | Subject | Chapter | Question source | Mistake type (concept / formula / calculation / misread / time) | Correct idea | Rule. End with at most three questions if information was missing.
</output_format>
