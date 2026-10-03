---
schema: 1
id: practise-gratitude-meaningfully
kind: prompt
title: Practise gratitude meaningfully
description: Sets up a gratitude practice that avoids forced positivity, with specific, varied and people-focused prompts, an optional weekly gratitude letter and ways to keep the practice fresh.
category: habits
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [preferences]
output: [plan, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [gratitude, journaling-prompts, gratitude-letter, savouring, wellbeing-habits]
pairs_with:
  prompts: [design-habit-plan, guided-journaling, write-thank-you-note]
args:
  - name: format
    description: How you want to practise. journal = writing; voice-note = speaking into your phone; partner = taking turns with a partner or friend; family-dinner = a short round at a family meal, including with children.
    type: enum
    enum: [journal, voice-note, partner, family-dinner]
    default: journal
  - name: minutes
    description: Minutes per session you can realistically give, for example 3 or 10.
    type: number
    default: 5
output_contract:
  format: markdown
  sections: [Why this version works, Your setup, Prompt bank, The weekly gratitude letter, Keeping it fresh, On hard days]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design gratitude practices that people keep and that feel honest. You know what research and experience suggest makes gratitude work: specificity (one concrete thing and why, rather than a list of generic blessings), people over things (what someone did and what it cost them), novelty (new prompts rather than the same three items every day), savouring (dwelling on the detail for a moment), and "subtraction" (imagining life without something good). You know that many people find a few sessions a week stays fresher than daily, and that writing and sometimes delivering a letter of thanks to someone tends to have a strong effect. You also know the failure modes: forced positivity, using gratitude to dismiss real problems or unfairness, and guilt for not feeling grateful enough.

Format: {{format}}
Minutes per session: {{minutes}}
</context>

<task>
1. Why this version works: three or four sentences on what makes gratitude practice effective and what it is not (it does not replace solving problems or feeling hard feelings).
2. Your setup: when and where to do it, a cue that links it to an existing habit (after brushing teeth, during the commute, at the start of the meal), how often (suggest three times a week to start, with daily as an option), and what one session of {{minutes}} minutes looks like step by step for the {{format}} format.
3. Prompt bank: four weeks of rotating prompts, three or four per week, mixing types: specific moments ("a moment today that went better than expected, and why"), people ("someone who made your week easier, and what it cost them"), subtraction ("something you would miss if it disappeared tomorrow"), small senses ("one thing you saw, heard or tasted that you liked"), and growth ("something hard that taught you something"). Adapt the wording to the format: for family-dinner, make them work for children and keep the round short; for partner, include prompts about each other.
4. The weekly gratitude letter: an optional once-a-week or once-a-month practice of writing a short letter to someone who helped them, with a four-part structure (what they did, the specific effect, what it meant, the thank-you), and options to send it, read it aloud, or keep it.
5. Keeping it fresh: how to avoid autopilot, such as banning repeats for a week, one "why" per item, changing the prompt type weekly, and a monthly look back over entries.
6. On hard days: permission to write "today was hard" first, prompts that do not require feeling happy ("one thing that helped me get through today"), and a reminder that skipping a day is fine.
</task>

<constraints>
- No toxic positivity: never suggest being grateful instead of addressing grief, injustice, illness or mistreatment.
- Keep each session realistic for {{minutes}} minutes.
- For family-dinner, keep it voluntary for children and model it rather than forcing it.
- Before answering, check that the prompt bank has no repeated prompts and includes people-focused and hard-day prompts.
</constraints>

<output_format>
## Why this version works
## Your setup
Short bullets, then the session steps numbered.
## Prompt bank
Table: Week | Prompts.
## The weekly gratitude letter
Structure as a short numbered list.
## Keeping it fresh
## On hard days
</output_format>
