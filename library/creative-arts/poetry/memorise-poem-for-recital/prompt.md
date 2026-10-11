---
schema: 1
id: memorise-poem-for-recital
kind: prompt
title: Memorise a poem for recital
description: Turns a poem you need to recite (contest, wedding, class, memorial) into a day-by-day memorisation plan with a sense map, first-letter cue sheet, self-tests and delivery notes.
category: poetry
version: 1.0.0
status: incubating
stage: [learn]
role: [student, writer, teacher, individual]
subject: [literature]
requires: [none]
inputs: [text, preferences]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [recitation, memorisation, poetry-recital, public-reading]
pairs_with:
  prompts: [prepare-poetry-reading, analyze-poem]
args:
  - name: poem
    description: The full text of the poem exactly as you will recite it, with title and poet.
    type: text
    required: true
  - name: days
    description: How many days you have until the recital.
    type: number
    required: true
  - name: occasion
    description: contest (a recitation competition judged on accuracy and delivery), ceremony (a wedding, funeral or memorial), class (an assessment or assembly) or personal.
    type: enum
    enum: [contest, ceremony, class, personal]
    default: personal
  - name: minutes_per_day
    description: Time you can practise each day.
    type: number
    default: 15
output_contract:
  format: markdown
  sections: [Feasibility, Sense map, Daily plan, Cue sheet, Self-test, Delivery notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a teacher who coaches students and adults for recitation. Poems are easiest to memorise by meaning first and sound second: a reciter who knows why stanza three follows stanza two rarely loses their place. Methods that work: chunking by sense units and stanzas; cumulative building (learn a line, then say everything so far); first-letter cue sheets (only the first letter of each word, with punctuation kept); spaced retrieval, saying it from memory before looking; writing it out from memory; linking each stanza to a place or image. Common errors are swapping synonyms ("quiet" for "silent"), reversing stanzas, and dropping small words. Delivery fails most often by rushing, sing-song metre and stopping hard at every line end.

<poem>
{{poem}}
</poem>
Days available: {{days}}. Occasion: {{occasion}}. Practice time per day: {{minutes_per_day}} minutes.
</context>

<task>
1. Count lines and words and judge feasibility for the days and minutes given. As a rough guide, many adults can secure about four to eight new lines a day with review; say this is approximate. If it is not feasible, say so plainly and offer options: an excerpt, more practice time, or reading from the page with good eye contact.
2. Build a sense map: one line per stanza or sense unit saying what happens in it and how it leads to the next, plus the words most likely to be swapped.
3. Make a daily plan: which lines to learn each day using cumulative building, a daily retrieval run from the start before learning new lines, writing out from memory every few days, and the last two days kept for full run-throughs and delivery.
4. Produce the cue sheet: the poem as first letters of each word, keeping line breaks and punctuation.
5. Give self-tests: start from a random stanza, recite the last stanza, then the last two, working back to the start (so the ending is as secure as the opening), write it out and compare word by word.
6. Give delivery notes for the occasion: pace, pauses at stanza breaks, honouring line breaks with a slight lift rather than a stop, eye contact, what to do if you blank (pause, breathe, go to the start of the stanza). For contests, add that accuracy is usually scored, so drill the swap-prone words; tell the user to check their contest's rules.
</task>

<constraints>
- Work only from the text supplied; do not reconstruct a poem from memory, as small wording errors would be memorised.
- Do not change the poem's wording or punctuation.
- Keep the plan within the stated minutes per day.
</constraints>

<output_format>
## Feasibility
Two or three sentences with line and word counts.
## Sense map
One line per stanza or unit, plus swap-prone words.
## Daily plan
A table: day, new lines, review task, minutes.
## Cue sheet
The first-letter version in a code block.
## Self-test
Four to six bullets.
## Delivery notes
Five to eight bullets.
</output_format>
