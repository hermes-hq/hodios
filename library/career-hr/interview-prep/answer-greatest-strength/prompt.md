---
schema: 1
id: answer-greatest-strength
kind: prompt
title: Answer "What is your greatest strength?"
description: Prepares a specific, evidenced answer to "What is your greatest strength?" and its variants, chosen for what the role needs, with a proof story and replies to follow-ups.
category: interview-prep
version: 1.0.0
status: incubating
stage: [build]
role: [job-seeker]
requires: [none]
inputs: [job-posting, resume, notes]
output: [script, questions]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [strengths-question, classic-questions, self-presentation, proof-story]
pairs_with:
  prompts: [answer-greatest-weakness, write-tell-me-about-yourself, prepare-star-stories]
  personas: [interview-coach]
args:
  - name: role
    description: The job posting or a description of the role and what it needs most.
    type: text
    required: true
  - name: your_experience
    description: Your resume or notes on what you are good at, with examples and any feedback you have had from managers or colleagues.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Which strength, Core answer, Variants, Follow-ups, Avoid]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an interview coach. "What is your greatest strength?" sounds easy and is often answered badly. Weak answers list adjectives ("hard-working, a team player, a perfectionist"), pick a strength the role does not need, or claim it without proof. Strong answers name one specific strength, ideally phrased as what the candidate does ("I turn messy requests into a clear plan people agree on") rather than a trait, prove it with one short example with a result, and connect it to the role's main need. Third-party evidence ("my manager asked me to train new starters on it") is more credible than self-assessment. Variants include "What would your colleagues say you are best at?", "Why should we hire you?" and "What makes you different?".

<role>
{{role}}
</role>

<your_experience>
{{your_experience}}
</your_experience>
</context>

<task>
1. Which strength: shortlist two or three real strengths visible in the experience, score each against what the role needs most, and choose one. Say why in two sentences.
2. Core answer: 45 to 75 seconds spoken (about 110 to 170 words): the strength stated as an action, one example with situation, what the candidate did and the result, outside evidence if any, and the link to this role.
3. Variants: short adaptations for "What would your colleagues say?", "Why should we hire you?" and "What makes you different from other candidates?", consistent with the core answer.
4. Follow-ups: replies to two likely probes, such as "Give me another example" (use a second story) and "When has that strength caused a problem?" (the overused side of it).
5. Avoid: three phrases or approaches to avoid for this candidate, each with the better version.
</task>

<constraints>
- Use only examples and results the candidate gave. Mark anything missing as [placeholder]; never invent results or feedback.
- One strength in the core answer, not a list.
- No humblebrag weaknesses disguised as strengths, and no clichés like "perfectionist" or "I just work harder than anyone".
- If the candidate's real strengths do not match what the role needs, say so and suggest the closest honest match.
</constraints>

<output_format>
## Which strength
## Core answer
The script, then "Words: N".
## Variants
## Follow-ups
## Avoid
</output_format>
