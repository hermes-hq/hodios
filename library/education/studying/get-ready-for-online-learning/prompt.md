---
schema: 1
id: get-ready-for-online-learning
kind: prompt
title: Get ready for online learning
description: Prepares an adult new to online learning for the first weeks with a tech checklist, a tour of the learning platform, a weekly routine, forum and video-call etiquette and how to ask for help.
category: studying
version: 1.0.0
status: incubating
stage: [plan, learn]
role: [individual, student]
requires: [none]
inputs: [text, preferences]
output: [checklist, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [digital-skills, adult-learners, virtual-classroom, returning-learners]
pairs_with:
  prompts: [finish-online-course, prepare-for-university-start]
args:
  - name: course_or_platform
    description: The course and, if you know it, the learning platform or video-call tool it uses, plus start date and how it is taught (live sessions, recorded videos, forum, assignments).
    type: string
    required: true
  - name: confidence
    description: How confident you feel with computers and online tools.
    type: enum
    enum: [low, some, good]
    default: low
  - name: device
    description: Optional. The device you will use (laptop, tablet, phone, shared family computer) and your internet at home.
    type: string
output_contract:
  format: markdown
  sections: [Before day one, Your first half hour on the platform, Weekly routine, Discussions and live calls, Getting help, Words you will meet, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An adult is starting an online course, maybe years after their last classroom: {{course_or_platform}}. Confidence with technology (low, some or good): {{confidence}}.{{#device}} Device and connection: {{device}}.{{/device}} New online learners rarely struggle with the content first; they struggle with logging in, finding where things are, missing announcements, not knowing whether a forum post is "allowed", feeling exposed on camera, and not knowing who to ask, so small problems build up until they quietly drop out. A good start means testing the tech before day one, a short guided tour of the platform, a fixed weekly routine, simple etiquette, and knowing exactly who to ask for what.
</context>

<task>
1. Before day one: a checklist for the device (charged, updated, browser up to date), internet (test a video call; what to do if it is slow), sound (headphones with a microphone), camera, the login details stored safely, two-step sign-in set up if asked, and a quiet place. Adjust for the device: a phone or tablet may need the platform's app and may show fewer menus.
2. First half hour on the platform: what to look for and click through, described in general terms because every platform differs: announcements or news, the course outline or modules, the calendar or deadlines, where to submit work, where grades and feedback appear, the discussion forum, notification settings (turn on email notifications for announcements), and the help or support link. Suggest writing down where each one is.
3. Weekly routine: two or three fixed study slots, checking announcements at least twice a week, a set day to look at upcoming deadlines, and a short note of questions for the tutor.
4. Discussions and live calls: forum posts with a clear subject line, replying in the thread, being kind and brief, it is fine to ask "basic" questions; for live calls, join five minutes early, mute when not speaking, use the chat or raise-hand button, camera on or off as the course allows, and what to do if the connection drops.
5. Getting help: who to contact for what (tech problems: platform or IT help desk; course content: tutor or forum; deadlines, money or personal issues: course administrator or student support), and a short help-request template that says what you tried and what you see.
6. Words you will meet: a short glossary of common terms (log in, browser, upload, download, module, forum, thread, asynchronous, synchronous, breakout room, submission, plagiarism checker), each in plain words.
7. Pitch it to the confidence level: for "low", short steps, one action per line, reassurance that mistakes can be undone; for "some", short steps with the reasons left out; for "good", a compact checklist that skips basics and covers only what is specific to online courses.
</task>

<constraints>
- Do not invent menu names, buttons or settings for a specific platform unless you are sure of them; describe what to look for and say names vary.
- Never ask the learner to share passwords; tell them to keep login details private.
- Plain, warm, respectful language; no jargon without explanation; never condescending about age or skills.
- If the course or platform is unknown, give the general version and ask which one it is.
- If the learner mentions a disability or access need, mention the platform's accessibility settings and asking the course provider about support.
</constraints>

<output_format>
## Before day one
A checklist with tick boxes.

## Your first half hour on the platform
Numbered steps, each with "Write down where it is:" and a blank.

## Weekly routine
A simple table: Day | What to do | Minutes.

## Discussions and live calls
Two short bullet lists: Forums, Live calls.

## Getting help
Table: Problem | Who to ask | How. Then the help-request template.

## Words you will meet
Table: Word | What it means.

## Questions
Anything to confirm, such as the platform name or start date.
</output_format>
