---
schema: 1
id: write-course-welcome-message
kind: prompt
title: Write a course welcome message
description: Writes the welcome message and week-one announcements for an online or blended course, with expectations, first steps and how to get help. Use a few days before a course opens.
category: course-design
version: 1.0.0
status: incubating
stage: [build, ship]
role: [teacher, content-creator]
requires: [none]
inputs: [notes, preferences]
output: [message, copy]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [online-learning, course-announcements, instructor-presence, week-one, student-support]
pairs_with:
  prompts: [convert-course-to-online, write-course-syllabus, plan-paid-online-course]
args:
  - name: course
    description: Course name plus the key facts you have - start date, schedule, live session times, first deadline, assessment overview, office hours, contact rules.
    type: string
    required: true
  - name: instructor
    description: Optional instructor name and a line or two about you to personalise the welcome.
    type: string
  - name: platform
    description: Optional platform the course runs on, e.g. "Canvas", "Moodle", "a Circle community", so instructions name the right places.
    type: string
output_contract:
  format: markdown
  sections: [Welcome message, Week-one announcements, Placeholders to fill]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
In online courses the first week decides who stays. Students arrive anxious about where things are, what is expected and whether anyone will notice them. A good welcome message sounds like a person, not a policy document; tells students exactly what to do first and by when; sets expectations for time and communication; and makes asking for help feel normal. Short, well-timed announcements during week one keep momentum, remind people of the first deadline and nudge the ones who have not started, without nagging.
</context>

<task>
Write the welcome message and week-one announcements for **{{course}}**.
{{#instructor}}Instructor: {{instructor}}.{{/instructor}}
{{#platform}}Platform: {{platform}}.{{/platform}}

1. Use only the facts given. Wherever a needed fact is missing (dates, times, links, office hours, response times, the first deadline), insert a clear placeholder in square brackets, such as [first live session date and time, with time zone], and list all placeholders at the end. Do not invent dates or policies.
2. **Welcome message** (about 250 to 400 words):
   - a warm, specific opening that says what students will be able to do by the end;
   - who the instructor is, in two sentences, if given;
   - "Your first three steps": numbered, concrete actions with where to click or go and a due date (for example: read the start-here page, post an introduction answering one specific prompt, complete the short readiness check);
   - how the course runs each week, with the expected weekly hours;
   - how to get help: where to post questions, how fast the instructor replies, office hours, technical support, and accessibility or accommodation requests (invite students to reach out privately);
   - a short, human closing.
3. **Week-one announcements:** three short posts (under 120 words each): day 1 (it is open, start here), mid-week (reminder of the first deadline, a highlight from introductions, an invitation to ask questions), end of week (what is next, a note for anyone who has fallen behind with a simple way to catch up).
4. Write a short private message template for students who have not logged in by mid-week, kind and non-judgemental, offering help.
</task>

<constraints>
- Plain, friendly language at about a 9th-grade reading level; short paragraphs and lists that work on a phone.
- No jargon about the platform unless explained; no wall of rules. Link to the syllabus for policies rather than repeating them.
- Inclusive tone: acknowledge students may be working, caring for others or in different time zones; state time zones for every live event.
- Do not promise response times, extensions or accommodations the instructor has not confirmed; use placeholders.
</constraints>

<output_format>
## Welcome message
Subject line, then the message.
## Week-one announcements
### Day 1, ### Mid-week, ### End of week, each with a title and body. Then ### Not-yet-started message.
## Placeholders to fill
Bulleted list of every [placeholder] used.
</output_format>
