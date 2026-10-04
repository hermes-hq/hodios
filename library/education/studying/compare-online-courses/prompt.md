---
schema: 1
id: compare-online-courses
kind: prompt
title: Compare online courses
description: Compares online courses, certificates or bootcamps against a learner's goal on fit, time, total cost, assessment, recognition and refund terms, lists claims to verify and recommends one or none.
category: studying
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [individual, job-seeker]
requires: [none]
inputs: [text, url]
output: [table, report, checklist]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [bootcamps, certificates, course-selection, career-switch, refund-terms]
pairs_with:
  prompts: [finish-online-course, build-self-study-curriculum]
args:
  - name: goal
    description: What you want the course to get you (a specific job, a promotion, a skill for a project, an exam), your current level, weekly time, budget and deadline.
    type: text
    required: true
  - name: courses
    description: The two to five options, with what you know about each - pasted course pages, syllabus, price, length, format, certificate, refund terms, outcome claims. Include free options you are considering.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Your goal, Comparison, Red flags, Claims to verify, Recommendation, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An adult learner is choosing between online courses, certificates or bootcamps and may spend serious money and months on the choice. Comparisons go wrong when they take marketing pages at face value (job placement rates with no method, "industry-recognised" with no evidence), compare sticker prices instead of total cost, ignore whether the learner will actually have the hours, and assume a paid course is needed when free material plus a portfolio would meet the goal. The right answer is sometimes "none of these".
</context>

<task>
<goal>
{{goal}}
</goal>

<courses>
{{courses}}
</courses>

1. Restate the goal as the skills or credential it actually requires. If the goal is a job, list the skills that job usually asks for in general terms and ask the learner to paste two or three real job ads to confirm.
2. Compare each option on:
   - Fit: how much of the syllabus covers the required skills, and gaps.
   - Time: stated hours, a realistic estimate (stated hours are often optimistic for beginners, so add a clear buffer and say how much you added), and whether it fits the learner's week and deadline.
   - Total cost: fees, instalments or financing, exam or certificate fees, software or equipment, and income lost if full-time.
   - Assessment and support: graded projects, human feedback, mentoring, exams, or video-only.
   - Recognition: accredited or credit-bearing, a recognised industry certification, or a provider certificate only.
   - Outcomes: claims made and whether a method is stated (cohort, time period, what counts as a job).
   - Terms: refund window, cancellation, deferral, and any income share agreement or deferred-payment deal, which works like a loan and needs its full terms read.
3. Flag red flags: pressure to sign quickly, guaranteed jobs, outcome numbers with no method, unclear total cost, financing pushed at enrolment.
4. List each claim to verify and how (ask for an outcomes report, talk to two recent graduates found independently, read the terms, check the accreditor's own list).
5. Recommend one option, or none with a cheaper path, explaining the trade-off. Say what would change the recommendation.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only facts the learner supplied. Never invent prices, accreditation, outcome rates, refund terms or reviews; mark unknowns as [unknown] in the table.
- Do not recommend financing, loans or income share agreements; describe how they work and what to check, and suggest independent money advice for large sums or debt.
- Say that consumer rights and refund rules differ by country and the learner should check them where they live.
- Do not rank providers by reputation you cannot support from the input.
{{> output/uncertainty}}
</constraints>

<output_format>
## Your goal
Two or three lines: the goal and the skills or credential it requires.

## Comparison
Table with one column per option and rows: Fit | Gaps | Stated hours | Realistic hours | Total cost | Assessment and support | Recognition | Outcome claims | Refund and terms.

## Red flags
Bullets per option, or "None found in what you shared".

## Claims to verify
Table: Claim | Option | How to check.

## Recommendation
The choice (or none), why, the main trade-off, and what would change it. Under 150 words.

## Questions
What is missing.
</output_format>
