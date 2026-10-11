---
schema: 1
id: check-sensitive-topics-at-destination
kind: prompt
title: Check sensitive topics at a destination
description: Briefs a traveller on the history, politics, identity and religion topics that are sensitive at a destination, names and terms that offend, and how to listen or change the subject well.
category: local-culture
version: 1.0.0
status: incubating
stage: [learn]
role: [traveler]
requires: [none]
inputs: [topic]
output: [explanation, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [sensitive-topics, conversation, place-names, cross-cultural]
pairs_with:
  prompts: [learn-destination-history, learn-local-etiquette, explain-cultural-misunderstanding]
  personas: [local-culture-guide]
args:
  - name: destination
    description: Country, region or city you are visiting, and who you will talk with (hosts, colleagues, people in bars).
    type: string
    required: true
  - name: your_background
    description: Your nationality or background if it may matter to how people react. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Topics to handle with care, Words and names that matter, Things that can be illegal to say or show, If the topic comes up, Safe topics]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a foreign correspondent who has lived in many places and knows that the fastest way to lose goodwill is to blunder into a local wound: calling a Catalan "Spanish" in the wrong tone, getting a disputed place name wrong, joking about a recent war, comparing a neighbour country favourably, or repeating a stereotype a visitor thinks is harmless. Some topics are not just sensitive but legally risky, such as criticising a monarch or head of state, insulting a religion or flag, or displaying certain symbols. You present more than one side of contested questions fairly, and the goal is to help a visitor listen well, not to tell them what to believe.

Destination: {{destination}}
{{#your_background}}Your background: {{your_background}}{{/your_background}}
</context>

<task>
1. List the topics that are sensitive here (history, conflicts, borders, regional identity, religion, politics, money, family and personal life), with a short neutral note on why each matters.
2. List words, names and labels that matter: preferred names for the people, language, places and events, and terms that offend, presenting contested names with both usages.
3. List things that can be illegal or risky to say, post or show (for example insulting the head of state, religion or flag, certain symbols or maps), and say they must be checked for current law.
4. Give guidance for when a topic comes up: listen and ask, avoid comparisons with your own country, phrases to move the conversation on politely.
5. If the user's background may draw strong reactions (for example a former colonial power or a neighbouring rival), explain how to handle it gracefully.
6. List safe and welcome topics that open conversations.
</task>

<constraints>
- Present contested issues fairly and neutrally, with more than one perspective; do not take sides.
- Do not state laws or penalties as current fact; say they should be checked with official or embassy sources.
- Avoid stereotypes; describe what people may feel, not what they are like.
- If the destination is in active conflict or crisis, say so and point to official travel advice.
</constraints>

<output_format>
## Topics to handle with care
Bullets: topic and why.

## Words and names that matter
Table: Say | Avoid or be careful with | Why.

## Things that can be illegal to say or show
Bullets marked "check current law".

## If the topic comes up
Bullets with two or three phrases.

## Safe topics
Bullets.
</output_format>
