---
schema: 1
id: catalog-collection
kind: prompt
title: Catalogue a collection
description: Designs a catalogue for a collection with item numbering, the fields that matter for that collecting area, condition terms, photos, provenance and storage location, ready to use as a spreadsheet.
category: pastimes
version: 1.0.0
status: incubating
stage: [design, maintain]
role: [individual]
requires: [none]
inputs: [text, preferences]
output: [table, plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [collecting, inventory, catalogue-design, provenance, insurance-records, spreadsheet-template]
pairs_with:
  prompts: [start-a-collection, assess-inherited-collection]
args:
  - name: collection
    description: What you collect and roughly how many items, for example "about 600 vinyl records", "1,200 coins, mostly European", "200 vintage fountain pens".
    type: string
    required: true
  - name: purpose
    description: What the catalogue is for, for example "insurance", "finding things", "tracking what I still want", "eventually selling".
    type: string
    default: finding things and insurance
  - name: tool
    description: What you will keep it in, for example "a spreadsheet", "a notes app", "a database app". Optional.
    type: string
    default: a spreadsheet
output_contract:
  format: markdown
  sections: [Numbering and labels, Fields, Condition terms, Photos, Workflow, Backups and insurance]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a collector who has catalogued museum-style and personal collections. Catalogues fail when they start with too many fields and are abandoned by item 50, when items have no unique number linking the record to the object, when condition is described in free text that cannot be compared, or when the only copy is on one laptop. A good catalogue uses a simple permanent numbering scheme, a short core of required fields plus optional ones specific to the collecting area (for example standard catalogue references for coins and stamps, label and matrix numbers for records, maker and model for pens), the hobby's own condition vocabulary, a photo naming convention tied to the item number, provenance and purchase records for insurance, and a physical location so things can be found. You design the structure; you never invent catalogue reference numbers or values for specific items.

Collection: {{collection}}
Purpose: {{purpose}}
Tool: {{tool}}
</context>

<task>
1. Numbering and labels: a permanent item numbering scheme (for example year plus running number, or a prefix by sub-collection), how to label items without damage (acid-free tags, sleeves, holder labels, never writing on the object), and how to number sets and lots.
2. Fields: a core set every record needs and an optional set specific to {{collection}}, each with a short definition and an example value, in the order they should appear in {{tool}}. Include identifiers used by the hobby's standard references, acquisition date, source, price paid, provenance, condition, storage location, photo file names and a status field (owned, sold, wanted).
3. Condition terms: the condition or grading vocabulary collectors in this area use, with short definitions, and the rule to grade conservatively and consistently.
4. Photos: what to photograph (front, back, marks, flaws), a neutral background and scale, file naming by item number, and storage.
5. Workflow: how to start (catalogue new acquisitions first, then work through the backlog by box), a batch size, and quick checks for duplicates and missing records.
6. Backups and insurance: at least two copies in different places, periodic exports, and what an insurer or executor will want to see for {{purpose}}; suggest a short note for heirs about where the catalogue is and what matters.
</task>

<constraints>
- Keep the core fields to about ten so the catalogue is actually maintained.
- Never invent reference numbers, grades or values for the user's items.
- Never advise marking or altering the objects themselves.
- Adapt the fields to {{collection}}; a generic list is not enough.
</constraints>

<output_format>
## Numbering and labels
## Fields
Table: Field | Required or optional | Definition | Example.
## Condition terms
## Photos
## Workflow
## Backups and insurance
</output_format>
