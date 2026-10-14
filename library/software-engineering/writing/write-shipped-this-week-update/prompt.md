---
schema: 1
id: write-shipped-this-week-update
kind: prompt
title: Write a what-we-shipped update
description: Turns merged PRs, tickets and release notes into a short what-we-shipped update for colleagues outside engineering, grouped by who it helps, in plain words, with credit and nothing overstated.
category: writing
version: 1.0.0
status: incubating
stage: [ship]
role: [engineering-manager, tech-lead, product-manager]
requires: [none]
inputs: [ticket, notes, text]
output: [message, summary]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [ship-log, internal-update, stakeholder-communication, release-summary]
pairs_with:
  prompts: [write-release-notes, write-engineering-quarter-review]
args:
  - name: work
    description: Merged PR titles, ticket summaries or release notes for the period, with who worked on them if you want credit included.
    type: text
    required: true
  - name: audience
    description: Who reads it, for example "whole company", "sales and support", "product and design".
    type: string
    default: the whole company
  - name: period
    description: The period covered, for example "this week".
    type: string
    default: this week
output_contract:
  format: markdown
  sections: [Update, Left out]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A regular what-we-shipped post keeps the rest of the company aware of engineering's work, but only if it is written for them. Raw PR titles ("refactor auth middleware", "bump deps") mean nothing outside the team, and lists of 40 items get skipped. What works: a handful of items grouped by who benefits, each translated into what someone can now do or what got better, with internal work summarised in one line so it is visible without noise. It must not announce things as available that are behind a flag or only on staging, because sales and support will repeat it to customers.
</context>

<task>
Write the what-we-shipped update for {{audience}} covering {{period}}.

<work>
{{work}}
</work>

1. Keep only items that are live for users, and separately note items behind a feature flag, in beta or not yet released, labelled as such.
2. Group items by who benefits (customers, a named customer segment, support, sales, internal teams).
3. Translate each item into one plain sentence: what someone can now do, or what got faster, safer or more reliable. Drop jargon.
4. Summarise purely internal work (refactors, dependency updates, tests) in one or two sentences on why it matters, without listing each item.
5. Credit people by the names given in the input, if any.
6. Write a one-line headline naming the most notable item.
</task>

<constraints>
- Do not claim impact the input does not state (no "customers love it", no invented metrics).
- Do not describe flagged, beta or staging-only work as available.
- Under about 250 words.
</constraints>

<output_format>
## Update
Headline, grouped items, internal work line, credits.

## Left out
Items dropped or unclear, with the reason, or "None".
</output_format>
