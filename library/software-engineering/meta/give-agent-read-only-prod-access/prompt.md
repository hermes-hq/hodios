---
schema: 1
id: give-agent-read-only-prod-access
kind: prompt
title: Give an agent read-only production access
description: Designs safe read-only access for a coding agent to production logs, metrics and data for debugging, with scoped roles, masked views, query limits, short-lived credentials and audit.
category: meta
version: 1.0.0
status: incubating
stage: [design]
role: [sre, devops-engineer, security-engineer, tech-lead]
requires: [none]
inputs: [text, config]
output: [plan, config, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [coding-agents, production-access, least-privilege, data-masking, incident-debugging]
pairs_with:
  prompts: [audit-agent-permissions, choose-mcp-servers-for-project, design-agent-sandbox]
args:
  - name: need
    description: What the agent should help debug and which sources it needs (log platform, metrics, traces, database tables), plus the agent and how it connects (MCP servers, CLIs).
    type: text
    required: true
  - name: environment
    description: Your infrastructure, how humans get production access today, data classes involved (personal data, payment data) and any compliance rules you must follow.
    type: text
output_contract:
  format: markdown
  sections: [Access design, Database access, Logs and metrics, Credentials, Injection and exfiltration, Audit, Rollout]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Letting an agent read production can cut debugging time sharply, and "read-only" is still not safe by default. A read-only database role can run a query that locks up a primary or scans a billion rows. It can read personal data that then lands in the agent's context, the model provider's logs and the transcript. Logs are partly attacker-controlled (user agents, request bodies, error messages), so an agent reading them is reading untrusted text that may contain instructions; if the same session can reach the network or write somewhere, that is an exfiltration path. Safe designs use a replica or analytics copy, a dedicated role with access only to masked views, statement timeouts and row limits, short-lived credentials tied to a person, read scopes on log and metric APIs, no outbound network beyond those, and an audit trail of every query. Compliance regimes may forbid some data leaving your boundary at all; the design must respect that rather than work around it.
</context>

<task>
Design read-only production access for this need.
<need>
{{need}}
</need>
{{#environment}}
<environment>
{{environment}}
</environment>
{{/environment}}

1. Access design: for each source, whether the agent needs it at all, the narrowest form (aggregates, sampled logs, masked rows), and the path (replica, API with read scope, MCP server in read-only mode).
2. Database access: replica or copy, a dedicated role with SELECT only on approved views, masking or exclusion of personal and secret columns, statement timeout, row limit, connection limit. Give the role and view definitions as a sketch for the stated engine, with exact syntax to verify.
3. Logs and metrics: read-only tokens, index or project scoping, field redaction for personal data, and query cost limits.
4. Credentials: short-lived, issued to the human running the agent, never stored in repository config, and revoked at session end.
5. Injection and exfiltration: identify untrusted text in each source, the outbound channels in the session, and the control that breaks each path (no web access in prod-debug sessions, approval for any write tool, separate session for remediation).
6. Audit: log every query and call with the person and session, retention, and a weekly review.
7. Rollout: a pilot with one team on non-personal data first, the success measure, and the conditions for widening.
</task>

<constraints>
- No write, admin or schema permissions in this design, and no remediation actions from the same session.
- Do not state compliance conclusions; flag where the user's compliance or privacy team must decide.
- Mark engine- or vendor-specific syntax you are unsure of as "check against the documentation".
{{> output/uncertainty}}
</constraints>

<output_format>
## Access design
Table: source, needed (yes, no), narrowest form, path.
## Database access
Bullets and a fenced sketch.
## Logs and metrics
Bullets.
## Credentials
Bullets.
## Injection and exfiltration
Table: untrusted input, outbound channel, control.
## Audit
Bullets.
## Rollout
Numbered steps with the success measure.
</output_format>
