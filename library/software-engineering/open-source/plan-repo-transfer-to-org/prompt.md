---
schema: 1
id: plan-repo-transfer-to-org
kind: prompt
title: Move a project's repository to an organisation
description: Plans moving an open-source repository from a personal account to an organisation or foundation, covering redirects, package and domain ownership, CI secrets, permissions, integrations and links.
category: open-source
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [maintainer, devops-engineer]
stack: [github-actions]
requires: [repo-read]
inputs: [repo, text]
output: [plan, checklist, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [repository-transfer, github-organization, package-ownership, access-control, redirects]
pairs_with:
  prompts: [maintainer-handover-track, evaluate-foundation-membership, write-maintainer-handbook]
  personas: [open-source-maintainer]
args:
  - name: project
    description: The repository, where it is moving (a new organisation, an existing one, a foundation), why, which package registries, domains, docs hosting, CI services, bots and chat it uses, and who should have which access afterwards.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Inventory, Before the transfer, Transfer day, After the transfer, What breaks, Announcement]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Transferring a repository on GitHub is one click, and it keeps issues, pull requests, stars and a redirect from the old URL. What it does not move is everything around the repository. Package registry ownership stays with personal accounts until owners are added or changed, and trusted publishing configurations name the old repository path, so the next release fails. Repository settings mostly travel with the repository, but secrets, environments, webhooks, deploy keys and app installations should each be checked afterwards rather than assumed, and the organisation's policies may block workflows or third-party actions that ran before. Go module paths include the repository location, so moving a Go module is effectively a path change for importers unless a vanity import path is used. Redirects break if someone later creates a repository with the old name under the old account. Docs hosting, badges, the domain registrar, social accounts and funding profiles are often in one person's name. Teams and permissions in the organisation should be set so no single person is again the only owner, with at least two owners.

{{> guardrails/investigate-before-answering}}

Project:
<project>
{{project}}
</project>
</context>

<task>
1. Inventory: from the repository (workflows, manifests, docs config, badges) and the description, list everything tied to the current location or the current owner's accounts: registries, trusted publishers, secrets, webhooks, apps, deploy keys, docs hosting, domains, badges, module paths, links in the code and README, funding and social accounts.
2. Before the transfer: set up the organisation with at least two owners, teams and permissions, check organisation policies for Actions and apps, add co-owners on registries and services, and announce the date to contributors.
3. Transfer day: the transfer itself, then checks in order (CI runs, secrets present, webhooks deliver, apps installed), updating trusted publishers to the new path, and updating links and badges in one PR.
4. After the transfer: a test release or dry run, fixing module paths or adding a vanity path for Go, updating docs and external listings, keeping the old account's name reserved so redirects keep working, and moving remaining personal ownerships.
5. What breaks: a list of things likely to fail with how to detect and fix each.
6. Announcement: a short note for users and contributors saying what changed and what (if anything) they need to do, such as updating remotes.
</task>

<constraints>
- Do not perform the transfer or change settings; give the steps for the user.
- Do not assume how a specific service handles transfers; where unsure, say to check that service's documentation.
- Treat secrets carefully: list which exist and where, never their values.
- Keep at least two owners on every critical account in the final state, and say so if the plan leaves a single owner.
</constraints>

<output_format>
Use the contract's section headings in order. Inventory as a table: Item | Tied to | Action | When. Before, Transfer day and After as checklists. Announcement in a fenced block.
</output_format>
