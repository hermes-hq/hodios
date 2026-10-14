---
schema: 1
id: write-security-exception-request
kind: prompt
title: Write a security policy exception request
description: Writes a request for an exception to a security policy with the business need, the specific risk, compensating controls, an expiry date, a remediation plan and the owner who accepts the risk.
category: writing
version: 1.0.0
status: incubating
stage: [plan]
role: [software-engineer, devops-engineer, tech-lead]
requires: [none]
inputs: [notes, spec]
output: [docs]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [risk-acceptance, security-policy, compensating-controls, security-review, governance]
pairs_with:
  prompts: [write-decision-memo, request-approval-by-email]
args:
  - name: policy
    description: The policy or control you cannot meet, quoted or summarised (for example "all services must use SSO", "no critical CVEs older than 30 days").
    type: text
    required: true
  - name: situation
    description: Why you cannot meet it now, what system and data are involved, what you can do instead, and when you could comply.
    type: text
    required: true
  - name: process
    description: Your organisation's exception form or required fields, if any.
    type: text
output_contract:
  format: markdown
  sections: [Request, Gaps to fill]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Security teams approve exceptions that are narrow, time-boxed and owned, and reject ones that read as "we are too busy". What reviewers look for: the exact control and scope (which systems, which accounts), the concrete risk in terms of what an attacker could do and to what data, compensating controls that actually reduce that risk (not ones that sound good), an expiry date tied to a remediation plan with milestones, and a named business owner with authority who accepts the residual risk. Requests fail when they understate data sensitivity, propose controls nobody will monitor, or ask for an open-ended exception.
</context>

<task>
Write the security exception request.

<policy>
{{policy}}
</policy>

<situation>
{{situation}}
</situation>
{{#process}}
<process>
{{process}}
</process>
{{/process}}

1. State the exact control, and the scope of the exception: systems, environments, accounts, data types. Keep it as narrow as the situation allows.
2. Explain the business need and why compliance is not possible now, with the cost or impact of complying immediately.
3. Describe the risk plainly: what could go wrong, how likely given exposure, what data or systems are at stake. Do not soften it.
4. List compensating controls, each with what risk it reduces and who monitors it. Mark weak ones as weak.
5. Propose an expiry date and a remediation plan with milestones and owners by role.
6. Name the risk acceptor by role and what they are accepting.
7. Add how the exception will be reviewed if circumstances change{{#process}}, and map everything to the organisation's form fields{{/process}}.
</task>

<constraints>
- Never invent controls the team has not agreed to, dates, or data classifications; leave placeholders and list them.
- Do not request an open-ended or permanent exception; if the situation implies one, say a policy change discussion is the right route instead.
- If the situation involves regulated data (payment cards, health, government ids), say the exception may need compliance or legal review too.
- One to two pages.
</constraints>

<output_format>
## Request
Control and scope, Business need, Risk, Compensating controls (table), Expiry and remediation plan, Risk owner, Review triggers.

## Gaps to fill
Placeholders and decisions still needed.
</output_format>
