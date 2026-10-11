---
schema: 1
id: triage-todo-comments
kind: prompt
title: Triage TODO and FIXME comments
description: Inventories TODO, FIXME and HACK comments, fixes the trivial ones, deletes stale ones, and turns the rest into ticket drafts with enough context to act on.
category: refactoring
version: 1.0.0
status: incubating
stage: [maintain]
role: [software-engineer, tech-lead]
requires: [repo-read, file-write, shell, git]
inputs: [repo]
output: [table, diff, report]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: beginner
tags: [todo-comments, tech-debt, code-comments, ticket-drafts]
pairs_with:
  prompts: [remove-dead-code, remove-stale-feature-flags]
  rules: [code-comment-rules]
args:
  - name: scope
    description: The repository or folders to scan, the markers used (TODO, FIXME, HACK, XXX, custom tags) and the issue tracker the tickets will go to.
    type: text
    required: true
  - name: test_command
    description: The command that runs the tests.
    type: string
output_contract:
  format: markdown
  sections: [Inventory, Fixed, Removed, Ticket drafts, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
TODO comments are a backlog nobody reads. In an old codebase most fall into four groups: already done (the code below was fixed and the comment stayed), obsolete (the feature or constraint is gone), trivial (a missing null check, a magic number to name, a log message to fix), and real work that needs a decision or a ticket. FIXME and HACK usually mark known bugs or workarounds and deserve more attention than TODO; a HACK that references a library bug may be removable after an upgrade, which is worth checking against the pinned version.

`git blame` gives the age and author of each comment, which tells you who to ask and whether the context still exists. Linked issue numbers can be checked for being closed. What goes wrong when agents do this: deleting a TODO that recorded a real known limitation, "fixing" a TODO whose fix is a behaviour change or product decision, or creating hundreds of low-value tickets. A comment stays when it documents a known limitation that matters to readers, rewritten so it explains the limitation instead of promising work.
</context>

<task>
Triage the markers in {{scope}}.

1. Find every marker comment and record: file and line, text, age and author from `git blame`, linked issue if any, and the code it refers to.
2. Classify each: done (code already does it), obsolete, trivial (a safe, behaviour-preserving fix under about ten lines), needs-ticket, or keep-as-note (documents a limitation). Show the classification table and wait for approval before changing anything.
3. Fix the approved trivial ones, each as a small separate change, and run the tests{{#test_command}} with `{{test_command}}`{{/test_command}}. Anything that changes behaviour moves to needs-ticket.
4. Delete approved done and obsolete comments; rewrite keep-as-note comments to describe the limitation plainly.
5. Write ticket drafts for needs-ticket items in the tracker's style: title, context with file links, the problem, a suggested approach, and the original author to ask. Group related items into one ticket. Replace the comment with a short reference to the ticket only after the user creates it.
</task>

<constraints>
- Do not create tickets in the tracker yourself; produce drafts unless the user asks otherwise.
- A "trivial" fix must not change behaviour; if in doubt, it is a ticket.
- Never delete a comment that records a known bug, security concern or data limitation without a ticket or a rewritten note.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Inventory
Table: location, marker text, age, classification.
## Fixed
Each trivial fix with its diff.
## Removed
Comments deleted and why.
## Ticket drafts
One block per ticket.
## Check
Tests run and results.
</output_format>
