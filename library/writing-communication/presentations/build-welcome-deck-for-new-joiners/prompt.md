---
schema: 1
id: build-welcome-deck-for-new-joiners
kind: prompt
title: Build a welcome deck for new joiners
description: Builds a welcome deck for people joining a team or company, covering who we are, how we work, people to know, tools and access, and what their first weeks look like, without an info dump.
category: presentations
version: 1.0.0
status: incubating
stage: [plan, design]
role: [manager, engineering-manager, operations-manager, recruiter]
requires: [none]
inputs: [document, notes]
output: [outline, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [new-joiners, welcome-deck, ways-of-working, first-week, team-norms]
pairs_with:
  prompts: [plan-new-hire-onboarding, build-company-overview-deck, convert-slides-to-handout]
args:
  - name: team_info
    description: What the team or company does, structure, key people and roles, tools, rituals and meetings, norms, and links or documents you already have. Paste existing onboarding material if any.
    type: text
    required: true
  - name: joiners
    description: Who is joining and how, for example "two junior analysts, remote, start Monday" or "monthly cohort of 15 across functions".
    type: text
    required: true
  - name: format
    description: How the deck is used, presented live on day one, sent to read, or both, and any time limit.
    type: string
    default: presented live on day one, 30 minutes, then shared
output_contract:
  format: markdown
  sections: [What a new joiner needs first, Slide plan, First weeks slide, People to know, Leave out or link instead, Keep it current]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help managers and people teams build the deck new joiners see on their first day. These decks are often history lessons and org charts with sixty slides, given when people are already overwhelmed with logins and names. New starters retain little of a first-day info dump; what they need first is orientation and belonging: why the team exists and how it fits the bigger picture, what is expected in the first weeks, who to ask for what, how work actually gets done here (the unwritten rules: response times, meeting habits, how decisions are made, where to ask questions), and what "good" looks like at 30 and 90 days. Reference material (policies, full tool lists, detailed history) belongs in linked documents, not slides. The deck must also stay current; stale names and tools are a common embarrassment.

<team_info>
{{team_info}}
</team_info>

Joiners: {{joiners}}
Format: {{format}}
</context>

<task>
1. List what these joiners need on day one versus what can wait, based on their role and situation (for example remote joiners need to know how to reach people and when the team is online).
2. Plan the slides to the format: welcome and why we exist, how we fit in the organisation (one simple diagram), what we work on now, how we work (norms, meetings, decisions, where to ask), people to know (role and what to ask them for), tools and access checklist, the first weeks (day one, week one, first month, with a buddy if there is one), what good looks like early on, and where to find everything.
3. For each slide give a title, content in few words, and a speaker note for when it is presented live. If the deck is also sent to read, make sure each slide makes sense alone.
4. Write the first-weeks slide in detail from the input, marking anything not provided as [to confirm].
5. Build the people-to-know table by role and by what to ask them for; avoid personal details beyond name and role.
6. List what to leave out of the slides and link instead.
7. Suggest how to keep the deck current: an owner, a review date, and which slides go stale fastest.
</task>

<constraints>
- Use only the information given about the team; do not invent people, tools, policies, benefits or norms. Mark gaps as [to confirm].
- Keep slides light; long policy text goes to linked documents.
- No personal data beyond names and work roles; do not include private contact details on slides.
- Avoid insider jargon or explain it in a short glossary slide.
- Inclusive, welcoming tone; do not assume joiners' backgrounds, family situations or schedules.
</constraints>

<output_format>
## What a new joiner needs first
Two lists: day one, can wait.

## Slide plan
Table: # | Slide title | Content | Speaker note.

## First weeks slide
Day one, week one, first month.

## People to know
Table: Name or role | What to ask them about.

## Leave out or link instead
Bullets.

## Keep it current
Owner, review cadence, fastest-changing slides.
</output_format>
