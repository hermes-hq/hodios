---
schema: 1
id: configure-repo-automation-bots
kind: prompt
title: Configure repository automation for an open-source project
description: Writes repository automation for an open-source project (stale handling, labels, welcome messages, release drafts, reviewer assignment) with defaults that save time without alienating users.
category: open-source
version: 1.0.0
status: incubating
stage: [operate, maintain]
role: [maintainer, devops-engineer]
stack: [github-actions]
requires: [repo-read, file-write]
inputs: [repo, config]
output: [config, checklist]
risk: edits-files
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [stale-bot, issue-labels, release-drafter, codeowners, workflow-permissions, automation]
pairs_with:
  prompts: [design-issue-intake, configure-dependency-update-bot, review-ci-pipeline-security]
  personas: [open-source-maintainer]
args:
  - name: project
    description: The project, the pain you want automation to remove (unlabelled issues, PRs waiting for review, release notes written by hand, old issues piling up), existing labels and workflows, and how many maintainers there are.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What to automate, Files, Permissions, What not to automate, Verified]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Automation saves maintainers hours or drives users away, depending on the defaults. Stale bots are the main offender: closing valid bug reports after 30 days because nobody answered tells users their report was worthless and hides real bugs; they work only when limited to issues waiting on the reporter (a needs-info label), with a long window, a polite message and exempt labels for confirmed bugs. Path-based labelling, review assignment from CODEOWNERS, and release-note drafting from labelled PRs are low-risk and save real time. Welcome messages for first-time contributors help if they point to something useful, not a wall of rules. Security matters: workflows triggered by `pull_request_target` or that run on comments can expose secrets or write access to code from forks; every workflow should set minimal `permissions`, pin third-party actions to a commit SHA, and never check out and run untrusted PR code with write tokens.

{{> guardrails/investigate-before-answering}}

Project:
<project>
{{project}}
</project>
</context>

<task>
1. Read the existing workflows, labels, CODEOWNERS, issue templates and release process. Reuse existing labels and naming.
2. Choose what to automate for the stated pain, and for each say the time saved and the risk to users.
3. Write the files: for example a needs-info stale workflow scoped to issues awaiting the reporter, path-based labelling, review assignment, a release-notes drafter keyed to labels, and a first-time contributor welcome. Only include what fits the project.
4. Set `permissions` per workflow to the minimum, pin third-party actions to full commit SHAs with the version in a comment, and avoid `pull_request_target` unless it never checks out PR code.
5. List what should stay manual and why (closing confirmed bugs, locking threads, labelling severity).
6. Validate the YAML and run an actions linter if one is available.
</task>

<constraints>
- Never configure automatic closing of issues that a maintainer has confirmed or labelled as a bug, or of pull requests waiting on maintainer review.
- Do not grant write permissions to workflows that run code from forks.
- Do not invent commit SHAs for pinned actions; if you cannot look them up, leave [PIN SHA] with the version and say how to find it.
- Do not delete or rename existing labels or workflows without listing the change for the user to confirm.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
Use the contract's section headings in order. What to automate as a table: Automation | Pain removed | Risk | Included? Files as path plus full contents in fenced blocks. Verified lists checks run and results.
</output_format>
