---
schema: 1
id: run-stateful-workload-on-kubernetes
kind: prompt
title: Run a stateful workload on Kubernetes
description: Decides whether a database or other stateful service belongs on Kubernetes or a managed service and, if on Kubernetes, sets it up with an operator, storage, backups and disruption rules.
category: devops
version: 1.0.0
status: incubating
stage: [design, build]
role: [devops-engineer, sre, dba]
stack: [kubernetes]
requires: [none]
inputs: [spec]
output: [plan, config, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [statefulset, database-operator, persistent-volumes, backups, storage-class]
pairs_with:
  prompts: [plan-disaster-recovery, write-kubernetes-manifests, upgrade-kubernetes-cluster]
args:
  - name: workload
    description: The stateful service (Postgres, MySQL, Redis, Kafka, Elasticsearch, RabbitMQ or other), data size and growth, availability and recovery targets, and who will operate it.
    type: text
    required: true
  - name: cluster
    description: Where the cluster runs (managed cloud, on-premises), Kubernetes version, storage options available, and whether the managed equivalent of the service is an option.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Decision, Design, Manifests, Backups and restore, Operations, Risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Running state on Kubernetes is now routine with good operators, but it moves the hard parts (failover, backups, upgrades, storage performance) onto the team. When a managed service exists and fits, it usually wins for small teams; Kubernetes makes sense on-premises, for cost at scale, for portability, or for ephemeral and preview environments. If on Kubernetes, prefer a mature operator (for Postgres for example CloudNativePG, Crunchy PGO or Zalando's operator; for Kafka Strimzi) over a hand-written StatefulSet, because the operator handles replication, failover, rolling upgrades and backups to object storage. Storage decides much: a zonal block volume ties a pod to one zone, so high availability needs replicas across zones rather than a single volume; the storage class needs `volumeBindingMode: WaitForFirstConsumer`, a reclaim policy of `Retain` for data you cannot lose, and volume expansion enabled. Volume snapshots are not backups unless they leave the cluster and the account. PodDisruptionBudgets, anti-affinity and graceful shutdown keep node drains and cluster upgrades from taking down the primary. A backup that has never been restored is a hope.
</context>

<task>
Plan this stateful workload:
{{workload}}
Cluster: {{cluster}}

1. Decision: managed service or Kubernetes, with the reasons for this case (team skills, recovery targets, cost, location, compliance). If a managed service is clearly better, say so and stop after a short migration note, unless the user has ruled it out.
2. Design: operator (named, with why) or StatefulSet if no suitable operator exists, number of instances and their spread across zones, replication mode and what it means for data loss on failover, connection routing for clients (read-write and read-only Services, pooler).
3. Storage: storage class with binding mode, reclaim policy, expansion, performance tier sized for the stated IO, and volume size with growth headroom.
4. Manifests: the operator custom resource or StatefulSet plus headless Service, resource requests sized for the stated load, anti-affinity or topology spread, a PodDisruptionBudget that allows one disruption only when a replica can take over, security context, and secret references for credentials.
5. Backups and restore: continuous or scheduled backups to object storage in another account or region, retention, point-in-time recovery if supported, and a restore test procedure with a schedule.
6. Operations: version upgrades of the engine and operator, cluster upgrades and node drains, monitoring (replication lag, disk usage, connection count, backup age), and alerting thresholds.
7. Risks the team accepts by running it themselves.
</task>

<constraints>
- Do not recommend a StatefulSet with a single replica and no backup for data the user cannot lose.
- Only name operators and fields you are confident exist; mark any version-specific field you are unsure of.
- No passwords in manifests; reference Secrets.
- Do not invent performance numbers; size from the user's figures or say what to measure.
{{> output/uncertainty}}
</constraints>

<output_format>
## Decision
Short paragraph with the recommendation and reasons.
## Design
Bullets, plus a text diagram of instances, zones and Services.
## Manifests
Fenced `yaml` blocks with file paths.
## Backups and restore
Numbered steps, including the restore test.
## Operations
Bullets per activity.
## Risks
Bullets.
</output_format>
