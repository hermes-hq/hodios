---
schema: 1
id: plan-security-tabletop
kind: prompt
title: Plan a security tabletop exercise
description: Plans a security tabletop exercise with a realistic scenario, timed injects, roles, discussion questions, decision points, a facilitator guide and an after-action report template.
category: security-operations
version: 1.0.0
status: incubating
stage: [plan]
role: [security-engineer, engineering-manager]
requires: [none]
inputs: [text]
output: [plan, docs, questions]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: optional
level: intermediate
tags: [tabletop-exercise, incident-response, injects, after-action-report, crisis-simulation]
pairs_with:
  prompts: [write-ir-playbook, plan-security-incident-response]
  workflows: [ransomware-response-track]
args:
  - name: scenario
    description: The incident to rehearse, such as ransomware, business email compromise, a cloud data leak, an insider, or a supplier breach.
    type: string
    required: true
  - name: participants
    description: Who will take part - roles and teams (executives, IT, security, legal, communications, finance, HR), how many people, and how familiar they are with incident response.
    type: text
    required: true
  - name: minutes
    description: Length of the exercise in minutes, including the debrief.
    type: number
    default: 90
  - name: objectives
    description: What the organisation wants to test, such as decision rights, the playbook, out-of-hours escalation or customer communication. Leave empty to propose objectives.
    type: text
    default: ""
output_contract:
  format: markdown
  sections: [Objectives, Format and ground rules, Roles, Agenda, Scenario and injects, Facilitator guide, Hotwash, After-action report template]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A tabletop exercise walks people through a simulated incident by discussion, with no changes to live systems. It finds the gaps that only show up under pressure: nobody knows who can authorise taking a system offline, the contact list is out of date, legal hears about the incident on day three, or the backups everyone relies on were never tested. Exercises fail when the scenario is implausible for the organisation, when injects all arrive at once, when the facilitator lets it turn into a technical deep dive, or when nothing is written down afterwards. A good exercise has two to four clear objectives, a scenario that escalates in stages, injects that force decisions, and an after-action report with owned actions.
</context>

<task>
Plan a {{minutes}}-minute tabletop on: {{scenario}}

<participants>
{{participants}}
</participants>
{{#objectives}}

<objectives>
{{objectives}}
</objectives>
{{/objectives}}

1. If the participants are not described well enough to know who decides what (for example no one from leadership for a scenario that needs a business decision), say which role is missing and whether to proceed without it.
2. Objectives: use the given ones or propose two to four that are testable (for example "the team decides within 30 simulated minutes whether to isolate the finance network, and knows who authorises it").
3. Format and ground rules: no-fault, decisions are made as in real life, unknowns are answered by the facilitator, a parking lot for technical deep dives, and no live systems touched.
4. Roles: facilitator, scribe, optional observers, and which participant plays which real role.
5. Agenda: timed blocks that fit {{minutes}} minutes, with about a fifth of the time reserved for the hotwash.
6. Scenario and injects: a short starting situation, then five to eight injects that escalate (first signal, confirmation, spread, outside pressure such as media or a customer call, a complication such as a key person unavailable or backups partly affected, recovery choice). For each inject: simulated time, what is delivered and to whom, the discussion questions, the decision point, and what good looks like.
7. Facilitator guide: how to keep time, prompts for quiet participants, how to handle "we would just restore from backup" with a follow-up question, and optional curveballs if the group moves fast.
8. Hotwash questions and the after-action report template: what went well, gaps found, actions with owner and due date, and playbook updates.
9. Before answering, check the inject timings add up to the agenda and that every objective is exercised by at least one decision point.
</task>

<constraints>
- If the scenario or the participants are missing, ask for them in one message and stop.
- Keep the scenario plausible for the organisation described; do not name real companies or real threat groups as the attacker.
- Discussion only: no injects that require touching production systems or real phishing of participants.
- Avoid technical detail beyond what the participants can act on; route deep dives to the parking lot.
- Treat legal, regulatory and insurance questions as decision points for the right people, not as answers the exercise supplies.
{{> output/uncertainty}}
</constraints>

<output_format>
Markdown document with the sections in the output contract. Agenda as a table: Time | Block | Purpose. Injects as numbered sections with Simulated time, Delivered to, Inject text, Questions, Decision point, What good looks like. After-action template as a fill-in table: Finding | Impact | Action | Owner | Due.
</output_format>
