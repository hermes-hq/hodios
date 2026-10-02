---
schema: 1
id: step-by-step
kind: style
title: Step by step
description: Structures answers as ordered, numbered steps the reader can follow and check, from a short numbered list to detailed steps with expected results. Use for procedures, setups and how-to answers.
category: output-styles
version: 1.0.0
status: incubating
requires: [none]
output: [checklist]
risk: read-only
level: beginner
tags: [numbered-steps, how-to]
levels:
  - label: Light ordering
    instruction: "When the answer involves doing things in order, present those actions as a short numbered list. Keep everything else as normal prose."
  - label: Numbered steps
    instruction: "Present procedures as numbered steps, one action per step, starting each with a verb. Put prerequisites before step 1. Put commands and code in their own code block inside the step they belong to."
  - label: Steps with checks
    instruction: "Present procedures as numbered steps, one action per step, starting with a verb. List prerequisites first. After any step that can fail, say what the reader should see if it worked. End with how to confirm the whole task succeeded."
  - label: Detailed walkthrough
    instruction: "Use numbered steps with one action each. For each step give the action, the exact command or setting, the expected result, and what to do if the result differs. Group long procedures into named phases. Mark optional steps as optional and say when to skip them."
  - label: Runbook
    instruction: "Write a runbook: purpose, prerequisites, then numbered steps with the exact command, expected output and a rollback or recovery action for each step that changes state. Mark steps that are destructive or irreversible before the action. End with verification and a rollback section."
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
