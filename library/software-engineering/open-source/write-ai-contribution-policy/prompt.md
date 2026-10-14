---
schema: 1
id: write-ai-contribution-policy
kind: prompt
title: Write a policy on AI-assisted contributions
description: Writes an open-source project's policy on AI-assisted pull requests, issues and security reports, with responsibility rules, template changes and enforcement based on quality, not detection.
category: open-source
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [maintainer, tech-lead]
requires: [none]
inputs: [text]
output: [docs, message, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [ai-generated-code, contribution-policy, low-effort-pull-requests, provenance, community-health]
pairs_with:
  prompts: [write-contributing-guide, design-issue-intake, triage-vulnerability-report]
  personas: [open-source-maintainer]
args:
  - name: project
    description: The project, its licence and any DCO or CLA, what AI-assisted contributions you have seen (good and bad, with rough numbers), and how much maintainer time they cost.
    type: text
    required: true
  - name: stance
    description: Where the maintainers lean, for example ban, allow with disclosure, or allow with full contributor responsibility, and any disagreement between them. Optional.
    type: text
output_contract:
  format: markdown
  sections: [What you are seeing, Options, Recommended policy, Policy text, Template and checklist changes, Enforcement and replies]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
AI tools changed what arrives in maintainers' queues: some contributors use them well, while others send pull requests they do not understand, plausible but wrong bug reports, and security reports describing vulnerabilities that do not exist, each costing review time. Policies range from an outright ban, to required disclosure, to allowing any tool as long as the human contributor understands, tests and answers for the change. Detection tools that claim to spot AI-written text or code are unreliable, so enforceable policies judge the contribution and the contributor's behaviour (can they explain it, did they run it, does it follow the template) rather than guessing how it was written. The provenance and copyright status of generated code is legally unsettled and varies by country; a DCO sign-off is still a human's certification.

Project:
<project>
{{project}}
</project>
{{#stance}}Maintainers' stance: {{stance}}{{/stance}}
</context>

<task>
1. Summarise what the project is seeing and its cost, separating helpful from harmful patterns.
2. Compare the options (ban, disclosure required, contributor responsibility without disclosure, different rules per contribution type) on review cost, enforceability, fairness to contributors with disabilities or limited English who rely on tools, and legal risk as far as it can be described generally.
3. Recommend a policy{{#stance}}, addressing the maintainers' stance and any disagreement{{/stance}}, with stricter rules where the cost of a false report is highest (security reports, large changes).
4. Write the policy text for the contributing guide: what is allowed, what contributors must do (understand, test, disclose if required, answer questions themselves), what happens when they do not, and how this interacts with the DCO or CLA.
5. Template and checklist changes: lines to add to issue, pull request and security templates.
6. Enforcement and replies: a consequences ladder based on behaviour, and saved replies for a low-effort generated pull request, an unverifiable bug report, and a fabricated security report.
</task>

<constraints>
- Do not recommend AI-text or AI-code detectors as evidence; enforcement must rest on the contribution's quality and the contributor's responses.
- Do not give a legal conclusion on copyright in generated code; say it is unsettled, varies by country, and suggest legal advice if the project's risk is high.
- Keep the policy short and specific enough that two maintainers would apply it the same way.
- Replies must be firm and polite, and never mock the contributor.
</constraints>

<output_format>
Use the contract's section headings in order. Options as a table. Policy text, template lines and replies in fenced blocks.
</output_format>
