---
schema: 1
id: plan-table-read
kind: prompt
title: Plan a table read of your script
description: Plans a table read of a script with reader casting, a stage-directions reader, a run sheet and feedback questions that get useful answers. Use before hearing a draft aloud.
category: screenwriting
version: 1.0.0
status: incubating
stage: [review]
role: [writer]
requires: [none]
inputs: [text, notes]
output: [plan, checklist, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [table-read, staged-reading, script-feedback, run-sheet]
pairs_with:
  prompts: [plan-rewrite-from-notes, write-casting-breakdown]
  personas: [script-consultant]
args:
  - name: script_summary
    description: Title, format and length, a short logline, and the list of speaking characters with rough line counts if known.
    type: text
    required: true
  - name: readers
    description: Who is available to read (actors, friends, writing group members) and how many.
    type: text
    required: true
  - name: concerns
    description: What you most want to learn from hearing it, e.g. "is the comedy landing", "does the ending work", "does anyone sound alike". Optional.
    type: text
output_contract:
  format: markdown
  sections: [Casting the read, Before the read, Run sheet, What to listen for, Feedback questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Hearing a script read aloud exposes what silent reading hides: lines nobody can say, characters who sound alike, jokes that do not land, scenes that run long, and where attention drifts. The writer should listen, not read a part, and take notes on the room's reactions in the moment. The person reading stage directions sets the pace, so they need to be a clear reader and should trim directions to what the listener must know. Feedback after a read is most useful when it is structured: first what people remember and felt, then questions about specific moments, and only at the end suggestions, with the writer not defending the script.
</context>

<task>
Plan a table read.

<script>
{{script_summary}}
</script>

<readers>
{{readers}}
</readers>
{{#concerns}}
<concerns>
{{concerns}}
</concerns>
{{/concerns}}

1. **Casting the read:** assign parts to the readers available, with doubling of small parts that do not share scenes, and pick the stage-directions reader. If there are not enough readers, show which small parts to combine. Keep the writer off the script.
2. **Before the read:** what to send readers and when, how to mark the script (highlighted parts, trimmed or bracketed stage directions), timing and room set-up, and how to record notes (a timestamped log, with readers' consent if recording audio).
3. **Run sheet:** a timeline from arrival to wrap with the read time estimated from page count (about a minute per page, often a little faster aloud), a break for long scripts, and time for feedback.
4. **What to listen for:** a short checklist tailored to the format and the concerns: laughs and silences, stumbles, shifting in seats, characters who blur, scenes that run long.
5. **Feedback questions:** six to ten open questions in order (memory and feeling first, then specific moments, then suggestions), plus a note on how the writer should respond (thanks, clarifying questions only).
</task>

<constraints>
- Do not invent people; use only the readers given and refer to them as given.
- Recording needs everyone's consent; say so.
- Keep the plan practical for a living room or a rehearsal room.
</constraints>

<output_format>
## Casting the read
Table: Part | Reader | Notes.
## Before the read
## Run sheet
## What to listen for
## Feedback questions
</output_format>
