---
schema: 1
id: prepare-franchisee-validation-calls
kind: prompt
title: Prepare franchisee validation calls
description: Prepares a prospective franchise buyer to call current and former franchisees - who to call, questions on real sales, costs, support and regrets, red flags and a comparison sheet.
category: entrepreneurship
version: 1.0.0
status: incubating
stage: [discover]
role: [founder, individual]
requires: [none]
inputs: [text, notes]
output: [checklist, questions, table]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [franchise, due-diligence, franchisee-validation, red-flags, call-script]
pairs_with:
  prompts: [evaluate-buying-a-business, evaluate-franchise-territory, plan-franchise-unit-opening]
  workflows: [franchise-purchase-track]
args:
  - name: franchise
    description: The franchise brand and format you are considering (for example "a children's swim school franchise, mobile model" or "a coffee kiosk brand, 40 units").
    type: string
    required: true
  - name: concerns
    description: What worries you or what the franchisor has told you that you want to test - projected sales, fees, support promises, territory, supplier prices. Rough notes are fine.
    type: text
  - name: calls_planned
    description: How many franchisees you can realistically call.
    type: number
    default: 10
output_contract:
  format: markdown
  sections: [Who to call, Before each call, Call script, Red flags in the answers, Comparison sheet, After the calls]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help someone who is thinking of buying a franchise prepare validation calls: phone or in-person conversations with people who already run, or used to run, a unit of the same brand. These calls are the single best check on the franchisor's sales pitch, and buyers usually waste them in three ways: they call only the names the franchisor hand-picks (often the best performers), they ask polite, general questions ("are you happy?") instead of numbers and specifics, and they take notes they cannot compare across calls. Former franchisees, who left or failed, are the most informative and the hardest to find.

Franchise: {{franchise}}
Calls planned: {{calls_planned}}
</context>

<task>
{{#concerns}}
What the buyer wants to test:

<concerns>
{{concerns}}
</concerns>
{{/concerns}}

1. Who to call: split the {{calls_planned}} calls across current franchisees chosen by the buyer from the full list (not only the franchisor's referrals), units open under two years, units open five years or more, units similar to the planned one (format, area type), and former franchisees. Say where to find names: the franchisee list and the list of units that closed or changed hands in the disclosure document (where the country requires one), the brand's store locator, local business listings, trade press and industry groups. Aim for at least a third of calls to be ones the franchisor did not suggest.
2. Before each call: what to read (the disclosure or information document, any financial performance figures, the fee schedule), a short respectful request message, and timing (out of trading hours, 20-30 minutes, offer to visit and buy them a coffee).
3. Call script: about 15 questions grouped as money (sales in year one and now against what they were told, how long to break even, when they first paid themselves, total investment against the franchisor's estimate, costs they did not expect, supplier prices against the open market), support (training, launch help, field visits, what happens when they ask for help), the system (marketing fund value, technology, rule changes since signing, territory encroachment), the relationship (disputes, the franchisee association, how renewals and resales go) and regret ("would you buy again, knowing what you know?", "what would you do differently?"). Add follow-up probes for vague answers ("roughly how much?", "in which month?"). Tailor at least three questions to the buyer's concerns.
4. Red flags in the answers: a table of patterns and why they matter - for example several franchisees unwilling to talk or bound by gag clauses, many recent closures or resales, year-one sales well below the franchisor's figures, compulsory suppliers dearer than the market, rising fees, legal disputes, owners working far more hours than told.
5. Comparison sheet: a table the buyer fills in after each call so answers can be compared side by side.
6. After the calls: how to read the sheet (patterns across several callers count, one angry or glowing call does not), what to take back to the franchisor as written questions, and what to bring to a franchise-experienced solicitor and an accountant.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never state what this brand's sales, fees, failure rate or reputation are; you do not know. Everything about the brand comes from the buyer's calls and documents.
- Disclosure rules differ by country (some require a disclosure document with franchisee lists, others do not). Ask for the country if it matters and frame these as things to check.
- Do not tell the buyer whether to buy. Help them gather evidence and decide with their advisers.
- Keep the request message honest: the buyer says who they are and why they are calling; no pretexting.
- If the franchise or format is missing or too vague to tailor questions, ask for it before writing the script.
</constraints>

<output_format>
## Who to call
Table: Group | Number of calls | Where to find names | Why this group.

## Before each call
Bullets, then the request message (under 80 words).

## Call script
Numbered questions under the five group headings, each with a probe in italics.

## Red flags in the answers
Table: What you hear | Why it matters | What to ask next.

## Comparison sheet
Table with one column per franchisee (Franchisee 1, 2, 3...) and rows: years open, chosen by (me or franchisor), year-one sales vs told, months to break even, owner pay, unexpected costs, support rating 1-5, would buy again.

## After the calls
Bullets: reading the sheet, written questions for the franchisor, what to bring to the solicitor and accountant.
</output_format>
