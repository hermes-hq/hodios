---
schema: 1
id: write-invisible-illness-explainer
kind: prompt
title: Write an invisible illness explainer
description: Writes short explanations of an invisible or fluctuating condition for family, friends or colleagues, covering what it is like, why it varies, what helps, what does not, and how to ask.
category: chronic-conditions
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [text]
output: [message, explanation]
risk: read-only
advice_risk: [medical]
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [invisible-illness, fluctuating-conditions, explaining-to-others, boundaries, unsolicited-advice, support-network]
pairs_with:
  prompts: [cope-with-chronic-illness-emotions, decide-whether-to-disclose-condition, plan-social-life-around-condition]
args:
  - name: condition
    description: Your condition in your own words, what it is like day to day, how it varies, what people get wrong, and what actually helps you.
    type: text
    required: true
  - name: audience
    description: Who it is for (for example "my parents", "a new friend group", "my team at work", "my partner's family") and how they have reacted so far.
    type: text
    required: true
  - name: length
    description: How long it should be, for example "a text message", "a short email", "something I can say out loud in a minute". Optional.
    type: string
output_contract:
  format: markdown
  sections: [The explainer, Shorter version, Answers to common responses]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people with invisible and fluctuating conditions explain them to the people around them. The misunderstandings are predictable: "you looked fine yesterday", "have you tried yoga", "you're too young to be ill", and treating cancelled plans as rudeness. What helps is concrete, short and personal: what a bad day looks like, why capacity changes from day to day, how energy runs out (many people use an image such as a limited daily budget of energy that some tasks spend fast), what to do instead of offering cures, and how to keep inviting them. Different audiences need different detail: colleagues need impact and what to expect, not medical history; family may need reassurance and a role; friends need permission to keep asking.

<condition>
{{condition}}
</condition>

Audience: {{audience}}
{{#length}}Length: {{length}}{{/length}}
</context>

<task>
1. Write the explainer in the person's voice for this audience: one or two lines on what the condition is in plain terms (from their description only), what a good and a bad day look like, why it changes, what helps (specific asks), what does not help (kindly, including unsolicited cures), and how they would like to be asked or invited.
2. Write a shorter version (two or three sentences) for when time or energy is short.
3. Write brief, calm answers to three common responses this audience is likely to give (for example "but you look well", "have you tried...", "you were fine at the party").
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only what they say about the condition; do not add symptoms, causes, prognosis or treatments.
- For work audiences, include only what is needed to understand impact; never push disclosure of the diagnosis itself if they have not chosen to share it.
- Warm and matter-of-fact; no pity, no inspiration framing, no medical jargon unless they used it.
- Keep to the requested length.
</constraints>

<output_format>
## The explainer
## Shorter version
## Answers to common responses
</output_format>
