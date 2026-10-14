---
schema: 1
id: write-misconduct-concern-to-editor
kind: prompt
title: Raise a research integrity concern with an editor
description: Writes a confidential, factual note to a journal editor about a suspected integrity problem in a manuscript or paper, laying out evidence, innocent explanations and requests without accusing anyone.
category: peer-review
version: 1.0.0
status: incubating
stage: [review]
role: [researcher, editor]
requires: [none]
inputs: [text, notes]
output: [message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [research-integrity, cope, confidential-comments, image-integrity, plagiarism]
pairs_with:
  prompts: [screen-manuscript-for-integrity-issues, write-peer-review]
args:
  - name: concern
    description: What you noticed, with exact locations (figure panels, table cells, passages) and any comparisons you made, such as a matching earlier publication.
    type: text
    required: true
  - name: context
    description: Whether you are a reviewer on this manuscript or a reader of a published paper, the journal, and whether you want to stay anonymous.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Before you send, Message to the editor, Evidence annex outline]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Editors act on integrity concerns through processes based on COPE (Committee on Publication Ethics) guidance, which start with the editor contacting the authors for an explanation and, where needed, the institution. Editors can act quickly on concerns that are specific, documented and neutral: which panel duplicates which, which passage matches which source, which numbers cannot be reconciled. They are slowed by concerns that are vague, emotional, mixed with scientific disagreement, or already broadcast publicly, which can prejudice the process and expose the reporter to legal risk. A reviewer who suspects a problem should raise it in confidential comments or a separate message to the editor, not in the report to the authors, and should not contact the authors or anyone else. For published papers, the route is the journal's editor or integrity team, with post-publication forums as a later step.
</context>

<task>
Write a confidential message to the editor about this concern.
<concern>
{{concern}}
</concern>
<context>
{{context}}
</context>

1. Check the concern before writing: list the innocent explanations that should be ruled out (for example legitimate reuse of a control image with disclosure, the authors' own preprint, a shared template, rounding) and say whether the user's evidence already rules them out.
2. Write the message: who you are in relation to the paper, the paper's title or manuscript number, a one-sentence statement of the concern, then each observation with its exact location and what it is compared with.
3. State what you are not alleging: that the observations need explanation, not that misconduct has occurred.
4. Make neutral requests, such as asking the authors for original images or raw data, or checking the similarity report.
5. State any conflict of interest the user has and their wish for anonymity.
6. Outline an evidence annex: annotated figure crops or side-by-side text comparisons the user should prepare.
</task>

<constraints>
- Use factual, neutral language: "panels 2B and 4D appear to show the same region", not "the authors faked". No speculation about motives, nationality or the authors' history.
- Include only observations the user provided; do not add findings or invent publication details.
- Keep scientific disagreements out of the integrity note; they belong in the review.
- Advise against contacting the authors directly or posting publicly while the journal handles it, and remind reviewers of manuscript confidentiality.
- If the evidence is weak (a single possible rounding error), say so in "Before you send" and suggest whether a query in the review is more proportionate.
</constraints>

<output_format>
## Before you send
Innocent explanations to rule out, and whether the concern is strong enough to send.
## Message to the editor
Subject line and body.
## Evidence annex outline
Numbered items to prepare.
</output_format>
