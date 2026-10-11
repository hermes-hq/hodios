---
schema: 1
id: reconcile-reviewer-feedback
kind: prompt
title: Reconcile feedback from several reviewers
description: Merges comments from several reviewers on one draft into a single revision plan, grouping duplicates, resolving conflicts by the document's purpose and listing what to raise with whom.
category: editing
version: 1.0.0
status: incubating
stage: [review]
role: [writer, manager, researcher, editor]
requires: [none]
inputs: [document, notes]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [review-comments, conflicting-feedback, revision-plan, stakeholders, decision-log]
pairs_with:
  prompts: [critique-draft, edit-for-structure, strengthen-argument-in-draft]
  personas: [editor]
args:
  - name: draft
    description: The draft, or a summary of it with section names if it is long.
    type: text
    required: true
  - name: feedback
    description: "Every reviewer's comments, labelled by reviewer and role, for example 'Legal (Sam) - ...'. Tracked-change notes pasted as text are fine."
    type: text
    required: true
  - name: purpose
    description: What the document is for, who reads it and who has final say, for example "policy for all staff; HR director signs off".
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Summary, Feedback grouped, Conflicts and recommended resolution, Revision plan, Replies to reviewers]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help writers who have collected comments from several reviewers and now face a pile of overlapping, sometimes contradictory feedback. The usual mistakes are applying every comment in order (producing a document that pleases nobody), letting the loudest or most senior reviewer win on matters outside their expertise, and silently ignoring comments, which reviewers notice. Experienced editors group comments by issue, recognise that several reviewers circling the same paragraph usually signal a real problem even when their fixes differ, weigh each comment by the reviewer's expertise and the document's purpose and reader, separate must-fix items (errors, legal or compliance points, factual corrections) from preferences, and keep a short decision log so every reviewer can see what happened to their comment. Who has final say matters: conflicts they must settle are escalated, not guessed.

<draft>
{{draft}}
</draft>

<feedback>
{{feedback}}
</feedback>

Purpose and sign-off: {{purpose}}
</context>

<task>
1. List every comment with an id (reviewer initial plus number) so none is lost.
2. Group comments that address the same issue, and say which issues were raised by more than one reviewer.
3. Classify each issue: must fix (factual error, legal, compliance, safety, accessibility), substantive (structure, argument, audience fit), or preference (style, wording taste).
4. Identify conflicts between reviewers. For each, explain both positions, recommend a resolution based on the purpose and reader and on each reviewer's area of expertise, and mark whether the writer can decide or must escalate to the person with final say.
5. Build a revision plan in order of impact: what to change, where, and which comment ids it resolves. Include comments the writer should decline, with a reason.
6. Draft short, courteous replies the writer can send to each reviewer summarising what was done with their comments.
</task>

<constraints>
- Do not rewrite the document; plan the revision.
- Account for every comment: accepted, partly accepted, declined or escalated.
- Do not override legal, compliance or factual corrections on grounds of style; flag them for the owner if you doubt them.
- Do not invent comments or attribute views to reviewers that they did not express.
</constraints>

<output_format>
## Summary
Number of comments, main themes and how many conflicts.

## Feedback grouped
Table: Issue | Comment ids | Reviewers | Type.

## Conflicts and recommended resolution
For each: positions, recommendation, decide or escalate.

## Revision plan
Numbered list: change, location, resolves ids.

## Replies to reviewers
One short reply per reviewer.
</output_format>
