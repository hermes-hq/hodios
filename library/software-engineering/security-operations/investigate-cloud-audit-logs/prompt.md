---
schema: 1
id: investigate-cloud-audit-logs
kind: prompt
title: Investigate cloud audit logs
description: Investigates AWS, GCP or Azure audit logs for suspicious activity such as new access keys, privilege changes, unusual regions, logging tampering or data exports, and recommends containment steps.
category: security-operations
version: 1.0.0
status: incubating
stage: [operate, review]
role: [security-engineer, devops-engineer]
stack: [aws, gcp, azure]
requires: [none]
inputs: [logs, text]
output: [report, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [cloudtrail, cloud-audit-logs, iam, privilege-escalation, cloud-incident-response]
pairs_with:
  prompts: [review-cloud-iam-policy, respond-to-leaked-secret, build-forensic-timeline, write-siem-query]
  personas: [soc-analyst]
args:
  - name: logs
    description: Audit log events for the period in question as JSON or a table - for AWS CloudTrail records, for GCP Cloud Audit Logs entries, for Azure the Activity log and Entra ID audit and sign-in logs.
    type: text
    required: true
  - name: provider
    description: The cloud provider the logs come from.
    type: enum
    enum: [aws, gcp, azure]
    default: aws
  - name: known_baselines
    description: What is normal - the regions you use, CI/CD and automation principals, admin users, office and VPN IP ranges, change windows, and any open tickets for the period.
    type: text
output_contract:
  format: markdown
  sections: [Bottom line, Suspicious activity, Activity chain, Explained as normal, Containment, Further queries, Log gaps]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Cloud intrusions leave a trail in the control-plane audit log, usually in a recognisable order: a stolen credential is used from an unfamiliar network, the attacker checks who they are and what they can do, creates their own way back in (a new access key, user, service account key, role trust or app credential), raises privileges, tampers with logging or detection, and then reaches for data or compute. The difficulty is that every one of these actions is also something automation and admins do daily. Separating them needs the baseline of normal principals, networks and regions, and attention to the order and timing of events.
</context>

<task>
Investigate these {{provider}} audit logs:

<logs>
{{logs}}
</logs>
{{#known_baselines}}

<known_baselines>
{{known_baselines}}
</known_baselines>
{{/known_baselines}}

1. If the logs are not audit events (for example application logs or a billing export), say what is needed and how to export it, and stop.
2. Profile the principals: for each identity in the logs, its type (human user, role or assumed-role session, service account, app or service principal), source IPs and user agents, regions, and whether it matches the baseline.
3. Look for high-signal actions, using the provider's event names. For aws, examples include `ConsoleLogin` without MFA, `GetCallerIdentity` from a new network, `CreateAccessKey`, `CreateUser`, `CreateLoginProfile`, `AttachUserPolicy`, `PutUserPolicy`, `UpdateAssumeRolePolicy`, `StopLogging`, `DeleteTrail`, `PutBucketPolicy` or `PutBucketAcl` making data public, `ModifySnapshotAttribute` sharing snapshots, and `RunInstances` in unused regions. For gcp: `SetIamPolicy`, `google.iam.admin.v1.CreateServiceAccountKey`, bucket IAM changes granting `allUsers`, `google.logging.v2.ConfigServiceV2.DeleteSink`, and instance creation in unused zones. For azure: `Microsoft.Authorization/roleAssignments/write`, `Microsoft.Storage/storageAccounts/listKeys/action`, `Microsoft.Insights/diagnosticSettings/delete`, and Entra ID audit events such as "Add service principal credentials" or "Consent to application". Treat this list as a starting point, not a checklist.
4. Note failed calls too: bursts of access-denied errors are a sign of an attacker probing permissions.
5. Build the activity chain: order the suspicious events, link them by principal, session and source IP, and label each stage (initial access, discovery, persistence, privilege escalation, defence evasion, collection, exfiltration, impact).
6. Separate what the baseline explains, with the reason.
7. Containment, ordered and proportional, preserving evidence first: export and protect the logs; disable (not delete) the compromised credentials and revoke active sessions; remove attacker-created keys, users, role trusts or app credentials after recording them; restore logging; restrict any data exposure; check for resources created for persistence or crypto-mining. Note which steps could disrupt production and who should approve them.
8. Before answering, check every suspicious item quotes the event name, time and principal from the logs, and none is invented.
</task>

<constraints>
- Work only from the events provided; never assert activity that is not in them. Mark inferences.
- Do not recommend deleting attacker artefacts before they are recorded, or deleting logs ever.
- If unsure of an exact event or field name for the provider, describe the action instead of guessing the name.
- Defang IPs and domains in the narrative (`203.0.113[.]9`); keep exact values in quoted log excerpts.
{{> output/uncertainty}}
</constraints>

<output_format>
## Bottom line
Two or three sentences: compromised, suspicious, or explained, with the strongest evidence.

## Suspicious activity
Table: Time (UTC) | Principal | Source IP / user agent | Event | Resource | Why suspicious | Severity.

## Activity chain
Numbered stages with event references.

## Explained as normal
Bullets with the baseline item that explains each.

## Containment
Numbered steps with owner role and production impact.

## Further queries
What to search next, such as other events from the same IP or access key across all regions and accounts.

## Log gaps
Missing sources (for example data-access events not enabled) and how they limit conclusions.
</output_format>
