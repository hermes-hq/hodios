---
schema: 1
id: file-india-gst-returns
kind: prompt
title: File India GST returns
description: Walks a small Indian business through a GST filing cycle - GSTR-1, GSTR-3B, matching input tax credit to GSTR-2B, blocked credits, deadlines and late fees - with a reconciliation sheet.
category: taxes
version: 1.0.0
status: incubating
stage: [operate, review]
role: [founder, consultant]
requires: [none]
inputs: [dataset, preferences]
output: [checklist, table, plan]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [gst, gstr-3b, gstr-1, input-tax-credit, india, gstr-2b]
pairs_with:
  prompts: [plan-business-tax-calendar, track-business-expenses, prepare-vat-return-workpaper]
args:
  - name: business
    description: What you sell (goods, services or both), state, turnover range, monthly filer or QRMP scheme, whether you sell to businesses (B2B), consumers (B2C) or export, and whether you use e-invoicing.
    type: text
    required: true
  - name: period
    description: The month or quarter you are filing for.
    type: string
    required: true
  - name: data
    description: Sales and purchase totals or lists for the period, and anything you already see in GSTR-2B or the invoice management view. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Returns due this period, GSTR-1 contents, ITC reconciliation with GSTR-2B, Reverse charge, GSTR-3B summary, Checklist before filing, Questions for your GST practitioner]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a small business owner in India get one GST return cycle right, the way a careful GST practitioner reviews a client's month. The cycle has two returns that must agree. GSTR-1 reports outward supplies invoice by invoice for B2B (so buyers can claim credit) and in summary for B2C, plus credit and debit notes and HSN or SAC summaries. GSTR-3B is the summary return where tax is actually paid: output tax, eligible input tax credit (ITC), reverse charge, and the net cash payable. ITC can only be claimed when the conditions are met: you hold a valid tax invoice, received the goods or services, the supplier has filed and the invoice appears in your auto-drafted GSTR-2B, and the credit is not blocked (for example most motor vehicles, food and beverages, personal consumption, works contract for building immovable property). Small businesses can opt for QRMP, filing quarterly with monthly tax payments. Late filing attracts late fees per day and interest on unpaid tax; repeated non-filing can block e-way bills or lead to cancellation. Common mistakes: claiming ITC from purchase registers rather than GSTR-2B, missing reverse charge on services such as legal fees or goods transport where it applies, mismatches between GSTR-1 and GSTR-3B output tax, and wrong place of supply (CGST and SGST versus IGST).

Business: {{business}}
Period: {{period}}
{{#data}}Data: {{data}}{{/data}}
</context>

<task>
1. State which returns are due for {{period}} given their scheme (monthly or QRMP, including the optional invoice furnishing facility) and the usual due dates, each marked "check the current due date and any extension on the portal".
2. Outward supplies: list what goes into GSTR-1 for their business type: B2B invoices with GSTIN, B2C summaries, exports, credit and debit notes, HSN or SAC summary. Flag place-of-supply checks for interstate sales.
3. Input tax credit: lay out the reconciliation of their purchase register against GSTR-2B: matched, in books but not in 2B (follow up with the supplier, do not claim yet), in 2B but not in books (verify it is genuine), and blocked credits to exclude. Mention the invoice management step for accepting or rejecting supplier invoices where it applies, with "check current portal rules".
4. Reverse charge: list services or goods in their purchases that may fall under reverse charge and need self-invoicing and payment in cash.
5. GSTR-3B: show how the figures fill the main tables (output tax, ITC, reverse charge, net payable by tax head) using only their numbers, and the order in which ITC is set off against IGST, CGST and SGST in general terms, with "confirm on the portal".
6. Close the month: a pre-submission checklist, payment of the net cash liability, and records to keep. Mention the annual return in passing if the period is the last of the year.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not invent GST rates for their products; ask for the HSN or SAC and rate they use, or tell them to confirm it.
- Do not help claim ITC on fake or circular invoices, or under-report sales. Decline in one sentence.
- Mark every due date, late fee and threshold as "check current".
- Recommend a GST practitioner or chartered accountant for: notices, ITC reversals for past periods, exports with or without LUT, e-commerce operator sales, composition scheme decisions, or registration in multiple states.
- Ask the user not to share GSTIN login credentials or OTPs.
{{> output/uncertainty}}
</constraints>

<output_format>
## Returns due this period
## GSTR-1 contents
## ITC reconciliation with GSTR-2B
Table: Category | Count or amount (from you) | Action.
## Reverse charge
## GSTR-3B summary
Table: Table or head | Amount (from you) | Note.
## Checklist before filing
## Questions for your GST practitioner
</output_format>
