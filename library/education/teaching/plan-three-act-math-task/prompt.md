---
schema: 1
id: plan-three-act-math-task
kind: prompt
title: Plan a three-act maths task
description: Plans a three-act maths task with the act one scene, the questions students will raise, what is revealed in act two, the act three answer, sequel problems and teacher moves.
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
depth: specific
subject: [mathematics]
tags: [three-act-task, mathematical-modelling, problem-solving, lesson-design]
pairs_with:
  prompts: [plan-number-talk, write-lesson-plan, diagnose-student-misconceptions]
args:
  - name: topic
    description: The maths the task should draw out, e.g. "rates and unit price", "volume of cylinders".
    type: string
    required: true
  - name: grade_level
    description: Grade, age or course.
    type: string
    required: true
  - name: duration_minutes
    description: Lesson length in minutes.
    type: number
    default: 60
  - name: idea
    description: Optional scene you already have in mind, e.g. "filling a water bottle from a slow tap".
    type: text
output_contract:
  format: markdown
  sections: [Overview, Act one, Act two, Act three, Sequels, Teacher moves, Timing]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A three-act task starts with a short, wordless scene (a photo or a 30-second video) that makes students wonder something mathematical, such as "how long until it's full?" Students generate the question, estimate (too low, too high, best guess), decide what information they need, receive it in act two, solve, and then see the real answer in act three. The value is in students choosing what matters and estimating before calculating. Tasks fail when the scene gives away the numbers, when the natural question is not the one the maths targets, when the teacher hands out all the information up front, or when there is no real answer to reveal. The teacher needs sequels ready for early finishers.
</context>

<task>
Plan a three-act task that draws out **{{topic}}** for **{{grade_level}}** in a {{duration_minutes}}-minute lesson.
{{#idea}}
Starting idea: {{idea}}
{{/idea}}

1. Choose a real-world scene a teacher can photograph or film in a few minutes with ordinary objects, where the most natural question requires {{topic}}. Describe exactly what to film or photograph, including what must stay hidden.
2. **Act one:** describe the scene, the "What do you notice? What do you wonder?" routine, the question you expect students to settle on, and how to steer to it if they choose another. Ask for estimates: too low, too high, best guess.
3. **Act two:** list the information students will probably ask for, what the teacher gives (with realistic numbers, labelled as example values the teacher replaces with their own measurements), and one piece of information that is a distractor or unnecessary. Show two or three solution strategies students might use, from informal to formal, with the worked maths.
4. **Act three:** how to reveal the answer (a final photo or video), the answer from the example values, and how to discuss differences between the calculated and actual result (measurement error, assumptions).
5. Write two or three sequel problems that extend the same maths (change a variable, reverse the question, generalise).
6. List teacher moves: questions to ask stuck students, which strategies to share in what order during discussion, and the misconception most likely to appear.
7. Give a timing plan that sums to {{duration_minutes}} minutes.
</task>

<constraints>
- The act one scene must not show the numbers students need; they must ask for them.
- Example numbers must be internally consistent and the worked answer correct; show the arithmetic.
- Use objects and settings a teacher can access cheaply; no real brands or people in the scene are required.
- Keep the maths at the level of {{grade_level}}; flag if the natural question needs maths beyond it.
</constraints>

<output_format>
## Overview
Topic, grade, the scene in one line, the target question.
## Act one
Scene to capture, notice-and-wonder routine, expected question, estimates.
## Act two
Information students ask for, values given, distractor, solution strategies with worked maths.
## Act three
Reveal, answer, discussion of differences.
## Sequels
Numbered problems with answers.
## Teacher moves
Questions, share order, likely misconception.
## Timing
A table: Minutes | Phase | Notes, adding to {{duration_minutes}}.
</output_format>
