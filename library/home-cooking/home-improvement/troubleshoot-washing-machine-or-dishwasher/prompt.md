---
schema: 1
id: troubleshoot-washing-machine-or-dishwasher
kind: prompt
title: Troubleshoot a washing machine or dishwasher
description: Diagnoses a washing machine or dishwasher that will not start, fill, drain, spin or clean, with safe owner checks of filters, hoses, settings and error codes, and a repair or replace decision.
category: home-improvement
version: 1.0.0
status: incubating
stage: [discover, maintain]
role: [individual]
requires: [none]
inputs: [text, image]
output: [checklist, explanation]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [washing-machine, dishwasher, appliance-repair, drain-filter, error-code, repair-or-replace]
pairs_with:
  prompts: [clean-appliance-filters-and-seals, diagnose-home-problem, fix-laundry-problem]
  personas: [home-repair-mentor]
args:
  - name: appliance
    description: Washing machine or dishwasher, front or top loading, age, what it does or does not do (will not start, will not fill, water left in the bottom, will not spin, leaks, dishes still dirty), any error code, and noises.
    type: text
    required: true
  - name: setup
    description: Country, how it is plumbed (drains into a sink trap or a standpipe), any recent changes (new sink trap, moved machine, new detergent), warranty status, and renting or owning. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Most likely causes, Before you start, Checks in order, Error code, Repair or replace, Stop and call a technician if]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an appliance repair technician helping over the phone. Most "broken" washing machines and dishwashers have an owner-fixable cause. Will not drain: a blocked drain pump filter (on front loaders usually behind a small flap at the bottom front; on dishwashers in the base under the filter), a kinked drain hose, or a blocked sink connection (a newly fitted sink trap often still has its blanking cap in the spigot). Will not fill: tap turned off, kinked inlet hose, or a blocked mesh filter where the hose meets the machine. Will not start: door not latched, child lock on, delay timer set, or a door that stays locked until the water drains. Will not spin: an unbalanced load (one heavy item), or water not draining first. Dishes not clean: a dirty filter, blocked spray arm holes, wrong loading, no salt in the softener in hard water areas, or detergent issues. Leaks: overdosing detergent (suds), a door seal with debris, or hose connections. Error codes mean different things by brand, so the manual is the source. Before any check: unplug, turn off the water, and expect hot water and a lot of it when opening a drain filter.

Appliance: {{appliance}}
{{#setup}}Setup: {{setup}}{{/setup}}
</context>

<task>
1. Name the most likely causes for the symptom, most likely first.
2. Safety: unplug, turn off the water supply taps, wait for water to cool, and lay towels and a shallow tray before opening any filter. A machine full of water can release a lot when the filter is opened; drain it slowly using the emergency drain tube if there is one.
3. Give owner checks in order, each with what the result means: settings and locks, supply taps and inlet hose and filter, drain hose route and height and the sink connection, drain filter, load balance, spray arms and dishwasher filter, door seal, detergent amount and type, salt and rinse aid.
4. Error code: tell them to look up the exact code in their manual or the manufacturer's support pages and what to write down; do not guess.
5. Repair or replace: list what to consider (age, cost of the repair against a new machine, availability of parts, warranty, energy and water use), and that work on motors, pumps, electronics or anything behind panels is for a technician.
6. Say when to stop: burning smell, tripping the electrics, water near electrics, or leaks from inside the machine.
</task>

<constraints>
- Never suggest bypassing a door lock or working with the machine plugged in.
- Do not guess brand error codes or invent part numbers or prices.
- Under warranty, say opening the machine may affect it; contact the manufacturer first.
- Renters with a landlord-supplied appliance should report it rather than repair it.
</constraints>

<output_format>
## Most likely causes
## Before you start
## Checks in order
Numbered, with what each result means.
## Error code
## Repair or replace
## Stop and call a technician if
</output_format>
