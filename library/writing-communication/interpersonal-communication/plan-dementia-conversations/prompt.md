---
schema: 1
id: plan-dementia-conversations
kind: prompt
title: Plan conversations with a relative with dementia
description: Prepares a family carer to talk with a relative living with dementia, with validation techniques and scripts for repeated questions, refusals, distress and confusion about the past.
category: interpersonal-communication
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
subject: [healthcare]
advice_risk: [medical]
requires: [none]
inputs: [text]
output: [script, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [dementia, alzheimers, validation-approach, family-carers, eldercare, carers]
pairs_with:
  prompts: [prepare-doctor-questions, prepare-difficult-conversation]
  personas: [communication-coach]
args:
  - name: situations
    description: "The moments you find hardest, in your own words, for example \"asks where Dad is every hour (he died in 2021)\", \"refuses to shower\", \"gets angry in the evening and wants to go home, but she is home\"."
    type: text
    required: true
  - name: relative_details
    description: Optional, who they are to you, their diagnosis if known, what they enjoy, their past work and routines, what calms them, and anything that sets them off.
    type: text
  - name: stage
    description: How far the dementia has progressed, if you know.
    type: enum
    enum: [early, middle, late, unsure]
    default: unsure
output_contract:
  format: markdown
  sections: [Principles for your situation, Scripts, Check first, When to call the doctor, Looking after yourself]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Dementia changes what a conversation can do. Correcting, arguing, reasoning and quizzing ("Don't you remember? I told you this morning") usually increase distress, because the person cannot hold the fact, but they do feel the embarrassment and conflict. Approaches carers find more effective meet the person in their reality: respond to the feeling behind the words (validation), keep sentences short with one question at a time, offer simple choices, use their name, approach from the front and at eye level, redirect gently to something they enjoy, and change the time, place or person rather than insisting. Behaviour is often communication: distress, refusal or agitation can signal pain, hunger, needing the toilet, being too hot or cold, overstimulation, tiredness or fear. A sudden change over hours or days is different from gradual decline and can signal delirium, often from an infection or medication, which needs prompt medical attention.
</context>

<task>
Help me communicate with my relative in these situations. Stage: {{stage}}.

<situations>
{{situations}}
</situations>
{{#relative_details}}
<relative_details>
{{relative_details}}
</relative_details>
{{/relative_details}}

{{> guardrails/professional-limits}}

1. First, check for urgent signs: a sudden change in confusion, alertness or behaviour over hours or days, a fall or injury, fever, not eating or drinking, new aggression that puts anyone at risk, or getting lost outside. If any are present, start the answer with what to do (contact their doctor today, an urgent care line, or emergency services if anyone is in danger), and then continue.
2. Give five to seven principles tailored to the stage and situations. For early stage, emphasise respect and involvement: the person may understand their diagnosis and want a say, so avoid talking over them or simplifying too much. For middle and late stages, emphasise validation, short sentences, choices of two, and non-verbal communication (tone, touch if welcome, music).
3. For each situation, write:
   - what may be going on, including unmet needs and feelings behind it;
   - two or three lines to try, in natural spoken words, using their name and details I gave (their past work, people, routines) where they help;
   - what to avoid saying, and why;
   - what to try if the first approach does not work (come back in 15 minutes, a different person, a different framing, a calming activity).
4. For confusion about the past, such as asking for a parent or spouse who has died: do not make the person relive the news of the death each time. Lead with the feeling ("You're thinking about your mum. Tell me about her."). Explain that families differ on whether to go along with the person's belief, and suggest the validating route first.
5. For refusals around personal care, medication or eating: keep dignity, offer choices, adjust timing and approach, and say when a repeated refusal should be raised with their doctor or care team (for example missed medication or weight loss).
6. Give a short "check first" list of needs to rule out before a difficult moment.
7. Close with support for me: carer burnout is common; suggest respite, carer support groups and the national dementia charity or helpline in my country, and ask which country if it is not clear.
</task>

<constraints>
- Speak about the person with dignity. No baby talk, no "they're not really there".
- Do not diagnose the type of dementia, suggest medication changes, or assess capacity; refer those to their doctor or care team.
- Use only the details I gave; do not invent their history. Use `[their favourite …]` placeholders where a personal detail would help.
- Keep scripts short enough to say calmly in a stressful moment.
{{> guardrails/crisis-safety}}
</constraints>

<output_format>
## Principles for your situation
Five to seven bullets.
## Scripts
For each situation, a bold heading, then: **What may be going on**, **Try saying** (quoted lines), **Avoid**, **If that doesn't work**.
## Check first
A short checklist of needs to rule out.
## When to call the doctor
Bullets of signs that need medical attention, with how urgent each is.
## Looking after yourself
Three to five bullets.
</output_format>
