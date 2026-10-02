---
schema: 1
id: respond-to-reviewers
kind: prompt
title: Respond to peer reviewers
description: Drafts a point-by-point response to peer-review comments, giving the change made or a polite, evidenced rebuttal for each, never claiming unmade changes. Use for revise-and-resubmit.
category: scientific-writing
version: 1.0.1
status: experimental
stage: [review]
role: [researcher, student]
requires: [none]
inputs: [document, text]
output: [message, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [revise-and-resubmit, rebuttal-letter, manuscript]
pairs_with:
  prompts: [write-peer-review, write-abstract]
args:
  - name: reviews
    description: The decision letter and all reviewer comments, pasted in full.
    type: text
    required: true
  - name: manuscript_changes
    description: What you changed or plan to change, and where (page, line or section); also any points you disagree with and why.
    type: text
output_contract:
  format: markdown
  sections: [Triage, Response letter, Open items]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "Puts each quoted reviewer comment on its own block-quote line so it renders as a quote."}
---
<context>
Editors read the response letter to decide whether the authors took the reviews seriously, and reviewers check that every point was answered and that each answer matches the revised manuscript. Good responses quote each comment, answer it directly, say exactly what changed and where, and disagree only with evidence and courtesy. Letters fail when they skip or merge points, are defensive, thank the reviewer in every line, or claim changes that are not in the manuscript.
</context>

<task>
Draft a response to these reviews:
<reviews>
{{reviews}}
</reviews>
{{#manuscript_changes}}
Changes made or planned, and the authors' positions:
<changes>
{{manuscript_changes}}
</changes>
{{/manuscript_changes}}

1. Split the reviews into individual comments, numbered by reviewer (R1.1, R1.2, R2.1…), and split multi-part comments into separate points. Include the editor's own requests as E.1, E.2.
2. Triage each comment: type (major, minor, clarification, typo), proposed action (accept, partially accept, rebut), and effort (low, medium, high).
3. For each comment, write the response: a direct answer in the first sentence, then the change made with its location, or, for a rebuttal, the reason with evidence (data, analysis, citations from the authors' material), and any concession or compromise offered.
4. Where reviewers conflict, say so to the editor and explain which way you went and why.
5. Write a short opening paragraph to the editor summarising the main changes.
</task>

<constraints>
- Claim a change only if it appears in the authors' changes. Where you have no information, write a proposed response marked "[AUTHOR TO CONFIRM: proposed change …]" so nothing is promised by accident.
- Quote every reviewer comment verbatim; never paraphrase it in a way that changes its meaning, and never leave one out.
- Do not invent analyses, results, references or page numbers. Use "[page/line]" placeholders.
- Be courteous and specific. Thank the reviewers once in the opening, not in every response. Concede valid points plainly. Never be sarcastic, never question the reviewer's competence.
- A rebuttal needs a reason a reasonable reviewer could accept. If the only reason is effort, say so honestly and offer a limitation statement instead.
</constraints>

<output_format>
## Triage
A table: ID | summary of the comment (under 12 words) | type | action | effort.
## Response letter
The opening paragraph to the editor, then for each comment:
**R1.1**
> The reviewer's comment, quoted verbatim.

**Response:** the answer.
**Change:** what changed and where, or "No change" with the reason.
## Open items
A checklist of every "[AUTHOR TO CONFIRM]" and placeholder, plus any comment that needs new analysis or data.
</output_format>
