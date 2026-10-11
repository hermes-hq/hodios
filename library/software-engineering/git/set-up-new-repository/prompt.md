---
schema: 1
id: set-up-new-repository
kind: prompt
title: Set up a new team repository
description: Sets up a new team repository in one pass, covering default branch, protection rules, merge methods, ignore and attribute files, templates, CODEOWNERS, security features and access.
category: git
version: 1.0.0
status: incubating
stage: [plan, build]
role: [tech-lead, software-engineer, devops-engineer, maintainer]
stack: [git]
requires: [none]
inputs: [text]
output: [checklist, config, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [repository-settings, branch-rules, merge-methods, issue-templates, secret-scanning]
pairs_with:
  prompts: [configure-branch-protection, write-codeowners-file, write-pull-request-template, write-gitignore-file, configure-dependency-update-bot, write-team-git-guidelines]
args:
  - name: project
    description: What the repository holds and who works on it, for example "TypeScript API service, 6 engineers, deploys from main to production".
    type: text
    required: true
  - name: host
    description: Where it will live, for example GitHub organisation, GitLab group, Bitbucket workspace or Azure DevOps.
    type: string
  - name: visibility
    description: Who can see it.
    type: enum
    enum: [private, internal, public]
    default: private
output_contract:
  format: markdown
  sections: [Settings, Files to add, Protection and merging, Security, Access, First-week checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The first hour of a repository's life sets habits that are hard to change later: the default branch everyone forks from, whether merges are squashed, who can push to main, whether secrets get blocked before they land, and whether every pull request carries the right reviewers. Teams usually set half of this and discover the rest after an incident: a force-push to main, a token committed in week two, a merge commit history nobody can read, a contractor with admin rights. Settings also interact: a squash-only repository makes the pull request title the commit message, so that is where commit conventions must be checked; required status checks need the CI job names to exist before they can be selected; CODEOWNERS only enforces review when protection requires code-owner review. Some features depend on the host's plan, so the setup must say what to check rather than assume.

<project>
{{project}}
</project>
Host: {{host}}
Visibility: {{visibility}}
</context>

<task>
1. If the host is not stated, give host-neutral steps and name the setting on GitHub and GitLab where they differ.
2. Settings: name, description, default branch `main`, features to switch on or off (wiki, projects, discussions), automatic deletion of merged branches, and merge methods. Recommend one merge method for this team and say why.
3. Files to add in the first commit: README with how to run and test, licence (for public repositories, and say the choice is the owner's), `.gitignore` for the stack, `.gitattributes` for line endings and binary files, `.editorconfig`, pull request and issue templates, CODEOWNERS, SECURITY.md for public projects, and a CI workflow that runs build and tests on pull requests. Give short starter contents, not essays.
4. Protection and merging: rules for the default branch (pull request required, number of approvals, code-owner review, required checks, up-to-date or merge queue, no force-push or deletion, who may bypass), rules for release tags, and when to add them (after the first CI run so checks can be selected).
5. Security: secret scanning with push protection, dependency alerts and update bot, code scanning if available, Actions or pipeline permissions set to read-only by default, and environment protection for deploys.
6. Access: teams rather than individuals, least privilege per team, two admins at most, and how outside collaborators get access.
7. First-week checks: a test pull request that proves the rules work, and the settings to revisit after a month.
</task>

<constraints>
- Do not claim a feature is free or included on any plan; say "check your plan" where it varies.
- Keep starter files short and specific to the stated stack; do not invent project details.
- Recommend, then move on; do not list every possible setting.
</constraints>

<output_format>
## Settings
Checklist with the recommended value for each.
## Files to add
Each file with a short fenced starter.
## Protection and merging
Checklist of rules with values.
## Security
Checklist.
## Access
Teams and roles in a small table.
## First-week checks
Checklist.
</output_format>
