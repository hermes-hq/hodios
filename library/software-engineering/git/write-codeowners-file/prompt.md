---
schema: 1
id: write-codeowners-file
kind: prompt
title: Write a CODEOWNERS file
description: Writes a CODEOWNERS file from the repository layout and team structure, with ordered ownership rules, fallbacks, protection for sensitive paths and a check for files nobody owns.
category: git
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [maintainer, tech-lead]
requires: [repo-read, file-write, shell]
inputs: [repo, text]
output: [config, report]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: mid
reasoning: optional
level: intermediate
tags: [codeowners, code-ownership, branch-protection, review-routing]
pairs_with:
  prompts: [write-code-review-guidelines]
args:
  - name: layout
    description: Top-level directories and anything notable about them, for example "services/<name> (one per team), packages/ui (shared), infra/ (terraform), .github/". Leave short if the repository is available; you will read it.
    type: text
    required: true
  - name: teams
    description: Teams or people and what they own, using the handles the platform knows, for example "@acme/payments owns services/billing and services/invoices; @acme/platform owns infra and CI".
    type: text
    required: true
  - name: platform
    description: Where the repository is hosted. Syntax and features differ.
    type: enum
    enum: [github, gitlab]
    default: github
output_contract:
  format: markdown
  sections: [Ownership map, CODEOWNERS, Unowned paths, Branch protection settings, Open questions, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A CODEOWNERS file routes reviews and, with branch protection, decides who must approve a change. Common mistakes defeat it: rules in the wrong order (the last matching pattern wins for a path, on GitLab within each section, so a broad rule at the bottom overrides every specific rule above it); handles of teams that lack write access, which the platform silently ignores; one person owning everything, which blocks every merge while they are away; no owner for CI workflows, infrastructure or the CODEOWNERS file itself, which lets anyone change the rules; and paths that match nothing, so changes merge without the right review.
</context>

<task>
Write a CODEOWNERS file for this repository on {{platform}}.

Layout notes: {{layout}}
Teams and ownership: {{teams}}

1. Read the actual repository tree (for example `git ls-files` and a directory listing to depth two or three) and any existing CODEOWNERS file. Prefer what is in the repository over the notes when they disagree, and report the difference. If a CODEOWNERS file already exists, edit it rather than replacing it, and keep rules that are still valid.
2. Build an ownership map: each meaningful path, its owning team, and a second owner or team where possible so no path depends on one person.
3. Write the file in {{platform}} syntax and in the right place (`.github/CODEOWNERS` on GitHub, `.gitlab/CODEOWNERS` or the repository root on GitLab, or wherever the repository already keeps it):
   - Order rules from general to specific: a catch-all default owner first, then directories, then specific files, because the last match wins.
   - Use team handles rather than individuals wherever a team exists.
   - Give explicit owners to sensitive paths: CI and workflow definitions, infrastructure and deployment config, dependency manifests and lock files where the team wants that, security-related code, and the CODEOWNERS file itself.
   - On GitLab, use sections (with optional approval counts) where they help group rules; on GitHub, keep it a flat ordered list.
   - Comment each block briefly with what it covers.
4. Check coverage: list every tracked path whose only owner is the catch-all rule, and every directory that matches no rule at all if there is no catch-all. Check handle formats and flag any handle you cannot confirm has write access (the platform ignores those).
5. If the platform's own CODEOWNERS validation is available to you (for example the error view on GitHub, or a CLI or API check), use it; otherwise say that the platform check still has to be done after pushing.
6. Recommend branch protection settings that make the file enforceable (require review from code owners, and the approval count), but do not change repository settings yourself.
</task>

<constraints>
- Write only the CODEOWNERS file. Do not change branch protection, team membership or other files.
- Do not invent team handles. If a path has no clear owner in the notes or history, assign it to the catch-all owner and list it under Open questions.
- Do not commit or push; leave the change in the working tree for review.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Ownership map
| Path | Owners | Backup | Source (notes, history or assumption) |

## CODEOWNERS
The complete file in a fenced block, with its path.

## Unowned paths
Paths that fall through to the catch-all or match nothing.

## Branch protection settings
The settings to enable, as a short list for the repository admin.

## Open questions
Paths with unclear ownership and handles to confirm.

## Verification
Commands run, what the coverage check found, and whether a platform validation was run.
</output_format>
