---
schema: 1
id: helpdesk-migration-track
kind: workflow
title: Migrate to a new helpdesk
description: Moves a support team to a new helpdesk in gated steps - inventory of data and rules, mapping, rebuilding macros and routing, testing, cutover and post-launch checks.
category: customer-support
version: 1.0.0
status: incubating
stage: [plan, design, build, verify, ship]
role: [operations-manager, manager, support-agent]
requires: [none]
inputs: [text, config, dataset]
output: [plan, table, checklist, report]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [helpdesk-migration, cutover, data-mapping, support-tooling, go-live]
pairs_with:
  prompts: [audit-support-macros, design-ticket-routing-rules, design-ticket-tagging-scheme]
args:
  - name: current_setup
    description: "Your current helpdesk setup: channels, queues or groups, ticket fields and tags, macros, automations and routing rules, integrations (shop, billing, chat, phone), reports in use, team size, and ticket history size."
    type: text
    required: true
  - name: new_helpdesk
    description: "What the new tool is or what you know about it (fields, automation, import options), and why you are moving. Optional."
    type: text
  - name: cutover_window
    description: "When you want to switch and any dates to avoid, such as peak season. Optional."
    type: string
steps:
  - {id: inventory, file: steps/01-inventory.md, stage: plan, gate: approve, artifact: "helpdesk-migration/01-inventory.md"}
  - {id: mapping, file: steps/02-mapping.md, stage: design, gate: approve, artifact: "helpdesk-migration/02-mapping.md"}
  - {id: rebuild, file: steps/03-rebuild.md, stage: build, gate: approve, artifact: "helpdesk-migration/03-rebuild.md"}
  - {id: test, file: steps/04-test.md, stage: verify, gate: approve, artifact: "helpdesk-migration/04-test.md"}
  - {id: cutover, file: steps/05-cutover.md, stage: ship, gate: none, artifact: "helpdesk-migration/05-cutover.md"}
output_contract:
  format: markdown
  sections: [Step artifact, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
Moves a support team from one helpdesk to another without losing tickets, history or customers in the gap. Migrations fail on the things nobody wrote down: an automation that silently tagged VIPs, an integration that fed order data, a report the finance team relied on, email forwarding that still points at the old tool. This track inventories first, uses the move to clean up rather than copy every old rule, tests with real scenarios, and switches over at a quiet time with a rollback. Each step writes one artifact and stops for approval.

<current_setup>
{{current_setup}}
</current_setup>
{{#new_helpdesk}}
<new_helpdesk>
{{new_helpdesk}}
</new_helpdesk>
{{/new_helpdesk}}
{{#cutover_window}}
Cutover window: {{cutover_window}}
{{/cutover_window}}

Rules for every step:
- Work from what the user describes. Never assume features of either tool; mark unknowns as [CHECK in the tool] and list them as questions.
- Do not recommend or compare helpdesk vendors.
- Treat customer data carefully: export, transfer and deletion of the old data must follow the business's data rules; flag [CHECK data retention and transfer rules].
- Keep the team working throughout: no step may leave a channel unanswered.
- End each artifact with open questions.
