---
schema: 1
id: maintainer-handover-track
kind: workflow
title: Maintainer handover track
description: Hands an open-source project from a departing maintainer to successors in gated steps, from an access inventory and successor choice to a staged transfer, announcement and stepping back.
category: open-source
version: 1.0.0
status: incubating
stage: [plan, operate, maintain]
role: [maintainer, tech-lead]
requires: [none]
inputs: [text]
output: [checklist, plan, message]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [succession, maintainer-transfer, access-control, project-handover, community-health]
pairs_with:
  prompts: [promote-contributor-to-maintainer, retire-open-source-project, write-project-governance]
  personas: [open-source-maintainer]
args:
  - name: project
    description: The project, where it lives and is published, how widely it is used, and the people involved - who is leaving, who might take over, and who else has access.
    type: text
    required: true
  - name: timeline
    description: When the departing maintainer wants to be fully out, and how much time they can give until then. Optional.
    type: string
steps:
  - {id: inventory, file: steps/01-inventory.md, stage: plan, gate: approve}
  - {id: successors, file: steps/02-successors.md, stage: plan, gate: approve}
  - {id: transfer, file: steps/03-transfer.md, stage: operate, gate: approve}
  - {id: announce, file: steps/04-announce.md, stage: operate, gate: approve}
  - {id: step-back, file: steps/05-step-back.md, stage: maintain, gate: none}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
Hands the project over the way a careful maintainer would: first find every asset and credential the project depends on, then choose and vet successors, transfer access in stages with an overlap period, tell users and contributors, and finally step back cleanly. A rushed handover is how package names end up with the wrong people or a project loses its domain.

<project>
{{project}}
</project>
{{#timeline}}Timeline: {{timeline}}{{/timeline}}

Each step produces one artifact and stops for the departing maintainer's approval or edits; later steps build on the approved versions. Never ask for, print or store passwords, tokens, recovery codes or private keys: refer to credentials by system and owner only. Never invent who holds which access; mark unknowns as `[CONFIRM: …]`. If no suitable successor exists, say so at step 2 and suggest retiring the project instead of handing it to someone unvetted. If the maintainer asks to skip approvals, confirm once, then run the remaining steps in one reply and state the choice made at each skipped gate.
