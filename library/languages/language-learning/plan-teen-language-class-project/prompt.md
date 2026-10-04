---
schema: 1
id: plan-teen-language-class-project
kind: prompt
title: Plan a project for a teen language class
description: Plans a 2-4 week project for teenage language learners, such as a podcast, survey or video guide, with a real audience, staged language input, group roles, milestones, a rubric and support.
category: language-learning
version: 1.0.0
status: incubating
stage: [plan]
role: [teacher]
requires: [none]
inputs: [topic, notes]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [project-work, secondary-school, teenagers, group-roles, real-audience, learner-support]
pairs_with:
  prompts: [design-pbl-project, write-speaking-assessment-rubric]
args:
  - name: target_language
    description: The language being taught.
    type: string
    required: true
  - name: class_details
    description: The class - ages, size, lessons per week and length, topic or syllabus link, interests, and any equipment limits.
    type: text
    default: not given
  - name: level
    description: The class's CEFR level.
    type: enum
    enum: [A1, A2, B1, B2, C1, C2]
    default: A2
  - name: weeks
    description: How many weeks the project runs.
    type: string
    default: "3"
output_contract:
  format: markdown
  sections: [Project brief, Language map, Week-by-week plan, Group roles, Assessment rubric, Support and stretch, Practicalities]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a secondary school teacher plan a {{weeks}}-week project for a {{target_language}} class at CEFR {{level}}. Projects motivate teenagers when there is a real audience and some choice, but language projects often go wrong in predictable ways: groups work in the school language and translate at the end; one confident student does everything; the language needed is never taught, so the product is copied or machine-translated; and the final product is assessed on looks rather than language.

<class>
{{class_details}}
</class>
</context>

<task>
1. Offer three project options suited to teenagers at {{level}} (for example a podcast episode for students in a partner school, a survey of the school with an infographic, a video guide to the town for exchange visitors, a menu and ordering video for a class café), then develop the one that best fits the class details given, or the first if there are none. State the real audience and how they will see or hear the product.
2. Language map: the functions, grammar and vocabulary the product needs, split into "already known" and "to teach", and when each is taught. Keep new grammar to one or two points.
3. Week-by-week plan with milestones: launch (model product, success criteria, groups), language input lessons, drafting with checkpoints, peer feedback, rehearsal or editing, presentation to the audience, reflection. For each lesson give the aim, activities and what each group hands in.
4. Group roles for groups of 3-4 that make everyone use the language (for example researcher, scriptwriter, presenter, editor), with role cards and a rule that every member speaks or writes a set amount in the final product. Rotate or share roles so no one only does design.
5. Assessment rubric with 4 criteria and 4 bands: language accuracy and range for {{level}}, communication to the audience, individual contribution, and process (drafts, feedback used). Design and technology count for little or nothing. Include a self and peer contribution form.
6. Support and stretch: sentence frames, word banks and model scripts for weaker students; extra challenge for strong ones (interviewing a real speaker, a longer piece, subtitles); how to group students.
7. Practicalities: rules for using translation tools and AI (allowed for checking a word, not for writing the script; drafts done in class), recording and privacy (consent before filming, no faces or names online without permission, school policy on sharing), and equipment that works with phones only.
</task>

<constraints>
- Keep the timeline realistic for the lessons given; say what to cut if time is short.
- Products must be safe and appropriate: no filming strangers without consent, no sharing personal data, follow the school's safeguarding and media policies.
- Do not invent the school's policies or a partner school; mark these as things to check or arrange.
- If lessons per week or lesson length are missing, assume 3 lessons of 50 minutes and say so.
</constraints>

<output_format>
## Project brief
Three options, then the chosen project, audience and product.
## Language map
Table: Language | Known or to teach | Week taught.
## Week-by-week plan
### Week N with lessons, aims, activities and hand-ins.
## Group roles
Role cards.
## Assessment rubric
Table, then the contribution form.
## Support and stretch
## Practicalities
</output_format>
