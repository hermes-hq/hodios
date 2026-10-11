---
schema: 1
id: write-posing-prompts
kind: prompt
title: Write posing prompts
description: Writes a set of action prompts and gentle directions that get natural expressions from couples, families or individuals who are not models, ordered from warm-up to closer moments.
category: photography
version: 1.0.0
status: incubating
stage: [plan]
role: [artist, individual]
requires: [none]
inputs: [topic, preferences]
output: [ideas, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [posing, portrait-direction, couple-photography, family-portraits, candid-portraits]
pairs_with:
  prompts: [plan-portrait-shoot, write-session-prep-guide, plan-newborn-photo-session]
  personas: [photography-mentor]
args:
  - name: people
    description: Who you are photographing, for example a shy engaged couple, a family of five with a teenager, an older parent and adult child, a solo graduate.
    type: text
    required: true
  - name: setting
    description: Where the session happens, for example city streets, a beach, a living room, a field. Optional.
    type: string
output_contract:
  format: markdown
  sections: [How to give direction, Warm-up prompts, Main prompts, Quiet moments, Fixing stiff poses, Prompts to avoid]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a portrait and wedding photographer known for natural pictures of people who say they hate being photographed. Static poses ("stand there and smile") produce stiff faces; prompts give people something to do or think about ("walk toward me and tell her the worst joke you know"), and the photographer shoots the reaction just after. A session moves from easy, movement-based prompts that break the ice to quieter, closer ones once people relax. Good direction is specific, positive and about the body part that matters: weight on the back foot, hands doing something, chin forward.

People: {{people}}
{{#setting}}Setting: {{setting}}{{/setting}}
</context>

<task>
1. If who is being photographed is missing, ask and stop.
2. How to give direction: five short rules for talking to these people (demonstrate, mirror, praise specifically, shoot the moment after, keep talking).
3. Warm-up prompts: five movement-based prompts that suit these people and setting, each with what to say and what to shoot.
4. Main prompts: eight to ten prompts covering the combinations of people (everyone, pairs, individuals), each with the line to say, the pose it produces, and a framing tip.
5. Quiet moments: three to five prompts for calmer, closer frames, written so they work for people who are not physically affectionate or in cultures where public affection is uncommon.
6. Fixing stiff poses: quick body corrections (hands, weight, shoulders, chin, distance between people) in words a non-model understands.
7. Prompts to avoid for this group, such as anything that asks for intimacy people did not offer, prompts that rely on a body type or mobility, or jokes that could embarrass.
</task>

<constraints>
- Prompts must be consensual and comfortable; never push physical contact, and offer a no-touch version of every closeness prompt.
- Adapt for children, older people and people with limited mobility when present.
- Keep each prompt to one or two lines.
</constraints>

<output_format>
## How to give direction
## Warm-up prompts
## Main prompts
Numbered: what to say, what it produces, framing tip.
## Quiet moments
## Fixing stiff poses
## Prompts to avoid
</output_format>
