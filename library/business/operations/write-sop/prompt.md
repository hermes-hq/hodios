---
schema: 1
id: write-sop
kind: prompt
title: Write a standard operating procedure
description: Writes a standard operating procedure from a process description - purpose, scope, roles, numbered steps, checks and exceptions - with gaps flagged for confirmation. Use to document a repeatable task.
category: operations
version: 1.0.0
status: incubating
stage: [build, operate]
role: [operations-manager, manager, founder, support-agent]
inputs: [notes, transcript, text]
output: [docs, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [standard-operating-procedure, work-instructions, quality-checks, handover]
pairs_with:
  prompts: [map-business-process, automate-business-workflow]
args:
  - name: process
    description: How the task is done today - a walkthrough, notes, a recorded explanation transcript, or an old document. Include who does what, tools used and known problems.
    type: text
    required: true
  - name: audience
    description: Who will follow the SOP and their experience level (for example "new warehouse staff in their first week").
    type: string
  - name: format
    description: How to present the procedure steps.
    type: enum
    enum: [checklist, narrative, table]
    default: checklist
output_contract:
  format: markdown
  sections: [Purpose, Scope, Roles, Before you start, Procedure, Quality checks, Exceptions and escalation, Records, Open questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write SOPs that people follow under real conditions: a new hire on a busy day, someone covering for a colleague, or an auditor checking compliance. A good SOP has one action per step, says how to know each step worked, and covers what to do when things go wrong. It never pretends to know a threshold, a tool setting or an approval rule that the source did not give.
</context>

<task>
Write an SOP for this process:

<process>
{{process}}
</process>

Audience: {{audience}}
Step format: {{format}}

1. Identify the start trigger, the end state, and every role involved. If the process description mixes several processes, write the SOP for the main one and list the others under Open questions.
2. Write the procedure:
   - one action per step, starting with a verb ("Scan the delivery note"), in the order it actually happens;
   - name the tool, form or system used in each step, exactly as given;
   - add a check after any step where a mistake is likely or costly ("Confirm the count matches the delivery note");
   - mark decision points clearly with what to do in each case;
   - put warnings before the step they apply to, not after.
3. Present the steps in the requested format: `checklist` as numbered checkbox steps, `narrative` as short numbered paragraphs, `table` with columns Step | Who | Action | Check.
4. Add exceptions: the realistic ways this process goes wrong and what to do, including who to escalate to and when.
5. Match vocabulary to the audience. If the audience is empty, write for a capable new team member with no prior context, and say so.
6. Wherever the source is unclear or silent on something the SOP needs (a limit, an approver, a time), write `[CONFIRM: what is needed]` in place and list it under Open questions.
</task>

<constraints>
- Do not invent thresholds, approval limits, system names, legal or safety requirements. Use `[CONFIRM: …]` instead.
- Keep steps short: about 25 words or fewer each. Split longer ones.
- If the process involves safety, food handling, money or personal data, keep every control step from the source and flag any missing control as an open question rather than adding your own rule as fact.
- No filler introductions. The Purpose section is at most two sentences.
</constraints>

<output_format>
# SOP: <process name>
Version, owner and review date as `[CONFIRM]` placeholders unless given.

## Purpose
## Scope
What it covers and what it does not.
## Roles
Table: Role | Responsibility.
## Before you start
Inputs, access and materials needed.
## Procedure
In the requested format.
## Quality checks
Bullets: what is checked at the end and by whom.
## Exceptions and escalation
Table: Situation | What to do | Escalate to.
## Records
What is recorded, where, and how long it is kept, or `[CONFIRM]`.
## Open questions
Numbered list of every `[CONFIRM]` item.
</output_format>
