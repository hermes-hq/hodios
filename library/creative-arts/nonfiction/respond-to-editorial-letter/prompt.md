---
schema: 1
id: respond-to-editorial-letter
kind: prompt
title: Respond to an editor's editorial letter
description: Turns a publisher's editorial letter on a nonfiction manuscript into a revision plan, sorting each note into agree, adapt or discuss, and drafts a reply that pushes back with reasons where needed.
category: nonfiction
version: 1.0.0
status: incubating
stage: [review]
role: [writer]
requires: [none]
inputs: [document, notes]
output: [plan, message]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [editorial-letter, revision-plan, developmental-edit, author-editor, manuscript-revision]
pairs_with:
  prompts: [answer-copyedit-queries, cut-book-manuscript-to-length]
  workflows: [nonfiction-book-track]
args:
  - name: editorial_letter
    description: The editor's letter or notes on the manuscript.
    type: text
    required: true
  - name: author_reaction
    description: Your honest first reaction to each point, and anything you strongly want to keep.
    type: text
    required: false
  - name: deadline
    description: When the revised manuscript is due.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Notes in brief, Diagnosis behind the notes, Revision plan, Reply to the editor]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help nonfiction authors handle the editorial letter, the editor's big-picture notes after reading the full manuscript. Authors often react to the proposed fix and miss the problem behind it: "move chapter 6 earlier" may really mean "readers lose the thread in the middle". Experienced authors read the letter twice, sleep on it, separate the diagnosis (which is usually right) from the prescription (which can be negotiated), group notes that share a cause, fix structure before sentences, and reply to the editor with a plan, agreeing generously and disagreeing specifically with reasons and an alternative.

<editorial_letter>
{{editorial_letter}}
</editorial_letter>
{{#author_reaction}}Author's reaction: {{author_reaction}}{{/author_reaction}}
Deadline: {{deadline}}
</context>

<task>
1. List each note in a sentence, numbered, quoting the editor's key words.
2. For each note, name the likely underlying problem (the diagnosis) and group notes that share one.
3. Classify each: agree (do as suggested), adapt (accept the diagnosis, solve it another way, saying how), or discuss (disagree, with the reason and what the author proposes). Use the author's reaction where given; otherwise make a provisional call and mark it.
4. Build a revision plan in order: structural changes first, then chapter-level, then line-level; with an estimate of effort per item and a schedule that fits the deadline. If it does not fit, say what to ask the editor for.
5. Draft a reply to the editor: thanks that names what was most useful, the plan in brief, the adapt and discuss items with reasons and alternatives, questions, and the delivery date.
</task>

<constraints>
- Do not dismiss notes. Even where the author disagrees, take the diagnosis seriously.
- Do not rewrite the manuscript here; plan the revision.
- Keep the reply collegial and short (under 400 words); no defensiveness, no over-apology.
- Do not invent notes the editor did not make.
</constraints>

<output_format>
## Notes in brief
Numbered.

## Diagnosis behind the notes
Grouped problems with the notes they explain.

## Revision plan
Table: Item | Notes addressed | Agree / adapt / discuss | What to do | Effort | When.

## Reply to the editor
Draft email.
</output_format>
