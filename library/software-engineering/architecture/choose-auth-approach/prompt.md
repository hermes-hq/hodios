---
schema: 1
id: choose-auth-approach
kind: prompt
title: Choose how an app authenticates users
description: Chooses how an app handles user sign-in, covering sessions versus tokens, a hosted identity provider versus building it, passkeys, social login, MFA and refresh, for its clients and risk.
category: architecture
version: 1.0.0
status: incubating
stage: [design]
role: [architect, fullstack-engineer, backend-engineer, founder]
requires: [none]
inputs: [spec, text, document]
output: [adr, table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [authentication, sessions, identity-provider, passkeys, build-vs-buy]
pairs_with:
  personas: [software-architect]
  prompts: [review-auth-flow, implement-password-auth, implement-oauth-login, implement-two-factor-auth]
args:
  - name: app
    description: The product, its clients (server-rendered web, single-page app, mobile apps, APIs for third parties) and who the users are (consumers, businesses, internal staff).
    type: text
    required: true
  - name: requirements
    description: Sign-in methods wanted, MFA, enterprise SSO, compliance, expected user numbers, and budget.
    type: text
  - name: stack
    description: Frameworks and hosting, and any identity tooling already in use.
    type: text
output_contract:
  format: markdown
  sections: [Recommendation, Build or buy, Session model, Sign-in methods, Account recovery and security, What would change the answer, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Authentication decisions made in the first week tend to stay for years and are expensive to migrate, because every user's credentials and sessions depend on them. The two big questions are build versus buy, and the session model. Hosted identity providers and mature framework libraries handle password hashing, MFA, social and enterprise login, breach detection and recovery flows that small teams routinely get wrong; their costs are per-user pricing, lock-in of password hashes and user data, and customisation limits. On the session model, server-side sessions in an HttpOnly, Secure, SameSite cookie are the safest default for web apps on one site: they can be revoked instantly and are not readable by scripts. Stateless JWT access tokens suit APIs and mobile clients but need short lifetimes, refresh token rotation and a revocation story; storing them in browser localStorage exposes them to any cross-site scripting bug. Passkeys are now practical as a primary or second factor, and account recovery is where most account takeovers actually happen.
</context>

<task>
<app>
{{app}}
</app>

{{#requirements}}
<requirements>
{{requirements}}
</requirements>
{{/requirements}}

{{#stack}}
<stack>
{{stack}}
</stack>
{{/stack}}

1. If the clients or user type are unclear, ask up to four questions and stop. Otherwise continue and label assumptions.
2. Decide build versus buy: compare a hosted identity provider, a self-hosted open-source identity server, and a framework library, on security work owned, features needed now and soon (MFA, social, enterprise SSO), cost model at the expected user numbers, data portability (can password hashes be exported), and lock-in. Do not name prices.
3. Choose the session model per client: cookie sessions for same-site web, tokens with refresh rotation for mobile and third-party API clients, the backend-for-frontend pattern for single-page apps that need tokens, lifetimes, and revocation on logout and password change.
4. Choose sign-in methods: passwords with hashing and breach checks, passkeys, magic links or one-time codes, social login, enterprise SSO, and MFA policy by user type and risk.
5. Specify account recovery and security: email change and recovery flows, MFA reset, rate limiting and lockout without enabling denial of service, account enumeration resistance, and session listing for users.
6. Say what would change the answer, such as moving upmarket to enterprise customers or adding a native app.
</task>

<constraints>
- Do not recommend storing long-lived tokens in browser localStorage.
- Do not recommend writing custom password hashing or cryptography.
- Do not quote vendor prices or claim vendor features as current facts; say how to check.
- Recovery flows must be at least as strong as sign-in.
{{> output/uncertainty}}
</constraints>

<output_format>
## Recommendation
In at most 6 lines.
## Build or buy
Table: option, security work owned, features, cost model, portability, verdict.
## Session model
Table: client, mechanism, lifetime, revocation.
## Sign-in methods
## Account recovery and security
## What would change the answer
## Open questions
Numbered.
</output_format>
