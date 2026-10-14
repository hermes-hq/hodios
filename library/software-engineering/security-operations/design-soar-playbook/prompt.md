---
schema: 1
id: design-soar-playbook
kind: prompt
title: Design a SOAR automation playbook
description: Designs a security automation playbook for one alert type, with enrichment, decision logic, human approval gates before disruptive actions, failure handling and metrics, ready to build.
category: security-operations
version: 1.0.0
status: incubating
stage: [design]
role: [security-engineer]
requires: [none]
inputs: [text]
output: [plan, diagram, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [soar, security-automation, enrichment, containment, alert-triage]
pairs_with:
  prompts: [write-ir-playbook, triage-soc-alert, investigate-reported-phishing]
  personas: [soc-analyst, detection-engineer]
args:
  - name: alert_type
    description: The alert or case type to automate, how often it fires, and how analysts handle it by hand today.
    type: text
    required: true
  - name: tools
    description: The tools the playbook can call - SIEM, EDR, identity provider, mail platform, threat intel, ticketing, chat - and any API limits you know of.
    type: text
    required: true
  - name: autonomy
    description: enrich-only gathers context for the analyst; approve-to-act prepares containment and waits for a human; auto-contain-low-risk acts alone only where the blast radius is small and confidence high.
    type: enum
    enum: [enrich-only, approve-to-act, auto-contain-low-risk]
    default: approve-to-act
output_contract:
  format: markdown
  sections: [Trigger and inputs, Flow, Decision logic, Human approval gates, Failure handling, Guardrails, Metrics, Build checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Automation pays off most on the dull, repeated part of triage: pulling user, host and indicator context into the case so an analyst starts from a picture instead of ten browser tabs. It hurts most when it acts disruptively on a wrong verdict: isolating a domain controller, disabling an executive's account during a board meeting, blocking a shared cloud provider's IP range, or looping on its own output. Well-built playbooks are idempotent, check the asset's criticality before acting, put a person in front of anything hard to undo, handle API failures and rate limits without silently dropping the case, and log every action for the incident record.
</context>

<task>
Design a playbook for this alert type at autonomy level {{autonomy}}.

<alert_type>
{{alert_type}}
</alert_type>

<tools>
{{tools}}
</tools>

1. Trigger and inputs: what starts the playbook, the fields it needs, and what happens when a field is missing.
2. Flow: the steps in order, from deduplication (is there already an open case for this user, host or indicator) through enrichment (identity, asset criticality and owner, EDR context, indicator reputation, related alerts in the last days) to verdict support and action. Provide a Mermaid flowchart.
3. Decision logic: the conditions that route to close as known-benign, analyst review, or containment, written as explicit rules with thresholds the team must set. Mark every threshold as a team decision, not a default.
4. Human approval gates: for {{autonomy}}, list which actions may run alone and which wait for approval, with the approval message content (what, why, evidence, impact, undo). Assets such as domain controllers, executives' accounts, production servers and shared infrastructure always need a person.
5. Failure handling: API timeouts, rate limits, partial failures, retries with limits, and what the analyst sees when a step fails. The case must never close because automation failed.
6. Guardrails: allow and deny lists for containment, rate limits on actions per hour, a kill switch, idempotency, and an audit trail of every action.
7. Metrics: time saved per case, auto-closed cases later found to be true positives (sample and review them), actions reversed, failures per week.
8. Build checklist: test cases including a true positive, a benign case, a missing-field case and a tool outage, plus a shadow-mode period before actions are enabled.
</task>

<constraints>
- Do not invent product names, API endpoints or fields for the listed tools; describe the action generically ("EDR: isolate host") and mark details to confirm in the tool's documentation.
- Never design automatic deletion of mail, accounts or data, or automatic blocking of shared infrastructure.
- If the alert type is too noisy or poorly understood to automate actions, say so and recommend enrich-only first.
</constraints>

<output_format>
## Trigger and inputs
Bullets.

## Flow
Numbered steps, then a fenced Mermaid flowchart.

## Decision logic
Table: Condition | Route | Threshold owner.

## Human approval gates
Table: Action | Runs alone or needs approval | Why.

## Failure handling
Bullets.

## Guardrails
Bullets.

## Metrics
Bullets with how each is measured.

## Build checklist
Checklist including test cases and shadow mode.
</output_format>
