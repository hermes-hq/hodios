---
schema: 1
id: recover-active-directory-after-compromise
kind: prompt
title: Recover Active Directory after compromise
description: Plans recovering Active Directory after domain admin compromise, with out-of-band coordination, a persistence hunt, privileged credential resets, the double krbtgt reset and validation.
category: security-operations
version: 1.0.0
status: incubating
stage: [operate, plan]
role: [security-engineer, devops-engineer]
requires: [none]
inputs: [text, logs]
output: [plan, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [active-directory, krbtgt, domain-compromise, eviction, privileged-access, ad-cs]
stack: [powershell]
pairs_with:
  prompts: [harden-windows-domain, ransomware-response-track, investigate-windows-event-logs, plan-evidence-acquisition]
args:
  - name: situation
    description: What is known - how domain admin or equivalent access was obtained, when, by whom if known, and what has been done so far.
    type: text
    required: true
  - name: environment
    description: Forests and domains, number of domain controllers and sites, functional level, AD CS, Entra ID or other cloud sync, tiering or admin workstations, backups of domain controllers and their age.
    type: text
    required: true
  - name: findings
    description: Optional findings from the investigation so far, such as new accounts, group changes, GPO edits, suspicious certificates or delegation changes.
    type: text
output_contract:
  format: markdown
  sections: [Assumptions, Decide recover or rebuild, Before you start, Persistence to hunt, Eviction order, krbtgt reset, Validation, Risks and fallbacks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Once an attacker has held domain admin, the safe assumption is that every credential and object in the forest could have been read or changed. Partial clean-ups fail because AD offers many quiet ways back in: Golden Tickets forged with the krbtgt key, which survive any user password reset; DCSync rights granted to an ordinary account; changes to AdminSDHolder that reapply rights hourly; SID history; resource-based or unconstrained delegation; GPOs that push scheduled tasks; malicious or misconfigured certificate templates and certificates issued from AD CS, which keep working after password resets until revoked; the DSRM password on domain controllers; and the directory sync account for a cloud tenant. Eviction has to happen in a short, planned window after the hunt, because resetting one thing at a time warns the attacker and lets them re-establish. The krbtgt key must be reset twice, with replication completing and enough time passing between resets for existing tickets to expire, or authentication breaks across the domain; Microsoft publishes guidance and a script for this. Coordination must be out of band, since the attacker may read corporate email and chat. Experienced incident responders should lead this kind of recovery; this plan supports them and does not replace them.
</context>

<task>
Plan the recovery:

<situation>
{{situation}}
</situation>

<environment>
{{environment}}
</environment>
{{#findings}}

<findings>
{{findings}}
</findings>
{{/findings}}

1. Assumptions: state what you assume about the extent of compromise and what would change the plan.
2. Decide recover or rebuild: compare recovering in place, restoring domain controllers from a backup that predates the compromise (if its date can be trusted), and building a new forest, with the conditions for each.
3. Before you start: out-of-band communication, clean admin workstations for the eviction team, an incident responder with AD experience, backups of current domain controller state, and a change freeze.
4. Persistence to hunt, each with a read-only check: privileged group membership (including nested), recently created or modified accounts, AdminSDHolder ACL, accounts with replication rights, SID history, delegation settings, GPO changes and their scheduled tasks or scripts, AD CS templates and recently issued certificates, DSRM settings, service accounts with SPNs, cloud sync accounts and app registrations if a cloud tenant is connected, and persistence on domain controllers themselves.
5. Eviction order, in one planned window: block attacker access paths, remove found persistence, revoke malicious certificates and fix templates, reset all privileged accounts and service accounts (with dependency mapping so services do not break), reset DSRM passwords, reset computer account passwords of domain controllers if advised by the responders, and reset cloud sync and federation credentials.
6. krbtgt reset: first reset, confirm replication to every domain controller, wait at least the maximum ticket lifetime plus clock skew (commonly ten hours plus margin under default policy, verify yours), then the second reset; for read-only domain controllers, their own krbtgt accounts too. Point to Microsoft's published reset script and guidance.
7. Validation: hunts and detections to watch for returning activity (new privileged group changes, DCSync attempts, logons of reset accounts with old credentials, ticket anomalies), for at least several weeks.
8. Risks and fallbacks: what can break (applications with hard-coded service account passwords, trust relationships, replication issues) and the rollback for each step where one exists.
</task>

<constraints>
- Read-only checks in the hunt. Every reset or removal is a change in a planned window with approval; mark them.
- Never suggest a single krbtgt reset as sufficient, or two resets back to back.
- Do not invent cmdlets, attribute names or Microsoft guidance. Mark anything uncertain `[VERIFY]`.
- Recommend involving experienced incident responders and the organisation's legal and insurance contacts where relevant.
{{> output/uncertainty}}
</constraints>

<output_format>
Use the eight sections as headings. "Persistence to hunt" is a table: Mechanism | Read-only check | Found? (from findings or "unknown"). "Eviction order" and "krbtgt reset" are numbered steps with "(approval)" marks and timing. End with an outline timeline: Day | Activity.
</output_format>
