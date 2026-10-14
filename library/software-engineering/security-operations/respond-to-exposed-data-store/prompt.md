---
schema: 1
id: respond-to-exposed-data-store
kind: prompt
title: Respond to an exposed database or bucket
description: Responds to a publicly exposed database or storage bucket - close access, preserve evidence, work out how long and who read it, scope the data and prepare the notification decision.
category: security-operations
version: 1.0.0
status: incubating
stage: [operate]
role: [security-engineer, devops-engineer, engineering-manager]
requires: [none]
inputs: [text, logs, config]
output: [plan, checklist, report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [data-exposure, public-bucket, open-database, access-logs, breach-assessment]
pairs_with:
  prompts: [plan-data-breach-response, investigate-cloud-audit-logs, respond-to-leaked-secret, write-bug-bounty-report]
args:
  - name: exposure
    description: What was exposed and how you found out - the store type (S3, Azure Blob, GCS, Elasticsearch, MongoDB, Redis, Firebase), how it was open, who reported it, and when.
    type: text
    required: true
  - name: logs_available
    description: Which logs exist for the store - server access logs, data-access audit logs, database logs, network flow logs - and their retention.
    type: text
  - name: data_description
    description: What the store holds, as far as you know - record types, whether personal, payment, health or credential data, rough volume and whose data it is.
    type: text
output_contract:
  format: markdown
  sections: [Close it, Preserve, How long was it open, Who accessed it, What data, Notification decision, Root cause and prevention]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Exposed data stores are found constantly by automated scanners, so an open Elasticsearch, MongoDB or Redis instance, or a public bucket, should be assumed to have been seen. The questions that decide the outcome are how long it was open, whether anyone actually read or copied data, and what the data was. Those answers depend on logs that are often off by default: object-level read logging for buckets (S3 server access logs or CloudTrail data events, equivalent settings on other providers) and query logging for databases. Configuration change logs usually do exist and show when the exposure started. Unauthenticated databases are also wiped or ransomed by bots that leave a note collection or index; finding one proves access. Teams under pressure close the hole and delete the data, which destroys evidence and can turn an exposure into data loss. Personal data exposure may trigger legal notification duties with deadlines counted from awareness, which vary by jurisdiction and sector, so legal or privacy counsel should be involved early.
</context>

<task>
Plan the response:

<exposure>
{{exposure}}
</exposure>
{{#logs_available}}

<logs_available>
{{logs_available}}
</logs_available>
{{/logs_available}}
{{#data_description}}

<data_description>
{{data_description}}
</data_description>
{{/data_description}}

1. Close it: the quickest change that removes public access without deleting data (block public access settings, remove the public policy or ACL, bind the database to private addresses or add authentication, firewall rules), how to confirm from outside that it is closed, and who must approve. Record the time.
2. Preserve: export the current configuration, the change history, all available logs before they rotate, and a list of objects or indexes with sizes and timestamps. Note any ransom or wipe notes found.
3. How long was it open: use configuration change logs, infrastructure-as-code history and deployment records to find when the exposure began, and say how confident that is.
4. Who accessed it: analyse available access logs for reads from addresses outside your own, bulk listing or download patterns, and known scanners; if logs do not exist for the period, say plainly that access cannot be ruled out and what that means.
5. What data: classify what was in the store, count records and people affected, and identify especially sensitive fields (credentials, government ids, health, financial, children's data). Credentials or keys found must be rotated now.
6. Notification decision: summarise the facts counsel needs (data types, people, jurisdictions of those people, exposure window, evidence of access) and list the likely questions (regulator, individuals, customers under contract, the reporter). Mark any deadline you mention as a common example to verify, not a rule for this case.
7. Root cause and prevention: how the store became public (default setting, a temporary change never reverted, a misapplied template), and controls such as organisation-wide public access blocks, policy-as-code checks in CI, and scheduled external exposure scans. If an outside researcher reported it, reply and thank them.
</task>

<constraints>
- Never recommend deleting the exposed data or logs as part of containment.
- Do not decide whether notification is legally required; that is for legal or privacy counsel in the relevant jurisdictions.
- Do not state an absence of access when logs to prove it do not exist.
- Mark configuration changes as needing approval; never invent provider settings names.
{{> output/uncertainty}}
</constraints>

<output_format>
Use the seven sections as headings with numbered steps. Under "Who accessed it", give a table: Source | Activity | Evidence | Assessment. Under "Notification decision", give a fact sheet in a fenced block for counsel. End with a timeline table: Time | Event | Source.
</output_format>
