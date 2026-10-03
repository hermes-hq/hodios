---
schema: 1
id: write-self-introduction
kind: prompt
title: Write a self-introduction
description: Writes a short self-introduction for a new team, class, community or meeting round in 15-second, 60-second and written forms, built around one memorable detail.
category: interpersonal-communication
version: 1.0.0
status: incubating
stage: [build]
role: [individual, student, job-seeker, manager]
requires: [none]
inputs: [text]
output: [script, message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: small
level: beginner
tags: [introductions, icebreakers, first-day, networking, small-talk]
pairs_with:
  prompts: [write-professional-bio, practice-impromptu-speaking]
args:
  - name: about_you
    description: Your name, what you do or study, what brings you here, and a few true things about you outside work (hobbies, where you are from, an odd skill, something you are learning).
    type: text
    required: true
  - name: setting
    description: "Where you will introduce yourself, for example \"first day on a new marketing team\", \"evening pottery class\", \"open-source project Discord\" or \"round of intros at a 40-person conference workshop\"."
    type: string
    required: true
output_contract:
  format: markdown
  sections: [15 seconds, 60 seconds, Written, The memorable detail, Conversation hooks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Introductions go wrong in the same ways: a job title and nothing else, a CV recital, or a nervous joke. What people remember about a new person is one concrete, slightly unexpected detail and a sense of why they are here and what they are like to talk to. The setting decides what is relevant: a new team wants your role and how to work with you; a class wants why you joined; a community wants what you are interested in and can offer. A good introduction ends with an opening, something people can come up to you about later.
</context>

<task>
Write my self-introduction for: {{setting}}

<about_you>
{{about_you}}
</about_you>

1. If the details are missing what the setting needs most (for example a new team needs my role), ask for it in one question and stop.
2. Choose what is relevant for this setting and this audience, and leave out the rest.
3. Choose one memorable detail from my details: concrete, true, and easy to ask about. Prefer something people can relate to or follow up on over a boast.
4. Write three versions: 15 seconds spoken, 60 seconds spoken, and written (for a chat channel, forum or welcome thread).
5. Give three conversation hooks: things people could ask me about afterwards, and one question I could ask the group.
</task>

<constraints>
- Spoken versions: about 35 to 45 words for 15 seconds and 130 to 160 words for 60 seconds, written for the ear in short sentences, with my name early and again at the end of the 60-second version only if the room is large.
- Written version: 50 to 90 words, friendly, one or two line breaks, no hashtags, and an emoji only if the setting is casual.
- Use only facts I gave. Do not invent hobbies, achievements, numbers or jokes.
- Match the setting's register: a board meeting is not a pottery class.
- No humblebrags, no "I'm passionate about…", no list of more than three things.
- End each version with an opening: what I would love to talk about, learn or help with.
</constraints>

<output_format>
## 15 seconds
The words, then the word count in brackets.
## 60 seconds
The words, then the word count in brackets.
## Written
The post or message.
## The memorable detail
One line on which detail you chose and why it works here.
## Conversation hooks
Three bullets.
</output_format>
