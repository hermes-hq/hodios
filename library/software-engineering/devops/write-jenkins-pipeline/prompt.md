---
schema: 1
id: write-jenkins-pipeline
kind: prompt
title: Write a Jenkins pipeline
description: Writes a declarative Jenkinsfile with agents, stages, parallel branches, credentials binding, shared-library steps, timeouts and post actions that fits the repo's real build commands.
category: devops
version: 1.0.0
status: incubating
stage: [build, ship]
role: [devops-engineer, software-engineer]
stack: []
requires: [repo-read, file-write]
inputs: [repo, spec]
output: [config]
risk: edits-files
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [jenkins, jenkinsfile, ci, pipeline-as-code]
pairs_with:
  prompts: [design-ci-cd-pipeline, migrate-ci-provider, speed-up-ci-pipeline]
args:
  - name: goal
    description: What the pipeline must do, for example "build and test on every branch, deploy main to staging after approval".
    type: text
    required: true
  - name: jenkins_setup
    description: What the Jenkins instance offers - agent labels or Kubernetes pod templates, installed plugins, credential ids, shared libraries.
    type: text
output_contract:
  format: markdown
  sections: [Jenkinsfile, Decisions, Assumptions, Verify, Follow-ups]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Jenkins pipelines rot in recognisable ways: scripted Groovy blocks that only one person understands, `agent any` so builds land on whatever node has the wrong JDK, credentials echoed into the console, no timeouts so a hung test holds an executor for days, and workspaces that are never cleaned. Declarative syntax with explicit agents (labels, Docker images or Kubernetes pod templates), `withCredentials` or `credentials()` bindings, `options { timeout(); buildDiscarder(); disableConcurrentBuilds() }` and `post` blocks fixes most of it. Everything a Jenkinsfile can use depends on what the controller has installed: plugins, agent labels and credential ids differ per instance, so a pipeline written for "generic Jenkins" often fails on the first run with a missing step.
</context>

<task>
Write a declarative Jenkinsfile that does this: {{goal}}
{{#jenkins_setup}}
Jenkins setup: {{jenkins_setup}}
{{/jenkins_setup}}

1. Read the repository: build tool and commands, test reports produced, Dockerfiles, any existing Jenkinsfile or shared-library calls. Reuse the project's commands.
2. Choose agents per stage: a label, a Docker image or a Kubernetes pod template that matches the toolchain. Use `agent none` at the top when stages need different agents.
3. Add `options`: `timeout`, `buildDiscarder`, `timestamps` if the plugin exists, and `disableConcurrentBuilds` for deploy branches.
4. Build stages with `when` conditions for branches, tags or change requests. Run independent work in `parallel` and fail fast only when it saves real time.
5. Bind credentials by id with `withCredentials` or `environment { X = credentials('id') }` only in the stage that needs them. Wrap shell commands so secrets are never echoed.
6. Publish test results (`junit`) and archive artifacts in `post { always { ... } }`; clean the workspace in `post { cleanup { ... } }`.
7. Gate deploys with `input` inside a stage that holds no executor (agent none for that stage plus a timeout), or with the team's approval mechanism.
8. Validate the file with the controller's declarative linter if the user has access, and say how.
</task>

<constraints>
- Use only steps from plugins the user confirmed or that ship with the Pipeline suite; list every plugin the file needs under Assumptions.
- Never print credentials, never interpolate secrets into Groovy strings with double quotes (use single-quoted shell strings so the shell expands them).
- Do not invent credential ids, agent labels or shared-library names; use clearly marked placeholders.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Jenkinsfile
The complete file.

## Decisions
One bullet each for agents, parallelism, approval gate and caching.

## Assumptions
Plugins, agent labels, credential ids and shared libraries the file relies on.

## Verify
How the file was or can be linted and what to check on the first run.

## Follow-ups
Controller changes needed and placeholders to fill. "None" if empty.
</output_format>
