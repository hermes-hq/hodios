---
schema: 1
id: audit-sop-library
kind: prompt
title: Audit a set of SOPs
description: Audits a set of SOPs for outdated steps, missing owners, conflicts, duplicates and gaps against how the work really runs, then ranks fixes and sets a review schedule.
category: operations
version: 1.0.0
status: incubating
stage: [review, maintain]
role: [operations-manager, manager, founder]
requires: [none]
inputs: [document, notes, text]
output: [report, table, plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [standard-operating-procedure, procedure-review, document-review, process-audit, review-schedule]
pairs_with:
  prompts: [write-sop, set-up-document-control, map-business-process]
args:
  - name: sops
    description: The SOPs to audit - paste them, or give a list with title, owner, last review date and a summary of each.
    type: text
    required: true
  - name: reality
    description: How the work actually runs today - recent changes (new software, roles, suppliers, premises), known workarounds, incidents and staff complaints about procedures.
    type: text
output_contract:
  format: markdown
  sections: [Summary, SOP-by-SOP findings, Conflicts and duplicates, Missing procedures, Fix plan, Review schedule]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
SOP sets rot quietly. Software, roles and suppliers change, but the documents still describe the old way, so staff stop reading them and follow word-of-mouth instead. An audit is worth doing when it checks each SOP against how the work actually runs, not just its formatting. Typical findings: steps naming systems or people that no longer exist, no owner or an owner who has left, two procedures giving different instructions for the same task, critical tasks with no procedure at all while trivial ones have three pages, missing controls on money, safety or personal data, and no review date. The fix plan should be ranked by risk: a wrong procedure on a high-risk task is worse than a missing one on a low-risk task. Review frequency should follow risk and rate of change, not a blanket "every year".
</context>

<task>
SOPs:
<sops>
{{sops}}
</sops>

{{#reality}}How work runs today:
<reality>
{{reality}}
</reality>{{/reality}}

1. Build an inventory: title, owner, last review date, the task it covers, and risk level (high where money, safety, legal duties, personal data or customer impact are involved).
2. Check each SOP for: owner and review date present; steps that are out of date against the reality described; vague or untestable steps; missing checks and controls on high-risk steps; missing exceptions; length and format suited to its users.
3. Find conflicts and duplicates: different instructions for the same task, overlapping SOPs that should be merged.
4. Find gaps: important recurring tasks named in the reality notes that have no SOP.
5. If the reality notes are empty, check internal consistency only and list the questions to ask the people who do the work.
6. Rank fixes: rewrite, update, merge, retire, write new. Order by risk and effort, with owner role and a target date placeholder.
7. Propose a review schedule by risk and rate of change, and a trigger list for off-cycle review (new system, incident, role change, audit finding).
</task>

<constraints>
- Do not assume a step is outdated without evidence from the reality notes; mark it as a question instead.
- Do not rewrite the SOPs in full; give the specific change needed for each finding.
- Do not invent legal or safety requirements; flag high-risk SOPs for review by a competent person where relevant.
- Quote the SOP and step reference for each finding so the owner can find it.
</constraints>

<output_format>
## Summary
Three to five sentences and counts by status.
## SOP-by-SOP findings
Table: SOP | Owner | Last review | Risk | Findings | Action.
## Conflicts and duplicates
## Missing procedures
## Fix plan
Table: Priority | SOP | Action | Owner | Due.
## Review schedule
Table: Risk level | Review frequency | Off-cycle triggers.
</output_format>
