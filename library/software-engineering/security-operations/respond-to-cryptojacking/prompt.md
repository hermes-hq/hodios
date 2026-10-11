---
schema: 1
id: respond-to-cryptojacking
kind: prompt
title: Respond to cryptojacking in the cloud
description: Responds to cryptomining found in a cloud account or cluster - preserve then stop the spend, sweep every region, find the entry point, remove persistence, rotate credentials and seek billing relief.
category: security-operations
version: 1.0.0
status: incubating
stage: [operate]
role: [security-engineer, devops-engineer]
requires: [none]
inputs: [text, logs]
output: [plan, checklist, report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [cryptomining, cloud-incident, iam-keys, billing-anomaly, persistence-removal]
stack: [aws, gcp, azure, kubernetes]
pairs_with:
  prompts: [investigate-cloud-audit-logs, respond-to-leaked-secret, investigate-container-runtime-alert, contain-compromised-endpoint]
args:
  - name: discovery
    description: How it was found - billing alert, provider abuse notice, high CPU or GPU, unknown instances, pods or functions, mining pool connections - and when.
    type: text
    required: true
  - name: environment
    description: Cloud provider and account or project structure, regions in use, Kubernetes clusters, how humans and CI authenticate, and whether audit logging is on everywhere.
    type: text
    required: true
  - name: findings
    description: Optional audit log entries, resource lists or alerts already gathered.
    type: text
output_contract:
  format: markdown
  sections: [Situation, Preserve then stop, Sweep, Entry point, Persistence to remove, Rotate, Billing and provider, Prevent]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Cryptojacking looks like a cost problem but is an access problem: someone could create compute in your account, so they could probably do other things too. Common entry points are long-lived access keys committed to a repository or left in a public image, an exposed Docker API on port 2375, an unauthenticated Kubernetes dashboard or kubelet, Jupyter or CI consoles without authentication, a vulnerable internet-facing app, and weak SSH. Attackers launch large or GPU instances in regions the victim never uses, raise service quotas, and leave persistence: new IAM users and access keys, roles with trust to outside accounts, functions, launch templates, scheduled jobs, SSH keys in instance metadata, and DaemonSets in clusters. Responders who just terminate the instances lose the evidence of how they were launched and miss the persistence, and the miners return the same night. Providers often consider billing adjustments for confirmed abuse when the account owner acts quickly and fixes the cause, but that is their decision.
</context>

<task>
Plan the response:

<discovery>
{{discovery}}
</discovery>

<environment>
{{environment}}
</environment>
{{#findings}}

<findings>
{{findings}}
</findings>
{{/findings}}

1. Situation: what is known, what identity most likely created the resources (from findings), and the worst plausible extras (data access, other accounts in the organisation).
2. Preserve then stop: record and tag the malicious resources, snapshot one or two instance volumes or capture a pod for analysis, export the relevant audit logs, then stop or scale down the rest to halt spend. Mark each change for approval.
3. Sweep: check every region and every account or project for compute, functions, containers, spot requests, launch templates and quota increase requests created in the window, with the provider's console or CLI listing approach.
4. Entry point: search the audit logs for the first malicious API call and the identity, source IP and user agent behind it (for example `RunInstances`, `CreateAccessKey`, `CreateUser`, `AttachUserPolicy` on AWS or their equivalents on the other providers), and trace that identity back to where its credential lived. For cluster mining, check for exposed APIs, dashboards and vulnerable workloads.
5. Persistence to remove: new or modified users, keys, roles and trust policies, functions, scheduled rules, launch templates, SSH keys and startup scripts, and in clusters DaemonSets, CronJobs, service accounts and RBAC bindings. Remove after evidence is kept, with approval.
6. Rotate: the compromised credential and any credential the attacker could have read or created; review whether data stores were accessed.
7. Billing and provider: open a support case with the timeline and actions taken, and ask about billing adjustment without promising one.
8. Prevent: no long-lived keys where roles or federation work, secret scanning on repositories, budget and anomaly alerts per account, region restrictions through organisation policies, quotas, and closing the exposed service.
</task>

<constraints>
- Do not recommend deleting resources or users before the creating identity and evidence are recorded.
- Mark every state-changing command and require confirmation.
- Never invent audit log entries, account ids or provider policies. Quote what the user gave and ask for the rest.
- Do not promise refunds or billing credits.
{{> output/uncertainty}}
</constraints>

<output_format>
Use the eight sections as headings, with numbered steps. Put CLI examples in fenced `bash` blocks labelled with the provider, read-only unless marked "(approval)". End with a short incident summary someone could paste into a ticket.
</output_format>
