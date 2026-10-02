---
schema: 1
id: prepare-difficult-conversation
kind: prompt
title: Prepare for a difficult conversation
description: Prepares a difficult conversation with realistic goals, an opening line, the other person's likely view, phrases to use and responses to pushback, and points to help instead when safety is at risk.
category: interpersonal-communication
version: 1.0.0
status: experimental
stage: [plan]
role: [manager, individual, parent, founder]
requires: [none]
inputs: [text]
output: [plan, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [crucial-conversations, conflict-resolution, pushback, i-statements]
pairs_with:
  prompts: [give-feedback-sbi, apologize-effectively, mediate-disagreement]
args:
  - name: situation
    description: What the conversation is about, what has happened so far, and what worries you about raising it.
    type: text
    required: true
  - name: relationship
    description: "Optional: who the other person is to you, for example \"my direct report\", \"my landlord\", \"my brother\", \"a co-founder\"."
    type: string
  - name: desired_outcome
    description: "Optional: what you want to be true after the conversation, for example \"she stops cc'ing my boss on everything\" or \"we agree a plan for Mum's care\"."
    type: text
output_contract:
  format: markdown
  sections: [Goals, Their likely view, Opening, Phrases that help, If they push back, Avoid, If it goes badly, After]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Difficult conversations go wrong in predictable ways: the person goes in to win rather than to solve, opens with an accusation or a long preamble, treats their own story about the other person's motives as fact, and has no plan for the moment the other person gets defensive. Preparation that helps is concrete: a clear purpose, a short neutral opening, genuine curiosity about the other side, and a few phrases ready for the hard moments. The aim is a better outcome and a relationship that survives, not a perfect script.
</context>

<task>
Help me prepare for this conversation:
<situation>
{{situation}}
</situation>
{{#relationship}}The other person is: {{relationship}}.{{/relationship}}
{{#desired_outcome}}What I want afterwards: {{desired_outcome}}{{/desired_outcome}}

1. Safety first. If the situation involves violence, threats, coercive control, stalking or fear for anyone's safety, do not prepare a confrontation. Follow the safety guidance below and stop.
2. If the situation is too thin to know who the conversation is with or what it is about, ask up to three short questions and stop.
3. Goals: separate what I want for myself, for them and for the relationship. If no outcome was given, propose one. Check it is within my control (I can ask for a change; I cannot make them agree) and say what a realistic good result looks like.
4. Their likely view: write their side as they would tell it, as charitably as the facts allow, and list what they might be worried about. Separate what I actually observed from what I am assuming about their intentions.
5. Opening: two or three sentences I can say word for word that name the topic, my intent and an invitation to talk, without blame or a long build-up. Suggest the right time, place and medium.
6. Phrases that help: five to eight lines for describing facts and impact ("I" statements), asking questions, acknowledging their view without conceding the point, and proposing a next step.
7. If they push back: the four or five most likely reactions (denial, anger, tears, counter-accusation, silence, changing the subject) and a calm response to each.
8. What to avoid, and how to pause or end the conversation if it escalates.
9. After: how to confirm what was agreed and when to follow up.
</task>

<constraints>
- Fit everything to the relationship: what works with a direct report differs from a parent, a partner or a landlord. A manager has power the other person does not; account for it.
- Do not script manipulation, guilt-tripping, ultimatums I have not said I mean, or anything dishonest.
- If the situation involves workplace harassment, discrimination, a legal dispute or a tenancy or employment right, note once that HR, a union, a lawyer or an advice service may be the right route alongside or instead of the conversation.
- Keep each phrase short enough to say naturally.
{{> guardrails/crisis-safety}}
</constraints>

<output_format>
## Goals
For me, for them, for the relationship, and a realistic good outcome.
## Their likely view
Their side in their words, then "What I know" versus "What I'm assuming".
## Opening
The words to say, plus when and where.
## Phrases that help
Bullets.
## If they push back
A table: If they… | You can say…
## Avoid
Bullets, including how to pause the conversation.
## If it goes badly
How to end it well and what to do next.
## After
How to confirm agreements and follow up.
</output_format>
