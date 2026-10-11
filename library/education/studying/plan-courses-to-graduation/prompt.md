---
schema: 1
id: plan-courses-to-graduation
kind: prompt
title: Plan courses to graduation
description: Maps a student's remaining degree requirements into a term-by-term course plan with prerequisite chains, term-only offerings, balanced workloads and a check against the degree audit.
category: studying
version: 1.0.0
status: incubating
stage: [plan]
role: [student]
requires: [none]
inputs: [document, text]
output: [plan, table, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [degree-plan, prerequisites, degree-audit, course-registration, academic-advising]
pairs_with:
  prompts: [plan-semester-workload, calculate-gpa-and-target, decide-whether-to-drop-course, plan-college-transfer]
args:
  - name: requirements
    description: The degree requirements for your programme and catalogue year, ideally the degree audit or programme requirements page - required courses, electives by group, minimum credits, residency and upper-level rules.
    type: text
    required: true
  - name: completed
    description: Courses completed or in progress with credits, including transfer and exam credit (AP, IB, A level) already accepted.
    type: text
    required: true
  - name: constraints
    description: Optional constraints - target graduation term, max credits per term, terms when courses are offered, prerequisites you know of, a minor or double major, study abroad, summer terms, work hours, credit minimums for aid or visa.
    type: text
output_contract:
  format: markdown
  sections: [Remaining requirements, Prerequisite chains, Term-by-term plan, Risks, Check with your adviser]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Students usually discover graduation problems too late: a prerequisite chain four courses long that had to start in the second year, a required course offered only in the spring, an upper-level credit minimum not met, or a course that counts toward fewer requirements than they thought. A plan that works starts from the degree audit, finds the longest prerequisite chain (which sets the earliest possible graduation date), places term-only courses first, uses courses that satisfy two requirements where the rules allow, and balances hard courses across terms instead of stacking them. The registrar's audit, not a hand-built plan, decides whether the student graduates, so every assumption should be checked against it.
</context>

<task>
Build a course plan to graduation.

<requirements>
{{requirements}}
</requirements>

<completed>
{{completed}}
</completed>
{{#constraints}}
<constraints_given>
{{constraints}}
</constraints_given>
{{/constraints}}

1. List remaining requirements by group, subtracting what is completed, with credits remaining. Mark any course whose fit to a requirement is unclear (for example a transfer course) as "check".
2. Map prerequisite chains for the remaining required courses, using prerequisites the student gave or the requirements text. Identify the longest chain and the earliest graduation term it allows. Mark prerequisites assumed from course numbering as "assumed".
3. Build a term-by-term plan to the target graduation: place chain courses and term-only offerings first, then other requirements, then electives. Respect the credit maximum, keep the credit minimum needed for aid or visa if given, and spread hard or lab-heavy courses. Show credits per term and the running total against the degree minimum.
4. Note where a course could satisfy two requirements, only where the requirements text says double counting is allowed; otherwise mark it as a question.
5. List the risks: single points of failure (a course that, if failed or not offered, delays graduation), tight terms, and a back-up option for each (summer, an alternative course).
6. List what to check with the academic adviser and the degree audit, as specific questions.
</task>

<constraints>
- Use only the requirements, courses and prerequisites given; never invent course codes, offerings or rules. Mark assumptions.
- If the target graduation date is impossible given the chain or credit limits, say so and give the earliest realistic date and what would make the target possible (summer terms, an overload approved by the adviser).
- The degree audit and adviser are the authority; say so.
</constraints>

<output_format>
## Remaining requirements
A table: Requirement group | Remaining | Courses that could satisfy it.
## Prerequisite chains
Chains written as A -> B -> C, longest first.
## Term-by-term plan
A table: Term | Courses | Credits | Running total.
## Risks
A table: Risk | Effect | Back-up.
## Check with your adviser
</output_format>
