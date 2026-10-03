---
schema: 1
id: estimate-cloud-costs
kind: prompt
title: Estimate cloud costs for an architecture
description: Estimates the monthly cloud cost of a proposed architecture from usage assumptions, with a line-item breakdown, scale scenarios and cost risks. Use before committing to a design or a budget.
category: architecture
version: 1.0.0
status: incubating
stage: [design, plan]
role: [architect, tech-lead, devops-engineer, founder]
stack: [aws, gcp, azure]
requires: [none]
inputs: [spec, text]
output: [table, report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [finops, cost-estimate, capacity-planning, egress, unit-economics]
pairs_with:
  personas: [software-architect]
  prompts: [reduce-cloud-spend, compare-design-options, write-design-doc]
args:
  - name: architecture
    description: The proposed components and where they run (provider, region, managed services, instance or tier choices, environments), or a design doc excerpt.
    type: text
    required: true
  - name: usage_assumptions
    description: Expected traffic and data, such as monthly active users, requests per second at peak and average, payload sizes, storage growth, data transfer, and retention.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Assumptions, Cost breakdown, Scenarios, Cost drivers and risks, Ways to cut, Verify before trusting]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Architecture cost estimates go wrong in predictable places. Compute is usually estimated, while the lines that surprise teams are missed: NAT gateway processing, cross-zone and internet egress, load balancer capacity units, log and metric ingestion, per-request charges on serverless, queues and object storage, managed database storage and I/O, backups, and the non-production environments that run all month. Prices change and differ by region, so a useful estimate shows the formula and the unit price used, so anyone can refresh it with the provider's pricing calculator.
</context>

<task>
Estimate the monthly cost of:
<architecture>
{{architecture}}
</architecture>
Usage assumptions:
<usage_assumptions>
{{usage_assumptions}}
</usage_assumptions>

1. Restate the usage as numbers per component: requests per month, compute hours, vCPU and memory, storage in GB-months, data transfer by path (internet egress, cross-zone, cross-region, through NAT), log volume, and environments. Fill gaps with explicit assumptions and say which ones most affect the total.
2. For each component, write the line item as `quantity × unit price = monthly cost`. Use list on-demand prices for the stated region from your knowledge, mark each as "approximate list price, check the provider's pricing page", and give the pricing date basis if you know it. Include free tiers only if the account is new and say so.
3. Add the commonly forgotten lines: NAT gateway hours and processing, load balancer hours and capacity units, egress to users, cross-zone traffic between replicas, monitoring and log ingestion and retention, backups and snapshots, DNS and certificates, secrets and key management, support plan, and every non-production environment.
4. Produce three scenarios: launch (the given assumptions), 10 times the usage, and a spike month. Note which costs scale linearly, which step up (a larger database tier), and which stay flat.
5. Name the top three cost drivers, the unit cost (per active user, per thousand requests or per tenant), and the cost risks: unbounded per-request pricing, a runaway log level, egress from a popular download, a retry storm on a serverless function.
6. List ways to cut cost with the estimated saving, such as commitments for the steady baseline, scheduling non-production environments, private endpoints instead of NAT for provider services, storage tiers and lifecycle rules, and a cheaper service tier where the requirements allow.
</task>

<constraints>
- Show the arithmetic for every line so the estimate can be checked and updated.
- Prices are approximate; never present them as quotes. Quote amounts with the currency code (for example "USD 1,240").
- Do not invent usage numbers that change the result materially; mark assumptions and show sensitivity instead.
- Round totals sensibly and give a range for the launch scenario, not false precision.
{{> output/uncertainty}}
</constraints>

<output_format>
## Assumptions
A table: assumption, value, source (given or assumed), impact on total (high, medium, low).
## Cost breakdown
A table: component, quantity, unit price, monthly cost, notes. Then the launch total as a range.
## Scenarios
A table: line group, launch, 10x, spike month.
## Cost drivers and risks
Bullets, plus the unit cost.
## Ways to cut
A table: change, estimated monthly saving, trade-off.
## Verify before trusting
The three or four prices or assumptions to confirm in the provider's calculator first.
</output_format>
