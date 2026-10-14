---
schema: 1
id: spec-sign-in-and-session-rules
kind: prompt
title: Specify sign-in and session rules
description: Specifies sign-in and session rules for a product, covering sign-in methods, multi-factor, session length and idle timeout, lockout, remembered devices, account recovery and sign-out everywhere.
category: product
version: 1.0.0
status: incubating
stage: [plan, design]
role: [product-manager, security-engineer, backend-engineer, business-analyst]
stack: []
requires: [none]
inputs: [spec, notes, text]
output: [docs, table, questions]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [authentication, sessions, mfa, account-recovery, requirements]
pairs_with:
  prompts: [review-auth-flow, implement-oauth-login, spec-team-invitation-flow]
args:
  - name: product_context
    description: The product, its users (consumers, business users, admins), devices, and data sensitivity.
    type: text
    required: true
  - name: requirements_known
    description: Customer or contractual demands (SSO, MFA enforcement, session limits), current behaviour and pain points.
    type: text
output_contract:
  format: markdown
  sections: [Sign-in methods, Multi-factor, Sessions, Lockout and recovery, Account security events, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Sign-in rules are a trade-off between security, support cost and friction, and the right answer differs for a consumer app, a banking-grade product and a B2B tool sold to enterprises with single sign-on. Product specs often skip the decisions that cause incidents and tickets: how long a session lasts and whether activity extends it, what happens to other sessions after a password change, whether lockout punishes the real user (attackers can lock accounts on purpose), how account recovery works when the second factor is lost (the weakest link is often the recovery path, not the login), how SSO-enforced organisations handle a user who also has a password, and which events users are told about. Current guidance from bodies such as NIST and OWASP favours long passphrases, breached-password checks, and phishing-resistant factors over forced periodic password changes and complex composition rules; the security team should confirm the final choices.
</context>

<task>
<product_context>
{{product_context}}
</product_context>
{{#requirements_known}}
<requirements_known>
{{requirements_known}}
</requirements_known>
{{/requirements_known}}

1. Specify sign-in methods: password, email link, passkeys, social sign-in, enterprise SSO; which are offered to whom; password rules; linking methods to one account; and SSO enforcement for organisations, including admins' break-glass access.
2. Specify multi-factor: which factors, who must use it (optional, required for admins, enforceable by organisation), enrolment, remembered devices and for how long, and step-up checks before sensitive actions.
3. Specify sessions: absolute and idle timeouts per platform and per role as proposals, what extends a session, concurrent sessions, what a password, email or role change does to other sessions, and "sign out everywhere".
4. Specify lockout and recovery: throttling that limits attackers without locking out the real user, recovery when the password or the second factor is lost, identity checks for support-assisted recovery, and email change protections.
5. Specify account security events: which events notify the user (new device, password changed, MFA disabled, email changed), what the message contains, and what the user can do from it.
6. List open questions for product and for the security team, each with a recommended default marked as a proposal.
</task>

<constraints>
- Do not specify cryptographic algorithms, token formats or storage; those belong to the security design and implementation.
- Present timeouts and thresholds as proposals with the trade-off, never as universal standards.
- Do not claim the result satisfies a specific regulation or certification; flag requirements that customers' compliance teams must confirm.
- Recovery flows must not be weaker than sign-in; call out any proposal that would make them so.
- If the user type and data sensitivity are unknown, ask before setting defaults.
</constraints>

<output_format>
## Sign-in methods
Table: method, offered to, notes.
## Multi-factor
Numbered rules.
## Sessions
Table: setting, proposal, trade-off.
## Lockout and recovery
Numbered rules.
## Account security events
Table: event, notification, user action available.
## Open questions
Two numbered lists: product decisions, security team decisions, each with a recommended default (proposal).
</output_format>
