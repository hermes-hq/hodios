---
schema: 1
id: plan-coding-agent-rollout
kind: prompt
title: Plan a coding agent rollout
description: Plans rolling out coding agents to an engineering team with pilot tasks, permission levels, review rules, repository preparation, measures of value and a plan for handling failures.
category: meta
version: 1.0.0
status: incubating
stage: [plan]
role: [engineering-manager, tech-lead]
requires: [none]
inputs: [notes, text]
output: [plan, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [coding-agents, ai-adoption, pilot, permissions, developer-productivity]
pairs_with:
  prompts: [audit-agent-permissions, write-agents-md, review-agent-transcript]
args:
  - name: team
    description: The team or teams involved, for example "14 engineers across two product teams, mixed seniority, on-call rotation, regulated fintech". Include current review and release practices.
    type: text
    required: true
  - name: repos
    description: The repositories in scope, with languages, size, test coverage and CI speed, for example "a 600k-line TypeScript monorepo with 70% coverage and 25-minute CI; a Go service with good tests".
    type: text
    required: true
  - name: risk_tolerance
    description: "low: agents propose changes, humans apply them; no shell outside a sandbox. medium: agents edit and run tests in sandboxes and open pull requests. high: agents may run broader automation on low-risk repositories with human review before merge."
    type: enum
    enum: [low, medium, high]
    default: low
output_contract:
  format: markdown
  sections: [Summary, Readiness gaps, Pilot, Permission levels, Review rules, Repository preparation, Measuring value, Failure handling, Rollout phases, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Coding agent rollouts usually fail in one of a few ways. They start on the hardest, least-tested code and the team concludes agents do not work. Permissions are set once, too broad or too narrow, without matching them to task risk. Review standards slip because agent pull requests look plausible, so subtle bugs and security issues merge. Success is measured by enthusiasm or lines of code instead of outcomes. Nobody prepares the repositories: there is no agent instruction file, tests are slow or flaky, and setup takes tribal knowledge, so agents flail. Junior engineers stop learning because the agent writes everything. A good plan starts with a small, measured pilot on well-tested code and widens access as evidence comes in.
</context>

<task>
Plan the rollout of coding agents for this team, at {{risk_tolerance}} risk tolerance.

Team: {{team}}
Repositories: {{repos}}

1. Readiness gaps: from the repository details, list what will make agents fail or be dangerous (missing or slow tests, flaky CI, undocumented setup, secrets in the repository or environment, no branch protection) and what to fix first.
2. Pilot: choose three to six task types that suit agents and the repositories (for example adding tests to well-understood modules, dependency upgrades with good coverage, small bugs with clear reproduction steps, documentation updates, lint and type-error cleanup) and two or three to avoid at first (security-critical code, data migrations, ambiguous product work). Name the pilot group (a mix of seniority, with volunteers), the duration and the success criteria decided before starting.
3. Permission levels: define tiers that match {{risk_tolerance}}, for example read-only suggestions, edits in a sandbox or branch, running tests and builds, network access, and opening pull requests. State what is never allowed at any tier (production credentials, pushing to protected branches, merging their own work, disabling checks). Say which tasks map to which tier. Keep it tool-agnostic.
4. Review rules: agent pull requests get the same or stricter review as human ones, the requesting engineer owns the change and must be able to explain it, sensitive paths need code-owner review, and the pull request states that an agent produced it and how it was verified.
5. Repository preparation: an agent instruction file per repository with verified commands, layout and boundaries; fast, reliable test commands; reproducible setup; secrets kept out of the agent's reach.
6. Measuring value: a baseline taken before the pilot, then outcome measures (cycle time for the pilot task types, review rework, escaped defects and reverts, time spent reviewing agent output, engineer sentiment from a short survey) and cost. Warn against vanity measures such as lines of code or number of agent pull requests.
7. Failure handling: what engineers do when an agent produces something wrong or unsafe, how incidents involving agent-written code are reviewed (blamelessly, with the transcript where available), how to report a bad pattern so instructions get fixed, and the conditions under which the pilot pauses.
8. Rollout phases: pilot, expansion, general availability, each with entry criteria tied to the measures, and a note on keeping learning opportunities for less experienced engineers.
9. Before answering, check that every permission tier is consistent with {{risk_tolerance}}, that every pilot task type fits the stated test coverage, and that the plan does not depend on a specific vendor's features.

If the team or repository details are too thin to choose pilot tasks (for example no information on tests or CI), list the missing facts under Open questions and base the pilot on clearly stated assumptions.
</task>

<constraints>
- Tool-agnostic: no vendor or product names; describe capabilities instead.
- Do not promise productivity percentages; describe how the team will find out.
- Keep the plan proportionate: a five-person team needs a page, not a programme office.
</constraints>

<output_format>
## Summary
Five sentences: the approach, the pilot, the main risk and the decision point.
## Readiness gaps
Ordered list with the fix for each.
## Pilot
Task types to use and to avoid (with reasons), the group, duration and success criteria.
## Permission levels
Table: tier, what the agent may do, tasks allowed, approval needed.
## Review rules
Bulleted rules.
## Repository preparation
Checklist per repository.
## Measuring value
Table: measure, baseline method, target or decision threshold.
## Failure handling
Steps and pause conditions.
## Rollout phases
Table: phase, audience, entry criteria, duration.
## Open questions
Missing facts and assumptions, or "None".
</output_format>
