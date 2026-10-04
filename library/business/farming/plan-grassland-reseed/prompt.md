---
schema: 1
id: plan-grassland-reseed
kind: prompt
title: Plan a grassland reseed
description: Decides whether a grass field needs a full reseed, an overseed or better management, then plans that route - timing, seedbed, seed mix purpose, weed control questions and first grazing.
category: farming
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, founder]
subject: [agriculture]
requires: [none]
inputs: [notes, text]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [reseeding, overseeding, grassland, seed-mix, sward-assessment, soil-compaction]
pairs_with:
  prompts: [explain-soil-analysis-report, plan-paddock-grazing-rotation, plan-soil-sampling-round]
  rules: [farm-chemical-label-rules]
args:
  - name: field_description
    description: The field and sward - size, age of the ley, how much is sown grass versus weed grasses, weeds and bare patches, soil type and drainage, compaction or poaching, last soil test, and what has gone wrong.
    type: text
    required: true
  - name: use
    description: What the field will mainly be used for.
    type: enum
    enum: [grazing, silage, hay, mixed]
    required: true
  - name: region_climate
    description: Region and climate, including when soils are usually workable and when dry spells come.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Diagnosis, Decision, Plan, Seed mix purpose, After sowing, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a grassland farmer decide what a poor field really needs. Grassland advisers check the cause first: a reseed into a field with low pH, poor drainage or compaction fails the same way the old sward did, at much higher cost. They also assess the sward: when a good share of the ground is still covered by sown grasses, better management (soil fertility, grazing, weed control) often recovers it more cheaply than reseeding. The common failures: reseeding without fixing pH or compaction, sowing too late into cold or dry soil, slug or leatherjacket damage that is not checked for, and grazing too hard or too late so the new sward never establishes.

Main use: {{use}}
Region and climate: {{region_climate}}
<field>
{{field_description}}
</field>
</context>

<task>
1. Diagnosis: list the likely causes of poor performance (soil pH and nutrients, drainage, compaction, poaching, weed grasses, broadleaf weeds, pests, grazing management, age of ley) and say which are confirmed by the description and which need checking. Suggest a soil test if none is recent, and a spade test for compaction and rooting depth.
2. Sward assessment: explain how to estimate the share of desirable sown species by walking a W and scoring ground cover. Use labelled rules of thumb: well over about half desirable species usually means manage and fix the causes; roughly a third to a half often suits overseeding; much less than a third, or a badly damaged or weed-dominated sward, suggests a full reseed.
3. Decision: manage, overseed or reseed, with the reasons and what would change it.
4. Plan for the chosen route:
   - Manage: fertility and pH correction after a soil test, grazing changes, weed control questions for an adviser.
   - Overseed: timing when soil is warm and moist and the existing sward is opened up (often after grazing or cutting tight), harrowing or a stitch-in drill, rolling, and grazing pressure to limit competition.
   - Reseed: timing for the region (late spring or late summer to early autumn in many temperate areas), how to deal with the old sward (ploughing, min-till or direct drilling, and whether any herbicide is needed is an adviser and label decision), seedbed (fine, firm, moist), lime and nutrients from the soil test, sowing depth around 1 cm, rolling, and slug and pest checks.
5. Seed mix purpose: what the mix should do for {{use}} (grazing versus cutting varieties, heading dates close together, clover content, diverse species or herbs where they suit the soil and system); point to recommended variety lists in the country rather than naming varieties.
6. After sowing: first grazing when plants do not pull out when grasped (often at a light, quick grazing with young stock or sheep), weed checks, and a first-year fertiliser and cutting or grazing plan.
</task>

<constraints>
- Do not prescribe herbicides, pesticides or rates; refer to the label and an adviser.
- Mark all thresholds and dates as rules of thumb to adjust for {{region_climate}}.
- Do not name seed varieties as recommendations; point to the country's recommended lists and a seed merchant or adviser.
- If the field description is too thin to judge, ask for sward cover, soil and drainage details and stop.
</constraints>

<output_format>
## Diagnosis
Table: Possible cause | Evidence | Confirmed or to check.
## Decision
Manage, overseed or reseed, in bold, then three reasons.
## Plan
Numbered steps with timing.
## Seed mix purpose
Bullets.
## After sowing
Bullets.
## Questions
At most three.
</output_format>
