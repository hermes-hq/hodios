---
schema: 1
id: rephrase-with-nonviolent-communication
kind: prompt
title: Rephrase with nonviolent communication
description: Rewrites what you want to say to a partner, relative, friend or colleague as observation, feeling, need and request, flagging the judgements and demands hidden in your original wording.
category: interpersonal-communication
version: 1.0.0
status: incubating
stage: [build, review]
role: [individual, parent, manager]
requires: [none]
inputs: [text, message]
output: [rewrite, explanation]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [nonviolent-communication, i-statements, requests, conflict-resolution, rewording]
pairs_with:
  prompts: [give-feedback-sbi, check-tone-before-sending, clear-up-misunderstanding]
  personas: [communication-coach]
args:
  - name: draft
    description: What you want to say, as you would say it now, however blunt or angry.
    type: text
    required: true
  - name: recipient
    description: "Who it is for, for example \"my partner\", \"my teenage son\", \"a housemate\", \"my colleague\"."
    type: string
    required: true
  - name: channel
    description: How you will say it.
    type: enum
    enum: [spoken, text-message, email]
    default: spoken
output_contract:
  format: markdown
  sections: [What is in your draft, The four parts, Rewritten, If they react]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Nonviolent communication (NVC), developed by Marshall Rosenberg, breaks a message into four parts: an observation a camera could record, without evaluation ("the dishes have been in the sink since Sunday", not "you never clean"); a feeling, which is an emotion, not a thought about the other person ("I feel frustrated", not "I feel ignored" or "I feel like you don't care", which are interpretations); a need, a universal value such as rest, order, respect or connection, not a strategy involving them; and a request that is specific, doable, positive (what you want, not what you want them to stop) and genuinely open to no, otherwise it is a demand. Done mechanically it sounds scripted and therapeutic, which some people find patronising. The skill is to keep the four parts and say them in your own natural voice.
</context>

<task>
Help me rephrase this for {{recipient}}, to be said as: {{channel}}.

<draft>
{{draft}}
</draft>

1. Safety first. If the draft describes abuse, threats or fear of the other person, say gently that the problem is not the wording, follow the safety guidance below and stop.
2. Go through my draft and flag what gets in the way: evaluations or labels ("lazy", "selfish"), always/never words, interpretations dressed as feelings ("I feel disrespected"), blame, and demands disguised as requests. Quote each one.
3. Lay out the four parts: the observation, my likely feelings (offer two or three to choose from), the needs underneath, and a clear, doable request. If I seem to have several issues, pick the main one and say the rest can wait.
4. Write the message in natural, everyday language that keeps the four parts but does not sound like a textbook. Fit length to the channel (spoken: under about 50 words; text: under about 60; email: short paragraphs).
5. Give a short, more casual alternative, and two or three replies for if they get defensive or say no, including how to listen for their feelings and needs.
</task>

<constraints>
- Do not judge me for the original draft; it is a starting point.
- Keep my meaning and my request; do not soften it into something I did not ask for.
- Avoid therapy jargon and the words "observation", "feeling", "need", "request" in the final message itself.
- A request must be specific and something the person can say yes or no to.
{{> guardrails/crisis-safety}}
</constraints>

<output_format>
## What is in your draft
Table: Your words | What gets in the way.
## The four parts
Observation, feeling, need, request, one line each.
## Rewritten
The main version, then a casual alternative.
## If they react
Table: If they say… | You can say…
</output_format>
