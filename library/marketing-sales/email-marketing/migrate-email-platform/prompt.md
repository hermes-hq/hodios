---
schema: 1
id: migrate-email-platform
kind: prompt
title: Plan a move to a new email marketing platform
description: Plans moving a business from one email marketing platform to another - contacts and consent, suppression lists, flows, templates, sending domain warm-up and a cutover with no lost sends.
category: email-marketing
version: 1.0.0
status: incubating
stage: [plan]
role: [marketer, founder, operations-manager]
subject: [ecommerce, saas]
requires: [none]
inputs: [text]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [platform-migration, email-software, suppression-lists, cutover-plan, flow-rebuild]
pairs_with:
  prompts: [choose-email-platform, warm-up-sending-domain, map-email-automation-flows]
args:
  - name: move
    description: The current and new platform, why you are moving, the contract end date on the old one, and the shop or CRM integrations involved.
    type: text
    required: true
  - name: inventory
    description: What exists today - list size and how consent was recorded, segments, active flows with volumes, templates, sign-up forms and popups, sending domain setup, and recent deliverability health.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Inventory and scope, Migration plan, Cutover, Risks and checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan email platform migrations for businesses. The common disasters are quiet ones: unsubscribed or bounced contacts imported as active and emailed again (a complaint and possibly legal problem), consent records lost so the business cannot show how people opted in, abandoned-cart or welcome flows switched off on the old platform before the new ones work, two platforms sending the same campaign, forms on the website still feeding the old account for weeks, and a full-list blast from a cold new setup that lands in spam. Experts migrate suppression lists first, carry consent source and date fields across, rebuild flows rather than trusting import tools, run both platforms in parallel with clear ownership per flow, warm up the new sending setup on engaged contacts, and only then switch off the old account after exporting everything (including historical engagement data, which drives segments like "engaged in 90 days").
</context>

<task>
Plan the migration.

<move>
{{move}}
</move>

<inventory>
{{inventory}}
</inventory>

1. **Inventory and scope:** list everything to move, rebuild, or retire (contacts and fields, consent data, suppressions, segments, flows, templates, forms, integrations, reports), and what can be left behind (dead flows, unengaged contacts better sunset first).
2. **Migration plan** in phases with owners and dates working back from the contract end:
   - Set up the new account: domain authentication, sender details, integrations.
   - Export and import: suppressions and unsubscribes first, then contacts with consent source and date, engagement history as fields, and custom fields mapped.
   - Rebuild flows in order of revenue, testing each with real test profiles.
   - Rebuild templates and forms; update every sign-up point on the site and elsewhere.
   - Warm up sending on the new platform with engaged contacts.
3. **Cutover:** the order for switching each flow off old and on new so nothing double-sends or goes silent, the first campaigns on the new platform, and when to close the old account after a final export.
4. **Risks and checks:** a checklist for each phase, including matching contact counts, suppression spot checks, flow trigger tests, form tests, and deliverability signals for the first weeks.
</task>

<constraints>
- Never import contacts who unsubscribed, bounced or complained as subscribed; never re-opt anyone in by migration.
- Do not assume import tools or integrations exist; mark platform-specific steps as "confirm in the platform's documentation".
- Note that consent records may need to be kept for compliance in the user's countries and that they should check; do not state legal rules as fact.
- Keep both platforms from sending the same message to the same person.
</constraints>

<output_format>
## Inventory and scope
A table: Item | Move, rebuild or retire | Notes.

## Migration plan
Phases with dates, owners and steps.

## Cutover
An ordered list.

## Risks and checks
A checklist per phase.
</output_format>
