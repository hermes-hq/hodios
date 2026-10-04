---
schema: 1
id: event-visual-identity-track
kind: workflow
title: Build an event visual identity
description: Builds a visual identity for a conference, festival or campaign in gated steps - concept, key visual, templates, signage and wayfinding, social assets and an on-site checklist.
category: graphic-design
version: 1.0.0
status: incubating
stage: [plan, design, ship]
role: [graphic-designer, marketer, project-manager]
requires: [none]
inputs: [text, spec, preferences]
output: [plan, docs, checklist, table]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [event-branding, key-visual, wayfinding, conference-design, festival-identity, campaign-identity]
pairs_with:
  prompts: [write-design-brief, create-mood-board, plan-signage, design-social-media-templates, prepare-print-files, design-merch-concepts]
  personas: [art-director]
args:
  - name: event
    description: The event or campaign - name, purpose, format and size (for example "two-day developer conference, 800 attendees, one venue with three stages"), the host organisation's brand, sponsors, and any fixed elements.
    type: text
    required: true
  - name: audience
    description: Who attends or is targeted, for example "backend engineers and engineering managers in Europe".
    type: string
    required: true
  - name: deadline
    description: The event or launch date and the date by which print must go to production, for example "event 12 March; print deadline 20 February".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Concept, Key visual, Templates, Signage and wayfinding, Social assets, On-site checklist]
steps:
  - {id: concept, file: steps/01-concept.md, stage: plan, gate: approve, artifact: concept}
  - {id: key-visual, file: steps/02-key-visual.md, stage: design, gate: approve, artifact: key-visual-spec}
  - {id: templates, file: steps/03-templates.md, stage: design, gate: approve, artifact: template-set}
  - {id: signage-and-wayfinding, file: steps/04-signage-and-wayfinding.md, stage: design, gate: approve, artifact: sign-schedule}
  - {id: social-assets, file: steps/05-social-assets.md, stage: design, gate: approve, artifact: social-kit}
  - {id: on-site-checklist, file: steps/06-on-site-checklist.md, stage: ship, gate: none, artifact: on-site-checklist}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
Builds an event identity that is recognisable from the first announcement to the last slide, flexible enough for dozens of assets made by different people, and practical on site. Event identities fail when the key visual looks good on one poster but breaks on a 1:1 social card, a lanyard and a 3-metre banner; when templates are missing so every speaker and sponsor improvises; and when wayfinding is designed last and printed too late. This track works backwards from the print deadline and pauses for approval after each step.

Event: {{event}}
Audience: {{audience}}
Deadline: {{deadline}}

Throughout: work within the host organisation's brand where it exists (the event identity can extend it but must not contradict it), design the key visual as a system that scales, keep accessibility in every asset (contrast, readable sizes at viewing distance, captions and alt text), and show the schedule backwards from the print deadline at every step so it stays realistic. Never use other organisations' logos or artwork without permission, and use placeholders for sponsor logos. If the event description lacks the format, size or venue details a step needs, ask before designing that step. Stop at the end of each step and wait for approval.
