---
schema: 1
id: set-up-cloudwatch-alarms
kind: prompt
title: Set up CloudWatch alarms as code
description: Sets up AWS CloudWatch alarms, log metric filters and a dashboard for a workload as code, with M-of-N evaluation, missing-data handling, metric math, composite alarms and SNS routing.
category: devops
version: 1.0.0
status: incubating
stage: [build, operate]
role: [devops-engineer, sre, backend-engineer]
stack: [aws]
requires: [repo-read, file-write]
inputs: [repo, config, text]
output: [config, report]
risk: edits-files
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [cloudwatch, alarms, sns, metric-filters, infrastructure-as-code]
pairs_with:
  prompts: [design-alerting-rules, design-service-dashboard, write-cloudformation-template]
args:
  - name: workload
    description: The AWS resources to alarm on, for example "an ALB in front of ECS services, an RDS Postgres instance and an SQS queue with a Lambda consumer".
    type: text
    required: true
  - name: notes
    description: "IaC tool in use (CloudFormation, CDK, Terraform, SAM), where alerts should go, traffic pattern (steady, spiky, quiet at night), existing alarms, and any SLOs."
    type: text
output_contract:
  format: markdown
  sections: [Alarm plan, Code, Routing, Verification, Follow-ups]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
CloudWatch alarms fail in predictable ways. Dimensions must match the metric exactly (an ALB alarm needs the `LoadBalancer` value in its `app/name/id` form, a target group alarm needs both target group and load balancer), or the alarm sits in `INSUFFICIENT_DATA` forever and nobody notices. "Datapoints to alarm" (M out of N periods) is what stops one bad minute from paging. "Treat missing data" decides whether a quiet period is fine (`notBreaching`), suspicious (`breaching`, right for heartbeat-style metrics) or ignored; the default is wrong for low-traffic services. Counts make poor alarms when traffic varies: metric math for an error rate (5XX divided by requests) works across busy and quiet hours. Latency should be alarmed on percentiles, not averages. Composite alarms combine several into one page and cut noise. Some services publish at five-minute resolution unless detailed monitoring is enabled. Log metric filters only count new log events after creation. Useful signals by service: ALB `HTTPCode_Target_5XX_Count`, `TargetResponseTime`, `UnHealthyHostCount`; Lambda `Errors`, `Throttles`, `Duration`; SQS `ApproximateAgeOfOldestMessage`; RDS `FreeStorageSpace`, `CPUUtilization`, `DatabaseConnections`, `FreeableMemory`. An SNS topic encrypted with a customer-managed KMS key needs a key policy that lets CloudWatch use it, or notifications fail silently. Alarms and custom metrics are billed, so each one should earn its place.
</context>

<task>
Set up CloudWatch alarms for {{workload}}.
{{#notes}}
Notes:
{{notes}}
{{/notes}}

1. Read the repository: the IaC tool and module layout, how the resources are defined (so dimensions can be referenced, not hard-coded), existing alarms, SNS topics and tags.
2. Write the alarm plan: for each resource, the user-facing symptom or saturation signal, metric or metric math expression, statistic, period, M-of-N, missing-data treatment, threshold with reasoning, and severity. Prefer few alarms tied to user impact; mark cause-level alarms as tickets, not pages.
3. Add metric filters only for signals that exist only in logs, with the filter pattern and metric namespace, and say whether Embedded Metric Format in the app would be better.
4. Write the code in the repo's IaC tool: alarms referencing resource attributes for dimensions, composite alarms where several signals mean one problem, SNS topics per severity with subscriptions or integrations given by the user, KMS key policy if the topic is encrypted, OK actions, and a dashboard with the same metrics.
5. Validate with the tool's synth, validate or plan command if available, and list what to check in the diff.
6. Explain how to test routing after deploy (for example `aws cloudwatch set-alarm-state` on a non-critical alarm) and what to tune after a week of data.
</task>

<constraints>
- Do not hard-code resource ids in dimensions when the IaC can reference them.
- Do not page on cause-level metrics such as CPU alone unless the user asks; explain the trade-off.
- Do not quote prices; mention which items are billed.
- Do not invent metric names or dimensions; use those AWS documents for the service and mark any you could not confirm.

{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Alarm plan
Table: resource, signal, expression, statistic and period, M of N, missing data, threshold, severity, reason.
## Code
Files with paths and contents.
## Routing
Topics, subscribers, severities, encryption.
## Verification
Validate or plan result and the routing test steps.
## Follow-ups
Thresholds to tune, signals needing app instrumentation, alarms to retire.
</output_format>
