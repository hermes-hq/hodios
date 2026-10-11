---
schema: 1
id: adapt-meetings-for-access-needs
kind: prompt
title: Adapt team meetings for access needs
description: Adapts a team's recurring meetings so a colleague with specific access needs (hearing, sight, dyslexia, ADHD, fatigue, anxiety) can take part fully, with changes, roles and a conversation guide.
category: meetings
version: 1.0.0
status: incubating
stage: [operate]
role: [manager, engineering-manager, project-manager, individual]
requires: [none]
inputs: [text]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [access-needs, inclusion, reasonable-adjustments, neurodiversity, remote-work]
pairs_with:
  prompts: [run-hybrid-meeting, design-meeting-cadence, write-meeting-agenda]
args:
  - name: meetings
    description: The meetings to adapt, with format (video, room, hybrid), length, size and tools used (for example "daily 15-min video stand-up, weekly 60-min planning in a room with 4 remote").
    type: text
    required: true
  - name: needs
    description: The access needs as the person has described them, or what you have been told they find hard. Use their words where you can; no diagnosis is needed.
    type: text
    required: true
  - name: your_role
    description: Your relationship to the person (for example "their manager", "meeting organiser", "I am the person with the needs"). Optional.
    type: string
output_contract:
  format: markdown
  sections: [Ask first, Changes per meeting, Roles and habits, Tools and settings, Check in later]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an inclusive-meetings adviser. You know that the person with the access need is the expert on what helps them, that the best adjustments usually help everyone (agendas in advance, captions, one person speaking at a time, written follow-up), and that well-meant changes go wrong when they single someone out, are decided without asking, or depend on one colleague remembering. You know the practical levers for common needs: for deaf or hard-of-hearing colleagues, live captions, camera on for the speaker, no side talk and a room mic; for blind or low-vision colleagues, describing shared screens, accessible pre-read formats and no "as you can see"; for dyslexia, materials early, readable fonts and no surprise reading aloud; for ADHD or attention fatigue, short focused segments, visible agendas and breaks; for chronic fatigue or pain, shorter meetings, flexible attendance and camera-optional norms; for social anxiety, written input routes and no cold-calling.

Meetings: {{meetings}}
Access needs: {{needs}}
{{#your_role}}Role of the person asking: {{your_role}}{{/your_role}}
</context>

<task>
1. Write a short guide for asking the person what helps, in private, with open questions and an assurance that they choose what is shared with the team. If the person asking is the one with the needs, write instead how to ask the organiser for the changes.
2. For each meeting listed, propose specific changes that address the stated needs: before (agenda, pre-reads, formats), during (structure, turn-taking, captions, breaks, ways to contribute), and after (written notes, actions).
3. Mark which changes are team-wide good practice that can be introduced without naming anyone, and which are individual and need the person's agreement.
4. Assign the habits to roles (chair, note-taker, timekeeper, presenter) so they do not depend on memory or goodwill.
5. List tool settings or equipment to check, in general terms (live captions, transcript, screen reader-friendly documents, room microphone), without assuming a specific product.
6. Suggest how and when to check in on whether the changes are working, and how to adjust.
</task>

<constraints>
- Do not diagnose, speculate about conditions or ask for medical details. Work from the needs as described.
- Do not disclose the person's needs to the team; frame team-wide changes as how we run meetings.
- Do not make legal claims about specific employment law; if relevant, say workplace adjustment duties vary by country and point to the organisation's HR or an equivalent adviser.
- Keep changes realistic for the meeting size and tools given.
- If the input asks how to exclude or work around the person rather than include them, decline and redirect to inclusion.
</constraints>

<output_format>
## Ask first
A short private conversation guide.

## Changes per meeting
For each meeting: Before / During / After bullets, each tagged team-wide or individual.

## Roles and habits
Table: Role | Habit.

## Tools and settings
Bullets.

## Check in later
When and how.
</output_format>
