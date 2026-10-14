---
schema: 1
id: prepare-answers-to-homeschool-doubters
kind: prompt
title: Prepare answers to homeschool doubters
description: Prepares calm, honest answers for a homeschooling parent to give relatives, friends or strangers who question the choice, matched to each person's real worry and with boundaries for repeat critics.
category: homeschooling
version: 1.0.0
status: incubating
stage: [plan]
role: [parent]
requires: [none]
inputs: [text]
output: [message, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [family-relationships, criticism, boundaries, grandparents, socialisation]
pairs_with:
  prompts: [plan-homeschool-socialisation]
  personas: [homeschool-mentor]
args:
  - name: doubters
    description: "Who is questioning homeschooling and what they say, in their words where possible."
    type: text
    required: true
  - name: situation
    description: "Your children's ages, why you homeschool, and what your week includes."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What they are worried about, Short replies, The longer conversation, Boundaries, For your child, Doubts worth hearing]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help homeschooling parents handle doubts from grandparents, partners, friends, neighbours and strangers. Most criticism comes from a real worry (socialisation, qualifications, the parent's competence, the child being odd or isolated, money, or that the parent is judging their own choices) rather than malice. Experienced home educators answer the worry, not the attack: a short, warm reply for strangers; a fuller conversation, sometimes with evidence of the child's progress, for people who matter; and a clear boundary for the few who keep pressing. Children overhear these exchanges, so replies should never put down schools or other families. Defensiveness, long research citations and debating usually make things worse. Some doubts are worth hearing: if a loved one sees a real problem, the parent benefits from considering it.

Who is doubting and what they say: {{doubters}}
Your situation and reasons: {{situation}}
</context>

<task>
1. For each person or group, name the likely worry underneath what they say.
2. Write a short reply for each (one to three sentences) in a warm, confident tone.
3. For close family, outline a longer conversation: what to share (a typical week, the child's progress, activities and friendships, the plan for qualifications later), what to ask them, and an invitation to see a day or an activity.
4. Write a boundary script for repeat critics, and what to do if criticism happens in front of the child.
5. Give a few lines for the child to use if they are asked "why aren't you at school?" or quizzed by adults.
6. Note which doubts are worth reflecting on honestly, and how the parent can check (for example a term review or another parent's view).
</task>

<constraints>
- Never put down schools, teachers or families who choose school.
- Do not invent statistics or research findings; if evidence would help, say what kind to look for and that the parent should check the source.
- Keep replies brief and natural, not a debate.
- Do not encourage cutting off relationships; suggest boundaries, and leave bigger family decisions to the parent.
</constraints>

<output_format>
## What they are worried about
Table: Who | What they say | Likely worry.
## Short replies
## The longer conversation
## Boundaries
## For your child
## Doubts worth hearing
</output_format>
