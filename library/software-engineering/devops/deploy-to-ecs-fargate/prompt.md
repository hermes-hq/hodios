---
schema: 1
id: deploy-to-ecs-fargate
kind: prompt
title: Deploy a service to ECS Fargate
description: Deploys a container service to AWS ECS on Fargate with task definition, service, load balancer target group, health checks, autoscaling, logs, secrets from SSM or Secrets Manager and safe rollouts.
category: devops
version: 1.0.0
status: incubating
stage: [ship, operate]
role: [backend-engineer, devops-engineer]
stack: [aws, docker, terraform]
requires: [repo-read, file-write]
inputs: [repo, text]
output: [config, checklist]
risk: edits-files
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [ecs, fargate, task-definition, deployment-circuit-breaker, alb]
pairs_with:
  prompts: [build-container-image-in-ci, set-up-keyless-ci-deploys, configure-load-balancer]
args:
  - name: service
    description: The service (port, health endpoint, CPU and memory needs, background workers), dependencies, expected traffic and the existing AWS setup (VPC, cluster, load balancer).
    type: text
    required: true
  - name: iac
    description: Terraform, CDK, CloudFormation or Copilot; Terraform is assumed if not given.
    type: string
output_contract:
  format: markdown
  sections: [Architecture, Config, Rollout, Verify, Follow-ups]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
ECS on Fargate removes servers but leaves a lot of wiring, and most failed first deploys are wiring. Two IAM roles are routinely confused: the task execution role (pulls the image, reads secrets, writes logs) and the task role (what the app itself may call). Tasks in private subnets need a NAT gateway or VPC endpoints to pull images and reach AWS APIs, otherwise they hang in PENDING. The load balancer health check path, its grace period and the container's start time must agree, or the service kills tasks that are still starting. Without the deployment circuit breaker a bad image loops forever; with it and rollback enabled, ECS returns to the last working task definition. Deploys must also tolerate the deregistration delay so in-flight requests finish, and the app must handle SIGTERM within the stop timeout.
</context>

<task>
Deploy this service to ECS Fargate:
<service>
{{service}}
</service>
{{#iac}}
Infrastructure as code: {{iac}}
{{/iac}}

1. Read the repository: Dockerfile, port, health endpoint, startup time, signal handling, environment variables and secrets, and any existing infrastructure code. Reuse the existing VPC, cluster and load balancer if they exist.
2. Task definition: Fargate CPU and memory sized from the given needs, the image by digest or immutable tag, port mapping, `awslogs` log configuration with a log group that has a retention period, secrets from SSM Parameter Store or Secrets Manager, a container health check if useful, and a stop timeout that covers graceful shutdown.
3. IAM: a task execution role with only image pull, log and the specific secret read permissions; a task role with only what the app calls.
4. Networking: tasks in private subnets with no public IP, security group allowing the port only from the load balancer's security group, and NAT or VPC endpoints for ECR, logs and secrets.
5. Load balancer: target group of type `ip`, health check path and thresholds, deregistration delay, listener rule on HTTPS. Set the service's health check grace period from the measured startup time.
6. Service: desired count of at least two across availability zones, rolling deployment with minimum healthy percent and maximum percent chosen, deployment circuit breaker with rollback enabled.
7. Autoscaling: target tracking on CPU or request count per target, with min and max.
8. Deploy from CI: register a new task definition revision with the new image and update the service, waiting for stability. Validate the infrastructure code (`terraform validate` or `cdk synth`) if available.
</task>

<constraints>
- Do not give the task role or execution role wildcard permissions.
- Do not assign public IPs to tasks or open the container port to the internet.
- Do not invent resource arguments; say when unsure and use placeholders for account ids, subnets and certificates.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Architecture
Load balancer, service, tasks, subnets, roles and secrets, in bullets.

## Config
Infrastructure files with paths and full contents, and the CI deploy step.

## Rollout
How a deploy proceeds, what triggers rollback, and the manual rollback command.

## Verify
Validation results and what to check on the first deploy (task status, target health, logs).

## Follow-ups
App changes needed (signals, health endpoint), placeholders to fill and alarms to add. "None" if empty.
</output_format>
