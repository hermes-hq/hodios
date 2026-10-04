---
schema: 1
id: train-timed-reading-pace
kind: prompt
title: Train reading pace for timed tests
description: Trains reading for timed comprehension sections with skimming for structure, a questions-first or passage-first choice and per-passage time targets, using timed original passages and a pace log.
category: exam-prep
version: 1.0.0
status: incubating
stage: [verify, learn]
role: [student, job-seeker]
requires: [none]
inputs: [preferences]
output: [quiz, conversation, table]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: optional
level: intermediate
tags: [reading-comprehension, pacing, skimming, timed-practice, pace-log]
pairs_with:
  prompts: [practice-mcat-cars, practice-sat-section, practice-gre-verbal]
args:
  - name: minutes_per_passage
    description: Your target minutes per passage including its questions, from your test's total time divided by passages.
    type: number
    default: 8
  - name: level
    description: Passage difficulty and style.
    type: enum
    enum: [secondary, university, professional]
    default: secondary
  - name: passages
    description: Number of passages in the session.
    type: number
    default: 3
output_contract:
  format: markdown
  sections: [Pace log, Your reading approach]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
In reading-heavy timed tests, many students understand the passages but run out of time, because they read every sentence at the same careful speed, reread when anxious, and hunt through the passage for each answer. Faster accurate reading is a strategy, not a speed trick: a quick first pass for the structure and the author's purpose (first and last paragraphs, topic sentences, contrast words such as "however"), then targeted rereading of the lines a question points to. Whether to read the questions first depends on the student and the question type; the way to decide is to test both and log time and accuracy. Speed-reading claims of very high words per minute with full comprehension are not supported by evidence.

Target: {{minutes_per_passage}} minutes per passage. Level: {{level}}. Passages: {{passages}}.
</context>

<task>
1. In the first message, do not wait for answers before starting: ask in one line for the test name and whether they currently read questions first (they can answer with passage 1), explain the method in five lines, then send passage 1. The method: structure skim (about a quarter of the time), map each paragraph in three or four words, answer questions by returning to the lines, guess and move on at the time limit, and log each passage.
2. Write {{passages}} original passages at {{level}} level (350-600 words each, varied genres: argument, science explanation, narrative or history) with 4-6 questions each covering main idea, detail, inference, vocabulary in context and author's purpose. Alternate approaches: passage first for one, questions first for the next.
3. Send one passage at a time with its questions. Ask the student to note start and end time, or minutes taken, and reply with answers and time.
4. Mark each answer with the line that proves it. Classify misses: misread, inference too far, ran out of time, vocabulary. Compare time with the {{minutes_per_passage}} target.
5. After each passage give one pacing adjustment ("You spent half the time on the first read; cap the skim at two minutes").
6. After the last passage, compare the approaches and give the log.
</task>

<constraints>
- Original passages only; never reproduce copyrighted texts or published test passages.
- One passage per message; do not show answers before the student replies.
- Do not promise score or speed gains; report what the log shows.
- If the student's times are far over target, prioritise the guess-and-move-on rule over more reading.
- If the test the student names clearly sits at a different level from the one set (for example a law or medical admissions test with the secondary default), say so in one line and write passages at the test's level.
</constraints>

<output_format>
Passages with numbered lines every five lines so answers can cite them. Questions numbered with options A-D.

At the end:
## Pace log
Table: Passage | Approach | Minutes | Target | Correct | Main miss type.
## Your reading approach
Which approach worked better for them and why, in three bullets, and one drill for the coming week.
</output_format>
