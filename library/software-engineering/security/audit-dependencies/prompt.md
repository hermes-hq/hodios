---
schema: 1
id: audit-dependencies
kind: prompt
title: Triage dependency vulnerabilities
description: Triages dependency scan findings by reachability and exploitability, gives the upgrade path, and justifies anything safe to defer. Use when a scanner reports more than the team can fix at once.
category: security
version: 1.0.1
status: incubating
aliases: [sec-deps]
stage: [review, maintain]
role: [security-engineer, software-engineer, maintainer]
subject: [supply-chain]
stack: []
requires: [none]
inputs: [logs, config]
output: [report, table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [cve, sca, vex]
pairs_with:
  personas: [security-auditor]
args:
  - name: scan_output
    description: Output of the dependency scanner (npm audit, pip-audit, OSV-Scanner, Trivy, Snyk, Dependabot alerts or similar).
    type: text
    required: true
  - name: manifest
    description: The manifest and lockfile excerpts, and notes on how the vulnerable packages are used, if known.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Triage, Upgrade plan, Deferred, Verify]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "Answers to the former Hermes IDE built-in id sec-deps."}
---
<context>
Scanners rank by CVSS base score, which ignores whether your code can reach the vulnerable function, whether the package ships to production at all, and whether anyone is exploiting it. Teams either drown in hundreds of "critical" findings or bump everything blindly and break the build. Good triage fixes what is reachable and exploitable first, finds the smallest upgrade that clears the most findings, and records a defensible reason for everything it defers.
</context>

<task>
Triage this scan:
{{scan_output}}
{{#manifest}}
Manifest and usage notes:
{{manifest}}
{{/manifest}}

1. Deduplicate: group findings by package and installed version, since one vulnerable version often appears through several paths.
2. For each group, establish: direct or transitive (and through which parent), runtime or development/build-only, the vulnerable function or condition as the advisory describes it, and whether the code plausibly reaches it with attacker-controlled input. If reachability depends on code you have not seen, say exactly what to check.
3. Weigh exploitability: public exploit, listing in a known-exploited catalogue, or exploit prediction scores. You cannot query these databases live; use what the scan provides and tell the user which to look up.
4. Assign a decision: fix now (reachable or known-exploited in runtime code, or a malicious or typosquatted package), fix this cycle, defer with justification, or not affected.
5. Find the upgrade path: the minimal fixed version, whether it is within the current semver range (a lockfile refresh) or a major bump, and for transitive issues whether to bump the parent or use an override or resolution (with its risk). If no fix exists, give a mitigation or an alternative package.
6. Order the upgrades to minimise churn: one change that clears several findings comes first.
</task>

<constraints>
- Do not invent advisory details, CVSS scores or fixed versions that are not in the scan. When the scan lacks them, name the advisory to look up.
- Every deferral needs a reason in VEX terms (for example "vulnerable code not in execute path", "component not present at runtime") plus a re-review date.
- A malicious-package finding is always "fix now": remove it and treat the environment as possibly compromised.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Summary
Counts: fix now, fix this cycle, deferred, not affected.
## Triage
A table: package, installed version, advisory, severity (scanner), runtime or dev, reachable (yes/no/unknown), decision, fixed version.
## Upgrade plan
Numbered commands or manifest edits in order, each with the findings it clears and its breaking-change risk.
## Deferred
Each deferral with its VEX justification and re-review date.
## Verify
Re-run the scanner, run the tests, and check the specific behaviours that a major bump could change.
</output_format>
