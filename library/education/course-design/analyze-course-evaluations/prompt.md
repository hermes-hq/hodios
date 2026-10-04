---
schema: 1
id: analyze-course-evaluations
kind: prompt
title: Analyse course evaluations
description: Analyses end-of-course student evaluation comments and scores into themes by frequency and severity, separating fixable design issues from one-offs, and names three priority changes.
category: course-design
version: 1.0.0
status: incubating
stage: [review]
role: [teacher]
requires: [none]
inputs: [text, dataset]
output: [report, table, summary]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [student-feedback, thematic-analysis, course-review, module-evaluation, closing-the-loop]
pairs_with:
  prompts: [design-student-voice-survey, evaluate-training-effectiveness, plan-course-pilot]
args:
  - name: evaluation_comments
    description: The free-text comments from the evaluation, pasted as they are. Remove names of students and staff first if you can.
    type: text
    required: true
  - name: scores
    description: Optional. Item scores or averages with the question wording, number of respondents and the enrolment, and last year's figures if you have them.
    type: text
output_contract:
  format: markdown
  sections: [Snapshot, Themes, Fixable design issues, Keep doing, One-offs and outliers, Priority changes, Response to students]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Teachers read evaluations badly in two predictable ways: the one cruel comment dominates, or the average score is taken as the story. A useful read counts how often each issue appears, judges how much it hurts learning, separates what the course design can fix (unclear assessment briefs, pacing, feedback timing) from what it cannot or should not (room temperature, "less work please"), keeps the things students value, and ends in a small number of changes students will be told about.
</context>

<task>
<evaluation_comments>
{{evaluation_comments}}
</evaluation_comments>
{{#scores}}
<scores>
{{scores}}
</scores>
{{/scores}}

1. Count the comments and, if scores are given, the response rate. Under about 30% response or under 10 responses, warn that results may not represent the cohort.
2. Code every comment into themes (for example assessment clarity, feedback, workload and pacing, organisation, teaching sessions, materials, online platform, support, relevance, inclusion). A comment can carry more than one theme. Record positive and negative mentions separately.
3. Rate each negative theme for severity: high (blocks learning, affects fairness or wellbeing, or signals a policy issue), medium (makes learning harder), low (preference or comfort).
4. Classify each issue: fixable in course design, fixable by the teacher's practice, outside the course (timetabling, rooms, systems) to pass on, or not a change to make (with a short reason, for example the workload is required by the outcomes; then the fix is explaining why).
5. Check scores against themes: where a low item matches a theme, say so; where scores and comments disagree, say that too.
6. Flag any comment suggesting harassment, discrimination, safety or wellbeing concerns, or personal attacks, for handling through the proper channel, separately from the course analysis.
7. Choose three priority changes by frequency x severity x effort, each with a concrete action and how to know next year if it worked.
</task>

<constraints>
- Quote at most a few words per comment as evidence, and never quote anything that could identify a student.
- Report counts ("9 of 41 comments") rather than vague words like "many".
- Do not treat a single comment as a theme; list it under one-offs unless it is high severity.
- Abusive or personal remarks about staff are noted as such and excluded from themes, without repeating them.
- Do not invent comments, scores or comparisons with previous years.
- If no comments are supplied, ask for them and stop.
</constraints>

<output_format>
## Snapshot
Responses, response rate, overall tone in two sentences, data limits.
## Themes
Table: Theme | Negative mentions | Positive mentions | Severity | Example words.
## Fixable design issues
Table: Issue | Evidence | Type of fix | Effort (low, medium, high).
## Keep doing
Bullets: praised elements with counts.
## One-offs and outliers
Bullets, plus any concerns to route elsewhere.
## Priority changes
Numbered, three: change, action, success measure.
## Response to students
A short "You said, we did" paragraph for next cohort.
</output_format>
