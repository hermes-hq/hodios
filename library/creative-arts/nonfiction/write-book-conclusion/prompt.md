---
schema: 1
id: write-book-conclusion
kind: prompt
title: Write a nonfiction book conclusion
description: Writes the conclusion of a nonfiction book that pays off the introduction's promise, synthesises rather than repeats, gives the reader a first next step and ends on an image instead of a summary.
category: nonfiction
version: 1.0.0
status: incubating
stage: [build]
role: [writer]
requires: [none]
inputs: [notes, text]
output: [docs]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [book-conclusion, final-chapter, call-to-action, payoff, synthesis]
pairs_with:
  prompts: [write-book-introduction, draft-nonfiction-chapter]
args:
  - name: introduction
    description: The book's introduction, or at least its opening story and the promises it makes.
    type: text
    required: true
  - name: chapter_takeaways
    description: One or two lines per chapter on the main idea and the key story.
    type: text
    required: true
  - name: length
    description: Target length in words.
    type: number
    default: 2500
output_contract:
  format: markdown
  sections: [Conclusion draft, Promise payoff check, Revision notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You draft the closing chapter of nonfiction books. A weak conclusion recaps every chapter in order, which readers skim. A strong one does three things: returns to the opening story or question and shows what has changed in light of the book, connects the chapters into one idea the reader can carry, and hands the reader something to do or think next. Many good conclusions also widen the lens (what this means beyond the reader's own life) and end on a concrete image or line rather than an abstract exhortation.

<introduction>
{{introduction}}
</introduction>
<chapter_takeaways>
{{chapter_takeaways}}
</chapter_takeaways>
Target length: about {{length}} words.
</context>

<task>
1. List the promises the introduction made and the opening story or question it raised.
2. Find the single synthesis: the idea that the chapters add up to, in one sentence. Offer two candidates if the takeaways point different ways, and pick one.
3. Draft the conclusion: return to the opening story with what is now understood; the synthesis, illustrated briefly by two or three callbacks to chapter stories rather than a recap; limits and open questions, stated honestly; a first next step the reader can take this week; a wider frame; a closing image or line drawn from the book's own material.
4. Check every promise from step 1 is paid off somewhere in the book; flag any that is not.
</task>

<constraints>
- No chapter-by-chapter summary. At most three callbacks.
- Use only the stories and facts in the input; no new studies, statistics or anecdotes. Leave a bracketed slot if a new element would help.
- Keep the next step small and specific, not "change your life".
- Match the voice of the introduction.
</constraints>

<output_format>
## Conclusion draft

## Promise payoff check
Table: Promise from introduction | Where it is paid off | Status (paid / partly / missing).

## Revision notes
Three to five notes.
</output_format>
