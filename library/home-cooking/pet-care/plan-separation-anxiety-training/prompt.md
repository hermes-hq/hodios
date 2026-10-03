---
schema: 1
id: plan-separation-anxiety-training
kind: prompt
title: Plan separation anxiety training
description: Plans gradual training for a dog with separation distress using short absences, departure cues and tracking, and says when to involve a vet or behaviourist. Use when a dog panics alone.
category: pet-care
version: 1.1.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [text]
output: [plan, table, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [separation-anxiety, dog-training, home-alone, dog-behaviour, desensitisation]
pairs_with:
  prompts: [train-dog-behavior, prepare-vet-visit, plan-pet-enrichment]
  personas: [pet-care-advisor]
args:
  - name: dog_details
    description: Age, breed or mix, how long you have had the dog, history (rescue, rehomed, recent move), health issues, and daily exercise.
    type: text
    required: true
  - name: current_behavior
    description: What happens when the dog is left or about to be left (howling, barking, chewing doors, toileting, drooling, pacing, escape attempts), how soon after you leave it starts, and whether you have filmed it.
    type: text
    required: true
  - name: schedule
    description: How often and how long the dog is currently left alone, your working pattern, and who could help (family, friends, a sitter, daycare). Optional but shapes the plan.
    type: text
output_contract:
  format: markdown
  sections: [Safety first, Is this separation distress, Right now - cover absences, Find the starting point, Training plan, Support the plan, Daily log, When to bring in a vet or behaviourist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.1.0, note: "Adds a Safety first section that leads when there are red flags and a Support the plan section, so every step of the task has a place in the reply."}
---
<context>
You plan training the way a certified separation anxiety trainer working with a vet would. A dog with separation distress is panicking, not being naughty or getting revenge. Treatment rests on two things: stopping the dog from being left beyond what it can cope with while training happens (otherwise each panic undoes progress), and gradual desensitisation, where the dog practises being alone for durations short enough that it stays relaxed, increased in small steps. Progress is measured in seconds and minutes, is rarely a straight line, and usually takes months. Many dogs with moderate or severe distress do better when a vet adds medication alongside training; that is the vet's decision.

Similar-looking problems have different fixes: boredom or too little exercise, incomplete house training, noise fears, frustration at a barrier, or a medical cause such as incontinence or pain. Filming the dog alone is the best way to tell them apart.

Dog: {{dog_details}}
Behaviour when left: {{current_behavior}}
{{#schedule}}Schedule and help: {{schedule}}{{/schedule}}
</context>

<task>
1. Red flags first. If the dog injures itself, breaks teeth or nails on crates or doors, tries to get through windows, or panics in a crate, say this needs a vet and a qualified behaviour professional soon, stop crating if the crate is involved, and give immediate safety steps before anything else.
2. Is this separation distress? Ask the owner to film 20 to 30 minutes of an absence if they have not, say what to look for, and list the other explanations with the sign that points to each. If the evidence points elsewhere, say so and give the right direction briefly.
3. Right now, cover absences: a practical plan, built from the schedule, for the dog not to be left beyond its limit during training (family, friends, sitter, daycare if the dog copes there, taking the dog along, adjusting hours), and honest about the cost of not doing this.
4. Find the starting point: how to measure how long the dog stays relaxed after you leave, using the video, and set the first training duration well below it.
5. Training plan: one session a day of a few short absences, starting under the threshold; desensitising departure cues (keys, shoes, coat) separately; how to step up (small increases, with easy repeats mixed in), what to do when the dog shows stress (go back to the last easy duration), a rest day each week, and calm, low-key departures and returns.
6. Support the plan: exercise and sniffing before sessions, a comfortable resting place, food toys only if the dog eats them when alone (stopping eating is a stress sign), and routine.
7. Daily log template and how to read it.
8. When to bring in a vet or behaviourist: the signs, and which credentials to look for (veterinary behaviourist, certified separation anxiety trainer, certified behaviour consultant). Medication is a conversation with the vet, not something you recommend.
</task>

<constraints>
- No punishment, bark collars, citronella or shock devices, and no "let them cry it out". If asked, explain in two sentences why they make panic worse.
- Do not suggest getting a second dog as a fix; it rarely helps a dog that is attached to people, and say so if the user raises it.
- Do not name or dose medicines or supplements.
- Be honest about timelines and that some dogs always need some cover.
</constraints>

<output_format>
## Safety first
Only when a red flag from step 1 is present: the immediate safety steps, in bold, before everything else. Omit the section otherwise.
## Is this separation distress?
## Right now - cover absences
## Find the starting point
## Training plan
Numbered steps with the rule for moving up and going back.
## Support the plan
## Daily log
A table: Date | Planned duration | Actual | Dog's state (relaxed, mild, stressed) | Notes.
## When to bring in a vet or behaviourist
</output_format>
