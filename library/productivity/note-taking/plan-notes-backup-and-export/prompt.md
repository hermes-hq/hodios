---
schema: 1
id: plan-notes-backup-and-export
kind: prompt
title: Plan notes backup and export
description: Plans how to keep years of notes safe and portable - what to back up, how often, where copies live, a test restore, an export in open formats and what happens to the notes if you lose access or die.
category: note-taking
version: 1.0.0
status: incubating
stage: [plan, maintain]
role: [individual, researcher, writer]
requires: [none]
inputs: [preferences, text]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [backup, data-portability, 3-2-1-backup, restore-test, digital-legacy]
pairs_with:
  prompts: [choose-notes-app, migrate-notes-between-apps, write-household-operations-manual]
args:
  - name: setup
    description: Which notes app or apps you use, roughly how much is stored (number of notes, attachments, size if known), the devices involved and any backup you already have.
    type: text
    required: true
  - name: worries
    description: Optional - what you are most afraid of losing or what has gone wrong before (an account lockout, a sync conflict that ate notes, a dead laptop).
    type: text
output_contract:
  format: markdown
  sections: [Risks, Backup plan, Open-format export, Restore test, If you lose access, Routine]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Sync is not a backup: when a note is deleted or corrupted on one device, sync faithfully deletes or corrupts it everywhere. The common ways people lose notes are account lockouts (lost two-factor device, a banned or closed account), sync conflicts, a service shutting down, accidental mass deletion and ransomware on a synced folder. A sound plan follows the 3-2-1 idea: three copies, on two different kinds of storage, one away from home, plus a periodic export in open formats (plain text, Markdown, HTML or PDF) that any future app can read, and a restore that has actually been tested.

Setup:
<setup>
{{setup}}
</setup>
{{#worries}}
Worries: {{worries}}
{{/worries}}
</context>

<task>
1. If the apps or devices are not named, ask and stop.
2. List the specific risks for this setup, ranked by likelihood and damage, including the ones the person may not have considered (lockout, sync propagating deletion).
3. Design the backup plan: what is copied, where each copy lives, how often, automatic versus manual, and whether old versions are kept.
4. Describe an open-format export: what format suits these notes, how to check that attachments and links survive, and how often to repeat it. Tell the person to confirm the app's current export options.
5. Write a restore test: pick five notes including one with an attachment, restore them from backup on another device, and check them.
6. Cover losing access: recovery codes stored offline, and how someone trusted could reach important notes if the person is incapacitated or dies, pointing to the person's own estate arrangements rather than giving legal advice.
7. Give a short monthly and yearly routine.
</task>

<constraints>
- Do not name paid backup services or quote prices; describe the kind of storage instead.
- Never advise storing passwords, recovery codes or encryption keys inside the same notes being backed up without encryption; suggest a password manager or an offline copy.
- Do not state exact export menu paths as fact.
- Keep the plan proportionate to the amount and value of the notes.
</constraints>

<output_format>
## Risks
## Backup plan
Table: Copy | Where | How often | Automatic?
## Open-format export
## Restore test
## If you lose access
## Routine
</output_format>
