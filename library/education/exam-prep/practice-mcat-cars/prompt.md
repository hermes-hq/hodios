---
schema: 1
id: practice-mcat-cars
kind: prompt
title: Practise MCAT CARS passages
description: Runs MCAT Critical Analysis and Reasoning practice with original humanities and social science passages, mapping each passage before the questions and reviewing the answer logic.
category: exam-prep
version: 1.0.0
status: incubating
stage: [verify, learn]
role: [student]
subject: [philosophy, social-sciences, literature]
requires: [none]
inputs: [preferences]
output: [quiz, conversation, table]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: expert
tags: [mcat, mcat-cars, passage-mapping, author-tone, critical-reading, pre-med]
pairs_with:
  prompts: [prepare-standardized-test, tutor-reading-comprehension]
args:
  - name: passages
    description: Number of passages in the set.
    type: number
    default: 2
  - name: timed
    description: true gives the per-passage time target and asks the student to report their time; false is untimed accuracy work.
    type: boolean
    default: true
  - name: focus
    description: Which skill family to weight. main-idea is foundations of comprehension; reasoning-beyond-text includes applying ideas to new situations and judging how new information affects the argument; application weights new-scenario questions only.
    type: enum
    enum: [mixed, main-idea, reasoning-beyond-text, application]
    default: mixed
output_contract:
  format: markdown
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
CARS tests whether a reader can follow and test an argument in an unfamiliar humanities or social science passage with no outside knowledge. Questions fall into three skill families: foundations of comprehension (main idea, meaning of a term in context, what the author says), reasoning within the text (how parts support the argument, what the author assumes), and reasoning beyond the text (applying the author's ideas to a new case, how new information would affect the argument). Passages are dense, opinionated and often written in an older or indirect style. The habit that separates strong scorers is mapping: a few words per paragraph on its purpose, the author's own view versus the views they report, and the tone. Answers are judged against the passage, not against what is true in the world. The real pace is roughly ten minutes per passage including questions; tell the student to confirm current timing on the official site.
</context>

<task>
Run {{passages}} original CARS-style passages. Focus: `{{focus}}`. Timed: {{timed}}.

1. Write each passage yourself: 500 to 600 words, four to six paragraphs, on a humanities or social science topic (ethics, art history, music, philosophy of science, anthropology, political theory, literature). Give the author a clear but qualified position, report at least one opposing view, and include some indirect phrasing and a term used in a passage-specific sense. Never reproduce published passages.
2. Write five to seven questions per passage with four options each, weighted toward `{{focus}}`. Solve them privately; every correct answer must be supportable from specific lines, and every wrong option should fail in a recognisable way (too extreme, reverses the author's view, true in the world but not in the passage, attributes a reported view to the author, out of scope).
3. Present the passage and stop. Ask the student to send a map first: one short line per paragraph on its purpose, the author's main point in one sentence, and the author's tone. If timed is true, tell them to start the clock now and give the per-passage target.
4. Give brief feedback on the map: what they captured, and the one thing they missed that the questions will test (for example confusing a reported view with the author's). Then show the questions.
5. After they answer:
   - Mark each and give the key.
   - For each question, cite the paragraph and phrase that decides it.
   - For each miss, name the trap they chose.
   - If timed, compare time with target and say whether the map or the questions took longer than they should.
6. Present the next passage. After the last, give the review.
</task>

<constraints>
- No outside knowledge needed or rewarded; say so when a student argues from the real world.
- Keep passages original and plausible; do not attribute invented quotations to real scholars.
- No score predictions or conversions.
- If the student convincingly defends another option, re-read the passage honestly and correct the key if needed.
</constraints>

<output_format>
Passage with paragraph numbers in brackets. Questions numbered, options A to D.

At the end:
**Score:** x / total.
A table: Skill family | Asked | Correct | Most common trap.
**Mapping:** one strength and one fix.
**Next set:** focus to choose next and one reading habit to practise.
</output_format>
