---
schema: 1
id: spec-app-idea-for-developers
kind: prompt
title: Turn an app idea into a spec developers can quote
description: Interviews a non-technical founder about an app idea, then writes a spec developers or agencies can estimate from, with users, core flows, an MVP cut, integrations, unknowns and open questions.
category: product
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [founder, product-manager, individual]
stack: []
requires: [none]
inputs: [notes, text]
output: [docs, questions, table]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [app-idea, mvp, developer-brief, requirements]
pairs_with:
  prompts: [define-mvp-scope, write-prd, write-website-build-requirements]
args:
  - name: idea
    description: The app idea in your own words, who it is for, and why you think they need it.
    type: text
    required: true
  - name: constraints
    description: Budget range, deadline, platforms you want (iPhone, Android, web), and anything already built or designed.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Users and roles, Core flows, MVP scope, "Platforms, data and integrations", Non-functional needs, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Non-technical founders often send developers a paragraph and receive quotes that differ by a factor of ten, because each developer imagined a different app. What drives cost is rarely the idea itself; it is the number of user types, whether there are payments, messaging, maps, real-time features or an admin panel, which platforms are needed, and what must be in the first version. Developers estimate well from a document that names the users and roles, walks through each core flow step by step, separates must-have from later, lists integrations and data, and states unknowns honestly. This prompt interviews the founder in short rounds about the things that change the estimate, then writes that document in plain language, with a deliberately small first version and an explicit list of what is left out.
</context>

<task>
<idea>
{{idea}}
</idea>
{{#constraints}}
<constraints_from_user>
{{constraints}}
</constraints_from_user>
{{/constraints}}

1. Interview first, in rounds of at most five plain-language questions, waiting for answers each time. Cover: who the users are and whether there are different user types (customers, providers, admins); the one thing each must be able to do; how money flows (payments, subscriptions, payouts, none); communication (notifications, chat); location, maps, photos, files or calendars; platforms and whether the website and app must match; existing tools to connect to; and what success looks like after launch. Stop when you can describe every core flow; never more than three rounds.
2. Write a summary: the problem, the users, the core promise, in a few sentences.
3. List users and roles with what each can do.
4. Write core flows as numbered steps from the user's point of view, including sign-up and the admin side the founder may not have thought of (managing users, content, refunds, support).
5. Cut an MVP: must-have for launch, later, and not planned, with a reason for each cut.
6. List platforms, data and integrations: platforms, the main data the app stores, third-party services likely needed (payments, maps, email, push), and anything legally sensitive (health data, children, payments) flagged for advice.
7. List non-functional needs in plain terms: expected number of users, languages, accessibility, offline use, security expectations.
8. List open questions and what developers should be asked in their quotes (assumptions, what is excluded, who owns the code and accounts, maintenance after launch).
</task>

<constraints>
- Ask before writing; do not produce the spec from a one-line idea without the interview.
- Write for a non-technical reader; explain any technical term in one short phrase.
- Do not estimate costs or timelines as facts; at most explain which choices make the build bigger.
- Keep the MVP small and explain each cut; do not let every idea into version one.
- Flag regulated areas (health, finance, children's data) for proper advice rather than giving rules.
</constraints>

<output_format>
During the interview: numbered questions only.
Then:
## Summary
Short paragraph.
## Users and roles
Table: user type, what they can do.
## Core flows
Numbered steps per flow.
## MVP scope
Table: feature, launch / later / not planned, reason.
## Platforms, data and integrations
Bullets.
## Non-functional needs
Bullets.
## Open questions
Numbered list, then "Ask developers to state" as bullets.
</output_format>
