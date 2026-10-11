---
schema: 1
id: design-ci-agent-job
kind: prompt
title: Design a CI coding agent job
description: Designs a coding agent job that runs in CI on issues, pull requests or a schedule, with trigger rules, token scopes, untrusted-input handling, cost caps, outputs as pull requests and a kill switch.
category: meta
version: 1.0.0
status: incubating
stage: [design, ship]
role: [devops-engineer, tech-lead, security-engineer]
requires: [none]
inputs: [text, config]
output: [config, plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [coding-agents, headless-agents, prompt-injection, least-privilege, automation]
pairs_with:
  prompts: [audit-agent-permissions, design-agent-sandbox, make-issue-agent-ready]
args:
  - name: use_case
    description: What the job should do (fix labelled issues, answer review comments, update dependencies nightly), who may trigger it and on which repository (public or private).
    type: text
    required: true
  - name: ci_platform
    description: The CI system and anything already configured, such as existing workflow files or secrets.
    type: text
output_contract:
  format: markdown
  sections: [Design, Trigger and trust, Permissions, Job definition, Cost and failure handling, Rollout]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An agent in CI reads text written by other people (issue bodies, comments, pull request diffs) while holding a token that can write to the repository. On a public repository anyone can write that text, so prompt injection is the main design constraint. The classic mistakes: triggering on any comment instead of on maintainers, running privileged triggers against code from forks, giving the job a token that can push to the default branch or read every secret, letting the agent post anywhere, and no limit on how often it runs or what it spends. A safe design separates who may trigger from what the agent reads, gives the job only the scopes its output needs, lands every change as a pull request a human merges, and can be switched off without a code change.
</context>

<task>
Design the CI agent job for:
<use_case>
{{use_case}}
</use_case>
{{#ci_platform}}
CI platform and current setup:
<ci_platform>
{{ci_platform}}
</ci_platform>
{{/ci_platform}}

1. Write the job's purpose in one sentence and its output: a branch and pull request, a comment, or a report artifact.
2. Trigger and trust: list each trigger event, who can cause it, and the gate (maintainer-applied label, allowlisted users, manual dispatch). Mark every piece of untrusted text the agent will read.
3. Permissions: the token scopes the output needs and no more, which secrets are exposed to the job and to the agent process (separate them where possible), whether untrusted code is checked out, and the agent's own tool permissions (no network beyond required hosts, no pushing to protected branches, no merging).
4. Write the job definition for the platform, with concurrency limits, a timeout, pinned action or image versions, and a repository variable acting as a kill switch. Mark syntax you are not sure of "check against the platform's documentation".
5. Cost and failure handling: maximum runs per day, turn or token caps, what happens on failure (a comment with the log link, never a retry loop), and where logs and transcripts are kept.
6. Rollout: start on a private fork or with manual dispatch only, review the first ten runs, then widen.
</task>

<constraints>
- Never trigger an agent with write access from an event any outside user can cause without a maintainer gate.
- Never run a privileged trigger that checks out and executes code from a fork.
- The agent must not be able to merge, push to protected branches, change CI configuration or read deploy credentials.
- Do not claim the design makes injection impossible; list the residual risk.
{{> output/uncertainty}}
</constraints>

<output_format>
## Design
Purpose, output, and a five-line flow from trigger to human review.
## Trigger and trust
Table: event, who can cause it, gate, untrusted inputs read.
## Permissions
Table: token scope or secret, needed for, exposed to agent (yes or no).
## Job definition
One fenced block.
## Cost and failure handling
Caps, failure behaviour, log retention.
## Rollout
Steps and the signal to widen or stop.
</output_format>
