---
schema: 1
id: contain-compromised-endpoint
kind: prompt
title: Contain a compromised endpoint
description: Plans containment of one infected laptop or server - isolation options, evidence first, account and token resets, scope checks, user communication and the reimage decision.
category: security-operations
version: 1.0.0
status: incubating
stage: [operate]
role: [security-engineer]
requires: [none]
inputs: [text, logs]
output: [plan, checklist, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [containment, edr-isolation, reimage, token-revocation, endpoint-response]
pairs_with:
  prompts: [plan-evidence-acquisition, triage-soc-alert, investigate-risky-sign-in, ransomware-response-track]
  personas: [soc-analyst]
args:
  - name: incident
    description: What happened on the endpoint - the alert or finding, what ran, when, and what has been done so far.
    type: text
    required: true
  - name: endpoint
    description: Device details - OS, laptop or server, its role, the primary user, whether admins logged on to it, EDR product, disk encryption and where it is (office, remote, data centre, cloud).
    type: text
    required: true
  - name: constraints
    description: Optional business constraints, such as a production server that cannot go down, an executive's laptop, or a remote user with no spare device.
    type: text
output_contract:
  format: markdown
  sections: [Situation, Contain now, Preserve evidence, Accounts and tokens, Scope check, Clean or reimage, User message, Return to service]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Containing one machine looks simple and goes wrong in familiar ways. Powering it off destroys memory evidence; EDR network isolation keeps the agent talking to the console while cutting everything else, and is usually the best first move. Reimaging straight away removes the attacker's tools from that host but not their stolen credentials, browser session cookies, cloud refresh tokens or the persistence they planted elsewhere. If an administrator logged on to the machine while it was compromised, their credentials may be in the attacker's hands and the scope is no longer one endpoint. A server that cannot go down can still be contained with firewall rules that allow only the traffic it needs. The user needs to know what to do and not to "fix" it themselves. A machine is ready to return to service only when the entry point is understood and the replacement is clean.
</context>

<task>
Plan containment for:

<incident>
{{incident}}
</incident>

<endpoint>
{{endpoint}}
</endpoint>
{{#constraints}}

<constraints_given>
{{constraints}}
</constraints_given>
{{/constraints}}

1. Situation: restate what is known, the likely severity, and the one or two worst plausible cases (credential theft, ransomware precursor, data theft) that drive urgency.
2. Contain now: choose the containment method that fits the device and constraints (EDR isolation, network access control quarantine, disabling the switch port or Wi-Fi profile, host firewall rules for servers, removing a cloud instance from load balancers and restricting its security group). Say what not to do: power off, reboot, run cleaners or let the user delete files.
3. Preserve evidence: what to collect before any cleanup (memory if the case warrants it, a triage collection with the EDR or a collection tool, relevant logs, a disk image or cloud snapshot for serious cases), and the recovery key if the disk is encrypted.
4. Accounts and tokens: reset passwords for the user and any account used on the device, revoke sessions and refresh tokens in the identity provider, review MFA methods added recently, rotate secrets stored on the device (SSH keys, API tokens, browser-saved passwords), and escalate if a privileged account was exposed.
5. Scope check: search the fleet for the same hashes, domains, persistence and user activity; check the user's mailbox and cloud sign-ins.
6. Clean or reimage: recommend reimaging from a known-good image when code ran with persistence or privileges; cleaning in place only for a contained, well-understood event such as a blocked download. State the condition for each.
7. User message: a short, calm note telling the user what is happening, not to power off or tamper, how to keep working, and who to contact.
8. Return to service: the checks before reconnecting (rebuilt or verified, patched, EDR healthy, credentials rotated, entry point fixed) and a follow-up monitoring period.
</task>

<constraints>
- Do not recommend powering off or wiping before evidence is preserved, unless active encryption or spread is under way; in that case say why speed wins.
- Containment actions on production systems need the owner's approval; mark them.
- Do not assume what the malware is or did beyond the input.
- Keep the user message free of blame and technical jargon.
{{> output/uncertainty}}
</constraints>

<output_format>
Use the eight sections as headings. Use numbered steps under each, mark approval-needed steps with "(approval)", and put the user message in a quote block.
</output_format>
