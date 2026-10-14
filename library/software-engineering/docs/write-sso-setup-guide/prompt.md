---
schema: 1
id: write-sso-setup-guide
kind: prompt
title: Write an SSO setup guide for customer admins
description: Writes the customer-facing guide for configuring SAML or OIDC single sign-on with Okta, Microsoft Entra ID and Google Workspace, with field mappings, testing and troubleshooting.
category: docs
version: 1.0.0
status: incubating
stage: [build, ship]
role: [technical-writer, backend-engineer, support-agent]
stack: []
requires: [repo-read, file-write]
inputs: [repo, spec, text]
output: [docs]
risk: edits-files
invocation: user
effort: deep
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [saml, oidc, single-sign-on, identity-provider, scim, admin-guide]
pairs_with:
  prompts: [write-troubleshooting-guide]
args:
  - name: sso_details
    description: How your SSO works - protocols supported, your ACS URL or redirect URI pattern, entity ID, required attributes or claims, just-in-time provisioning, SCIM, domain verification, enforcement and break-glass options.
    type: text
    required: true
  - name: identity_providers
    description: Identity providers to cover.
    type: string
    default: Okta, Microsoft Entra ID and Google Workspace
output_contract:
  format: markdown
  sections: [Guide written, Values admins copy, Questions for the owners]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The reader is a customer's IT admin who sets up dozens of SaaS apps and wants three things: exactly which values to copy from your side to the identity provider and back, which attributes or claims to map, and how to test without locking everyone out. Most SSO support tickets come from a few causes: the ACS URL or entity ID copied with a typo or the wrong tenant ID, the NameID format not matching what the app expects (email versus persistent ID), missing attribute mappings for email or groups, the signing certificate rotated in the IdP and not uploaded to the app, clock skew, users not assigned to the app in the IdP, and enforcing SSO before testing so admins lose access. Each IdP labels the same field differently (Okta "Single sign-on URL", Entra "Reply URL", Google "ACS URL"), so a side-by-side mapping saves the most time.
</context>

<task>
Write the SSO setup guide from these details:

<sso_details>
{{sso_details}}
</sso_details>

Identity providers: {{identity_providers}}.

1. Read the SSO implementation or settings screens if available to confirm URLs, entity IDs, required attributes, NameID format, and the enforcement and fallback options.
2. Write "Before you start": plan or role required, domain verification, who must be involved, and a warning to keep a non-SSO admin or break-glass login until testing passes.
3. Write a table of values the admin copies from your app (ACS or redirect URI, entity ID or audience, metadata URL) and values they bring back from the IdP (SSO URL, issuer, certificate or metadata, client ID and secret for OIDC).
4. For each IdP, write the steps using that IdP's field names, with the attribute or claim mapping table (email, first name, last name, groups) and user assignment.
5. Write "Test before you enforce": test with one user, what success looks like, then how to enforce SSO and what happens to existing sessions and passwords.
6. Cover just-in-time provisioning, SCIM and group-to-role mapping if supported, and certificate rotation.
7. Write troubleshooting for the common causes above, keyed by the error message the admin sees where known.
</task>

<constraints>
- Use only URLs, field names and attribute names from the input or code; use placeholders such as `<your-tenant-id>`. Mark unconfirmed values "to confirm".
- IdP console menus change; describe locations generally and point admins to the IdP's own docs instead of claiming exact click paths you are unsure of.
- Never advise turning off signature validation or sharing secrets over email or chat.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
Write the guide. Then reply with:
## Guide written
Path and IdPs covered.
## Values admins copy
The copy-to and copy-from table as it appears in the guide.
## Questions for the owners
Behaviour to confirm (NameID format, SCIM, enforcement, break-glass).
</output_format>
