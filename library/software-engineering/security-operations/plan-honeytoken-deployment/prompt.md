---
schema: 1
id: plan-honeytoken-deployment
kind: prompt
title: Plan a honeytoken deployment
description: Plans decoy credentials, files, accounts and canary tokens placed where only an intruder would touch them, with alert routing, false-trip risks, safety rules and a test and upkeep plan.
category: security-operations
version: 1.0.0
status: incubating
stage: [plan, build]
role: [security-engineer]
requires: [none]
inputs: [text]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [deception, honeytokens, canary-tokens, high-fidelity-alerts, intrusion-detection]
pairs_with:
  prompts: [map-detection-coverage, write-threat-hunt-plan, write-ir-playbook]
  personas: [detection-engineer]
args:
  - name: environment
    description: The estate - directory and identity platform, file shares, cloud accounts, code repositories, password vaults, key servers - and what monitoring exists to receive alerts.
    type: text
    required: true
  - name: threats
    description: The intrusions you most want early warning of, such as ransomware operators moving laterally, cloud key theft or source code theft. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Goals, Token plan, Alert handling, Things to avoid, Upkeep, Test plan]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A honeytoken is something no legitimate person or process has a reason to touch, so any touch is a high-confidence alert: a fake cloud access key in a config file, a decoy admin account in the directory that is attractive to credential attacks, a document that calls home when opened, a DNS name that only appears inside a backup, a fake database row. They work because intruders search for credentials and valuable files after getting in. They fail when backup, antivirus, indexing or vulnerability scanners trip them every night, when the alert goes to an inbox nobody reads, when the decoy obviously looks fake, when a decoy credential actually grants access to something, or when staff are surprised and lose trust because decoys were used to test them without notice.
</context>

<task>
Plan a honeytoken deployment for this environment.

<environment>
{{environment}}
</environment>
{{#threats}}

<threats>
{{threats}}
</threats>
{{/threats}}

1. Goals: the attacker behaviours to catch early and the stage of an intrusion each token covers (discovery, credential access, lateral movement, collection, exfiltration).
2. Token plan: 6 to 12 tokens, each with its type, exact placement category (for example "a deployment script in the infrastructure repository", "a service account in the directory with a plausible name"), what action triggers the alert and through which log or callback, and how it is made to look real without granting any access.
3. For each token, name the legitimate things likely to trip it (backup jobs, scanners, search indexing, auditors, IT clean-up) and how to exclude or avoid them without blinding the token.
4. Alert handling: where each alert goes, its severity, the first three triage steps, and a link to the matching incident playbook. Alerts must reach a monitored queue at any hour.
5. Things to avoid: decoys that grant real access, tokens in places users will open by accident, using decoys to test or catch individual staff without HR and legal involvement, and anything that collects personal data beyond what the alert needs.
6. Upkeep: an inventory of every token with owner and location, a review every quarter, refreshing tokens that look stale, and removing tokens from systems being retired.
7. Test plan: trigger each token once in a controlled way, confirm the alert arrives with the right context, and record the time to alert.
</task>

<constraints>
- Decoy credentials must never authorise anything; say how to confirm that.
- Do not invent product features; describe token mechanisms generically and mark where the user must confirm their platform supports them.
- Keep the plan defensive. Do not design traps that run code on an intruder's machine or "hack back".
- Where tokens touch staff spaces such as personal drives or mailboxes, say that HR, privacy or legal review comes first.
</constraints>

<output_format>
## Goals
Bullets mapped to intrusion stages.

## Token plan
Table: Token | Placement | Trigger and signal | Looks real by | Likely false trips and fix.

## Alert handling
Bullets with routing and first triage steps.

## Things to avoid
Bullets.

## Upkeep
Checklist.

## Test plan
Numbered steps.
</output_format>
