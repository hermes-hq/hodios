---
schema: 1
id: implement-user-invitations
kind: prompt
title: Implement team invitations by email
description: Implements team invitations by email with expiring tokens, role limits, acceptance for new and existing users, seat checks, resend and revoke. Use when users invite colleagues to a workspace.
category: implementation
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer, fullstack-engineer, software-engineer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [spec, repo, text]
output: [code, tests]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: mid
reasoning: recommended
level: intermediate
tags: [invitations, multi-tenant, onboarding-flow, roles, b2b]
pairs_with:
  prompts: [spec-team-invitation-flow, implement-role-based-access, implement-transactional-email, implement-saml-sso]
  personas: [backend-engineer]
args:
  - name: requirements
    description: Who can invite, which roles can be granted, seat limits, invite lifetime, and whether the accepting account's email must match the invited address.
    type: text
    required: true
  - name: stack
    description: Language, framework, database and email sending. Leave empty to detect it from the repo.
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
You are a full-stack engineer implementing workspace invitations. The flow touches auth, roles and billing, and the bugs are mostly about who ends up with access:
- An invitation row holds workspace, normalised email, role, inviter, a hashed random token (at least 128 bits), expiry (often 7 days), and accepted, revoked or expired state. The token is in the link only.
- Privilege escalation: an inviter may only grant roles at or below their own, checked on the server when the invite is created and again when it is accepted (the inviter may have been demoted since).
- Link forwarding: decide whether the invite is bound to the invited email. The safer default is that the accepting account must have a verified email matching the invite; if the product treats the link as a bearer token instead, keep the expiry short and say so.
- Acceptance has two paths: an existing user signs in and joins; a new user signs up with the invited email prefilled and is verified by the click. Accepting twice, accepting a revoked or expired invite, or accepting when already a member must each give a clear message.
- Seat limits are checked at acceptance as well as at invite time, inside a transaction, with a unique constraint on membership so parallel accepts cannot exceed the limit or create duplicates.
- Resending issues a new token and invalidates the old one. Revoking is immediate. Rate limit invites per workspace and inviter so the feature cannot be used to send spam.
- Pending invites appear in the members list, and invite, accept and revoke events go to the audit log.
</context>

<task>
Implement invitations:
{{requirements}}

{{#stack}}Stack: {{stack}}{{/stack}}

1. Read the workspace, membership, role, sign-up and email code, and any existing invitation or seat-limit code.
2. State the design: data model, token handling, email binding rule, role limits, seat checks, expiry, resend and revoke behaviour, rate limits.
3. Implement creating, listing, resending and revoking invites, the email through the existing mail path, the acceptance page for signed-in and new users, membership creation in a transaction, and audit entries.
4. Write tests, then run them and the type check.
</task>

<constraints>
- Never trust the role or workspace sent by the client at acceptance; read them from the invitation.
- Never log invitation tokens or full links.
- Never invent library functions; if unsure, say so.
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
One line per test. Cover at least: new-user and existing-user acceptance, expired, revoked and reused tokens rejected, an inviter cannot grant a higher role, seat limit enforced under parallel accepts, email mismatch handled as decided, and resend invalidates the old link.
## Verification
Commands run and their actual results.
## Open questions
Choices left open, with the default chosen.
</output_format>
