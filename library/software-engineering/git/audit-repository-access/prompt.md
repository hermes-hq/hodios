---
schema: 1
id: audit-repository-access
kind: prompt
title: Audit who can access your repositories
description: Reviews who and what can reach an organisation's repositories (owners, members, outside collaborators, teams, deploy keys, apps, tokens, webhooks) and produces a ranked clean-up plan.
category: git
version: 1.0.0
status: incubating
stage: [operate, maintain]
role: [devops-engineer, security-engineer, engineering-manager, tech-lead]
stack: [git]
requires: [none]
inputs: [dataset, text]
output: [report, checklist, code]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [access-review, least-privilege, outside-collaborators, offboarding, audit-log]
pairs_with:
  prompts: [set-up-new-repository, configure-branch-protection, grant-ci-access-to-private-repos]
args:
  - name: organisation
    description: The code host and organisation shape, for example "GitHub org, 80 members, 240 repos, SSO through Okta" or "GitLab group with 12 subgroups".
    type: text
    required: true
  - name: exports
    description: Any lists you already exported (members with roles, outside collaborators, deploy keys, installed apps, token approvals, audit log extracts). Leave empty to get the commands to collect them.
    type: text
output_contract:
  format: markdown
  sections: [How to collect, Findings, Clean-up plan, Keep it clean]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Access to code accumulates and almost never shrinks. A real review looks beyond the member list: organisation owners (who can do everything, including deleting repositories and changing SSO), the default permission every member gets on every repository, outside collaborators added directly to single repositories and forgotten after a contract ended, direct grants that bypass teams, people who left the company but still have a personal account in the organisation, deploy keys with write access, third-party apps and OAuth apps with broad scopes, personal tokens approved for organisation access, webhooks sending code events to unknown endpoints, and who can read CI secrets. Inactivity is a signal, not proof: someone who only reviews may not push. Removing access without telling the owner of the work causes outages, so a review produces a plan with owners, not a mass deletion.

<organisation>
{{organisation}}
</organisation>
{{#exports}}
<exports>
{{exports}}
</exports>
{{/exports}}
</context>

<task>
1. If no exports are given, list what to collect and give read-only commands or API calls for the stated host (for GitHub, `gh api --paginate` calls for members with roles, outside collaborators, teams and their repositories, deploy keys per repository, app installations, fine-grained token approvals and hooks; for GitLab, the equivalent group and project member, token and key listings). Say which data needs owner rights. Then stop and wait for the data.
2. With data, check each area and flag findings:
   - owners: more than two or three, or owners who do not need it;
   - base permission higher than read (or none);
   - outside collaborators: who added them, last activity, whether a contract or reason is known;
   - direct per-repository grants that should be team grants, and admin rights on repositories;
   - accounts matching people who left (ask the user for a leavers list; never guess from names);
   - two-factor or SSO not enforced, and accounts not linked to SSO;
   - deploy keys with write access, unused keys, keys on archived repositories;
   - apps and tokens with write or admin scopes, unknown publishers, long expiry;
   - webhooks to unfamiliar domains, and who can read CI secrets.
3. Rank findings by risk: what an attacker or a departed person could do with that access, and how many repositories it reaches.
4. Write the clean-up plan: for each finding, the action (remove, downgrade, move to team, rotate, ask the owner), the person who must confirm it, and the message to send before removing access.
5. Add controls so it stays clean: base permission, team-only grants, token and key expiry policies, a quarterly review routine with the same commands, and offboarding steps that include the code host.
</task>

<constraints>
- Do not remove, downgrade or rotate anything yourself; produce the plan and the commands for the user to run after confirmation.
- Do not decide that a person has left or is inactive without evidence from the data or the user.
- Do not include real tokens or keys in the output; refer to them by name, fingerprint or id.
- Treat names and emails in exports as personal data: use them only in the findings, not in examples.
</constraints>

<output_format>
## How to collect
Commands or steps per area, or "Already provided".
## Findings
A table: area | finding | reach | risk (high, medium, low) | evidence.
## Clean-up plan
Numbered actions with who confirms, ordered by risk.
## Keep it clean
Policies and the review routine as a checklist.
</output_format>
