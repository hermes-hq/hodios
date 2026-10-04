---
schema: 1
id: write-volunteer-call-posts
kind: prompt
title: Write volunteer call posts
description: Writes social posts recruiting volunteers for one specific role, with the real tasks, time asked, support given and a one-step way to say yes, plus platform variants and a reminder.
category: social-media
version: 1.0.0
status: incubating
stage: [build]
role: [content-creator, marketer, individual]
subject: [nonprofit]
requires: [none]
inputs: [text]
output: [post, copy]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [volunteer-recruitment, call-to-action, community-groups, inclusive-language]
pairs_with:
  prompts: [plan-nonprofit-social-media, write-short-social-posts]
args:
  - name: role
    description: The volunteer role - what the person will do, when, where, how many hours, how long the commitment, any checks or skills needed, training and support, and how to sign up. Rough notes are fine.
    type: text
    required: true
  - name: organisation
    description: Name of the group and what it does in a few words (for example "Riverside Food Bank, a volunteer-run food bank in the town centre").
    type: string
    required: true
  - name: platforms
    description: Where the posts will go (for example "Facebook group, Instagram, WhatsApp community, Nextdoor").
    type: string
    default: Facebook and Instagram
output_contract:
  format: markdown
  sections: [Main post, Platform variants, Reminder post, Before you post]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A nonprofit, club, school or community group needs people to say yes to a specific volunteer role. "We need volunteers! Get in touch" fails because nobody can picture the job or judge whether it fits their life. Calls that work answer the questions a hesitant person has: what will I actually do, how much time, will I be on my own, do I need experience, can I do it if I have a disability or little English, and what is the one thing I do now to say yes. They also speak to people who have never volunteered, not just the regulars.

Organisation: {{organisation}}
Platforms: {{platforms}}
</context>

<task>
<role>
{{role}}
</role>

1. Pull out the facts: the tasks, the time (hours per shift, how often, for how long), place, who it suits, requirements (background checks, age, driving licence), training and support, and the sign-up step.
2. Write the main post in this order: a concrete hook showing the difference the role makes (a moment, not a statistic you were not given); what you would do on a typical shift; the time asked; who it suits, including "no experience needed" only if true; support and training; access notes; one sign-up step with a deadline or start date if there is one.
3. Name the people who often assume volunteering is not for them when it fits the role (students, retirees, people new to the area, people building work experience) without stereotyping.
4. Write a variant for each platform: shorter and line-broken for Instagram with the link-in-bio or DM step; a forward-friendly version for WhatsApp; a neighbourly tone for local groups. Suggest one image idea that shows real volunteers at work (with their consent).
5. Write a reminder post for a few days later that adds something new (a quote from a current volunteer to be supplied, the spots left, a closing date).
6. List what to check before posting.
</task>

<constraints>
- Use only facts from the role notes. Mark anything missing that a volunteer needs to decide (shift times, location, how to sign up) as [X] and list it under Before you post.
- No guilt or pressure ("if you don't help, families go hungry"); motivate through the difference made and the experience offered.
- Do not promise benefits, references or training that are not in the notes.
- If the role involves children or vulnerable adults, mention the checks plainly and positively.
- Plain words, short sentences, readable for people with limited English; hashtags at the end, written in camel case (#VolunteerRiverside).
</constraints>

<output_format>
## Main post
Ready to paste, under 150 words.

## Platform variants
One subsection per platform, each ready to paste, plus the image idea.

## Reminder post
Under 80 words.

## Before you post
Checklist: missing facts [X], sign-up link working, consent for photos, who answers questions.
</output_format>
