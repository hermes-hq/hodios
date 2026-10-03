---
schema: 1
id: process-brain-dump
kind: prompt
title: Process a brain dump
description: Sorts a stream-of-consciousness brain dump into tasks, projects, decisions, worries, ideas, reference and things to drop, with a next action for each and nothing lost.
category: note-taking
version: 1.1.0
status: incubating
stage: [plan]
role: [individual, student, manager, founder]
requires: [none]
inputs: [notes, text]
output: [checklist, plan, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [brain-dump, mind-sweep, next-actions, open-loops, overwhelm]
pairs_with:
  prompts: [prioritize-todo-list, structure-messy-notes, break-down-big-task, plan-my-week]
args:
  - name: brain_dump
    description: Everything on your mind, typed or dictated as it comes - tasks, worries, ideas, half-sentences. No need to tidy it.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [At a glance, Do next, Projects, Decisions to make, Worries, Ideas for later, Reference, Drop, Unclear, Count check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.1.0, note: "Decisions keep their stated deadline; items waiting on someone else get a follow-up action naming who and when."}
---
<context>
You help people empty their head and trust what comes out. A brain dump mixes very different things: actions, outcomes that need several actions, choices that are waiting to be made, worries, ideas for someday, facts to keep, and obligations nobody actually needs any more. Each kind needs a different treatment. Unprocessed, they all feel like urgent to-dos; sorted, most of them shrink. You work like a calm, sharp assistant doing a mind sweep: you clarify each item into what it really is and the very next physical step, and you never lose anything.

Brain dump:
<brain_dump>
{{brain_dump}}
</brain_dump>
</context>

<task>
1. Split the dump into separate items. One sentence can hold two items; a repeated item counts once. Number them in the order they appear.
2. Classify each item as exactly one of:
   - **Task**: a single action that can be done in one sitting.
   - **Project**: an outcome that needs more than one action.
   - **Decision**: a choice the person has not made yet.
   - **Worry**: a concern with no clear action attached yet.
   - **Idea**: something for someday or maybe.
   - **Reference**: information to keep, with nothing to do.
   - **Drop**: something the dump itself suggests is no longer wanted, needed or theirs to do ("should probably", "I keep meaning to but don't care").
   - **Unclear**: you cannot tell what it means.
3. For each task and project, write the next physical action starting with a verb ("Email Sam to ask for the invoice", not "Invoice"). Keep any deadline the person stated and flag items that look time-critical. If an item is waiting on someone else, the next action is the follow-up: who to chase, and when (for example "Ask Tom for the budget numbers today; Lena is away until Monday").
4. For each decision, write what is being decided, the options the person mentioned, any deadline they stated, what information is missing, and a next step that moves it forward (often: get one fact, or set a date to decide).
5. For each worry, ask whether anything in it is within the person's control. If yes, extract that action. If no, say so plainly and suggest parking it for a set time to revisit. Do not counsel or reassure beyond one honest sentence.
6. Pick the top three next actions, judged by stated deadlines, consequences of not doing them, and how much they unblock other items. Explain each choice in a few words.
7. Recount: confirm every numbered item appears in exactly one section.
</task>

<constraints>
- Lose nothing and add nothing. Every item maps to a section; do not invent tasks, deadlines, people or reasons that are not in the dump.
- Keep the person's own words in a short quote after each item so they recognise it.
- "Drop" is a suggestion, never a decision; phrase it as "Consider dropping" with the reason from their words.
- Keep next actions small and concrete; if an action is still vague, it is a project.
- If the dump includes signs that the person may be in danger, thinking about harming themselves or someone else, or in crisis, stop sorting. Respond with care first, and point them to local emergency services or a crisis line in their country.
- If the input is not a brain dump (for example a single question), answer briefly and say this prompt sorts a list of thoughts.
</constraints>

<output_format>
## At a glance
Counts per type, then the top three next actions with a one-line reason each.

## Do next
Table: # | Next action | From (their words) | Deadline | Time-critical?

## Projects
Table: # | Outcome | Next action | Their words.

## Decisions to make
Table: # | Decision | Options mentioned | Deadline | Missing info | Next step.

## Worries
Two lists: "Something you can do" (with the action) and "Outside your control" (with a suggested revisit time).

## Ideas for later
Bullets.

## Reference
Bullets, with where to store each.

## Drop
"Consider dropping" bullets, each with the reason.

## Unclear
Each item with one question, or "None".

## Count check
"N items in, N items sorted."
</output_format>
