---
schema: 1
id: fix-sagging-second-act
kind: prompt
title: Fix a sagging second act
description: Diagnoses why a screenplay's middle drags (no midpoint shift, passive hero, repeated beats, flat stakes) from an outline and proposes structural fixes. Use when act two stalls.
category: screenwriting
version: 1.0.0
status: incubating
stage: [review]
role: [writer]
requires: [none]
inputs: [text, document]
output: [report, outline]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [second-act, midpoint, story-structure, rewrite-diagnosis]
pairs_with:
  prompts: [write-beat-sheet, plan-rewrite-from-notes, write-script-coverage]
  personas: [script-consultant]
args:
  - name: outline
    description: A scene list or outline of the whole script, with the act-one break and the ending marked, and page numbers if you have them.
    type: text
    required: true
  - name: symptom
    description: What you or readers notice, e.g. "it drags from page 40 to 70", "readers lose interest after the midpoint".
    type: string
output_contract:
  format: markdown
  sections: [Act two map, Diagnosis, Fixes, Revised act two, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Act two is half the script and where most drafts fail. The usual causes are structural, not scene-level: the protagonist reacts instead of pursuing a plan; the same kind of obstacle repeats so the stakes plateau; there is no midpoint that changes the game (a false victory, a false defeat, a revelation or a new goal); the subplot does not intersect with or pressure the main plot; the antagonist goes quiet; or the second-act complications do not cost the hero anything. A useful diagnosis maps what each sequence of the act does to the protagonist's position, finds where the value stops changing, and fixes the cause with as few changes as possible.
</context>

<task>
Diagnose the second act of this script{{#symptom}}. Symptom: {{symptom}}{{/symptom}}.

<outline>
{{outline}}
</outline>

1. **Act two map:** divide act two into sequences of roughly 10 to 15 pages (or groups of scenes). For each: what the protagonist is trying to do, what opposes them, and whether their position ends better or worse. If the act-one break or ending is missing, ask for them and stop.
2. **Diagnosis:** check and mark Present or Missing, with evidence: an active plan; escalating obstacles of different kinds; a midpoint shift; the antagonist's pressure rising; the subplot intersecting with and complicating the main plot; costs that accumulate into the all-is-lost moment. Name the two or three root causes of the sag.
3. **Fixes:** for each root cause, one to three specific options (move, cut, merge or add a scene; change a choice; raise a cost), each naming the scenes affected.
4. **Revised act two:** a revised scene list applying the recommended fixes, marking each scene Kept, Moved, Changed, New or Cut.
5. **Questions:** up to three decisions the writer must make.
</task>

<constraints>
- Keep the writer's premise, characters and ending; mark new material "(proposed)".
- Prefer the smallest change that fixes the cause; do not rebuild the whole story.
- Do not write script pages or dialogue.
- Ground every diagnosis in a specific scene from the outline.
</constraints>

<output_format>
## Act two map
Table: Sequence | Pages or scenes | Protagonist's aim | Opposition | Ends better or worse.
## Diagnosis
## Fixes
## Revised act two
## Questions
</output_format>
