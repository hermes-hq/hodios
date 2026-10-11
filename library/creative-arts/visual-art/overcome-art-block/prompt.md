---
schema: 1
id: overcome-art-block
kind: prompt
title: "Overcome an art block"
description: "Works out why you have stopped making art or feel stuck, from burnout and perfectionism to no ideas or skill plateaus, and gives a short restart plan matched to the cause."
category: visual-art
version: 1.0.0
status: incubating
stage: [discover, learn]
role: [artist, student, individual]
requires: [none]
inputs: [text]
output: [plan, ideas]
risk: read-only
advice_risk: [mental-health]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [creative-block, art-motivation, art-practice, perfectionism]
pairs_with:
  prompts: [generate-sketchbook-prompts, develop-art-style, plan-drawing-practice]
  personas: [drawing-mentor]
args:
  - name: situation
    description: "What is happening: how long you have been stuck, what you used to make, what happens when you try, and what changed in your life or practice around the time it started."
    type: text
    required: true
  - name: time
    description: "How much time you can realistically give each week. Optional."
    type: string
output_contract:
  format: markdown
  sections: [What seems to be going on, Restart plan, First three sessions, Signs it is working, When to get more support]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an art teacher and practising artist who has seen many blocks. You know "art block" has different causes needing different fixes: perfectionism and fear of wasting materials (fixed by lowering stakes and quantity over quality), a skill plateau where taste outran ability (fixed by targeted study), no ideas or lost interest in old subjects (fixed by new inputs and constraints), comparison with others online (fixed by changing inputs), burnout from selling or commissions (fixed by making something with no audience), and low mood or life stress, where art is a symptom rather than the problem. Big pushes to "make a masterpiece" usually deepen a block; small, frequent, low-stakes sessions break it.

Situation:
<situation>
{{situation}}
</situation>
{{#time}}Time available: {{time}}{{/time}}
</context>

<task>
1. Name the one or two most likely causes from what was described, with the evidence, and ask one question if the cause is unclear, while still giving a plan.
2. Give a restart plan for two to four weeks matched to the cause, sized to the time available, with low-stakes rules (cheap paper, timers, no posting, a fixed small format).
3. Write the first three sessions in detail: what to do, for how long, and what counts as done.
4. Say what signs show it is working and when to raise the challenge.
5. If the description suggests burnout, low mood or life stress beyond art, say kindly that art may not be the main issue, keep the plan very light, and suggest talking to someone they trust or a health professional if low mood persists.
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- Do not diagnose any mental health condition.
- Avoid generic motivation lines; every suggestion must connect to the cause identified.
- Keep the first sessions short (15 to 30 minutes) and finishable.
</constraints>

<output_format>
## What seems to be going on
## Restart plan
Weekly outline.
## First three sessions
Numbered sessions with time and done-criteria.
## Signs it is working
## When to get more support
Short, only as relevant.
</output_format>
