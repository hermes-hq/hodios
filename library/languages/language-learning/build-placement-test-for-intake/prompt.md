---
schema: 1
id: build-placement-test-for-intake
kind: prompt
title: Build a placement test for a course intake
description: Builds a short written and oral placement test for a language school or community course, with items from A1 to C1, cut-off scores, an interview script and a scoring sheet.
category: language-learning
version: 1.0.0
status: incubating
stage: [design]
role: [teacher, manager]
requires: [none]
inputs: [notes, preferences]
output: [quiz, script, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [placement-test, cefr, oral-interview, cut-scores, enrolment]
pairs_with:
  personas: [language-assessment-specialist]
  prompts: [write-speaking-assessment-rubric, assess-language-level]
args:
  - name: target_language
    description: The language of the courses.
    type: string
    required: true
  - name: levels_offered
    description: The classes new students can be placed in (for example "pre-entry literacy, A1, A2, B1, B2"), and who the students are (adults, teens, migrants, university staff).
    type: string
    required: true
  - name: time_available
    description: Total time per student for the written and oral parts together.
    type: string
    default: 30 minutes
output_contract:
  format: markdown
  sections: [Test design, Written test, Oral interview script, Scoring and placement, Administration notes, Answer key]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a language school, college or community programme build a placement test for {{target_language}} courses. Placement is a low-stakes, sorting decision: the test only needs to tell the offered classes apart, quickly and kindly. Home-made placement tests usually fail by being all grammar multiple choice (fluent-but-inaccurate speakers get under-placed and accurate-but-silent ones over-placed); by having too few items at the boundaries that matter; by not catching learners who cannot read, who then sit in front of a written test they cannot attempt; and by treating cut-off scores as precise when they are a first guess to be checked.

Classes and students: {{levels_offered}}
Time per student: {{time_available}}
</context>

<task>
1. Test design: from the classes offered, list the decision boundaries (for example A1/A2, A2/B1). If the classes have school names ("beginners", "improvers", "Level 3"), map each to an approximate CEFR range, mark the mapping as an assumption and test the boundaries between them. Split the time between a written part and an oral part (about 60/40, or more oral time for low-literacy groups). State the order: a 1-minute literacy screen first, then a written part that students stop when it gets too hard (it can be taken by a whole group at once), then a one-to-one oral interview, which can confirm or overrule the written score.
2. Literacy screen: 3-4 quick items (read your name and address on a form, read a simple sign, write your name and phone number) that route students with little print literacy straight to the oral interview and a literacy class. Skip it when the group is clearly literate (for example university staff) and say so.
3. Written test: 30-40 items in blocks of increasing difficulty, one block per level from A1 up to one level above the highest class. Mix item types: grammar and vocabulary in context (gapped sentences in short texts), short reading with a question, and one short writing prompt per level band. Put most items around the boundaries that matter. Tell students to stop when they no longer understand.
4. Oral interview script: 6-8 minutes, a warm, scripted conversation that climbs: personal questions (A1), routines and past events (A2), plans, opinions and a short story (B1), a justify-and-compare question (B2), an abstract or hypothetical question (C1). Include the examiner's exact words, when to stop climbing (two unsuccessful turns at a level), and a one-line descriptor per level for the decision.
5. Scoring and placement: points per block, provisional cut-offs per class, the rule for combining written and oral results (for example, oral overrides when it differs by more than one level), and what to do with borderline students (place in the lower class with a review after two weeks).
6. Administration notes: instructions to give in simple {{target_language}} and, if possible, in students' languages; how to put people at ease; marking time; the staffing sum for the oral part (number of applicants x interview minutes / number of interviewers, shown with the user's numbers or as a formula if they gave none) and a shorter interview for students whose written score is clearly in one band; how to check the cut-offs after the first intake (compare with teachers' judgement after two weeks and adjust).
7. Answer key.
</task>

<constraints>
- Write original items; do not reproduce published or commercial tests.
- Present cut-off scores as provisional starting points to check, never as validated.
- Topics are neutral and adult-appropriate (or age-appropriate for teens); avoid questions about immigration status, trauma, religion or politics.
- If the classes offered or the student group are unclear, list your assumptions at the top.
- If the time is too short for both parts, say what to drop and the risk it creates.
</constraints>

<output_format>
## Test design
Boundaries, timing split, order, rationale.
## Written test
Literacy screen, then blocks labelled by level, numbered items.
## Oral interview script
Table: Stage | Level | Examiner says | Listen for. Then the stop rule and level descriptors.
## Scoring and placement
Table: Class | Written score | Oral level. Then the combining rule and the borderline rule.
## Administration notes
## Answer key
</output_format>
