---
schema: 1
id: handle-sibling-conflict
kind: prompt
title: Handle recurring sibling fights
description: Plans a calm approach to recurring sibling fights matched to the children's ages, covering likely causes, prevention, in-the-moment steps by severity, repair and when to get help.
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
tags: [siblings, sibling-rivalry, conflict-resolution, child-development, positive-discipline]
pairs_with:
  prompts: [plan-behavior-approach, prepare-child-for-new-sibling, create-chore-chart]
  personas: [parenting-coach]
args:
  - name: situation
    description: What the fights are about, how often, when and where they happen, how they escalate, how you respond now, and anything that has changed recently (new baby, move, school, separation).
    type: text
    required: true
  - name: ages
    description: The children's ages, for example "4 and 7", "twins, 10".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [What's driving it, Prevent it, In the moment, Repair, House rules, Start here, Get more help if]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help parents handle sibling conflict calmly and consistently. Some conflict between siblings is normal and is how children practise negotiating, sharing and repairing. It becomes a problem when it is constant, when one child is always on the losing side, or when it gets physical or cruel. Approaches that work share a few ideas: reduce competition for parental attention, avoid comparing and labelling, do not play judge for fights you did not see, coach children to solve problems themselves at a level that fits their age, step in firmly when anyone is being hurt, and help them repair afterwards.

Children's ages: {{ages}}

<situation>
{{situation}}
</situation>
</context>

<task>
1. What's driving it: from the situation, name the most likely drivers (competition for attention, unfairness or perceived favouritism, boredom, tiredness or hunger at certain times, different temperaments or developmental stages, a recent change, copying how adults argue). Say what is typical for these ages.
2. Prevent it: changes to the trigger times and places, one-to-one time with each child, ways to stop comparing ("treat each child uniquely, not equally"), clear ownership of special possessions, turn-taking systems, and teaching the skills they lack at calm times.
3. In the moment, by severity, with exact words for these ages:
   - **Bickering:** stay out, or acknowledge and express confidence they can sort it out.
   - **Heating up:** step in as a coach: describe each child's view without taking sides, state the problem, invite solutions, and agree one.
   - **Hurting or cruelty:** stop it immediately, separate, attend to the hurt child first, and deal with the other child calmly once everyone is calm.
   Include what not to do (asking "who started it", forcing an instant apology, punishing both identically without listening).
4. Repair: how to help them reconnect and make amends in an age-appropriate way, and how to follow up on agreements.
5. House rules: three to five short rules the family can agree, for example no hurting bodies or feelings, ask before borrowing, take a break when angry.
6. Start here: one or two changes for the next two weeks and what "better" looks like (shorter, less intense, more often solved without you, not never).
7. Get more help if: signs of sibling bullying or abuse (a persistent power imbalance, one child afraid of the other, injuries, sexualised behaviour), aggression that is escalating, or one child showing signs of distress at school or with sleep. Say who to talk to.
</task>

<constraints>
- No physical punishment, shaming, or comparing children with each other. Consequences, if any, are related and short.
- Fit the scripts to the ages: very young children need the adult to do most of the problem-solving; older children can be given more of it; teenagers need privacy and respect.
- If a large age gap or a disability is involved, adapt so the younger or more vulnerable child is protected and the older one is not made into a permanent babysitter.
- If anything suggests a child is being seriously hurt, sexually harmed or is unsafe, say clearly that it needs prompt professional help (the family doctor, a child protection service or the police) and do not frame it as ordinary rivalry.
- Do not diagnose. Plain language, no blame on the parent; offer options that fit different families.
- If the ages or situation are too vague, ask one or two questions after giving the general plan.
</constraints>

<output_format>
## What's driving it
## Prevent it
Bullets.
## In the moment
Three sub-sections by severity, each with steps and words to say in quotes, then a "Don't" line.
## Repair
## House rules
## Start here
## Get more help if
</output_format>
