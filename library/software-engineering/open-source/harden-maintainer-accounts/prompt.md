---
schema: 1
id: harden-maintainer-accounts
kind: prompt
title: Harden an open-source project's accounts and publish access
description: Secures an open-source project's people and publishing paths against account takeover, covering 2FA, admin and registry access, tokens, trusted publishing, branch and tag protection, and recovery.
category: open-source
version: 1.0.0
status: incubating
stage: [operate, maintain]
role: [maintainer, security-engineer]
requires: [repo-read]
inputs: [repo, config, text]
output: [report, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [account-takeover, two-factor-auth, trusted-publishing, branch-protection, software-supply-chain, access-review]
pairs_with:
  prompts: [review-ci-pipeline-security, sign-release-artifacts, write-maintainer-handbook]
  personas: [open-source-maintainer]
args:
  - name: project
    description: The project, its code host and organisation setup, package registries and who can publish to each, how releases are made, people with admin or write access, and any tokens or bots with publish rights.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Attack paths, Findings, Fixes in order, Recovery plan, Ongoing routine]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most damaging attacks on open-source packages did not exploit code; they took over a person or a credential. Common paths: a maintainer account without phishing-resistant two-factor authentication; a long-lived registry token in a CI secret or a laptop dotfile; a former contributor who still has write or admin access; a registry account whose email domain expired and was re-registered by someone else; a new "helpful" co-maintainer who gained trust over months and then shipped a backdoor; a release built on a personal machine, so nobody can verify what was published matches the source; and branch or tag protections that admins can bypass silently. Fixes that matter most: require 2FA (ideally security keys or passkeys) across the organisation and registries, remove stale access, use trusted publishing from CI instead of stored tokens, protect release tags and the default branch, require review for workflow changes, keep at least two people able to recover every critical account, and build releases in CI with provenance.

{{> guardrails/investigate-before-answering}}

Project:
<project>
{{project}}
</project>
</context>

<task>
1. Attack paths: list the realistic ways someone could publish a malicious release of this project, given its setup.
2. Findings: from the repository (workflows, CODEOWNERS, release scripts, docs) and the description, record what is in place and what is missing for each area: 2FA enforcement, admin and write access, registry owners and their emails, tokens and where they live, publishing route, branch and tag protection, workflow change review, release provenance, and account recovery.
3. Fixes in order: rank by risk reduced per hour of effort, with the concrete setting or step for each, naming where it is configured in general terms, and noting where the user should confirm the exact setting in the service's documentation.
4. Recovery plan: what to do if an account or token is compromised: who revokes what, how to deprecate or yank a malicious release, how to tell users, and who to contact at the registry.
5. Ongoing routine: a quarterly access review, rules for granting new maintainers access gradually, and token rotation where tokens remain.
</task>

<constraints>
- Do not ask for or record passwords, tokens or recovery codes.
- Do not change settings or run commands against services; give the steps.
- Do not recommend removing anyone's access without telling the user to confirm with that person or the maintainers first.
- Where you could not see a setting (organisation or registry settings are not in the repository), mark the finding as "unknown, check" rather than assuming.
</constraints>

<output_format>
Use the contract's section headings in order. Findings as a table: Area | Current state | Risk | Fix. Fixes in order as a numbered list with effort estimates. Recovery plan as a numbered list.
</output_format>
