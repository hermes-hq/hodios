---
schema: 1
id: write-bug-bounty-report
kind: prompt
title: Write a bug bounty report
description: Writes a clear bug bounty or disclosure report for an in-scope finding, with summary, affected asset, reproduction steps, honest impact, evidence and remediation in the programme's format.
category: security-operations
version: 1.0.0
status: incubating
stage: [ship]
role: [security-engineer]
requires: [none]
inputs: [notes, text]
output: [report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [bug-bounty, vulnerability-disclosure, cvss, responsible-disclosure, security-research]
pairs_with:
  prompts: [triage-vulnerability-report, review-api-security]
args:
  - name: finding
    description: Your notes on the issue - the asset and endpoint, what you did step by step, requests and responses (with your own test account tokens redacted), what you observed and what you think the impact is.
    type: text
    required: true
  - name: programme_rules
    description: The programme's policy - in-scope and out-of-scope assets, excluded vulnerability classes, testing rules, required report format and severity method.
    type: text
    required: true
  - name: severity_estimate
    description: Your own severity estimate or CVSS vector, if you have one; the report will check it against the evidence.
    type: string
    default: ""
output_contract:
  format: markdown
  sections: [Scope check, Report, Notes for you]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Triage teams read hundreds of reports. The ones that get fixed and paid quickly have a title that states the bug and its impact, steps a stranger can reproduce on the first try, impact proven rather than imagined, and nothing that breaks the programme's rules. Reports get closed or researchers get banned for the opposite: an asset outside scope, data accessed beyond what proves the issue, a severity inflated with theoretical chains, or a wall of scanner output. This prompt writes the report from the researcher's notes, and checks scope and conduct first.
</context>

<task>
Programme rules:
<programme_rules>
{{programme_rules}}
</programme_rules>

Finding notes:
<finding>
{{finding}}
</finding>
{{#severity_estimate}}
Researcher's severity estimate: {{severity_estimate}}
{{/severity_estimate}}

1. Scope check. Confirm the asset is explicitly in scope, the vulnerability class is not excluded, and the testing described stayed within the rules (own accounts only, no denial of service, no social engineering, rate limits respected). If the asset is out of scope, the class is excluded, or the notes show testing that broke the rules, stop: say so plainly, do not write the report, and suggest the appropriate path (the organisation's vulnerability disclosure policy or security contact, or not submitting). If the notes show data was accessed or kept beyond what the rules allow, also tell the researcher to stop testing, not to use or share that data, to delete it securely, and to consider independent legal advice before contacting the organisation.
2. If the notes are missing reproduction steps, the affected endpoint or the observed result, list exactly what to add and stop.
3. Write the report in the programme's required format if one is given; otherwise use the structure below.
   - Title: `<Vulnerability class> in <component or endpoint> allows <attacker position> to <impact>`.
   - Summary: two or three sentences a non-specialist manager can follow.
   - Asset and environment: domain or app, version, account types used.
   - Steps to reproduce: numbered, exact requests with method, path and the relevant parameters, using placeholders for tokens and personal data, ending with the observed result and the expected secure behaviour.
   - Impact: what an attacker can actually do, demonstrated by the steps. Separate demonstrated impact from plausible escalation, and label the second as unproven.
   - Severity: the programme's method (CVSS version named by the programme, default CVSS v3.1 vector if none) with a one-line justification per metric, checked against the researcher's estimate if given.
   - Evidence: what to attach (screenshots, request and response pairs, a short video), with personal data redacted.
   - Remediation: a specific fix and a defence-in-depth suggestion.
4. Notes for the researcher: where the report could be challenged, any wording that overclaims, and whether to mention data accessed during testing (only the minimum, and say it was not retained).
5. Before answering, re-read the steps as the triager would: could someone with only this report reproduce it, and does every impact claim trace to a step?
</task>

<constraints>
- Proof, not exploitation: the report shows the minimum needed to demonstrate the issue. Never add data extraction, persistence or pivoting beyond what the notes show, and advise against doing more.
- Do not include real personal data, other users' records or secrets in the report; replace them with placeholders and say what was seen in general terms.
- Do not inflate severity. If the researcher's estimate is higher than the evidence supports, say so and give the supported score.
- Keep the tone factual and courteous; no demands, deadlines or threats of disclosure beyond the programme's terms.
{{> output/uncertainty}}
</constraints>

<output_format>
## Scope check
One line verdict (in scope, out of scope, or needs clarification) with the rule it rests on.

## Report
The complete report, ready to paste, using the programme's format or the structure above.

## Notes for you
Up to five bullets.
</output_format>
