---
schema: 1
id: set-up-preview-environments
kind: prompt
title: Set up preview environments
description: Sets up a preview environment per pull request with build and deploy, seeded databases, scoped secrets, the URL posted to the PR, automatic teardown and cost limits.
category: devops
version: 1.0.0
status: incubating
stage: [build, verify]
role: [fullstack-engineer, devops-engineer, frontend-engineer, backend-engineer]
stack: []
requires: [none]
inputs: [config, text]
output: [config, plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [preview-environments, ephemeral-environments, pull-request-deploys, seed-data, teardown]
pairs_with:
  prompts: [design-ci-cd-pipeline, write-github-actions-workflow, write-docker-compose, reduce-cloud-spend]
args:
  - name: stack
    description: The app's parts - frontend, backend services, databases, queues, caches, auth provider and third-party APIs - and their languages or frameworks.
    type: string
    required: true
  - name: hosting
    description: Where previews will run, for example "Vercel frontend plus Fly.io API", "Kubernetes cluster with Argo CD", "AWS ECS" or "a single VM with Docker Compose".
    type: string
    required: true
  - name: constraints
    description: CI system, monthly budget for previews, number of open pull requests at a time, data sensitivity, and anything that cannot run per PR (licensed software, shared third-party sandboxes).
    type: text
output_contract:
  format: markdown
  sections: [Design, Lifecycle, Data and secrets, Config, Cost controls, Limits and risks, Open questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You set up an isolated, disposable environment for every pull request so reviewers, designers and QA can click through the change before merge. Previews go wrong in four ways: they share a database and one PR's migration breaks everyone else's preview; they get real customer data or production secrets; they are never torn down, so the bill grows with every forgotten branch; and they take so long to come up that nobody waits for them.

Stack: {{stack}}
Hosting: {{hosting}}
</context>

<task>
{{#constraints}}
<constraints_given>
{{constraints}}
</constraints_given>
{{/constraints}}

1. Design: what runs per PR (everything, or only the changed services with the rest pointing at a shared staging), naming (`pr-<number>`), isolation (namespace, project, app or compose project per PR), and the URL scheme (`pr-123.preview.<domain>` with a wildcard DNS record and certificate). Choose the lightest option the hosting supports and say why.
2. Lifecycle: create or update on PR opened and on each push; post or update one PR comment with the URL, commit and status; destroy on PR closed or merged; a scheduled cleanup job that removes previews whose PR is closed or idle beyond a set number of days, as a safety net for missed events. Builds reuse the CI image cache so a preview is up within about 10 minutes.
3. Data: a database per preview created from migrations plus a seed script with synthetic data, or a branchable or template database if the host supports it; never a copy of production unless it is anonymised by a tested process. Migrations run per preview; say how a destructive migration on one PR stays isolated.
4. Secrets: preview-only credentials, sandbox or test-mode keys for third parties, a separate auth tenant or test users, and no production secrets in preview jobs. Pull requests from forks get no secrets and no preview by default.
5. Access: previews behind authentication or an IP or SSO gate so unreleased features and test data are not public; robots blocked.
6. Write the config for the hosting and CI: the deploy job, the comment step, the destroy job and the scheduled cleanup.
7. Cost controls: a cap on concurrent previews, small instance sizes, scale-to-zero or sleep after inactivity, time-to-live, and a monthly cost estimate formula using the user's numbers (open PRs x hours alive x unit cost) with placeholders where prices are unknown.
</task>

<constraints>
- Use the stack and hosting given; do not switch platforms. If a part cannot run per PR, say what it points to instead and the risk.
- Never invent prices; give the formula and placeholders, and say where to check current pricing.
- Teardown must be automatic and idempotent; a preview that fails to deploy still gets cleaned up.
- If required information (CI system, domain, database) is missing, mark it as [X] and list it under Open questions.
</constraints>

<output_format>
## Design
Bullets plus a small diagram in text.
## Lifecycle
Table: event | action | job.
## Data and secrets
Bullets.
## Config
Fenced blocks for each job or file.
## Cost controls
Bullets and the estimate formula.
## Limits and risks
Bullets.
## Open questions
Bullets, or "None".
</output_format>
