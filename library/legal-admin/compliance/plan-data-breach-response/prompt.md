---
schema: 1
id: plan-data-breach-response
kind: prompt
title: Plan a personal data breach response
description: Plans a small organisation's personal data breach response covering containment, risk assessment, notification thresholds and deadlines to verify, notice templates and a breach log.
category: compliance
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [founder, operations-manager, executive, security-engineer]
subject: [law]
requires: [none]
inputs: [text]
output: [plan, checklist, table]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [data-breach, incident-response, breach-notification, data-protection]
pairs_with:
  prompts: [map-personal-data-processing, review-data-processing-agreement, build-compliance-checklist]
  personas: [compliance-officer]
args:
  - name: organisation
    description: What the organisation does, size, the personal data it holds (customers, staff, health, payment, children), key systems and vendors, and whether you are a controller or a processor for clients. If a breach is happening now, describe it.
    type: text
    required: true
  - name: jurisdictions
    description: Where the organisation is established and where the affected people live, for example "Germany, with customers across the EU and UK" or "Texas, with customers in all US states". Optional.
    type: text
output_contract:
  format: markdown
  sections: [If a breach is happening now, Roles, Phase 1 Contain, Phase 2 Assess, Phase 3 Notify, Phase 4 Recover and learn, Templates, Breach log, To verify with counsel]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write breach response plans for small organisations that have no security team and no in-house lawyer. When personal data is lost, stolen, wrongly sent or exposed, the first hours decide two things: how much harm reaches the people affected, and whether the organisation meets notification deadlines that run from the moment it becomes aware. Under the EU GDPR and UK GDPR, for example, a controller generally must notify the supervisory authority within 72 hours of becoming aware unless the breach is unlikely to result in a risk to individuals, must tell affected individuals without undue delay when the risk is high, and must record every breach internally; a processor must tell its controller without undue delay. US state breach laws, sector rules (health, finance), contracts with clients and cyber insurance policies add their own triggers and clocks. A plan written in calm makes those decisions fast and defensible in a crisis.

{{#jurisdictions}}Jurisdictions: {{jurisdictions}}{{/jurisdictions}}
</context>

<task>
Organisation:

<organisation>
{{organisation}}
</organisation>

1. If the description says a breach is happening now, start with a short "do this now" list: contain without destroying evidence, record the time the organisation became aware, start the breach log, call the cyber insurer's hotline if there is a policy, and get legal help; then continue with the plan.
2. Roles: a small response team (lead, technical, communications, legal or external counsel, data protection officer if any) with deputies, contact details as [BRACKETS], and who can decide to notify.
3. Phase 1 Contain (first hours): steps tailored to the organisation's systems and likely breach types (lost device, compromised email or account, misdirected email, ransomware, vendor breach, insider), including preserving logs and evidence, resetting credentials, recalling or requesting deletion of misdirected data, and what not to do (wipe systems, pay or contact attackers without advice, make public statements early).
4. Phase 2 Assess: questions to establish what data, whose, how many people, whether it was encrypted or otherwise unintelligible, whether it was accessed or exfiltrated, and the likely consequences for people (identity fraud, financial loss, discrimination, distress, physical risk). Give a simple risk rating guide (unlikely, risk, high risk) with examples relevant to this organisation.
5. Phase 3 Notify: a table of possible notification duties for the stated jurisdictions and roles: who to notify (regulator, individuals, controller clients, insurer, banks or card brands, law enforcement), trigger, deadline and content. Mark every entry "to verify with counsel" and name a law or deadline only where you are confident it applies. If the organisation is a processor, put the duty to tell controller clients first and point to its contracts.
6. Phase 4 Recover and learn: fix root causes, monitor for misuse, support affected people (password resets, fraud alerts, a contact point), and a short post-incident review.
7. Templates: regulator notification outline (fields commonly required), individual notice in plain language (what happened, what data, what we are doing, what you can do, contact), and a holding statement for staff and customers.
8. Breach log: a table template that also covers breaches not notified, with the reasoning recorded.
9. List the points to verify with counsel or the regulator's guidance.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not invent laws, deadlines, thresholds or regulator names; when a jurisdiction is unknown, describe duties in general terms and say what decides them.
- Be practical for the organisation's size: named roles and short steps, not a large-enterprise framework.
- Never suggest hiding a breach, delaying notice to finish an investigation when a deadline applies (initial notices can usually be updated later), or wording notices to downplay risk.
- For an active breach involving many people, sensitive data, ransomware or extortion, recommend engaging specialist incident responders and counsel immediately.
{{> output/uncertainty}}
</constraints>

<output_format>
## If a breach is happening now
Only if one is described: five to seven numbered actions. Otherwise "Not applicable: this is a plan."

## Roles
Table: role | person | deputy | decides.

## Phase 1 Contain
Numbered steps, with what not to do.

## Phase 2 Assess
Questions, then the risk rating guide.

## Phase 3 Notify
Table: who | trigger | deadline | content | status "to verify with counsel".

## Phase 4 Recover and learn
Bullets.

## Templates
Three templates with [BRACKETS].

## Breach log
Table template: date aware | what happened | data and people | risk rating | notified whom and when | reasoning | actions.

## To verify with counsel
Numbered questions.
</output_format>
