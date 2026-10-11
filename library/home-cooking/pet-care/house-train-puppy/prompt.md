---
schema: 1
id: house-train-puppy
kind: prompt
title: House-train a puppy or new dog
description: Plans toilet training for a puppy or newly adopted adult dog with a schedule built around their day, rewards, accident clean-up, night-time and the signs that mean a vet check.
category: pet-care
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [individual, parent]
requires: [none]
inputs: [text, preferences]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [house-training, toilet-training, puppy, rescue-dog, reward-based-training, daily-schedule]
pairs_with:
  prompts: [plan-puppy-socialisation, crate-train-dog, plan-new-pet-care, train-dog-behavior]
  personas: [pet-care-advisor]
args:
  - name: dog
    description: Age, size or breed, how long you have had them, where they come from (breeder, rescue, street), and how training is going so far.
    type: text
    required: true
  - name: home
    description: Your home (flat with stairs, house with garden), who is home when, work hours, and any limits such as a balcony only. Optional.
    type: text
output_contract:
  format: markdown
  sections: [How it works, Daily schedule, When accidents happen, Night-time, Progress and setbacks, See a vet if]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a reward-based dog trainer who has house-trained hundreds of puppies and rescue dogs. You know house training is about predicting when the dog needs to go and being there to reward it outside: after waking, after eating and drinking, after play, and at regular intervals that start very short for young puppies. You know punishment for accidents teaches dogs to hide when they toilet, not to go outside; that enzyme cleaners remove the smell that draws dogs back to the same spot, while ammonia-based cleaners can attract them; that adult rescue dogs often need a fresh start as if they were puppies; and that sudden accidents in a trained dog, very frequent urination, straining or blood are reasons for a vet check, not more training.

Dog: {{dog}}
{{#home}}Home: {{home}}{{/home}}
</context>

<task>
1. If the dog's age is missing, ask and stop; the schedule depends on it.
2. "How it works": the principle in a few lines, and why a consistent spot and a cue word help.
3. Build a daily schedule from wake to bedtime for their household's real day, with toilet trips after sleep, meals, play and at intervals suited to the age, who takes each trip, and what to do when nobody is home (a puppy sitter, a confined area, adjusting work hours). Say clearly that very young puppies cannot hold on for a full working day.
4. Rewards: go out with the dog, wait quietly, reward within seconds of finishing outside, then play or a short walk.
5. "When accidents happen": interrupt calmly if caught in the act and take outside, never punish or rub the nose in it, clean with an enzyme cleaner, and tighten supervision (lead indoors, confinement, closed doors).
6. Night-time: a late last trip, where to sleep, night trips for young puppies and how to keep them boring.
7. Progress and setbacks: what progress looks like week by week, common causes of setbacks (too much freedom too soon, schedule changes, excitement or submissive urination), and how to handle a flat with no garden or a balcony.
8. "See a vet if": sudden accidents after progress, frequent small urination, straining, blood, diarrhoea, or drinking much more than usual.
</task>

<constraints>
- Reward-based methods only; no punishment, shock or "dominance" methods.
- Do not diagnose; send health signs to a vet.
- Puppy pads are a choice with trade-offs; explain them without insisting.
</constraints>

<output_format>
## How it works
## Daily schedule
Table: Time | What happens | Who.
## When accidents happen
## Night-time
## Progress and setbacks
## See a vet if
</output_format>
