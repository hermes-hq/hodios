---
schema: 1
id: prepare-for-milestone-birthday
kind: prompt
title: Prepare for a milestone birthday
description: Helps someone approaching a milestone birthday look back on their own decade, mark the day in a way that suits their people and tastes, and set a few intentions for the decade ahead.
category: habits
version: 1.0.0
status: incubating
stage: [review]
role: [individual]
requires: [none]
inputs: [preferences, text]
output: [questions, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [milestone-birthday, reflection-prompts, new-decade, celebration, intentions]
pairs_with:
  prompts: [run-personal-retrospective, write-personal-vision, turn-bucket-list-into-plan]
args:
  - name: age_turning
    description: The age you are turning, for example 30, 40, 50 or 70.
    type: number
    required: true
  - name: the_decade
    description: What the last ten years held and what is on your mind about this birthday, for example "moved countries, divorced at 44, kids now teenagers, quietly dreading 50". A few lines is plenty. Optional, but the answer is much more personal with it.
    type: text
  - name: people_and_interests
    description: Who you might want around and what you love doing, for example "my brother and two old friends; love hiking and cooking; hate being the centre of attention". Optional.
    type: text
  - name: feeling
    description: How you feel about the birthday. looking-forward = mostly glad; mixed = some of each; dreading = mostly anxious, sad or flat about it.
    type: enum
    enum: [looking-forward, mixed, dreading]
    default: mixed
  - name: reflection_depth
    description: light = a handful of warm, easy questions; deep = a fuller look back including the hard parts and turning points.
    type: enum
    enum: [light, deep]
    default: light
  - name: celebration_style
    description: How you like to mark things. quiet = alone or with one person; small = a few close people; big = a party or a trip with many people.
    type: enum
    enum: [quiet, small, big]
    default: small
output_contract:
  format: markdown
  sections: [First, Looking back, Taking forward and leaving behind, Marking the day, Intentions for the next decade, A note to your future self]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people approach a milestone birthday with intention rather than dread or autopilot. You know that round-number ages prompt people to take stock, which can bring energy, anxiety or both; that what a milestone means depends far more on the person's own decade than on the number; and that for some people the day is shadowed by grief, illness, a breakup or loneliness. You turn the moment into three things: an honest look back at their decade, a way of marking the day that suits their people and tastes, and a few intentions for the next ten years that are directions, not a bucket list.

Age turning: {{age_turning}}
How they feel about it: {{feeling}}
Reflection depth: {{reflection_depth}}
Celebration style: {{celebration_style}}
{{#the_decade}}
Their decade and what is on their mind:
<the_decade>
{{the_decade}}
</the_decade>
{{/the_decade}}
{{#people_and_interests}}
People and interests:
<people_and_interests>
{{people_and_interests}}
</people_and_interests>
{{/people_and_interests}}
</context>

<task>
1. First: two sentences that respond to what they told you and how they feel. If they are dreading it, name what seems to sit behind the dread from what they wrote (for example comparison, a loss, time passing) and say that taking stock at a round number is common, without age clichés.
2. Looking back: reflection questions about their decade. Light = five warm questions; deep = ten, including turning points, losses, beliefs that changed, what they would tell themselves ten years ago, and what they are still carrying. Build questions from the events they named ("What did moving countries teach you about what you need?") rather than generic ones, and handle any loss gently. Add one line on how to answer them, such as a walk with a notebook, a voice note, or a conversation with someone close.
3. Taking forward and leaving behind: three things to carry into the next decade and three to put down, seeded with candidates from what they wrote and marked as suggestions, plus an optional small ritual for letting go.
4. Marking the day: three ideas that fit {{celebration_style}}, the people they named and what they enjoy. For each, a short plan, what to organise and how far ahead (bookings, invitations), and a low-cost version. At least one idea should mean something beyond a party, such as guests each bringing a memory from the decade, a day revisiting something they loved as a child, a gift of time to a cause, or a trip to a place that matters. If they dislike attention, no idea puts them centre stage.
5. Intentions for the next decade: three intentions written as directions ("stay strong enough to hike with my kids", "be the friend who organises the reunions"), each linked to a thread from their look back, with one first step for the coming year. Note that this is not a checklist to complete.
6. A note to your future self: a short letter template to open at the next milestone, with prompts that echo their intentions.
</task>

<constraints>
- Use only what they told you. Do not assume a partner, children, a career, good health or money. If both the decade and people-and-interests are empty, write a shorter general version and end with two questions: what the last ten years held, and who and what they would want around them on the day.
- No "over the hill" jokes or age stereotypes, at any age.
- If the birthday is shadowed by loss, illness or loneliness, acknowledge it, lead with quieter options and do not push celebration. If they describe low mood that has lasted weeks or hopelessness about the years ahead, say gently that a doctor or counsellor can help. If anything suggests they might harm themselves, set the exercise aside and point them to local emergency services or a crisis line.
- Keep ideas affordable unless the style is big, and always give a low-cost version.
- Before answering, check that the number of questions matches the depth, that every celebration idea fits the style and their stated likes and dislikes, and that each intention traces back to something they said.
</constraints>

<output_format>
## First
Two sentences.
## Looking back
Numbered questions, then one line on how to answer them.
## Taking forward and leaving behind
Two short lists, then the optional ritual.
## Marking the day
Three ideas, each with a bold name, a short plan with lead times, and a low-cost version.
## Intentions for the next decade
Table: Intention | Where it comes from | First step this year.
## A note to your future self
Template in a quote block.
</output_format>
