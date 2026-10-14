---
schema: 1
id: update-outdated-document
kind: prompt
title: Update an outdated document
description: Reviews an old internal guide, policy or handbook for outdated dates, names, roles, links, figures and processes, and returns a refreshed version with what to verify and who to ask.
category: editing
version: 1.0.0
status: incubating
stage: [maintain]
role: [manager, operations-manager, technical-writer, individual]
requires: [none]
inputs: [document, notes]
output: [rewrite, table, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [document-refresh, knowledge-base, policy-review, handbook, content-audit]
pairs_with:
  prompts: [build-style-sheet, review-document-for-ambiguity, format-document-for-scanning]
args:
  - name: document
    description: The document to update, as it stands.
    type: text
    required: true
  - name: last_updated
    description: When it was last updated, as far as you know, and today's date.
    type: string
    required: true
  - name: known_changes
    description: What you already know has changed, such as new team names, a new tool, a moved office, a new manager, a changed policy. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Refreshed document, Changes made, To verify, Questions for owners, Review date]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Internal documents go stale in predictable places: relative time words ("next year", "recently", "the new system") that froze when they were written; named people and job titles; team, product and tool names after a reorganisation or migration; links and file paths; prices, limits, headcounts and statistics; references to laws, standards or versions; steps that describe a screen or process that has since changed; and contact details. Staleness is dangerous because readers trust the document's tone, not its age. The useful refresh separates what can be updated now from known changes, from what only an owner can confirm, and marks the latter visibly so nobody mistakes a guess for a fact.

Last updated and today: {{last_updated}}
{{#known_changes}}
<known_changes>
{{known_changes}}
</known_changes>
{{/known_changes}}
<document>
{{document}}
</document>
</context>

<task>
1. If the document is missing, ask for it and stop.
2. Scan the document for time-sensitive elements in these classes: dates and relative time words; people, roles and contacts; organisation, team, product and tool names; links and file locations; numbers (prices, limits, counts, statistics); legal, regulatory or version references; process steps and screen descriptions; anything described as "new", "current", "planned" or "pilot".
3. Apply the known changes everywhere they touch, including indirect mentions (a renamed tool also changes its screenshots' captions and its login step).
4. Rewrite relative time words into absolute or timeless wording (for example "since 2022" or "the booking system" instead of "the new booking system").
5. For every other time-sensitive element you cannot confirm, keep the original wording and add an inline marker [VERIFY: what to check], rather than guessing a newer value.
6. Flag content that may now be wrong in substance (a process that relies on a tool that the known changes say is retired, a policy that refers to a committee that no longer exists).
7. Keep everything that is still valid as it is; this is a refresh, not a rewrite.
8. Propose a review date and owner role based on how quickly the content dates.
</task>

<constraints>
- Never supply current names, prices, figures, links, laws or version numbers from your own knowledge as if verified. Mark them for verification.
- Do not remove a policy or process step just because it looks old; flag it.
- Keep the document's structure, headings and voice unless a known change requires otherwise.
- Every change appears in the Changes made table.
</constraints>

<output_format>
## Refreshed document
The full updated text with [VERIFY: ...] markers.
## Changes made
Table: Location | Before | After | Reason (known change, relative time, consistency).
## To verify
Table: Location | Item | Why it may be stale | Who would know (role).
## Questions for owners
Numbered questions grouped by owner role.
## Review date
One line: suggested next review date and owner role, with the reason.
</output_format>
