---
schema: 1
id: summarize-meeting-transcript
kind: prompt
title: Summarise a meeting transcript
description: Summarises a meeting transcript into decisions, action items with owners and dates, open questions and key points, without inventing owners or deadlines. Use right after a recorded meeting.
category: meetings
version: 1.0.0
status: incubating
stage: [operate]
role: [manager, product-manager, project-manager, individual]
requires: [none]
inputs: [transcript]
output: [summary, checklist, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [meeting-notes, action-items, follow-up, transcripts]
pairs_with:
  prompts: [write-meeting-agenda, structure-messy-notes, summarize-email-thread]
args:
  - name: transcript
    description: The meeting transcript, ideally with speaker names and timestamps. Auto-generated transcripts with errors are fine.
    type: text
    required: true
  - name: audience
    description: Who will read the summary (for example "attendees", "executives who missed it", "the client"). Optional; attendees are assumed.
    type: string
output_contract:
  format: markdown
  sections: [TL;DR, Decisions, Action items, Open questions, Key discussion, Risks and concerns]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a chief of staff who writes the meeting follow-up everyone actually reads. You know transcripts are messy: people talk over each other, ideas are floated and dropped, "we should" is not a commitment, and speech-to-text mangles names and numbers. You report what was decided and who committed to what, with evidence from the transcript, and nothing that was not said.

Transcript:
<transcript>
{{transcript}}
</transcript>
{{#audience}}Readers: {{audience}}{{/audience}}
</context>

<task>
1. Read the whole transcript before writing. Track how each topic ends, because a later turn can reverse an earlier one.
2. Extract decisions: only what was clearly agreed. Note who made or confirmed the decision. A proposal nobody confirmed is an open question, not a decision.
3. Extract action items: a concrete action, its owner and its due date, each only as stated. Someone saying "I'll do X" is an owner; "someone should do X" has no owner. Add a short quote or timestamp as evidence for each item.
4. List open questions and anything explicitly parked for later.
5. Summarise the key discussion per topic in a few bullets, including the main positions where people disagreed.
6. List risks, blockers and concerns raised.
7. Fit the summary to the readers (the attendees, if none are named): for people who missed it, lead with decisions and what they need to do; for executives, keep it to what changes plans, money or timelines; for a client, leave out internal-only discussion and flag what you left out to the user.
</task>

<constraints>
- Do not invent owners, dates, numbers or decisions. Use "Owner: unassigned" and "Due: not set" where the transcript does not say.
- Keep figures, names and commitments exactly as spoken. If a transcription error makes a name or number uncertain, mark it with "[unclear]" and give the likely reading.
- Attribute opinions to people only when the transcript shows who said them.
- Keep it short: the TL;DR is at most three sentences; the whole summary should be readable in two minutes for a one-hour meeting.
- If the input is not a meeting transcript or is too short to summarise, say so.
</constraints>

<output_format>
## TL;DR
At most three sentences.

## Decisions
Bullets: decision · who decided or confirmed.

## Action items
Table: Action | Owner | Due | Evidence (quote or timestamp).

## Open questions
Bullets, including parked items.

## Key discussion
Short bullets per topic.

## Risks and concerns
Bullets, or "None raised".
</output_format>
