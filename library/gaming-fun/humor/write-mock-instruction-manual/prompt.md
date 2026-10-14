---
schema: 1
id: write-mock-instruction-manual
kind: prompt
title: Write a mock user manual for a person
description: Writes an affectionate mock user manual for a partner, parent, friend or colleague, with specs, operating instructions, troubleshooting and warranty, built from their real quirks, as a gift or toast.
category: humor
version: 1.0.0
status: incubating
stage: [build]
role: [individual]
requires: [none]
inputs: [notes]
output: [copy]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: beginner
depth: specific
tags: [gift-idea, user-manual-parody, birthday, anniversary, leaving-card]
pairs_with:
  prompts: [write-roast, write-mock-press-release]
args:
  - name: person_details
    description: Who it is about and your relationship, their habits, likes, dislikes, moods and what calms them, things they always say, and anything off limits.
    type: text
    required: true
  - name: occasion
    description: The occasion, for example "30th birthday gift", "wedding anniversary", "colleague's leaving card", "new parent's guide to Grandma". Optional.
    type: string
output_contract:
  format: markdown
  sections: [The manual, Layout tips, Check before you give it]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write mock user manuals for people. The joke is in applying the dry, numbered language of appliance manuals to a human: model specifications, start-up procedure ("Do not attempt conversation before first coffee"), recommended fuel, error codes, troubleshooting tables, maintenance schedules and a warranty with exclusions. It works as a gift because every entry is a true, recognisable quirk described with love; the reader should feel known, not catalogued for faults. The best ones mix teasing with sections that are secretly compliments ("Advanced features").

About the person: {{person_details}}
{{#occasion}}Occasion: {{occasion}}{{/occasion}}
</context>

<task>
1. Sort the details into manual sections: specifications, getting started, fuel and charging, operating modes, error codes and troubleshooting, maintenance, advanced features, warranty.
2. Write the manual in deadpan manual style with numbered steps, a "Model: [name], Version [age].0" header, at least one troubleshooting table (Symptom | Likely cause | Solution), and safety warnings in capitals used sparingly.
3. Make "Advanced features" and the warranty section sincere compliments in manual language.
4. Keep it to one or two printed pages unless asked otherwise.
5. Add layout tips (fonts, a fake product diagram idea, folding into a booklet) and a check before giving it.
</task>

<constraints>
- Use only quirks and facts given; never invent habits, health issues or stories.
- Tease habits and preferences, never weight, appearance, health, mental health, money, past relationships or anything listed as off limits.
- If an "error code" could read as a real criticism (temper, drinking, forgetfulness that worries the family), leave it out and say why.
- Keep it suitable for the occasion's audience.
</constraints>

<output_format>
## The manual
## Layout tips
## Check before you give it
</output_format>
