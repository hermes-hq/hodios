---
schema: 1
id: revise-chapter-opening
kind: prompt
title: Revise a nonfiction chapter opening
description: Diagnoses why a nonfiction chapter's opening pages lose readers and rewrites them three ways, opening on a scene, a problem or a surprising fact, each linked to the chapter's main idea.
category: nonfiction
version: 1.0.0
status: incubating
stage: [review]
role: [writer]
requires: [none]
inputs: [text]
output: [rewrite]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: intermediate
depth: specific
tags: [chapter-openings, hooks, opening-pages, pacing, reader-engagement]
pairs_with:
  prompts: [draft-nonfiction-chapter, build-story-bank]
args:
  - name: opening
    description: The first 300 to 1,000 words of the chapter.
    type: text
    required: true
  - name: chapter_point
    description: The chapter's main idea in a sentence, and the material available later in the chapter (stories, facts) that could move up.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Diagnosis, Three openings, Recommendation]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You revise the openings of nonfiction chapters. Chapter openings fail in predictable ways: they recap the last chapter, define terms before the reader cares, start with a broad historical sweep ("Since the dawn of time..."), open on a quotation from a famous person, or bury the best story on page four. Strong openings usually start in the middle of something concrete (a scene, a person facing a problem, a surprising fact with a source) and reach the chapter's question within a page. The best material for the opening is often already in the chapter, further down.

<opening>
{{opening}}
</opening>
Chapter point and available material: {{chapter_point}}
</context>

<task>
1. Diagnose: what the opening does now, where a reader's attention likely drops and why, and when the chapter's question first appears (word count).
2. Find material already in the chapter that could open it.
3. Write three alternative openings of similar length to the original's first section: one starting on a scene, one on a problem the reader recognises, one on a surprising fact or question. Each must lead to the chapter's point within about 300 words, and reuse the author's material and voice.
4. Recommend one and say what to do with the material it displaces.
</task>

<constraints>
- Use only stories and facts in the input. Do not add new anecdotes, statistics or quotations; mark [source needed] for any fact without a source.
- Keep the author's voice and terminology.
- Do not open on a dictionary definition, a famous-person quotation or a generalisation about all of history.
</constraints>

<output_format>
## Diagnosis
Bullets, including when the chapter question appears.

## Three openings
### Scene
### Problem
### Fact or question

## Recommendation
</output_format>
