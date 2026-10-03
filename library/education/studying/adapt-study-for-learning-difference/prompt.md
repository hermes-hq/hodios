---
schema: 1
id: adapt-study-for-learning-difference
kind: prompt
title: Adapt study for a learning difference
description: Adapts study techniques for a learner with ADHD, dyslexia or dyspraxia, with environment changes, tools, chunking, a two-week experiment and how to request support.
category: studying
version: 1.0.0
status: incubating
stage: [plan, learn]
role: [student, parent]
requires: [none]
inputs: [preferences, text]
output: [plan, table, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [adhd, dyslexia, dyspraxia, neurodiversity, accommodations, assistive-technology]
pairs_with:
  prompts: [create-study-plan, make-flashcards, create-memory-aids]
  personas: [study-coach]
args:
  - name: learning_difference
    description: The learning difference, diagnosed or suspected, for example "ADHD (diagnosed)", "dyslexia", "dyspraxia / DCD", or a combination.
    type: string
    required: true
  - name: subjects
    description: Optional subjects or course and the kind of work involved (reading-heavy, maths, essays, practicals, exams).
    type: text
  - name: current_struggles
    description: What is actually going wrong, with examples, for example "I can't start essays until the night before", "I lose my place reading long articles", "my handwriting is too slow in exams".
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What is getting in the way, Strategies matched to your struggles, Your study environment, Tools, Support you can ask for, Two-week experiment]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Generic study advice ("make a timetable and stick to it", "reread your notes") often fails learners with ADHD, dyslexia or dyspraxia, not because they lack effort but because the advice assumes reliable working memory, reading speed, time sense or handwriting. Good support starts from the specific struggle, uses the learner's strengths, changes the environment and tools before asking for more willpower, and makes use of the formal adjustments schools and universities are often required to offer. Strategies work differently for different people, so they are tried as small experiments and kept only if they help.
</context>

<task>
Build a study approach for a learner with {{learning_difference}}.
{{#subjects}}Subjects and work involved: {{subjects}}{{/subjects}}

<struggles>
{{current_struggles}}
</struggles>

1. Restate each struggle in one line and the likely mechanism behind it, framed as a mismatch between the task and how the learner works (for example, "starting is hard because the task has no visible first step and the deadline feels far away"), not as a flaw.
2. For each struggle, give 2 or 3 strategies matched to that mechanism. Draw on approaches with reasonable evidence or strong practitioner consensus, such as:
   - ADHD: externalised time (visible timers, time-blocked calendars), tiny defined first steps, short sessions with planned breaks, body doubling, novelty and interest hooks, removing friction (materials out, phone in another room), and re-start rules after losing a day.
   - Dyslexia: text-to-speech and audiobooks for reading load, speech-to-text for drafting, structured and multisensory spelling practice, visual planning (mind maps, outlines), reading in shorter sections with a question to answer, and extra time.
   - Dyspraxia: typing instead of handwriting, templates and checklists for organisation, a fixed layout for materials, step-by-step written instructions for practicals, and extra time for physical tasks.
   Adapt these to the actual struggles and subjects; do not list everything.
3. Suggest changes to the study environment and routine.
4. Name tools by type (text-to-speech, speech-to-text, a visual timer, a task manager with reminders) and mention well-known free options only as examples.
5. Explain the support the learner can ask for: typical adjustments (extra time, a computer in exams, a separate room, rest breaks, lecture recordings, coloured or enlarged papers, deadline flexibility), who usually handles them (the school's special educational needs coordinator, the university's disability or accessibility service), what evidence may be asked for, and that names and rules vary by country and institution. Write a short, factual request email the learner can adapt.
6. Design a two-week experiment: choose the 2 or 3 strategies most likely to help, how to try each, and what to notice, with a review at the end.
</task>

<constraints>
- Do not diagnose. If the difference is suspected rather than diagnosed, say an assessment can open up formal support, explain who usually provides one (a school or university disability service, an educational psychologist, a doctor), and still give strategies.
- Do not advise on medication, dosage or treatment; if the learner asks, say that is a question for their prescriber or doctor.
- Do not promote approaches without good evidence as if they were proven (learning styles, coloured overlays as a cure). If you mention one, say the evidence is weak and it is fine to keep only if it helps.
- Use strengths-first, non-judgemental language, and keep the plan small enough to start this week.
- If the struggles are too vague to match strategies to ("I'm just bad at studying"), ask two or three specific questions first.
</constraints>

<output_format>
## What is getting in the way
One line per struggle with its likely mechanism.
## Strategies matched to your struggles
A table: Struggle | Strategy | Why it helps | Try it this week.
## Your study environment
3 to 5 bullets.
## Tools
By type, with what each solves.
## Support you can ask for
Adjustments, who to ask, evidence that may be needed, then the request email in a quote block.
## Two-week experiment
The strategies to try, how, what to track, and the review questions for day 14.
</output_format>
