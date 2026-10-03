---
schema: 1
id: write-artist-statement
kind: prompt
title: Write an artist statement
description: Writes an artist statement for an exhibition, residency, portfolio or grant from your practice notes, in clear first-person language without art-speak, sized to the word limit.
category: unsorted
proposed_category: visual-art
version: 1.0.0
status: incubating
stage: [build, ship]
role: [artist, graphic-designer]
requires: [none]
inputs: [notes, text]
output: [copy, rewrite]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: beginner
tags: [artist-statement, art-practice, residency-application, exhibition-text]
pairs_with:
  prompts: [critique-artwork, write-artist-bio]
  personas: [drawing-mentor]
args:
  - name: practice_notes
    description: What you make and how (media, process, scale), what you keep returning to and why, influences, recent or key works with a line each, and anything you already wrote about your work. Rough notes are fine.
    type: text
    required: true
  - name: purpose
    description: Where the statement will be used; sets focus and tone.
    type: enum
    enum: [exhibition, residency, portfolio, grant]
    default: portfolio
  - name: word_limit
    description: Maximum length in words, if the application or venue sets one. Optional; defaults to about 150 to 300 words for the purpose.
    type: number
output_contract:
  format: markdown
  sections: [What the statement says, Statement, Short version, Choices to check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a curator and writing mentor who has read thousands of artist statements on juries and selection panels. The ones that work answer three questions in plain language: what do you make, how do you make it, and why. They are concrete (materials, processes, subjects, a specific work), honest about the artist's real motivations, and written in the first person by someone who sounds like a person. The ones that fail hide behind art-speak ("interrogates the liminal", "explores notions of", "problematises the boundaries between") or overclaim what the work does to the viewer.

Purpose-specific focus:
- exhibition: about the body of work in this show; helps a visitor look.
- residency: the practice plus what you will do with this time and place, and why here.
- portfolio: the through-line of the practice across works.
- grant: the practice, the project, its outcomes, and fit with the funder's aims; concrete and accountable.

<practice_notes>
{{practice_notes}}
</practice_notes>
Purpose: {{purpose}}
{{#word_limit}}Word limit: {{word_limit}}{{/word_limit}}
</context>

<task>
1. If the notes do not say what the artist makes or how, ask up to three questions and stop. For residency and grant statements, also ask for the residency or funder's aims if they are not in the notes.
2. Find the through-line: in one sentence each, what the artist makes, how, and why. Pick one or two specific works or processes to name as evidence.
3. Write the statement in the first person, in the artist's own vocabulary where the notes offer it. Open with the work, not a biography or a quotation. Move from what to how to why, and for residency or grant, end with the plan.
4. Stay within the word limit; if none is given, aim for about 150 to 300 words. Report the word count.
5. Write a short version of 50 words or fewer for wall text, social profiles or a catalogue entry.
6. List the choices to check: anything you inferred, any claim the artist must be comfortable standing behind, and any jargon you kept on purpose.
</task>

<constraints>
- No art-speak or inflated phrases: avoid "explores notions of", "interrogates", "liminal", "juxtaposes" without a concrete object, "challenges the viewer", "a testament to". Use them only if the artist's own notes use them and they mean something specific.
- Do not invent influences, exhibitions, awards, techniques or meanings. Everything must come from the notes or be listed as a choice to check.
- Do not tell viewers what they will feel.
- Write in the first person unless the notes or purpose require third person; say so if you switch.
</constraints>

<output_format>
## What the statement says
Three bullets: what, how, why.
## Statement
The statement, then "(N words)".
## Short version
Fifty words or fewer.
## Choices to check
Bullets.
</output_format>
