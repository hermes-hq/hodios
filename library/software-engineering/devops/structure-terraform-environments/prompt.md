---
schema: 1
id: structure-terraform-environments
kind: prompt
title: Structure a Terraform repo for environments
description: Lays out a Terraform or OpenTofu repo for dev, staging and prod with directories, workspaces or Terragrunt, shared modules, pinned versions and a promotion path for changes.
category: devops
version: 1.0.0
status: incubating
stage: [design, build]
role: [devops-engineer, sre, architect]
stack: [terraform]
requires: [repo-read]
inputs: [repo, spec]
output: [plan, code]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [iac, environment-promotion, terragrunt, repo-layout]
pairs_with:
  prompts: [set-up-terraform-state-backend, write-terraform-module, refactor-terraform-without-recreating]
args:
  - name: situation
    description: What the infrastructure covers, how many environments, accounts or projects, team size, and the current repo layout (or "new repo").
    type: text
    required: true
  - name: constraints
    description: Hard constraints such as "must keep workspaces", "no Terragrunt", separate accounts per environment, or compliance rules.
    type: text
output_contract:
  format: markdown
  sections: [Recommendation, Layout, Example, Promotion, Migration, Trade-offs]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
There are three common ways to run one Terraform codebase across environments, and each fails differently. CLI workspaces share one backend config and one code path, so environments cannot differ structurally, the active workspace is invisible state on someone's machine, and running `apply` in the wrong workspace hits prod; they suit identical, short-lived copies. A directory per environment (`envs/dev`, `envs/prod`) calling shared modules is explicit and lets prod pin an older module version, at the cost of some repeated wiring. Terragrunt removes that repetition and adds dependency ordering between components, at the cost of another tool and its own learning curve. Independent of the choice: split state by component (network, data, compute) so one plan never spans everything, pin module versions per environment so a change can be promoted rather than landing everywhere at once, and keep long-lived foundations apart from fast-changing app stacks.
</context>

<task>
Recommend and lay out a Terraform repository structure for:
{{situation}}
{{#constraints}}
Constraints: {{constraints}}
{{/constraints}}

1. If a repository is available, read its layout, backend blocks, module sources and version pins, `.tfvars` files and CI first, and describe the current structure in two or three lines.
2. Choose workspaces, directory-per-environment or Terragrunt for this situation and justify it against the other two in a few sentences, using the team size, how much environments differ and whether they live in separate accounts.
3. Draw the layout: `modules/` (or a separate module repo with tags), environment roots, component split (for example network, data, platform, apps), where `.tfvars` live, and one state key per environment and component.
4. Show one environment root for one component in full (backend, provider with `assume_role` or per-environment credentials, module call with a pinned version, variables), and how prod differs.
5. Promotion: how a module change moves dev to staging to prod (version bump per environment, plan in CI per root, approvals), and how cross-component values flow (remote state outputs or a parameter store) without circular dependencies.
6. If there is an existing repo, give a migration that moves resources into the new roots with `moved` blocks or state moves, one component at a time, each ending in a no-changes plan.
7. List the trade-offs the team accepts with this choice.
</task>

<constraints>
- Do not recommend Terragrunt or workspaces by default; the choice must follow from the situation.
- Every migration step must end in a `terraform plan` showing no destroy or replace; say how to check that.
- No hard-coded account IDs or credentials in the examples; use placeholders.
- Do not run any state-changing command; this is a design with example code.
{{> output/uncertainty}}
</constraints>

<output_format>
## Recommendation
The choice and the reasons, in one short paragraph.
## Layout
A file tree with a one-line purpose per folder.
## Example
Fenced `hcl` blocks for one component root, with file paths.
## Promotion
Numbered steps from change to prod.
## Migration
Numbered steps, or "New repo, no migration".
## Trade-offs
Bullets.
</output_format>
