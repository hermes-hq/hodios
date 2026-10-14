---
schema: 1
id: plan-evidence-acquisition
kind: prompt
title: Plan forensic evidence acquisition
description: Plans how to collect digital evidence from suspect systems before it is lost - order of volatility, memory, disk, cloud snapshots and logs, hashing, chain of custody and what not to touch.
category: security-operations
version: 1.0.0
status: incubating
stage: [operate]
role: [security-engineer]
requires: [none]
inputs: [text]
output: [plan, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [digital-forensics, evidence-preservation, chain-of-custody, memory-acquisition, incident-forensics]
pairs_with:
  prompts: [build-forensic-timeline, plan-security-incident-response, collect-incident-evidence]
  personas: [soc-analyst]
  workflows: [ransomware-response-track]
args:
  - name: situation
    description: What happened or is suspected, when it was noticed, and what has already been done to the systems (rebooted, cleaned, isolated).
    type: text
    required: true
  - name: systems
    description: The systems involved - laptops, servers, virtual machines, cloud instances, containers, mobile devices, SaaS accounts - and the tools available (EDR live response, hypervisor snapshots, imaging tools).
    type: text
    required: true
  - name: legal_context
    description: Whether evidence may be used in court, an employment case or a police report; it raises the standard of handling.
    type: enum
    enum: [internal-only, possible-litigation, law-enforcement-likely, unknown]
    default: unknown
output_contract:
  format: markdown
  sections: [Assumptions, Priorities, Acquisition order, Per-system steps, Chain of custody, Storage and handling, Do not do, Handover]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The well-meant first moves of an incident often destroy the evidence: rebooting or powering off loses memory, which may hold the only copy of fileless malware, decryption keys and live network connections; running antivirus clean-up deletes the attacker's tools; terminating a cloud instance deletes its disk; logs roll over while people argue. Forensic practice collects in order of volatility (memory and live state first, then disk, then logs held elsewhere, then backups), records every command run on a live system, hashes every image, and keeps a chain of custody from collection to analysis. If a court, regulator, insurer or police may see the evidence later, the bar for handling rises, and counsel should direct the work early.
</context>

<task>
Plan evidence acquisition with legal context: {{legal_context}}.

<situation>
{{situation}}
</situation>

<systems>
{{systems}}
</systems>

1. State assumptions and note any evidence already lost or changed by actions taken so far.
2. Set priorities: which systems first, by how likely they hold attacker activity and how fast their evidence decays. Say whether to isolate from the network now (usually yes, keeping power on) and how to do it without alerting the attacker if that matters.
3. Give the acquisition order across all systems, following order of volatility: memory and live state (processes, network connections, logged-on users), then disk or volume images or snapshots, then logs held off-host (identity, EDR, firewall, cloud audit, SaaS audit) with their retention deadlines, then backups.
4. Per-system steps for each system type listed: physical machines, virtual machines (hypervisor snapshot including memory where supported), cloud instances (snapshot volumes, capture instance metadata, keep the instance stopped not terminated, preserve audit logs), containers (export the container and image before it is rescheduled), SaaS (export audit logs before their retention window ends). Describe tools by category and mark where the user must confirm their own tool's procedure.
5. Chain of custody: what to record for each item (who, what, when, where, how, hash values), a simple form layout, and who signs transfers.
6. Storage and handling: write-protected copies, hash verification before analysis, encrypted storage with access logging, working on copies only, retention until legal advice says otherwise.
7. Do not do: the actions that destroy evidence in this situation.
8. Handover: what the analysis team or an outside forensic firm needs, and when to bring one in (for example {{legal_context}} is law-enforcement-likely or possible-litigation, or the team lacks experience).
</task>

<constraints>
- Do not give legal advice on admissibility; say counsel decides how evidence must be handled for court or police and should be involved early when litigation or law enforcement is possible.
- Do not invent tool commands or flags; name tool categories and say to follow the vendor's documented procedure.
- Never recommend wiping, reimaging or cleaning a system before its evidence is acquired, unless life or safety requires it; then say what is lost.
- If the situation involves possible child sexual abuse material, say to stop, not to copy or view it, and to report it to law enforcement as local law requires.
</constraints>

<output_format>
## Assumptions
Bullets, including evidence already lost.

## Priorities
Ranked list with reasons and the isolation decision.

## Acquisition order
Numbered list across all systems.

## Per-system steps
One short subsection per system type.

## Chain of custody
Fields to record and a form layout as a table.

## Storage and handling
Bullets.

## Do not do
Bullets.

## Handover
Bullets.
</output_format>
