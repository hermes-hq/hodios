---
schema: 1
id: prepare-product-demo
kind: prompt
title: Prepare a product demo
description: Writes a product demo script built around the audience's pains, with setup checklist, story arc, three wow moments, recovery plans for failures and a strong close, timed to the slot.
category: product-launch
version: 1.0.0
status: incubating
stage: [build, ship]
role: [product-manager, founder, sales-rep, marketer]
requires: [none]
inputs: [text, notes]
output: [script, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [demo-script, storytelling, sales-demo, launch-event, objection-handling]
pairs_with:
  prompts: [write-sales-enablement-brief, write-launch-faq, plan-product-launch]
  personas: [product-marketing-manager, speaking-coach]
args:
  - name: product
    description: What the product does, the features available to show, the state of the demo environment, and what must not be shown (unfinished or unreleased parts).
    type: text
    required: true
  - name: audience
    description: Who will watch (role, industry, company size, technical level), their pains and goals as far as you know them, and the setting (sales call, conference stage, all-hands, investor meeting).
    type: text
    required: true
  - name: duration_minutes
    description: Length of the slot in minutes, including questions.
    type: number
    default: 15
output_contract:
  format: markdown
  sections: [Demo goal, Audience pains, Setup checklist, Run of show, Script, Wow moments, Recovery plans, Expected questions, Close]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a product leader and former sales engineer who has given hundreds of demos. Demos fail when they become a feature tour in menu order, when the presenter shows setup screens before any value, when the data is empty or obviously fake, when nothing prepares for the moment the Wi-Fi drops or a page errors, and when the demo ends without asking for anything. Strong demos start from the audience's pain, show the end result early, build to a few memorable moments, rehearse the failure paths and close with a clear next step.

Slot length: {{duration_minutes}} minutes, including questions.
</context>

<task>
Product:

<product>
{{product}}
</product>

Audience:

<audience>
{{audience}}
</audience>

1. State the demo goal: what the audience should believe and do at the end (for example "book a pilot", "approve the budget", "try it this week"). If the audience or setting is unclear, write the demo for the most likely case and list the questions to confirm.
2. List the audience's top two or three pains or goals in their words, and map each to the capability that addresses it. Leave out features that do not map to a pain.
3. Write the setup checklist: demo environment and accounts, realistic sample data that looks like the audience's world (named after plausible but fictional companies, never real customer data), browser tabs and windows in order, notifications off, screen resolution and zoom, a pre-recorded backup video or screenshots, a local or offline fallback, and a dry run time.
4. Build the run of show, timed to the slot: open with the pain and the outcome (show the end result in the first two minutes), then the story of a specific user getting from problem to result, then the wow moments, then proof (a short customer result only if the input provides one), then the close, leaving about 25-30% of the slot for questions.
5. Write the script for each segment: what is on screen, the exact click path, and what the presenter says, in a natural speaking voice with short sentences. Narrate outcomes, not menus ("in one click, Ana's whole week is scheduled" rather than "now I'll click Settings").
6. Design three wow moments: the points where the audience sees something faster, easier or more insightful than they expected. For each, the setup line before it, the pause after it, and the question to ask the audience.
7. Write recovery plans for likely failures: slow load, error message, network down, wrong data, a feature that misbehaves, an off-topic question that derails, running out of time. For each, what to say and what to do (switch to backup, skip, take it offline).
8. List the questions to expect (including hard ones about price, security, integrations and competitors) with short honest answers based on the input, or [CHECK] where you do not know.
9. Write the close: a one-sentence recap tied to their pains, the specific next step and the ask.
</task>

<constraints>
- Show only capabilities the product description includes. Anything uncertain is marked [VERIFY BEFORE DEMO]; anything unreleased is not shown or is clearly labelled as coming later only if the input allows it.
- The run of show must add up to the slot length, with the arithmetic visible.
- No invented customer names, logos, metrics or testimonials. Use proof only if the input provides it.
- Keep the spoken script tight: roughly 130 words per minute of speaking time.
</constraints>

<output_format>
## Demo goal
One or two sentences.

## Audience pains
Table: pain (their words) | capability | where it appears in the demo.

## Setup checklist
A checklist.

## Run of show
Table: minute | segment | on screen | purpose. Then the total.

## Script
Per segment: on screen, click path, and the spoken lines.

## Wow moments
Numbered: setup line, the moment, the pause, the question.

## Recovery plans
Table: failure | what to say | what to do.

## Expected questions
Bold questions with short answers.

## Close
The recap, next step and ask.
</output_format>
