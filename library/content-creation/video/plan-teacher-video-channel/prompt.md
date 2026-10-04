---
schema: 1
id: plan-teacher-video-channel
kind: prompt
title: Plan a teacher's video channel
description: Plans an educational video channel for a teacher, tutor or lecturer, with audience, short lesson formats, a term-time routine, privacy and policy checks and a first ten videos.
category: video
version: 1.0.0
status: incubating
stage: [plan]
role: [teacher, content-creator]
subject: [education-sector]
requires: [none]
inputs: [text, preferences]
output: [plan, checklist, ideas]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [lesson-videos, student-privacy, school-policy, recording-routine, channel-planning]
pairs_with:
  prompts: [write-tutorial-video-script, plan-video-series, package-video-title-thumbnail]
  personas: [youtube-strategist]
args:
  - name: subject_and_level
    description: What you teach and to whom (for example "GCSE chemistry", "adult beginner Spanish", "first-year statistics"), your role, and why you want a channel. Rough notes are fine.
    type: text
    required: true
  - name: audience
    description: Who the videos are for - your own students, the public, or both.
    type: enum
    enum: [own-students, public, both]
    default: public
  - name: hours_per_week
    description: Hours you can honestly give the channel in a normal term week, including editing.
    type: number
    default: 3
  - name: employer_context
    description: Optional. Where you work (state school, university, private tutoring, freelance) and the country, so the policy checks fit.
    type: string
output_contract:
  format: markdown
  sections: [Channel purpose, Policy and privacy checks, Formats, Recording routine, Comments and community, First ten videos, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a teacher plan a video channel that supports their teaching without swallowing their evenings or breaking school rules. Teacher channels fail in predictable ways: they try to serve their own class and the whole internet at once, so videos fit neither; they start with long polished lessons and stop at the first marking season; they film students or classroom displays without permission; and nobody checks the employer's social media, intellectual property and conduct policies until something goes wrong. Short, single-concept videos that a student can find the night before a test tend to outlast ambitious series.

Audience: {{audience}}. Time available: about {{hours_per_week}} hours a week.
{{#employer_context}}Employer and country: {{employer_context}}{{/employer_context}}
</context>

<task>
<subject_and_level>
{{subject_and_level}}
</subject_and_level>

1. Purpose: one sentence naming the viewer, the problem the videos solve and when they watch (homework, revision, flipped lesson, catch-up after absence). For own-students, plan unlisted or school-platform videos tied to the scheme of work; for public, pick a searchable niche (exam board, topic, level); for both, say which comes first and how the two stay separate.
2. Policy and privacy: list what to check before filming, as yes or no questions to put to the head of department, data protection lead or contract: employer social media and personal-brand rules, who owns materials made on school time or equipment, whether paid monetisation or sponsorship is allowed, use of exam board past papers and textbook images (copyright), and safeguarding rules on contact with students online.
3. Student privacy by default: no student faces, voices, names, work, uniforms or classroom displays without written consent through the school's own process; film hands, whiteboard, screen or the teacher only.
4. Formats: two or three repeatable formats (for example a 3-6 minute worked example, a 60-second misconception fix, a 10-minute exam-question walkthrough), each with structure, length and equipment.
5. Routine: fit the hours. Batch-record in a fixed slot, reuse lesson materials, plan lighter output for report and exam weeks and a pause in holidays if needed. Show a sample week and a term rhythm.
6. Comments: recommend settings by audience (comments off or held for review where students are minors, no private messaging with students, a pinned line pointing questions to class channels).
7. First ten videos: ordered by student need and search demand you can judge from experience, each with a working title, format and the misconception or exam skill it targets.
</task>

<constraints>
- Do not state school, district, exam board or national rules as fact; list them as checks with who to ask. Name the country assumption if you make one.
- Never suggest featuring students, including "blurred", without the school's written consent process.
- Keep the plan inside the stated hours; if the user's ambition exceeds them, say what to cut.
- Do not invent search volumes or subscriber forecasts.
- Ask for the subject and level if they are missing and stop.
</constraints>

<output_format>
## Channel purpose
One-sentence purpose, the audience decision and where videos live (public, unlisted, school platform).

## Policy and privacy checks
Table: check | why it matters | who to ask | answer (blank).

## Formats
Each format: name, length, structure in 3-5 beats, kit.

## Recording routine
Sample week (table: day | task | minutes) and a term rhythm in bullets.

## Comments and community
Settings and three house rules.

## First ten videos
Numbered: working title, format, the misconception or skill.

## Questions
What you still need to know from the teacher.
</output_format>
