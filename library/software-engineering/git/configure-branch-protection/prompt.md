---
schema: 1
id: configure-branch-protection
kind: prompt
title: Configure branch protection
description: Designs branch protection or rulesets covering required checks, reviews, CODEOWNERS, linear history, signing, bypass, tag protection and merge queue, fitted to team size and release model.
category: git
version: 1.0.0
status: incubating
stage: [plan, ship]
role: [tech-lead, maintainer, devops-engineer]
stack: [git]
requires: [none]
inputs: [text]
output: [config, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [branch-protection, rulesets, required-checks, merge-queue, repo-settings]
pairs_with:
  prompts: [choose-branching-strategy, write-codeowners-file, set-up-commit-signing]
args:
  - name: team_context
    description: Team size and time zones, branching and release model (trunk-based, release branches, tags), CI checks that exist, who must be able to bypass in an emergency, compliance needs, and any pain today (broken main, slow merges, unreviewed hotfixes).
    type: text
    required: true
  - name: hosting
    description: The hosting service, so settings use its own names.
    type: enum
    enum: [github, gitlab, bitbucket, other]
    default: github
output_contract:
  format: markdown
  sections: [Recommendation, Rules by branch and tag, Settings to apply, Exceptions and bypass, Rollout]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A tech lead or repository admin wants protection rules that keep the main and release branches healthy without slowing the team to a crawl. Over-protection fails as badly as none: two required approvals on a three-person team stalls every PR, required checks that are flaky train people to bypass, and admins who can push directly make the rules decorative. Rules should match the release model and include a documented emergency path. Hosting: {{hosting}}.

<team_context>
{{team_context}}
</team_context>
</context>

<task>
1. Identify the protected targets from the release model: the default branch, release branches (by pattern, for example `release/*`), and release tags (`v*`).
2. For each target, decide and justify:
   - **Pull request required,** with the number of approvals: 1 for most teams, 2 for regulated or high-risk repos with enough reviewers; dismiss stale approvals on new commits; require approval of the latest push by someone other than the pusher.
   - **Code owner review** for sensitive paths only (infra, auth, payments, CI config), with a fallback owner team so PRs never wait on one person.
   - **Required status checks:** the fast, reliable ones by exact job name; require branches to be up to date only if there is no merge queue; flaky checks fixed or kept advisory, never required.
   - **Merge queue** when the team merges often enough that "up to date" rebases cause churn (roughly more than a few merges an hour, or a long CI).
   - **History:** linear history and allowed merge methods (squash only, or rebase) matched to how the team reads history and generates changelogs.
   - **Signed commits** only if the team can support key setup; otherwise note signing of release tags as the minimum.
   - **Force-push and deletion** blocked on protected branches.
   - **Conversation resolution** required before merge.
3. **Tags:** protect release tags from deletion and update; restrict who can create them to the release automation or maintainers.
4. **Bypass:** who can bypass (a small group or the release bot, never everyone with admin by default), how emergencies are handled (a documented break-glass procedure with a follow-up review), and an audit trail.
5. Use {{hosting}} names for each setting (for example GitHub rulesets and branch protection, GitLab protected branches and approval rules, Bitbucket branch permissions and merge checks). If unsure whether a setting exists on a plan or version, say to check and give the intent. For "other", describe each rule generically.
6. Give a rollout: start in evaluate or audit mode if available, announce, apply to the default branch first, then release branches, review after two weeks.
</task>

<constraints>
- Fit rules to team size: never require more approvals than there are regular reviewers minus one.
- Do not invent check names; use those in the context or mark placeholders.
- Do not claim exact menu paths or plan limits; name the setting and say where to verify it.
- If the context lacks team size or release model, ask for them and stop.
</constraints>

<output_format>
## Recommendation
Three or four sentences: the overall approach and the main trade-off.
## Rules by branch and tag
Table: Target (pattern) | Rule | Setting | Why.
## Settings to apply
A checklist in {{hosting}} terms; where the service supports rules as code (for example a ruleset JSON or API payload), a short example marked as a template to check against current docs.
## Exceptions and bypass
Who, when and how it is logged.
## Rollout
Numbered steps.
</output_format>
