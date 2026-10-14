---
schema: 1
id: design-performance-review-process
kind: prompt
title: Design a company performance review process
description: Designs a company-wide performance review cycle with timeline, rating scale, review form, manager guidance, calibration and the link to pay and promotion decisions.
category: hr-operations
version: 1.0.0
status: incubating
stage: [design, plan]
role: [operations-manager, founder, executive]
requires: [none]
inputs: [text]
output: [plan, table, checklist, questions]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [performance-management, review-cycle, rating-scale, calibration, review-form]
pairs_with:
  prompts: [run-calibration-session, write-performance-review, build-merit-increase-matrix, plan-hr-annual-calendar]
  personas: [hr-business-partner]
args:
  - name: organisation
    description: Headcount, number of people managers and their span, locations, functions, and how work and goals are set today (OKRs, targets, nothing formal).
    type: text
    required: true
  - name: current_state
    description: What happens now for reviews, if anything, and what is not working (for example "ratings inflated, managers write reviews the night before, pay decisions made separately").
    type: text
    required: true
  - name: goals
    description: What the process must support (development, pay, promotion, underperformance), any constraints such as a works council, union or HR system, and how much manager time is realistic. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Purpose and principles, Cycle and timeline, Rating approach, Review form, Calibration, Link to pay and promotion, Manager and employee guidance, Rollout and measures, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design performance review processes the way an experienced head of people does for a growing organisation. What experts know: a process that tries to do development, pay and promotion in the same conversation usually does all three badly, so the purposes and their timing must be explicit; ratings without written anchors drift upward and differ by manager; five-point scales with a "meets" middle are most common, but fewer, behaviourally anchored levels calibrate better; recency bias and the halo effect are the usual distortions, countered by ongoing notes, evidence from the whole period and calibration across managers; forced distributions create resentment and legal risk and are rarely worth it; self-reviews and peer input improve accuracy but add workload; and the process fails most often because managers have no time or training, not because the form is wrong. Smaller organisations need a lighter process than large ones. Consultation duties with employee representatives may apply in some countries.

<organisation>
{{organisation}}
</organisation>

<current_state>
{{current_state}}
</current_state>
{{#goals}}
<goals>
{{goals}}
</goals>
{{/goals}}
</context>

<task>
1. Purpose and principles: state what the process is for, in priority order, and whether pay and development conversations are separated in time. Name three to five principles (for example "no surprises", "evidence over impressions").
2. Cycle and timeline: annual, twice-yearly or quarterly check-ins with an annual summary, chosen for this organisation's size and manager capacity, with dates or weeks for each stage (self-review, peer input, manager draft, calibration, conversations, sign-off) and the hours each step costs a manager.
3. Rating approach: the scale (or no ratings, with reasons), level names, and a written anchor for each level on results and on behaviours. Say how new joiners, people on leave and part-time staff are handled.
4. Review form: the sections and the questions, kept short, with word guidance.
5. Calibration: who meets, what they look at, how disagreements are resolved, and checks for bias by manager, team and demographic group where data is lawfully held.
6. Link to pay and promotion: how ratings feed (or do not feed) merit increases, bonuses and promotions, and when.
7. Manager and employee guidance: a one-page checklist for each, including how to collect evidence through the year and how to deliver a difficult review.
8. Rollout and measures: pilot, training, communication, and how you will tell whether the process works (completion rate, rating spread by manager, employee survey items, regretted attrition).
9. Questions that need a decision.
</task>

<constraints>
- Fit the process to the stated manager capacity; do not design a heavyweight cycle for a small organisation.
- Do not recommend forced ranking or forced distribution without stating its costs and risks.
- Do not use attendance, protected leave or protected characteristics as rating inputs.
- Consultation and data protection rules differ by country; flag them as points to confirm locally.
{{> output/uncertainty}}
</constraints>

<output_format>
## Purpose and principles
## Cycle and timeline
Table: Stage | Who | When | Manager hours.
## Rating approach
Table: Level | Name | Results anchor | Behaviour anchor.
## Review form
## Calibration
## Link to pay and promotion
## Manager and employee guidance
Two short checklists.
## Rollout and measures
## Questions
Numbered.
</output_format>
