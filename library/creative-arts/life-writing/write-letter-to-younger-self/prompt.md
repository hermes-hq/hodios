---
schema: 1
id: write-letter-to-younger-self
kind: prompt
title: Write a letter to your younger self
description: Guides writing a letter to yourself at a chosen age, starting from what that younger self was going through and what they needed to hear, in your voice without false reassurance.
category: life-writing
version: 1.0.0
status: incubating
stage: [build]
role: [individual, writer]
requires: [none]
advice_risk: [mental-health]
inputs: [notes, text]
output: [message, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: beginner
tags: [letter-writing, younger-self, reflective-writing, expressive-writing, self-compassion]
pairs_with:
  prompts: [write-letter-to-future-self, write-unsent-letter, draft-memoir-scene]
  personas: [memoir-coach]
args:
  - name: age_and_moment
    description: The age you are writing to and what was happening then - where you lived, what you worried about, what you hoped for, what you did not know yet.
    type: text
    required: true
  - name: what_you_know_now
    description: Optional. What you understand now that you did not then, and anything you want that younger self to hear. Fragments are fine.
    type: text
  - name: purpose
    description: "private: just for you. shared: for a workshop, a reading or a publication."
    type: enum
    enum: [private, shared]
    default: private
output_contract:
  format: markdown
  sections: [Before you start, Prompts, Your letter, Afterwards]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people write letters to their younger selves, a common exercise in memoir workshops and reflective writing. Most such letters fail in predictable ways: they deliver a list of advice the younger self could not have used ("buy shares", "don't trust him"), they promise that everything works out (which can feel false to readers and to the writer), or they talk down to the person they once were. Strong letters start by seeing the younger self clearly: naming what they were carrying and doing well under the circumstances, telling them what they could not know, and being honest that some things stayed hard. The letter is written by the person now, in their voice, to the person then.

{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}

<age_and_moment>
{{age_and_moment}}
</age_and_moment>
{{#what_you_know_now}}<what_you_know_now>
{{what_you_know_now}}
</what_you_know_now>{{/what_you_know_now}}
Purpose: {{purpose}}
</context>

<task>
1. Before you start: two or three gentle lines about the exercise, that it can stir things up, and that the writer can stop at any point. Keep any limits note to one line here.
2. Prompts: six to eight prompts specific to the age and moment given (for example "What were you hiding from your parents that year?", "What were you proud of that nobody noticed?"), moving from seeing the younger self, to what they did not know, to what you want them to keep.
3. Your letter: a draft of 250 to 450 words built only from what the writer gave, in their voice, opening with a concrete detail of that time and place, addressing the younger self directly, acknowledging what was hard, telling them one or two true things they could not know, and closing without a promise that everything turns out fine. Mark places where the writer should add their own detail as [your detail].
4. Afterwards: a few lines on what to do with the letter (keep it, reread it in a year, use it as material for a memoir chapter if shared) and a reminder to take care of themselves if it brought up something heavy.
</task>

<constraints>
- Never invent facts about the writer's life; mark gaps instead.
- Do not write in the younger self's voice or imagine their reply.
- No lists of hindsight advice, regrets as instructions, or promises that everything works out.
- If the moment involves abuse, the writer was a child, or the writer blames themselves for harm done to them, write with particular care and do not suggest the younger self could have prevented it.
- If purpose is shared, mention once that other people named in the letter may read it.
</constraints>

<output_format>
## Before you start
## Prompts
## Your letter
## Afterwards
</output_format>
