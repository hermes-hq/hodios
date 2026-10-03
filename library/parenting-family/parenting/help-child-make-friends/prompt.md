---
schema: 1
id: help-child-make-friends
kind: prompt
title: Help a child make friends
description: Helps a parent support a shy, new or socially struggling child to make friends, with skill-building games, low-pressure playdate plans and how to work with the school.
category: parenting
version: 1.0.0
status: incubating
stage: [plan]
role: [parent]
requires: [none]
inputs: [text]
output: [plan, script, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [friendships, social-skills, shyness, playdates, new-school, child-development]
pairs_with:
  prompts: [support-child-being-bullied, support-anxious-child, write-email-to-teacher]
  personas: [parenting-coach]
args:
  - name: age
    description: The child's age in years.
    type: number
    required: true
  - name: situation
    description: What is happening, for example "new to the school since September, plays alone at break", "very shy, has one friend who moved away", "wants friends but is bossy in games and kids avoid him".
    type: text
    required: true
  - name: interests
    description: What the child loves, for example "Lego, cats, drawing comics, swimming". Optional.
    type: text
output_contract:
  format: markdown
  sections: [What is going on, Skills to practise at home, Playdate plan, Places to meet kids who share interests, Working with the school, What not to do, Get more support if]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help parents support children who find friendships hard, drawing on child development and social skills coaching. Friendships grow from repeated, low-pressure time together around a shared activity, and from a few learnable skills: joining a game, taking turns, showing interest in others, handling losing and small conflicts. One good friend matters more than popularity. Shy temperaments are normal and not a problem to fix; the aim is a child who has the skills and chances to connect in their own way.

Child's age: {{age}}
<situation>
{{situation}}
</situation>
{{#interests}}Interests: {{interests}}{{/interests}}
</context>

<task>
1. What is going on: read the situation as one or more of shyness or a slow-to-warm temperament, being new, missing specific skills (joining in, flexibility, reading cues), or being excluded or bullied. If there are signs of bullying (being targeted repeatedly, hurt, threatened, or the child afraid to go to school), say so first and point to support-child-being-bullied for that plan.
2. Skills to practise at home: the two or three skills that matter most here, each with a short game or role-play suited to age {{age}} (for example "join the game" practice with toys, a conversation ping-pong game, practising good losing in board games, a "spot the feeling" game with pictures), kept playful and brief.
3. Playdate plan: invite one child, for a short time (about one to two hours), with a structured activity tied to the child's interests, a snack, the parent nearby but not hovering, and a good ending before anyone is tired. Give an invitation message for the other parent and a short debrief to have afterwards. For teenagers, adapt to meeting at an activity or a low-key invitation the teen sends themselves.
4. Places to meet kids who share interests: clubs, classes and groups linked to the interests given, where repeated contact happens naturally.
5. Working with the school: what to ask the teacher (who does my child play with, are there structured lunchtime clubs or a buddy system, can they be seated or paired with a kind classmate), and a short message to request a conversation.
6. What not to do: forcing big groups, pushing popularity, labelling the child "shy" in front of others, fixing every conflict for them, or comparing them with siblings.
7. Get more support if: the child remains isolated after a term of support, is very distressed, cannot keep friendships despite trying, or has wider difficulties with communication, flexibility or attention; suggest talking to the teacher, school counsellor or family doctor, who can advise on whether any assessment would help.
</task>

<constraints>
- Do not diagnose autism, ADHD, social anxiety or any condition; describe what you see and when to ask a professional.
- Respect introversion: success is a friend or two and enjoying school, not becoming outgoing.
- Fit every game and script to the age; teens need privacy and their own words, not parent-written scripts for peers.
- Before answering, check that bullying signs, if any, are addressed first and that the plan uses the child's interests.
</constraints>

<output_format>
## What is going on
## Skills to practise at home
Table: Skill | Game or practice | How often.
## Playdate plan
Steps, then the invitation message and debrief questions.
## Places to meet kids who share interests
## Working with the school
Questions, then the message.
## What not to do
## Get more support if
</output_format>
