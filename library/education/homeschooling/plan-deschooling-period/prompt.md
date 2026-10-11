---
schema: 1
id: plan-deschooling-period
kind: prompt
title: Plan a deschooling period
description: Plans the first weeks after a child leaves school for homeschooling - a gentle decompression period with a light rhythm, low-pressure learning and signs for when to add structure.
category: homeschooling
version: 1.0.0
status: incubating
stage: [plan]
role: [parent]
requires: [none]
inputs: [preferences]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [deschooling, leaving-school, decompression, school-anxiety, transition, low-pressure-learning]
pairs_with:
  prompts: [choose-homeschool-approach, plan-homeschool-year]
args:
  - name: child_situation
    description: Child's age, why they are leaving school (bullying, anxiety, unmet needs, family choice), how they are now (sleep, mood, interest in learning), and what they enjoy.
    type: text
    required: true
  - name: family_situation
    description: Who is home and when, parent worries, any legal requirements or deadlines you know about where you live, and siblings still in school.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What deschooling is for, Length and shape, Daily rhythm, Learning without lessons, Looking after the parent, When to add structure]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You support families who have just taken a child out of school. You know that children who leave school after a hard time often resist anything that looks like school, and that pushing a full curriculum straight away can recreate the stress that led to leaving. A deschooling period lets the child rest, recover curiosity and sleep, and lets the parent observe how the child actually learns. It is not doing nothing: a gentle daily rhythm, reading aloud, conversation, outings, play and interests all count as learning, and they give evidence for later records. A common rule of thumb is a period measured in weeks to a few months, but the right length depends on the child and on any legal requirements, which vary by place. Parents also deschool: they often feel anxious that the child is "falling behind" and need markers to know things are going well.

Child: {{child_situation}}
Family: {{family_situation}}
</context>

<task>
1. What deschooling is for: explain in a short paragraph, in plain language for this family, what the period is meant to achieve and what it is not.
2. Length and shape: suggest a provisional length with the reasoning, split into phases (rest and recovery, rediscovering interests, gentle rhythm), and check it against any requirements or deadlines given. If none were given, list the questions to ask the education authority (for example notification and when learning must start being shown).
3. Daily rhythm: a light, predictable day (wake time, outdoor time, read-aloud, free time, one shared activity, household jobs, screen limits agreed with the child) that adapts to the child's mood and energy.
4. Learning without lessons: ideas tied to the child's interests that build reading, writing, maths and knowledge naturally (cooking, games, documentaries, library visits, building, nature), and a simple way for the parent to note what happened each day for later records.
5. Looking after the parent: reassurance grounded in what to observe, ways to handle comments from relatives, and a weekly reflection prompt for the parent.
6. When to add structure: signs the child is ready (asking questions, boredom, interest in a skill), how to introduce one short structured session at a time, and warning signs that need outside help.
</task>

<constraints>
- If the description suggests depression, self-harm, serious anxiety, school refusal with physical symptoms, or bullying-related trauma, advise speaking to a doctor or mental health professional, and give the crisis guidance below.
{{> guardrails/crisis-safety}}
- Do not state legal requirements for any place; ask or point to the official education authority.
- Do not diagnose the child.
- Do not shame the school, the child or the parent; keep the tone calm and practical.
</constraints>

<output_format>
## What deschooling is for
## Length and shape
## Daily rhythm
A table: Time | Activity | Notes.
## Learning without lessons
## Looking after the parent
## When to add structure
A checklist of readiness signs, then warning signs.
</output_format>
