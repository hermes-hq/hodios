---
schema: 1
id: investigate-container-runtime-alert
kind: prompt
title: Investigate a container runtime alert
description: Investigates a container or Kubernetes runtime alert such as a shell in a pod, an unexpected binary or a privileged pod, with kubectl checks, evidence-safe containment and credential scope.
category: security-operations
version: 1.0.0
status: incubating
stage: [operate]
role: [security-engineer, devops-engineer, sre]
requires: [none]
inputs: [logs, text, config]
output: [report, checklist, code]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [falco, runtime-security, pod-security, service-account-tokens, cluster-forensics]
stack: [kubernetes, docker]
pairs_with:
  prompts: [investigate-cloud-audit-logs, triage-soc-alert, plan-evidence-acquisition, respond-to-leaked-secret]
  personas: [soc-analyst]
args:
  - name: alert
    description: The runtime alert as raised (Falco, a cloud container security product or EDR) with rule name, pod, namespace, container, image, process and command line.
    type: text
    required: true
  - name: cluster_context
    description: Cluster type (EKS, GKE, AKS, self-managed), how workloads get cloud credentials, whether Kubernetes audit logs are on, and who normally execs into pods.
    type: text
  - name: outputs
    description: Optional output of kubectl or audit log queries already run.
    type: text
output_contract:
  format: markdown
  sections: [Alert restated, Checks, Findings, Benign explanations, Contain without losing evidence, Credentials in reach, Next steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Container incidents differ from host incidents in two ways that catch responders out. Evidence is ephemeral: deleting the pod, or letting a controller restart it, wipes the writable layer and process state, and a Deployment will recreate a fresh copy immediately. And the blast radius is set by what the pod can reach, not by the container: its service account token and RBAC permissions, cloud credentials from workload identity (IRSA, GKE Workload Identity, Azure Workload Identity) or the node's instance metadata, mounted secrets, host path mounts, privileged mode and host namespaces. A shell in a container is sometimes an engineer running `kubectl exec` to debug, which the Kubernetes audit log (`pods/exec` subresource) will show along with the user. A process that does not exist in the image, an outbound connection to a mining pool or a newly written binary in `/tmp` is not debugging. Isolation should cut network access and stop the controller from replacing the pod, while keeping the original running or checkpointed for analysis.
</context>

<task>
Investigate this alert:

<alert>
{{alert}}
</alert>
{{#cluster_context}}

<cluster_context>
{{cluster_context}}
</cluster_context>
{{/cluster_context}}
{{#outputs}}

<outputs>
{{outputs}}
</outputs>
{{/outputs}}

1. Restate the alert: workload, namespace, node, image (tag and digest), process, and what the rule means.
2. Checks: give read-only commands - `kubectl get pod <pod> -n <ns> -o yaml` (securityContext, serviceAccountName, volumes, hostPath, hostNetwork, node), `kubectl describe pod`, `kubectl get events`, `kubectl logs` including `--previous`, `kubectl auth can-i --list --as=system:serviceaccount:<ns>:<sa>`, the audit log query for `pods/exec` and `pods/attach` on that pod, and a comparison of running processes and changed files against the image (`crictl` or the container runtime's diff on the node, if access allows). Also check whether the image digest matches what CI built.
3. Findings: read pasted output and build the picture: how the process started (exec by a user, application exploit, compromised image), what it did, and what permissions it had.
4. Benign explanations: debug sessions, init or sidecar behaviour, health checks that shell out, legitimate agents. Say what confirms each.
5. Contain without losing evidence: label the pod and apply a deny-all NetworkPolicy selecting that label (if the CNI enforces policies), remove the pod from its Service by changing labels so the controller starts a clean replacement, cordon the node if node compromise is possible, and capture state (checkpoint if supported, filesystem export, logs) before deletion. Mark each step as needing approval.
6. Credentials in reach: list every credential the pod could use (service account token and its RBAC, cloud role, mounted secrets, node credentials if privileged or hostPath) and which to rotate or revoke, and the cloud audit checks for their use.
7. Next steps: find the entry point (vulnerable dependency, exposed admin endpoint, image supply chain), fix it in the image and manifests, and harden (non-root, read-only root filesystem, no privilege escalation, restricted Pod Security Standard, minimal RBAC, automountServiceAccountToken false where unused).
</task>

<constraints>
- Do not recommend `kubectl delete pod` or restarting the workload before evidence is captured, unless active harm outweighs it; say so explicitly if you do.
- Mark every state-changing command and require confirmation.
- Never invent RBAC rules, audit log fields or cloud role names; ask for the output.
{{> output/uncertainty}}
</constraints>

<output_format>
## Alert restated
Bullets.

## Checks
Fenced `bash` block of read-only commands with comments.

## Findings
Table: Item | Evidence | Meaning.

## Benign explanations
Bullets, each with what confirms it.

## Contain without losing evidence
Ordered steps with "(approval)" marks and manifests where useful.

## Credentials in reach
Table: Credential | Scope | Action.

## Next steps
Numbered list.
</output_format>
