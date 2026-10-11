---
schema: 1
id: ask-for-stretch-assignment
kind: prompt
title: Ask for a stretch assignment
description: Plans how to ask for a high-visibility project or a bigger role, with the pitch, proof you can do it, a plan for your current work and how to handle a no.
category: career-growth
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, software-engineer]
requires: [none]
inputs: [text, notes]
output: [plan, script, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [stretch-project, career-visibility, development-opportunity, manager-conversation]
pairs_with:
  prompts: [increase-work-visibility, build-development-plan, prepare-promotion-case]
  personas: [career-coach]
args:
  - name: opportunity
    description: The project, role or responsibility you want (or the kind you want, if nothing specific is open), who decides, and why it matters to the team or company.
    type: text
    required: true
  - name: you
    description: Your current role and workload, relevant experience or wins, the skills you would be stretching, and your career goal.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Fit check, Your pitch, Proof you can do it, Your current work, The conversation, If the answer is no]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people ask for work that grows them. Stretch assignments go to people who ask early, before the project is staffed, and who make the decision easy: they show why they are a credible bet, what risk the decider takes and how it is covered, and what happens to their current work. Managers worry about three things: will it get done, will the current work drop, and will this person burn out. A good ask answers all three, offers a support structure (a check-in rhythm, a more experienced adviser), and is honest about the stretch. A request that is only about the person's growth, with nothing for the team, is easy to refuse.

<opportunity>
{{opportunity}}
</opportunity>
<you>
{{you}}
</you>
</context>

<task>
1. Fit check: what the opportunity needs, which parts they already have evidence for, which parts are the stretch, and whether this is a reasonable next step or too large a jump. If nothing specific is open, suggest two or three types of assignment that fit their goal and how to spot them early.
2. Your pitch: two or three sentences stating what they want to take on, why it matters to the team, and why they are a good bet.
3. Proof you can do it: three pieces of evidence from their experience, framed for this opportunity, and one honest gap with how they will cover it (adviser, training, early review).
4. Your current work: a short plan for what to hand over, pause, automate or keep, so the decider can see nothing important drops. Include what to propose about workload if both cannot fit.
5. The conversation: how and when to ask (before staffing, in a one-to-one, with a short written follow-up), a script under two minutes, and replies to "you're too busy", "you don't have experience in X", "maybe next time" and "I need to check with Y".
6. If the answer is no: how to ask what would make them a yes next time, request a smaller piece of the same work, and agree a date to revisit.
</task>

<constraints>
- Use only the facts given. Do not invent achievements or credentials; mark missing evidence as [X] with a question.
- If the opportunity is clearly beyond their current evidence, say so and suggest a smaller step that builds toward it.
- Keep the tone confident but not entitled.
</constraints>

<output_format>
## Fit check
Table: Need | Your evidence | Stretch?
## Your pitch
## Proof you can do it
## Your current work
Table: Current task | Plan.
## The conversation
Timing, script, then replies table: They say | You say.
## If the answer is no
</output_format>
