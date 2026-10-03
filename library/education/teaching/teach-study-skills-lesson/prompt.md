---
schema: 1
id: teach-study-skills-lesson
kind: prompt
title: Plan a lesson that teaches a study skill
description: Plans a lesson that explicitly teaches one study skill such as retrieval practice, note-making, planning, revision or active reading, with modelling, guided practice and reflection.
category: teaching
version: 1.0.0
status: incubating
stage: [plan]
role: [teacher]
requires: [none]
inputs: [topic]
output: [plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [learning-strategies, metacognition, retrieval-practice, spaced-practice, note-making, self-regulated-learning]
pairs_with:
  prompts: [plan-media-literacy-lesson, write-lesson-plan, create-study-plan]
  personas: [study-coach]
args:
  - name: skill
    description: The study skill to teach. retrieval-practice is self-testing; note-making is turning lessons or reading into useful notes; planning is organising time and tasks; revision is preparing for tests over time; reading is active reading of textbooks and articles.
    type: enum
    enum: [retrieval-practice, note-making, planning, revision, reading]
    required: true
  - name: grade_level
    description: Grade, year or age, plus a subject if the lesson should use its content, e.g. "Grade 8 science", "Year 11".
    type: string
    required: true
  - name: minutes
    description: Lesson length in minutes.
    type: number
    default: 45
output_contract:
  format: markdown
  sections: [Objective, Why it works, Hook, Model, Guided practice, Independent practice, Reflection, Making it stick]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most students are never taught how to study, and the strategies they choose by themselves (rereading, highlighting, copying notes neatly, cramming) feel productive but produce weak long-term learning. The strategies with the strongest evidence are effortful: retrieval practice (testing yourself), spacing practice over time, interleaving related topics, and explaining ideas in your own words. Because they feel harder, students abandon them unless they experience the difference and practise the skill on real content. A study-skills lesson should therefore be taught like any other skill: a brief, honest reason, a teacher model with a think-aloud, guided and then independent practice on the students' actual subject content, and a plan to keep using it.
</context>

<task>
Plan a {{minutes}}-minute lesson for **{{grade_level}}** that explicitly teaches **{{skill}}**.

1. **Objective:** one objective and 2 or 3 "I can…" statements about using the skill.
2. **Why it works:** 3 or 4 sentences the teacher can say, in student language, explaining the evidence honestly (for example that rereading creates a feeling of familiarity that is not the same as being able to recall something), without overstated claims or invented statistics.
3. **Hook** (about 5 minutes): a quick experience that shows the problem the skill solves, such as a surprise recall test on yesterday's lesson, or comparing how confident students feel with how much they can actually write down.
4. **Model:** a teacher think-aloud using the skill on real content suited to {{grade_level}} (use the subject named in the grade level, or a short piece of general content the teacher can swap for the current unit). Show the steps and the decisions, including what to do when you get something wrong.
   - retrieval-practice: brain dumps, self-quizzing, flashcards with spaced review, checking answers and correcting.
   - note-making: a structure such as Cornell notes or a two-column method, selecting key ideas, using your own words, adding questions for later self-testing.
   - planning: breaking a task into steps, estimating time, scheduling in a planner, prioritising, planning for distractions.
   - revision: spacing over days or weeks, mixing topics, practice questions under realistic conditions, using mistakes to decide what to study next.
   - reading: previewing headings and visuals, setting a purpose, stopping to summarise, asking and answering questions, checking understanding.
5. **Guided practice:** students try the skill in pairs or as a class with prompts and feedback, using the same or similar content.
6. **Independent practice:** students use the skill on their own current subject content, with a short success checklist.
7. **Reflection:** questions that compare how the strategy felt with how well it worked, and a commitment for when they will use it in the next week.
8. **Making it stick:** how the teacher brings the skill back in later lessons (a weekly routine, a prompt card, a homework task), and a brief note for families.
9. Timings add up to {{minutes}} minutes.
</task>

<constraints>
- Ground claims in well-established learning science; avoid learning-styles claims, brain myths, and made-up statistics.
- Adapt complexity to {{grade_level}}: younger students need shorter steps and lots of modelling; older students can plan their own schedules.
- Keep the content used in the model accurate.
- Make the practice use real school content, not generic study tips in isolation.
</constraints>

<output_format>
## Objective
## Why it works
The teacher's words.
## Hook
Time and activity.
## Model
Time, then the think-aloud script with the steps.
## Guided practice
Time, task and prompts.
## Independent practice
Time, task and success checklist.
## Reflection
Questions and commitment.
## Making it stick
Bullets, and a two-sentence family note.
</output_format>
