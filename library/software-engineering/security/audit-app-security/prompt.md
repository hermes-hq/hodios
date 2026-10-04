---
schema: 1
id: audit-app-security
kind: prompt
title: Audit a web application's security
description: Audits a whole web application codebase against the OWASP Top 10, tracing each finding from an entry point to the flaw with a reproducible proof and a fix. Use before launch or an external pentest.
category: security
version: 1.0.0
status: incubating
aliases: [sec-audit]
stage: [review, ship]
role: [security-engineer, software-engineer, tech-lead]
stack: []
requires: [repo-read]
inputs: [repo, config]
output: [report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [owasp, appsec-audit, authorization, injection, cwe]
pairs_with:
  personas: [security-auditor]
  prompts: [audit-input-handling, review-auth-flow, threat-model-feature, review-pr-for-security, audit-dependencies]
args:
  - name: target
    description: The repository, service or directory to audit.
    type: text
    required: true
  - name: context
    description: What the app does, who its users are, how it is deployed, and anything out of scope.
    type: text
  - name: min_severity
    description: Lowest severity to report.
    type: enum
    enum: [low, medium, high, critical]
    default: low
output_contract:
  format: markdown
  sections: [Scope and attack surface, Findings, Checked and clean, Needs context, Next steps]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
This is a whole-application audit, not a diff review: the question is what an attacker can do against the app as it stands. A list of generic OWASP headings with "consider validating input" under each is useless. Every finding must name the entry point an attacker reaches, the path through the code, the flaw, and a proof the team can reproduce on their own environment, so they can fix it and confirm the fix.
</context>

<task>
Audit {{target}}.
{{#context}}Context: {{context}}
{{/context}}
Report findings of severity {{min_severity}} and above.
1. Map the attack surface: routes and handlers, API endpoints, GraphQL resolvers, webhooks, file uploads, background jobs fed by user data, admin areas, and which of them require authentication. Note the framework and its built-in protections.
2. Walk the OWASP Top 10 against that surface, reading code rather than guessing:
   - broken access control: every handler that reads or changes a resource by id checks that the caller may access that resource; admin functions are not reachable by ordinary users;
   - cryptographic failures: secrets in code, weak hashing for passwords, sensitive data sent or stored unencrypted;
   - injection: SQL, NoSQL, OS command, template, LDAP and XSS sinks reached by user input;
   - insecure design: missing rate limits on login and reset, business logic that can be skipped or replayed;
   - security misconfiguration: debug modes, permissive CORS, missing security headers, default credentials, verbose errors;
   - vulnerable components: known-vulnerable dependencies actually used on a reachable path;
   - identification and authentication failures: session fixation, tokens that never expire, weak reset flows;
   - integrity failures: unsigned updates, unsafe deserialisation, untrusted CI inputs;
   - logging and monitoring failures: security events not logged, secrets or personal data in logs;
   - server-side request forgery: user-controlled URLs fetched by the server.
3. For each candidate, trace the path from entry point to sink and check for a guard you missed (middleware, ORM parameterisation, framework auto-escaping). Drop anything you cannot trace.
4. Write a proof for each finding: the request or input that demonstrates it against the team's own local or staging environment, and the result that shows the flaw.
5. Rate severity by impact and how reachable it is (unauthenticated beats authenticated beats admin-only), and give the fix.
</task>

<constraints>
- Report only findings you traced to a concrete entry point and code path. Put suspicions you could not confirm under "Needs context".
- Proofs target the team's own environment only. Never propose testing against production or third-party systems, and never include destructive payloads.
- Fixes use the framework's own mechanisms (parameterised queries, auto-escaping, policy middleware) rather than hand-rolled filters.
- Do not paste real secrets you find; name the file and line and say to rotate them.
{{> guardrails/investigate-before-answering}}
{{> output/uncertainty}}
</constraints>

<output_format>
## Scope and attack surface
What was audited, the entry points found, and what was out of scope.
## Findings
Most severe first. Each: **[critical | high | medium | low]** title — OWASP category and CWE — entry point — code path with file and line — proof (request and expected result) — fix.
## Checked and clean
Categories checked with no finding, and the protection that covers each.
## Needs context
Suspicions that depend on deployment or configuration you could not see, with the question that settles each.
## Next steps
The order to fix in, and what to retest.
</output_format>
