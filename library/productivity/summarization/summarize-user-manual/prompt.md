---
schema: 1
id: summarize-user-manual
kind: prompt
title: Turn a manual into a quick-start guide
description: Turns a long product or appliance manual into a one-page quick-start - setup, everyday use, cleaning and maintenance, settings worth changing and the safety warnings that actually matter.
category: summarization
version: 1.0.0
status: incubating
stage: [learn]
role: [individual, parent, home-cook]
requires: [none]
inputs: [document]
output: [summary, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [quick-start, appliances, instructions, maintenance, safety-warnings]
pairs_with:
  prompts: [summarize-photographed-pages, extract-instructions-from-transcript, interrogate-a-document]
args:
  - name: manual
    description: The manual text (copied from the PDF, or the relevant sections). Include the safety and maintenance sections.
    type: text
    required: true
  - name: how_i_use_it
    description: Optional - how you will use it and who else will (for example "family of four, kids will use the microwave", "only need the steam function").
    type: text
    required: false
output_contract:
  format: markdown
  sections: [Before first use, Everyday use, Cleaning and maintenance schedule, Settings worth knowing, Warnings that matter, If something goes wrong]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You turn a manual nobody reads into the page people would stick on the fridge. Manuals mix forty generic legal warnings with the three that actually prevent damage or injury for this product (do not run the dryer without the lint filter, descale every month in hard water, never use the self-clean with the racks in). Experienced users look for: the one-off setup steps that void the warranty if skipped (transport bolts, levelling, first-use burn-off), the maintenance that keeps it working, the settings defaults that are worth changing, what the error codes and beeps mean, and what the user is allowed to fix themselves versus when to call the service centre.

<manual>
{{manual}}
</manual>

{{#how_i_use_it}}How it will be used: {{how_i_use_it}}{{/how_i_use_it}}
</context>

<task>
1. List one-off setup steps before first use, in order, flagging any whose omission risks damage, injury or the warranty.
2. Summarise everyday use for the user's needs in short numbered steps, with the exact buttons, settings and values from the manual.
3. Build a cleaning and maintenance schedule (daily, weekly, monthly, yearly) from the manual.
4. List settings or features worth knowing about, including defaults the manual suggests changing.
5. Select the warnings that matter for this product and household, in plain words; group generic warnings into one line.
6. Turn the troubleshooting section and error codes into a short table, marking which fixes the user may do and when the manual says to call service.
</task>

<constraints>
- Use only the manual. Do not add settings, error codes, cleaning products or values from other models.
- Keep every safety instruction that concerns fire, electric shock, gas, scalding, children, or tipping; never drop one to save space.
- Quote values exactly (temperatures, amounts, intervals).
- If the manual covers several models, say which details vary by model and ask which one the user has if it matters.
</constraints>

<output_format>
## Before first use
Numbered steps.

## Everyday use
Numbered steps.

## Cleaning and maintenance schedule
Table: How often | Task | How

## Settings worth knowing
Bullets.

## Warnings that matter
Bullets.

## If something goes wrong
Table: Problem or code | What it means | What you can do | When to call service
</output_format>
