---
schema: 1
id: triage-sast-findings
kind: prompt
title: Triage static analysis security findings
description: Triages a backlog of static analysis security findings by grouping by root cause, tracing data flow from source to sink, and marking each true or false positive with a fix or suppression.
category: security
version: 1.0.0
status: incubating
stage: [review, maintain]
role: [security-engineer, software-engineer, tech-lead]
stack: []
requires: [repo-read]
inputs: [repo, logs, file]
output: [report, table, config]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [sast, static-analysis, false-positives, data-flow, security-backlog]
pairs_with:
  prompts: [write-semgrep-rule, audit-dependencies, audit-input-handling]
  personas: [security-auditor]
args:
  - name: findings
    description: The scanner output (SARIF, JSON or pasted results) with rule IDs, files and lines, and the scanner name.
    type: text
    required: true
  - name: context
    description: What the application is, which inputs are untrusted, and any existing sanitisation or framework protections.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Groups, Confirmed issues, False positives and suppressions, Rule tuning, Gate for new findings]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A first scan of a mature codebase often produces hundreds of findings, most of them repeats of a few patterns, and teams either drown or ignore the tool. Experienced triagers group findings by rule and root cause, so one fix or one suppression decision covers many; follow each candidate from a real untrusted source to the sink rather than trusting the scanner's verdict either way; recognise framework protections the scanner does not model (auto-escaping templates, parameterised query builders, typed route parameters) but check that they are not bypassed in that spot; and treat test code, dead code and build scripts differently from production paths. The output that keeps a programme alive is a short list of real issues, documented suppressions with reasons, rule tuning for noisy rules, and a gate that blocks only new findings on changed code.
{{#context}}
Application context: {{context}}
{{/context}}
</context>

<task>
Findings:
{{findings}}

1. Normalise and deduplicate: count findings per rule, per file and per pattern; group those that share a root cause (one helper function, one unsafe wrapper, one copy-pasted block).
2. Separate by location: production code, test code, examples and scripts, generated or vendored code.
3. For each group in production code, trace the data flow: the source (is it really attacker-controlled?), the path, any sanitiser or framework protection, and the sink. Read the code; do not decide from the rule name.
4. Classify each group: true positive (with severity and the attack in one sentence), false positive (with the precise reason), or needs more information (what is missing). Include code paths that are reachable only by admins and say whether that changes severity.
5. For true positives give the fix, preferring a fix at the shared root (a safe wrapper) over many local patches.
6. For false positives write inline suppression comments with the reason, in the scanner's syntax, and propose rule tuning (path exclusions for tests or vendored code, a custom sanitiser declaration) for rules that are mostly noise.
7. Propose a gate: a baseline of current accepted findings, new findings on changed lines block merges, and a target date to burn down the confirmed backlog.
</task>

<constraints>
- Do not mark anything a false positive without the code-based reason.
- Never suppress a finding with a blanket rule disable unless the rule is irrelevant to this codebase; say why.
- Use only the findings and code given; do not invent findings.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Totals: findings, groups, true positives by severity, false positives, needs info.
## Groups
Table: group | rule | count | location | verdict.
## Confirmed issues
Per issue: `path:line`, data flow, severity, fix.
## False positives and suppressions
Per group: reason, the suppression comment.
## Rule tuning
Bullets with config snippets.
## Gate for new findings
Bullets.
</output_format>
