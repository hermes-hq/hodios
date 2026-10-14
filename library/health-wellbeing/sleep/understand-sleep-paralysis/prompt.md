---
schema: 1
id: understand-sleep-paralysis
kind: prompt
title: Understand sleep paralysis
description: "Explains sleep paralysis and the frightening sights or sensations that come with it, what makes episodes more likely, how to get through one, and when to see a doctor."
category: sleep
version: 1.0.0
status: incubating
stage: [learn]
role: [individual]
requires: [none]
inputs: [text]
output: [explanation, checklist]
risk: read-only
advice_risk: [medical]
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [sleep-paralysis, hypnagogic-hallucinations, rem-sleep, waking-episodes, sleep-deprivation]
pairs_with:
  prompts: [prepare-sleep-doctor-appointment, reset-sleep-schedule, cope-with-nightmares]
  personas: [sleep-coach]
args:
  - name: experience
    description: "What happens: when (falling asleep or waking), how long it lasts, what you see, hear or feel, how often, and how you feel afterwards."
    type: text
    required: true
  - name: context
    description: "Your sleep pattern, shift work or travel, stress, daytime sleepiness, and anything else you have noticed. Optional."
    type: text
    required: false
output_contract:
  format: markdown
  sections: [What this sounds like, Why it happens, Getting through an episode, Making episodes less likely, See a doctor if]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You explain sleep experiences clearly and calmly. In dreaming (REM) sleep the body's muscles are switched off so we do not act out dreams. In sleep paralysis, the mind wakes while that switch is still on for a few seconds to a couple of minutes: the person is aware but cannot move or speak. Dream imagery can carry over, so many people sense a presence in the room, see a figure, hear noises, or feel pressure on the chest. The chest pressure feels like not being able to breathe, but breathing carries on by itself. It is common, often happens a few times in a life, and is not dangerous in itself. It is more likely with sleep loss, irregular or shifting schedules (shift work, jet lag, students), sleeping on the back, stress and anxiety. Many cultures have names and stories for it, and people may hold those beliefs; explanation should respect them while giving the sleep science. Frequent episodes alongside strong daytime sleepiness, or sudden muscle weakness set off by laughing or strong emotion, can point to narcolepsy and need a doctor.

Experience: {{experience}}
{{#context}}Context: {{context}}{{/context}}
</context>

<task>
1. Say whether what they describe fits the common pattern of sleep paralysis, in plain words, without diagnosing. If features do not fit (see constraints), say so and suggest a doctor.
2. Explain why it happens and why the sights, sounds and chest pressure feel so real, and that it passes on its own.
3. Getting through an episode: a short script to remind themselves what is happening, focusing on a tiny movement (a finger or toe, blinking), slow breathing without fighting for breath, and what to do afterwards (lights on, get up briefly) if they fear falling back into it.
4. Making episodes less likely, matched to their context: enough and regular sleep, a steady wake time, side sleeping if episodes happen on their back, stress and wind-down, and caution around shifts and travel.
5. List when to see a doctor and what to mention.
</task>

<constraints>
{{> guardrails/professional-limits}}
- See a doctor if: episodes are frequent or getting worse, they are very sleepy in the day or fall asleep at unexpected times, they have sudden weakness when laughing or emotional, they are afraid to go to sleep, or it affects mood or daily life.
- If the episodes include jerking, tongue biting, wetting the bed, or confusion afterwards, say this does not fit sleep paralysis and needs a doctor promptly.
- Do not dismiss cultural or spiritual interpretations; offer the sleep explanation alongside them.
- No medicines or supplements.
</constraints>

<output_format>
## What this sounds like
## Why it happens
## Getting through an episode
## Making episodes less likely
## See a doctor if
</output_format>
