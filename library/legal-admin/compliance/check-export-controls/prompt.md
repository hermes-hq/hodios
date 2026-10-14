---
schema: 1
id: check-export-controls
kind: prompt
title: Check whether your export needs a licence
description: Works out whether exporting a product, software or technology may need an export licence - classification, destination, end user and end use - with red flags, records and when to get specialist help.
category: compliance
version: 1.0.0
status: incubating
stage: [plan, review]
role: [founder, operations-manager, sales-rep, software-engineer]
subject: [law, supply-chain]
requires: [none]
inputs: [text]
output: [report, checklist, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [export-controls, dual-use, encryption, export-licence, trade-compliance, end-use-checks]
pairs_with:
  prompts: [set-up-sanctions-screening, find-hs-tariff-code, run-vendor-due-diligence]
args:
  - name: item
    description: What you export - a physical product with its technical specs, software (especially anything with encryption, surveillance, intrusion or high-performance computing features), or technical data and know-how - and whether it was designed for military or civil use.
    type: text
    required: true
  - name: export
    description: Where it goes, who the customer and end user are, what they will use it for, and how it moves (shipment, download, cloud access, emailing drawings, visiting engineers or foreign staff).
    type: text
    required: true
  - name: exporter_country
    description: The country you export from, and the origin of key components or software if it is different (for example US-origin parts).
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Classification, Destination and parties, End use, Licence outlook, Red flags, Records and process, Points to verify]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help an exporter make a first assessment of export controls before talking to the licensing authority or a specialist. Export controls apply to military items and to dual-use goods, software and technology, and "export" includes sending technical drawings by email, giving cloud or download access abroad, and in some systems sharing controlled technology with foreign nationals at home. The assessment has four parts. Classification: check the item against the control lists that apply in the exporter's country (for example the EU dual-use list, the UK strategic export lists, or the US Commerce Control List, where items not listed are commonly designated EAR99), using its technical parameters; encryption functionality is the most common surprise for software and electronics companies, and some mass-market encryption can rely on exceptions that still have conditions. Destination: embargoes and sanctions can require a licence or prohibit the export outright. Parties: restricted party lists for buyers, end users, intermediaries and banks. End use: "catch-all" rules can require a licence for unlisted items if the exporter knows or is told they may go to weapons of mass destruction programmes or certain military end uses. US rules can follow US-origin items and technology abroad (re-exports, de minimis content, foreign direct product rules). Classification is the exporter's responsibility, records must be kept for years, and authorities can give formal classification advice.

Exporter country: {{exporter_country}}
</context>

<task>
Item:
<item>
{{item}}
</item>

Export:
<export>
{{export}}
</export>

1. Classification: the control lists that apply, the categories the item might fall under based on its described features, the technical parameters that decide it, and what information is missing. Give a provisional view of controlled, possibly controlled, or likely not listed.
2. Destination and parties: embargo or sanctions concerns for the destination, and screening needed for every party.
3. End use: whether the stated use or anything in the deal could trigger catch-all controls.
4. Licence outlook: the likely outcome among no licence needed, a general or open licence may cover it, an individual licence is likely needed, or the export may be prohibited, and what would change it.
5. Red flags: from the facts given, such as reluctance to state end use, unusual routing, cash payment, or a mismatch between product and customer business.
6. Records and process: what to record for this export and a simple repeatable process for future ones.
7. Points to verify, including when to request formal classification advice from the authority or use a specialist.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not give a final control list entry or classification number as fact; give candidates and the parameters to check.
- Do not help structure a deal, route goods through third countries, or describe items misleadingly to avoid controls or sanctions; say why and stop that part.
- If the item has obvious military, surveillance or intrusion uses, or goes to a sanctioned destination, say to stop and get specialist advice before any shipment or technical discussion.
{{> output/uncertainty}}
</constraints>

<output_format>
## Classification
Table: list | candidate category | deciding parameters | provisional view | missing information.

## Destination and parties
Bulleted list.

## End use
Bulleted list.

## Licence outlook
One paragraph with the likely outcome and conditions.

## Red flags
Bulleted list, or "none seen in the facts given".

## Records and process
Checklist.

## Points to verify
Numbered list.
</output_format>
