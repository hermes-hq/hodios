---
schema: 1
id: write-incident-response-plan
kind: prompt
title: Write an incident response plan
description: Writes an engineering incident response plan - severity levels with criteria, response targets, roles, escalation paths and copy-paste communication templates - as a quick reference for on-call.
category: incident
version: 1.0.0
status: incubating
aliases: [incident-response]
stage: [plan, operate]
role: [sre, engineering-manager, tech-lead, devops-engineer]
stack: []
requires: [none]
inputs: [text, notes]
output: [docs, table, diagram]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [incident-management, severity-levels, escalation, status-page]
pairs_with:
  prompts: [design-on-call-rotation, write-runbook, write-incident-update, write-postmortem]
  personas: [incident-commander, site-reliability-engineer]
args:
  - name: organization
    description: The team or company - size, services and their customers, time zones, on-call setup, tools for paging, chat and status pages, and any contractual uptime commitments.
    type: text
    required: true
  - name: current_process
    description: How incidents are handled today and what went wrong recently, if anything.
    type: text
output_contract:
  format: markdown
  sections: [Severity levels, Roles, Escalation, Response flow, Communication templates, Review and upkeep]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
This plan covers production incidents in software services: outages, degradations and data problems. It is not a security breach playbook (use a dedicated incident response playbook for attacks) and not a customer support escalation process. People read it under stress at 3 a.m., so it must be short, unambiguous and usable without interpretation: anyone should be able to declare an incident, pick a severity in under a minute and know who does what.
{{#current_process}}
Current process: {{current_process}}
{{/current_process}}
</context>

<task>
Organisation:
<organization>
{{organization}}
</organization>

1. Define four severity levels (SEV1 to SEV4, or P0 to P3 if the team already uses that) with criteria based on customer impact, scope and data risk, one concrete example each for this organisation, and response targets: time to acknowledge, time to assemble responders, update cadence.
2. Define roles: incident commander, technical lead, communications lead and scribe; what each does and does not do, and how roles combine on a small team.
3. Define escalation: who is paged for each severity, when and how to escalate to more people, management, other teams or vendors, and what to do when the on-call does not respond.
4. Write the response flow from detection to resolution: declare, assess severity, open the channel, mitigate first, communicate, resolve, hand off. Draw it as a Mermaid flowchart.
5. Write communication templates ready to copy: incident declared (internal), status update (internal), customer status page update for investigating, identified, monitoring and resolved, and an executive summary. Use [BRACKETS] for the facts to fill in.
6. Say how the plan is kept alive: postmortem triggers per severity, drills, and who reviews the plan and when.
</task>

<constraints>
- Keep it a quick reference: tables and short sentences, no essays.
- Severity is decided by impact, not by cause or by how hard the fix is; say so in the plan.
- Anyone on the team may declare an incident and raise severity; lowering it needs the incident commander.
- Do not invent the organisation's tools, contracts or uptime commitments; use [BRACKETS] where they are missing.
- Customer templates say what users experience and what to do, never internal blame or speculation about cause.
{{> output/uncertainty}}
</constraints>

<output_format>
## Severity levels
A table: level, criteria, example, acknowledge, assemble, update cadence.
## Roles
A table: role, responsibilities, not responsible for.
## Escalation
Who to page per severity and the escalation steps.
## Response flow
The Mermaid flowchart and numbered steps.
## Communication templates
Each template in its own block.
## Review and upkeep
Postmortem triggers, drills, owner and review date.
</output_format>
