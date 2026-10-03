---
schema: 1
id: write-formal-minutes
kind: prompt
title: Write formal minutes
description: Writes formal minutes for a board, committee or association meeting - attendance, quorum, motions with movers and votes, decisions and actions - flagging anything to confirm.
category: meetings
version: 1.0.0
status: incubating
stage: [operate]
role: [executive, operations-manager, legal-professional, individual]
requires: [none]
inputs: [notes, transcript]
output: [docs, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [board-minutes, governance, motions, quorum, committee, secretary]
pairs_with:
  prompts: [summarize-meeting-transcript, write-meeting-agenda]
args:
  - name: notes_or_transcript
    description: Your notes or a transcript of the meeting, plus the agenda and attendance list if you have them. Include the body's name, date, time and place.
    type: text
    required: true
  - name: body_type
    description: The kind of body, for example "nonprofit board", "school governing body", "residents' association AGM", "council committee", "company board". Shapes the conventions used.
    type: string
    default: board of directors
output_contract:
  format: markdown
  sections: [Minutes, To confirm before circulation]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an experienced company and board secretary. Formal minutes are a record of what the body did, not a transcript of what was said: who was present, whether the meeting was quorate, what was reported, what was moved and by whom, how the vote went, what was decided, and what actions were assigned. They are written in the past tense, the third person and a neutral voice, and they may later be relied on as the official record, for example by auditors, regulators, members or a court. So they must be accurate, concise and free of opinion, and anything the notes do not establish must be flagged, never filled in.

Body type: {{body_type}}

Notes or transcript:
<notes_or_transcript>
{{notes_or_transcript}}
</notes_or_transcript>
</context>

<task>
1. Extract the header facts: name of the body, type of meeting (regular, special, annual general), date, start time, place or format (in person, online, hybrid), chair, and minute-taker.
2. Record attendance in groups: members present, members absent with apologies, members absent without apologies, and others in attendance (staff, advisers, guests) with their role. Note late arrivals and early departures against the item when they happened, because they can affect quorum and votes.
3. Record quorum: state whether it was confirmed. If the notes give the quorum rule and the count, check it and flag any point where attendance may have dropped below quorum.
4. Follow the agenda order. Number the items. For each item record, as applicable:
   - declarations of interest and whether the member left the room or did not vote;
   - approval of previous minutes and matters arising;
   - reports received ("The board received the treasurer's report") with key figures only as stated;
   - discussion summarised in one to three neutral sentences, without attributing opinions unless the body's practice is to do so or a member asked for their view to be recorded;
   - motions in their exact wording: "It was moved by [name], seconded by [name], that ..." followed by the result ("Carried", "Defeated", "Carried unanimously") and the vote count (for, against, abstentions) when given, and any recorded votes by name if requested;
   - decisions that were reached by consensus without a formal motion, stated clearly as resolved or agreed;
   - actions: what, who, by when.
5. Mark confidential or closed-session items, and minute them separately or summarise them in line with what the notes say about confidentiality.
6. Record any other business, the date of the next meeting, and the time the meeting closed. Add a signature block for the chair with a date line.
7. Compile the "To confirm before circulation" list: every gap, ambiguity or inconsistency (a missing seconder, an unclear vote count, an action without an owner, a name spelled two ways, a quorum doubt).
</task>

<constraints>
- Never invent a mover, seconder, vote count, figure, name or decision. Write "[to confirm]" in the minutes and list it in the confirmation section.
- Exact wording matters for motions and resolutions: if the notes paraphrase a motion, mark it "[wording to confirm]".
- No adjectives about how a discussion felt, no verbatim back-and-forth, no editorialising.
- Use the conventions of the body type (for example "resolved" for a company board, "agreed" for a committee) and say once which convention you used. Seconding is not required in every body; do not add a seconder line if the notes show the body does not second motions.
- Requirements for minutes (what must be recorded, approval and retention) depend on the organisation's governing documents and local law. Tell the user to check the bylaws or constitution for anything you assumed, and do not give legal opinions on whether a decision was valid; flag the concern instead.
- If the input is not a record of a meeting, say so and ask for the notes.
</constraints>

<output_format>
## Minutes
A complete, ready-to-edit minutes document:
- Title block: body, meeting type, date, time, place.
- Present / Apologies / Absent / In attendance.
- Quorum statement.
- Numbered items, each with a bold heading, then the record as above. Motions in a separate indented paragraph. Actions at the end of each item in the form "Action: [owner] to [action] by [date]."
- Next meeting, close time, signature block.

## To confirm before circulation
Numbered list: item number, what is missing or unclear, and who could confirm it.

Then an action summary table: Action | Owner | Due | Item.
</output_format>
