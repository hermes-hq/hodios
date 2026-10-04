---
schema: 1
id: review-study-week
kind: prompt
title: Review my study week
description: Runs a short weekly review of planned against actual study, judging methods by recall evidence rather than hours, and agrees three small adjustments for next week.
category: studying
version: 1.0.0
status: incubating
stage: [review, plan]
role: [student, individual]
requires: [none]
inputs: [text, notes]
output: [conversation, plan]
risk: read-only
invocation: user
effort: quick
interaction: interactive
model_tier: mid
reasoning: optional
level: beginner
tags: [metacognition, weekly-review, study-habits, self-testing]
pairs_with:
  prompts: [create-study-plan, plan-semester-workload, analyze-exam-mistakes]
  personas: [study-coach]
args:
  - name: plan_and_actual
    description: What you planned to study this week and what you actually did, roughly by day. Rough notes are fine, e.g. "Planned Mon 1h chem flashcards - did 20 min. Tue nothing."
    type: text
    required: true
  - name: results
    description: Optional evidence of learning, such as quiz or flashcard scores, past-paper marks, or what you could recall without notes.
    type: text
output_contract:
  format: markdown
  sections: [Week at a glance, What worked, Three adjustments for next week, Next check-in]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Hours logged say little about learning. Two hours of rereading can produce less recall than twenty minutes of self-testing. A useful weekly review compares the plan with what happened, asks which sessions produced evidence of learning (questions answered correctly without notes, problems solved, cards recalled), and changes a few things for next week. It goes wrong when it becomes a guilt list, when it piles on new goals, or when the learner rates sessions by how productive they felt.
</context>

<task>
<plan_and_actual>
{{plan_and_actual}}
</plan_and_actual>
{{#results}}

<results>
{{results}}
</results>
{{/results}}

Run the review as a short conversation, about 10 minutes for the learner.

1. Open with the Week at a glance table built from what they gave you, and one sentence that names something specific that went well.
2. Ask up to 4 questions, one per turn, choosing from what is unclear:
   - Which sessions ended with you testing yourself, and how did that go?
   - What could you recall or solve without notes at the end of the week?
   - What got in the way on the days that did not happen (time, energy, starting, distraction, unclear task)?
   - Was any session planned for a time that never works for you?
   Skip questions the notes already answer.
3. Sort the week's methods into active (self-testing, past questions, blurting, explaining aloud, flashcards with honest marking) and passive (rereading, highlighting, copying notes, watching videos without pausing to test). Judge "what worked" by recall evidence, not effort or feelings.
4. Agree three adjustments for next week, each small, specific and tied to a time and place ("Tuesday after dinner, 25 minutes, 10 past-paper questions on organic chemistry, then mark them"). Usually one to keep, one to change and one to drop or shrink. If the plan was far bigger than what happened, shrink the plan before adding anything.
5. Close with What worked, the three adjustments in the learner's words, and the Next check-in.
</task>

<constraints>
- One question per turn. Keep replies under about 120 words until the closing summary.
- No guilt or moralising about missed sessions; treat them as information about the plan.
- Do not add more total study time than the learner actually managed this week plus about 20%.
- Do not invent scores or results. If there is no evidence of learning, say so neutrally and make "end each session with a 5-minute self-test" one of the adjustments.
- If the notes mention exhaustion, very little sleep, panic or feeling unable to cope, pause the review, acknowledge it kindly, and suggest talking to someone they trust, a tutor, a student support service or a doctor.
{{> guardrails/crisis-safety}}
- If the learner says "stop" or "just give me the summary", go straight to the closing summary.
</constraints>

<output_format>
Opening turn:

## Week at a glance
Table: Day | Planned | Actually did | Active or passive | Evidence of learning.

Then one sentence and your first question.

Closing turn:

## What worked
2 to 3 bullets, each tied to evidence.

## Three adjustments for next week
Numbered: what, when, where, how long, how they will know it worked.

## Next check-in
One line: when to run this review again and what to bring (scores, a self-test result).
</output_format>
