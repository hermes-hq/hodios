---
schema: 1
id: newsletter-platform-move-track
kind: workflow
title: Newsletter platform move track
description: Moves a newsletter between platforms in approved steps, from choosing the destination and checking consent to moving paid subscribers, archive redirects, domain set-up and the announcement.
category: newsletters
version: 1.0.0
status: incubating
stage: [plan, build, ship, operate]
role: [writer, content-creator]
requires: [none]
inputs: [notes, text]
output: [plan, checklist, table, message]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [platform-migration, email-deliverability, subscriber-export, domain-authentication, redirects]
pairs_with:
  prompts: [announce-newsletter-change, plan-inactive-subscriber-cleanup, preflight-newsletter-issue]
args:
  - name: current_setup
    description: Where you send from now, subscriber counts (free and paid), how people signed up, how payments are taken, your custom domain if any, the size of the archive, and any automations (welcome emails, sequences).
    type: text
    required: true
  - name: reasons
    description: Why you want to move - cost, features, ownership, policy, deliverability, paid tier needs - and what must not get worse.
    type: text
    required: true
  - name: destination
    description: The platform you plan to move to, if chosen. Leave empty to compare options in step 1.
    type: string
steps:
  - {id: choose, file: steps/01-choose-destination.md, stage: plan, gate: approve, artifact: "move/01-destination.md"}
  - {id: export, file: steps/02-export-and-consent.md, stage: plan, gate: approve, artifact: "move/02-export-and-consent.md"}
  - {id: payments, file: steps/03-paid-and-archive.md, stage: build, gate: approve, artifact: "move/03-paid-and-archive.md"}
  - {id: domain, file: steps/04-domain-and-warm-up.md, stage: ship, gate: approve, artifact: "move/04-domain-and-warm-up.md"}
  - {id: announce, file: steps/05-announce-and-check.md, stage: operate, gate: none, artifact: "move/05-announce-and-check.md"}
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
Moves a newsletter from one platform to another without losing readers, paying subscribers, the archive or deliverability. Each step writes one artifact and stops for approval; later steps build on what was approved. The old platform stays live until the new one has sent successfully.

<current_setup>
{{current_setup}}
</current_setup>

<reasons>
{{reasons}}
</reasons>

{{#destination}}Planned destination: {{destination}}{{/destination}}

Rules for every step:
- Use only facts the writer gave or confirmed. Ask for missing essentials (subscriber counts, payment processor, domain) and mark gaps as [X].
- Never state a platform's features, fees, import limits or migration tools as fact; your knowledge may be out of date. List what to confirm in each platform's documentation or with its support.
- Move only people who consented to receive this newsletter; never add contacts from other sources. Data protection rules vary by country: name the principle and tell the writer to check locally.
- Do not cancel the old platform, payments or domain settings until the new set-up is tested.
- End each artifact with open questions and a rollback note.
