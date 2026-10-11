---
schema: 1
id: plan-system-go-live-cutover
kind: prompt
title: Plan a system go-live cutover
description: Plans the cutover from an old system to a new one with rehearsals, data freeze and migration, go or no-go criteria, a timed runbook, a point of no return, rollback and hypercare.
category: planning
version: 1.0.0
status: incubating
stage: [plan, ship]
role: [tech-lead, project-manager, devops-engineer, engineering-manager]
stack: []
requires: [none]
inputs: [spec, notes, text]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [cutover, go-live, data-migration, rollback-plan, hypercare, dress-rehearsal]
pairs_with:
  prompts: [plan-incremental-migration, build-project-risk-register]
args:
  - name: systems
    description: The old and new systems, what data moves (volumes, how long a full migration takes if known), integrations that must be repointed, and who uses the system.
    type: text
    required: true
  - name: window
    description: The planned cutover window and how much downtime the business accepts.
    type: string
    required: true
  - name: constraints
    description: Anything fixed, for example contract end of the old system, month-end close, regulatory reporting dates, staff availability.
    type: text
output_contract:
  format: markdown
  sections: [Cutover strategy, Rehearsals, Go or no-go criteria, Cutover runbook, Rollback, Hypercare, Communications]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Big-bang cutovers (ERP replacements, CRM or billing system swaps, platform moves where both systems cannot run in parallel) succeed through rehearsal. The real timings come from full dress rehearsals on production-sized data, not from estimates; the first rehearsal almost always runs long and finds data that does not map. The plan needs a data freeze in the old system, reconciliation checks that business owners sign (record counts, balances, sample records), a point of no return after which rolling back costs more than fixing forward, rollback tested as well as the forward path, every integration and scheduled job repointed and the old ones disabled, and a hypercare period with extra support. Cutovers are scheduled away from business peaks such as month-end.
</context>

<task>
Systems: {{systems}}
Window: {{window}}
{{#constraints}}Constraints: {{constraints}}{{/constraints}}

1. Cutover strategy: confirm why a single cutover rather than a phased or parallel run (or suggest one if it looks feasible), and how data moves (full load during the window, or bulk load beforehand plus a delta at cutover). Check whether the downtime window fits the expected migration time with a margin; if timings are unknown, say rehearsal must establish them.
2. Rehearsals: at least two full rehearsals on a production-sized copy, what each must prove (timings, reconciliation, rollback), and the exit criterion to proceed.
3. Go or no-go criteria: what must be true before starting (rehearsal results, sign-offs, staff, backups) and at each checkpoint during the cutover, including the point of no return and who decides.
4. Cutover runbook: timed steps with owner, duration, verification and dependency, from freeze announcement and final backup through data migration, reconciliation, integration repointing, disabling old jobs, smoke tests by business users, and opening the new system.
5. Rollback: the trigger, steps, how long it takes, data entered in the new system before rollback and how it is handled, and the point after which rollback is no longer an option.
6. Hypercare: duration, extra support and engineering cover, daily triage, known issues list, and the exit criteria, plus when the old system is decommissioned or archived.
7. Communications: messages to users and stakeholders before, during and after, and the status channel during the window.
</task>

<constraints>
- Do not invent migration timings or data volumes; use rehearsal-derived figures or placeholders.
- Always include a tested rollback and a final backup before any irreversible step.
- Business owners sign off reconciliation; engineering alone does not declare the data correct.
{{> output/uncertainty}}
</constraints>

<output_format>
## Cutover strategy
## Rehearsals
Table: Rehearsal | Purpose | Exit criterion.
## Go or no-go criteria
Table: Checkpoint | Criteria | Decider.
## Cutover runbook
Table: T+ | Step | Owner | Duration | Verification.
## Rollback
## Hypercare
## Communications
Table: When | Audience | Message | Channel.
</output_format>
