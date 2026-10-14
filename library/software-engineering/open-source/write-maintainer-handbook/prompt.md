---
schema: 1
id: write-maintainer-handbook
kind: prompt
title: Write a maintainer handbook
description: Writes the internal handbook for a project's maintainers, covering review and merge standards, triage rotation, release steps, the security inbox, access lists and how to step back.
category: open-source
version: 1.0.0
status: incubating
stage: [operate, maintain]
role: [maintainer, tech-lead]
requires: [repo-read]
inputs: [repo, text, notes]
output: [docs, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [maintainer-docs, review-standards, triage-rotation, release-process, bus-factor]
pairs_with:
  prompts: [write-contributing-guide, write-project-governance, promote-contributor-to-maintainer]
  personas: [open-source-maintainer]
args:
  - name: project
    description: The project, the maintainers and their roles, how review, merging, triage and releases work today (even if only in people's heads), where accounts and secrets live, and who handles security reports.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Handbook, Undocumented areas, Single points of failure]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
CONTRIBUTING.md tells outsiders how to send a change; maintainers need a different document that says how the project is actually run. Without one, the knowledge lives in one or two heads: only one person can cut a release, nobody else knows the registry account's recovery codes are on a lost phone, new maintainers merge under different standards, and the security inbox goes unread during a holiday. A useful handbook is short, kept in the repository (or a private space for sensitive details), and covers what a new maintainer needs in their first month: what "approve" means here, when to merge one's own change, how triage is shared, the exact release steps, what to do with a security report, which accounts and secrets exist and who holds them, and how to take a break or step down without leaving a gap. Listing where secrets are held is fine; writing the secrets down is not.

{{> guardrails/investigate-before-answering}}

Project:
<project>
{{project}}
</project>
</context>

<task>
1. If the repository is available, read CONTRIBUTING, GOVERNANCE, CODEOWNERS, release scripts and CI workflows so the handbook matches reality.
2. Write the handbook with these parts: roles and who holds them; review standards (what a reviewer checks, approvals needed, when self-merge is allowed, how to decline kindly); merge rules (squash or merge, commit message format, labels); triage rotation (who, how often, what "done" means for a shift); release steps as an exact checklist; security reports (where they arrive, who watches, first response time the team can keep, pointer to the coordinated release process); accounts and access (registry, domain, CI, chat, social, funding platforms, with holders and recovery owners, not credentials); communication norms between maintainers; taking a break and stepping down.
3. List areas the input did not cover, as questions for the maintainers.
4. List single points of failure: any access, secret, step or knowledge held by one person, with a fix for each.
</task>

<constraints>
- Never write passwords, tokens, recovery codes or private keys into the handbook; list only what exists, where it is stored and who holds it.
- Recommend keeping the access list in a private location if the repository is public.
- Do not invent processes the project does not have; where something is missing, propose it and mark it as a proposal.
- Keep each section short enough that a new maintainer reads it in one sitting.
</constraints>

<output_format>
Use the contract's section headings in order. Handbook as ready-to-commit markdown in a fenced block. Accounts and access inside it as a table: Account | Purpose | Holders | Recovery held by | Stored in. Single points of failure as a table: Item | Held by | Risk | Fix.
</output_format>
