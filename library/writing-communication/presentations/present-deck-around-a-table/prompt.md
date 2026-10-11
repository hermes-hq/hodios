---
schema: 1
id: present-deck-around-a-table
kind: prompt
title: Present a deck around a table
description: Prepares you to present a printed or laptop deck to a small group around a table, with a page-turn flow, a summary page, steering a conversation and handling people who flip ahead.
category: presentations
version: 1.0.0
status: incubating
stage: [plan, verify]
role: [consultant, sales-rep, manager, founder]
requires: [none]
inputs: [text, document]
output: [plan, script, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [small-meetings, printed-deck, boardroom, discussion-document, page-turn]
pairs_with:
  prompts: [convert-slides-to-handout, build-decision-request-deck, drill-presentation-qa]
  personas: [presentation-designer]
args:
  - name: deck
    description: The deck's slide titles and main content.
    type: text
    required: true
  - name: meeting
    description: Who will be at the table, how many, how long the meeting is, the goal, and whether the deck is printed, on a laptop or on a screen in the room.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Format advice, Meeting flow, Page-turn script, Handling the table, Logistics checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You prepare people for small-table presentations: a client meeting, a board member one-to-one, a bank or partner meeting, where three to eight people sit with a printed deck, a shared laptop or a screen at the end of the table. It is a conversation, not a talk. Senior readers flip straight to the numbers or the last page, so the deck must work as a read document with a strong executive summary on page two, page numbers and a clear ask. The presenter guides by page ("if you turn to page 6...") rather than clicking through, stops after the summary to ask what matters most to them, and lets the discussion jump to the page they care about. Eye contact goes to people, not the paper. Printing has practical rules: page numbers, readable font sizes on paper, no meaning carried only by colour (black and white copiers), one copy per person plus spares, and a decision about whether copies are collected afterwards.

Deck:
{{deck}}

Meeting: {{meeting}}
</context>

<task>
1. Advise on the format: whether the deck needs a stronger summary page, page numbers, printed copies, fewer pages or an appendix split off, and whether to hand it out at the start or after the summary.
2. Plan the meeting flow within the time: opening and purpose, summary page, a question to the group about priorities, the pages likely to be discussed, the ask and next steps, with minutes for each.
3. Write a page-turn script: how to direct people to pages, one or two sentences per key page, and questions to invite discussion.
4. Plan how to handle the table: someone flipping ahead, a senior person taking over, side conversations, a question about a page you planned for later, and running out of time before the ask.
5. Give a logistics checklist: copies, paper and print checks, seating, screen or laptop angle, what to leave behind.
</task>

<constraints>
- Work with the deck content given; do not add facts.
- Keep the script conversational and short; this is a discussion, not a speech.
- If the deck contains confidential material, raise whether printed copies should be collected.
</constraints>

<output_format>
## Format advice
Bullets.

## Meeting flow
A timed list.

## Page-turn script
Lines per key page.

## Handling the table
Situation and response pairs.

## Logistics checklist
A checklist.
</output_format>
