---
schema: 1
id: write-security-policy
kind: prompt
title: Write a security policy and disclosure process
description: Writes a SECURITY.md and the disclosure process behind it, with supported versions, how to report, response times and safe harbour. Use when a project has no clear way to report vulnerabilities.
category: security
version: 1.0.0
status: incubating
stage: [ship, maintain]
role: [maintainer, security-engineer, tech-lead, engineering-manager]
stack: []
requires: [none]
inputs: [text, repo]
output: [docs, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [security-md, vulnerability-disclosure, coordinated-disclosure, safe-harbour, cve]
pairs_with:
  personas: [security-auditor, open-source-maintainer]
  prompts: [triage-vulnerability-report, write-contributing-guide, audit-dependencies]
args:
  - name: project
    description: The project, whether it is open source or a company product, release cadence and which versions get fixes, maintainers' capacity, and existing channels (private vulnerability reporting, a security email, a bug bounty).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Assumptions, SECURITY.md, Internal process, Setup checklist, Open questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A security policy tells a researcher who has found a vulnerability exactly where to send it privately, what to include, how fast they will hear back, and that acting in good faith will not get them sued. Without one, reports land in public issues, or researchers give up. Policies fail when they promise response times the maintainers cannot meet, list an inbox nobody reads, name supported versions that do not match reality, or use legal threats as tone. The policy must match the project's real capacity, and an internal process must exist behind it.
</context>

<task>
Write the security policy for:
<project>
{{project}}
</project>

1. State your assumptions about capacity, channels and supported versions. If the private reporting channel or the supported versions are unknown, use placeholders like `[SECURITY CONTACT]` and list them under Open questions; do not invent an email address.
2. Write `SECURITY.md` with these sections:
   - **Supported versions:** a table of version ranges and whether they receive security fixes, matching the release policy given.
   - **Reporting a vulnerability:** the private channel (for example the repository host's private vulnerability reporting, or a security email with an optional encryption key), an explicit "do not open a public issue", and what to include: affected version, component, reproduction steps or proof of concept, impact, and whether it is already public.
   - **What to expect:** acknowledgement, triage and update times the team can actually meet (for a volunteer project, days rather than hours), how fixes and advisories are coordinated, a default disclosure deadline (90 days is a common norm) and how extensions are agreed, and credit for the reporter if they want it.
   - **Scope:** what is in scope, and what is out (third-party dependencies to report upstream, social engineering, denial of service by volume, findings that need a compromised machine), if the project wants that.
   - **Safe harbour:** good-faith research within the policy is welcome and will not be pursued; the researcher must avoid privacy violations, data destruction and service disruption, and only access data needed to show the issue.
   - **Bug bounty:** say whether one exists; never imply rewards that do not exist.
3. Write the internal process maintainers follow: who watches the channel, triage and severity scoring (for example CVSS), a private fix branch or private fork, requesting a CVE or advisory id, coordinating with downstream users if needed, release and advisory publication, and crediting the reporter.
4. Give a setup checklist: enable the private reporting feature, test the inbox, add the policy link to README and the issue template chooser, and set a calendar reminder to review the policy.
</task>

<constraints>
- Response times must fit the stated capacity; if capacity is unknown, use conservative times and say so.
- Keep the tone welcoming and plain. No threats, no legalese beyond the safe harbour paragraph.
- The safe harbour text is a template, not legal advice. Say that a company should have counsel review it, especially where it promises not to pursue legal action.
- Do not invent contact addresses, key fingerprints, bounty amounts or company names.
</constraints>

<output_format>
## Assumptions
Bullets.
## SECURITY.md
The complete file in a fenced Markdown block.
## Internal process
Numbered steps with owners and target times.
## Setup checklist
Checkboxes.
## Open questions
Numbered, or "None".
</output_format>
