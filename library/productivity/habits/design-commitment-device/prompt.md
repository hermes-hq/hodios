---
schema: 1
id: design-commitment-device
kind: prompt
title: Design a commitment device
description: Designs a commitment device for a goal you keep putting off - the right type of lock-in, stakes that motivate without harm, a fair referee and verification, and an exit for real emergencies.
category: habits
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, student, founder, writer]
requires: [none]
inputs: [topic, preferences, text]
output: [plan, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
depth: specific
tags: [commitment-devices, precommitment, temptation-bundling, stakes, behavioural-economics]
pairs_with:
  prompts: [set-up-accountability-partnership, beat-procrastination, set-woop-goals]
  personas: [productivity-coach]
args:
  - name: goal
    description: What you want to do or stop doing, what usually gets in the way, and what you have tried.
    type: text
    required: true
  - name: preferences
    description: Optional - what motivates you (money, pride, people, rewards), what you would not want to risk, and who could act as a referee.
    type: text
output_contract:
  format: markdown
  sections: [Where you slip, Device options, Your device, Commitment card, Review]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A commitment device is a choice made now that makes a future temptation harder or costlier, because the present self knows the future self will be tempted. Behavioural economics research describes several types: removing the option (no snacks in the house, website blockers), adding a cost (money lost to a cause or friend if you miss), social stakes (public commitment, a referee), and pairing a "should" activity with a "want" (temptation bundling, for example only listening to a favourite podcast at the gym). Devices fail when stakes are too small to matter or so large they cause harm, when the person is their own referee, when the target is vague, or when there is no allowance for genuine emergencies, which leads people to abandon the device entirely. Devices work best for people who already want the change and know they will be tempted.

<goal>
{{goal}}
</goal>
{{#preferences}}
Preferences:
<preferences>
{{preferences}}
</preferences>
{{/preferences}}
</context>

<task>
1. Identify the moment of slipping: when, where and in what state the person gives in. If the goal or the slip is unclear, ask up to two questions and stop.
2. Offer four or five device options of different types (remove the option, add a cost, social stakes, temptation bundling, a default change), each tailored to that moment, with pros and cons for this person.
3. Recommend one device or a combination, sized so the stakes motivate but cannot cause real harm.
4. Define the rules: a precise, verifiable target; who verifies (not the person alone); how evidence is shared; what happens on a miss; and a short list of genuine emergencies that pause the device.
5. Write a commitment card the person can copy and sign or share with the referee.
6. Set a review date to check whether the device helps or causes stress, and how to adjust.
</task>

<constraints>
- Keep financial stakes to amounts the person says they can afford to lose; never suggest stakes involving debt, health, safety, relationships at real risk, or anything illegal.
- Do not recommend specific commercial apps or services as the solution; describe tool types.
- Avoid punishing or shaming stakes; public commitment is opt-in.
- If the goal relates to substance use, eating or self-harm, suggest professional support instead of a stakes-based device.
</constraints>

<output_format>
## Where you slip
Two or three lines.

## Device options
Table: Option | Type | How it would work for you | Pros | Cons.

## Your device
The recommendation and why.

## Commitment card
A quote block: target, period, referee, evidence, consequence of a miss, emergencies, signature lines.

## Review
Review date and questions to ask then.
</output_format>
