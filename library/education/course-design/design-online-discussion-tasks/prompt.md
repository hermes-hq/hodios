---
schema: 1
id: design-online-discussion-tasks
kind: prompt
title: Design online discussion tasks
description: Designs async online discussion tasks that produce real exchange, with decision or problem prompts, roles, staggered deadlines, a reply rubric and instructor moves, not "post once, reply twice".
category: course-design
version: 1.0.0
status: incubating
stage: [design, build]
role: [teacher]
requires: [none]
inputs: [text, topic]
output: [plan, table, copy]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [discussion-forums, asynchronous-learning, online-learning, collaborative-learning, discussion-rubric, facilitation]
pairs_with:
  prompts: [convert-course-to-online, design-blended-program, create-rubric]
args:
  - name: module_topics
    description: The topics or readings for each week, the course level and outcomes, group size, and the platform's forum features if relevant (groups, post-first settings, threads).
    type: text
    required: true
  - name: weeks
    description: Number of weeks that need a discussion task.
    type: number
    default: 6
output_contract:
  format: markdown
  sections: [Design principles used, Weekly tasks, Roles, Deadlines and group set-up, Reply rubric, Instructor moves]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
"Post 250 words on the reading and reply to two classmates" produces parallel monologues: everyone posts the night before the deadline, replies say "Great point, I agree", and the instructor reads 300 posts nobody else reads. Discussion works online when the prompt forces a position or a decision that reasonable people disagree on, when learners need each other's input to finish (different cases, roles or data), when deadlines are staggered so replies have something to reply to, when groups are small (5-8), and when the rubric rewards building on, challenging and synthesising rather than word count.

Weeks: {{weeks}}.
</context>

<task>
<module_topics>
{{module_topics}}
</module_topics>

1. For each of the {{weeks}} weeks, choose a discussion format that fits the topic, varying them across the course: decide-and-defend (pick from options and justify), case analysis with different groups taking different cases, debate with assigned sides, problem-solving with partial information shared across members, critique of a worked example or draft, applying a concept to learners' own context, and a synthesis week.
2. Write each prompt in learner-facing words: the scenario or question, what to post first (and its length), what replies must do, and how it connects to an outcome or assessment.
3. Define rotating roles for small groups (starter, challenger, connector to the reading, summariser) and how they rotate.
4. Set staggered deadlines (for example initial post by day 3, replies by day 6, summariser post by day 7) and recommended group size and grouping method.
5. Write a short reply rubric with three or four criteria (uses evidence, builds on or challenges a specific point, moves the discussion forward, clarity) and three levels, plus examples of a weak and a strong reply.
6. List instructor moves: a weekly launch note, targeted questions to a thread that stalls, drawing quiet learners in privately, a weekly wrap-up that names good contributions (with permission) and corrects misconceptions, and a time budget per week.
</task>

<constraints>
- Prompts must have no single obvious answer and must require the reading or concept to answer well.
- Avoid prompts that make learners disclose personal, health or sensitive information; offer a hypothetical option when using their own context.
- Keep marking manageable: grade a sample or the summariser post, or use the rubric holistically per week; state the instructor time per week.
- Include accessibility: plain-language prompts, an audio or video posting option where possible, and a deadline window that works across time zones if learners are distributed.
- If topics are missing, ask for them and stop.
</constraints>

<output_format>
## Design principles used
Three to five bullets tied to this course.
## Weekly tasks
For each week: format, learner-facing prompt, what to post, what replies do, outcome link.
## Roles
Table: Role | What it does | Rotation.
## Deadlines and group set-up
Bullets.
## Reply rubric
Table: Criterion | Developing | Secure | Excellent. Then a weak and a strong example reply.
## Instructor moves
Bullets with minutes per week.
</output_format>
