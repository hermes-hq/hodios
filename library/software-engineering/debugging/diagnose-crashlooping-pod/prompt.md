---
schema: 1
id: diagnose-crashlooping-pod
kind: prompt
title: Diagnose a crash-looping pod
description: Diagnoses a Kubernetes pod stuck in CrashLoopBackOff, ImagePullBackOff, OOMKilled or Pending from describe output, events and logs, in a fixed order of checks, with the fix for each cause.
category: debugging
version: 1.0.0
status: incubating
stage: [build, operate]
role: [backend-engineer, devops-engineer, software-engineer, sre]
stack: [kubernetes]
requires: [none]
inputs: [logs, config, text]
output: [report, explanation, config]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [crashloopbackoff, oomkilled, imagepullbackoff, pending-pods, probes, pod-events]
pairs_with:
  prompts: [write-kubernetes-manifests, write-helm-chart, fix-docker-build-failure, explain-stack-trace]
  personas: [debugger, devops-engineer]
args:
  - name: pod_output
    description: Output of `kubectl describe pod <name>` (especially State, Last State, Exit Code, Reason and Events), plus `kubectl logs <pod> --previous` and the relevant part of the Deployment manifest if you have them.
    type: text
    required: true
  - name: recent_change
    description: What changed just before it broke, for example a new image tag, config or secret change, a resource limit edit, or a cluster upgrade.
    type: string
output_contract:
  format: markdown
  sections: [Diagnosis, Evidence, Fix, Verify, If that is not it]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a developer find why their pod will not run. The status word (CrashLoopBackOff, Error, OOMKilled, ImagePullBackOff, CreateContainerConfigError, Pending) is a symptom; the cause is in the exit code, the last state's reason, the events and the previous container's logs. People lose time reading the current container's logs (empty, because it just restarted), blaming the app when a liveness probe is killing it, and raising memory limits when the app has a leak or its runtime ignores container limits.
{{#recent_change}}
Recent change: {{recent_change}}
{{/recent_change}}
</context>

<task>
<pod_output>
{{pod_output}}
</pod_output>

Check in this order and stop at the first that explains the evidence:
1. Pending: read the scheduling events. Insufficient CPU or memory (requests too high or the cluster full), node selectors, taints and tolerations, affinity, or an unbound PersistentVolumeClaim (storage class, zone).
2. Image: ErrImagePull or ImagePullBackOff. Wrong tag or digest, private registry without `imagePullSecrets`, registry rate limits, or an architecture mismatch (arm64 image on amd64 nodes, "exec format error").
3. Config: CreateContainerConfigError or a crash at start citing configuration. A missing ConfigMap, Secret or key, a wrong environment variable name, or a mount over the app's own files.
4. Exit code and reason of the last state:
   - 137 with reason OOMKilled: the container hit its memory limit. Compare the limit with the app's real use; check runtime settings (JVM `-XX:MaxRAMPercentage`, Node `--max-old-space-size`, worker counts) before raising the limit.
   - 137 or 143 without OOMKilled, with probe failures in events: the kubelet killed it because a liveness probe failed. Slow start needs a `startupProbe` or a longer initial delay; a liveness probe that checks dependencies restarts healthy pods.
   - 1 or another app code: the app exited on an error. Read `logs --previous` for the first error, not the last line.
   - 0 with restarts: the main process finished. A container must run a long-lived foreground process; check the command, args and entrypoint.
   - 126 or 127: command not executable or not found (wrong path, missing shell in a distroless image, line endings, file permissions).
5. Permissions and security context: `runAsNonRoot` with an image that runs as root, a read-only root filesystem with an app that writes to it, missing write access to a mounted volume.
6. Dependencies at start: the app exits when the database or another service is unreachable; check DNS names, network policies and whether the app should retry instead of exit.

Then give the fix as the smallest change (a manifest snippet, a command, or an app change), how to verify it, and the next check if the evidence does not match.
</task>

<constraints>
- Base the diagnosis on the output given and quote the line that proves it. If the key evidence is missing (exit code, events or previous logs), say exactly which command to run and give the most likely causes for what is visible.
- Do not recommend deleting and recreating resources, `--force` deletes, or raising limits blindly as the fix.
- Treat secrets in the output as sensitive: do not repeat their values.
- Commands are read-only (`describe`, `logs --previous`, `get events --sort-by=.lastTimestamp`, `top`) unless the fix needs a change, which you show as a diff or snippet.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Diagnosis
One or two sentences: the cause.
## Evidence
Quoted lines from the output and what each shows.
## Fix
The change as a YAML snippet, command or code note, with why.
## Verify
Commands and what healthy output looks like.
## If that is not it
The next most likely cause and the check that tells them apart.
</output_format>
