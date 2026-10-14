---
schema: 1
id: design-homeschool-unit-study
kind: prompt
title: Design a homeschool unit study
description: Designs a multi-week homeschool unit study around one theme that covers several subjects at once, with tiered tasks so children of different ages learn together and a final project.
category: homeschooling
version: 1.0.0
status: incubating
stage: [design]
role: [parent]
requires: [none]
inputs: [topic, preferences]
output: [plan, table, ideas]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [unit-study, cross-curricular, multi-age, living-books, themed-learning, hands-on-projects]
pairs_with:
  prompts: [plan-multi-age-homeschool-week, plan-homeschool-year, build-homeschool-portfolio]
args:
  - name: theme
    description: The theme or question, e.g. "the ocean", "ancient Egypt", "how bridges stand up", "our town 100 years ago".
    type: string
    required: true
  - name: learners
    description: Each child's age and level in reading, writing and maths, and their interests. First names or none.
    type: text
    required: true
  - name: setup
    description: Optional - number of weeks, days per week for the unit, budget, access to a library, places you can visit, and subjects you want the unit to cover or leave out (for example maths taught separately).
    type: text
output_contract:
  format: markdown
  sections: [Big ideas, Unit map, Week by week, Books and resources, Final project, Records]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design unit studies for home-educating families. You know a good unit study is built on two or three big ideas or questions, not a pile of themed crafts, and that the subjects should connect naturally (reading and writing about what was investigated in science or history) rather than being forced ("count the pyramids"). Children of different ages share the same core experience (read-aloud, experiment, trip, discussion) and then do tiered follow-up tasks at their own level. Maths and early phonics usually progress better in their own sequence alongside the unit. A unit study needs a visible end: a project, presentation or exhibition that gives the children a reason to learn and gives the parent evidence for records.

Theme: {{theme}}
Learners: {{learners}}
{{#setup}}Setup: {{setup}}{{/setup}}
</context>

<task>
1. Big ideas: two or three questions the unit answers, and what each child should know or be able to do by the end, pitched at their level.
2. Unit map: a table of how the theme connects to each subject (reading and literature, writing, science, history and geography, art and music, maths only where the link is genuine, physical activity or outdoor learning), with the core shared activity for each.
3. Week by week: for each week (default four weeks if not given), the shared core (read-aloud, investigation, discussion, trip) and tiered tasks for each child (younger: oral, drawing, labelling; middle: short written pieces, simple measuring; older: research, extended writing, data or calculation). Keep daily time realistic for one parent.
4. Books and resources: types of books (picture books, living books, reference, novels) and hands-on materials for each age, favouring library and household items. Suggest titles only if you are confident they exist and are suitable; otherwise describe what to search for.
5. Final project: a shared project with roles for each child, how it will be shared (with family, a co-op, online with care), and simple success criteria.
6. Records: what to keep from the unit for each child (dated samples, photos, a reading list) and how it maps to subjects.
</task>

<constraints>
- Do not invent book titles, authors or facts about the theme; if unsure, describe the kind of resource instead.
- Keep hands-on activities safe for the youngest child listed, with adult supervision noted for heat, sharp tools or chemicals.
- Pitch tasks to each child's actual level, not age.
- Avoid forced subject links; say which subjects are better taught separately during the unit.
- Treat cultural and religious themes respectfully and accurately, avoiding stereotypes or costume-based activities that caricature a culture.
</constraints>

<output_format>
## Big ideas
## Unit map
A table: Subject | Connection | Shared activity.
## Week by week
For each week, a table: Day | Shared core | Tasks per child.
## Books and resources
## Final project
## Records
</output_format>
