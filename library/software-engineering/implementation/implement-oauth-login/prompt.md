---
schema: 1
id: implement-oauth-login
kind: prompt
title: Implement OAuth or OIDC login
description: Implements login with an OAuth 2 or OpenID Connect provider, covering flow choice, PKCE, state and nonce, token storage, sessions and logout. Use when adding social or SSO login.
category: implementation
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer, fullstack-engineer, frontend-engineer, mobile-engineer]
stack: []
requires: [repo-read, file-write]
inputs: [text, repo, config]
output: [code, tests, checklist]
risk: edits-files
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [oauth2, oidc, pkce, sso, session-management]
pairs_with:
  personas: [backend-engineer, security-auditor]
  prompts: [review-auth-flow, harden-web-app-config, plan-secrets-management]
args:
  - name: stack
    description: The app type (server-rendered web, single-page app with a backend, SPA only, mobile, CLI), language and framework, and how sessions work today.
    type: text
    required: true
  - name: provider
    description: The identity provider, for example Google, Microsoft Entra ID, Okta, Auth0, GitHub (OAuth only), Keycloak or a generic OIDC issuer.
    type: string
output_contract:
  format: markdown
  sections: [Flow choice, Provider setup, Code, Security checklist, Tests, Open questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Current best practice (OAuth 2.0 Security Best Current Practice, RFC 9700) is the authorization code flow with PKCE for every client type, including confidential server apps; the implicit flow and the password grant are deprecated. Login bugs are rarely in the happy path: a missing or unchecked `state` enables login CSRF, a missing `nonce` check allows token replay, ID tokens accepted without checking issuer, audience, expiry and signature let anyone forge a login, access tokens stored in browser local storage are exposed to any XSS, and logout that only clears the app cookie leaves the provider session alive. OAuth alone (for example GitHub) gives authorization, not identity; identity needs OIDC's ID token or a trusted user-info call. A maintained, certified client library beats hand-rolled protocol code.
</context>

<task>
Implement login for:
<stack>
{{stack}}
</stack>
{{#provider}}
Provider: {{provider}}
{{/provider}}

1. If the app type or framework is unclear, ask once and stop. Read the existing auth and session code if you can, and fit into it.
2. **Flow choice.** Authorization code with PKCE (S256). For a single-page app, prefer a backend-for-frontend that holds tokens server-side and gives the browser an HttpOnly session cookie; explain the trade-off if the user insists on tokens in the browser. For native and CLI apps, use the system browser with a loopback or claimed redirect URI, never an embedded web view. Say whether the provider is OIDC or OAuth-only and how identity is established.
3. **Provider setup.** Exact redirect URIs per environment, scopes (minimal: `openid email profile` for OIDC), and which values are secrets. Use discovery (`.well-known/openid-configuration`) where supported.
4. **Code**, using a maintained library for the stack (name it and why):
   - Start login: generate `state`, `nonce` and the PKCE verifier, store them server-side or in a short-lived, signed, HttpOnly cookie bound to the browser, then redirect.
   - Callback: check `state`, exchange the code with the verifier, validate the ID token (signature through the provider's JWKS, `iss`, `aud`, `exp`, `nonce`), and handle the error parameter.
   - Account linking: key users by issuer plus subject (`iss` + `sub`), never by email alone; only trust email if the provider marks it verified, and decide explicitly how to link an existing local account.
   - Session: create the app session with a rotated session id, cookies `HttpOnly`, `Secure`, `SameSite=Lax` (or stricter), and a sensible lifetime. Store refresh tokens encrypted server-side only if the app calls provider APIs offline.
   - Logout: clear the app session, and use the provider's RP-initiated logout where the product needs single sign-out.
5. **Tests.** State mismatch, nonce mismatch, expired or wrong-audience ID token, provider error callback, a first login creating the user, and a returning login linking to the same user. Mock the provider at the HTTP boundary or use a local test identity provider.
</task>

<constraints>
- Never implement the implicit flow or the password grant, and never put client secrets in front-end or mobile code.
- Never store access or refresh tokens in local storage or session storage.
- Use the library's documented API; if you are unsure of a function name or option for the version in use, say so rather than guessing.
- Do not invent client ids, secrets or tenant ids; use environment variables with placeholder names.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Flow choice
Short justification.
## Provider setup
A table: setting, value per environment, secret (yes or no).
## Code
Code blocks with file paths.
## Security checklist
Checkboxes covering every item in step 4.
## Tests
Code blocks with file paths, then the real result of running them, or a plain statement that they were not run.
## Open questions
Numbered, or "None".
</output_format>
