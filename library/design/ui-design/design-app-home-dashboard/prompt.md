---
schema: 1
id: design-app-home-dashboard
kind: prompt
title: Design an app home screen
description: Designs a product's home or overview screen, deciding what to show by user state (new, active, returning, stuck), which modules earn a place, their order, and empty versions.
category: ui-design
version: 1.0.0
status: incubating
stage: [design]
role: [designer, product-manager, founder]
requires: [none]
inputs: [text, spec]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [home-screen, overview-page, personalisation, information-hierarchy, empty-states]
pairs_with:
  prompts: [design-app-navigation, design-onboarding-flow, design-empty-and-error-states, design-customer-facing-dashboard, critique-ui-screen]
  personas: [product-designer]
args:
  - name: product_context
    description: What the product does, who uses it and how often, the main jobs users come back for, what data the home screen could show, what it shows today, and any usage data (most visited pages, where people go first after landing).
    type: text
    required: true
  - name: platform
    description: Main platform.
    type: enum
    enum: [web, mobile-app, desktop]
    default: web
output_contract:
  format: markdown
  sections: [Purpose, User states, Module inventory, Layout, State versions, Content rules, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Product home screens drift into a collage: every team adds a widget, nothing is ranked, and returning users skip the page to get to their actual work. A home screen earns its place only when it answers "what needs my attention, and where do I continue?" for the user's current state. That state differs: a new user needs a first success, an active user needs to resume and see what changed, a returning user after weeks away needs a summary, and a stuck user needs help. Each module should be justified by a user job and evidence, ordered by how often it is the reason someone opened the app.
</context>

<task>
<product_context>
{{product_context}}
</product_context>

Design for {{platform}}. If the product's main jobs are unknown, ask and stop. Other gaps become assumptions marked [confirm].

1. **Purpose.** In one or two sentences, the home screen's job for this product, and whether the product should have a home screen at all or land users directly in their main workspace.
2. **User states.** Define the states that change what home shows (for example new, activated, active daily, lapsed, admin versus member) and how each is detected.
3. **Module inventory.** Candidate modules (continue where you left off, items needing action, changes since last visit, key numbers, shortcuts, recommendations, announcements, help) with the user job each serves, the data it needs, and keep or cut. Cut anything without a job.
4. **Layout.** Order top to bottom (and left to right on wide screens) for the main state, with the primary action and what sits in the first viewport. Say how the layout collapses on small screens.
5. **State versions.** How the screen changes for each user state, including the empty version for a new user that leads to a first success rather than showing empty widgets.
6. **Content rules.** Limits per module (number of items, "see all" behaviour), freshness, how announcements and promotions are capped so they do not push work below the fold, and customisation only if users need it.
7. **Questions.** Data or research that would change the design, and the metric to judge it (time to first meaningful action, click-through from home, bounce from home).
</task>

<constraints>
- Every module must name the user job it serves; no "nice to have" widgets.
- Do not invent usage data; where evidence is missing, mark the ordering as a hypothesis to test.
- Promotional or upsell modules never take the first position over the user's own work.
- This is a product home screen, not an analytics dashboard; keep charts only where a number drives an action.
{{> output/uncertainty}}
</constraints>

<output_format>
## Purpose
## User states
| State | How detected | What they need from home |
## Module inventory
| Module | User job | Data needed | Keep or cut |
## Layout
Top-to-bottom description of the main state, with first viewport marked.
## State versions
## Content rules
## Questions
</output_format>
