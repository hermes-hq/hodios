---
schema: 1
id: escalate-incident-to-vendor
kind: prompt
title: Escalate an incident to a vendor's support
description: Writes the support case to a cloud or SaaS vendor during an incident, with the right severity, exact identifiers, evidence, what you ruled out and a clear ask, plus follow-up steps.
category: incident
version: 1.0.0
status: incubating
stage: [operate]
role: [sre, devops-engineer, backend-engineer]
stack: []
requires: [none]
inputs: [logs, notes, text]
output: [message, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [vendor-support, third-party-outage, support-case, escalation, dependencies]
pairs_with:
  prompts: [collect-incident-evidence, triage-production-alert, write-incident-update, build-incident-timeline]
  personas: [incident-commander]
args:
  - name: vendor_and_service
    description: The vendor and the specific product, for example "our cloud provider's managed Postgres" or "the payments API we use". Include your support plan tier if you know it.
    type: string
    required: true
  - name: what_you_see
    description: Symptoms, start time with time zone, error messages, request or trace ids, affected resource ids and regions, and what you already checked on your side.
    type: text
    required: true
  - name: business_impact
    description: What the failure means for your users, for example "40% of card payments failing in the EU".
    type: string
---
<context>
You help an on-call engineer get a useful response from a vendor's support team while an incident is running. Support engineers triage by severity and by how fast they can reproduce or locate the problem. Cases stall when they lack resource identifiers, regions, exact timestamps in UTC, request ids or error bodies, or when they read like "your service is down" without showing what was ruled out on the customer side. Severity must match the vendor's own definitions (usually production down versus degraded); overstating it erodes trust, understating it adds hours. Vendor status pages often lag real incidents, so a quiet status page is not proof the problem is yours.

Vendor and service: {{vendor_and_service}}
{{#business_impact}}Business impact: {{business_impact}}{{/business_impact}}

<what_you_see>
{{what_you_see}}
</what_you_see>
</context>

<task>
1. Decide whether the evidence points at the vendor, at your side, or is unclear. If it is unclear, list the two or three quickest checks that would separate them (same call from another region or account, vendor health API, a minimal request outside your code), and still draft the case if impact is high.
2. Recommend a severity using the usual production-down versus degraded split, and tell the user to match it to the wording in their vendor's support plan, which you do not know.
3. Write the case: a subject line with service, region and symptom; a first paragraph with impact and start time in UTC; identifiers (account or project, resource ids, regions, request or trace ids); exact error messages; a short timeline; what was ruled out on the customer side; and one specific ask (confirm an issue, fail over, raise a quota, restore a resource, give an estimate).
4. List what to attach or have ready, and what must be removed first: secrets, tokens, customer personal data.
5. Give the follow-up plan: when to update or chase, how to ask for escalation through the support plan or account team, and what to record for the postmortem (case number, response times).
6. Suggest mitigations that do not depend on the vendor: retries with backoff, failover to another region or provider, degrading the feature, queueing work.
</task>

<constraints>
- Do not invent identifiers, case numbers, support phone numbers, SLAs or the vendor's severity names. Use placeholders like [resource id] and list them.
- Do not write blame or threats into the case; keep it factual so it can be escalated as is.
- Never include credentials, full access tokens or customer personal data in the draft.
- If the inputs show the fault is clearly on the user's side, say so and do not draft a vendor case as if it were theirs.
{{> output/uncertainty}}
</constraints>

<output_format>
## Whose problem is it
Two or three sentences, plus quick checks if unclear.
## Severity
Recommended level and why.
## Support case
Subject line, then the case body ready to paste.
## Attach and redact
Bullets.
## Follow-up and escalation
Numbered steps with times.
## Mitigations you control
Bullets.
## Placeholders to fill
Bullets.
</output_format>
