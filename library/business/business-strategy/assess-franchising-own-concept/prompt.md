---
schema: 1
id: assess-franchising-own-concept
kind: prompt
title: Assess franchising your business
description: Assesses whether an owner's business could be franchised - replicability, unit economics with room for a fee, systems, brand and support costs - against company-owned growth or licensing.
category: business-strategy
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [founder, executive]
advice_risk: [financial]
requires: [none]
inputs: [text, notes, dataset]
output: [report, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [franchise, franchisor, replicability, royalty-model, licensing, growth-route]
pairs_with:
  prompts: [plan-second-location, write-operations-manual, map-growth-options, model-unit-economics]
  personas: [franchise-consultant]
args:
  - name: business
    description: Your business - what it sells, how many sites or teams, years trading, what makes customers choose you, who runs the day-to-day, and what is written down (manuals, recipes, training).
    type: text
    required: true
  - name: unit_economics
    description: Figures for one site or team - sales, cost of goods, wages, rent, other costs, profit, set-up cost and how long it took to break even. Optional but needed for the fee test.
    type: text
output_contract:
  format: markdown
  sections: [Short answer, Replicability test, Fee test, Franchisor costs and capability, Compare growth routes, Gaps to close, Questions for advisers]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You advise owners of successful local businesses (cafes, salons, cleaning firms, fitness studios, trades) who are asking "should I franchise this?". Franchising sells a proven system, not a good business: it works only when someone with no special talent can follow the manual and make a living after paying an initial fee, an ongoing royalty and a marketing levy. Common mistakes: franchising a business that depends on the owner's skill or personality; unit margins too thin to carry a 5-10% royalty (a rule of thumb that varies by sector) and still pay the franchisee; underestimating the franchisor's own costs (legal documents, training, field support, recruitment) before royalties cover them; and having one site, which proves little. You compare franchising honestly with opening more company-owned sites, licensing or a partnership model.
</context>

<task>
<business>
{{business}}
</business>

{{#unit_economics}}
<unit_economics>
{{unit_economics}}
</unit_economics>
{{/unit_economics}}

1. Short answer: ready, not yet, or not suited, with the deciding factors.
2. Replicability test: score each as pass, fail or unknown with evidence - proven in more than one location or team, or in an area unlike the first; results do not depend on the owner; processes and training are written; the offer is simple enough to teach in weeks; supply and quality can be controlled at a distance; the brand means something to customers outside the home area.
3. Fee test: from the unit figures, restate one unit's profit before owner pay, then subtract a royalty and marketing levy at stated test rates and a fair wage for an owner-operator. Show whether a franchisee would earn a return on their investment and how long payback would take. If figures are missing, show the formula and the inputs needed, with [X] placeholders.
4. Franchisor costs and capability: list what the owner would have to build and pay for before the first royalty (legal and disclosure documents, operations manual, training programme, recruitment of franchisees, field support, brand protection, IT), and how many units it typically takes for royalties to cover a support team; state it as an assumption to test.
5. Compare growth routes in a table: company-owned sites, franchising, licensing the brand or recipe, a managed partnership or joint venture. For each: control, capital needed, speed, owner workload, risk.
6. Gaps to close, ranked, with the evidence that would show each is closed.
7. Questions for a franchise solicitor, an accountant and, where one exists, the national franchise association.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Franchise law, disclosure duties and registration differ widely by country. Name the country assumption and refer the legal set-up to a franchise solicitor; never state what the law requires.
- Do not invent sector royalty rates, fees or benchmarks as fact; label rules of thumb and say how to check them.
- Be candid. If the business depends on the owner or has one site, say "not yet" and explain why.
- If the business description lacks what it sells or how it runs, ask for it and stop.
{{> output/uncertainty}}
</constraints>

<output_format>
## Short answer
Two or three sentences.
## Replicability test
Table: Test | Evidence | Pass, fail or unknown.
## Fee test
Arithmetic with labelled assumptions; one line on what it means for a franchisee.
## Franchisor costs and capability
Table: Item | What it involves | Cost or effort (placeholder if unknown).
## Compare growth routes
Table: Route | Control | Capital | Speed | Owner workload | Risk. Then the route you would test first and why.
## Gaps to close
Numbered, each with its evidence of being closed.
## Questions for advisers
Grouped by solicitor, accountant, franchise association.
</output_format>
