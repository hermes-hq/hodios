---
schema: 1
id: handle-child-lying
kind: prompt
title: Handle a child who lies
description: Helps a parent respond to a child who lies, by age and reason, with what to say in the moment, how to make honesty safe, consequences that fit and when persistent lying needs outside help.
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
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [lying, honesty, child-behaviour, trust, consequences, parent-scripts]
pairs_with:
  prompts: [plan-behavior-approach, rehearse-parenting-moment, write-family-agreement-with-teen]
args:
  - name: child_age
    description: The child's age, for example "4" or "13".
    type: string
    required: true
  - name: situation
    description: What the lying looks like (what about, how often, recent examples), how you have reacted so far, and anything going on at home or school.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What is typical at this age, Why this child might be lying, In the moment, Making the truth safe, Consequences that fit, Seek outside help if]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help parents with lying, which is a normal part of development and not a sign of a bad child. Young children often mix wishes and facts, and the first deliberate lies (around ages 2 to 4) show a new thinking skill. Older children and teens lie mostly to avoid punishment or disappointment, to protect privacy, to fit in, or to get something. Harsh reactions to confessions teach children to lie better, not less. What tends to help: avoiding questions that set a trap when you already know the answer, stating what you know calmly, praising honesty especially when the truth is hard, separating the consequence for the act from the lie, and modelling honesty. Persistent lying with other worries, such as stealing, aggression, sudden changes in mood or secrecy about adults or online contacts, can signal something that needs a closer look.

<child_age>
{{child_age}}
</child_age>

<situation>
{{situation}}
</situation>
</context>

<task>
1. What is typical at this age: what lying usually looks like at this age and what in their description is typical or worth watching.
2. Why this child might be lying: two or three likely reasons from the situation (fear of punishment, wanting approval, protecting privacy, impulse, covering a struggle at school), and questions the parent can reflect on.
3. In the moment: calm phrases for when they know the truth ("I saw the broken cup. Let us work out how to fix it.") and when they are unsure, avoiding trap questions, name-calling and lectures. Adapt the wording to the child's age.
4. Making the truth safe: a family honesty plan with praise for owning up, a lighter consequence when a child tells the truth, a "do-over" chance, and modelling honesty including small adult lies.
5. Consequences that fit: link consequences to the behaviour the lie covered (repairing, making up lost time, losing a privilege linked to the issue), short and proportionate, with teen-specific ideas around trust being rebuilt step by step.
6. Seek outside help if: lying alongside stealing, aggression, self-harm, big mood or sleep changes, secrecy about an adult or online contact, or lying that is getting worse despite a steady approach; suggest talking to the child's school, doctor or a family support service. If anything suggests the child is at risk from someone, put that first.
</task>

<constraints>
- No shaming, physical punishment, threats or tricks to catch the child out.
- Do not diagnose any condition; describe when to seek help and from whom.
- If the age or examples are missing, give the general approach and ask for them.
</constraints>

<output_format>
## What is typical at this age
## Why this child might be lying
## In the moment
Table: Instead of | Try.
## Making the truth safe
## Consequences that fit
## Seek outside help if
</output_format>
