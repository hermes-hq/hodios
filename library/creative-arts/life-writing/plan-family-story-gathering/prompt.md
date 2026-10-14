---
schema: 1
id: plan-family-story-gathering
kind: prompt
title: Plan a family story-gathering session
description: Plans how to collect family stories at a reunion, holiday or gathering, with a recording corner, group prompts, roles, consent and a plan for what happens to the recordings afterwards.
category: life-writing
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [notes, preferences]
output: [plan, questions, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [oral-history, family-reunion, family-stories, group-interview, recording-tips]
pairs_with:
  prompts: [interview-relative-for-oral-history, edit-oral-history-transcript, caption-family-photos]
args:
  - name: gathering
    description: The occasion, how long it lasts, roughly how many people and their ages, the oldest relatives coming and anything known about their health or hearing, the place, and what you want to collect (stories about one person, a migration, a family business, photos identified).
    type: text
    required: true
  - name: equipment
    description: Optional. What you have to record with, for example phones, a voice recorder, a laptop.
    type: string
output_contract:
  format: markdown
  sections: [Plan for the day, Group prompts, Recording corner, Consent and care, After the gathering]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help families capture stories when everyone is in one place. Group settings work differently from one-to-one interviews: stories spark stories, so a shared photo or object brings out memories nobody would recall alone, and relatives correct and add to each other, which is valuable; but group noise ruins recordings, dominant voices take over, older people tire quickly and hear poorly in a crowd, and stories told over dinner are lost unless someone is recording. Families that succeed usually set up a quiet recording corner with a host, use photos and objects as prompts, keep sessions short, give children a role (as interviewers with simple questions), and decide in advance who keeps the files and how they are shared. Consent matters: some relatives will not want to be recorded, and some stories are not everyone's to tell.

<gathering>
{{gathering}}
</gathering>
{{#equipment}}Equipment: {{equipment}}{{/equipment}}
</context>

<task>
1. If the gathering's length, the number of people or the purpose is missing, ask for them and stop.
2. Plan for the day: a short schedule fitted to the occasion (when to set up, when to run the group session, when the recording corner is open), with roles (host, recorder, note-taker, photo labeller, children's interview team), and a priority list of whose stories to capture first, starting with the oldest and least often seen.
3. Group prompts: eight to twelve prompts suited to a group and the purpose, built around photos, objects, places and shared events (for example "Who can name everyone in this photo?", "What did Sunday dinner look like at Grandma's?"), and five simple questions children can ask older relatives.
4. Recording corner: setup for clear sound with the given equipment (quiet room, phone close to the speaker on a soft surface, airplane mode, test recording, a sign with the speaker's name said at the start), how long each session should last, and how to support someone with hearing or memory difficulties.
5. Consent and care: how to ask everyone in advance, a one-line spoken consent at the start of each recording, how to handle someone who declines or a story that upsets someone or exposes another person, and that painful memories may come up.
6. After the gathering: who keeps the original files, backup in two places, file naming (date, speaker, topic), a log of who said what, sharing with the family, and next steps (transcribing, follow-up one-to-one interviews).
</task>

<constraints>
- Do not make the gathering about the project; keep the plan light enough that it does not take over the occasion.
- Never record anyone without their agreement, and never suggest recording secretly.
- Do not invent family details; use only what the gathering notes give.
- Keep recording advice equipment-neutral and do not recommend products by brand.
</constraints>

<output_format>
## Plan for the day
## Group prompts
## Recording corner
## Consent and care
## After the gathering
</output_format>
