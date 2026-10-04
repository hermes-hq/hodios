---
schema: 1
id: harden-windows-domain
kind: prompt
title: Harden a small Windows domain
description: Plans hardening for a small Windows Active Directory domain in priority order - admin tiering, passwords and MFA, legacy protocols, logging and backup protection - with a check and rollback per step.
category: security
version: 1.0.0
status: incubating
stage: [plan, maintain]
role: [security-engineer, devops-engineer]
requires: [none]
inputs: [config, text]
output: [plan, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [active-directory, windows-hardening, admin-tiering, laps, ransomware-resilience]
pairs_with:
  prompts: [harden-linux-server, review-cloud-iam-policy, prioritize-vulnerability-backlog]
  personas: [security-auditor]
args:
  - name: environment
    description: What you have - domain and forest functional level, number of domain controllers and their OS versions, whether you sync to a cloud identity provider, certificate services, backup product, endpoint protection, remote access, and how admins work today.
    type: text
    required: true
  - name: size
    description: Number of users in the domain; it decides how heavy the controls can be.
    type: number
    required: true
  - name: constraints
    description: Legacy systems and applications that need old protocols, staff available, change windows, budget limits.
    type: text
output_contract:
  format: markdown
  sections: [Current risks, Hardening plan, Quick wins this week, Verification, Not covered]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most ransomware and intrusion cases in small and mid-sized organisations go through Active Directory: one admin password reused on a workstation, a service account with a weak password and domain admin rights, legacy name resolution and authentication protocols that hand over credentials on the local network, no logs worth reading, and backups joined to the same domain the attacker now controls. Small teams cannot do everything at once, and some changes break old applications. A useful plan orders the work by risk reduced per hour of effort, pilots each change on a small group first, and says how to check it worked and how to undo it.
</context>

<task>
Plan hardening for this domain of about {{size}} users:

<environment>
{{environment}}
</environment>
{{#constraints}}

<constraints_given>
{{constraints}}
</constraints_given>
{{/constraints}}

1. If the environment does not state the domain controller OS versions, whether admins use separate accounts, and how backups are stored, ask for those three facts and stop; the order of the plan depends on them.
2. Current risks: list the five most serious risks evident from the description, each in one line.
3. Hardening plan, in priority order, scaled to {{size}} users and the constraints. Cover, where relevant:
   - Privileged access: separate admin accounts, a small Domain Admins group, admin tiering (domain controllers and identity systems as the top tier, never logged on to from workstations), the Protected Users group for admins, and unique local administrator passwords managed by LAPS.
   - Authentication: MFA for remote access, email and admin portals; password policy based on length and banned-password lists; service accounts converted to group managed service accounts or given long random passwords and AES-only Kerberos; review of accounts with Kerberos pre-authentication disabled or delegation set.
   - Legacy protocols: disable SMBv1, LLMNR and NetBIOS name resolution; require SMB signing; LDAP signing and channel binding; restrict NTLM and remove LM and NTLMv1; disable the print spooler on domain controllers.
   - Certificate services, if present: review templates that let enrolees choose the subject name, and who can enrol.
   - Endpoint: attack surface reduction rules, credential protection features where hardware allows, removal of local admin rights from users.
   - Logging: advanced audit policy for logons, account and group changes, Kerberos events and process creation; PowerShell script block logging; central collection with enough retention.
   - Backup protection: at least one offline or immutable copy, backup servers and consoles not joined to the production domain or with separate credentials, and a tested restore of a domain controller.
   - Housekeeping: stale accounts and computers, the krbtgt account password rotated in two steps with replication time between them.
4. For each step give: why (the attack it stops), how (Group Policy location or tool in neutral terms), pilot group, the check that confirms it worked, the rollback, and the compatibility risk given the constraints.
5. Quick wins: up to five changes that are low risk and can be done this week.
6. Before answering, check that steps that can break applications (NTLM restriction, SMB signing, LDAP channel binding) come with an audit-mode or logging phase first, and that nothing is ordered before its prerequisite.
</task>

<constraints>
- Defensive configuration only. Describe attack techniques only to explain why a control matters.
- Do not give exact commands or registry values unless you are sure of them; otherwise name the setting and say to confirm it in the vendor's documentation for the stated OS version.
- Respect the constraints: when a legacy system needs an old protocol, propose isolating it instead of leaving the whole domain exposed.
- Never suggest disabling security logging or endpoint protection to fix compatibility.
{{> output/uncertainty}}
</constraints>

<output_format>
## Current risks
Five numbered lines.

## Hardening plan
Numbered steps grouped into phases (this month, this quarter, later). Each step: Why, How, Pilot, Check, Rollback, Compatibility risk.

## Quick wins this week
Up to five bullets.

## Verification
How to confirm the overall result, such as an AD security assessment tool run before and after, a restore test, and a review of who holds admin rights.

## Not covered
What this plan leaves out (cloud identity tenant hardening, email security, physical security) and why.
</output_format>
