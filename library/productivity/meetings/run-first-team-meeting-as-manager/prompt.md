---
schema: 1
id: run-first-team-meeting-as-manager
kind: prompt
title: Run your first team meeting as a new manager
description: Plans a new manager's first meeting with their team - a short introduction, what stays the same for now, listening questions, how you like to work, and clear next steps - with the words to say.
category: meetings
version: 1.0.0
status: incubating
stage: [plan]
role: [manager, engineering-manager, operations-manager, individual]
requires: [none]
inputs: [text]
output: [plan, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [new-manager, first-90-days, team-trust, listening, introductions]
pairs_with:
  prompts: [plan-transition-to-manager, write-first-email-as-new-manager, write-team-charter]
args:
  - name: situation
    description: How you came to the role (promoted from within, hired from outside, taking over from someone who left or was moved), team size and what you know about the team's mood.
    type: text
    required: true
  - name: about_me
    description: A few facts about you and how you like to work that you are happy to share. Optional.
    type: text
  - name: constraints
    description: Anything you cannot talk about yet (reorganisation, budget, a departure) or changes already decided above you. Optional.
    type: text
  - name: minutes
    description: Meeting length in minutes.
    type: number
    default: 45
output_contract:
  format: markdown
  sections: [Goals for the meeting, Run sheet, What to say, Listening questions, Hard questions and answers, After the meeting]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help new managers run their first meeting with their team. The team is mostly asking itself three things: what kind of person is this, what is going to change, and is it safe to be honest with them. New managers commonly go wrong by arriving with a plan of changes before understanding the team, talking for most of the meeting, criticising the previous manager or the way things were done, making promises they cannot keep, or pretending to have answers about uncertain things. A good first meeting is short on presentation and long on listening: a human introduction, an honest statement of what will stay the same for now and when changes might come, how you like to work and how people can reach you, open questions that show you want to learn, and a clear next step such as one-to-ones with everyone. A manager promoted from within also has to acknowledge the changed relationship without making it awkward.

Situation: {{situation}}
{{#about_me}}About me: {{about_me}}{{/about_me}}
{{#constraints}}Constraints: {{constraints}}{{/constraints}}
Length: {{minutes}} minutes
</context>

<task>
1. Set two to four goals for the meeting suited to the situation (for example build first trust, reduce uncertainty, start listening, set up one-to-ones).
2. Build a run sheet that fits the length, with most of the time for the team to talk.
3. Write what the manager says, in natural spoken language: a short introduction, why they are here, what stays the same for now, a commitment to listen before changing things and roughly when they will share thoughts, how they like to work and be contacted, and the next steps. Adjust for promoted-from-within, external hire or taking over a struggling team.
4. Give five to eight listening questions (for example what is working that I should protect, what slows you down, what do you wish a manager would do, what should I know that is not written anywhere), and a way to collect answers from quieter people afterwards.
5. Prepare answers for hard questions the team may ask (are there going to be changes, what happened to the old manager, will there be layoffs, are you going to keep doing X), using honest phrasing for things the manager cannot share.
6. List what to do in the following week: notes sent back to the team, one-to-ones booked, quick wins only if clearly welcome.
</task>

<constraints>
- No criticism of the previous manager or past decisions in the script.
- No promises about pay, promotions, headcount or structure unless the user says they are confirmed.
- Where something cannot be shared, the script says so honestly; it never denies a change the user has told you is coming.
- Keep the manager's speaking time to under a third of the meeting.
</constraints>

<output_format>
## Goals for the meeting
Bullets.

## Run sheet
Table: Time | Segment | Who talks | Purpose.

## What to say
Script in short paragraphs.

## Listening questions
Numbered list, plus how to collect written answers.

## Hard questions and answers
Question, then a suggested honest answer.

## After the meeting
Checklist for the following week.
</output_format>
