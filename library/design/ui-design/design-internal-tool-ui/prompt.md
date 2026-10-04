---
schema: 1
id: design-internal-tool-ui
kind: prompt
title: Design an internal tool interface
description: Designs an internal or back-office tool for heavy daily use, with dense tables, bulk actions, keyboard shortcuts, audit trails and safe destructive actions, specified screen by screen.
category: ui-design
version: 1.0.0
status: incubating
stage: [design]
role: [designer, fullstack-engineer, operations-manager]
requires: [none]
inputs: [text, schema, spec]
output: [docs, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [internal-tools, back-office, admin-panel, keyboard-shortcuts, bulk-actions, audit-trail]
pairs_with:
  prompts: [design-interactive-table, design-empty-and-error-states, design-form-experience, write-design-handoff]
  personas: [product-designer]
args:
  - name: users
    description: Who uses the tool, how many, how many hours a day, their expertise, and their permission levels, for example "12 support agents all day, 3 team leads who approve refunds, 1 admin".
    type: text
    required: true
  - name: tasks
    description: The jobs they do in the tool, with rough frequency and volume, for example "review 200 flagged orders a day, refund up to 50, edit customer addresses, export weekly reports".
    type: text
    required: true
  - name: data
    description: The records involved and their key fields, sizes and relationships, for example "orders (40 fields, 2M rows) linked to customers and payments". A schema or sample record works.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Design priorities, Screen map, Work queue and list views, Record detail, Bulk actions, Keyboard model, Safe destructive actions, Audit trail and permissions, Performance and states, Build notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Internal tools are used for hours a day by people who know the domain well, so the design goals differ from consumer products: speed for repeated tasks, information density, keyboard operation, predictable layouts, and protection against expensive mistakes made at volume. They are usually built last and fast, which produces familiar problems: generic admin panels that show every database column, one-by-one actions where users need batches, modal dialogs stacked three deep, no way to see who changed what, and a delete button next to save. A good internal tool starts from the work queue, makes the frequent path fast and the dangerous path deliberate, and is buildable with standard components.
</context>

<task>
Design the internal tool.

<users>
{{users}}
</users>

<tasks>
{{tasks}}
</tasks>

<data>
{{data}}
</data>

1. **Design priorities:** rank the tasks by frequency multiplied by time per task and by the cost of an error. State the three design priorities that follow (for example "triage 200 items an hour", "never refund twice").
2. **Screen map:** the minimal set of screens (queue or list, record detail, create or edit, bulk review, reports, admin) and how users move between them. Prefer a list-detail split view over page hops for triage work.
3. **Work queue and list views:** the default columns for each user group (the few fields needed to decide, not every field), density options, sorting, filtering with saved views per user and team, search by the identifiers people actually paste (order numbers, emails), status indicators that work without colour alone, row-level quick actions, pagination or virtualisation for large data, and how new items arrive without the list jumping.
4. **Record detail:** layout in zones (summary, the decision-making fields, related records, history), inline editing versus edit mode, validation, and how to show data from other systems with its freshness.
5. **Bulk actions:** select patterns (row checkboxes, shift-click ranges, select all matching the filter with a clear count), the available bulk actions, a preview of what will change, progress and partial-failure reporting, and undo where possible.
6. **Keyboard model:** a shortcut map for the frequent tasks (move between rows, open, approve, reject, assign, next item), a shortcut help overlay, focus management after each action, and no conflicts with browser or screen-reader shortcuts. Every shortcut must also have a visible control.
7. **Safe destructive actions:** classify actions by reversibility and blast radius. Use undo for reversible actions, confirmation that states the consequence and the count for irreversible ones, typed confirmation only for the rare very high-impact ones, separation of destructive controls from frequent ones, and approval by a second person where the users description shows a permission level for it.
8. **Audit trail and permissions:** what is logged (who, what, when, before and after values, reason), where users see history on a record, required reason fields for sensitive actions, and how the interface reflects permissions (hide versus disable with an explanation).
9. **Performance and states:** perceived speed (optimistic updates where safe, skeletons), loading, empty, error and stale-data states, concurrent edits by two users, and session timeouts that do not lose work.
10. **Build notes:** which parts map to standard table, form and dialog components, and the few custom pieces worth the effort.
11. Before answering, walk through the single most frequent task step by step with your design and count the clicks or keystrokes; simplify if any step is avoidable.
12. If the tasks or data are too vague to rank (no frequencies, no fields), ask up to three questions and stop.
</task>

<constraints>
- Design for the stated users, not a generic admin template; leave out screens no task needs.
- Accessibility still applies: keyboard operability, visible focus, sufficient contrast in dense layouts, and screen-reader labels for icon buttons.
- Do not invent legal or compliance requirements for logging; note where the organisation should confirm its own retention and privacy rules.
</constraints>

<output_format>
Markdown with the contract's sections in order. Use a table for list columns per user group, a table for the keyboard map (Key, Action, Context), a table classifying destructive actions (Action, Reversible, Blast radius, Protection), and a step list for the walkthrough of the most frequent task.
</output_format>
