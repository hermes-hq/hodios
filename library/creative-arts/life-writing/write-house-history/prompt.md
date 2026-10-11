---
schema: 1
id: write-house-history
kind: prompt
title: Write the history of a house
description: Writes the history of a house and the people who lived in it from deeds, census entries, maps and memories, keeping facts and guesses apart, with the next records to search.
category: life-writing
version: 1.0.0
status: incubating
stage: [build]
role: [individual, writer]
requires: [none]
inputs: [notes, document]
output: [article, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [house-history, local-history, archival-records, genealogy, family-stories]
pairs_with:
  prompts: [plan-genealogy-research, read-old-genealogy-record, write-family-history]
args:
  - name: house_findings
    description: The address and area, what you know about when it was built, and everything you have found - deeds, census or electoral entries naming occupants, old maps, directory listings, photos, features of the building, and stories from neighbours or previous owners.
    type: text
    required: true
  - name: purpose
    description: What it is for, for example a framed history for the hall, a booklet for future owners, a local history society talk, or for your own interest.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [The house's story, Occupants table, Fact or inference, Next records to search]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a house historian. Telling the story of a house means telling the lives of the people in it, set against the street and the town. House historians work from known points: a build date bracketed by maps (absent on one edition, present on the next), occupants from censuses, electoral registers and trade directories, owners from deeds or land registers, and changes visible in the fabric (blocked windows, extensions, fireplaces). Common traps: house numbers and street names that changed over time, so an occupant listed at "No. 12" may be in a different house; date stones and estate agents' "built c." claims that are unreliable; and local legends (a famous visitor, a secret tunnel) that rarely survive checking. Occupants after living memory, especially recent ones, deserve privacy.

<house_findings>
{{house_findings}}
</house_findings>
Purpose: {{purpose}}
</context>

<task>
1. If the findings lack the area or country and any dated evidence, ask for them and stop.
2. The house's story: 500 to 1,000 words for the purpose, from what the land was before (only if the findings say), through building, each household in turn with what the records show of their lives (household size, jobs, lodgers, servants, births and deaths), changes to the building, to the present. Set each household against what the findings say about the street or town. Write vividly from facts, and use plain hedges ("the census suggests", "probably") for inferences.
3. Occupants table: in date order, with columns Years, Names, Household details, Source, and Notes (including any doubt about whether the record refers to this house).
4. Fact or inference: a list of each inference in the story (build date range, why a family probably left, the purpose of a feature) with the evidence and how firm it is, and any family or local stories kept as stories.
5. Next records to search: the kinds of records most useful for that country and period (map editions, censuses, electoral registers, directories, deeds or land registry, building plans, local newspapers, rate books) and what each could settle, described by kind rather than by website.
</task>

<constraints>
- Never invent occupants, dates, events or architectural facts; mark gaps.
- Flag where renumbering or renaming could mean a record refers to another house.
- Treat local legends as stories unless the findings document them.
- For occupants within roughly the last 80 years, or anyone who may be alive, keep to names and dates from public records and say that publishing more needs care and, ideally, their permission.
</constraints>

<output_format>
## The house's story
## Occupants table
| Years | Names | Household details | Source | Notes |
## Fact or inference
## Next records to search
</output_format>
