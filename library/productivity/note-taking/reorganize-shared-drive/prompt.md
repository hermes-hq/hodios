---
schema: 1
id: reorganize-shared-drive
kind: prompt
title: Reorganise a team shared drive
description: Plans reorganising a team's shared drive - a folder structure by how the team works, naming rules, access groups, a migration in stages without breaking links, and rules that keep it tidy.
category: note-taking
version: 1.0.0
status: incubating
stage: [plan, design]
role: [manager, operations-manager, project-manager, teacher]
requires: [none]
inputs: [text, preferences]
output: [plan, checklist, docs]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [shared-drive, folder-structure, file-naming, permissions, migration-plan, team-files]
pairs_with:
  prompts: [organize-digital-files, build-team-wiki-structure, plan-notes-backup-and-export]
args:
  - name: team
    description: The team, its size and what it produces, for example "school science department, 9 teachers, lesson plans, assessments, risk assessments, budgets".
    type: text
    required: true
  - name: current
    description: The current state - top-level folders or a description, the platform (Google Drive shared drives, SharePoint or OneDrive, Dropbox, a network drive), and what goes wrong.
    type: text
    required: true
  - name: constraints
    description: Optional - rules you must keep, such as records retention, confidential folders, external sharing with clients, or limited admin rights.
    type: text
output_contract:
  format: markdown
  sections: [Target structure, Naming rules, Access, Migration plan, Records and confidentiality, Drive rules for the team, Upkeep]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Shared drives decay in familiar ways: personal folders named after people who left, "Final_v3_REAL" files, the same document in three places, permissions granted one person at a time, and no one sure what can be deleted. Reorganisations fail when they are done in one weekend by one person, break every link in emails and documents, and are not backed by rules. What works: a structure that mirrors how the team looks for things (by function or activity and then year, or by client or project, not by person), a top level of fewer than ten folders, a short naming rule with dates in year-month-day order, access granted to groups at the top level rather than to individuals on files, a clear archive area, and a staged migration with a freeze date. Platforms differ: moving files within a cloud drive usually keeps sharing links working while copying does not; moving between drives or onto another platform can change ownership and break links; network drives break shortcuts. Records and confidentiality rules (HR, pupils, patients, finance) override convenience.

Team: {{team}}
Current state: {{current}}
{{#constraints}}
Constraints: {{constraints}}
{{/constraints}}
</context>

<task>
1. If the platform or the team's work is unclear, ask up to two questions and stop.
2. Propose the target structure as a tree, at most three levels for routine work, and explain the organising principle.
3. Write naming rules with three examples from the team's own files.
4. Design access: groups by role, which folders are restricted, external sharing rules, and who owns the drive.
5. Plan the migration in stages: inventory and owner sign-off, a freeze date, moving rather than copying where links matter, handling duplicates and files of people who left, an archive folder, and a test with a few users first.
6. Flag records and confidentiality issues from the constraints and say who should decide on retention.
7. Write a one-page "how we use the drive" rules note for the team.
8. Give a quarterly upkeep check.
</task>

<constraints>
- Do not claim exact platform menus or behaviours as certain; say what to verify before moving files.
- Never recommend bulk deletion; old material goes to an archive with an owner's sign-off.
- Retention and data protection decisions go to whoever owns them in the organisation; do not state legal retention periods.
- Keep the top level under ten folders.
</constraints>

<output_format>
## Target structure
A tree in a code block, then the principle.
## Naming rules
## Access
## Migration plan
Numbered stages with owner and timing.
## Records and confidentiality
## Drive rules for the team
## Upkeep
</output_format>
