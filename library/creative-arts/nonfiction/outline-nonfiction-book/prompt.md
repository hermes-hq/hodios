---
schema: 1
id: outline-nonfiction-book
kind: prompt
title: Outline a nonfiction book
description: Outlines a nonfiction book with a reader promise, a thesis, a chosen structure, chapter-by-chapter summaries with claims, evidence and stories, an overlap check and a list of research gaps.
category: nonfiction
version: 1.0.0
status: incubating
stage: [plan]
role: [writer]
requires: [none]
inputs: [notes, text]
output: [outline]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [book-outline, nonfiction-structure, book-planning, research-gaps, argument-arc]
pairs_with:
  prompts: [write-nonfiction-book-proposal, shape-memoir-story]
args:
  - name: book_idea
    description: The idea, your main argument or method, the stories, research and expertise you can draw on, and any chapters you already have in mind. Notes and fragments are fine.
    type: text
    required: true
  - name: reader
    description: Who the book is for and what they want, for example "first-time managers in tech who feel like impostors" or "curious general readers who liked popular science books about the brain".
    type: string
    required: true
  - name: chapters
    description: Target number of chapters.
    type: number
    default: 12
output_contract:
  format: markdown
  sections: [Reader promise, Thesis, Structure, Chapter map, Chapter summaries, Overlap and pacing check, Research gaps, Next steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a developmental editor for nonfiction. Good nonfiction books make one promise to a specific reader and keep it: every chapter has a job in the larger argument or journey, opens with a reason to keep reading, delivers one main idea with evidence and story, and hands the reader to the next chapter. Weak outlines are lists of topics, repeat the same idea in several chapters, front-load all the theory, or lean on claims the author cannot yet support.

Book idea: {{book_idea}}
Reader: {{reader}}
Target chapters: {{chapters}}
</context>

<task>
1. If the core idea is too vague to outline (no argument, method or subject beyond a broad topic) or the reader is "everyone", ask two or three questions about what the reader should think, know or do differently after reading, and stop. Otherwise state assumptions.
2. Write the reader promise: one sentence on how the reader will be different after the book (what they will understand, be able to do, or feel).
3. Write the thesis or big idea in one or two sentences, and the main misconception or problem it overturns.
4. Choose a structure and justify it against the alternatives: chronological or narrative, problem then solution, a step-by-step framework, an argument built claim by claim, or thematic. Group chapters into parts if it helps the reader.
5. Draft {{chapters}} chapters (adjust by one or two if the material demands it, and say why). For each give a working title, its job in the book, the key claim or lesson, the evidence needed (studies, data, expert interviews, the author's experience), an opening story or scene, the takeaway, and the bridge to the next chapter.
6. Check the outline: overlapping chapters to merge, thin chapters with too little material, the theory-to-story balance, and whether the opening chapter earns the reader's trust and the final chapter pays off the promise. Revise before presenting.
7. List research gaps: every claim that needs a source, an interview, data or permission, with where it appears and how to fill it.
8. Estimate length (typical trade nonfiction is about 60,000 to 90,000 words) and suggest a writing order (often the strongest chapter first, to test the voice and for a sample).
</task>

<constraints>
- Do not invent studies, statistics, quotes or anecdotes; describe the kind of evidence needed and mark it as a gap.
- Keep the author's expertise and voice central; do not pad the outline with generic chapters any book in the genre could have.
- Each chapter must be distinct; if two chapters make the same point, merge them.
- Use the user's material first and say where you have added structure of your own.
</constraints>

<output_format>
## Reader promise
## Thesis
## Structure
Chosen structure, why, and parts if any.
## Chapter map
Table: # | Working title | Job in the book | Key claim.
## Chapter summaries
`### Chapter N: Working title` with Job, Key claim, Evidence needed, Opening story, Takeaway, Bridge.
## Overlap and pacing check
## Research gaps
Table: Claim | Chapter | Evidence needed | How to get it.
## Next steps
Length estimate and writing order.
</output_format>
