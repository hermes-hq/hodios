---
schema: 1
id: plan-security-incident-response
kind: prompt
title: Plan a security incident response
description: Plans the response to a suspected security incident with triage, evidence preservation, containment options, communication, eradication and recovery. Use in the first hours of a breach or compromise.
category: security
version: 1.0.0
status: incubating
stage: [operate]
role: [security-engineer, sre, engineering-manager, devops-engineer]
stack: []
requires: [none]
inputs: [text, logs]
output: [plan, checklist]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: expert
tags: [incident-response, breach, containment, forensics, nist-800-61]
pairs_with:
  personas: [security-auditor, incident-commander]
  prompts: [respond-to-leaked-secret, write-postmortem, build-incident-timeline]
args:
  - name: incident
    description: What was observed, when and by whom - alerts, suspicious logins, unexpected changes, a ransom note, a report from a third party - and what has already been done.
    type: text
    required: true
  - name: environment
    description: The affected environment - cloud accounts, servers, identity provider, key systems and data, logging available, team size and who is on call.
    type: text
output_contract:
  format: markdown
  sections: [Assessment, First hour, Preserve evidence, Containment options, Eradication and recovery, Communication, Unknowns, After the incident]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Under pressure, responders make the same mistakes: they wipe and rebuild a compromised host before capturing evidence, so nobody learns how the attacker got in; they rotate one credential while the attacker holds three others; they coordinate in the same chat or email system the attacker may be reading; they announce containment steps that tip the attacker off before access is cut everywhere; and nobody keeps a log of decisions, which later matters for regulators, insurers and the postmortem. The response follows the familiar phases (detection and analysis, containment, eradication, recovery, lessons learned), but the order of the first actions decides most of the outcome.
</context>

<task>
Plan the response to:
<incident>
{{incident}}
</incident>
{{#environment}}
Environment:
{{environment}}
{{/environment}}

1. **Assess.** Separate what is known from what is assumed. Give a provisional severity (critical, high, medium, low) with the reason: data involved, attacker access still live or not, systems affected. List the three questions whose answers would most change the plan, and how to answer each quickly. If the description is too thin to assess, ask those questions first.
2. **Organise.** Name the roles to fill now: incident lead, technical lead, scribe keeping a timestamped decision log, communications owner. Move coordination to a channel the attacker is unlikely to control if any company accounts may be compromised.
3. **First hour.** An ordered checklist of the actions that limit damage without destroying evidence.
4. **Preserve evidence** before changing systems: disk snapshots, memory capture where feasible, exports of cloud audit logs, identity provider logs and application logs before their retention expires, with hashes and a record of who collected what and when.
5. **Contain.** A table of options (disable accounts, revoke sessions and tokens, rotate keys, isolate hosts or networks, block indicators, take a service offline), each with its effect, its risk of alerting the attacker, and whether it is reversible. Recommend an order, and coordinate credential revocation so all of the attacker's access is cut at once rather than piecemeal.
6. **Eradicate and recover.** Find and close the entry point, remove persistence (new users, keys, scheduled tasks, modified images or CI pipelines), rebuild from known-good sources, restore data from backups taken before the compromise, and watch closely for the attacker returning.
7. **Communicate.** Who must hear what and when: internal leadership, legal counsel and the privacy or data protection officer, customers, the cyber insurer, and law enforcement where appropriate. Flag that personal-data breaches can carry short legal notification deadlines (some regimes require notice within 72 hours) and that counsel decides what applies.
</task>

<constraints>
- Never recommend wiping, reimaging or deleting anything before evidence is preserved, unless lives or critical safety are at stake.
- Do not recommend contacting, paying or negotiating with an attacker; route any ransom question to leadership, counsel, the insurer and law enforcement.
- Do not state legal obligations as settled; name them as questions for legal counsel.
- Mark every inference as an inference. If unsure of a tool's exact command, describe the action instead of guessing syntax.
</constraints>

<output_format>
## Assessment
Known, assumed, provisional severity, the three key questions.
## First hour
Numbered checklist with an owner role per item.
## Preserve evidence
Table: source, how to capture, retention risk, collected by.
## Containment options
Table: action, effect, tip-off risk, reversible, recommended order.
## Eradication and recovery
Numbered steps.
## Communication
Table: audience, what, when, channel, owner.
## Unknowns
Bullets with how to resolve each.
## After the incident
Postmortem, control gaps to fix, and what to keep from the decision log.
</output_format>
