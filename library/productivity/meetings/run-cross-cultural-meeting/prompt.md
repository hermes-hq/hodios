---
schema: 1
id: run-cross-cultural-meeting
kind: prompt
title: Run a meeting across cultures
description: Plans a meeting where people bring different norms on directness, hierarchy, silence and disagreement, so everyone contributes and agreements mean the same to all, with a pre-brief and follow-up.
category: meetings
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [manager, project-manager, consultant, individual]
requires: [none]
inputs: [text]
output: [plan, checklist, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [intercultural, global-teams, inclusion, hierarchy, facilitation]
pairs_with:
  prompts: [run-multilingual-meeting, find-meeting-time-across-time-zones, write-meeting-ground-rules]
args:
  - name: meeting
    description: What the meeting is for, how long, and whether it is a one-off or recurring.
    type: text
    required: true
  - name: participants
    description: Who attends, where they work or come from, their seniority, and anything you have noticed (for example "the Tokyo team never disagrees in the call, then emails concerns later").
    type: text
    required: true
  - name: my_background
    description: Your own working background, so advice can point out your blind spots. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Likely friction points, Before the meeting, Structure, Facilitation moves, Checking agreement, After the meeting]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people run meetings where participants bring different working norms. Typical friction: people used to direct feedback read indirect speakers as having no view, while indirect speakers find blunt disagreement rude; in hierarchical settings junior people will not contradict a senior person in front of others, so silence is taken as agreement; some expect decisions in the meeting, others expect the meeting to confirm what was agreed beforehand; "yes" can mean "I hear you" rather than "I agree"; and comfort with silence, interruption and small talk differs. These are tendencies, not rules about individuals: national culture is only one layer next to company culture, profession, age and personality. Good facilitators avoid stereotyping, make the process explicit (how we will decide, how to disagree), give several channels to contribute (written, small group, one-to-one beforehand), invite input by name gently, and confirm agreements in writing.

Meeting: {{meeting}}
Participants: {{participants}}
{{#my_background}}My background: {{my_background}}{{/my_background}}
</context>

<task>
1. Name the likely friction points for this group, framed as possibilities to watch for, based on what the user has observed rather than on nationality alone. Where the user's own background suggests a blind spot, say so.
2. List what to do before the meeting: send the agenda and questions early so people can prepare, have short one-to-one or small pre-conversations with people who will not speak up in the room, and agree how decisions will be made.
3. Design a structure: a start that explains the process, ways to give input before discussion (written round, round-robin, small groups), and time for reflection rather than instant answers.
4. Give facilitation moves with example phrases: inviting a view without putting someone on the spot, softening or reframing a blunt challenge, asking senior people to speak last, handling silence, and checking whether "yes" means agreement.
5. Explain how to check agreement: confirm decisions and owners explicitly, ask what concerns remain, and give a channel for concerns after the meeting.
6. Describe the follow-up: written summary in plain language, a deadline for corrections, and a check with quieter participants one-to-one.
</task>

<constraints>
- Never reduce individuals to national stereotypes; present cultural patterns as tendencies and prefer what the user has observed.
- Do not recommend changing anyone's identity or accent; adjust the process, not the people.
- Keep phrases neutral and usable in plain English.
- If language barriers are the main issue, point to multilingual-meeting practices briefly rather than covering them in depth.
</constraints>

<output_format>
## Likely friction points
Bullets, each with what you might see and why.

## Before the meeting
Checklist.

## Structure
Table: Time | Segment | How input is gathered.

## Facilitation moves
Situation, then a phrase to use.

## Checking agreement
Bullets and phrases.

## After the meeting
Bullets.
</output_format>
