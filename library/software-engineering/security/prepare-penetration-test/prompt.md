---
schema: 1
id: prepare-penetration-test
kind: prompt
title: Prepare for a penetration test
description: Prepares a team for an external penetration test with scope, test type, rules of engagement, written authorisation, test accounts, pre-test fixes, vendor questions and a plan for findings and retest.
category: security
version: 1.0.0
status: incubating
stage: [plan, verify]
role: [security-engineer, engineering-manager, tech-lead]
stack: []
requires: [none]
inputs: [text, spec]
output: [plan, checklist, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [penetration-testing, rules-of-engagement, test-scoping, security-assessment, vendor-selection]
pairs_with:
  prompts: [audit-app-security, threat-model-feature, triage-vulnerability-report]
  personas: [security-auditor]
args:
  - name: situation
    description: What is being tested (web app, API, mobile app, cloud account, internal network), why (customer request, certification, launch), the hosting setup, budget or days if known, and the deadline.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Goal and scope, Test type and depth, Rules of engagement, Before the test, Questions for vendors, During and after the test]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most of a penetration test's value is decided before it starts. A vague scope buys a scanner run with a logo; a test against an environment that differs from production finds the wrong things; testers who spend two days getting accounts working have three days left. Good preparation fixes the obvious findings first (automated scanners, dependency alerts, known issues) so paid time goes to logic and authorisation flaws; chooses grey-box testing with documentation and accounts for each role when depth matters more than simulating an outsider; writes rules of engagement (windows, rate limits, production or staging, data handling, social engineering in or out, an emergency stop contact); and gets written authorisation from whoever owns every in-scope asset, including checking the hosting and cloud providers' testing policies. After the test, findings need owners, deadlines and a retest included in the contract.
</context>

<task>
Situation: {{situation}}

1. State the goal (what decision or evidence the test serves) and the scope: assets in and out, environments, user roles, third-party services excluded, and the reason for each exclusion.
2. Recommend the test type and depth (black, grey or white box; authenticated or not; days of effort as a range the vendor should confirm) for this goal, and say what each choice would miss.
3. Draft rules of engagement: test window and time zone, source IP ranges, rate limits, production versus staging, data handling and destruction, out-of-bounds actions (denial of service, social engineering, physical), the emergency stop and contacts.
4. Before the test: written authorisation from asset owners; check hosting, cloud and third-party testing policies; prepare test accounts for each role and seeded data; give documentation and architecture overview; run your own scanners and fix easy findings; warn monitoring and on-call teams, or decide deliberately not to if detection is part of the test; freeze risky changes.
5. Questions for vendors: methodology, tester experience for this kind of target, how findings are rated, sample report, retest terms, data handling, insurance, and who does the work.
6. During and after: a daily check-in, immediate escalation of critical findings, how the report will be triaged (owners, deadlines by severity), retest, and what can be shared with customers (a summary letter rather than the full report).
</task>

<constraints>
- Do not quote prices, durations or legal requirements as facts; give ranges for the vendor to confirm and name where legal or the asset owner must sign off.
- Never plan testing of assets the organisation does not own or control without the owner's written permission.
- Keep the plan neutral about vendors; no product or company recommendations.
{{> output/uncertainty}}
</constraints>

<output_format>
## Goal and scope
Goal in one sentence, then a table: asset | in or out | environment | reason.
## Test type and depth
Recommendation and what it would miss.
## Rules of engagement
A draft ready to send.
## Before the test
Checklist with owners.
## Questions for vendors
Numbered list.
## During and after the test
Bullets.
</output_format>
