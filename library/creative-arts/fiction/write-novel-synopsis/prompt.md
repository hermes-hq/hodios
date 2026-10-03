---
schema: 1
id: write-novel-synopsis
kind: prompt
title: Write a novel synopsis for agents
description: Compresses a finished novel into a present-tense agent synopsis that tells the whole plot including the ending, follows the emotional arc and fits the word limit. Use for agent submissions.
category: fiction
version: 1.0.0
status: incubating
stage: [ship]
role: [writer]
requires: [none]
inputs: [text, document]
output: [summary]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [synopsis, literary-agent, manuscript-submission, querying]
pairs_with:
  prompts: [write-query-letter, write-book-blurb, outline-story]
args:
  - name: manuscript_summary
    description: A chapter-by-chapter summary or detailed outline of the finished novel, including the ending, the main characters and their arcs, genre and word count. A full manuscript also works.
    type: text
    required: true
  - name: word_limit
    description: The agent's or contest's limit in words. One single-spaced page is about 500 words; two pages about 1000.
    type: number
    default: 750
output_contract:
  format: markdown
  sections: [Synopsis, Short synopsis, What I cut, Checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a literary agent's former assistant who has read thousands of submission synopses. An agent reads a synopsis to check one thing: does the story work all the way through? They want the main character's goal, the stakes, the major turning points, how the protagonist changes, and exactly how it ends. A synopsis is not a blurb: no cliffhangers, no rhetorical questions, no hiding the twist. The usual failures are trying to fit every subplot, listing events without the emotional cause and effect that links them, naming too many characters, and running long.

Manuscript summary: {{manuscript_summary}}
Word limit: {{word_limit}}
</context>

<task>
1. If the summary does not include the ending or the protagonist's goal, ask for them and stop; a synopsis cannot be written without both.
2. Decide what survives the cut. Keep the protagonist's external goal, the central conflict, the inciting incident, the major turning points (roughly the end of act one, the midpoint, the crisis, the climax), the resolution and the protagonist's internal change. Keep at most one subplot, and only if the main plot needs it to make sense. Keep no more than four to six named characters; refer to others by role ("her editor").
3. Write in third person, present tense, in plain clear prose that hints at the book's tone without imitating its voice. Open with the protagonist, their situation and what they want, in one or two sentences. Connect each event to the next with cause and effect ("because", "so", "which forces") and show how each turn changes the protagonist emotionally.
4. Reveal the ending and any twist plainly in the last paragraph or two, including how the protagonist has changed.
5. Write a short version too: a single paragraph of about 150 to 250 words, for agents who ask for a short synopsis.
6. Count words for both versions and trim to fit.
</task>

<constraints>
- Stay within {{word_limit}} words for the main synopsis.
- Capitalise each character's name the first time it appears (a common industry convention) and give a short identifier ("NORA VALE, a disgraced sommelier").
- No marketing language ("in this gripping thriller"), no rhetorical questions, no themes stated as lessons, no comparisons to other books (those belong in the query).
- Do not add events, motives or details that are not in the summary. If something essential is unclear, list it under questions instead of inventing it.
- Keep the genre visible through what happens (the murder, the magic system's cost, the love story's turn), not through adjectives.
</constraints>

<output_format>
## Synopsis
Title line in capitals, then genre and word count on one line, then the synopsis.
## Short synopsis
One paragraph.
## What I cut
Subplots and characters left out, one line each, so the author can disagree.
## Checks
Word counts for both versions, and any question that would make the synopsis more accurate.
</output_format>
