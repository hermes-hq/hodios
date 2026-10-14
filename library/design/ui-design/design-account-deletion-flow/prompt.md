---
schema: 1
id: design-account-deletion-flow
kind: prompt
title: Design an account deletion flow
description: Designs an honest account closure and deletion flow with where it lives, what is deleted or kept, data export, subscriptions and shared content, confirmation, grace period and follow-up messages.
category: ui-design
version: 1.0.0
status: incubating
stage: [design]
role: [designer, product-manager, mobile-engineer]
requires: [none]
inputs: [text, spec]
output: [docs, copy, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [account-deletion, account-closure, data-export, offboarding, privacy-ux]
pairs_with:
  prompts: [design-settings-screen, review-design-for-dark-patterns, write-ux-microcopy, design-churn-save-flow]
  personas: [product-designer, ux-writer]
args:
  - name: product
    description: What the product is, what data and content an account holds (including content shared with others, team workspaces, purchases), and any linked subscriptions or balances.
    type: text
    required: true
  - name: policy
    description: What the business actually deletes, what it must keep and for how long (as decided by legal or privacy), grace period, and platforms (web, iOS, Android). Optional; gaps will be marked.
    type: text
output_contract:
  format: markdown
  sections: [Principles, Where it lives, Flow step by step, Edge cases, What is deleted and kept, Messages, Ethics check, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
People who want to delete an account have usually decided; a flow that hides the option, demands a phone call, or guilt-trips them damages trust and in many places breaks platform rules or data protection law. A good flow is easy to find in settings, explains in plain words what will be deleted, what is kept and why, offers a data export first, deals with active subscriptions (which may be billed through an app store and must be cancelled there), handles shared and team content explicitly, confirms identity proportionately, and offers a grace period to undo. A single optional "why are you leaving?" question is fine; a retention offer can appear once, never as a barrier.
</context>

<task>
<product>
{{product}}
</product>
{{#policy}}

<policy>
{{policy}}
</policy>
{{/policy}}

1. Principles for the flow (three to five).
2. Where it lives: path in settings on each platform, and how support or help pages point to it.
3. Flow step by step: entry, explanation of consequences, data export offer, subscription and balance handling, shared or team content decisions, optional reason, re-authentication, final confirmation with a clear destructive button, confirmation screen.
4. Edge cases: app-store-billed subscriptions, team owner leaving a workspace, unpaid balance, account under legal hold, person who cannot sign in, deletion requested via support.
5. What is deleted and kept: a table from the policy; gaps marked [to confirm with legal/privacy].
6. Messages: confirmation email, reminder before the grace period ends, final notice.
7. Ethics check against confirmshaming, hidden paths and obstruction.
8. Open questions.
</task>

<constraints>
- Do not state legal retention periods or obligations as fact; mark them for legal or privacy to confirm.
- No dark patterns: no guilt copy, no disguised buttons, no extra steps whose purpose is to discourage.
- Re-authentication must be proportionate and offer a route for people locked out.
</constraints>

<output_format>
## Principles
## Where it lives
## Flow step by step
## Edge cases
## What is deleted and kept
| Data | Deleted | Kept | Why and for how long |
## Messages
## Ethics check
## Open questions
</output_format>
