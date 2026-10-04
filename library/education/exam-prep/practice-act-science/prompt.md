---
schema: 1
id: practice-act-science
kind: prompt
title: Practise ACT Science passages
description: Practises ACT Science with original data tables, graphs and experiment write-ups, teaching the student to find answers fast from the passage instead of from outside knowledge.
category: exam-prep
version: 1.0.0
status: incubating
stage: [verify, learn]
role: [student]
subject: [biology, chemistry, physics]
requires: [none]
inputs: [preferences]
output: [quiz, conversation, table]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [act, data-interpretation, graph-reading, experimental-design, conflicting-viewpoints, pacing]
pairs_with:
  prompts: [prepare-standardized-test, analyze-exam-mistakes]
args:
  - name: passages
    description: Number of passages in the set, each with its questions.
    type: number
    default: 3
  - name: passage_type
    description: data-representation is graphs and tables; research-summaries is one or more experiments; conflicting-viewpoints is two or more scientists' hypotheses about one phenomenon. mixed rotates through them.
    type: enum
    enum: [mixed, data-representation, research-summaries, conflicting-viewpoints]
    default: mixed
  - name: timed
    description: true gives a time target per passage and asks the student to report their time; false is untimed accuracy work.
    type: boolean
    default: true
output_contract:
  format: markdown
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
ACT Science is a reading-and-data test with a science costume. Almost every answer is in a figure, a table or the experiment description, and students who read the passage text in full or reach for what they learned in class run out of time. The fast method: skim the passage for what was varied and what was measured, go straight to the question, find the named variable in a figure's axis or table heading, and read off or follow the trend. Research summaries add design questions (what was held constant, why a control exists, what a new trial would show). Conflicting viewpoints need the opposite habit: read each scientist's claim and note exactly where they agree and disagree. The ACT has changed this section recently, including its timing and whether it is required; tell the student to check the current format on the official site and pace to that.
</context>

<task>
Run {{passages}} original ACT-style Science passages. Type: `{{passage_type}}`. Timed: {{timed}}.

1. For each passage, write it yourself: a plausible but invented study in biology, chemistry, physics or earth and space science, with one to three figures or tables rendered as Markdown tables or clearly described graphs (axes, units, data points or trend). Use realistic numbers and units. Never reproduce official passages.
2. Write five to seven questions per passage, in the real mix: read a value, identify a trend, interpolate or extrapolate, compare two figures, experimental design, and (for conflicting viewpoints) which scientist would agree with a new finding. At most one question per set may need outside knowledge, and it should be basic. Solve every question privately and check the key against the data.
3. Present one passage with all its questions in one message, options A to D (or F to J for even-numbered questions, as the ACT alternates). If timed is true, state the target time for this passage based on the current official pace you understand, and ask them to report their time with their answers.
4. After they answer the whole passage:
   - Mark each answer and give the key.
   - For each miss, show where the answer lives ("Figure 2, the 30 °C line, x = 4") and the shortest path to it.
   - Name the habit that cost time or accuracy: reading the whole passage first, using outside knowledge, misreading units or axes, ignoring a legend, mixing up the scientists.
   - If timed, compare their time with the target and say which questions to skip and return to next time.
5. Then present the next passage. After the last passage, give the review.
</task>

<constraints>
- Every answer must be derivable from the passage. If you notice a question that needs more than basic outside knowledge, replace it.
- Make the figures internally consistent: trends in the text must match the table numbers.
- Do not tell the student what the official score for their result would be.
- If a student disputes a key and is right, concede and correct the score.
</constraints>

<output_format>
Passages: a short title, the passage text, figures as Markdown tables or bulleted graph descriptions with axes and units, then numbered questions with options.

At the end:
**Score:** x / total.
A table: Question skill (value, trend, interpolate, compare figures, design, viewpoints) | Asked | Correct.
**Time:** per passage against target, if timed.
**Two habits for next time:** concrete, tied to their misses.
</output_format>
