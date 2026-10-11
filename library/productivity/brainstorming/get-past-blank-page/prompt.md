---
schema: 1
id: get-past-blank-page
kind: prompt
title: Get past the blank page
description: Gets a stuck writing or work task moving with quick starters - questions to answer, three ways in, a rough outline and possible first lines - so you can write a messy first draft in 20 minutes.
category: brainstorming
version: 1.0.0
status: incubating
stage: [discover, build]
role: [writer, student, individual, content-creator]
requires: [none]
inputs: [text]
output: [ideas, outline]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [blank-page, writing-starters, first-draft, outlining, getting-started]
pairs_with:
  prompts: [beat-procrastination, outline-draft-from-notes, get-unstuck-in-draft, brainstorm-ideas]
args:
  - name: task
    description: What you need to produce, for whom and by when, for example "a 1,500-word blog post on choosing a first bike, for beginners, due Friday" or "the project update slide for Monday's leadership meeting".
    type: text
    required: true
  - name: what_you_have
    description: Whatever you have so far - notes, a half-sentence, a brief, a feeling about it - even if it is nothing.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Answer these first, Three ways in, Rough outline, First lines, Your next 20 minutes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The blank page is usually not a lack of ideas but too many decisions at once: what to say, in what order, in what tone, and the fear that the first sentence must be good. Professional writers get moving by separating thinking from polishing: talking the idea through (answering a few plain questions as if to a friend), choosing an angle rather than covering everything, sketching a rough order, and accepting a deliberately bad first draft. Starting in the middle, with the part they know best, also works. A few strong first-line options lower the stakes further. This is different from avoidance with deeper causes (dread, overwhelm, unclear expectations), which needs a different approach; if the task itself is unclear, the first step is to clarify the brief.

Task: {{task}}
What they have: {{what_you_have}}
</context>

<task>
1. If the task is unclear about audience or purpose, give the two questions they should answer first, then continue with stated assumptions.
2. Give five to seven plain questions to answer out loud or in quick bullet points (who is this for, what do they need to know or do after, what is the one thing to remember, what example comes to mind first, what do I already know).
3. Offer three different ways in: for example a story or example first, the answer or recommendation first, a question or problem first. Say which suits this task.
4. Give a rough outline of four to seven lines in the order that suits the chosen way in, using what they have.
5. Offer four or five possible first lines in different tones for them to pick or change.
6. Suggest where to start if not at the beginning (the easiest section).
7. Give a 20-minute plan: 5 minutes of questions, 12 minutes of ugly first draft without editing, 3 minutes to mark gaps.
</task>

<constraints>
- Do not write the whole piece; give starters, an outline and first lines only, so the person writes it.
- Do not invent facts, figures or quotes for their content; mark places where they need to add their own.
- Keep the whole answer short; the goal is to start writing within minutes.
- If the stuck feeling sounds like dread or overwhelm about more than this task, mention gently that a different approach may help.
</constraints>

<output_format>
## Answer these first
## Three ways in
## Rough outline
## First lines
## Your next 20 minutes
</output_format>
