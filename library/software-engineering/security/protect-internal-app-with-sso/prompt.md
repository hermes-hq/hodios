---
schema: 1
id: protect-internal-app-with-sso
kind: prompt
title: Put an internal tool behind company SSO
description: Puts an internal tool or admin panel behind company single sign-on with an identity-aware proxy or OIDC middleware, group-based access and no public login page.
category: security
version: 1.0.0
status: incubating
stage: [design, build]
role: [devops-engineer, security-engineer, backend-engineer, software-engineer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [repo, config, text]
output: [config, code, plan]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [single-sign-on, identity-aware-proxy, zero-trust, internal-tools]
pairs_with:
  prompts: [implement-saml-sso, implement-oauth-login, write-reverse-proxy-config, review-cloud-iam-policy]
  personas: [security-auditor]
args:
  - name: app
    description: The internal app (Grafana, an admin panel, a self-hosted tool, a custom service), how it is reached today, and who should use it.
    type: text
    required: true
  - name: environment
    description: Hosting, identity provider (Okta, Entra ID, Google Workspace) and existing proxy or ingress.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Current exposure, Approach, Changes, Access groups, Verification, Rollout]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Internal tools are a favourite way in: an admin panel on a public URL with a shared password, a default `admin` account, or a "hidden" subdomain found through certificate transparency logs. The robust pattern puts authentication in front of the app instead of inside it: an identity-aware proxy (the cloud provider's IAP, Cloudflare Access, Pomerium, oauth2-proxy or the ingress controller's external auth) checks the company identity provider and group membership before any request reaches the app, so unpatched login pages and app bugs are not reachable from the internet. The app must then trust only the proxy: it is not reachable directly (private network, firewall to the proxy's addresses, or verifying the proxy's signed identity header), and it never trusts a plain `X-Forwarded-User` header anyone could send. Off-the-shelf tools often support OIDC natively, which can replace their local accounts. Access should come from identity provider groups rather than per-person lists, local admin accounts should be disabled or kept as a sealed break-glass account, and leavers lose access when the identity provider account is disabled. Webhooks and health checks that must stay public need narrowly scoped exceptions.
</context>

<task>
Protect {{app}} with company SSO.
Environment: {{environment}}

1. Read the deployment and ingress configuration and the app's own auth settings. Determine how it is reachable today (public URL, VPN, IP allowlist) and which local accounts exist.
2. Choose the approach: the platform's identity-aware proxy, a self-hosted auth proxy, or the app's native OIDC support (often combined with the proxy). Say why.
3. Write the configuration: proxy or ingress auth settings, the OIDC client registration details the identity provider admin needs (redirect URIs, scopes, group claims), allowed groups, session lifetime, and passing identity to the app through a signed header or OIDC.
4. Close the bypasses: make the app reachable only through the proxy, verify the proxy's signed assertion in the app if it reads identity, remove or disable local accounts except a documented break-glass account, and scope exceptions for webhooks or health checks to exact paths.
5. Map identity provider groups to app roles where the app supports it.
6. Give verification steps: an unauthenticated request is redirected, a user outside the group is denied, direct access to the app's backend address fails, a forged identity header is ignored.
</task>

<constraints>
- Do not apply changes to production infrastructure or the identity provider yourself; write the config and the steps for the team.
- Do not leave the app reachable directly with only a header check for identity.
- Never commit client secrets; reference the existing secret store.
- Plan the cutover so current users are not locked out; keep the old access path until SSO is confirmed working.
{{> guardrails/investigate-before-answering}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Current exposure
How the app is reached now and what an outsider can see.
## Approach
The chosen design and why, in a few sentences.
## Changes
One line per file: `path`, what changed, plus the settings the identity provider admin must apply.
## Access groups
Table: identity provider group, app role, who is in it.
## Verification
Numbered checks and their expected results.
## Rollout
Cutover order, break-glass account handling, and how to roll back.
</output_format>
