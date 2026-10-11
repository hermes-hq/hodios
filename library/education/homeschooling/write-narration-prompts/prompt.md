---
schema: 1
id: write-narration-prompts
kind: prompt
title: Write narration prompts
description: Writes oral and written narration prompts for a passage a homeschooled child has just read or heard, graded by age, with what a strong narration includes and gentle ways to build it up.
category: homeschooling
version: 1.0.0
status: incubating
stage: [plan]
role: [parent]
subject: [literature]
requires: [none]
inputs: [text]
output: [questions]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [narration, charlotte-mason, comprehension, read-aloud, living-books]
pairs_with:
  prompts: [choose-homeschool-approach, plan-homeschool-morning-time]
args:
  - name: passage
    description: "The passage the child will read or hear, or a short summary of it if it is long."
    type: text
    required: true
  - name: child_profile
    description: "Child's age, whether they narrate orally or in writing, and how narration usually goes."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Length check, Before reading, Narration prompts, What a strong narration includes, After the narration, Written narration standard]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help homeschooling parents use narration, the practice (central to Charlotte Mason education and used by many eclectic families) of a child telling back in their own words what they have just read or heard. Narration builds attention, comprehension, vocabulary and later composition, and it doubles as assessment without tests. Experienced parents know the craft: read the passage once, without interrupting; ask the child to tell it back rather than quizzing them with recall questions; young children (around 6 to 9) narrate orally and briefly; older children add written narrations and varied prompts (tell it from a character's view, explain the cause, compare, draw and label, narrate to a younger sibling); the parent does not correct mid-narration. A weak narration is usually a sign the passage was too long or the child was not expecting to narrate, not a reason for drills.

Passage or summary: {{passage}}
Child: {{child_profile}}
</context>

<task>
1. Check the passage length against the child's age and suggest where to split it if it is too long for one narration.
2. Write a short pre-reading cue (what to say before reading so the child knows to listen for narration) and, if useful, two or three names or words to show first.
3. Write the main narration prompt, then three to five varied alternative prompts suited to the child's age (oral, drawn, written, from a viewpoint, explaining, comparing).
4. Describe what a strong narration of this passage would include: the key events or ideas, in order, and two or three vivid details. This is for the parent, not to read aloud.
5. Give gentle follow-ups for after the narration (one open discussion question, one connection to earlier reading) and what to do if the narration is thin.
6. For written narrations, give a light standard for the child's age and one thing to look at next time, not a list of corrections.
</task>

<constraints>
- Base every prompt and the strong-narration notes only on the passage given; do not add events or facts that are not in it.
- No comprehension quizzes or multiple-choice; prompts ask the child to tell, explain or show.
- Keep oral narration the default for children under about 9 unless the parent asks otherwise.
- If the passage is not given in full, say the notes are based on the summary and may miss details.
</constraints>

<output_format>
## Length check
## Before reading
## Narration prompts
Main prompt, then alternatives.
## What a strong narration includes
## After the narration
## Written narration standard
Only if the child writes.
</output_format>
