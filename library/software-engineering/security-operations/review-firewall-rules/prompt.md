---
schema: 1
id: review-firewall-rules
kind: prompt
title: Review firewall and security group rules
description: Reviews a firewall or cloud security group rule set for overly permissive, shadowed and unused rules, missing egress controls and documentation gaps, and plans a safe staged cleanup.
category: security-operations
version: 1.0.0
status: incubating
stage: [review, maintain]
role: [security-engineer, devops-engineer]
requires: [none]
inputs: [config, text]
output: [report, table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [firewall-review, security-groups, network-segmentation, egress-filtering, rule-cleanup]
pairs_with:
  prompts: [review-cloud-iam-policy, harden-linux-server, analyze-packet-capture]
args:
  - name: rules
    description: The rule set as exported - order, source, destination, port and protocol, action, logging, description, and hit counts with last-hit dates if your platform records them.
    type: text
    required: true
  - name: network_context
    description: What the zones and addresses are - internet, DMZ, user LAN, servers, management network, cloud VPCs - which services must be reachable from where, and any compliance scope such as a cardholder data environment.
    type: text
    required: true
  - name: change_window
    description: When changes can be made and any freeze periods, such as "Tuesdays 22:00-02:00, freeze in December".
    type: string
    default: ""
output_contract:
  format: markdown
  sections: [Summary, Findings, Cleanup plan, Target policy, Questions for owners]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Rule sets grow by accretion: a temporary rule for a vendor that stayed for four years, an "any to any" added during an outage, management ports opened to the internet "for a day", duplicate rules nobody dares remove. The risks are real exposure (databases and remote administration reachable from untrusted networks), invisible attack paths between zones, and a rule base so large nobody can reason about it. Cleanup is risky too: deleting a rule that looked unused can break a quarterly batch job. A good review ranks findings by exposure and plans removal in reversible stages backed by hit counts and logs.
</context>

<task>
Review these rules:

<rules>
{{rules}}
</rules>

<network_context>
{{network_context}}
</network_context>
{{#change_window}}
Change window: {{change_window}}
{{/change_window}}

1. If the rule order or the meaning of zones and address objects cannot be determined, ask for them and stop, because shadowing and exposure depend on both.
2. Check each rule for:
   - Overly permissive scope: any source, any destination, any service, or large ranges such as `0.0.0.0/0` or `::/0` to sensitive services (remote desktop 3389, SSH 22, database ports such as 1433, 3306, 5432, 6379, 9200, 27017, management interfaces, SMB 445).
   - Shadowed rules: rules that can never match because an earlier rule already matches all their traffic; and conflicting rules where order changes the outcome.
   - Redundant rules: duplicates or subsets with the same action.
   - Unused rules: zero hits over a long enough period to include monthly, quarterly and failover traffic, and only if hit counts are supplied (otherwise list as "unknown usage"). Ask since when the counters run: reboots, policy pushes and failovers reset them on some platforms.
   - Missing controls: no default deny at the end, no egress filtering from servers to the internet, no logging on deny rules or on rules to sensitive zones, east-west traffic allowed between zones that should be separate.
   - Hygiene: missing descriptions, owners or ticket references, and temporary rules without expiry.
3. Rate each finding (critical, high, medium, low) by exposure and the sensitivity of what it reaches.
4. Plan the cleanup in stages within the change window: first add logging or reduce scope on critical exposures; then disable (do not delete) suspected-unused rules and watch logs for a set period; then remove disabled rules that stayed quiet; finally reorder and consolidate. For each stage give verification and rollback.
5. Propose a target policy outline: zones, allowed flows between them, egress allow-list, default deny, logging.
6. Before answering, re-trace each shadowing claim against the rule order and make sure every rule appears in at least one finding or in "no issues".
</task>

<constraints>
- Never recommend deleting a rule without usage evidence; recommend disable-and-observe instead.
- Do not assume a rule is unneeded because it looks odd; ask its owner, and list it in "Questions for owners".
- Do not guess what an unnamed address object contains; flag it.
- Keep platform-specific syntax out unless the rules show the platform; describe changes in neutral terms otherwise.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Three to five sentences: overall posture, the most serious exposure, and the size of the cleanup.

## Findings
Table: Rule | Issue | Severity | Evidence | Recommendation.

## Cleanup plan
Numbered stages with timing, changes, verification and rollback.

## Target policy
A short table of zone-to-zone flows plus egress and logging rules.

## Questions for owners
Bullets naming the rule and what must be confirmed.
</output_format>
