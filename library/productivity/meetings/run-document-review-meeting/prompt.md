---
schema: 1
id: run-document-review-meeting
kind: prompt
title: Run a meeting to review a document
description: Runs a review meeting for a draft document, plan or proposal - who reviews what, comments gathered beforehand, a triage of comments, discussion of only the big issues, and one owner for the revision.
category: meetings
version: 1.0.0
status: incubating
stage: [review]
role: [manager, product-manager, project-manager, writer]
requires: [none]
inputs: [document, text]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [document-review, review-comments, sign-off, facilitation]
pairs_with:
  prompts: [run-silent-meeting, write-decision-memo, write-meeting-recap-email]
args:
  - name: document
    description: What is being reviewed (for example "draft annual plan, 12 pages", "new expenses policy", "grant proposal") and its stage (early draft, near final).
    type: text
    required: true
  - name: reviewers
    description: Who reviews, their roles and what each cares about, and who owns the document.
    type: text
    required: true
  - name: deadline
    description: When the revised document must be final, and whether it needs a formal sign-off. Optional.
    type: text
  - name: minutes
    description: Meeting length in minutes.
    type: number
    default: 45
output_contract:
  format: markdown
  sections: [Review brief, Before the meeting, Comment triage, Run sheet, Resolving disagreements, Revision and sign-off]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design meetings that review a document and lead to a better version. Document review meetings go wrong when reviewers read the draft for the first time in the room, the meeting walks page by page fixing typos, every reviewer comments on everything so feedback contradicts itself, the loudest reviewer's taste wins, and the meeting ends with a pile of comments but no one owning the revision or deciding between conflicting views. Good reviews tell each reviewer what kind of feedback is wanted at this stage (direction and structure for early drafts, accuracy and wording for near-final ones), give reviewers a focus area, collect written comments before the meeting, have the owner triage them so the meeting discusses only substantive or conflicting points, and agree who decides when reviewers disagree and when the next version is due.

Document: {{document}}
Reviewers: {{reviewers}}
{{#deadline}}Deadline and sign-off: {{deadline}}{{/deadline}}
Length: {{minutes}} minutes
</context>

<task>
1. Write a review brief to send with the document: its purpose and audience, its stage, the feedback wanted and not wanted at this stage, a focus area per reviewer based on their role, how to comment (inline, labelled as must-fix, should-fix or suggestion), and the comment deadline.
2. List what happens before the meeting: comments due a set time before, the owner triages them, and minor edits are accepted without discussion.
3. Give the owner's triage method: accept, reject with a reason, needs discussion; group comments into themes; spot conflicting comments to bring to the meeting.
4. Build a run sheet that fits the length: confirm purpose and stage; the few substantive themes in priority order; conflicting comments; anything missing from the document; decisions and next steps. Do not include a page-by-page walk-through.
5. Explain how disagreements are resolved: the document owner decides unless sign-off belongs to someone else, criteria to use (the document's purpose and audience), and how dissent is noted.
6. Plan revision and sign-off: one owner for the revision, a date for the next version, how reviewers see what changed, and who signs off.
</task>

<constraints>
- Do not rewrite the document or invent its contents; this is about running the review.
- Match the feedback asked for to the document's stage.
- Keep the meeting to discussing substantive and conflicting points, not wording.
- If the document is too early or too rough for a group review, say so and suggest a one-to-one or outline review instead.
</constraints>

<output_format>
## Review brief
Ready-to-send text.

## Before the meeting
Timeline bullets.

## Comment triage
Method and a table: Comment theme | From | Decision | Needs discussion?

## Run sheet
Table: Time | Item | Output.

## Resolving disagreements
Bullets.

## Revision and sign-off
Owner, dates, change visibility, sign-off.
</output_format>
