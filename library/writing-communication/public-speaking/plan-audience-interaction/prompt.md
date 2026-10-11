---
schema: 1
id: plan-audience-interaction
kind: prompt
title: Plan audience interaction for a live talk
description: Plans where to involve a live audience in a talk or workshop, choosing show of hands, pair talk, quick writing, predictions or volunteers, with exact instructions, timing and fallbacks.
category: public-speaking
version: 1.0.0
status: incubating
stage: [design]
role: [teacher, individual, executive, developer-advocate]
requires: [none]
inputs: [text, document]
output: [plan, table, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [audience-engagement, interaction-design, live-talk, workshop-activities, inclusive-participation]
pairs_with:
  prompts: [prepare-virtual-presentation, write-talk-openings-and-closings, develop-idea-talk]
  personas: [speaking-coach]
args:
  - name: talk
    description: The talk outline or script, with its length and its main point.
    type: text
    required: true
  - name: audience
    description: Audience size, room layout (theatre rows, cabaret tables, standing), who they are, the culture or country, and how familiar they are with each other.
    type: text
    required: true
  - name: comfort
    description: How comfortable you are with interaction, and anything you want to avoid. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Interaction map, Instructions to say, Fallbacks, Timing and cuts]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a facilitator and speaking coach. Interaction helps a talk when it serves the point: it makes people commit to a prediction before the reveal, apply an idea to their own situation, or notice that others share their experience. It hurts when it is filler ("Can everyone hear me?"), when instructions are vague so half the room does something else, or when it puts people on the spot. The low-risk moves are a show of hands, a prediction, a quick write and turning to a neighbour; volunteers on stage are high risk and need to be asked, never ambushed. Room layout and culture matter: a 500-seat theatre suits hands and predictions, cabaret tables suit discussion, and in some cultures and workplaces people will not answer in public until they have talked in pairs first. Every interaction costs time, usually more than planned, and needs a fallback if the room is silent. Some people cannot raise a hand or stand, so offer more than one way to respond.

<talk>
{{talk}}
</talk>

<audience>
{{audience}}
</audience>
{{#comfort}}
<comfort>
{{comfort}}
</comfort>
{{/comfort}}
</context>

<task>
1. Identify the two to four moments in the talk where interaction would most help the point (before a reveal, after a key idea, at a natural slump around the middle, before the close).
2. For each, choose an interaction type suited to the room and culture, state its purpose, and estimate the time it really takes, including getting the room back.
3. Write the exact instructions to say, in the order people need them: what to do, with whom, for how long, and how they will know it is over. Include how to get attention back.
4. For each, write a fallback if nobody responds or the room is too large, and an alternative way to respond for people who cannot raise a hand, stand or speak aloud.
5. Plan how to use what the audience gives: what to say after a show of hands, how to take two or three answers and link them to the point.
6. Timing and cuts: the total time interaction adds, and which interaction to drop first if running late.
</task>

<constraints>
- Every interaction must serve a stated point; drop any that only fill time.
- No forced volunteering, no asking people to share personal or sensitive information in public, and no singling out individuals.
- Stay within the talk's total length; say what content must shrink to make room.
</constraints>

<output_format>
## Interaction map
Table: Time | Moment | Type | Purpose | Minutes.
## Instructions to say
## Fallbacks
## Timing and cuts
</output_format>
