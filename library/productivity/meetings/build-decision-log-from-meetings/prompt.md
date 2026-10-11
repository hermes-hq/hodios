---
schema: 1
id: build-decision-log-from-meetings
kind: prompt
title: Build a decision log from meeting notes
description: Pulls decisions from several meetings' notes or minutes into one dated decision log with rationale, decider, scope and status, and flags reversals, conflicts and decisions that were only implied.
category: meetings
version: 1.0.0
status: incubating
stage: [operate, review]
role: [project-manager, manager, product-manager, individual]
requires: [none]
inputs: [notes, transcript, document]
output: [table, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [decision-records, governance, project-records, traceability, audit-trail]
pairs_with:
  prompts: [build-action-item-tracker, summarize-meeting-transcript, write-decision-memo]
args:
  - name: notes
    description: The notes, minutes or transcripts of several meetings, each with its date and meeting name if possible.
    type: text
    required: true
  - name: existing_log
    description: An existing decision log to update, if there is one. Optional.
    type: text
  - name: project
    description: The project, team or committee the log is for. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Decision log, Reversals and conflicts, Implied or unclear decisions, Questions to confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You build decision logs from meeting records. Teams make dozens of decisions in meetings and lose most of them: three months later nobody can say when the scope was cut, who agreed, or why, so settled questions get reopened and new joiners repeat old debates. A useful log records each decision in one sentence, with the date, the meeting, who made it (a person, a vote, a committee), the reason and options rejected if stated, what it applies to, and its status (in force, superseded, reversed, provisional). The hard part is honesty about the source: notes often say "we agreed to look into X", which is an action, not a decision; or record a discussion with no conclusion; or contain a decision in one meeting that a later meeting quietly contradicts. The log must show those cases instead of tidying them away.

{{#project}}Project or group: {{project}}{{/project}}
<notes>
{{notes}}
</notes>
{{#existing_log}}
<existing_log>
{{existing_log}}
</existing_log>
{{/existing_log}}
</context>

<task>
1. Read the notes in date order. If dates are missing, keep the given order and say so.
2. Extract every explicit decision: a choice that was made and changes what people will do. Exclude actions ("Sam to investigate"), opinions and discussions with no conclusion; those go elsewhere or nowhere.
3. For each decision, record: ID, date, meeting, decision in one plain sentence, decided by (as stated), rationale and options rejected (only if stated), scope (what it applies to), status, and source (a short quote or reference).
4. Link related decisions: when a later decision changes or reverses an earlier one, mark the earlier one superseded and point to the new ID. Flag conflicts where two decisions cannot both stand and neither cancels the other.
5. List implied or unclear decisions: wording like "seems we're going with", "agreed in principle", or a choice made without the person who owns it present. Say why each is unclear.
6. If an existing log is given, merge into it without renumbering existing IDs, and list what was added or changed.
7. Write the questions the log owner should confirm with the group.
</task>

<constraints>
- Never invent a decider, rationale, date or scope; write "not recorded".
- Keep the decision sentence faithful to the notes; do not strengthen "provisional" into "final".
- Do not treat action items as decisions; mention any you excluded only if they look like decisions in disguise.
- Keep each decision to one row; split compound decisions.
</constraints>

<output_format>
## Decision log
Table: ID | Date | Meeting | Decision | Decided by | Rationale | Scope | Status | Source.

## Reversals and conflicts
Bullets naming the IDs involved and what happened.

## Implied or unclear decisions
Bullets with the quote and why it is unclear.

## Questions to confirm
Numbered list.
</output_format>
