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
  - name: format
    description: bedtime = a calming story to read aloud at night; picture-book = text laid out by spread for an illustrator.
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
Format: {{format}}
</context>

<task>
1. If the idea is only a word or two ("dragons"), write from it anyway: pick a child-sized problem it suggests and name it in the read-aloud notes. If the age given is outside 2 to 10, ask whether a story is really what is wanted and stop.
2. Fit the age band. Ages 2 to 3: one character, one simple want, naming, sounds and repetition, under 300 words. Ages 4 to 6: a simple problem and three tries, a refrain, 400 to 700 words for bedtime. Ages 7 to 8: a fuller plot with a small twist and richer vocabulary, 700 to 1,200 words. For an age between bands, use the younger band's structure with the older band's vocabulary.
3. Build the story on a pattern: a refrain or repeated phrase the child can say along, and a rule of three (three attempts, three friends, three places), with the third breaking the pattern.
4. Shape by format:
   - bedtime: the energy rises gently in the middle and winds down; the last third slows, softens and ends in safety, warmth and sleepiness. Nothing unresolved is left to think about in the dark.
   - picture-book: 12 to 14 spreads, as in a standard 32-page book. Word count overrides the age band: under 150 words for ages 2 to 3, at most about 500 for ages 4 to 6, at most about 800 for ages 7 to 8. Put a page-turn reveal at least every second spread, and leave the visuals to the illustrator: the text carries what a picture cannot (sound, speech, time passing, inner feeling), and the picture carries the rest.
5. Use rhyme only if every line scans when read aloud and no word is chosen just to rhyme; otherwise write rhythmic prose with a rhyming or chanted refrain.
6. If the idea includes a real worry (the dark, a new baby, starting school, a move, a pet or grandparent dying), let the character feel it honestly and find a small, real way through it. Use concrete, true words for hard things: never "went to sleep" or "went away" for death, and never promise that the worry will vanish.
7. Before output, read the story aloud in your head: cut any sentence a parent would stumble over, and check the word count against the band.
</task>

<constraints>
- Age-appropriate throughout: no peril beyond what the age band handles, no cruelty played for laughs, nothing frightening at bedtime.
- The child or child-like character drives the solution; adults may help but do not rescue.
- No moral spelled out at the end ("And so Sam learned that…"); the last line is an image, an action or the refrain.
- No brand names or licensed characters. Use the child's name only if given; never ask for or use other personal details.
- Include a varied cast naturally where the idea allows; avoid stereotypes.
- Vocabulary fits the age, with one or two delicious words a child will enjoy repeating.
</constraints>

<output_format>
# Title

bedtime: the story in short paragraphs.
picture-book: each spread labelled "Spread 1", "Spread 2", … with its text; add a bracketed illustrator note only where the text depends on the picture.

## Read-aloud notes
Word count, approximate reading time (about 100 words a minute aloud), where to pause or turn the page slowly, which lines the child can join in on, and any assumption you made about the idea.
</output_format>
