---
schema: 1
id: prepare-to-read-book-with-child
kind: prompt
title: Prepare to read a book with a child
description: Prepares a parent to read one specific book with their child aged 4 to 11, with before, during and after questions, words to pre-teach, phonics prompts for stuck words and a follow-up activity.
category: tutoring
version: 1.0.0
status: incubating
stage: [learn, plan]
role: [parent, teacher]
subject: [english]
requires: [none]
inputs: [text]
output: [plan, questions, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [shared-reading, dialogic-reading, phonics-prompts, reading-volunteer, book-talk, home-reading]
pairs_with:
  prompts: [build-reading-routine-with-child, tutor-reading-comprehension]
  personas: [early-reading-tutor]
args:
  - name: book
    description: The book's title and author, or what the school sent home, for example "Owl Babies by Martin Waddell" or "Oxford Reading Tree level 5 book about a lost dog".
    type: string
    required: true
  - name: age
    description: The child's age or school year.
    type: string
    required: true
  - name: reader_stage
    description: pre-reader (the adult reads, the child listens and talks), decoding (the child sounds out words, often a school reading book) or fluent (the child reads alone and the focus is understanding).
    type: enum
    enum: [pre-reader, decoding, fluent]
    default: decoding
  - name: book_notes
    description: Optional blurb, a page or two typed out, or what the book is about. Helps when the book is not widely known.
    type: text
output_contract:
  format: markdown
  sections: [Before you start, Words to watch, While reading, When they get stuck, After the book, Keep it fun]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A parent or reading volunteer is about to read a book with a child.

Book: {{book}}
Child's age or school year: {{age}}
Reader stage: {{reader_stage}}

Shared reading works when the adult talks with the child about the book, not just through it: predicting from the cover, pausing for short questions, linking to the child's life, and letting the child do as much of the reading as they can. Three things go wrong at home: too many questions so the story loses its flow, jumping in with the word before the child has tried (or making them guess from the picture when the school teaches sounding out), and turning reading into a test.
{{#book_notes}}
<book_notes>
{{book_notes}}
</book_notes>
{{/book_notes}}
</context>

<task>
1. Say what you know about the book in one line. If you do not know it well and no notes were given, say so, and write the guide from the title and stage with general questions, marking anything content-specific as "check in the book". Never invent plot details, characters or quotations.
2. Before reading: two or three cover and title questions (predict, connect to the child's life), and one sentence the adult can say to set the purpose.
3. Words to watch:
   - decoding: up to six words that are likely to be tricky, split into sounds where it helps (sh-o-p), and any common exception words to say together ("said", "the").
   - pre-reader and fluent: up to six interesting words to talk about, with a child-friendly meaning.
4. While reading: at most one question every two or three pages, mixing kinds (what do you think will happen, why did she do that, how would you feel), plus where to stop and let the child finish a repeated line.
5. When they get stuck (decoding): the prompting ladder in the adult's words: wait five seconds; "Say the sounds, then blend"; "Is there a sound you know in it?"; "Does that make sense?"; then tell the word and move on. Say not to cover pictures or ask the child to guess from them first if the school teaches phonics.
6. After: three questions from recall to opinion, and one five-minute follow-up (draw a favourite part, act a scene, retell with three fingers: beginning, middle, end).
7. Keep it fun: short tips including stopping before the child is tired and praising effort specifically.
</task>

<constraints>
- Match everything to the child's age and reader stage; questions short and spoken, not written.
- No more than about ten questions in total across the whole guide.
- Respect that the parent may not read confidently themselves: plain words, no jargon unless explained (blend: push the sounds together).
- If the book seems far too hard or too easy for the stage, say so kindly and suggest how to adapt (adult reads the hard pages, child reads repeated lines).
- If the parent mentions ongoing worries (no progress, avoidance, reversed letters at an older age), suggest talking to the class teacher, without diagnosing.
</constraints>

<output_format>
## Before you start
Bullets.
## Words to watch
Table: word | how to help (sounds or meaning).
## While reading
Bullets, each tied to a point in the story when known.
## When they get stuck
The prompting ladder as numbered steps (decoding), or how to handle a hard word (other stages).
## After the book
Three questions and one activity.
## Keep it fun
Three to five short tips.
</output_format>
