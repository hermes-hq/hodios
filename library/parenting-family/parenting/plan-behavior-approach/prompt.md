---
schema: 1
id: plan-behavior-approach
kind: prompt
title: Plan a positive-discipline approach
description: Builds a positive-discipline plan for one specific child behaviour, matched to the child's age, with prevention, in-the-moment scripts, a shared caregiver response and what to try first.
category: parenting
version: 1.0.0
status: incubating
stage: [plan]
role: [parent]
requires: [none]
inputs: [text]
output: [plan, script, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [positive-discipline, tantrums, child-development, consistency]
pairs_with:
  prompts: [explain-hard-topic-to-child, create-chore-chart]
  personas: [parenting-coach]
args:
  - name: behavior
    description: The specific behaviour, for example "hits his sister when she takes his toys", "refuses to get off screens and slams doors".
    type: text
    required: true
  - name: child_age
    description: The child's age, for example "3", "18 months", "13".
    type: string
    required: true
  - name: context
    description: When and where it happens, recent changes (new sibling, move, new school), what you have tried, and who else cares for the child. Optional.
    type: text
output_contract:
  format: markdown
  sections: [What's going on, Prevent it, In the moment, Afterwards, Everyone responds the same way, Start here, Get more help if]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help parents respond to a difficult behaviour in a way that is calm, consistent and kind. Behaviour is usually communication: a need (attention, connection, control, escape from something hard, sensory relief) or a skill the child does not have yet, made worse by tiredness, hunger or change. Approaches with good evidence share the same ideas: connection before correction, preventing the triggers, teaching the skill to use instead, calm and predictable responses, and consequences that are related, respectful and reasonable. Physical punishment and shaming make behaviour worse over time and are never part of the plan.

Behaviour: {{behavior}}
Child's age: {{child_age}}
{{#context}}Context: {{context}}{{/context}}
</context>

<task>
1. Say whether this behaviour is common at {{child_age}} and what is realistic to expect at this age (for example, a 3-year-old cannot yet reliably control impulses when frustrated; a teenager needs a say in rules).
2. Using an antecedent–behaviour–consequence view, name the most likely needs behind it, based on the context. If the context is thin, give the two most likely and a one-week observation log so the parent can tell which applies.
3. Prevention: changes to routines, environment, warnings before transitions, and the replacement skill to teach and practise at calm times. Include daily one-to-one time led by the child (10–15 minutes) for under-10s, or regular low-pressure time together for older children.
4. In the moment: a short, step-by-step response with exact words to say, matched to the age. Safety first if anyone is being hurt. Say what the parent should not do.
5. Afterwards: how to reconnect and repair, and a related consequence only if one fits.
6. A consistency agreement all caregivers can follow.
7. What to try first: one or two changes for the next two weeks, what "better" looks like (less often, shorter, less intense, not never), and a warning that behaviour often gets briefly worse when an old pattern stops working.
8. When to get more help.
</task>

<constraints>
- Never suggest smacking or any physical punishment, threats, shaming, withdrawing affection, withholding food, or long isolation. Time-outs, if used, are short, calm and age-appropriate; "time-in" (staying close while the child calms down) is often better for young children.
- For babies under about 12 months, explain that discipline does not apply; focus on soothing, routines and the parent's own coping. Remind them never to shake a baby, and that it is safe to put a crying baby down in a safe place and step away for a few minutes.
- Do not diagnose (ADHD, autism, anxiety, oppositional defiant disorder). If the pattern suggests a developmental or emotional need, recommend the family doctor, paediatrician, health visitor or school.
- If anything suggests the child is unsafe, abused or neglected, or the parent fears they may hurt the child, say so directly and point to emergency services, child protection services or a parenting helpline in their country.
- Offer options that fit different family values; avoid verdicts on the parent. Plain language, no jargon.
- If the child's age is missing or unclear, ask for it.
</constraints>

<output_format>
## What's going on
Is it typical at this age, and the likely needs behind it.
## Prevent it
Bullets.
## In the moment
Numbered steps with the words to say in quotes, and a "Don't" line.
## Afterwards
## Everyone responds the same way
Table: Situation | What we say | What we do.
## Start here
The one or two changes, what better looks like, and how to track it.
## Get more help if
Specific signs and who to see.
</output_format>
