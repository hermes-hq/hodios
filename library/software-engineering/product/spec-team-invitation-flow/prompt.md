---
schema: 1
id: spec-team-invitation-flow
kind: prompt
title: Specify a team invitation flow
description: Specifies how people join a team or workspace, covering who may invite, seats and billing, invite expiry, existing accounts, domain rules, resends, revocation and removing members.
category: product
version: 1.0.0
status: incubating
stage: [plan, design]
role: [product-manager, business-analyst, fullstack-engineer]
stack: []
requires: [none]
inputs: [spec, ticket, text]
output: [docs, table, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
subject: [saas]
tags: [invitations, workspaces, seats, offboarding, requirements]
pairs_with:
  prompts: [spec-roles-and-permissions, spec-plan-limits-and-entitlements, spec-sign-in-and-session-rules]
args:
  - name: product_context
    description: The product, how teams or workspaces are organised, roles, and how billing works (per seat or not).
    type: text
    required: true
  - name: current_problems
    description: Known issues with the current invite flow, or goals such as faster team growth or enterprise control.
    type: text
output_contract:
  format: markdown
  sections: [Invitation rules, Flow by case, Seats and billing, Removal and offboarding, Messages, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Team invitations look simple and generate a steady stream of edge cases: the invitee already has an account under a different email, belongs to another workspace, clicks an expired or already used link, is invited twice by two admins, or signs up directly instead of through the invite. Per-seat billing raises more: does a pending invite take a seat, who pays for the seat when a member invites a colleague, and what happens when the seat limit is reached. Enterprise customers expect domain controls (anyone with the company email can join, or nobody outside the domain can be invited). Removal is the forgotten half: the removed person's content, ownership, scheduled jobs, API tokens and open sessions all need rules. Invite links are also an abuse vector for spam, so rate limits and who can invite matter.
</context>

<task>
<product_context>
{{product_context}}
</product_context>
{{#current_problems}}
<current_problems>
{{current_problems}}
</current_problems>
{{/current_problems}}

1. Write invitation rules: who can invite, invite by email, by link, or by domain auto-join; role assigned at invite; expiry; single or multi-use links; resend and revoke; rate limits.
2. Specify the flow for each case: new person; existing account with the same email; existing account with a different email; already a member; already in another workspace (if one workspace per person); expired or revoked invite; invite accepted after the inviter was removed.
3. Specify seats and billing: whether pending invites hold a seat, approval when a non-admin invites, behaviour at the seat limit, and proration questions to hand to billing.
4. Specify removal and offboarding: who can remove, what happens to the person's content and ownership, shared items, scheduled jobs, integrations they connected, API tokens and open sessions; whether they are told; and rejoining later.
5. Write the key messages: invite email subject and body outline, error messages for each failed case, and notifications to admins.
6. List open questions with a recommended default marked as a proposal.
</task>

<constraints>
- Invite links and emails must not reveal more about the workspace than the invitee needs before accepting.
- Removing a member never deletes shared work by default; ownership transfers are explicit.
- Do not set prices or proration amounts; flag them for the billing owner.
- If the product allows one workspace per account or many, ask when it is not stated, since the flows differ.
</constraints>

<output_format>
## Invitation rules
Numbered rules.
## Flow by case
Table: case, what the invitee sees, what the system does.
## Seats and billing
Bullets.
## Removal and offboarding
Table: item, what happens on removal.
## Messages
Bullets with outline wording.
## Open questions
Numbered: question, recommended default (proposal).
</output_format>
