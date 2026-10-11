---
schema: 1
id: coordinate-security-release
kind: prompt
title: Coordinate a security fix release
description: Guides open-source maintainers from a confirmed private vulnerability report to a coordinated fix release, with a private fix, CVE request, embargo, downstream notice, advisory text and credit.
category: open-source
version: 1.0.0
status: incubating
stage: [ship]
role: [maintainer]
requires: [none]
inputs: [text]
output: [plan, docs, message]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [coordinated-disclosure, security-advisory, cve, embargo, security-release]
pairs_with:
  prompts: [triage-vulnerability-report, write-security-policy, write-versioning-policy, backport-fix-to-release-branches]
  personas: [open-source-maintainer]
args:
  - name: report
    description: The vulnerability as you have confirmed it - affected component, versions, impact, how it is triggered, the reporter and any deadline they set. Do not paste working exploit code.
    type: text
    required: true
  - name: project
    description: The project, where it is hosted, the package registries it publishes to, supported release lines, how many maintainers can work on this, and notable downstream users or distributions.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Severity and scope, Timeline, Private fix, Identifier and advisory, Downstream notice, Release day, Advisory draft, Reporter messages]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Small projects handle their first real vulnerability under pressure and often leak it: the fix is pushed to a public branch with a revealing commit message, a public issue is opened to "track" it, or CI logs show the test. Coordinated disclosure means fixing in private (a private security fork or patch shared by mail), agreeing a disclosure date with the reporter, getting an identifier (forges that act as CVE numbering authorities can issue one from a draft advisory; otherwise another CNA can), giving distributions and big downstream users a short heads-up under embargo if the issue is serious, then releasing the fix, the advisory and the identifier together. Patch releases for every supported line should ship at the same time, and the advisory should say clearly who is affected and what to do, without a working exploit.
</context>

<task>
Plan the coordinated release of a fix.

<report>
{{report}}
</report>

<project>
{{project}}
</project>

1. Severity and scope: affected versions and configurations, who is realistically exposed, and a severity rating with the reasoning (CVSS vector if the maintainers want one, marked as their decision). Flag anything you need confirmed.
2. Timeline: a dated plan back from a proposed disclosure date, respecting the reporter's deadline and the project's published policy if one exists. Typical pieces: fix ready, review, identifier requested, downstream notice, release. Say what happens if the issue becomes public early or is seen being exploited: release as soon as a fix exists.
3. Private fix: where to develop it privately, who reviews, how to keep CI and commit messages from revealing it, tests to add, and backports to each supported line.
4. Identifier and advisory: how to request a CVE id through the forge's advisory feature or another CNA, the fields needed, and when the advisory goes public.
5. Downstream notice: whether a pre-notice is warranted, who gets it (distribution security teams, large dependents, maintainers of forks), what to share and the embargo terms. Keep the group small.
6. Release day checklist: publish packages to every registry, push the tags and fix commits, publish the advisory, update the changelog, notify the reporter and the downstream list, post a short announcement.
7. Draft the advisory text: summary, affected and fixed versions, impact, workarounds, credit, references.
8. Draft two messages to the reporter: acknowledging and proposing the timeline, and the release-day thanks with credit as they wish to be named.
</task>

<constraints>
- Do not write or include exploit code or step-by-step exploitation in the advisory or any message.
- Do not invent versions, dates, registries or the reporter's name; use placeholders where missing.
- Do not suggest silently fixing without an advisory, or pressuring the reporter to stay quiet indefinitely.
- If the project has no published security policy, add writing one as a follow-up, not a blocker.
{{> output/uncertainty}}
</constraints>

<output_format>
## Severity and scope
Bullets.

## Timeline
Table: Date | Step | Owner.

## Private fix
Numbered steps.

## Identifier and advisory
Bullets.

## Downstream notice
Bullets, or "Not needed" with the reason.

## Release day
Checklist.

## Advisory draft
The advisory text in a fenced block.

## Reporter messages
Two short drafts.
</output_format>
