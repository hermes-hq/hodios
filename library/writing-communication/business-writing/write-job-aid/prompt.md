---
schema: 1
id: write-job-aid
kind: prompt
title: Write a one-page job aid
description: Writes a one-page job aid or quick-reference card for a frontline task with numbered steps, decision points, warnings placed where they matter and pictures to add, readable at a glance.
category: business-writing
version: 1.0.0
status: incubating
stage: [build]
role: [operations-manager, manager, teacher]
requires: [none]
inputs: [text, notes, document]
output: [docs, checklist, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [job-aid, quick-reference-card, work-instructions, frontline-training, plain-language]
pairs_with:
  prompts: [write-sop, write-user-manual, simplify-to-plain-language, plan-new-hire-onboarding]
args:
  - name: task
    description: The task the aid covers, phrased as an action, for example "process a customer refund at the till", "change a nebuliser mask", "clear a jam on the label printer".
    type: string
    required: true
  - name: users
    description: Who uses it and in what conditions, for example "new seasonal staff, many with English as a second language, reading it taped next to the till" or "night-shift carers, glancing at it on a phone with gloves on".
    type: string
    required: true
  - name: steps
    description: How the task is done now - your notes, an existing long procedure, or a description of what an experienced person does, including the mistakes people commonly make and who to call when it goes wrong.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Job aid, Picture plan, Questions for the process owner]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A job aid is not a procedure. A procedure explains the whole process, why, and who is responsible; a job aid is the one page someone looks at in the middle of doing the task, often under time pressure, standing up, maybe in a second language. Good job aids show only what is needed at the moment of action: a clear title, what you need before you start, numbered steps with one action each, decisions written as "If ... then ...", warnings placed immediately before the step they apply to, and a "something went wrong" box with a name or number to call. Pictures carry a lot of the load for physical tasks.

Task: {{task}}
Users and conditions: {{users}}
<steps>
{{steps}}
</steps>
</context>

<task>
1. Read the steps and list anything ambiguous, missing or contradictory (an unclear order, an undefined term, a decision with no rule, no contact for problems). If the gaps make it impossible to write a safe aid, ask about them and stop; otherwise continue and mark each gap [CHECK] in place.
2. Write the job aid:
   - Title: the task as a verb phrase.
   - Use when: one line saying when this applies and when it does not.
   - Before you start: the items, access or checks needed.
   - Steps: numbered, one action per step, each starting with a verb, with the key word or button in bold. Aim for no more than about ten steps; if the task needs more, split it into phases with subheadings or suggest a second card.
   - Decision points: write as "If ... then go to step N" or a two-column If / Then table.
   - Warnings: CAUTION for risk of mistakes or damage and STOP for risk to people's safety, placed directly before the step they apply to, saying what to do instead.
   - Done when: how the person knows the task is complete.
   - Something went wrong: the most common problems and who to contact.
   - Footer: owner, version and date, next review [X].
3. Adapt to the users and conditions: shorter words and sentences for second-language readers, larger type and fewer words if read from a distance or on a phone, and steps that make sense if the reader glances away.
4. Picture plan: for each step that would benefit, the photo or icon to add, what it must show, and where it goes.
5. Questions for the process owner: the gaps marked [CHECK] as direct questions.
6. Before answering, check the aid against the source steps: nothing added that was not in the source except formatting and clarifications marked [CHECK], every warning sits before its step, and it would fit one printed page.
</task>

<constraints>
- Do not invent steps, settings, values, part numbers or contacts. If the source does not give it, mark it [CHECK].
- Plain words. Avoid jargon unless the users use it, and then use it consistently.
- For tasks with safety, clinical, food-safety or legal consequences, add a line at the top that the aid must be checked by the responsible person before use.
- Keep the full procedure out; if important context does not fit, list it as something to put in training or the full procedure (write-sop) instead.
</constraints>

<output_format>
## Job aid
The card itself in Markdown, ready to paste into a document and print.
## Picture plan
Table: Step | Picture or icon | Must show.
## Questions for the process owner
Numbered.
</output_format>
