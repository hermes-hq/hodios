---
schema: 1
id: plan-customer-feedback-call
kind: prompt
title: Plan a customer feedback call
description: Plans a 30-minute product feedback call with an existing customer, with goals, agenda, questions about real recent use, a screen-share segment, pitfalls to avoid and a logging template.
category: user-feedback
version: 1.0.0
status: incubating
stage: [discover]
role: [product-manager, ux-researcher, designer, founder]
requires: [none]
inputs: [text, notes]
output: [plan, questions, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [customer-call, existing-customers, screen-share, feedback-session, call-agenda]
pairs_with:
  prompts: [write-customer-interview-guide, summarize-account-feedback, extract-feedback-fields]
args:
  - name: customer
    description: Who the customer is (company or person, role of attendees, plan, how long they have used the product) and what you already know from tickets, usage or the account owner.
    type: text
    required: true
  - name: topics
    description: What the team wants to learn or get reactions to, for example a feature area, a recent change or a prototype. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Goals, Before the call, Agenda, Questions, Screen-share segment, Things to avoid, Logging template, Follow-up]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan product feedback calls with existing customers. These calls are different from discovery interviews: the customer already uses the product, so the richest material is what they actually do with it, where it slows them down and what they work around. The most useful half of a call is often watching them share their screen and do a real task. Calls go wrong when the product person demos instead of listens, asks people to imagine future features ("would you use…?"), lets the account manager turn it into a sales or renewal conversation, defends the product, or promises roadmap items. Notes go wrong when they mix what the customer said with what the team inferred.

Customer:

<customer>
{{customer}}
</customer>
{{#topics}}

Topics:

<topics>
{{topics}}
</topics>
{{/topics}}
</context>

<task>
1. Set two or three learning goals for this call, tied to decisions. If no topics were given, derive goals from what is known about the customer and say so.
2. List what to do before the call: review usage and recent tickets, agree roles (one person leads, one takes notes, the account owner listens), send a short agenda and a request to share screen, ask for consent to record if you plan to.
3. Write a timed agenda for 30 minutes: introduction and expectations (no commitments on roadmap), current use, screen-share task, specific topics, wrap-up.
4. Write the questions: open questions about the last time they did the core job ("Walk me through the last time you…"), probes for workarounds, frequency and impact, and questions on the given topics framed around their own experience. Mark the must-ask questions in case time runs short.
5. Design the screen-share segment: which real task to ask them to do, what to watch for (hesitation, workarounds, other tools, errors), and neutral prompts to use ("What are you looking for here?").
6. List things to avoid, with alternatives: leading questions, demos, defending, future-hypothetical questions, roadmap promises, and sales talk.
7. Provide a logging template that separates said, observed and inferred, with verbatim quotes, product area, severity, and follow-ups.
8. Write the follow-up: a thank-you note within two days that recaps what you heard, what happens next and when they will hear back.
</task>

<constraints>
- No roadmap commitments or dates in the call script.
- Questions must be about past and present behaviour, not hypothetical future use, except one clearly marked reaction question if a prototype is shown.
- Do not invent facts about the customer beyond what was given.
- Ask for recording consent before recording.
</constraints>

<output_format>
## Goals
Two or three bullets.

## Before the call
Checklist.

## Agenda
A table: time | segment | lead.

## Questions
Grouped by segment, must-asks marked.

## Screen-share segment
Task, what to watch, prompts.

## Things to avoid
A table: avoid | do instead.

## Logging template
A table with the fields.

## Follow-up
The draft note.
</output_format>
