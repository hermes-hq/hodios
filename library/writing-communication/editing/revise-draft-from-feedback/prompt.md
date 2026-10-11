---
schema: 1
id: revise-draft-from-feedback
kind: prompt
title: Revise a draft from feedback
description: Applies a reviewer's comments to a draft, logs how each comment was handled (done, partly, declined with reason, needs the author) and flags comments that conflict or would weaken the text.
category: editing
version: 1.0.0
status: incubating
stage: [review]
role: [writer, student, researcher, consultant]
requires: [none]
inputs: [text, document]
output: [rewrite, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [redrafting, review-comments, track-changes, response-to-reviewers, feedback-log]
pairs_with:
  prompts: [reconcile-reviewer-feedback, compare-draft-versions, write-tactful-edit-comments]
  personas: [editor]
args:
  - name: draft
    description: The draft to revise.
    type: text
    required: true
  - name: feedback
    description: The reviewer's comments, ideally numbered or quoted with the passage they refer to.
    type: text
    required: true
  - name: author_notes
    description: Optional instructions from you, such as comments you disagree with, facts the reviewer asked for, or a length limit.
    type: text
output_contract:
  format: markdown
  sections: [Revised draft, Comment log, Needs you]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Applying feedback well means more than accepting every comment. Some comments are clear fixes; some point at a real problem but suggest a weak solution ("add more detail" where the real issue is a missing step); some conflict with each other or with the document's purpose; some ask for facts only the author has. Revisers fail by applying every comment literally, which can make a text longer and less coherent, by silently skipping awkward ones, or by inventing the evidence a reviewer asked for. A comment log that says what happened to each comment lets the author and reviewer see the revision at a glance, and is expected in academic and professional review.
</context>

<task>
Revise the draft by working through the feedback.

<draft>
{{draft}}
</draft>

<feedback>
{{feedback}}
</feedback>
{{#author_notes}}Author's notes: {{author_notes}}{{/author_notes}}

1. If the draft or feedback is missing, ask for it and stop. Number the comments if they are not numbered.
2. For each comment, identify the passage it refers to and the underlying problem it points at.
3. Decide how to handle it: apply as suggested; apply differently (fix the underlying problem another way); partly apply; decline, with a reason tied to the purpose or another comment; or needs the author (facts, data, decisions or permissions only they have). Follow the author's notes where they cover a comment.
4. Flag comments that conflict with each other or with the document's purpose, and choose the reading that best serves the purpose, saying so.
5. Make the revisions. Mark places that need the author's input with `[AUTHOR: …]`. Keep everything not touched by a comment unchanged.
6. Check the revised draft still reads as one piece: joins, numbering, cross-references and length.
</task>

<constraints>
- Do not invent data, citations, quotes or facts a reviewer asked for.
- Do not make unrequested edits beyond what the comments and joins require.
- Every comment gets a log entry; none are silently skipped.
- Keep the author's voice and terminology.
</constraints>

<output_format>
## Revised draft
The full revised draft, with `[AUTHOR: …]` markers where needed.
## Comment log
A table: # | Comment (short) | Action (applied, applied differently, partly, declined, needs author) | What changed or why not.
## Needs you
Numbered list of questions and decisions for the author, including any conflicting comments. "None" if none.
</output_format>
