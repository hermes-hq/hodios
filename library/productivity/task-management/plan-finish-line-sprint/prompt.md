---
schema: 1
id: plan-finish-line-sprint
kind: prompt
title: Plan the finish line of a project
description: Plans the last one to three weeks of a nearly done project - a full remaining list, honest cuts, a definition of done and daily targets - so the last ten percent does not drag on for months.
category: task-management
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, student, writer, project-manager]
requires: [none]
inputs: [text, preferences]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [finishing, last-mile, definition-of-done, scope-cuts, daily-targets, thesis]
pairs_with:
  prompts: [work-backward-from-deadline, break-down-big-task, plan-crunch-period]
args:
  - name: project
    description: What the project is and what "finished" means to whoever receives it (submit, publish, launch, hand in).
    type: text
    required: true
  - name: remaining
    description: Everything you think is left, however rough, including the things you keep avoiding.
    type: text
    required: true
  - name: time
    description: Target finish date and hours you can give it each day or week.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Definition of done, Full remaining list, Cuts, Daily targets, Ship checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people finish projects that are "nearly done" and stay that way. The last stretch drags for known reasons: nobody has written down everything that is actually left, so the list looks short but hides the work of checking, formatting, references, approvals and submission; perfection creeps in as endless polishing; and the avoided task (the hard chapter, the bug, the awkward email) blocks everything. The fix is a fixed definition of done agreed with the receiver, a complete remaining list including the boring finishing work, explicit cuts written down, the avoided task first, and small daily targets that end in a shipped result rather than "work on it".

Project:
<project>
{{project}}
</project>

What is left:
<remaining>
{{remaining}}
</remaining>

Time: {{time}}
</context>

<task>
1. Write the definition of done: what the receiver needs, in which format, by when. Mark anything you assumed.
2. Expand the remaining list: add the finishing work that is usually forgotten (proofreading, formatting, references, tests, file naming, approvals, submission steps, backup copy). Estimate each in hours, marked as estimates.
3. Compare total hours with the time available. If it does not fit, propose cuts in this order: polish beyond the definition of done, nice-to-have extras, then scope, and say what each cut saves. Only suggest moving the date if cuts are not enough.
4. Identify the avoided task and schedule it first, broken into a first step of under thirty minutes.
5. Build daily targets: one concrete output per day (not "work on chapter 3" but "chapter 3 section 2 drafted"), with a buffer day before the finish date.
6. End with a ship checklist for the final day.
</task>

<constraints>
- Never add new features, sections or ideas to the project; this plan only finishes it.
- Plan within the stated hours; show the arithmetic.
- If the definition of done depends on someone else (a supervisor, client, editor), say so and include asking them as an early task.
- If the user's list is vague, still produce the plan but list the assumptions you made.
</constraints>

<output_format>
## Definition of done
Three to six bullets.

## Full remaining list
Table: Task | Estimate (h) | Type (core / finishing / avoided).

## Cuts
Table: Cut | Hours saved | Effect. Then total hours vs available.

## Daily targets
Table: Day | Target output | Hours.

## Ship checklist
Checklist.
</output_format>
