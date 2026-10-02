---
schema: 1
id: brand-identity-track
kind: workflow
title: Brand identity track
description: Takes a brand from discovery and positioning to a brand platform, verbal identity, visual direction and guidelines, pausing for approval between steps. Use for a new business or a rebrand.
category: branding
version: 1.0.0
status: incubating
stage: [discover, plan, design, review]
role: [founder, marketer, designer, graphic-designer]
requires: [none]
inputs: [text, notes, document]
output: [questions, report, docs, ideas]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [brand-strategy, brand-positioning, brand-platform, visual-identity, verbal-identity]
pairs_with:
  prompts: [build-brand-platform, write-brand-story, design-logo-concepts, build-brand-guidelines, write-brand-voice-guide, name-brand, plan-rebrand]
  personas: [brand-strategist]
args:
  - name: business
    description: What the business sells, to whom, how it makes money, its stage, and for a rebrand what exists today (name, logo, colours, reputation).
    type: text
    required: true
  - name: audience
    description: Who the brand must win, as specifically as you can, plus anything you know about how they choose and what they use today.
    type: text
    required: true
  - name: constraints
    description: Fixed points and limits - a name you must keep, budget, deadline, markets and languages, regulation, assets that cannot change. Optional.
    type: text
steps:
  - {id: discovery, file: steps/01-discovery.md, stage: discover, gate: approve}
  - {id: positioning, file: steps/02-positioning.md, stage: plan, gate: approve}
  - {id: platform, file: steps/03-platform.md, stage: plan, gate: approve}
  - {id: verbal-identity, file: steps/04-verbal-identity.md, stage: design, gate: approve}
  - {id: visual-direction, file: steps/05-visual-direction.md, stage: design, gate: approve}
  - {id: guidelines, file: steps/06-guidelines.md, stage: review, gate: none}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
Builds a brand identity in the order that makes it hold together: understand the business and audience, choose a position, write the brand platform, then the words, then the look, then the rules that keep it consistent. Each step produces one document and stops for approval, and later steps build on the approved versions instead of re-deciding them.

<business>
{{business}}
</business>

<audience>
{{audience}}
</audience>
{{#constraints}}
<constraints>
{{constraints}}
</constraints>
{{/constraints}}

Rules for every step: never invent research findings, customer quotes, competitor claims or market figures; when evidence is missing, label the statement as a hypothesis and say how to check it. Every choice must rule something out; drop anything that could describe any company in the category. Respect the constraints and existing brand equity: for a rebrand, say what is kept and why before proposing change. Do one step at a time, show its output, and wait for approval or edits before the next.
