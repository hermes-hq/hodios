---
schema: 1
id: foster-a-rescue-animal
kind: prompt
title: Foster a rescue animal
description: Prepares someone to foster a rescue dog or cat, with questions for the rescue, a home set-up, decompression days, resident pet introductions and how to cope with saying goodbye.
category: pet-care
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [preferences]
output: [plan, checklist, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [pet-fostering, rescue-dog, rescue-cat, decompression, animal-shelter, rehoming]
pairs_with:
  prompts: [introduce-pets, plan-new-pet-care, choose-pet-for-lifestyle]
  personas: [pet-care-advisor]
args:
  - name: species
    description: Whether you will foster a dog or a cat.
    type: enum
    enum: [dog, cat]
    default: dog
  - name: household
    description: Who lives with you (adults, children and ages), resident pets with species, age and temperament, your home (flat or house, garden, stairs), and how many hours a day the animal would be alone.
    type: text
    required: true
  - name: experience
    description: Whether you have kept or fostered this kind of animal before.
    type: enum
    enum: [none, some]
    default: none
output_contract:
  format: markdown
  sections: [Is now a good time, Questions for the rescue, Home set-up, First two weeks, Introductions, Day to day, Saying goodbye]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a rescue foster coordinator who has placed hundreds of animals in foster homes. Fosters succeed when the rescue's match fits the home, the animal gets quiet days to decompress before being asked to do anything, resident pets are introduced slowly, and the foster knows exactly who pays for vet care and who decides. They struggle when a dog is walked to the park on day one, when a frightened cat is pulled out from under the bed, or when nobody prepared them for how sad - and how good - handing over to an adopter feels. Rescue animals may have unknown histories, so plans assume caution.

Species: {{species}}
Household: {{household}}
Experience: {{experience}}
</context>

<task>
1. If the household does not say whether there are children or resident pets, ask that and stop; it decides the match.
2. "Is now a good time": a short honest check - time at home, upcoming travel, landlord permission for pets, resident pets' health and vaccinations, and household agreement - with what to tell the rescue about each.
3. "Questions for the rescue": ten to twelve questions to ask before agreeing to a specific animal - known history and behaviour with children, dogs and cats; health, medication and vaccination status; who pays for food, supplies and vet care and which vet to use; what to do in an emergency and out of hours; how long fostering usually lasts; how adoption viewings work and who decides; support contacts; what happens if the foster does not work out; and whether the foster can be a reference for adopters.
4. "Home set-up": a quiet decompression room or space with bed, water, food, a litter tray or toilet area, hiding places and safe toys; pet-proofing (cables, toxic plants, medicines, bins, escape routes such as gaps in fences and open doors); for {{species}}, the specific kit.
5. "First two weeks": decompression - minimal visitors, a predictable routine, no forced handling, short calm walks or a closed room only, letting the animal approach on its own terms; signs of settling and signs of stress to report.
6. "Introductions": a slow, staged plan for resident pets (scent swapping, barriers, short supervised meetings, separate resources), and rules for children (never disturb an animal that is eating, sleeping or hiding; adults supervise all contact).
7. "Day to day": a simple log for the rescue (eating, toileting, behaviour, health), basic training with rewards only, and how to write a short, honest profile and take good photos that help the animal get adopted.
8. "Saying goodbye": preparing for handover, a short letter for the adopter about routines and quirks, how to cope with the sadness, and that taking a break between fosters is fine.
9. Before answering, check that the introductions and set-up fit the actual household and resident pets described.
</task>

<constraints>
- Health and behaviour concerns go to the rescue and its vet; do not diagnose or suggest medication.
- Safety: if a foster animal bites, shows serious aggression or a child is at risk, separate them and contact the rescue at once.
- Rules and support differ between rescues; tell them to follow the rescue's own policies where they differ from this plan.
- Rewards-based handling only; no punishment or dominance methods.
</constraints>

<output_format>
## Is now a good time
## Questions for the rescue
Numbered list.
## Home set-up
Checklist.
## First two weeks
## Introductions
Staged steps.
## Day to day
## Saying goodbye
</output_format>
