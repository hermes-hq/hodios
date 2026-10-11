---
schema: 1
id: spec-share-link-feature
kind: prompt
title: Specify a share link feature
description: Specifies shareable links to items, with who can create them, access levels, sign-in requirements, expiry and passwords, revocation, link previews, search engine exposure and audit of access.
category: product
version: 1.0.0
status: incubating
stage: [plan, design]
role: [product-manager, business-analyst, fullstack-engineer, security-engineer]
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
tags: [sharing, public-links, access-control, requirements]
pairs_with:
  prompts: [spec-roles-and-permissions, list-feature-edge-cases, spec-comments-and-mentions]
args:
  - name: feature_description
    description: What can be shared by link (documents, dashboards, files, quotes), with whom, and why people want to share.
    type: text
    required: true
  - name: context
    description: Existing roles and sharing, plans, data sensitivity, and enterprise admin controls customers expect.
    type: text
output_contract:
  format: markdown
  sections: [Link types, Creation rules, Access by viewer, Expiry and revocation, Leak risks, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Share links trade control for convenience. Anyone holding the URL can usually open it, and URLs leak: forwarded emails, chat previews that fetch the page, browser history on shared computers, referrer headers, pasted into public forums, and indexed by search engines if the page is reachable and not marked otherwise. A useful spec separates "anyone with the link" from "people in my organisation with the link" and from named-people sharing, decides whether the link shows a live view or a snapshot, gives creators expiry, password and revoke controls, and gives organisation admins the power to restrict or disable public links. It also covers what happens when the creator loses access or leaves, and what viewers can do beyond viewing: download, copy, comment, see who else viewed.
</context>

<task>
<feature>
{{feature_description}}
</feature>
{{#context}}
<context_from_user>
{{context}}
</context_from_user>
{{/context}}

1. Define the link types offered (anyone with link, organisation-only, specific people, embed) and whether each shows live content or a snapshot.
2. Specify creation rules: who can create each link type, organisation admin controls (disable public links, require expiry, allowed domains), plan restrictions, and default settings.
3. Specify access by viewer: what an anonymous viewer, a signed-in outsider and a member each see and can do (view, download, copy, comment, see the owner and other viewers), and what is hidden (internal comments, version history, related items).
4. Specify expiry and revocation: expiry options, password protection, regenerate link, revoke one or all links, effect on open sessions and already-downloaded copies, and what happens when the item is moved, deleted or the creator loses access.
5. Address leak risks: search engine indexing, chat and email link previews, unguessable link format, rate limiting, and an access log of who opened the link and when, visible to the right people.
6. List open questions with a recommended default marked as a proposal.
</task>

<constraints>
- Never describe "anyone with the link" as private; state its exposure plainly in the UI copy proposals.
- Revoking a link cannot recall downloaded copies; say so wherever revocation is described.
- Do not specify the token format or cryptography; state the requirement (unguessable, revocable) only.
- Flag sharing of personal or regulated data for privacy review rather than deciding it is acceptable.
- If what can be shared is unclear, ask before writing rules.
</constraints>

<output_format>
## Link types
Table: type, who can open, live or snapshot.
## Creation rules
Numbered rules, including admin controls and defaults.
## Access by viewer
Table: viewer type, can see, can do, hidden.
## Expiry and revocation
Bullets.
## Leak risks
Table: risk, mitigation.
## Open questions
Numbered: question, recommended default (proposal).
</output_format>
