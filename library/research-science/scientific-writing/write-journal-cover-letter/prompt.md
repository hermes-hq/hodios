---
schema: 1
id: write-journal-cover-letter
kind: prompt
title: Write a journal submission cover letter
description: Writes a manuscript submission cover letter stating the contribution, the fit with the journal's scope and the required declarations, in one page an editor can act on. For authors submitting papers.
category: scientific-writing
version: 1.0.0
status: incubating
stage: [ship]
role: [researcher, student]
requires: [none]
inputs: [document, text]
output: [message, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [manuscript-submission, cover-letter, journal-fit, desk-rejection]
pairs_with:
  prompts: [write-abstract, respond-to-reviewers, check-manuscript-reporting]
args:
  - name: manuscript_summary
    description: Title, article type, the question, main findings with key numbers, why it matters, and the abstract if you have it.
    type: text
    required: true
  - name: journal
    description: The target journal. Paste its aims and scope or author instructions too, if you can, so the fit is argued against the journal's own words.
    type: string
    required: true
  - name: declarations
    description: Facts for the declarations - conflicts of interest, funding, preprint, prior submission or related papers, data availability, suggested or excluded reviewers, and the editor's name if known.
    type: text
output_contract:
  format: markdown
  sections: [Cover letter, Declarations checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Editors read cover letters while deciding whether to send a paper for review or reject it at the desk. A useful letter answers three questions in under a page: what did you find, why does it matter to this journal's readers, and is there anything the editor must know (declarations, related papers, preprints, reviewer suggestions). It does not repeat the abstract, inflate novelty ("the first ever"), or flatter the journal. Journals differ in what they require in the letter, so author instructions win over convention.
</context>

<task>
Write a cover letter for submitting this manuscript to {{journal}}.
<manuscript>
{{manuscript_summary}}
</manuscript>
{{#declarations}}
<declarations>
{{declarations}}
</declarations>
{{/declarations}}

1. Opening: the title, the article type, and a one-sentence statement of what the paper shows.
2. Contribution: two or three sentences on the main finding with its key number and what it adds to existing knowledge, phrased as specifically as the evidence allows.
3. Fit: why this journal's readers need this paper, tied to the journal's stated scope or recent themes if the user supplied them. If no scope was supplied, keep the fit general and flag it for the author to sharpen.
4. Declarations: the statements journals commonly require (originality and not under consideration elsewhere, all authors approved, conflicts of interest, funding, preprint, ethics approval, data availability), using only the facts provided, plus suggested or opposed reviewers if given, with a reason for any opposed reviewer stated neutrally.
5. Close politely with the corresponding author's details as placeholders.
6. After the letter, list each declaration as provided, assumed (needs the author's confirmation), or missing.
</task>

<constraints>
- Keep the letter to one page (about 250–400 words).
- Use only the facts given. Do not invent conflicts of interest, funding, ethics approvals, preprints or reviewer names. Where a standard declaration needs a fact you do not have, insert [CONFIRM: …].
- Do not claim novelty you cannot support ("the first study") unless the author states it and it is plausible; otherwise use specific, defensible wording.
- Do not describe the journal's scope from memory as if quoted. If you mention the scope, use the author's pasted text or keep it general.
- Address the editor by name only if the user gave one; otherwise use "Dear Editor".
</constraints>

<output_format>
## Cover letter
The letter, ready to paste.
## Declarations checklist
Table: declaration | status (provided, assumed, missing) | note.
</output_format>
