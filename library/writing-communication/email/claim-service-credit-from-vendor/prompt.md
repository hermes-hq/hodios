---
schema: 1
id: claim-service-credit-from-vendor
kind: prompt
title: Claim service credits after a vendor outage
description: Claims SLA service credits or compensation from a software or service vendor after an outage, checking the contract's claim rules, calculating the credit and citing the evidence.
category: email
version: 1.0.0
status: incubating
stage: [operate]
role: [operations-manager, devops-engineer, founder, project-manager]
requires: [none]
inputs: [document, logs, notes]
output: [message, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
advice_risk: [legal]
tags: [sla-credit, outage-compensation, vendor-management, uptime, contract-claim]
pairs_with:
  prompts: [review-saas-agreement, escalate-customer-issue-to-supplier, write-escalation-email]
args:
  - name: sla_terms
    description: The SLA or contract wording pasted in - uptime commitment, how downtime is measured, exclusions, credit table, how and when to claim, caps, and whether credits are the sole remedy.
    type: text
    required: true
  - name: incident
    description: What happened - dates and times with time zone, duration, what was affected, the vendor's status page or incident report, your own monitoring data, ticket numbers and business impact.
    type: text
    required: true
  - name: account
    description: Vendor, account or contract ID, monthly fee for the affected service, and your contact or account manager.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Eligibility check, Credit calculation, Claim email, If they refuse, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most cloud and SaaS service credits are never paid because customers never claim them: SLAs usually require the customer to submit a claim, often within 30 days or by the end of the following billing month, with specific evidence, through a specific channel. People who manage vendors know the details that decide a claim: how the SLA defines downtime (the whole service or a single component, error-rate thresholds, minimum durations), exclusions (scheduled maintenance, customer-caused issues, beta features, force majeure), whether uptime is measured per month or per region, the credit table and its cap, and whether credits are the "sole and exclusive remedy". A good claim cites the clause, gives exact UTC times and evidence, shows the calculation, and asks for confirmation by a date, in a neutral tone that keeps the relationship intact.
</context>

<task>
Prepare a service-credit claim for {{account}}.

<sla_terms>
{{sla_terms}}
</sla_terms>

<incident>
{{incident}}
</incident>

1. Eligibility check: from the SLA wording only, state the uptime commitment, how downtime is defined, exclusions that might apply to this incident, the claim deadline and channel, and the evidence required. Quote clause numbers. Mark anything not stated as "not stated". If the incident appears excluded or below the threshold, say so plainly.
2. Credit calculation: convert the incident times to one time zone, compute downtime minutes in the measurement period, monthly uptime percentage (show the formula and the minutes in the month), the matching credit tier, and the credit amount against the monthly fee, applying any cap. Show the working; mark assumptions.
3. Claim email: subject "SLA credit claim: [service], [incident date], [account ID]"; the claim and amount in the first sentence; the clause relied on; incident timeline with UTC times and the vendor's own incident reference; evidence attached (monitoring exports, ticket numbers, status page screenshots); the calculation summary; a request to confirm the credit and when it will apply, by a date inside the claim window; a brief, neutral note of business impact.
4. If they refuse: a short reply asking them to identify the clause or measurement they rely on and to share their uptime data for the period, plus the escalation route (account manager, then the contract's dispute process).
5. Under Notes: whether the sole-remedy clause limits other compensation, and when to involve legal or procurement.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only the SLA wording and incident data provided. Never invent clauses, credit tiers, deadlines, uptime figures or vendor statements.
- If the vendor's reported times differ from the user's monitoring, show both and claim on the defensible figure, explaining the difference.
- Neutral, factual tone; no threats to leave unless the user wants that said.
- Keep IDs and amounts as [placeholders] when not given.
{{> output/uncertainty}}
</constraints>

<output_format>
## Eligibility check
Table: term | what the SLA says (clause) | applies to this incident?
## Credit calculation
Working and result.
## Claim email
Ready to send.
## If they refuse
The reply.
## Notes
Remedy limits and when to escalate.
</output_format>
