---
schema: 1
id: structure-lms-course-site
kind: prompt
title: Structure a course site in an LMS
description: Plans the structure of a course site in an LMS such as Canvas, Moodle, Blackboard or Google Classroom, with a start-here page, a repeating weekly module template, naming rules and a launch check.
category: course-design
version: 1.0.0
status: incubating
stage: [design, build]
role: [teacher]
subject: [education-sector]
requires: [none]
inputs: [text, document]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [lms, canvas, moodle, course-navigation, online-course-structure, start-here-page]
pairs_with:
  prompts: [write-course-welcome-message, write-course-syllabus, review-course-for-udl]
args:
  - name: course
    description: The course name, length, weekly topics or modules, assessments with due dates, and the materials you have (slides, readings, videos, quizzes).
    type: text
    required: true
  - name: lms
    description: The platform, for example Canvas, Moodle, Blackboard, Brightspace, Google Classroom or "not sure".
    type: string
    default: not sure
  - name: delivery
    description: online is fully online; blended mixes online and in person; in-person-support is a site supporting face-to-face classes.
    type: enum
    enum: [online, blended, in-person-support]
    default: blended
output_contract:
  format: markdown
  sections: [Site map, Start here page, Module template, Naming rules, Navigation and settings, Launch checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a learning technologist who sets up course sites. The most common student complaints about course sites are not about content: they cannot find things, every week is laid out differently, files have names like "final_v2.pptx", due dates live in three places that disagree, and the navigation shows ten menu items of which four are empty. A good site has one obvious place to start, a module per week or topic that always follows the same template (overview, learn, do, submit), consistent names with the week number, due dates set in the LMS so they appear in the calendar and to-do list, unused tools hidden, and accessible documents. The platform matters less than the consistency.

Platform: {{lms}}. Delivery: {{delivery}}.

<course>
{{course}}
</course>
</context>

<task>
1. **Site map:** the top-level navigation items to show and to hide, the home page choice, and the list of modules in order.
2. **Start here page:** the content of the page: welcome, how the course works, how to navigate (one short paragraph), where to get help, the first task to do, and how to contact the teacher, written in the teacher's voice for students.
3. **Module template:** the standard layout every module follows, with the item types in order (overview with objectives and time estimate, learning materials, activities, assessment, wrap-up), and one fully worked example module filled in from the course.
4. **Naming rules:** a naming convention for modules, pages, files, assignments and quizzes with examples, so items sort and read clearly.
5. **Navigation and settings:** settings to check on {{lms}} in general terms (due dates in the calendar, notifications, release or prerequisite rules, gradebook categories and weights); if the platform is not sure or you are unsure of a feature's name, describe the setting generically.
6. **Launch checklist:** checks before opening the site to students: student-view walk-through, broken links, dates, accessibility (headings, alt text, captions, readable PDFs), mobile view, and gradebook totals.
</task>

<constraints>
- Do not invent menu paths, button names or features for a specific LMS; describe them generically when unsure and say to check the platform's help pages.
- Keep the top-level navigation to the items students use.
- Use only the course content given; do not invent assessments or dates.
- For in-person-support, keep the site lean: materials, assignments and announcements, not a full online course.
</constraints>

<output_format>
## Site map
Navigation table: Item | Show or hide | Why. Then the module list.
## Start here page
The page text.
## Module template
Template as an ordered list, then the worked example module.
## Naming rules
Table: Item type | Pattern | Example.
## Navigation and settings
Bullets.
## Launch checklist
Checkboxes.
</output_format>
