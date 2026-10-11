---
schema: 1
id: plan-online-dating-approach
kind: prompt
title: Plan your online dating approach
description: Builds a sustainable online dating plan with which apps suit your goal, a weekly time limit, how to screen matches, when to move to a date, safety habits and how to avoid burnout.
category: relationships
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [text, preferences]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [online-dating, dating-apps, dating-burnout, dating-safety, time-limits]
pairs_with:
  prompts: [write-dating-profile, write-dating-app-openers, plan-first-date, assess-early-dating-warning-signs]
  personas: [relationship-coach]
args:
  - name: situation
    description: Where you are and what has happened so far, for example "41, divorced last year, two kids half the week, tried one app for a month and felt like a second job".
    type: text
    required: true
  - name: goal
    description: What you are looking for, for example "a long-term partner", "casual for now", "not sure yet".
    type: string
    required: true
  - name: time_available
    description: Realistic time per week you can give it. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Your goal in one line, Where to look, Weekly routine, Screening matches, From chat to date, Safety habits, Avoiding burnout]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people approach online dating in a way that fits their life and goal. People who burn out usually swipe without limits, chat for weeks without meeting, take every unmatch personally and treat apps as the only route. What tends to work: being clear about what you want and saying so in your profile, choosing an app whose users share that goal, a fixed small time window, moving to a short call or meeting after a few good exchanges, simple safety habits, and regular breaks. Apps, their features and their user bases change often and vary by country and age group.

<situation>
{{situation}}
</situation>
Goal: {{goal}}
{{#time_available}}Time per week: {{time_available}}{{/time_available}}
</context>

<task>
1. Your goal in one line: restate the goal plainly, plus two or three must-haves and dealbreakers to filter by, drawn from the situation.
2. Where to look: describe the kinds of apps or services to consider (goal-focused, broad swipe-based, niche or interest-based, in-person events and friends of friends) and which fit this goal. Do not claim current features or user numbers; tell them to check what is popular for their age and area.
3. Weekly routine: a time-boxed plan (when, how long, how many active chats at once), fitted to their time and caring duties.
4. Screening matches: what to look for in profiles and early chat that fits the must-haves, and three or four questions that reveal intent without feeling like an interview.
5. From chat to date: when to suggest a call or meeting, a sample line, and how to handle people who keep chatting but never commit.
6. Safety habits: a separate number or app chat until trust is built, a quick check that the person is real, first meetings in public with your own transport, telling a friend, and never sending money or intimate images to someone you have not met.
7. Avoiding burnout: signs to pause, a break rule, how not to take ghosting personally, and one or two offline ways to meet people alongside the apps.
</task>

<constraints>
- No assumptions about gender, orientation or relationship structure; respect the stated goal, including casual.
- Do not name app features, prices or statistics as facts; they change and differ by country.
- If they mention parenting, protect the children: no introductions or sharing kids' photos and details early.
- Keep it practical and kind; no manipulative tactics or "rules" games.
- If the situation shows a match asking for money, gift cards, crypto or intimate images, or other romance scam signs, deal with that first: say kindly that it fits a common scam pattern, advise not sending anything, and point to reporting and support.
- If the situation shows they are still raw from a breakup or bereavement and dreading this, say it is fine to wait, without diagnosing.
</constraints>

<output_format>
## Your goal in one line
## Where to look
## Weekly routine
Table: Day | Time | What to do.
## Screening matches
## From chat to date
## Safety habits
Checklist.
## Avoiding burnout
</output_format>
