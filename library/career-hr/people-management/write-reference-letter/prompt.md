---
schema: 1
id: write-reference-letter
kind: prompt
title: Write a reference letter
description: Writes a specific, honest reference or recommendation letter for an employee or colleague from your own observations, matched to its purpose. Use when someone asks you to recommend them.
category: people-management
version: 1.0.0
status: incubating
stage: [build]
role: [manager, teacher, executive]
requires: [none]
inputs: [notes]
output: [message, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [recommendation-letter, reference-letter, letter-of-recommendation, referee]
pairs_with:
  prompts: [write-performance-review, brief-your-references]
  personas: [leadership-coach]
args:
  - name: relationship_and_observations
    description: How you know the person (role, dates, how closely), specific things you saw them do with results, how they compare with others you have worked with, any reservations, and your own title.
    type: text
    required: true
  - name: purpose
    description: What the letter is for (a named job or type of role, graduate school, scholarship, award, visa or tenancy) and any format or length requirements.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Assessment, Letter, Claims to confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an experienced manager and academic who has written and read many recommendation letters. Readers discount generic praise because almost every letter is positive. What carries weight is the writer's credibility (how well and how long they observed the person), specific examples with results, comparison with a defined peer group, and fit with what the reader is deciding. Weak letters list adjectives, describe the job instead of the person, or say more than the writer actually saw. A letter is also a statement made under the writer's name, so it must stay truthful; if the writer cannot honestly support the person, a narrower letter or a polite decline is better than an inflated one.

<relationship_and_observations>
{{relationship_and_observations}}
</relationship_and_observations>

Purpose: {{purpose}}
</context>

<task>
1. Assess the material: what the observations can credibly support, what the reader of a {{purpose}} letter will most want to know, and whether the evidence is strong, thin or mixed. If it is thin or the writer has reservations, recommend a narrower letter focused on what they saw, or declining, and give a short, kind decline message as an option.
2. Write the letter:
   - Opening: who the writer is, the relationship, its length and closeness, and a clear statement of recommendation pitched to the evidence.
   - Body: two or three qualities that matter for the purpose, each proved with a specific example from the observations (situation, what the person did, result).
   - Comparison: a ranking or comparison with a defined group only if the writer gave one ("among the 12 analysts I have managed"); never invent one.
   - Fit: why these qualities matter for the stated purpose.
   - Close: a summary recommendation and an offer to be contacted, with [contact details].
3. Fit the conventions of the purpose: one page for most jobs; often longer and more detailed for academic programmes; factual and formal for visa, tenancy or official uses, where accuracy of dates and role matters more than praise. Follow any stated length or format requirement.
4. List every factual claim the writer must confirm before signing (dates, titles, figures).
</task>

<constraints>
- Use only the writer's own observations. Never invent examples, figures, rankings or qualities; mark gaps as [X].
- No superlatives without evidence in the same paragraph.
- Do not mention health, family, age, religion, nationality, disability or other personal characteristics unless the person has asked for them to be included and it is relevant.
- Remind the writer to check whether their employer has a policy on references before signing on company letterhead.
</constraints>

<output_format>
## Assessment
Two to four sentences, plus the decline option if relevant.
## Letter
Ready to sign, with [X] placeholders.
## Claims to confirm
Checklist.
</output_format>
