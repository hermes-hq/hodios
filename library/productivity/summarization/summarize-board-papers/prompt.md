---
schema: 1
id: summarize-board-papers
kind: prompt
title: Summarise board papers before the meeting
description: Reads a board or committee pack for a member and lists the decisions being asked for, the key numbers, risks, what has changed since last time and questions to raise.
category: summarization
version: 1.0.0
status: incubating
stage: [review]
role: [executive, founder, manager, individual]
requires: [none]
inputs: [document]
output: [summary, questions]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [board-pack, governance, trustees, committee-papers, meeting-prep]
pairs_with:
  prompts: [extract-key-numbers, extract-open-questions, summarize-slide-deck]
args:
  - name: pack
    description: The board or committee papers - agenda, reports, financials, minutes of the last meeting. Paste as much as you have.
    type: text
    required: true
  - name: my_role
    description: Your role on the board or committee and any focus (for example "treasurer", "independent trustee, chairs the audit committee", "staff governor").
    type: text
    required: false
output_contract:
  format: markdown
  sections: [The meeting in brief, Decisions asked of the board, Key numbers, Risks and changes since last time, Questions to raise, What is missing from the pack]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a board, trustee or committee member read a long pack before a meeting. Packs are written by management and tend to put good news up front, bury decisions inside "for noting" items, and present numbers without the comparison that matters (against budget, last year, forecast). Experienced members go to the decisions first, read the financials against plan, check what changed since the last minutes and whether previous actions were closed, and prepare a few sharp questions rather than many vague ones. Their duty is to challenge and approve with enough information; a summary that just restates management's framing does not help them.

<pack>
{{pack}}
</pack>

{{#my_role}}Member's role and focus: {{my_role}}{{/my_role}}
</context>

<task>
1. Read the whole pack, including appendices, the last minutes and any action log.
2. Summarise the meeting in a few lines: the main items and the one or two that matter most.
3. List every decision or approval the board is asked for, including ones hidden in items labelled "for noting" or "for information", with the paper reference and what approving commits the organisation to.
4. Pull out the key numbers with their comparison (against budget, prior period, forecast) and flag variances the papers do not explain.
5. List risks raised, risks that seem to be missing, and what has changed since the last meeting, including actions from the last minutes that are still open.
6. Draft five to eight questions to raise, each tied to a paper and phrased neutrally, prioritised for the member's role.
7. List information the pack should contain but does not (for example no cash forecast before a spending decision).
</task>

<constraints>
- Use only the pack. Do not invent figures, prior decisions or legal duties.
- Quote paper numbers or headings so the member can find each point.
- Phrase questions to seek information, not to accuse.
- Do not give a view on how the member should vote; set out what they need to know to decide.
- If the pack seems incomplete, say which items look missing.
</constraints>

<output_format>
## The meeting in brief
Three to five lines.

## Decisions asked of the board
Table: Paper | Decision | What it commits us to | Information given

## Key numbers
Table: Figure | Value | Compared with | Variance explained?

## Risks and changes since last time
Bullets, including open actions from the last minutes.

## Questions to raise
Numbered, each with its paper reference.

## What is missing from the pack
Bullets.
</output_format>
