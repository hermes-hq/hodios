---
schema: 1
id: plan-lesson-on-sensitive-topic
kind: prompt
title: Plan a lesson on a sensitive topic
description: Plans a lesson on a contested or sensitive topic with ground rules, balanced sources, a structured discussion, distancing techniques, opt-outs and scripts for hurtful comments.
category: teaching
version: 1.0.0
status: incubating
stage: [plan]
role: [teacher]
requires: [none]
inputs: [topic, notes]
output: [plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [controversial-issues, classroom-discussion, ground-rules, safe-classroom]
pairs_with:
  prompts: [plan-current-events-lesson, plan-socratic-seminar, plan-media-literacy-lesson]
args:
  - name: topic
    description: The topic, e.g. "immigration policy", "a recent local tragedy", "gender stereotypes in advertising".
    type: string
    required: true
  - name: grade_level
    description: Grade, age or course.
    type: string
    required: true
  - name: subject_context
    description: The subject and why the topic is in the curriculum, e.g. "citizenship, unit on rights".
    type: string
    required: true
  - name: class_notes
    description: Optional context, e.g. "students directly affected", "strong views in the community", "recent incident in school". No names.
    type: text
  - name: school_policy
    description: Optional school or national guidance that applies, e.g. a political impartiality rule or a parental notification policy.
    type: text
output_contract:
  format: markdown
  sections: [Before the lesson, Ground rules, Lesson plan, Handling difficult moments, After the lesson]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Experienced teachers handle sensitive topics by preparing more than usual, not by avoiding them. The key distinctions: whether a question is genuinely open (reasonable people disagree, so present multiple perspectives fairly) or settled (factual or a matter of basic rights, where "balance" would mislead); whether students in the room are personally affected; and what the school and any national rules say about political impartiality and teacher opinion. Techniques that work include agreed ground rules, distancing (discuss a case study or fictional character rather than students' own lives), structured formats (think-pair-share, anonymous questions, silent written conversation) instead of open debate, and pre-planned responses to hurtful remarks. Students who may be distressed need a quiet way to step out.
</context>

<task>
Plan a lesson on **{{topic}}** for **{{grade_level}}** in {{subject_context}}.
{{#class_notes}}
<class_notes>
{{class_notes}}
</class_notes>
{{/class_notes}}
{{#school_policy}}
<school_policy>
{{school_policy}}
</school_policy>
{{/school_policy}}

1. Classify the topic's parts: which questions are genuinely contested, which rest on established facts or rights, and which carry personal risk for students in the room. Say how that shapes the teaching.
2. List preparation: who to inform (colleagues, pastoral or wellbeing staff, families if policy requires), students to check in with privately beforehand, and the policy the teacher must follow on sharing their own view.
3. Write 4 to 6 ground rules in student-friendly language, and how to set them with the class.
4. Plan the lesson: objective; a distancing entry point (case study, scenario, source); a source set described by type and perspective with what each represents (the teacher finds actual sources), a structured discussion activity, and a reflective closure that brings the temperature down.
5. Build in opt-outs: how a student can step out or take a different role without being singled out.
6. Write short scripts for difficult moments: a hurtful or discriminatory comment, a student who becomes upset, a factual falsehood presented as opinion, a student asking the teacher's personal view, and a disclosure.
7. Plan follow-up: checking on affected students, a channel for later questions, and reporting any concern.
</task>

<constraints>
- Do not present established facts or human rights as one side of a debate; do present genuinely contested policy questions fairly.
- Do not invent sources, quotes or statistics; describe the kind of source and leave the selection to the teacher.
- Follow any political-impartiality or notification rule given; if none is given, tell the teacher to check the school's policy.
- Any disclosure of harm goes to the designated safeguarding lead under school procedure: the disclosure script tells the teacher to listen calmly, not promise confidentiality, not question or investigate, write down what was said, and report the same day.
- No graphic material beyond what the age group and curriculum require.
</constraints>

<output_format>
## Before the lesson
Topic analysis and preparation steps.
## Ground rules
Numbered, and how to set them.
## Lesson plan
Objective, timings, activities, sources by type, closure, opt-outs.
## Handling difficult moments
Situation → what the teacher says and does.
## After the lesson
Follow-up steps.
</output_format>
