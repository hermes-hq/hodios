---
schema: 1
id: teach-teen-grooming-routine
kind: prompt
title: Set up a teen's grooming routine
description: Sets up a simple daily grooming routine with a teenager - washing, deodorant, skin, hair, shaving if wanted, teeth and clothes - written for the teen, with a light-touch plan for the parent.
category: personal-style
version: 1.0.0
status: incubating
stage: [plan]
role: [parent, individual]
requires: [none]
inputs: [text, preferences]
output: [plan, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [teen-hygiene, deodorant, first-shave, puberty-routines, independence]
pairs_with:
  prompts: [plan-puberty-talk, build-skincare-routine, plan-beard-and-shaving-care]
args:
  - name: teen
    description: The teen's age and what they are dealing with, for example "13, sweaty after sport, starting spots, wants to shave" or "15, long curly hair, forgets to shower".
    type: text
    required: true
  - name: what_is_hard
    description: What gets in the way - time in the morning, forgetting, sensory issues, shared bathroom, embarrassment, budget.
    type: text
    required: true
  - name: who_reads_it
    description: Who the routine is written for.
    type: enum
    enum: [teen, parent, both]
    default: both
output_contract:
  format: markdown
  sections: [For the teen, Morning, Evening, Weekly, Starter kit, For the parent]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help families set up grooming routines that teenagers actually follow. You know puberty brings sweat glands that make body odour, oilier skin and hair, and for many, facial or body hair, and that a routine works when it is short, attached to things the teen already does (after sport, before bed), and owned by the teen rather than nagged. You know common gaps: deodorant applied to dry clean skin rather than over sweat, the same clothes and socks worn again after sport, strong scrubs that make spots worse, shaving with a blunt razor and no lather, and long curly or coily hair washed with the wrong frequency. You know sensory sensitivities (scent, water on the face, textures) are real and have workarounds, and that body hair removal is a choice, not a rule.

Teen: {{teen}}
What makes it hard: {{what_is_hard}}
Written for: {{who_reads_it}}
</context>

<task>
1. Write a short, friendly intro to the teen that explains why bodies need more care now without shaming, in plain language for their age.
2. Give a morning routine and an evening routine of a few steps each, attached to existing habits, with time estimates.
3. Give weekly tasks: changing towels and bedding, washing sports kit, nail trim, and, if they want, shaving or hair removal basics (sharp razor, lather, with the grain, no sharing razors).
4. List a starter kit by product type within a sensible budget, including unscented or sensory-friendly options when relevant.
5. Give the parent a light-touch plan: how to raise it privately, how to remind without nagging (checklists, a cue on the mirror, an agreed signal), when to step back, and when to see a doctor (severe or painful acne, very heavy sweating that affects daily life, hygiene that suddenly drops alongside low mood or withdrawal).
</task>

<constraints>
- No shaming language about smell, spots or hair. No assumptions about gender; offer shaving and hair removal as options.
- No brands, shops or links. Do not diagnose skin or mood conditions; refer to a doctor.
- Keep the teen section short enough to stick on a mirror.
- If who_reads_it is teen, skip the parent section; if parent, still include the teen section to share.
- Before you reply, check each routine fits the stated time and sensory constraints.
</constraints>

<output_format>
## For the teen
Two or three sentences.
## Morning
Numbered, with minutes.
## Evening
Numbered, with minutes.
## Weekly
Checklist.
## Starter kit
Bullets.
## For the parent
Bullets, unless written only for the teen.
</output_format>
