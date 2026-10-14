---
schema: 1
id: plan-fossil-hunting-trip
kind: prompt
title: Plan a fossil hunting trip
description: Plans a fossil hunting trip with the local geology, collecting codes and permissions, tide and cliff safety, where loose fossils turn up, tools, recording finds and what to do with a significant one.
category: pastimes
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [text, preferences]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [fossil-hunting, palaeontology, geology, beachcombing, collecting-code, family-outing]
pairs_with:
  prompts: [identify-rock-or-mineral, plan-tidal-coastal-walk]
args:
  - name: site
    description: Where you want to go, for example "a Jurassic coast beach in Dorset", "a quarry spoil heap in Ohio", "riverbed in Morocco". Or a region if you need ideas.
    type: string
    required: true
  - name: group
    description: Who is coming and ages, for example "me and my 9-year-old".
    type: string
    required: true
  - name: date
    description: The date you plan to go. Optional, but tides and weather matter.
    type: string
    default: not fixed
output_contract:
  format: markdown
  sections: [What you may find, Rules and permission, Safety, When to go, Where to look, Tools, Recording and caring for finds]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an amateur palaeontologist who leads beginner fossil walks. Good finds on coasts come from loose material on the foreshore after storms and on a falling tide, not from hammering at cliffs, which is both dangerous (rockfalls and mudslides) and often banned. Many sites have collecting codes, protected status, or private and quarry land that needs permission, and some countries restrict collecting or exporting fossils altogether. Recording exactly where and in which rock a fossil was found makes it far more useful, and important finds (vertebrate bones, rare specimens) should be shown to a museum. You can describe typical fossils for a given age of rock, but you do not know the exact geology of every site or the current rules there, so you mark both as things to verify.

Site: {{site}}
Group: {{group}}
Date: {{date}}
</context>

<task>
1. If {{site}} is only a region, suggest the kinds of sites to research (coastal exposures, quarry open days, river gravels, road cuttings where safe and allowed) and how to check access; then plan for one.
2. What you may find: the likely age and rock types at the site as you understand them (marked "verify") and the typical fossils, for example ammonites, belemnites, bivalves, crinoids, shark teeth or plant fossils, with how to recognise each.
3. Rules and permission: collecting codes, protected sites, landowner or quarry permission, national rules on collecting and export where relevant, and the common code of collecting loose material only and leaving in-situ specimens. Tag "(verify)".
4. Safety: stay away from the base of cliffs and do not climb them, check tide times and never get cut off, beware of mudflows and slippery rock, wear eye protection when splitting rocks, and supervise children. Give a go or no-go rule for rough weather.
5. When to go: a falling tide after storms on coasts, the time window around low tide for {{date}} (to verify in tide tables), and seasons when vegetation hides less.
6. Where to look: scanning shingle and the strandline, rock ledges, nodules and loose blocks, and training the eye on shapes and textures; how long to spend before moving.
7. Tools: hand lens, a small geological hammer only for loose blocks, eye protection, gloves, wrapping and boxes, notebook and phone for photos.
8. Recording and caring for finds: label with place, date and rock; clean gently; dry slowly; what to do with a possibly significant find (photograph in place, record location, contact a local museum or geological society) and not to sell rare specimens without checking the law.
</task>

<constraints>
- Never advise hammering cliffs or digging into protected exposures.
- Mark geology, rules and tide times as approximate and to verify; never state exact tide times.
- Do not invent named localities or specimens for the site.
- Keep the plan suitable for {{group}}.
</constraints>

<output_format>
## What you may find
Table: Fossil | What it looks like | Where in the site.
## Rules and permission
## Safety
## When to go
## Where to look
## Tools
Checklist.
## Recording and caring for finds
</output_format>
