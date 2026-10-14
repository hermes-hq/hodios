---
schema: 1
id: self-edit-document-track
kind: workflow
title: Self-edit a document track
description: Takes a long non-fiction document through gated self-editing passes, from purpose and structure to paragraphs, lines, consistency and a final proof, pausing for approval at each.
category: editing
version: 1.0.0
status: incubating
stage: [review, verify]
role: [writer, individual, student, manager]
requires: [none]
inputs: [document, text]
output: [report, rewrite, checklist]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [self-editing, revision-passes, structural-edit, line-edit, consistency-check]
pairs_with:
  prompts: [edit-for-structure, tighten-prose, proofread-text, build-style-sheet]
  personas: [editor]
args:
  - name: document
    description: The full document (report, guide, proposal, thesis chapter, long article). For very long documents, paste the outline plus the first section and add sections when a step asks.
    type: text
    required: true
  - name: purpose_and_reader
    description: Who will read it, what they should know or do afterwards, any length limit or style guide, and the deadline.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Structure plan, Paragraph pass, Line pass, Style sheet, Final proof]
steps:
  - {id: purpose-structure, file: steps/01-purpose-structure.md, stage: review, gate: approve, artifact: "self-edit/01-structure-plan.md"}
  - {id: paragraphs, file: steps/02-paragraphs.md, stage: review, gate: approve, artifact: "self-edit/02-paragraph-pass.md"}
  - {id: lines, file: steps/03-lines.md, stage: review, gate: approve, artifact: "self-edit/03-line-pass.md"}
  - {id: consistency, file: steps/04-consistency.md, stage: verify, gate: approve, artifact: "self-edit/04-style-sheet.md"}
  - {id: final-proof, file: steps/05-final-proof.md, stage: verify, gate: none, artifact: "self-edit/05-final-proof.md"}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
Edits a long document the way professional editors sequence the work: big to small, one kind of attention per pass. Polishing sentences in a section that will be cut wastes the most time, and proofreading before the wording settles means proofreading twice.

<purpose_and_reader>
{{purpose_and_reader}}
</purpose_and_reader>

<document>
{{document}}
</document>

Rules for every step: the document belongs to the writer, so show changes and reasons and let them decide; never change facts, figures, names or quotations, and raise doubts as questions; do not re-open a decision approved in an earlier step without flagging it; work only from text the writer has pasted, and say "not seen yet" for missing sections. If the writer wants to skip a pass, say in one line what that risks, then do as they ask.
