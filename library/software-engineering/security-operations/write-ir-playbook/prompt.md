---
schema: 1
id: write-ir-playbook
kind: prompt
title: Write an incident response playbook
description: Writes an incident response playbook for one scenario, such as business email compromise or a lost laptop, with triggers, roles, containment, evidence, communication, recovery and review steps.
category: security-operations
version: 1.0.0
status: incubating
stage: [plan]
role: [security-engineer, sre]
requires: [none]
inputs: [text, notes]
output: [docs, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [incident-response, playbook, containment, raci, business-email-compromise]
pairs_with:
  prompts: [plan-security-incident-response, plan-security-tabletop, triage-soc-alert]
  personas: [soc-analyst]
  workflows: [ransomware-response-track]
args:
  - name: scenario
    description: The single incident type the playbook covers, such as business email compromise, lost or stolen laptop, compromised cloud access key, insider data theft or a malicious browser extension.
    type: string
    required: true
  - name: environment
    description: The relevant setup - identity provider, email platform, endpoint tooling, cloud providers, logging, backup, ticketing - and the size of the security team.
    type: text
    required: true
  - name: contacts
    description: The roles available - incident lead, IT, legal, privacy officer, communications, HR, executives, external IR retainer, cyber insurer - without personal phone numbers.
    type: text
output_contract:
  format: markdown
  sections: [Purpose and scope, Triggers, Severity, Roles, Response steps, Evidence, Communication, Recovery criteria, After the incident, Maintenance]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A playbook is written in calm weeks for use in a bad hour. It fails if it is a generic copy of the incident response lifecycle with the scenario name pasted in, if it names tools the team does not have, if steps say "investigate" without saying what to look at, or if nobody knows who decides. A useful playbook is specific to one scenario and one environment: what triggers it, who does what, the exact checks and containment actions in order, the decision points, which evidence to save before it disappears, and when the incident is over. It follows the familiar phases (preparation, detection and analysis, containment, eradication, recovery, post-incident) without padding them.
</context>

<task>
Write a playbook for: {{scenario}}

<environment>
{{environment}}
</environment>
{{#contacts}}

<contacts>
{{contacts}}
</contacts>
{{/contacts}}

1. If the environment description does not mention the systems the scenario depends on (for business email compromise: the email platform and identity provider; for a lost laptop: device management and disk encryption), ask for them and stop.
2. Purpose and scope: what counts as this incident, and what is handed off to another playbook.
3. Triggers: the alerts, reports and observations that start it, each with where it comes from.
4. Severity: a short matrix specific to the scenario (for example for a lost laptop: encrypted and remotely wiped versus unencrypted with customer data).
5. Roles: a RACI table using the roles available; mark gaps where a role is missing and suggest who covers it.
6. Response steps, grouped by phase. Each step has: action, owner, where it is done (the system named in the environment), and "done when". Include decision points as explicit questions with the branch each answer leads to. Order containment so that evidence is preserved and the attacker loses all access at once rather than piecemeal.
7. Evidence: what to preserve, how, and before which step, including logs with short retention.
8. Communication: internal, affected users, customers, and legal, privacy, insurer and regulators phrased as questions for counsel, with triggers and an owner for each.
9. Recovery criteria: the conditions that must hold to close the incident.
10. After the incident: review within a set number of days, metrics to record (time to detect, contain, recover), and how lessons update this playbook.
11. Maintenance: owner, review cadence, and the tabletop or test that exercises it.
12. Before answering, check every step names a system from the environment (or is marked `[TOOL NEEDED]`) and every decision point has both branches.
</task>

<constraints>
- Use only tools and systems named in the environment; mark missing capabilities instead of assuming them.
- Do not state legal or regulatory obligations as settled; name them as questions for counsel or the privacy officer, noting that some notification deadlines are short.
- No personal contact details in the playbook; refer to roles and a contact list kept elsewhere.
- Plain imperative language that works under stress; no step longer than two sentences.
{{> output/uncertainty}}
</constraints>

<output_format>
Markdown document with the sections in the output contract. Response steps as numbered tables per phase: # | Action | Owner | Where | Done when. Decision points as bold questions with "If yes / If no" lines. End with a one-page "First 30 minutes" checklist.
</output_format>
