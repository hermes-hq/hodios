---
schema: 1
id: spec-mobile-screen-states
kind: prompt
title: Specify mobile screen states
description: Specifies every state of a mobile screen before build, from loading, empty, error, offline and denied permissions to long text and dark mode, plus deep link entry, back behaviour and analytics.
category: product
version: 1.0.0
status: incubating
stage: [plan, design]
role: [mobile-engineer, product-manager, designer, qa-engineer]
stack: [ios, android]
requires: [none]
inputs: [spec, image, text]
output: [docs, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [screen-states, empty-states, offline-mode, deep-links, analytics-events, edge-cases]
pairs_with:
  prompts: [write-acceptance-criteria, list-feature-edge-cases, audit-mobile-accessibility]
  personas: [mobile-engineer]
args:
  - name: screen_description
    description: The screen - its purpose, what data it shows and where that data comes from, the actions on it, how users reach it, and a description of the designs if you have them.
    type: text
    required: true
  - name: platform
    description: Which platform conventions to follow.
    type: enum
    enum: [ios, android, both]
    default: both
output_contract:
  format: markdown
  sections: [Screen summary, State matrix, Navigation and entry, Analytics events, Open questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Mobile designs usually show the happy state with perfect data. The bugs and the one-star reviews come from everything else: a spinner that never ends on a train, an empty list with no explanation, a permission denied once and never asked again, a German translation that overflows a button, a deep link that opens the screen with no back stack, and an error that wipes what the user typed. Engineers then make these decisions alone during build. This spec makes them explicit before build.

Platform conventions to follow (ios, android or both): {{platform}}. For a single platform, describe only that platform's behaviour.
</context>

<task>
<screen_description>
{{screen_description}}
</screen_description>

1. Summarise the screen: purpose, primary action, data sources (local, network, both) and whether content is cached.
2. Specify each state that applies, with what the user sees, what they can do, and how the state is left:
   - first load and refresh (skeleton or spinner, after how long to show it, pull to refresh);
   - empty: first use (never had data) versus cleared (no results after filter or deletion), each with a message and a next action;
   - partial: some sections loaded, some failed; paging and end of list;
   - error: network failure, server error, timeout, and item-level failure, with retry behaviour and what user input is preserved;
   - offline and slow network: cached content with its age, queued actions, what is disabled;
   - permissions: not yet asked (explain before the system prompt), denied, permanently denied (route to settings), limited access (for example limited photo library on iOS);
   - signed out or session expired mid-use;
   - content extremes: very long names and translations (allow about 30-40% text expansion), right-to-left languages, large text and accessibility font sizes, zero and huge counts, missing images;
   - appearance: dark mode, landscape or tablet if supported, and safe areas.
3. Navigation and entry: every way in (tab, push, deep link or universal or app link, notification, widget), the back and up behaviour for each (including a deep link opened from cold start), state restoration after the app is killed, and what happens if the linked item no longer exists or the user lacks access.
4. Platform differences for both: system back on Android versus swipe back on iOS, permission flows, pull to refresh and share sheet conventions, only where they change behaviour.
5. Analytics events: screen view and each meaningful action, with event name, trigger, properties and no personal data; include events for error and empty states so their frequency can be measured.
6. Open questions for product and design, especially decisions you had to assume.
</task>

<constraints>
- Do not invent data fields, copy or business rules; where the screen needs a decision, propose a default and mark it "Proposed" in the matrix and in Open questions.
- Keep copy suggestions short and mark them as drafts for the designer or writer.
- Name platform behaviours accurately; if unsure of an exact API or setting name, describe the behaviour instead.
- Analytics properties must not include names, emails, free text or precise location.
</constraints>

<output_format>
## Screen summary
Four to six bullets.
## State matrix
Table: state, trigger, what the user sees, available actions, exit, notes (mark Proposed).
## Navigation and entry
Table: entry point, back behaviour, restoration, missing or forbidden item handling. Then platform differences as bullets.
## Analytics events
Table: event, trigger, properties.
## Open questions
Numbered.
</output_format>
