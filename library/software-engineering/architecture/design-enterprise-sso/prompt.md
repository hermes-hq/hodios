---
schema: 1
id: design-enterprise-sso
kind: prompt
title: Design enterprise SSO and user provisioning
description: Designs the enterprise identity offering of a B2B SaaS, with per-organisation SSO, SCIM provisioning and deprovisioning, group-to-role mapping, enforcement, admin self-setup and build or buy.
category: architecture
version: 1.0.0
status: incubating
stage: [design]
role: [architect, backend-engineer, tech-lead, product-manager]
subject: [saas]
requires: [none]
inputs: [spec, text, document]
output: [docs, table, plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [enterprise-sso, scim, user-provisioning, saml, identity-lifecycle]
pairs_with:
  personas: [software-architect]
  prompts: [implement-saml-sso, design-organization-account-model, design-authorization-model, choose-auth-approach]
args:
  - name: product
    description: The B2B product, how organisations, users and roles work today, and how users sign in now.
    type: text
    required: true
  - name: customer_asks
    description: What enterprise customers or security questionnaires are asking for, for example "SAML with Okta and Entra ID, SCIM, enforce SSO, automatic deprovisioning".
    type: text
    required: true
  - name: constraints
    description: Team size, existing identity provider or library, timeline, and which plans should include these features.
    type: text
output_contract:
  format: markdown
  sections: [Scope and build or buy, Lifecycle, Provisioning and deprovisioning, Roles and groups, Enforcement and exceptions, Admin setup and support, Rollout, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Enterprise buyers do not just ask for "SSO"; they ask for control of the whole user lifecycle from their identity provider. Sign-in through SAML or OIDC is the visible part. The part that decides security reviews is provisioning: SCIM lets the customer's IdP create, update and above all deactivate users, and a terminated employee must lose access, including existing sessions and API tokens, within minutes. Other recurring issues: users who signed up with a password before SSO existed must be linked, not duplicated; SSO enforcement must leave a break-glass path for an owner when the IdP is misconfigured; contractors and guests with other email domains need a policy; IdP groups need mapping to product roles, with a decision on whether the IdP or the product is the source of truth for roles. Every IdP implements SCIM slightly differently, which is why many teams buy an identity broker; building it is feasible but needs testing against each major IdP.
</context>

<task>
<product>
{{product}}
</product>

<customer_asks>
{{customer_asks}}
</customer_asks>

{{#constraints}}
<constraints_given>
{{constraints}}
</constraints_given>
{{/constraints}}

1. Define scope and decide build or buy: protocols needed, which IdPs to support first, using a hosted identity broker versus building on libraries, the work each leaves with the team, and lock-in. Do not quote vendor prices.
2. Describe the lifecycle of an enterprise user end to end: invitation or first SSO login, just-in-time creation versus SCIM pre-provisioning, linking of existing password accounts with the same verified email, attribute updates, suspension, deactivation and reactivation, and deletion.
3. Design provisioning and deprovisioning: SCIM endpoints and resources (users, groups), the user attributes stored, idempotency and the quirks to expect from different IdPs, what deactivation does (end sessions, revoke personal tokens, transfer ownership of their content), and the maximum time to revoke access.
4. Design roles and groups: mapping IdP groups to product roles, source of truth for roles, what happens to manual role changes when SCIM sends an update, and default role for new users.
5. Design enforcement and exceptions: requiring SSO for verified domains, break-glass owner access, guests and contractors from other domains, session lifetime and re-authentication, and what happens to existing sessions when enforcement is switched on.
6. Design admin setup and support: self-serve connection setup with test login, domain verification, SCIM token generation and rotation, audit logs of identity events, error messages that help admins fix IdP configuration, and support tooling to diagnose failed logins.
7. Plan the rollout: pilot customers, feature placement by plan, documentation per IdP, and monitoring.
</task>

<constraints>
- Deactivation from the IdP must end existing sessions and revoke tokens, not only block new sign-ins.
- Never link accounts on an unverified email address.
- Always keep a break-glass path that does not depend on the customer's IdP, with strong authentication and audit.
- Do not claim specific IdP behaviours or vendor features as facts without saying they must be checked against current documentation.
{{> output/uncertainty}}
</constraints>

<output_format>
## Scope and build or buy
## Lifecycle
Numbered stages, each with trigger and system behaviour.
## Provisioning and deprovisioning
## Roles and groups
Table: IdP group pattern, product role, source of truth.
## Enforcement and exceptions
## Admin setup and support
## Rollout
## Open questions
Numbered.
</output_format>
