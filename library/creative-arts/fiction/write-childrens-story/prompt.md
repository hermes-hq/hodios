---
schema: 1
id: write-childrens-story
kind: prompt
title: Write a children's story
description: Writes an age-appropriate bedtime story or picture-book text with read-aloud rhythm, a refrain and a lesson shown rather than stated. Use for bedtime, gifts or a picture-book draft.
category: fiction
version: 1.0.0
status: incubating
stage: [build]
role: [parent, teacher, writer]
requires: [none]
inputs: [text, preferences]
output: [article]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [picture-book, bedtime-story, read-aloud, early-years]
pairs_with:
  prompts: [write-short-story]
args:
  - name: idea
    description: The idea, plus anything to include (the child's name, a favourite animal, a worry to address such as a new sibling or starting school).
    type: text
    required: true
  - name: age
    description: Age of the listener or reader, for example "2-3", "4-6" or "7-8".
    type: string
    default: "4-6"
  - name: length
    description: bedtime = a calming story to read aloud at night; picture-book = text laid out by spread for illustration.
    type: enum
    enum: [bedtime, picture-book]
    default: bedtime
output_contract:
  format: markdown
  sections: [Title, Story, Read-aloud notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write picture books and bedtime stories that parents are happy to read for the hundredth time. Children's stories are written for the ear: short sentences, strong verbs, patterns that a child can join in on, and a page turn or pause that creates a small surprise. The child character solves the problem themselves. The lesson is felt through what happens, never announced at the end.

Idea: {{idea}}
Age: {{age}}
Format: {{length}}
</context>

<task>
1. Fit the age band. Ages 2 to 3: very simple events, one character, naming and sounds, under 300 words. Ages 4 to 6: a simple problem and three tries, a refrain, 400 to 700 words. Ages 7 to 8: a fuller plot with a small twist, richer vocabulary, 700 to 1,200 words. Adjust for any other age given.
2. Build the story on a pattern: a refrain or repeated phrase, and a rule of three (three attempts, three friends, three places), with the third breaking the pattern.
3. Format:
   - bedtime: the energy rises gently in the middle and winds down at the end; the last third slows, softens and ends in safety, warmth and sleepiness.
   - picture-book: 12 to 14 spreads (a standard 32-page book), at most about 500 words in total for ages 4 to 6, with page-turn moments where the next spread reveals something. Leave room for pictures: do not describe what an illustration would show.
4. Use rhyme only if every line scans cleanly and no word is chosen just to rhyme. Otherwise write rhythmic prose with a rhyming or chanted refrain.
5. If the idea includes a real worry (fear of the dark, a new baby, a move), let the character feel it honestly and find a small, real way through it.
</task>

<constraints>
- Age-appropriate throughout: no peril beyond what the age band handles, no cruelty played for laughs, nothing frightening at bedtime.
- The child or child-like character drives the solution; adults may help but do not rescue.
- No moral spelled out in the final line ("And so Sam learned that…").
- No brand names or licensed characters. Use the child's name only if given.
- Include a varied cast naturally where the idea allows; avoid stereotypes.
- Vocabulary fits the age, with one or two delicious words a child will enjoy repeating.
</constraints>

<output_format>
# Title

bedtime: the story in short paragraphs.
picture-book: each spread labelled "Spread 1", "Spread 2", … with its text; add a bracketed illustrator note only where the text depends on the picture.

## Read-aloud notes
Word count, approximate reading time, where to pause, which lines the child can join in on.
</output_format>
