---
schema: 1
id: build-about-me-slides
kind: prompt
title: Build "about me" slides
description: Builds a short "about me" slide set for a new job, class, team or course, with a few memorable facts, how you like to work, and a conversation starter, sized to the time you have.
category: presentations
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, student, job-seeker]
requires: [none]
inputs: [preferences, notes]
output: [outline, script]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: small
reasoning: optional
level: beginner
tags: [self-introduction, new-job, icebreaker, first-week, personal-story]
pairs_with:
  prompts: [write-self-introduction, write-speaker-notes, outline-presentation]
args:
  - name: about_you
    description: Facts about you that you are happy to share, such as role, background, hobbies, places, something people would not guess, and how you like to work.
    type: text
    required: true
  - name: setting
    description: Where you will present it and to whom, for example "first team meeting at a new job, 8 people" or "first seminar of a master's course".
    type: text
    required: true
  - name: limits
    description: Slide count or time limit and any required content from the brief, for example "3 slides, 2 minutes, must include a fun fact".
    type: string
    default: 3 slides, about 2 minutes
output_contract:
  format: markdown
  sections: [Slide plan, What to say, Images to find, Things to leave out]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help someone introduce themselves with a few slides. People overload these: a CV in bullet points, ten hobbies, a slide per year of life, and they run over time while the audience remembers nothing. What works is less: one clear line about who you are in this context, two or three specific details people can remember and ask about (a concrete story beats an adjective), something about how you like to work or learn so colleagues know how to work with you, and an easy hook that invites a conversation afterwards. Photos do more than text. The tone should match the setting: lighter for a class, more focused on work style for a new team. Nobody should feel they have to share private details to fit in.

About the person: {{about_you}}
Setting: {{setting}}
Limits: {{limits}}
</context>

<task>
1. Pick from the facts given the one-line introduction for this setting and the two or three most specific, memorable details. Prefer concrete ("I have walked the length of my country's coastline") over general ("I like travelling").
2. Plan the slides within {{limits}}: usually who I am and what I do here, a few things about me with photos, and how I work or what I am looking forward to plus a conversation starter. Use very few words on screen.
3. Write what to say for each slide, in a natural speaking voice, timed to fit. Include an opening line and a closing line that hands back to the room.
4. Suggest the image for each slide from what the person described, such as their own photo of a place or a pet, so nothing needs to be invented.
5. If the brief requires specific content (a fun fact, goals for the course), make sure it is covered.
6. List what to leave out: anything too personal for the setting, in-jokes, long lists.
</task>

<constraints>
- Use only facts the person gave. Do not invent hobbies, achievements, stories or fun facts. If there is not enough material, ask one or two questions and give a draft with placeholders.
- Never push the person to share health, family, religion, politics or other private details; use them only if they included them and they suit the setting.
- Keep within the time and slide limit; state the estimated speaking time.
- Plain, warm, unboastful language.
</constraints>

<output_format>
## Slide plan
Table: # | Slide title | On screen (few words) | Image.

## What to say
Per slide, the spoken words, with total estimated time.

## Images to find
Bullets.

## Things to leave out
Bullets with a short reason.
</output_format>
