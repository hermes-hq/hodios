---
schema: 1
id: explain-infrastructure-code
kind: prompt
title: Explain infrastructure code
description: Explains Terraform, Kubernetes or CloudFormation code as the resources it creates, how they connect, what drives cost, and which changes would replace or break something.
category: learning
version: 1.0.0
status: incubating
stage: [learn, review]
role: [software-engineer, devops-engineer, sre]
stack: [terraform, kubernetes]
requires: [none]
inputs: [file, config]
output: [explanation, diagram, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [infrastructure-as-code, cloudformation, resource-graph, cloud-costs]
pairs_with:
  prompts: [document-infrastructure, explain-config-file, review-kubernetes-manifest-change]
args:
  - name: code
    description: The infrastructure code to explain (Terraform files or a module, Kubernetes manifests or a Helm chart's rendered output, a CloudFormation or CDK-synthesised template).
    type: text
    required: true
  - name: context
    description: What you know about where it runs (cloud provider, environment, which variables files or values are used).
    type: text
  - name: question
    description: A specific question, such as "what happens if I change the instance type" or "why can the pods not reach the database".
    type: text
output_contract:
  format: markdown
  sections: [What this builds, Resources, How they connect, Cost drivers, Risky to change, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Infrastructure code reads like configuration but behaves like a program with side effects on real money and real data. Newcomers miss the same things: a Terraform resource name is not the cloud name, and renaming it destroys and recreates the resource unless a `moved` block is used; some attribute changes force replacement (an RDS engine version jump, a subnet change, a Kubernetes Deployment selector), which means downtime or data loss; `count` and `for_each` change resource addresses; values often come from variables, data sources, remote state or Helm values that are not in the file; and Kubernetes objects connect only through labels and selectors, so a typo silently disconnects a Service from its pods. Cost is driven by a few line items: instance and node sizes, NAT gateways, load balancers, managed databases, storage with retention, and cross-zone or egress traffic.
</context>

<task>
Explain this infrastructure code.
{{#context}}
Context: {{context}}
{{/context}}

```
{{code}}
```
{{#question}}
Question to answer first: {{question}}
{{/question}}

1. Identify the tool and provider (Terraform with which providers, plain Kubernetes, Helm output, CloudFormation or CDK output) and say what is not visible: variables, values files, modules, remote state, data sources.
2. Say in two or three sentences what this builds and for whom: the service or environment it supports.
3. List every resource it creates or manages, with its kind, its address or name, and its job in plain words. Separate created resources from ones only read (data sources, existing resources referenced by id).
4. Explain how they connect: network paths (VPC, subnets, security groups, Services and selectors, Ingress), identity (IAM roles, service accounts), and data dependencies. Draw a Mermaid flowchart of the main path a request or data takes.
5. Name the cost drivers you can see and the size settings that control each. Do not give prices; say which line items usually dominate and what to check in the provider's pricing or the cost tool.
6. List what is risky to change: attributes that force replacement, resources holding data (databases, volumes, buckets) and whether deletion protection or a prevent-destroy lifecycle is set, renames without `moved`, selectors and labels, and anything open to the internet. Say how to preview a change safely (`terraform plan`, `kubectl diff`, a CloudFormation change set).
</task>

<constraints>
- Explain only; do not rewrite the code. Suggestions appear only in the risky list.
- Do not invent values for variables, modules or remote state you cannot see. Say what they would change.
- Do not quote prices or claim exact replacement behaviour you are not sure of for the provider version; say how to confirm it with a plan or diff.
- If the code contains a secret, say it should be moved out and rotated, and do not repeat it.
{{> output/uncertainty}}
</constraints>

<output_format>
## What this builds
Two or three sentences, plus what is not visible.
## Resources
A table: resource, kind, created or read, job.
## How they connect
Short prose plus a Mermaid flowchart.
## Cost drivers
Bullets, each with the setting that controls it.
## Risky to change
Bullets: the change, what happens, how to preview it.
## Questions
What would change the explanation.
</output_format>
