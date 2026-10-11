---
schema: 1
id: design-vpc-network
kind: prompt
title: Design a cloud VPC network
description: Designs a cloud VPC with a CIDR plan, public and private subnets across zones, NAT, routing, security groups, private endpoints and connectivity, delivered as IaC.
category: devops
version: 1.0.0
status: incubating
stage: [design, build]
role: [devops-engineer, architect, sre]
stack: [aws, gcp, azure]
requires: [none]
inputs: [spec]
output: [plan, code, diagram]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [iac, vpc, subnetting, cidr-plan, nat-gateway]
pairs_with:
  prompts: [design-cloud-account-structure, write-terraform-module, review-iac-plan]
args:
  - name: workloads
    description: What runs in the network (Kubernetes, VMs, managed databases, serverless), expected scale, and what must reach the internet or be reached from it.
    type: text
    required: true
  - name: cloud
    description: Cloud provider.
    type: enum
    enum: [aws, gcp, azure]
    default: aws
  - name: connectivity
    description: Other networks to connect (other VPCs, on-premises over VPN or direct link, peered partner networks) and their CIDR ranges, plus regions and environments.
    type: text
output_contract:
  format: markdown
  sections: [Assumptions, CIDR plan, Subnets and routing, Security, Egress and endpoints, IaC, Costs to watch]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Network layout is the hardest cloud decision to change later: a VPC's primary CIDR cannot shrink, overlapping ranges block peering and VPN forever, and Kubernetes can exhaust a /24 quickly because each pod takes a VPC address on EKS (VPC CNI) or a secondary range on GKE. Good designs reserve a non-overlapping block per environment and region from a company-wide plan, size subnets for pods and growth rather than for today, and spread every tier across at least two or three zones. NAT gateways are a top surprise on the bill: they charge per hour and per gigabyte processed, so traffic to the provider's own services (object storage, container registry, secrets) should go through gateway or interface endpoints (AWS), Private Google Access or Private Service Connect (GCP), or private endpoints (Azure). One NAT per zone avoids a cross-zone dependency; one shared NAT saves money in non-production. Security groups or firewall rules referencing other groups or tags age better than CIDR-based rules.
</context>

<task>
Design a {{cloud}} network for:
{{workloads}}
{{#connectivity}}
Connectivity: {{connectivity}}
{{/connectivity}}

1. If a decision that changes the design is missing (regions, number of environments, existing ranges that must not overlap, whether Kubernetes is involved), ask up to 3 questions and stop. Otherwise default and record it.
2. CIDR plan: a company-level block, one range per environment and region, and inside each VPC the subnets per tier (public, private app, data, Kubernetes pods if separate) per zone, with sizes justified by expected hosts and pods plus growth. Check every range against the stated connected networks for overlap.
3. Routing: public subnets with an internet gateway only for load balancers and bastion-free access patterns; private subnets egress via NAT (one per zone in prod, shared allowed in non-prod, stated); data subnets with no internet route at all.
4. Security: security groups or firewall rules by role referencing each other, default deny, no SSH from the internet (use the provider's session manager or IAP), and flow logs enabled with retention.
5. Egress and endpoints: private endpoints for object storage, container registry, secrets and logging; DNS resolution for private endpoints; whether egress filtering is needed.
6. Connectivity: peering, transit gateway or hub-and-spoke, or VPN, chosen for the number of networks, with route propagation.
7. Write the IaC for one environment, preferring a well-known community module where one exists for the provider, with every range coming from variables.
8. List the ongoing costs to watch: NAT hours and data processed, cross-zone traffic, endpoints, IP addresses.
</task>

<constraints>
- No overlapping CIDRs with any network named by the user; show the check.
- Do not invent provider prices; name the cost drivers and tell the user to price them in the provider calculator.
- Only reference IaC modules and resource types you are sure exist; otherwise write plain resources.
- Use RFC 1918 ranges unless the user has a reason not to.
{{> output/uncertainty}}
</constraints>

<output_format>
## Assumptions
Bullets.
## CIDR plan
Table: environment | region | VPC range | subnet | zone | size | purpose.
## Subnets and routing
Bullets per tier, plus a text diagram of the network.
## Security
Table: group or rule | allows | from | why.
## Egress and endpoints
Bullets.
## IaC
Fenced blocks with file paths for one environment.
## Costs to watch
Bullets naming each cost driver.
</output_format>
