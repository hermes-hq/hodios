---
schema: 1
id: prepare-shipping-documents-checklist
kind: prompt
title: Prepare a shipping documents checklist
description: Builds a document checklist for an international shipment - commercial invoice, packing list, transport document, origin proof, licences and declarations - with who prepares each and common errors.
category: operations
version: 1.0.0
status: incubating
stage: [plan, ship]
role: [operations-manager, founder]
subject: [ecommerce]
requires: [none]
inputs: [notes, text]
output: [checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [shipping-documents, commercial-invoice, customs, export, importing, freight-forwarder]
pairs_with:
  prompts: [calculate-landed-cost, plan-order-fulfilment]
  workflows: [import-first-shipment-track]
args:
  - name: goods
    description: What is being shipped - description, materials, quantity, value, tariff code if known, and anything special such as food, plants, batteries, chemicals, medical, or items with possible military or dual use.
    type: text
    required: true
  - name: origin
    description: The country the goods ship from.
    type: string
    required: true
  - name: destination
    description: The country the goods ship to.
    type: string
    required: true
  - name: mode
    description: How the goods travel.
    type: enum
    enum: [air, sea, road, courier]
    default: sea
  - name: your_side
    description: Whether you are the exporter or the importer, which decides which documents you prepare and which you must obtain.
    type: enum
    enum: [exporter, importer]
    default: exporter
output_contract:
  format: markdown
  sections: [Shipment summary, Document checklist, Special documents to check, Sequence, Common errors, Questions for your forwarder or broker]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help small businesses get their paperwork right for an international shipment. Most delays and extra charges at the border come from documents, not transport: a vague goods description, a value on the invoice that does not match the packing list, a missing proof of origin that loses a duty preference, or a licence nobody knew the product needed. A few documents are needed for almost every shipment (commercial invoice, packing list, transport document, export and import declarations); others depend on the product, the route and the mode. Requirements change and differ by country pair, so the checklist is a working list to confirm with the freight forwarder or customs broker, not a statement of the law.

Goods: {{goods}}
From {{origin}} to {{destination}}, by {{mode}}. You are the {{your_side}}.
</context>

<task>
1. If the goods description is too vague to tell what kind of product it is, ask for detail and stop.
2. Summarise the shipment and the facts that drive the document list: product type, any controlled or special category, mode, and whether a trade agreement between {{origin}} and {{destination}} might give lower duty if origin is proven `[CHECK]`.
3. Build the core checklist for a {{mode}} shipment: commercial invoice (with the fields it needs: seller and buyer, consignee, goods description, tariff code, country of origin, quantity, unit and total value, currency, incoterm, invoice number and date), packing list, the transport document for this mode (bill of lading or sea waybill, air waybill, road consignment note, or courier waybill), export declaration, import declaration, trader registration numbers where required, and insurance certificate if arranged. For each give who prepares it, when, and whether the {{your_side}} must prepare or obtain it.
4. Add the special documents this product may need, each as an item to check: export licences for controlled or dual-use goods, health or phytosanitary certificates for food, plants and animal products, dangerous goods declaration and packaging rules (for example lithium batteries), certificates of conformity or product safety marks, protected species permits, and certificates or statements of origin.
5. Put the documents in sequence from order to delivery, with the latest safe date for each relative to departure.
6. List the common errors for this shipment and how to avoid them.
7. List questions for the forwarder or broker.
8. Before writing the final version, check that every document is assigned to someone and that every special requirement is marked `[CHECK]` rather than stated as certain.
</task>

<constraints>
- Do not state that a licence, certificate or rule applies or does not apply as fact; mark it `[CHECK]` and name who confirms it.
- Never suggest undervaluing goods, misdescribing them or splitting shipments to avoid duty or controls; if asked, decline and explain the risk.
- Keep the checklist specific to this shipment; leave out documents that clearly do not apply and say why in one line.
</constraints>

<output_format>
## Shipment summary
## Document checklist
Table: Document | Purpose | Prepared by | When | Your action (prepare, obtain, check).
## Special documents to check
Bullets with `[CHECK: …]` and who confirms.
## Sequence
Numbered timeline.
## Common errors
## Questions for your forwarder or broker
At most six.
</output_format>
