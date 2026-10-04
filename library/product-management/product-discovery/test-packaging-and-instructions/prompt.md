---
schema: 1
id: test-packaging-and-instructions
kind: prompt
title: Test unboxing and setup instructions
description: Plans an out-of-box test of a physical product's packaging, assembly or setup instructions with first-time users, covering tasks, think-aloud prompts, timing, error logging and a severity scale.
category: product-discovery
version: 1.0.0
status: incubating
stage: [verify]
role: [product-manager, designer, technical-writer, founder]
subject: [retail, ecommerce]
requires: [none]
inputs: [text]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [out-of-box-experience, unboxing, assembly-instructions, setup, think-aloud, hardware]
pairs_with:
  prompts: [test-physical-prototype-with-users, write-usability-test-plan, write-research-screener]
  personas: [hardware-product-manager]
args:
  - name: product_and_materials
    description: The product and what comes in the box (parts, tools, printed or app instructions, quick-start card), what the user must do to get it working, and whether materials are final or drafts.
    type: text
    required: true
  - name: target_users
    description: Who buys and sets it up, including people at the edges (older buyers, non-native readers, people with limited dexterity, first-time owners of this kind of product).
    type: text
    required: true
  - name: participants
    description: How many first-time participants you can test with.
    type: number
    default: 6
output_contract:
  format: markdown
  sections: [Test goals, Participants, Setup and materials, Tasks and script, What to record, Severity scale, Linking to support and returns]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan out-of-box experience tests for physical products: furniture, appliances, smart-home devices, toys, tools. Most avoidable support calls and returns start in the first thirty minutes: a missing-looking part that was taped inside the lid, a diagram that shows the panel the wrong way round, a step that needs two people but does not say so, an app that must be installed before the device is plugged in. Teams test with colleagues who already know the product, in a clean office with every part laid out, which hides all of this. A useful test uses real first-time users from the target group, the real box, a realistic place (floor space, a home table), and records time to first success and every error. This is a single moderated session per person covering the first hour; weeks of home use need a separate in-home use test.
</context>

<task>
Product and materials:

<product_and_materials>
{{product_and_materials}}
</product_and_materials>

Target users:

<target_users>
{{target_users}}
</target_users>

Participants available: {{participants}}

1. Test goals: time to first successful use, steps where people hesitate, err or need help, whether people find and use the instructions, and any safety risk during setup (lifting, sharp parts, tipping, electrical, small parts).
2. Participants: split the {{participants}} across target groups and include at least one edge-of-range user (older, non-native reader, limited dexterity). Nobody who has seen the product before. Screen out people who assemble this type of product professionally.
3. Setup and materials: a sealed, final-state box (or the closest draft, noting differences), a realistic space, any tools a buyer would have at home, the app on the participant's own phone if one is needed, and a camera on hands and instructions, not faces, with consent.
4. Tasks and script: a short brief ("You've just bought this; please set it up as you would at home; think out loud"), then three to five tasks (open and check contents, assemble or install, first use, one follow-up task such as connecting a second device or adjusting a setting). Neutral prompts only ("What are you looking for?", "What do you expect next?"). Help only when stuck for a set time (for example three minutes) or when safety is at risk, and log every assist.
5. What to record: time per task and to first success, errors (wrong part, wrong orientation, skipped step), assists, instruction look-ups (page or screen), damage or near-misses, packaging left unopened or confusing, and quotes.
6. Severity scale: 4 safety risk or product damage; 3 cannot complete without help; 2 completes with a significant error or delay; 1 minor hesitation or annoyance. Fix order by severity then frequency.
7. Linking to support and returns: compare findings with existing support contact reasons, reviews and return reasons if available, and estimate which findings likely drive them.
</task>

<constraints>
- Test with first-time users only; colleagues and repeat participants hide the problems.
- Do not tell participants the right way or point at the instructions unless the stop rule applies.
- Flag any setup step that could injure someone and say it needs a fix before the next test, not just a note.
- Do not invent the box contents or steps; if the materials are not described, ask for the parts list and setup steps and stop.
- If fewer than five participants are available, say what that limits and which groups go untested.
</constraints>

<output_format>
## Test goals
Numbered.

## Participants
Table: group | number | screening criteria.

## Setup and materials
Checklist.

## Tasks and script
The brief and each task as spoken, with neutral prompts and the help rule.

## What to record
Table: task | timing start and end | errors to log | assists | notes.

## Severity scale
The four levels with an example from this product.

## Linking to support and returns
Bullets.
</output_format>
