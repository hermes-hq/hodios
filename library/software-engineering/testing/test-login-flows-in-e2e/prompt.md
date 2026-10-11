---
schema: 1
id: test-login-flows-in-e2e
kind: prompt
title: Test login, SSO and MFA in E2E tests
description: Tests login, SSO and MFA flows in end-to-end tests with dedicated test identities, programmatic sign-in for other tests, and safe ways around MFA that never weaken production.
category: testing
version: 1.0.0
status: incubating
stage: [build, verify]
role: [qa-engineer, software-engineer, frontend-engineer]
requires: [repo-read, file-write, shell]
inputs: [repo, text]
output: [tests, config]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
tags: [e2e, authentication, sso, mfa, oauth]
pairs_with:
  prompts: [set-up-playwright-in-ci, write-e2e-test, seed-and-clean-e2e-test-data]
  personas: [test-engineer]
args:
  - name: auth_setup
    description: How sign-in works - own password login, OAuth or OIDC provider, SAML SSO, magic links, MFA type (TOTP, SMS, email, passkeys) - and the E2E framework used.
    type: text
    required: true
  - name: environments
    description: Where tests run and what the identity provider offers there (test tenant, sandbox, none).
    type: text
output_contract:
  format: markdown
  sections: [Approach, Login flow tests, Sign-in for other tests, Secrets and safety, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Authentication is where E2E suites get stuck. Two needs must be kept apart: a few tests that verify the sign-in journeys themselves (password, SSO redirect, MFA challenge, lockout, logout, session expiry), and every other test, which just needs to be signed in and should do it programmatically (an API or token call once, saved session state reused) rather than through the UI each time. Third-party identity providers often block automation with bot detection and rate limits, so use their test tenant or sandbox, or stop at the redirect boundary and test your callback handling directly. MFA can be automated honestly: a TOTP secret for the test account generates codes in the test, email or SMS codes are read from a test inbox or the provider's test mode. Disabling MFA or adding a backdoor flag that could ship to production is the failure to avoid; any test-only bypass must be impossible to enable in production.
</context>

<task>
Set up authentication testing for:
{{auth_setup}}
{{#environments}}

Environments: {{environments}}
{{/environments}}

1. Read the auth code, routes, config and the existing E2E setup. Identify the sign-in methods, session mechanism (cookie, token in storage), MFA methods and which identity provider features exist per environment.
2. Plan the approach: which journeys get full UI tests, and how all other tests sign in programmatically.
3. Write the journey tests: successful sign-in per method, wrong password and lockout, MFA challenge with a valid and an invalid code, SSO redirect and callback (via the provider's test tenant, or by testing the callback with a crafted response in a non-production environment if the provider blocks automation), logout, and session expiry behaviour.
4. For MFA, use a dedicated test identity: generate TOTP codes in the test from a secret stored in CI secrets, or fetch email or SMS codes from a test inbox or provider test mode.
5. Write the programmatic sign-in: obtain a session through the app's API or token endpoint once per worker, save it as session state, and reuse it in other tests. Use separate identities per role and per parallel worker where sessions conflict.
6. If any test-only bypass is unavoidable, implement it so it is compiled out or disabled by configuration in production, protected by a secret, and covered by a check that it is off in production.
7. Store all credentials and secrets in the CI secret store; make sure traces, screenshots and logs do not record passwords or codes in plain text where the framework allows masking.
8. Run the tests and report.
</task>

<constraints>
- Never disable MFA or authentication checks for the environment's real users to make tests pass.
- No credentials, TOTP secrets or tokens in the repository or test output.
- Do not automate a third-party provider's production login page against its terms; use test tenants or the callback boundary.
- Ask before creating identities in a shared identity provider.
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Approach
Which journeys get UI tests and how the rest sign in.

## Login flow tests
Diffs of the journey tests.

## Sign-in for other tests
The programmatic sign-in and session reuse.

## Secrets and safety
Identities, secrets, masking and any bypass safeguards.

## Verification
Run results and what could not be tested in this environment.
</output_format>
