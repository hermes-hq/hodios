---
schema: 1
id: assess-ransomware-readiness
kind: prompt
title: Assess ransomware readiness
description: Assesses how ready an organisation is to prevent and recover from ransomware - backups, restores, identity, exposure, admin access, detection and response - and gives a ranked fix list.
category: security-operations
version: 1.0.0
status: incubating
stage: [plan, review]
role: [security-engineer, engineering-manager, executive]
requires: [none]
inputs: [text, notes]
output: [report, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [ransomware, backup-recovery, immutable-backups, mfa, readiness-assessment]
pairs_with:
  prompts: [ransomware-response-track, plan-security-tabletop, harden-windows-domain, write-ir-playbook]
args:
  - name: environment
    description: Organisation size, sites, identity setup, servers and virtualisation, cloud and SaaS, remote access, endpoint protection, backup product and where copies live.
    type: text
    required: true
  - name: answers
    description: Optional answers to the readiness questions or notes from a previous assessment, ideally with evidence (last restore test date, MFA coverage report).
    type: text
  - name: constraints
    description: Optional budget, team size, insurance requirements or deadlines.
    type: text
output_contract:
  format: markdown
  sections: [Scope, Questions, Scorecard, Biggest gaps, Fix list, What to verify, Next exercise]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Ransomware outcomes are mostly decided before the attack, by a few controls. Recovery: at least one backup copy that the attacker cannot delete or encrypt even with domain admin (immutable, offline or in a separate account with separate credentials), a backup system not joined to the production domain, and restore tests that measure how long a full restore of critical systems really takes. Entry: internet-exposed remote access and edge devices (VPNs, firewalls, file transfer appliances) patched quickly, no RDP open to the internet, MFA on remote access, email and all admin interfaces. Spread: few domain admins, unique local admin passwords, admin tiering or at least separate admin accounts, and network segmentation between users and servers. Detection: EDR on all endpoints and servers with tamper protection, alerts someone watches out of hours. Response: a plan, contacts and the plan itself available offline, and a retainer or insurer panel ready. Assessments often score what people say rather than what is true; "we have backups" frequently means backups on the same domain with an untested restore.
</context>

<task>
Run a readiness assessment with the user.

<environment>
{{environment}}
</environment>
{{#answers}}

<answers>
{{answers}}
</answers>
{{/answers}}
{{#constraints}}

<constraints_given>
{{constraints}}
</constraints_given>
{{/constraints}}

1. Scope: restate the environment and the critical systems whose loss would stop the business. If the critical systems are unclear, ask.
2. Questions: if answers are missing, ask the most important ones in one batch (at most twelve), grouped by recovery, entry, spread, detection and response, and stop. Ask for evidence, not just yes or no.
3. Scorecard: for each control area, rate strong, partial, weak or unknown, and mark whether the rating rests on evidence or on a claim.
4. Biggest gaps: the three to five gaps most likely to turn an intrusion into a business-stopping event, with why.
5. Fix list: ranked by risk reduction per effort, each with a concrete action, an owner role, a rough effort size and a quick win where possible. Respect stated budget and team limits.
6. What to verify: claims that need proof (run a restore test of a critical system, export MFA coverage, list internet-exposed services from outside, count domain admins).
7. Next exercise: suggest a tabletop scenario that tests the weakest area.
</task>

<constraints>
- Do not rate a control strong on a claim alone; mark it "claimed".
- Do not recommend specific vendors or products unless the user asks; describe the capability.
- Do not invent insurance requirements or regulations; ask what applies.
{{> output/uncertainty}}
</constraints>

<output_format>
## Scope
Bullets.

## Questions
Numbered questions grouped by area, or "Answered".

## Scorecard
Table: Area | Control | Rating | Evidence or claim | Note.

## Biggest gaps
Numbered with reasons.

## Fix list
Table: Rank | Action | Owner role | Effort (S, M, L) | Risk reduced.

## What to verify
Checklist.

## Next exercise
One scenario in two or three sentences.
</output_format>
