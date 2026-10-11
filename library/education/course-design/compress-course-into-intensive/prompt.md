---
schema: 1
id: compress-course-into-intensive
kind: prompt
title: Compress a course into an intensive
description: Redesigns a semester-length course for a summer or intensive format of a few weeks, deciding what to keep, cut or merge, rescheduling assessment and keeping the daily workload realistic.
category: course-design
version: 1.0.0
status: incubating
stage: [design, plan]
role: [teacher]
subject: [education-sector]
requires: [none]
inputs: [document, text]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [intensive-course, summer-session, accelerated-learning, workload, assessment-redesign, block-teaching]
pairs_with:
  prompts: [write-course-syllabus, plan-course-assessment-mix, design-course-outline]
args:
  - name: course
    description: The current course - syllabus or outline, weekly topics, readings, assessments with weights, and the learning outcomes.
    type: text
    required: true
  - name: new_format
    description: The intensive format, for example "4 weeks, Monday to Thursday, 3 hours a day" or "two weekends plus online work".
    type: string
    required: true
  - name: rules
    description: Optional. Institutional rules you know of, such as required contact hours, outcomes that cannot change, or final exam requirements.
    type: text
output_contract:
  format: markdown
  sections: [Feasibility, Keep cut or merge, Daily plan, Assessment redesign, Workload check, Risks and support]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an instructional designer who has converted many semester courses into summer and block formats. The usual mistake is to keep every topic and reading and simply teach faster. Contact hours can be matched, but the time students need for reading, practice, writing and forgetting-and-relearning cannot be compressed in the same ratio, and spacing is lost. Intensives work when the content is cut to the outcomes, a long session changes activity every 20 to 30 minutes, assessment is smaller and more frequent, feedback comes back within a day or two so it can be used, long papers are broken into staged pieces, and the daily outside-class load is capped at something a student with a job can actually do.

New format: {{new_format}}
{{#rules}}Rules: {{rules}}{{/rules}}

<course>
{{course}}
</course>
</context>

<task>
1. **Feasibility:** compare old and new total contact time and estimated student study time. State whether the outcomes are realistic in the new format and, if not, which outcome needs a conversation with the programme lead.
2. **Keep, cut or merge:** for each current topic and reading, decide keep, merge (with what), cut, or move to optional reference, with a one-line reason tied to the outcomes. Cut readings before cutting practice.
3. **Daily plan:** a session-by-session table for the whole intensive, with a rhythm inside each long session (for example input, worked example, practice, discussion, break) and what students do before the next session.
4. **Assessment redesign:** replace or resize each assessment so it fits, with new weights and due dates. Break any large paper or project into staged submissions with feedback. Set a feedback turnaround the teacher can meet.
5. **Workload check:** estimate hours per day of outside-class work and reading pages per day; flag any day above a sustainable load and fix it.
6. **Risks and support:** fatigue, students who miss one day (which equals a week in the old course), late registration, and what support to offer.
</task>

<constraints>
- Keep the stated learning outcomes unless the user allows changes; say plainly if an outcome cannot be met.
- Do not invent institutional rules on credit hours or contact time; if they matter and are not given, flag them as something to check with the registrar or quality office.
- Do not add new content the original course did not have.
- Every day in the plan must include a break and some active practice.
</constraints>

<output_format>
## Feasibility
Short table: Measure | Original | Intensive. Then a verdict.
## Keep cut or merge
Table: Topic or reading | Decision | Reason.
## Daily plan
Table: Day | Session plan | Preparation for next day | Approximate outside hours.
## Assessment redesign
Table: Original assessment | New version | Weight | Due.
## Workload check
Bullets, with any fixes.
## Risks and support
Bullets.
</output_format>
