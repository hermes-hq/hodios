---
schema: 1
id: write-working-with-me-guide
kind: prompt
title: Write a "working with me" guide
description: Writes a one-page personal "working with me" guide for a manager or colleague covering how they work, communication preferences, feedback, known blind spots and what they ask of others.
category: business-writing
version: 1.0.0
status: incubating
stage: [build]
role: [manager, engineering-manager, executive, individual]
requires: [none]
inputs: [notes, preferences]
output: [docs, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [manager-readme, user-manual-for-me, working-styles, new-team, feedback-preferences]
pairs_with:
  prompts: [write-team-charter, plan-one-on-one, write-professional-bio]
args:
  - name: about_you
    description: Your role, how you like to work and communicate, hours and response times, how you make decisions, how you like to give and receive feedback, what frustrates you, and the blind spots colleagues have pointed out.
    type: text
    required: true
  - name: readers
    description: Who will read it.
    type: enum
    enum: [direct-reports, peers, my-manager, new-team-all]
    default: new-team-all
output_contract:
  format: markdown
  sections: [Guide, Questions to invite from readers, Review before sharing]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people write a short, honest "working with me" guide (sometimes called a personal user manual or manager README). The useful ones are specific about behaviour: "I reply to Slack within a few hours in my working day; if something is urgent, call me", "I think out loud in meetings, so ask whether I have decided or am still exploring". The useless ones list personality-test labels and virtues ("I value transparency"). The best include known weaknesses with what others can do about them, which builds trust. For managers there is a power gap: a guide written for direct reports must invite disagreement and feedback in specific ways and must not read as a list of rules others must follow. It should be a starting point for a conversation and be updated as people learn more.

Readers: {{readers}}

<about_you>
{{about_you}}
</about_you>
</context>

<task>
1. Write the guide in the first person, under one page, with these headings:
   - My role and what I focus on.
   - How I work: hours, time zone, focus time, response times by channel.
   - How to reach me: which channel for what, and how to flag urgent.
   - How I make decisions, and how to tell whether I have decided.
   - Feedback: how I like to receive it, how I give it, and an explicit invitation to tell me when I get something wrong.
   - What I appreciate, as observable behaviours.
   - Things I am working on: blind spots or habits, and what others can do when they see them.
   - Things people misread about me, if the notes include any.
2. For direct-reports, add a short section on what you will do for them (1:1 rhythm, support, how you share context) and phrase preferences as requests, not rules. For my-manager, focus on updates, decision rights and support you need.
3. Questions to invite from readers: three or four questions the reader could answer back, so it becomes two-way.
4. Review before sharing: flag anything that reads as a demand, a personality label, or too personal for a workplace document.
</task>

<constraints>
- Only include traits and preferences the user stated; do not add flattering qualities.
- Replace personality-type labels with the behaviour behind them when the notes allow; otherwise ask.
- Leave out health conditions, family details and other personal information unless the user explicitly wants them included, and if they do, keep it to what colleagues need for working together.
- Plain, warm, specific language. No jokes at others' expense.
</constraints>

<output_format>
## Guide
The guide with headings.
## Questions to invite from readers
Numbered list.
## Review before sharing
Bullets.
</output_format>
