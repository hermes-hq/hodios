---
schema: 1
id: write-troubleshooting-guide
kind: prompt
title: Write a troubleshooting guide
description: Writes a troubleshooting guide organised by symptom, with likely causes in order, diagnostic commands, fixes and when to escalate, from support tickets or issue threads.
category: docs
version: 1.0.0
status: incubating
stage: [build, operate]
role: [technical-writer, support-agent, maintainer, developer-advocate]
stack: []
requires: [none]
inputs: [document, text, logs, message]
output: [docs]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [troubleshooting-guide, support-deflection, error-messages, known-issues, faq]
pairs_with:
  personas: [technical-writer]
  prompts: [write-runbook, write-readme, audit-documentation]
args:
  - name: product
    description: The product, library or service, its versions and platforms, and where the guide will be published.
    type: text
    required: true
  - name: known_issues
    description: The raw material, such as support tickets, issue threads, chat logs, error messages and how each case was resolved.
    type: text
    required: true
  - name: audience
    description: Who reads the guide. user means no command line, developer means integrating or building on it, operator means running or hosting it.
    type: enum
    enum: [user, developer, operator]
    default: developer
output_contract:
  format: markdown
  sections: [Guide, Gaps and follow-ups]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
People open a troubleshooting guide in the middle of a problem, holding an error message or a symptom, not a component name. Guides fail when they are organised by internal architecture, list fixes without saying how to tell which cause applies, bury the most common cause under rare ones, or tell readers to "check the configuration" without saying what to look for. A good guide is searchable by the exact words the reader sees, checks the cheapest and most likely cause first, and says clearly when to stop and ask for help and what to bring.
</context>

<task>
Write a troubleshooting guide for {{audience}} readers of:

<product>
{{product}}
</product>

Source material:
<known_issues>
{{known_issues}}
</known_issues>

1. Cluster the source material into distinct symptoms, the way a reader would describe them: an exact error message, a behaviour ("the app hangs on login"), or a missing result ("the webhook never arrives"). Merge reports of the same problem; split reports that share a message but have different causes.
2. Order symptoms by how often they appear in the source material, most frequent first, and group them by when they happen (install and setup, sign-in, everyday use, upgrades, performance) if there are more than about eight.
3. For each symptom write:
   - a heading using the reader's words or the exact error text, so it matches what they search for;
   - "Applies to": versions, platforms or configurations, if known;
   - likely causes in order of likelihood and cheapness to check, each with a quick check that confirms or rules it out (a setting to look at, a command with what its output should show, a log line to search for);
   - the fix for each cause as numbered steps, with expected results, and any data-loss or downtime risk stated before the step that carries it;
   - "Still stuck?": when to escalate, where, and exactly what to include (versions, logs with sensitive values removed, the output of the diagnostic commands, steps to reproduce).
4. Match the audience: for user, use interface paths and plain words, no command line; for developer, include code, configuration and API calls; for operator, include commands, log locations, metrics and service restarts.
5. Add a short "Before you start" section with the checks that solve many problems at once (version, status page, network, restarting the right component), only if the source material supports them.
6. After the guide, list gaps: symptoms with no known resolution, contradictions between reports, fixes that look like workarounds for a bug that should be fixed in the product, and error messages that should be improved.
</task>

<constraints>
- Use only causes, commands, settings and fixes that appear in the source material or follow directly from it. Mark anything you inferred with "(unverified)" and list it under gaps.
- Never include customer names, emails, account ids, tokens or other personal data from the tickets.
- Keep each fix actionable: no "check your settings" without saying which setting and what value to expect.
- Do not invent version numbers, URLs or support contacts; use placeholders such as [SUPPORT LINK].
</constraints>

<output_format>
## Guide
The publishable guide in Markdown: a title, a one-paragraph intro saying who it is for, an optional "Before you start", then one subsection per symptom with Applies to, Causes and checks, Fix, and Still stuck.
## Gaps and follow-ups
Table: gap, evidence, suggested owner (docs, support or product).
</output_format>
