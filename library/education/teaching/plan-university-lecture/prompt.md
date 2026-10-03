---
schema: 1
id: plan-university-lecture
kind: prompt
title: Plan a university lecture
description: Plans an interactive university lecture with timed segments, interaction points, worked examples, a slide outline and a retrieval check, sized to the slot. Use when preparing a lecture.
category: teaching
version: 1.0.0
status: incubating
stage: [plan, build]
role: [teacher]
requires: [none]
inputs: [topic, notes]
output: [plan, outline]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [lecture, university-teaching, peer-instruction, retrieval-practice, active-learning, slide-outline]
pairs_with:
  prompts: [write-lesson-plan, design-classroom-activity, write-multiple-choice-questions]
  personas: [instructional-coach]
args:
  - name: topic
    description: What the lecture covers and where it sits in the course, e.g. "Week 5 - eigenvalues and eigenvectors, after matrix multiplication and determinants".
    type: text
    required: true
  - name: course_level
    description: The course, level and class size, e.g. "first-year undergraduate linear algebra, 200 students".
    type: string
    required: true
  - name: minutes
    description: Length of the lecture slot in minutes.
    type: number
    default: 50
output_contract:
  format: markdown
  sections: [Lecture goals, Timed plan, Worked examples, Interaction points, Slide outline, Retrieval check, Notes for next time]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Lectures work better when they are broken into segments of about 10 to 15 minutes separated by short activities where every student has to think, commit to an answer and compare it with others. Peer instruction (a concept question, individual vote, discussion with a neighbour, revote, explanation) reliably improves conceptual understanding, even in large rooms. Worked examples should be shown step by step with the reasoning spoken aloud, then followed by a similar problem for students to try. Starting with a quick retrieval question on last week's material and ending with a check on today's makes learning visible to both lecturer and students. Lecturers usually overestimate how much fits in a slot.
</context>

<task>
Plan a {{minutes}}-minute lecture on:

<topic>
{{topic}}
</topic>

Level: **{{course_level}}**

1. If the class size is not in the level description, assume about 100 students and say so, because it decides which interaction formats work. Write 2 to 4 lecture goals with observable verbs. Cut anything that cannot be taught properly in the time and list it under "move elsewhere" (reading, problem set, next lecture).
2. Build a timed plan that adds up to exactly {{minutes}} minutes: an opening retrieval question on prior material (3 to 5 minutes), segments of no more than about 15 minutes of exposition, an interaction point between segments, and a closing retrieval check with a one-sentence summary. Include a 2 to 3 minute buffer as its own row inside the total, so the rows still add up to exactly {{minutes}}.
3. Write out each worked example in full: the problem, the steps with the reasoning the lecturer says aloud, and a follow-up "your turn" problem with its answer.
4. Write each interaction point as it will be run: the exact question, the format (vote with a polling tool or hands or cards, think-pair-share, predict-then-reveal, a one-minute paper), timing, the answer and, for multiple-choice concept questions, why each wrong option is tempting.
5. Give a slide outline: one line per slide with its title and content, keeping text minimal (a diagram or example rather than bullet walls), and mark which slides are worked by hand or annotated live.
6. Write the closing retrieval check: 2 or 3 short questions that test today's goals, with answers.
7. Add notes on what to watch for (the most likely confusion and the cue that students are lost) and what to adjust next time.
</task>

<constraints>
- Content must be accurate for the level; if the topic description is ambiguous (which notation, which prior knowledge), state your assumption at the top.
- Interaction formats must work at the stated class size; for 100+ students avoid activities that need the lecturer to hear every group.
- Do not pad with generic advice about engagement; everything in the plan is specific to this topic.
- If the slot cannot fit the topic as described, say so and propose the split.
</constraints>

<output_format>
## Lecture goals
Numbered goals, then "Move elsewhere".
## Timed plan
Table: Start-end (min) | Segment | What happens | Interaction. Times sum to {{minutes}}.
## Worked examples
Each with steps, spoken reasoning and a "your turn" problem with answer.
## Interaction points
Each with question, format, timing, answer and distractor notes.
## Slide outline
Numbered list: Slide title - content (live annotation marked).
## Retrieval check
Questions with answers.
## Notes for next time
Bullets.
</output_format>
