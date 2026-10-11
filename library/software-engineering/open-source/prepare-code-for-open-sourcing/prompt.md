---
schema: 1
id: prepare-code-for-open-sourcing
kind: prompt
title: Prepare internal code for open-sourcing
description: Prepares an internal codebase for public release - approval, secrets in history, internal names, third-party licences, a build that works outside the company and repository files.
category: open-source
version: 1.0.0
status: incubating
stage: [ship]
role: [maintainer, tech-lead, engineering-manager]
requires: [none]
inputs: [text, repo]
output: [checklist, plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [open-sourcing, release-readiness, secrets-in-history, license-compliance, ospo]
pairs_with:
  prompts: [audit-repo-for-secrets, audit-dependency-licenses, choose-software-license, plan-open-source-launch, write-contributing-guide]
  personas: [open-source-maintainer]
args:
  - name: codebase
    description: What the code is, languages, size, age of the history, which internal systems it talks to or builds with (private registries, internal APIs, CI), and what is known about secrets or customer data ever committed.
    type: text
    required: true
  - name: organisation
    description: Who owns the code (company, university, agency), who must approve, whether there is an open source program office, and the reason for releasing. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Go or no-go questions, Clearance checklist, History decision, Scrub list, Build and test in public, Repository files, Order of work]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Flipping a repository from private to public is permanent: forks and caches keep whatever was visible for even an hour. The expensive mistakes are secrets and customer data somewhere in the history, internal hostnames and staff names in comments and tests, vendored code whose licence does not allow redistribution, patents or contracts that restrict release, and a build that only works on the company network. Many organisations publish a fresh repository with squashed history because cleaning years of history is error-prone; others keep the history for its value and rewrite it with care. Approval matters too: in most employment and contract situations the employer, client or institution owns the code, so the people with authority must sign off before anything is published.
</context>

<task>
Prepare this code for public release.

<codebase>
{{codebase}}
</codebase>
{{#organisation}}

<organisation>
{{organisation}}
</organisation>
{{/organisation}}

1. Go or no-go questions: who owns the code and who must approve (legal, security, product, the team), whether any contract, grant, patent or partner agreement restricts release, whether it contains another party's confidential code, and whether the team will maintain it. Any "no" or "unknown" here stops the release until resolved.
2. Clearance checklist grouped by area: legal and ownership, licence choice and file headers, third-party code and dependency licences, export or regulatory concerns flagged for legal (not decided here), security review, brand and naming.
3. History decision: keep the full history after a scan and rewrite, or publish a fresh repository with a single initial commit. Recommend one for this codebase with reasons, and list what is lost either way.
4. Scrub list: secrets (scan the full history, and rotate anything found even after removal), credentials in CI config, customer or personal data in fixtures and tests, internal hostnames, IPs and URLs, staff names and emails in comments, issue tracker links, profanity or comments about customers, and large binaries.
5. Build and test in public: replace private registries, internal base images and internal APIs; make tests pass on a clean machine; set up public CI; confirm a newcomer can build from the README alone.
6. Repository files: LICENSE, README, CONTRIBUTING, CODE_OF_CONDUCT, SECURITY policy, issue templates, and a statement of maintenance level.
7. Order of work with owners, ending with a final review of the exact public tree by someone who did not do the cleaning, and a rehearsal by pushing to a private copy first.
</task>

<constraints>
- Do not decide legal ownership, export control or patent questions; list them for the organisation's legal owner.
- Never suggest deleting a secret from history as enough; it must be rotated.
- Do not invent the organisation's policies or approvers; use roles.
- If the user has not got authority to publish the code, say approval comes first and stop at the checklist.
</constraints>

<output_format>
## Go or no-go questions
Numbered questions with who answers each.

## Clearance checklist
Checklist grouped by area.

## History decision
Recommendation and trade-offs.

## Scrub list
Table: What | Where to look | How to fix.

## Build and test in public
Checklist.

## Repository files
Checklist.

## Order of work
Numbered steps with owner role.
</output_format>
