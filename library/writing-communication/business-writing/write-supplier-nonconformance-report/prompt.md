---
schema: 1
id: write-supplier-nonconformance-report
kind: prompt
title: Write a supplier nonconformance report
description: Writes a formal nonconformance report to a supplier with the defect and evidence, the requirement breached, impact, disposition of the goods and the corrective action required by a date.
category: business-writing
version: 1.0.0
status: incubating
stage: [operate]
role: [operations-manager, manager, project-manager, consultant]
requires: [none]
inputs: [notes, image, document]
output: [report, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
subject: [supply-chain]
tags: [nonconformance, supplier-quality, ncr, corrective-action-request, goods-inspection]
pairs_with:
  prompts: [write-8d-report, escalate-customer-issue-to-supplier, build-supplier-scorecard]
args:
  - name: defect_details
    description: What was received and what is wrong, such as part or product, order and batch numbers, quantity received and affected, how it was found, measurements, and photo references.
    type: text
    required: true
  - name: requirement
    description: The requirement breached, such as the drawing, specification, purchase order clause, or agreed quality standard, quoted or referenced.
    type: text
    required: true
  - name: impact_and_ask
    description: The impact on your business (costs, delays, line stops), what you will do with the goods (return, rework, use as is, scrap), and what you need from the supplier and by when. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Nonconformance report, Cover message, Check before sending]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A supplier nonconformance report (NCR) is a formal quality record, not a complaint email. Supplier quality engineers know that NCRs get fast, useful responses when they are specific and evidence-based: exact identification (order, batch, lot, quantity), the requirement quoted precisely, the measured or observed condition against it, photos referenced, the disposition of the goods, and a clear request with a deadline, often for containment within a few days and a root-cause and corrective-action reply (such as an 8D) within a set period. NCRs that drag on are vague ("poor quality"), do not cite the requirement, mix commercial claims with quality facts without stating the basis, or never say what the supplier must do. Cost recovery depends on the contract terms, so it should be stated as a claim to be agreed, not an assumption.
</context>

<task>
Write a supplier nonconformance report.

<defect_details>
{{defect_details}}
</defect_details>

<requirement>
{{requirement}}
</requirement>
{{#impact_and_ask}}
<impact_and_ask>
{{impact_and_ask}}
</impact_and_ask>
{{/impact_and_ask}}

1. If the defect or the requirement is missing, ask in one short message and stop. A nonconformance needs both.
2. Identification block: NCR number placeholder, date, supplier, part or product, order, batch or lot, quantity received, quantity inspected, quantity nonconforming.
3. Requirement versus finding: quote the requirement exactly as given, then the actual condition with measurements and how it was found. Reference photos by their identifiers.
4. Classification: suggest major or minor based on the effect on fit, function, safety or compliance as described, and say why. Use the buyer's own classification if given.
5. Impact: the effect on the buyer as stated, with costs listed as claimed amounts only if supplied.
6. Disposition: what will happen to the goods (return, rework by whom, use as is under concession, scrap) and who pays, stated as proposed if not agreed.
7. Required supplier response: containment of other stock (at the supplier, in transit), root cause, corrective and preventive actions, and the deadline for each, and the response format (such as 8D) if the buyer uses one.
8. A short cover message to the supplier contact.
</task>

<constraints>
- Use only facts given. Never invent measurements, tolerances, clause numbers, costs or deadlines; mark gaps `[NEEDED: …]`.
- Factual and neutral; no accusations of intent.
- Do not assert legal rights to compensation; describe cost recovery as a claim subject to the supply agreement.
- Under about 600 words for the report.
</constraints>

<output_format>
## Nonconformance report
Identification (table); Requirement; Finding; Evidence; Classification; Impact; Disposition; Required supplier response (table: Action · Deadline); Contact.
## Cover message
Five to eight sentences.
## Check before sending
Up to four checks, such as quarantine labels, retaining samples, and confirming the drawing revision.
</output_format>
