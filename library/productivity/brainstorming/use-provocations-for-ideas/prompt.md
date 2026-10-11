---
schema: 1
id: use-provocations-for-ideas
kind: prompt
title: Use provocations to find ideas
description: Writes deliberately unreasonable provocations about a problem - escape, reversal, exaggeration, distortion, wishful thinking - then moves from each to practical ideas instead of judging it.
category: brainstorming
version: 1.0.0
status: incubating
stage: [discover]
role: [founder, product-manager, designer, individual]
requires: [none]
inputs: [topic, text]
output: [ideas, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [provocation, lateral-thinking, movement, de-bono, ideation-technique]
pairs_with:
  prompts: [generate-ideas-from-random-words, reverse-assumptions-for-ideas, run-scamper-session]
args:
  - name: problem
    description: The situation or product to rethink, what is taken for granted about it, and constraints.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Taken for granted, Provocations, Movement, Practical ideas, Pick]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A provocation, in Edward de Bono's lateral thinking, is a statement known to be unreasonable ("Po, restaurants have no menus"), used not to be judged but as a stepping stone. The skill is not writing the provocation, it is "movement": deliberately extracting value from it instead of rejecting it. Movement methods include drawing out the consequences, finding the moment when it would work, extracting a principle, focusing on the difference from current practice, and asking what is positive about it. Novices write provocations that are already reasonable (too tame to move thinking) or reject them on sight. Ideas from provocations are often mundane in the end; the provocation only got thinking off its usual track.

<problem>
{{problem}}
</problem>
</context>

<task>
1. List the five to eight things taken for granted about this situation (how it is always done, who does it, when, where, what it costs). If the problem is too vague to list them, ask up to two questions and stop.
2. Write about ten provocations using several methods, labelled: escape (drop something taken for granted), reversal (do the opposite), exaggeration (make a number absurdly large or small), distortion (change the order or relationships), wishful thinking (an impossible wish). Each starts with "Po," and must be clearly unreasonable.
3. For each provocation, apply at least two movement methods and write what comes out, one line each: consequences, moment-to-moment (when would this work?), principle extracted, difference from now, positive aspects.
4. Turn the useful movements into practical ideas that fit the constraints: who does what, and a small first step.
5. Pick the three ideas worth testing first with a reason and a way to test cheaply.
</task>

<constraints>
- Do not judge a provocation as good or bad; the evaluation happens only at the practical-ideas stage.
- Provocations stay within ethics and law: no provocation that reads as instructions to harm, deceive or discriminate.
- Do not invent facts about the user's situation, costs or regulations; label assumptions.
- One line per provocation and per movement.
</constraints>

<output_format>
## Taken for granted
Bulleted list.

## Provocations
Numbered list with method label.

## Movement
Table: Provocation # | Movement method | What comes out.

## Practical ideas
Numbered list: idea, first step, provocation it came from.

## Pick
Three ideas with reason and cheap test.
</output_format>
