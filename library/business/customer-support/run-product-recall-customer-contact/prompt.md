---
schema: 1
id: run-product-recall-customer-contact
kind: prompt
title: Run product recall customer contact
description: Plans customer contact for a small producer's product recall or safety notice - who to tell, notice wording, phone and email scripts, refunds and returns, and records - with the authorities to check.
category: customer-support
version: 1.0.0
status: incubating
stage: [operate, plan]
role: [founder, operations-manager]
subject: [retail, supply-chain]
requires: [none]
inputs: [text, notes]
output: [plan, copy, script, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [product-recall, safety-notice, recall-script, traceability, small-producer]
pairs_with:
  prompts: [plan-business-continuity, write-support-reply]
args:
  - name: product
    description: The product, batches or lot numbers and dates affected, how many units sold, where and how (own shop, website, markets, stockists), and what customer contact details you hold.
    type: text
    required: true
  - name: issue
    description: What is wrong (undeclared allergen, contamination, labelling error, a part that can break or overheat), how you found out, how serious it could be, and anything you have already done.
    type: text
    required: true
  - name: country
    description: Country where the product was sold, which decides the authority to notify and recall rules.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Do now, Who to tell, Recall notice, Contact scripts, Refunds and returns, Records, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help small food, cosmetics and consumer goods producers handle the customer side of a recall or safety notice. In a recall, speed and clarity protect customers and the business: a notice that buries the risk, uses vague batch information, or makes returning the product awkward leaves unsafe products in homes. The usual mistakes are waiting to "be sure" while people keep using the product, notifying customers before or instead of the authority where notification is required, forgetting stockists and market customers with no contact details, and promising refunds the process cannot handle. Country: {{country}}. Recall and notification duties differ by country and product type; this plan names what to check, it does not replace the authority's guidance.
</context>

<task>
<product>
{{product}}
</product>

<issue>
{{issue}}
</issue>

1. Do now: the first actions in order - stop sale and dispatch of affected batches, quarantine stock, identify the authority to contact for this product type in {{country}} (food safety, product safety or cosmetics regulator, as applicable, to confirm), and decide recall (customers return) versus withdrawal (off shelves only) in line with the authority's view. If there is any risk of serious harm, customers are told to stop using the product immediately.
2. Who to tell: a table of every group (authority, stockists and distributors, online customers, market or walk-in customers, insurer, staff) with channel, timing and who sends it.
3. Recall notice: for shop display, website and social media - a clear headline ("Recall: [product]"), product name, photo note, batch or lot and dates, the problem and risk in plain words, what to do (stop using, do not eat or use, return or dispose), refund method, and contact details. No marketing language.
4. Contact scripts: phone script for incoming calls (including someone who has had a reaction: urge medical help first), email to customers you hold details for, and a message for stockists with what to pull and how to return it.
5. Refunds and returns: no receipt needed where possible, how proof is handled, collection or postage paid, and disposal instructions where returning is unsafe.
6. Records: a log of units sold, recovered and destroyed, contacts made, complaints and any illnesses or injuries reported, and keeping copies of notices.
7. Questions: what you need confirmed.
</task>

<constraints>
{{> guardrails/professional-limits}}
- If anyone may be at risk of serious harm, the plan leads with telling customers to stop using the product and seek medical help if they have symptoms, and with contacting the authority.
- Do not state notification duties, deadlines or authority names as fact; name the likely type of authority and tell the business to confirm, and to talk to their insurer and a lawyer.
- Never minimise the risk or write wording that hides the recall, and never admit legal liability in customer messages; state facts and actions.
- Use only the facts given; mark missing batch numbers, dates and contacts as [X].
</constraints>

<output_format>
One opening line: general guidance; confirm duties with the relevant authority, your insurer and a lawyer.
## Do now
Numbered, in order.
## Who to tell
Table: Who | Channel | When | Sent by.
## Recall notice
The notice ready to adapt.
## Contact scripts
Phone, customer email and stockist message under bold labels.
## Refunds and returns
Bullets.
## Records
Checklist.
## Questions
Bullets.
</output_format>
