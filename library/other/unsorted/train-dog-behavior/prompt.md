---
schema: 1
id: train-dog-behavior
kind: prompt
title: Train a dog behaviour
description: Plans reward-based training for a dog behaviour such as pulling, jumping up, barking or poor recall, with steps, session plans, progress checks and when to see a vet or behaviourist.
category: unsorted
proposed_category: pet-care
version: 1.0.0
status: incubating
stage: [plan, learn]
role: [individual, parent]
requires: [none]
inputs: [text]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: beginner
tags: [dog-training, positive-reinforcement, recall, leash-pulling, barking]
pairs_with:
  prompts: [plan-new-pet-care, prepare-vet-visit]
  personas: [pet-care-advisor]
args:
  - name: behavior
    description: The behaviour to change or teach, when and where it happens, how often, what you have tried, and what happens right before and after it.
    type: text
    required: true
  - name: dog_details
    description: Age, breed or mix, how long you have had the dog, health issues, daily exercise, and anything known about its history. Optional but changes the plan.
    type: text
output_contract:
  format: markdown
  sections: [What is likely going on, Safety and management, Training plan, Sessions, Progress checks, When to get help]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan dog training the way a certified, force-free trainer would: behaviour is understood through what triggers it and what rewards it, problems are managed first so the dog stops rehearsing them, and new behaviour is built with positive reinforcement in small, achievable steps. Many "behaviour problems" are normal dog behaviour in the wrong context, a training gap, a lack of exercise or enrichment, fear, or pain. Sudden changes in behaviour often have a medical cause.

Behaviour: {{behavior}}
{{#dog_details}}Dog: {{dog_details}}{{/dog_details}}
</context>

<task>
1. Check for red flags first. If the behaviour involves biting or serious aggression toward people or dogs, guarding with growling or snapping, a sudden change in an adult dog, signs of pain, or severe fear or panic when alone, say so first: recommend a vet check to rule out medical causes and a qualified behaviour professional (a veterinary behaviourist or a certified behaviour consultant), give immediate safety and management steps, and keep any training advice to safe basics.
2. If the description is too thin to plan (no idea when or where it happens), ask up to three questions and stop.
3. Explain what is likely going on in plain words: the trigger, what the dog gets out of the behaviour, and the dog's likely emotional state, marked as an interpretation.
4. Management: how to stop the dog rehearsing the behaviour while training happens (for example a front-clip harness for pulling, baby gates, closing curtains for window barking, a long line for recall).
5. Training plan: the alternative behaviour to teach instead, broken into 4 to 6 steps from easiest to real life, with the marker and reward to use, and how to raise difficulty using distance, duration and distraction one at a time.
6. Sessions: what to practise in short daily sessions (3 to 5 minutes, a few times a day), a sample week, and how to fit it into walks and daily life. Include enough exercise and enrichment for the dog's age and type.
7. Progress checks: what success looks like at one, two and four weeks, the signs to go back a step, and what to do when the dog gets it wrong (calmly reset, make it easier; never punish).
8. When to get help: specific signs the plan is not working or the problem needs a professional.
</task>

<constraints>
- Reward-based, force-free methods only. Never recommend shock, prong or choke collars, citronella or spray collars, alpha rolls, scruffing, shouting, or "dominance" explanations. If the user asks about one, say in two sentences why it is not used (it suppresses behaviour through fear or pain and can create new problems) and give the reward-based alternative.
- Suit the plan to the dog's age: short sessions and no forced exercise for puppies, gentle adjustments for seniors and dogs with health issues.
- Do not diagnose medical or psychological conditions or recommend medication; refer to a vet.
- Be honest about timelines: most behaviours take weeks of consistent practice.
</constraints>

<output_format>
## What is likely going on
## Safety and management
## Training plan
Numbered steps, each with the cue, what the dog does, the reward, and when to move on.
## Sessions
A sample week as a table: Day | Practice | Minutes.
## Progress checks
## When to get help
</output_format>
