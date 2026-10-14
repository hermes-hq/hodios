---
schema: 1
id: write-lost-child-plan-for-outings
kind: prompt
title: Write a lost-child plan for outings
description: Writes a family plan for getting separated in a crowded place such as a festival, beach, airport or theme park, with what each child does, contact details on them, and the adults' first ten minutes.
category: family-logistics
version: 1.0.0
status: incubating
stage: [plan]
role: [parent]
requires: [none]
inputs: [text, preferences]
output: [plan, checklist, script]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [child-safety, crowds, getting-separated, festivals, day-trips, practice-drills]
pairs_with:
  prompts: [write-family-emergency-plan, plan-theme-park-day, plan-family-trip]
args:
  - name: outing
    description: Where you are going and what it is like, for example "a music festival with 40,000 people over 2 days" or "a busy beach".
    type: string
    required: true
  - name: children
    description: Each child's age, whether they can say their name and a phone number, any additional needs (for example autism, non-verbal, wanders), and whether they have a phone.
    type: text
    required: true
  - name: adults
    description: How many adults are going and any phones or tracking already used. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Before you go, On the day, What each child does, The adults' first ten minutes, Practise it, Children with additional needs]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help parents prepare for the moment a child goes missing in a crowd. Most separations end within minutes, but those minutes go better when the child already knows exactly what to do and the adults already know who does what. Safety educators commonly teach children to stay where they are rather than wander looking, and to ask a specific kind of person for help (staff in uniform or with a lanyard, a security or information point, or a parent with children) rather than "never talk to strangers", which leaves a lost child with no one to ask. Young children often cannot remember a phone number under stress, so it should be on them. A photo taken that morning tells staff exactly what the child is wearing. Venues usually have a lost-child procedure; knowing where the meeting or information point is saves time.

Outing: {{outing}}
<children>
{{children}}
</children>
{{#adults}}Adults: {{adults}}{{/adults}}
</context>

<task>
1. Before you go: a checklist: find the venue's lost-child or information point and procedure, agree one meeting point that does not move (and a backup), bright or distinctive clothing, a fresh photo of each child in today's clothes, a phone number on each young child (wristband, written inside the sleeve or a card in a pocket), and a charged phone per adult.
2. On the day: how to stay together: a count at every transition, assigning each child to a named adult (not "everyone watching everyone"), and handover words ("you have Sam now") so nobody assumes.
3. What each child does: by age, a short instruction the child can remember, in child-friendly words: stop and stay, who to ask, show the number, older children go to the meeting point or call.
4. The adults' first ten minutes: one adult stays at the last spot, one alerts staff or security straight away with the photo, one checks the meeting point; call emergency services if the child is not found quickly or if the setting has water, roads or exits nearby. Say when to escalate without waiting.
5. Practise it: a two-minute rehearsal game to play at home and at the entrance on the day.
6. Children with additional needs: adjustments if given, such as an ID band that says the child is non-verbal or autistic and a calming approach, a tracker the family already uses, or staying within arm's reach in the most crowded parts.
</task>

<constraints>
- Do not tell parents to wait before alerting staff or emergency services; early alerts are right.
- Do not frame all strangers as dangerous; teach children who to ask.
- Never suggest a child's full name be shown visibly on clothing or bags; the parent's number is what matters.
- Do not invent the venue's procedures; tell the parent to find them.
</constraints>

<output_format>
## Before you go
Checklist.
## On the day
## What each child does
One short script per child in a code block.
## The adults' first ten minutes
Numbered steps.
## Practise it
## Children with additional needs
</output_format>
