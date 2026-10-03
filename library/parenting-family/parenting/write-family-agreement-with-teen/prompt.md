---
schema: 1
id: write-family-agreement-with-teen
kind: prompt
title: Write a family agreement with a teen
description: Writes a family agreement with a teenager about phones, curfew, driving or chores, negotiated together, with clear privileges, fair consequences, parents' commitments and a review date.
category: parenting
version: 1.0.0
status: incubating
stage: [plan]
role: [parent]
requires: [none]
inputs: [text, preferences]
output: [plan, script, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [teenagers, family-agreement, curfew, phone-rules, teen-driving, collaborative-problem-solving]
pairs_with:
  prompts: [set-screen-time-plan, talk-to-teen-about-online-safety, create-chore-chart]
  personas: [parenting-coach]
args:
  - name: topics
    description: What the agreement should cover and what is going wrong now, for example "phone at night, curfew on weekends, using the family car, helping with dinner"; include any rules already in place.
    type: text
    required: true
  - name: teen_age
    description: The teenager's age in years.
    type: number
    required: true
  - name: family_values
    description: What matters most to you and anything the teen has already said they want, for example "trust, safety, honesty; she wants a later curfew and to keep her phone overnight". Optional.
    type: text
output_contract:
  format: markdown
  sections: [Before you sit down, How to run the conversation, The agreement, If it is broken, Review and sign]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help parents and teenagers write family agreements that both sides actually keep. Teenagers follow rules they helped make far more than rules handed down, and their growing need for autonomy is a normal developmental task, not defiance. Agreements work when they are specific ("phone charges in the kitchen from 10pm on school nights"), link freedom to demonstrated responsibility, state consequences in advance that are proportionate and related to the rule, include what the parents commit to as well, and come up for review on a set date. A "no questions asked" safety pickup clause makes it more likely a teen calls when a situation goes wrong.

Teen's age: {{teen_age}}

<topics>
{{topics}}
</topics>
{{#family_values}}
<family_values>
{{family_values}}
</family_values>
{{/family_values}}
</context>

<task>
1. Before you sit down: help the parents agree with each other first. For each topic, list the non-negotiables (safety and legal limits), the parts that are open to negotiation, and what the parents might offer. Suggest a calm time and how to invite the teen ("We'd like to agree some new rules together, and we want your ideas first").
2. How to run the conversation: a short script using collaborative problem-solving: each side says what concerns them about the topic, the teen proposes first, both look for options that meet both sets of concerns, then write it down. Include what to say if the teen gets defensive or refuses, and how to pause and come back.
3. The agreement: draft it in plain, respectful language addressed to the whole family, one section per topic. For each section: what we agree (specific times, places and numbers, with blanks marked [to agree] where the teen's input is needed), the privilege it earns or how it can expand ("after a month of being home on time, curfew moves to 11pm"), and what the parents commit to (for example, phones away at dinner too, a reminder text instead of a lecture, the safety pickup).
4. If it is broken: a short ladder of consequences agreed in advance, proportionate and connected to the rule (a late return means an earlier curfew next weekend, not losing the phone for a month), plus how to talk about a slip without a fight. Separate everyday slips from safety breaches such as drink-driving or being somewhere unsafe, which get a direct conversation first.
5. Review and sign: a review date (usually four to eight weeks), what to look at, how the teen can ask to renegotiate, and a signature line for everyone.
</task>

<constraints>
- Fit the age: at 13 more structure, at 17 more self-management as practice for leaving home.
- Driving rules depend on local law (licence stages, passenger and night limits, insurance); include the legal limits as "check your local rules" and never set a rule weaker than the law.
- Phone sections favour transparent rules over covert monitoring. If a parent wants to secretly read all messages, explain the cost to trust and suggest open alternatives, unless there is a specific safety concern (contact with an adult stranger, self-harm, exploitation), in which case safety comes first and the teen should usually be told what is being checked.
- No humiliating, physical or food-related punishments, and no consequences that remove the teen's ability to call for help.
- If the topics reveal self-harm, substance dependence, violence at home or a teen in danger, say that this needs more than an agreement and point to the family doctor, school counsellor or local crisis services.
- Use the details given; mark anything you assumed.
</constraints>

<output_format>
## Before you sit down
Table: Topic | Non-negotiable | Open to negotiation | What we can offer.
## How to run the conversation
Steps with words in quotes.
## The agreement
A ready-to-print draft with a heading per topic: We agree / This earns / We (the parents) will.
## If it is broken
## Review and sign
</output_format>
