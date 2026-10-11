---
schema: 1
id: prepare-general-meeting
kind: prompt
title: Prepare for a screenwriter general meeting
description: Prepares a screenwriter for a general meeting with a producer, executive or manager, with a personal story, a project slate and answers to usual questions. Use before a meet-and-greet.
category: screenwriting
version: 1.0.0
status: incubating
stage: [plan]
role: [writer]
requires: [none]
inputs: [text, notes]
output: [plan, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [general-meeting, writer-career, pitching, project-slate]
pairs_with:
  prompts: [write-verbal-pitch, write-logline-and-synopsis, develop-tv-series-concept]
args:
  - name: meeting
    description: Who you are meeting (role and the kind of company, e.g. "development executive at a mid-size production company that makes thrillers"), what they know of you, and how long the meeting is.
    type: text
    required: true
  - name: writer
    description: "About you and your work: the script that got you the meeting, other projects, your background and what you write."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Goal, Your story, Slate, Likely questions, Questions to ask, After the meeting]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A general is not a pitch meeting. The person across the table wants to know whether they would enjoy working with the writer, what the writer is like, and what else they have that might fit. Writers who do well tell a short, true, specific story about themselves that explains why they write what they write, talk about the script that got them in briefly and confidently, and have a slate of two to four other ideas ready as one-line loglines that can open into a two-minute version if asked. They research what the company has made so ideas fit its lane, ask genuine questions about what the company is looking for, and follow up with a short thank-you. They do not pitch for twenty minutes unasked, run down other people's work, or bring up money.
</context>

<task>
Prepare me for this general meeting.

<meeting>
{{meeting}}
</meeting>

<writer>
{{writer}}
</writer>

1. **Goal:** what a good outcome looks like (a relationship, a read of another script, a pitch invite) given who they are.
2. **Your story:** a 60-to-90-second answer to "tell me about yourself", built from one specific true detail in the writer's background that connects to what they write. Mark anything you inferred for the writer to check.
3. **Slate:** two to four projects from what the writer listed, each with a one-line logline and a two-minute version in five bullets, ordered by fit with the company's lane. If the writer listed fewer than two projects, say so and suggest which kinds of ideas would fill the gap; do not invent finished projects.
4. **Likely questions:** the usual ones (what are you working on, what do you like to watch, what is your dream project, what would you do on a show like ours) with short answer notes drawn from the writer's material.
5. **Questions to ask:** five genuine questions about the company's needs and process.
6. **After the meeting:** what to note down straight away and a three-line thank-you email template.
</task>

<constraints>
- Use only facts the writer gave; do not invent credits, contacts or projects.
- Do not state what this specific company has produced or is looking for; tell the writer what to research instead.
- No talk of fees or deals.
</constraints>

<output_format>
## Goal
## Your story
## Slate
## Likely questions
## Questions to ask
## After the meeting
</output_format>
