---
schema: 1
id: plan-rewrite-from-notes
kind: prompt
title: Plan a rewrite from script notes
description: Sorts script notes from readers, producers or contests into a prioritised rewrite plan, finding the note behind the note and settling conflicts. Use after feedback on a draft.
category: screenwriting
version: 1.0.0
status: incubating
stage: [plan, review]
role: [writer]
requires: [none]
inputs: [notes, text]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [script-notes, rewrite-plan, note-behind-the-note, feedback-triage]
pairs_with:
  prompts: [fix-sagging-second-act, write-script-coverage, cut-script-page-count]
  personas: [script-consultant]
args:
  - name: notes
    description: All the notes you received, with who gave each (a peer, a producer, a contest reader) if you know.
    type: text
    required: true
  - name: logline
    description: The script's logline and what you are trying to make, so notes can be judged against your intent.
    type: text
    required: true
  - name: deadline
    description: When the rewrite is due, or the time you can give it, e.g. "two weeks of evenings".
    type: string
output_contract:
  format: markdown
  sections: [Notes grouped, Notes behind the notes, Conflicts, Rewrite plan, Notes to set aside]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Notes describe a reader's experience, not always the right fix. When several readers mention different symptoms (the hero is unlikeable, the middle drags, the ending feels unearned) they often point to one cause (the hero's goal is unclear). Experienced writers look for the note behind the note, weigh a note by how many readers hit the same spot rather than by how loud it is, give extra weight to notes from the person who will make or buy the project, and set aside notes that would turn the script into a different film than the one they intend. A good rewrite plan fixes causes in order of size: structure first, then character, then scenes, then lines, so polish is not wasted on scenes that will change.
</context>

<task>
Turn these notes into a rewrite plan{{#deadline}} that fits: {{deadline}}{{/deadline}}.

<logline>
{{logline}}
</logline>

<notes>
{{notes}}
</notes>

1. **Notes grouped:** group every note by area (premise, structure, protagonist, other characters, scenes, dialogue, format) and by source. Count how many sources hit each area.
2. **Notes behind the notes:** for each cluster, name the likely underlying cause and the evidence, as a hypothesis.
3. **Conflicts:** where notes contradict each other, set out each side and recommend a resolution grounded in the logline and intent, or a test (a quick experiment in the draft) to decide.
4. **Rewrite plan:** ordered passes (structure, character, scene, polish), each with the specific changes, the scenes affected, the notes it answers, and a time estimate within the deadline.
5. **Notes to set aside:** notes that conflict with the writer's intent or would make a different story, with the reason, so the writer can explain the choice if asked.
</task>

<constraints>
- Account for every note: each must appear in the plan or in the set-aside list.
- Do not invent notes or readers' opinions.
- Respect the writer's intent; when a note challenges the intent itself, flag it as a decision rather than deciding.
- Do not write script pages.
</constraints>

<output_format>
## Notes grouped
Table: Area | Note | Source | Count.
## Notes behind the notes
## Conflicts
## Rewrite plan
## Notes to set aside
</output_format>
