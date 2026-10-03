---
schema: 1
id: plan-guided-reading-group
kind: prompt
title: Plan a guided reading group session
description: Plans a small-group guided reading session at a set text or level with before, during and after reading steps, teacher prompts, word work and a quick check.
category: teaching
version: 1.0.0
status: incubating
stage: [plan]
role: [teacher]
requires: [none]
inputs: [topic, notes]
output: [plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [guided-reading, small-group-instruction, early-literacy, reading-comprehension, word-work]
pairs_with:
  prompts: [write-decodable-text, adapt-text-reading-level, write-reading-comprehension-set, plan-intervention-group]
  personas: [instructional-coach]
args:
  - name: text_or_level
    description: The book or passage the group will read (title, or paste a short excerpt or summary), or the reading level, e.g. "Book Band Turquoise", "F&P level J", "decodable set 4".
    type: string
    required: true
  - name: grade_level
    description: Grade, year or age of the group, e.g. "Grade 1", "Year 3".
    type: string
    required: true
  - name: group_needs
    description: Optional notes on the group, e.g. "accurate but slow and word-by-word; skip endings like -ed; strong talkers, weak at inference".
    type: text
  - name: minutes
    description: Session length in minutes.
    type: number
    default: 20
output_contract:
  format: markdown
  sections: [Overview, Session goal, Before reading, During reading, After reading, Word work, Quick check, Next session]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Guided reading works when the session has one clear teaching point for this group and the teacher hears every child read. Weak sessions turn into round-robin reading, long book walks that give away the text, or comprehension quizzing with no teaching. Strong sessions are short and tight: a brief introduction that sets a purpose and pre-teaches only what would block meaning, independent reading at each child's own pace while the teacher listens in and prompts, a discussion that sends children back to the text for evidence, and a few minutes of word work on a pattern from the text. Prompts during reading should send the child's attention to the print first ("Check the letters. Does that look right and sound right?"), not to guessing from the picture or the first letter.
</context>

<task>
Plan a {{minutes}}-minute guided reading session for a small group in **{{grade_level}}** reading **{{text_or_level}}**.
{{#group_needs}}

What the teacher knows about the group:
<group_needs>
{{group_needs}}
</group_needs>
{{/group_needs}}

1. Decide what you are working from. If a specific text is named and you do not know its content reliably, do not invent plot, characters or quotes: plan around the structure and mark text-specific details as placeholders such as "[a word from p. 4 with the -ed ending]", and ask for an excerpt or summary at the end. If only a level is given, describe the kind of text that suits the group at that level and plan for it.
2. Choose **one** teaching point for this session that fits the group's needs and the text (a decoding pattern, reading with phrasing, monitoring meaning, an inference skill). Turn it into a child-friendly success criterion.
3. **Before reading** (about 3 to 4 minutes): a short introduction that gives the gist without reading the book to them, sets a purpose question, and pre-teaches at most 2 or 3 words or structures that would block meaning. Write what the teacher says.
4. **During reading:** every child reads the whole section independently (quietly or in their head, by age) at their own pace. The teacher listens to one child at a time. Give 6 to 8 specific prompts matched to the teaching point, worded exactly, ordered from most support to least, and what early finishers do (reread, answer the purpose question, find evidence).
5. **After reading:** return to the purpose question, then 3 or 4 discussion questions that move from literal to inferential and ask children to show the place in the text. Include the expected answer or the evidence to look for.
6. **Word work** (2 to 4 minutes): one pattern drawn from the text or the teaching point, with a quick hands-on activity (build, sort, change one letter, read and write).
7. **Quick check:** how the teacher will know who met the success criterion today (listen to one child read 100 words and note accuracy and phrasing, an oral retell, one written answer) and what to note for each child.
8. Timings for all phases must add up to exactly {{minutes}} minutes.
</task>

<constraints>
- Be concrete: write the exact teacher language, questions and words, not "discuss the story".
- Teaching prompts direct attention to the print and to meaning together; do not teach guessing from pictures or skipping words.
- Keep the introduction short. Do not pre-teach so much that the children no longer need to read.
- Match vocabulary and question demand to {{grade_level}}. If {{text_or_level}} looks too hard or too easy for the group needs described, say so in the Overview.
- If something essential is missing, state the assumption in the Overview rather than inventing details about the children.
</constraints>

<output_format>
## Overview
Group, text or level, assumptions, and any concern about text fit.
## Session goal
The teaching point and the "I can…" success criterion.
## Before reading
Time, then the teacher's script and the words to pre-teach.
## During reading
Time, routine, a numbered list of prompts, early-finisher task.
## After reading
Time, then questions with expected answers or evidence.
## Word work
Time, the pattern, the words, the activity.
## Quick check
What to check, how, and a one-line recording format per child.
## Next session
What the next session should focus on depending on what the check shows. If placeholders were used, end by asking for the excerpt or summary needed to fill them.
</output_format>
