---
schema: 1
id: write-first-email-as-new-manager
kind: prompt
title: Write your first email as a new manager
description: Writes a new manager's first note to the team - who they are, what stays the same for now, how to reach them, how first one-to-ones will work and what they want to learn - without big promises.
category: email
version: 1.0.0
status: incubating
stage: [plan]
role: [manager, engineering-manager, tech-lead, operations-manager]
requires: [none]
inputs: [text, notes]
output: [message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [new-manager, first-email, team-introduction, one-to-ones, listening-tour]
pairs_with:
  prompts: [plan-transition-to-manager, write-self-introduction, plan-one-on-one]
  workflows: [new-manager-track]
args:
  - name: about_you
    description: Your background, how you came to the role, and one or two human details you are happy to share.
    type: text
    required: true
  - name: situation
    description: The context - promoted from within the team, hired externally, replacing a popular or departed manager, after a reorg, team size, remote or office.
    type: text
    required: true
  - name: working_style
    description: How you like to work and be reached, and your plan for the first weeks (one-to-ones, team meeting, listening).
    type: text
output_contract:
  format: markdown
  sections: [Situation read, Email, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A team reads a new manager's first email for signals, not information: is this person going to change everything, do they respect what we built, will they listen, and how do I get time with them. The most common mistakes are announcing a vision or changes before understanding the team (which reads as arrogance and later has to be walked back), a long CV, and vague openness ("my door is always open") without a concrete way to talk. What works is short, warm and specific: who you are in a few lines, an explicit statement of what stays the same for now, the plan for the first weeks (one-to-ones with everyone, with what you will ask about), how to reach you and how you like to work, and an acknowledgement of the context. That context matters: someone promoted from within the team must address the change in relationship with former peers; someone replacing a well-liked manager should credit them; after a reorg or layoffs, the email must not sound cheerful about the change.
</context>

<task>
Write a first email to the team from a new manager.

<about_you>
{{about_you}}
</about_you>

<situation>
{{situation}}
</situation>
{{#working_style}}
<working_style>
{{working_style}}
</working_style>
{{/working_style}}

1. Situation read: in two or three bullets, name what this team is likely to be wondering, given the situation, and the one or two things the email must address because of it.
2. Write the email:
   - Subject: plain ("Hello from your new manager" or "Starting as team lead: a note and next steps").
   - Opening: who you are and your role, in two or three sentences; one human detail if given.
   - Context line suited to the situation: credit the previous manager or the team's work; for an internal promotion, acknowledge the change honestly; after a reorg or layoffs, acknowledge it is a hard time without spin.
   - What stays the same for now: current priorities, meetings and processes continue until the user has learned more.
   - First weeks: one-to-ones with everyone, with the three or four questions the user will ask (what is working, what is getting in the way, what they want from a manager, their goals). Say they will be booked or how to book.
   - How to reach the user and how they like to work, briefly and concretely.
   - Close with something genuine, not a slogan.
3. Under Notes, suggest what to do with what they learn in one-to-ones (share themes back), whether to send this before or after a team meeting, and anything to check with HR or their own manager first (for example what can be said about the previous manager's departure).
</task>

<constraints>
- Under about 250 words in the body.
- No announced changes, vision statements or judgments about current ways of working.
- No clichés: "my door is always open", "exciting journey", "hit the ground running", "family".
- Never invent background, achievements or reasons for the previous manager leaving.
</constraints>

<output_format>
## Situation read
Bullets.
## Email
Subject line, then the body.
## Notes
Bullets.
</output_format>
