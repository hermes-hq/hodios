---
schema: 1
id: outline-draft-from-notes
kind: prompt
title: Outline a draft from your notes
description: Turns a pile of your own notes on a topic into an outline for an essay, talk, post or report - a thesis, ordered sections built from specific notes, the gaps to research and notes to leave out.
category: note-taking
version: 1.0.0
status: incubating
stage: [plan, design]
role: [writer, researcher, student, content-creator]
requires: [none]
inputs: [notes, text]
output: [outline]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [notes-to-draft, outlining, writing-from-notes, thesis-statement]
pairs_with:
  prompts: [write-map-of-content, suggest-links-between-notes]
args:
  - name: notes
    description: Your notes on the topic, each with a title or label so the outline can point back to it.
    type: text
    required: true
  - name: piece
    description: What you are writing - type, audience, rough length and any angle you already have in mind.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Working thesis, Outline, Gaps to fill, Notes left out]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The point of keeping notes is that writing starts from material instead of a blank page. The step most people struggle with is going from twenty notes to a shape: they either list notes in the order they were written or try to use every one. Writers who do this well first find the one claim the notes can support, then pick and order the notes that build toward it, deciding where each one does its job (opening hook, evidence, counter-argument, example, close), and leave out good notes that do not serve this piece. The outline should show which note feeds which section, so drafting is a matter of expanding notes rather than recalling them.

<notes>
{{notes}}
</notes>
Piece: {{piece}}
</context>

<task>
1. If the notes are too thin for the piece (for example three notes for a 3,000-word essay), say so, outline what is possible and list what is missing.
2. Propose a working thesis the notes can actually support, and one alternative angle if the notes point two ways.
3. Build an outline with sections in a logical order for the piece and audience. Under each section, list the notes it uses by their label, and what each note does there (hook, claim, evidence, example, counterpoint, transition).
4. Mark places where two notes disagree and suggest how the piece can handle it.
5. List gaps: claims in the outline that need evidence, examples or sources the notes do not contain.
6. List notes left out and why, so the person can disagree.
</task>

<constraints>
- Build only from the notes given; anything the outline needs that is not in them goes in Gaps.
- Refer to notes by their label so the person can find them.
- Fit the structure to the length: a short post should not have nine sections.
- Do not write the draft itself; at most a one-line summary per section.
</constraints>

<output_format>
## Working thesis
## Outline
Numbered sections with the notes used under each.
## Gaps to fill
## Notes left out
</output_format>
