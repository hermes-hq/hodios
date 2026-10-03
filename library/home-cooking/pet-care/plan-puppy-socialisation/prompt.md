---
schema: 1
id: plan-puppy-socialisation
kind: prompt
title: Plan puppy socialisation
description: Plans puppy socialisation during the key early weeks with a checklist of people, places, sounds and handling, done safely around vaccinations. Use when you have, or are about to get, a puppy.
category: pet-care
version: 1.0.0
status: incubating
stage: [plan, learn]
role: [individual, parent]
requires: [none]
inputs: [text]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: beginner
tags: [puppy, puppy-socialisation, puppy-training, dog-body-language, new-puppy]
pairs_with:
  prompts: [plan-new-pet-care, train-dog-behavior, plan-separation-anxiety-training]
  personas: [pet-care-advisor]
args:
  - name: puppy_age_weeks
    description: The puppy's age in weeks today, for example 9.
    type: number
    required: true
  - name: breed
    description: Breed or mix, if known, for example "Border Collie" or "Staffie cross". Optional; it changes the emphasis (guarding breeds need more strangers, herding breeds more moving things).
    type: string
  - name: home_context
    description: Where you live (city flat, rural house), who lives with you and visits (children, older people, other pets), the life the dog will have (office, cafes, car travel, farm animals, public transport), and vaccination dates if known. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Where your puppy is now, Safety and vaccinations, Checklist, Week-by-week plan, How to run each experience, Signs to slow down, Tracker]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan puppy socialisation the way a veterinary behaviourist and a force-free puppy class instructor would. The sensitive period for socialisation runs from about 3 to 12 to 14 weeks of age; what a puppy meets calmly in that window it tends to accept for life, and what it never meets it may fear. Socialisation means pleasant, controlled exposure, not as many encounters as possible: one frightening experience can undo several good ones. The puppy chooses whether to approach, distance keeps things easy, and every new thing is paired with something the puppy loves.

Vaccinations and socialisation have to be balanced. Veterinary behaviour bodies recommend starting socialisation before the vaccine course is complete, with precautions: carry the puppy in public places, avoid areas where unknown dogs toilet, meet only healthy, vaccinated, puppy-friendly adult dogs, and choose puppy classes that require a first vaccination and clean their floors. The vet confirms the local schedule and disease risks.

Puppy age: {{puppy_age_weeks}} weeks
{{#breed}}Breed: {{breed}}{{/breed}}
{{#home_context}}Home and life: {{home_context}}{{/home_context}}
</context>

<task>
1. Where your puppy is now: say what stage {{puppy_age_weeks}} weeks is. Under 8 weeks, the puppy should usually still be with its mother and litter, so explain what a good breeder or rescue should already be doing and what to ask them. Between 8 and 12 weeks is the prime time. Between 12 and 16 weeks the window is closing, so prioritise the biggest gaps. Over 16 weeks, say plainly that the main window has passed and switch to gradual, positive exposure and counter-conditioning at the dog's pace, recommending a qualified trainer if the dog is already fearful.
2. Safety and vaccinations: what is safe now and what to avoid until the vet says otherwise, and a reminder to confirm the schedule with the vet.
3. Checklist, tailored to the home, the future lifestyle and the breed: people (ages, children, beards, hats, uniforms, wheelchairs, walking sticks), animals (calm vaccinated adult dogs, cats, livestock at a distance if rural), places (car, vet visit just for treats, town, cafe, public transport if relevant), sounds (traffic, vacuum, doorbell, fireworks and thunder recordings at low volume), surfaces (grass, tiles, metal grates, stairs), handling (paws, ears, mouth, collar grab, brushing, nail trims, being lifted), and short spells alone and in a crate or pen.
4. Week-by-week plan from now until 16 weeks: three to five short new experiences a day, mixing easy and new, with rest days. Puppies need 18 to 20 hours of sleep, so keep outings short.
5. How to run each experience: start at a distance where the puppy is curious, not worried; treat as it notices the new thing; let it approach or not; keep it short; end on a good note.
6. Signs to slow down: body language that means stress (tail tucked, lip licking, yawning, whale eye, freezing, trying to hide, not taking treats) and what to do (calmly increase distance, comfort is fine, try an easier version another day). Never force or flood.
7. Tracker: a table the owner fills in.
</task>

<constraints>
- Never recommend dog parks, letting strangers crowd the puppy, or "toughening up" exposure. If the user proposes it, explain briefly why it backfires and give the safe version.
- Reward-based methods only; no punishment of fear, growling or mouthing.
- Do not give a vaccination schedule as fact; it is set by the vet for the region.
- Keep sessions to minutes, not hours.
</constraints>

<output_format>
## Where your puppy is now
## Safety and vaccinations
Two short lists: Safe now | Wait for the vet's go-ahead.
## Checklist
Grouped by category, with checkboxes.
## Week-by-week plan
A table: Week (age) | Focus | Example experiences.
## How to run each experience
## Signs to slow down
## Tracker
A table: Experience | Date | Reaction (happy, unsure, scared) | Next step.
</output_format>
