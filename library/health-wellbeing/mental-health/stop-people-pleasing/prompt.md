---
schema: 1
id: stop-people-pleasing
kind: prompt
title: Stop people-pleasing
description: Maps where you over-agree, the fear behind it and what it costs, then plans small practice steps in saying no and stating preferences, including how to handle the guilt that follows.
category: mental-health
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [individual]
requires: [none]
inputs: [text]
output: [plan, table, script]
risk: read-only
advice_risk: [mental-health]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [people-pleasing, saying-no, assertiveness, self-worth, behavioural-experiments]
pairs_with:
  prompts: [practice-assertive-responses, set-boundary, build-self-confidence, practice-self-compassion]
  personas: [supportive-listener]
args:
  - name: examples
    description: Recent times you said yes, agreed or stayed quiet when you did not want to, for example "covered a colleague's shift again", "said the restaurant was fine", "lent money I needed".
    type: text
    required: true
  - name: hardest_with
    description: Who it is hardest with, for example "my mum", "my manager", "new friends". Optional.
    type: text
output_contract:
  format: markdown
  sections: [Your pattern, What it costs you, The fear underneath, Practice ladder, Handling the guilt afterwards, Tracking progress]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help someone change a long-standing habit of people-pleasing: automatically agreeing, over-helping, hiding preferences and avoiding conflict to keep others happy. It is usually driven by beliefs such as "If I say no, they'll be upset or leave", "My needs matter less", or "Conflict is dangerous", often learned early. It brings short-term relief and approval but costs time, money, energy and honesty, breeds quiet resentment, and means others never learn what the person actually wants. Change works best as a set of small behavioural experiments: choose low-stakes situations first, predict what will happen, try a new response (stating a preference, a delay such as "Let me check and get back to you", or a kind no), and compare the prediction with what happened. Guilt and anxiety after saying no are expected; they are a sign of doing something unfamiliar, not of doing something wrong.

Examples: {{examples}}
{{#hardest_with}}Hardest with: {{hardest_with}}{{/hardest_with}}
</context>

<task>
1. Your pattern: a table from {{examples}}: situation, what they said or did, what they actually wanted, and what they felt in the moment. Add one or two common patterns to check for (automatic "sorry", offering help before being asked, never stating a preference).
2. What it costs you: the concrete costs across time, money, energy, relationships and self-respect, drawn from their examples.
3. The fear underneath: the likely beliefs and predictions driving the pattern, phrased as possibilities to test ("It may be that you expect…"), and the evidence for and against from their own life.
4. Practice ladder: eight to ten steps from easiest to hardest, starting very small (choosing the film, sending back a wrong order, saying "I'd prefer…"), then delays ("Let me check my diary"), then small no's, then the relationships they find hardest. For each, a short script and a prediction to write down beforehand.
5. Handling the guilt afterwards: what to expect, what to tell themselves, not to over-explain or retract, and how to handle pushback or a guilt trip in one calm repeated line.
6. Tracking progress: a simple log (step, prediction, what happened, how I felt, what I learned) and a reminder that progress is uneven.
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- If saying no could put them at risk (someone who is violent, controlling or threatening), say that safety comes first, that this is not a people-pleasing exercise, and point to domestic abuse or appropriate support.
- Do not encourage harshness, cutting people off or blanket refusal; the aim is honest choice, not never helping.
- Do not label them with a disorder or blame their upbringing; describe patterns.
- Keep scripts short, kind and in plain language.
</constraints>

<output_format>
## Your pattern
Table: Situation | What I said or did | What I actually wanted | What I felt.
## What it costs you
## The fear underneath
## Practice ladder
Table: Step | Situation | Script | My prediction.
## Handling the guilt afterwards
## Tracking progress
</output_format>
