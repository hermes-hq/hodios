---
schema: 1
id: run-silent-meeting
kind: prompt
title: Run a silent, read-first meeting
description: Plans a read-first meeting where everyone reads a written memo in the room and comments before talking, with the doc structure, comment rules, timings and how the discussion closes.
category: meetings
version: 1.0.0
status: incubating
stage: [operate]
role: [manager, product-manager, engineering-manager, executive]
requires: [none]
inputs: [document, topic]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [silent-meeting, memo, written-culture, facilitation, distributed-teams]
pairs_with:
  prompts: [write-decision-memo, write-meeting-agenda, replace-meeting-with-async]
args:
  - name: purpose
    description: What the meeting must achieve (for example "decide whether to sunset the legacy app", "review the Q3 plan and surface risks").
    type: text
    required: true
  - name: attendees
    description: Who attends, roughly how many, and whether remote, in-person or mixed.
    type: text
    required: true
  - name: memo
    description: The draft memo or doc, if you already have one. Optional; a structure will be proposed if empty.
    type: text
  - name: minutes
    description: Meeting length in minutes.
    type: number
    default: 45
output_contract:
  format: markdown
  sections: [Fit check, The document, Comment rules, Run sheet, Closing and follow-up]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design silent, read-first meetings: the first part of the meeting is spent reading a written document together and commenting in it, and only then does the group talk. The approach guarantees everyone has actually read the material, lets quieter and non-native speakers contribute in writing, and surfaces many more questions in parallel than open discussion can. It fails when the document is a slide deck in prose, when it is too long to read in the reading time, when comments become a debate thread nobody resolves, or when the discussion afterwards ignores the comments. Experienced hosts budget reading speed (roughly 200-250 words a minute for careful reading of dense material), ask commenters to label comments by type, and spend the talking time only on the comments that need a conversation.

Purpose: {{purpose}}
Attendees: {{attendees}}
Length: {{minutes}} minutes
{{#memo}}
<memo>
{{memo}}
</memo>
{{/memo}}
</context>

<task>
1. Check fit: say whether a silent meeting suits this purpose and group, and name the main risk.
2. Propose a document structure for the purpose (for example: decision needed, context, options and trade-offs, recommendation, risks, questions for readers). If a memo is supplied, review it against that structure and list gaps; estimate its reading time and say whether to cut it.
3. Set comment rules: one point per comment; label comments (question, concern, suggestion, agree, blocker); reply in thread rather than starting duplicates; name instead of "+1" when agreeing matters for a decision.
4. Build a run sheet that fits the minutes: short framing, reading and commenting time based on the document's length, a few minutes for the author to triage comments into themes, discussion of the blockers and open questions first, decision or next steps, and a close.
5. Give the author's triage method: sort comments into resolve now, take offline, accept without discussion, and say how to show that in the doc.
6. Explain how to close: record the outcome in the doc itself, answer or assign every unresolved comment, and share the final version.
7. Note adjustments for remote and mixed attendance (everyone in the same doc, cameras optional during reading, one person watches comment flow).
</task>

<constraints>
- Do not write the memo's content from scratch with facts you do not have; if no memo is given, give the structure with prompts for each section.
- Reading time must be realistic for the length; if the memo cannot be read in the time, say what to cut.
- The discussion part must be driven by the comments, not by re-presenting the memo.
- Keep it practical: no claims about specific companies' practices.
</constraints>

<output_format>
## Fit check
Two or three lines.

## The document
Structure, or gaps in the supplied memo, plus estimated reading time.

## Comment rules
Bullets to paste at the top of the doc.

## Run sheet
Table: Time | Segment | Who | What happens.

## Closing and follow-up
Bullets.
</output_format>
