---
schema: 1
id: plan-lunch-and-learn-session
kind: prompt
title: Plan a lunch-and-learn session
description: Plans a 30 to 45 minute lunch-and-learn or brown-bag session on a topic you know, with a scope that fits, a light slide plan, one hands-on moment and a takeaway colleagues can use the next day.
category: presentations
version: 1.0.0
status: incubating
stage: [plan]
role: [software-engineer, individual, manager, data-analyst]
requires: [none]
inputs: [topic, notes]
output: [plan, outline]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [lunch-and-learn, brown-bag, knowledge-sharing, internal-talk, show-and-tell]
pairs_with:
  prompts: [write-lightning-talk, outline-presentation]
  personas: [presentation-designer]
args:
  - name: topic
    description: What you want to share and what you know about it, for example "how I use pivot tables to reconcile invoices".
    type: string
    required: true
  - name: audience
    description: Who usually comes, their roles and how much they already know.
    type: text
    required: true
  - name: minutes
    description: Length of the session in minutes.
    type: number
    default: 45
  - name: format
    description: In the room, online or both.
    type: enum
    enum: [in-person, online, hybrid]
    default: hybrid
output_contract:
  format: markdown
  sections: [Scope, Session plan, Slide plan, Takeaway, Promotion blurb]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people run internal lunch-and-learn sessions. These are informal: people are eating, some join late, many are on a call with cameras off, and nobody has to be there. The usual mistake is trying to cover the whole topic; a good session promises one useful thing, shows it working on a real example from the audience's own work, gives people one chance to try or discuss, and ends with a takeaway they can use tomorrow (a checklist, template, snippet or link to an internal page). Slides should be few and light, with the demo or example doing the work. Start a couple of minutes late on purpose, recap at the halfway mark for latecomers, and finish on time because people have meetings after. Record it if the format allows, and say so at the start.

Topic: {{topic}}
Audience: {{audience}}
Length: {{minutes}} minutes
Format: {{format}}
</context>

<task>
1. Narrow the topic to one promise that fits {{minutes}} minutes for this audience, and list what to leave out for a follow-up session.
2. Write a minute-by-minute session plan: buffer start, hook with a real problem, main content in two or three chunks, a demo or worked example, one participation moment suited to {{format}} (try it, pair up, poll or chat question), a recap for latecomers, Q&A and a hard stop.
3. Plan five to ten light slides with assertion titles, marking where the demo or example replaces slides.
4. Define the takeaway resource and outline its content. Mark anything the presenter must build or check as [to prepare].
5. Write a short promotion blurb (under 60 words) for the invite or chat channel, with the promise and who it is for.
6. Note practical points: recording and consent, sharing screen with readable zoom, a backup if the demo fails, and collecting questions for a follow-up.
</task>

<constraints>
- Fit within {{minutes}} minutes with the Q&A included; show the total.
- Do not invent the presenter's examples, data or tools; use placeholders where they must supply them.
- Keep it informal and practical; no long theory sections.
</constraints>

<output_format>
## Scope
The one promise, and what is left for later.

## Session plan
Table: Minutes | Segment | What happens. Total shown. Then short bullets for the practical points (recording and consent, screen zoom, demo backup, follow-up questions).

## Slide plan
Numbered titles with one line of content each.

## Takeaway
What it is and its outline.

## Promotion blurb
The blurb, quoted.
</output_format>
