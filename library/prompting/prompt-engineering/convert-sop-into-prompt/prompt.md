---
schema: 1
id: convert-sop-into-prompt
kind: prompt
title: Convert an SOP into a prompt
description: Converts a standard operating procedure into assistant or agent instructions with ordered steps, decision rules, checks, escalation triggers, a gap list and test scenarios traced to the SOP.
category: prompt-engineering
version: 1.0.0
status: incubating
stage: [design, build]
role: [operations-manager, ml-engineer, support-agent, business-analyst]
requires: [none]
inputs: [document, text]
output: [prompt, table, tests]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [sop-automation, agent-instructions, escalation-rules, process-automation]
pairs_with:
  prompts: [write-sop, design-prompt-chain, write-system-prompt]
  personas: [prompt-engineer]
args:
  - name: sop
    description: The standard operating procedure as written, including forms, thresholds and contacts it refers to.
    type: text
    required: true
  - name: tool
    description: "Where the instructions will run, for example \"chat assistant a person works alongside\", \"custom GPT for the team\", \"agent with ticketing and email tools\"."
    type: string
    default: chat assistant a person works alongside
output_contract:
  format: markdown
  sections: [Gaps in the SOP, Instructions, Trace table, Test scenarios]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An SOP is written for people who share unwritten context: they know what "check the account" involves, who "the supervisor" is, and when a rule obviously does not apply. An assistant has none of that. Converting an SOP means making every decision rule explicit, turning vague verbs into checks, stating what the assistant may do itself and what it must hand to a human, and surfacing the gaps rather than letting the model fill them with plausible guesses.

<sop>
{{sop}}
</sop>

Runs in: {{tool}}
</context>

<task>
1. Read the SOP and list its gaps: undefined terms, thresholds without numbers, missing branches (what if the check fails, the customer refuses, the data is missing), steps that need a system the assistant cannot access, and conflicting steps. Mark each as blocking (the instructions cannot be safe without an answer) or minor (a stated default is reasonable).
2. If blocking gaps exist, still write the instructions, with each blocking gap as a marked placeholder that routes to a human, and list the questions for the SOP owner.
3. Write the instructions:
   - Purpose and the outcome the procedure protects (why it exists).
   - Inputs the assistant needs before starting, and to ask for any that are missing.
   - Steps in order, each with its check ("confirm X matches Y"), and decision rules as explicit if-then statements with the SOP's thresholds.
   - What the assistant may do on its own, what needs the human's confirmation, and what it must never do.
   - Escalation triggers: the SOP's own, plus uncertainty, missing data, a customer in distress, or anything outside the procedure, with who to hand to and what to include in the hand-off.
   - Record keeping: what to log or summarise at the end.
   - Output format for each interaction or run.
   Match the setting: for an agent with tools, name each tool use and require confirmation before irreversible actions; for a chat assistant, phrase steps as guidance to the person doing the work.
4. Build a trace table so a reviewer can confirm nothing was lost or added.
5. Write test scenarios: the normal path, each decision branch, a missing-input case, an escalation trigger, and a request that falls outside the SOP.
</task>

<constraints>
- Never invent thresholds, contacts, policies or system names that are not in the SOP. Use placeholders such as [SUPERVISOR CONTACT].
- Keep every safety, compliance or legal step from the SOP; do not simplify them away for brevity.
- Do not give the assistant authority the SOP gives only to named roles.
- Model-agnostic; keep the instructions under about 900 words unless the SOP is long.
</constraints>

<output_format>
## Gaps in the SOP
Table: Gap | Where | Blocking or minor | Default used or question for the owner.
## Instructions
One fenced block, ready to paste.
## Trace table
Table: SOP step | Where in the instructions | Change made (none, made explicit, escalates).
## Test scenarios
Table: Scenario | Input | Expected behaviour.
</output_format>
