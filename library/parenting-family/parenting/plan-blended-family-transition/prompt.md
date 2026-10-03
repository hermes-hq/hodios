---
schema: 1
id: plan-blended-family-transition
kind: prompt
title: Plan a blended family transition
description: Plans the move into a blended family with realistic stages, adult roles, house rules, protected one-to-one time, scripts for loyalty conflicts and time for the couple.
category: parenting
version: 1.0.0
status: incubating
stage: [plan]
role: [parent]
subject: [psychology]
requires: [none]
inputs: [text]
output: [plan, table, script]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [blended-family, stepfamily, stepparent, step-siblings, moving-in-together, loyalty-conflict]
pairs_with:
  prompts: [plan-co-parenting, handle-sibling-conflict, plan-family-meeting]
  personas: [parenting-coach, relationship-coach]
args:
  - name: family_setup
    description: 'Who is coming together and how: which adult has which children, when you plan to move in or marry, where you will live, the custody pattern with other parents, and how long the children have known the new partner.'
    type: text
    required: true
  - name: children_ages
    description: Each child's age and whose child they are, for example "her son 7, my daughters 12 and 15".
    type: text
    required: true
  - name: concerns
    description: What worries you, for example "my 15-year-old refuses to talk to him", "different rules about screens", "the ex is unhappy". Optional.
    type: text
output_contract:
  format: markdown
  sections: [First, What to expect, Roles for each adult, House rules, One-to-one time, Loyalty conflicts, Siblings and space, The couple, Get support if]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help families come together as stepfamilies. Research and clinical experience with stepfamilies agree on a few things that run against intuition: blending usually takes years, not months; children are often grieving the old family and caught in loyalty binds even when they like the new adult; a stepparent who leads with warmth and builds a relationship first, while the biological parent stays responsible for discipline in the early stages, does far better than one who steps straight into enforcing rules; and protected one-to-one time between each parent and their own children reduces jealousy and loss. Younger children usually adapt faster; young teenagers often find it hardest.

<family_setup>
{{family_setup}}
</family_setup>

Children: {{children_ages}}
{{#concerns}}
<concerns>
{{concerns}}
</concerns>
{{/concerns}}
</context>

<task>
1. First: if anything suggests a child is afraid of an adult, is being harmed, or there is violence or control between adults, lead with protecting the child and point to child protection services, domestic-abuse services or the police. Then adapt the rest.
2. What to expect: stages most stepfamilies go through, in plain words, with what is normal at each (polite distance, testing, conflict, then gradual closeness), and a realistic time frame. Name what this family's mix of ages makes likely.
3. Roles for each adult: a table showing what each adult does early on and later, including the stepparent's early role as a friendly, supportive adult ("like a trusted aunt or coach") rather than an enforcer, how authority is handed over gradually, and how both adults back each other in front of the children without undermining the biological parent.
4. House rules: a short set of shared rules made at a family meeting, which ones are essential from day one (safety, respect, privacy, bedrooms and bathrooms), which can wait, and how to handle children who follow different rules in their other home.
5. One-to-one time: a weekly plan protecting time between each parent and their own children, and low-pressure shared activities for stepparent and stepchildren built around the child's interests.
6. Loyalty conflicts: what they look like at these ages, and scripts for the parent, the stepparent and for talking about the other biological parent ("You don't have to choose. You can love your dad and still get on with Sam"). Let children choose what to call the stepparent.
7. Siblings and space: room sharing, fairness, handling different custody schedules (children who are there part-time need their own space too), and how to step in when step-siblings clash.
8. The couple: protecting the relationship (regular time together, a weekly check-in on parenting issues away from the children) and how to handle disagreements about each other's children.
9. Get support if: when to seek a family therapist with stepfamily experience, the school counsellor, or the family doctor (a child's low mood, withdrawal, behaviour changes that last weeks).
</task>

<constraints>
- Do not take sides between the adults or criticise an absent parent; describe behaviour, not character.
- Keep the children's feelings central; never suggest forcing affection, forcing a child to call someone "Mum" or "Dad", or making a child choose between homes.
- Respect any existing custody arrangement; do not give legal advice about custody, moving or adoption by a stepparent, and suggest a family lawyer for those questions.
- Fit everything to each child's age and part-time or full-time presence.
- Use only the details given; mark assumptions and ask for missing facts that change the plan (who lives there when, how long they have known each other).
- Warm and realistic: reassure that difficulty is normal without promising quick results.
</constraints>

<output_format>
## First
One line, or the safety steps.
## What to expect
## Roles for each adult
Table: Adult | Early on | Later.
## House rules
## One-to-one time
Table: Who | What | When.
## Loyalty conflicts
Scripts in quotes, by who says them.
## Siblings and space
## The couple
## Get support if
</output_format>
