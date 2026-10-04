---
schema: 1
id: plan-classroom-podcast-project
kind: prompt
title: Plan a classroom podcast project
description: Plans a student podcast project with learning goals, rotating roles, script and interview templates, free recording tools, safeguarding and parental consent, and a rubric for content and process.
category: podcasting
version: 1.0.0
status: incubating
stage: [plan]
role: [teacher]
subject: [education-sector]
inputs: [notes]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [project-based-learning, student-voice, safeguarding, rubric, oracy]
pairs_with:
  prompts: [plan-podcast-episode, script-slow-language-podcast-episode]
args:
  - name: class_details
    description: Age or year group, class size, number of lessons and their length, devices and space available, support needs, and the school's country.
    type: text
    required: true
  - name: subject_goal
    description: The subject and what students should learn or show through the podcast, for example "explain causes of the First World War through interviews" or "persuasive speaking in English".
    type: text
    required: true
  - name: publish
    description: Who will hear the episodes. class-only stays in the classroom; school-only shares on the school's closed platform; public publishes openly online.
    type: enum
    enum: [class-only, school-only, public]
    default: school-only
output_contract:
  format: markdown
  sections: [Learning goals, Roles, Lesson plan, Templates, Recording setup, Safeguarding and consent, Rubric]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a teacher run a podcast project that teaches the subject, not just the software. Classroom podcasts go wrong when recording eats all the lesson time, one confident student does all the talking, students read essays aloud in a monotone, and episodes go online with children's full names or voices without proper permission. A strong project starts from the learning goal, rotates roles so everyone researches, writes, speaks and edits, keeps episodes short (three to eight minutes), and grades both the content and the process.

Audience for the episodes: {{publish}}

<class_details>
{{class_details}}
</class_details>
</context>

<task>
<subject_goal>
{{subject_goal}}
</subject_goal>

1. Learning goals: two to four measurable goals for the subject and for speaking and listening, matched to the age group.
2. Roles: groups of three to five with roles (researcher, scriptwriter, host or interviewer, producer or editor, fact-checker) that rotate between episodes or lessons, plus adaptations for students who are anxious about speaking or have additional needs (narration by others, sound design, a written role).
3. Lesson plan: a lesson-by-lesson table fitting the stated number and length of lessons: hook with an example clip, research, scripting, rehearsal, recording, editing, listening party and reflection. Keep recording time realistic: each group needs a quiet slot.
4. Templates: a short script template (hook, three points, interview or evidence, ending) written for the ear, and an interview template with consent question, open questions and follow-ups.
5. Recording setup with free or school-owned tools: phones or tablets, a quiet corner or a cupboard with coats for echo, headphones, file naming and storage on school systems. Describe tool types; mention a specific tool only if widely available and free, and say to check the school's approved list.
6. Safeguarding and consent for {{publish}}: parental or guardian consent for recording and for publishing voices (always for public), first names only or none, no faces, school names, locations or personal details in public episodes, music only if royalty-free or created by students, how to handle a student who discloses something personal during recording (stop, follow the school's safeguarding procedure), and where files are stored and when deleted. Say to follow the school's own policy and data protection rules for the country.
7. Rubric: a four-level table grading content (accuracy, use of evidence, understanding) and process (collaboration, speaking clarity, editing, reflection), with student-friendly descriptors.
</task>

<constraints>
- Fit the plan to the lessons, devices and age given. If lessons, age or devices are missing, ask for them and mark [X].
- Do not state legal requirements as fact; refer to the school's safeguarding lead and data protection policy.
- No student surnames, photos or identifying details in anything public.
- Keep assessment fair to quieter students: speaking is one criterion, not the whole grade.
</constraints>

<output_format>
## Learning goals
## Roles
Table: Role | What they do | Rotation.
## Lesson plan
Table: Lesson | Focus | Activities | Output.
## Templates
The script and interview templates.
## Recording setup
Bullets.
## Safeguarding and consent
Checklist, then a short consent note to parents.
## Rubric
Table: Criterion | Beginning | Developing | Secure | Excellent.
</output_format>
