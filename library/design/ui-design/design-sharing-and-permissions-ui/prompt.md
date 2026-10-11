---
schema: 1
id: design-sharing-and-permissions-ui
kind: prompt
title: Design sharing and permissions UI
description: Designs how people share items and set access in a product, with a share dialog, roles, link sharing, inheritance, external guests, access requests and showing who can see what.
category: ui-design
version: 1.0.0
status: incubating
stage: [design]
role: [designer, product-manager, frontend-engineer]
requires: [none]
inputs: [text, spec]
output: [docs, table, copy]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [sharing, access-control-ui, share-dialog, roles, collaboration]
pairs_with:
  prompts: [design-settings-screen, map-user-flow, write-ux-microcopy, spec-roles-and-permissions]
  personas: [product-designer]
args:
  - name: product
    description: What gets shared (documents, folders, projects, boards, records), the hierarchy, who shares with whom (colleagues, clients, public), and the permission model as built or planned.
    type: text
    required: true
  - name: problems
    description: Current issues, for example "people overshare with public links" or "no one knows why they can't open a file". Optional.
    type: text
output_contract:
  format: markdown
  sections: [Sharing scenarios, Roles in plain words, Share dialog, Link sharing, Inheritance and exceptions, Requesting and losing access, Seeing who has access, Copy, Risks and open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Sharing interfaces fail in two directions: too hard, so people email copies and lose control of versions, or too easy, so "anyone with the link" gets set on sensitive files and nobody notices. The fixes are well known: a small set of roles named by what they let people do, a share dialog that shows current access before adding more, link settings that state their reach in plain words, visible inheritance from folders with explained exceptions, an access-request path instead of a dead end, and an owner view of everyone who can see an item. Permission models are set by engineering and security; the interface must reflect them truthfully rather than imply controls that do not exist.
</context>

<task>
<product>
{{product}}
</product>
{{#problems}}

<problems>
{{problems}}
</problems>
{{/problems}}

1. Sharing scenarios: the main ones (share with a colleague, with an external client, publish a link, hand over ownership), with frequency and risk.
2. Roles in plain words: each role with what it allows, kept to as few as the model permits; flag any role the model has that people will not understand.
3. Share dialog: layout, people picker, role selector, current access list, notify toggle and message, warnings for external domains.
4. Link sharing: link scope options described by who can open it, default (most restrictive sensible), expiry and password options if supported, and a visible indicator on items with open links.
5. Inheritance and exceptions: how access flows from parent containers, how an item with different access is shown, what happens when moving items.
6. Requesting and losing access: the screen someone sees without access, the request flow, the owner's approve or deny, and what happens to access when people leave the organisation.
7. Seeing who has access: per-item list and an owner-wide review of external and link sharing.
8. Copy for roles, warnings and empty states.
9. Risks and open questions for engineering and security.
</task>

<constraints>
- Reflect the permission model given; do not invent capabilities. Missing behaviour is an open question.
- Defaults lean towards less exposure; any public option must be explicit.
- Never rely on colour alone to show access level.
</constraints>

<output_format>
## Sharing scenarios
## Roles in plain words
| Role | Can | Cannot |
## Share dialog
## Link sharing
## Inheritance and exceptions
## Requesting and losing access
## Seeing who has access
## Copy
## Risks and open questions
</output_format>
