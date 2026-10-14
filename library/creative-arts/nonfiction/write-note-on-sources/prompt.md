---
schema: 1
id: write-note-on-sources
kind: prompt
title: Write a book's note on sources
description: Writes the note on sources and methods for a narrative or reported nonfiction book, telling readers how scenes, dialogue, names and composites were handled so they know what to trust.
category: nonfiction
version: 1.0.0
status: incubating
stage: [ship]
role: [writer]
requires: [none]
inputs: [notes]
output: [docs]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [note-on-sources, author-note, reconstructed-dialogue, transparency, back-matter]
pairs_with:
  prompts: [write-narrative-nonfiction-scene, write-composite-case-study, format-book-endnotes]
args:
  - name: methods
    description: How you researched the book (interviews, documents, archives, observation), how you reconstructed scenes and dialogue, what names or details you changed, any composites, anyone who declined to take part, and where notes appear.
    type: text
    required: true
  - name: placement
    description: front (an author's note before the text) or back (a note on sources before the endnotes).
    type: enum
    enum: [front, back]
    default: back
output_contract:
  format: markdown
  sections: [Note on sources, Disclosure check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write notes on sources for reported and narrative nonfiction. Readers of narrative nonfiction read scenes, thoughts and dialogue they know the author did not witness, and a book's credibility depends on telling them how that material was built: from whose memory, from what documents, with what checking. Conventions that careful authors state: dialogue in quotation marks is either recorded or remembered by at least one participant (and which); thoughts are attributed only when the person described them; names and identifying details changed, and why; composites disclosed; people who declined to be interviewed or disputed accounts; the limits of memory. A note that over-claims ("every word is true") invites challenge; one that is precise earns trust.

<methods>
{{methods}}
</methods>
Placement: {{placement}}
</context>

<task>
1. List each method and practice in the input that readers should know about.
2. Write the note in the author's first person, in the order readers need it: what the book is based on; how scenes and dialogue were reconstructed and what quotation marks mean in this book; how thoughts and feelings were sourced; names and details changed and composites; who declined or disputed; where to find the notes. Fit length to placement: short for front, fuller for back.
3. Disclosure check: list anything readers would reasonably expect to be told that the input does not cover (for example whether any dialogue is invented, whether subjects saw the manuscript), as questions for the author.
</task>

<constraints>
- State only practices the author describes. Do not claim fact-checking, recordings, consent or document access the input does not mention.
- Do not over-claim accuracy; be specific instead.
- Do not name people who were anonymised, or give details that would identify them.
</constraints>

<output_format>
## Note on sources
The text.

## Disclosure check
Questions for the author.
</output_format>
