---
schema: 1
id: plan-roadmap-around-platform-deadlines
kind: prompt
title: Plan a roadmap around platform deadlines
description: Builds a yearly calendar of platform-driven work - mobile OS releases, store policy changes, browser changes, vendor API deprecations - and fits it into the roadmap with owners and buffers.
category: roadmapping
version: 1.0.0
status: incubating
stage: [plan, maintain]
role: [product-manager, engineering-manager, mobile-engineer, tech-lead]
requires: [none]
inputs: [text, notes]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [platform-changes, api-deprecation, app-store-policy, os-releases, compliance-work, yearly-calendar]
pairs_with:
  prompts: [assess-platform-dependency-risk, fit-regulatory-deadline-into-roadmap, set-roadmap-investment-mix]
args:
  - name: platforms
    description: The platforms, stores, browsers, SDKs and vendor APIs the product depends on, with versions in use where known.
    type: text
    required: true
  - name: known_deadlines
    description: Optional. Deadlines or announcements you already know about (for example a deprecation notice or a store requirement date), with their source.
    type: text
  - name: team
    description: Optional. Teams and capacity, and the planning period.
    type: text
output_contract:
  format: markdown
  sections: [Dependency inventory, Platform calendar, Roadmap placement, Capacity reserve, Watch list and owners, What to verify]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan the work that platforms force on a product: new mobile OS versions and the minimum SDK levels stores require, store policy changes (privacy disclosures, account deletion, payments rules), browser changes such as cookie and permission changes, and vendor APIs and SDKs being deprecated. This work is not optional and arrives on someone else's schedule, yet many roadmaps ignore it until an app update is rejected or an integration breaks. Some of it is predictable: major mobile OS versions follow a broadly yearly cycle, stores typically raise target SDK requirements on a regular schedule, and vendors announce deprecations months ahead. The rest needs a watch list and a named owner. The usual fix is a calendar of known and expected platform events, a standing capacity reserve, and work started well before the cut-off rather than in the final weeks.
</context>

<task>
Platforms and dependencies:

<platforms>
{{platforms}}
</platforms>

{{#known_deadlines}}
Known deadlines:

<known_deadlines>
{{known_deadlines}}
</known_deadlines>
{{/known_deadlines}}

{{#team}}
Team: {{team}}
{{/team}}

1. Build a dependency inventory: each platform, store, SDK or vendor API, the version in use, how critical it is, and the kind of change it tends to force.
2. Build a platform calendar for the next 12 months. Put the user's known deadlines in with their source. Add expected recurring events (for example annual mobile OS releases and store target-SDK updates) clearly labelled "expected, verify", without inventing exact dates.
3. Place the work on the roadmap: for each event, the work needed, size if known, start date with a buffer before the deadline (for store review and staged rollout), and the owner.
4. Recommend a standing capacity reserve for platform work, based on the number of dependencies and past experience the user describes.
5. Set up a watch list: where announcements appear (official developer blogs, release notes, vendor emails), who checks each and how often, and what triggers adding work to the roadmap.
6. List what to verify now against official sources, most urgent first.
</task>

<constraints>
- Never state exact deadlines, version numbers or policy requirements from memory as fact. Label anything not provided by the user as expected and to be verified in the platform's official documentation.
- Do not invent vendor names or APIs the user did not mention.
- Build in buffer for store review and gradual rollout; do not schedule work to finish on the deadline day.
{{> output/uncertainty}}
</constraints>

<output_format>
## Dependency inventory
Table: dependency | version in use | criticality | typical forced change.

## Platform calendar
Table: month | event | source (given or expected, verify) | impact.

## Roadmap placement
Table: work item | deadline | start by | size | owner.

## Capacity reserve
Short paragraph.

## Watch list and owners
Table: source | owner | check frequency | trigger.

## What to verify
Numbered list.
</output_format>
