---
schema: 1
id: write-intimate-care-plan
kind: prompt
title: Write an intimate care plan
description: Drafts an individual intimate and personal care plan for a pupil who needs help with toileting, changing or hygiene at school, protecting dignity, privacy, safeguarding and growing independence.
category: special-education
version: 1.0.0
status: incubating
stage: [plan]
role: [teacher, parent]
requires: [none]
inputs: [notes, text]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
subject: [education-sector]
tags: [personal-care, toileting, dignity, safeguarding, independence-skills]
pairs_with:
  prompts: [break-down-life-skill-task, set-up-home-school-communication-book]
  personas: [special-education-advisor]
args:
  - name: pupil
    description: About the pupil (initials only) - age, what care is needed and how often, how they communicate consent, discomfort and preferences, what they can do themselves, equipment and facilities, cultural or religious preferences from the family, and any health care plan that covers medical aspects.
    type: text
    required: true
  - name: setting
    description: Country and school type. Optional; safeguarding expectations differ.
    type: string
output_contract:
  format: markdown
  sections: [The pupil's preferences, Care routine, Staff and privacy, Independence goals, Recording and communication, Safeguarding, Review]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a school write a plan for a pupil who needs help with intimate or personal care, such as toileting, changing continence products, menstrual care or washing. Done badly, intimate care is rushed, done by whoever is free, in a space without privacy, and talked about in front of other pupils; it can be distressing and leaves both pupil and staff vulnerable. Experienced practitioners write an individual plan agreed with the pupil and family: who provides care (named, trained, consistent staff), where, with what equipment, how the pupil's consent and preferences are sought each time, how they are told what is happening, how independence will grow, how care is recorded, and how the plan fits safeguarding procedures. Medical procedures such as catheter care or feeding tubes belong in a separate health care plan written with health professionals.

Pupil: {{pupil}}
{{#setting}}Setting: {{setting}}{{/setting}}
</context>

<task>
1. The pupil's preferences: how the pupil communicates consent, refusal and discomfort; preferred staff (including gender if relevant); language and words used for body parts and toileting agreed with the family; cultural or religious preferences.
2. Care routine: step-by-step routine including times or signs, the private location, equipment and supplies, and how the pupil is told what will happen before each step.
3. Staff and privacy: the number of staff present according to the school's policy and risk assessment (balancing privacy with protection), training required, cover arrangements, and how to keep other pupils from knowing details.
4. Independence goals: one or two steps the pupil can learn next (for example pulling up clothing, washing hands, asking for the toilet with a symbol), taught consistently.
5. Recording and communication: what is recorded each time, where, and how the family is informed (for example through the home-school book), without unnecessary detail.
6. Safeguarding: what staff do if they notice marks, injuries, signs of discomfort or changes in behaviour; the pupil's right to refuse or ask for a different adult; and what to do if a pupil is distressed.
7. Review: how often, and triggers for an early review (puberty, a new member of staff, a change in needs).
</task>

<constraints>
- Dignity first: write in respectful language, use initials only, and never describe the pupil's body beyond what the plan requires.
- Keep medical procedures out of this plan; refer to a health care plan written with health professionals.
- Safeguarding expectations, staffing ratios for intimate care and policy requirements differ by country and school; say to follow the school's own intimate care and safeguarding policies.
- Any concern about possible abuse goes to the designated safeguarding lead the same day; never investigate or question the pupil.
</constraints>

<output_format>
## The pupil's preferences
## Care routine
Numbered steps.
## Staff and privacy
## Independence goals
## Recording and communication
## Safeguarding
## Review
</output_format>
