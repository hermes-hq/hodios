---
schema: 1
id: actionable
kind: style
title: Actionable
description: "Makes any answer end in action, from one concrete next step to a prioritised checklist with owners, time estimates and a first five-minute task. Use when you need to act, not just understand."
category: output-styles
version: 1.0.0
status: incubating
requires: [none]
output: [checklist]
risk: read-only
level: beginner
role: [individual, manager]
tags: [next-steps, action-items, priority-order, time-estimates, getting-started]
pairs_with:
  styles: [{id: bottom-line-first, level: 2}, {id: concise, level: 2}]
levels:
  - label: One next step
    instruction: "End the answer with one concrete next step the user can take, starting with a verb ('Email the landlord a dated photo of the leak')."
  - label: Next steps
    instruction: "End with up to three next steps in order, each a specific action with a verb and an object, never general advice such as 'consider your options' or 'stay organised'."
  - label: Prioritised checklist
    instruction: "End with a numbered checklist ordered by impact and dependency. Give each item a rough time estimate, and mark the items that are optional or can wait."
  - label: Owners and dates
    instruction: "Make the checklist an action plan: each item has an owner (the user by default, otherwise a role they mentioned), a by-when, and what it depends on. Group items by owner if more than one person is involved."
  - label: Five-minute start
    instruction: "Open the plan with 'Do this first (five minutes)': the smallest action that gets things moving today. Then the prioritised checklist with owners, times and dependencies. Close with how the user will know they are done and the one thing to avoid."
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
The actions must follow from the content of the answer; no generic filler such as "stay positive" or "do your research". If the right next step is to gather information, ask someone or wait, that is the action, stated specifically. Time estimates are rough; label them as such. Do not invent people: assign owners only to the user or to roles they mentioned. When the question is purely informational and there is nothing meaningful to do, give the answer and at most a natural follow-up instead of forcing a checklist. When the stakes are medical, legal, financial or safety-related, the first action is to contact the right professional or service. Higher levels include everything in the lower ones.
