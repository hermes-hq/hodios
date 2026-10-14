---
schema: 1
id: evaluate-accelerator-offer
kind: prompt
title: Evaluate an accelerator offer
description: Evaluates an accelerator or incubator offer you received - equity and terms, the real value of the programme, alumni checks to run and the questions to ask before you sign.
category: entrepreneurship
version: 1.0.0
status: incubating
stage: [review]
role: [founder]
advice_risk: [legal, financial]
requires: [none]
inputs: [document, text]
output: [report, table, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [accelerator, incubator, equity-cost, programme-terms, alumni-references]
pairs_with:
  prompts: [write-accelerator-application, model-round-dilution, explain-term-sheet, reference-check-investor]
  personas: [startup-mentor]
args:
  - name: offer
    description: The offer and terms as written - investment amount, equity or other instrument, fees, programme length and location, what is provided, obligations, and any side letters. Paste the text if you have it.
    type: text
    required: true
  - name: startup
    description: Your startup's stage, what you most need in the next 12 months (customers, product, hiring, fundraising, credibility), other offers, and whether the founders can relocate or commit the time.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Terms in plain words, Cost of the deal, Value check, Red flags, Alumni and reference checks, Questions to ask, Verdict]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help founders judge accelerator and incubator offers. Programmes vary enormously: some provide a strong network, investor access and a demo day that leads to a round; others take equity for office space and generic workshops. The equity cost is often larger than it looks, because a fixed percentage for a modest amount implies a valuation and dilutes the founders before the next round, and some deals add fees, pro-rata rights, information rights or a share of future rounds. The best evidence of value is what recent alumni at a similar stage got: introductions, follow-on funding, customers, and how much founder time the programme consumed.

<offer>
{{offer}}
</offer>

<startup>
{{startup}}
</startup>
</context>

<task>
1. Terms in plain words: restate each term - money, instrument, equity or conversion terms, fees, rights the programme gets (pro-rata, board or observer seats, information rights, rights over future rounds), obligations (relocation, attendance, exclusivity), and anything missing or unclear.
2. Cost of the deal: compute the implied valuation (investment ÷ equity %) where possible, show the founders' dilution, and add the time cost of the programme. Note fees or services that reduce the cash actually received.
3. Value check: list what the programme claims to provide and rate each against what this startup needs in the next 12 months. Separate what is unique to the programme from what the founders could get elsewhere free or cheaply.
4. Red flags: high equity for little cash, upfront fees, vague mentor lists, unclear rights over future rounds, pressure to sign fast, no verifiable alumni outcomes, broad IP or exclusivity clauses.
5. Alumni and reference checks: who to contact (recent alumni at a similar stage, including ones who did not do well) and what to ask them.
6. Questions to ask the programme before signing.
7. Verdict: accept, negotiate (which terms), or decline, with reasons tied to the startup's needs.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only the terms given. Do not state what a named programme typically offers or invent alumni outcomes.
- If the instrument or clauses are unclear, say what must be clarified and recommend a startup lawyer review the documents before signing.
- Show any dilution or valuation arithmetic.
- Do not dismiss the offer because it costs equity; judge whether the value is worth that cost for this startup.
</constraints>

<output_format>
## Terms in plain words
Table: Term | What it means | Unclear or missing.
## Cost of the deal
Arithmetic, then a short note on time cost.
## Value check
Table: Claimed benefit | Need it? | Unique to the programme? | Rating.
## Red flags
Bullets, or "None found" with what was checked.
## Alumni and reference checks
## Questions to ask
## Verdict
</output_format>
