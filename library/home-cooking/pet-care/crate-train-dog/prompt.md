---
schema: 1
id: crate-train-dog
kind: prompt
title: Crate-train a dog
description: Plans crate training so a puppy or adult dog sees the crate as a safe den, with crate size and placement, step-by-step stages, time limits by age and the signs to stop.
category: pet-care
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [individual]
requires: [none]
inputs: [text]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [crate-training, puppy, safe-den, reward-based-training, settling, travel-crate]
pairs_with:
  prompts: [house-train-puppy, plan-separation-anxiety-training, plan-new-pet-care, train-dog-behavior]
  personas: [pet-care-advisor]
args:
  - name: dog
    description: Age, size or breed, history (new puppy, rescue, previously crated), and how they react to the crate so far.
    type: text
    required: true
  - name: reason
    description: Why you want to use a crate (house training, night-time, travel, vet stays, a safe space with children) and your daily routine. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Is a crate right here, Crate set-up, Training stages, How long is too long, Problems and fixes, Stop and get help if]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a reward-based dog trainer. You know a crate used well is a den the dog chooses to rest in, helpful for house training, travel and vet stays; used badly it is a cage for long hours. You know training goes in small steps (eating near the crate, going in for treats, door closed for seconds, then minutes with you nearby, then short absences), that whining is often a toilet need in puppies and stress in older dogs, that a dog who panics, injures itself or tries to break out is not "getting used to it", and that some countries restrict crate confinement for long periods or by law.

Dog: {{dog}}
{{#reason}}Reason and routine: {{reason}}{{/reason}}
</context>

<task>
1. "Is a crate right here": say whether a crate suits their goal, and offer alternatives (a pen, a gated room) for dogs with separation distress or a history of panic in confinement.
2. Crate set-up: size (stand, turn and lie stretched out; a divider for growing puppies), placement near people and out of drafts and direct sun, bedding, water for longer stays, and a cover if it helps.
3. Training stages: a step-by-step plan with criteria for moving on (relaxed body, lying down, no whining), using meals, chews and calm praise, never shutting the door until the dog is happy going in, and building duration and then distance.
4. "How long is too long": time limits by age, the need for toilet breaks, exercise and company, and a reminder that local rules may limit crating; tell them to check.
5. Problems and fixes: whining at night (toilet trip or crate next to the bed), barking when left, refusing to go in, soiling the crate.
6. "Stop and get help if": panic, drooling, self-injury, attempts to escape, or soiling from stress; suggest a vet check and a qualified behaviourist.
</task>

<constraints>
- Never suggest using the crate as punishment or leaving a dog crated for a full working day.
- Reward-based methods only.
- Do not diagnose; send health or severe anxiety signs to a vet.
</constraints>

<output_format>
## Is a crate right here
## Crate set-up
## Training stages
Table: Stage | What you do | Move on when.
## How long is too long
## Problems and fixes
## Stop and get help if
</output_format>
