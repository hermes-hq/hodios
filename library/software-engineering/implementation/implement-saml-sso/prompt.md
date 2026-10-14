---
schema: 1
id: implement-saml-sso
kind: prompt
title: Add enterprise SSO with SAML or OIDC
description: Adds per-customer enterprise single sign-on with SAML or OIDC, domain routing, verified domains, JIT provisioning and strict assertion checks. Use when B2B customers ask for SSO.
category: implementation
version: 1.0.0
status: incubating
stage: [build, design]
role: [backend-engineer, fullstack-engineer, software-engineer, security-engineer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [spec, repo, text]
output: [code, tests]
risk: runs-commands
invocation: user
effort: deep
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [sso, saml, oidc, multi-tenant, authentication, b2b]
pairs_with:
  prompts: [implement-oauth-login, implement-role-based-access, implement-audit-log, implement-user-invitations]
  personas: [backend-engineer]
args:
  - name: requirements
    description: Which identity providers customers use (Okta, Microsoft Entra ID, Google Workspace and so on), SAML, OIDC or both, whether SSO must be enforced per customer, and how users get roles.
    type: text
    required: true
  - name: stack
    description: Language, framework, database and current login method. Leave empty to detect it from the repo.
    type: string
output_contract:
  format: markdown
  sections: [Design decisions, Changes, Tests, Verification, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a backend engineer adding enterprise SSO to a multi-tenant product. Each customer brings their own identity provider, so the work is a per-tenant connection plus careful identity linking. What goes wrong in practice:
- SAML signature checks are subtle. XML signature wrapping attacks succeed when code verifies one element and reads another. Use a maintained SAML library, read user data only from the element whose signature was verified, and check `Audience`, `Recipient` or `Destination`, `NotBefore` and `NotOnOrAfter` with small clock skew, and `InResponseTo` for SP-initiated flows. Keep a replay cache of assertion ids until they expire. IdP-initiated sign-in has no request to match, so make it opt-in per tenant.
- Prefer OIDC when the customer's provider supports it: it is simpler to validate (authorization code flow with PKCE, `state`, `nonce`, issuer and audience checks).
- Home realm discovery routes a user to their company's provider by email domain. Only route, auto-provision or link accounts for domains the tenant has proven it owns (for example a DNS TXT record). Otherwise any tenant can claim `gmail.com` or a competitor's domain and take over accounts.
- Identify users by the provider's stable subject (persistent NameID or `sub`) scoped to the connection, not by email, which can change or be reassigned.
- Just-in-time provisioning creates the user on first sign-in with a default least-privileged role, or maps provider groups to roles if the customer configures it.
- Enforcing SSO for a tenant disables other login methods for its members, but keeps a break-glass path for an owner so a misconfigured provider does not lock everyone out.
- Providers rotate signing certificates; allow two certificates per connection during rollover. Deprovisioning needs SCIM or session expiry; say which applies.
- A hosted SSO broker or the framework's identity product may be cheaper than building; mention it if the team has not decided.
</context>

<task>
Add enterprise SSO:
{{requirements}}

{{#stack}}Stack: {{stack}}{{/stack}}

1. Read the existing auth, tenant, user and role models and the session code. Find any SAML or OIDC library already present.
2. State the design: protocols, library, connection model per tenant (metadata, certificates, client credentials stored encrypted), domain verification, routing, identity linking rule, JIT provisioning and role mapping, enforcement and break-glass, session lifetime.
3. Implement the connection configuration for tenant admins, domain verification, the login entry point with domain routing, the SAML ACS and metadata endpoints and/or OIDC callback, identity linking, JIT provisioning, enforcement, and audit entries.
4. Write tests with signed fixtures, then run them and the type check.
</task>

<constraints>
- Never write your own XML signature verification or parse assertions with ad-hoc XML code.
- Never link an SSO identity to an existing account by email alone unless the domain is verified for that tenant.
- Never log assertions, tokens or client secrets.
- Never invent library functions or options; if unsure, say so and name where to check.
{{> guardrails/scope-discipline}}
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Design decisions
A table: Decision | Choice | Why.
## Changes
One line per file: `path`, what changed.
## Tests
One line per test. Cover at least: unsigned or wrongly signed assertion rejected, wrong audience rejected, expired assertion rejected, replayed assertion rejected, unverified domain not routed or linked, JIT user gets the default role, and enforcement blocks password login except break-glass.
## Verification
Commands run and their actual results.
## Open questions
Choices left to the team, with the default chosen.
</output_format>
