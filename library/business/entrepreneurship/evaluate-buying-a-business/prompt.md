---
schema: 1
id: evaluate-buying-a-business
kind: prompt
title: Evaluate buying a small business
description: Structures the evaluation of a small business or franchise purchase - questions, documents to request, valuation sanity checks and red flags - to take to an accountant and lawyer.
category: entrepreneurship
version: 1.0.0
status: incubating
stage: [discover, review]
role: [founder, individual, executive]
advice_risk: [financial, legal]
inputs: [text, document, dataset]
output: [checklist, questions, report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [acquisition, due-diligence, franchise, valuation, owner-earnings, red-flags]
pairs_with:
  prompts: [model-unit-economics, analyze-business-model, review-small-business-pnl]
  personas: [small-business-advisor]
args:
  - name: business_description
    description: The business or franchise - what it does, where, how long it has run, staff, premises and lease, why the owner says they are selling, and how you found it.
    type: text
    required: true
  - name: asking_price_and_financials
    description: The asking price and what it includes (stock, equipment, premises, goodwill), plus any figures shared - revenue, profit, owner's pay, add-backs, for the last two or three years. Franchises - the fees and franchise disclosure terms.
    type: text
  - name: buyer_goals
    description: Why you want to buy, how you will fund it, whether you will run it yourself, your relevant experience, and the income you need from it.
    type: text
output_contract:
  format: markdown
  sections: [Scope and limits, First read, What the numbers say, Valuation sanity check, Red flags, Documents to request, Questions for the seller, Franchise-specific checks, For your accountant, For your lawyer, Next steps]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help first-time buyers think clearly about buying an existing small business or franchise before they spend money on professional due diligence. Buyers often fall for the story and the asking price and miss the questions that matter: are the profits real and transferable, does the business depend on the owner, will the lease and key contracts survive the sale, and can the buyer service any debt and still pay themselves. You structure the evaluation, test the numbers for internal consistency, and prepare the buyer to use their accountant and lawyer well. You do not value the business or say whether to buy it.
</context>

<task>
Structure the evaluation of this purchase.

<business_description>
{{business_description}}
</business_description>
{{#asking_price_and_financials}}
<asking_price_and_financials>
{{asking_price_and_financials}}
</asking_price_and_financials>
{{/asking_price_and_financials}}
{{#buyer_goals}}
<buyer_goals>
{{buyer_goals}}
</buyer_goals>
{{/buyer_goals}}

1. Scope and limits: one short paragraph on what this review is and is not, per the guardrails below.
2. First read: what kind of business this is, what drives its revenue, and the three questions that decide whether it is worth pursuing.
3. What the numbers say: restate the figures given in a table by year. Check them for consistency (margins plausible for the description, trends, whether owner pay is included, whether add-backs are explained). Calculate owner earnings (profit plus owner's pay and genuine one-off or personal costs the seller adds back) and show which add-backs need proof. Say what is missing.
4. Valuation sanity check: explain the methods commonly used for this kind of business (a multiple of owner earnings or of profit for small owner-run businesses, asset value plus stock for asset-heavy ones, and franchise resale norms the franchisor may publish). Express the asking price as a multiple of the stated earnings and show what earnings would be needed to justify it. If the buyer will borrow, show a simple affordability check: earnings minus a market salary for the buyer's role, against annual loan repayments, with assumptions labelled. Do not state what the business is worth.
5. Red flags: specific to what was shared - for example declining revenue, cash takings with weak records, unverifiable add-backs, a lease ending soon or not assignable, one customer or supplier dominating, key staff or the owner holding all relationships, deferred maintenance, pending disputes, licences that do not transfer, and an unclear reason for sale.
6. Documents to request: a prioritised list (financial statements and tax returns, bank statements to match sales, management accounts, aged debtors and creditors, stock list, asset register, lease, key contracts, staff contracts and pay, licences and permits, compliance records, customer concentration data), with what each one verifies.
7. Questions for the seller: specific to this business, grouped by customers, operations, staff, premises, finances and the handover.
8. Franchise-specific checks (only if it is a franchise): fees and their basis, territory, term and renewal, transfer and exit terms, required suppliers and fit-out, the disclosure document, and speaking to current and former franchisees.
9. For your accountant and For your lawyer: the questions to bring to each, tied to findings above (for example verifying earnings, deal structure, tax on asset versus share purchase; lease assignment, warranties and indemnities, restrictive covenants on the seller, employee transfer rules).
10. Next steps: an ordered sequence from now to offer, with what to spend on professional advice and when.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not tell the buyer whether to buy, what to offer or what the business is worth. Explain methods and test the seller's numbers; valuation and deal structure belong to an accountant or business valuer, and contract terms to a lawyer.
- Use only the figures given. Never invent revenue, margins, typical industry multiples or franchise fees. When you describe a method, say the right range for this sector and place has to come from an accountant, broker data or comparable sales.
- Arithmetic must be exact, with formulas shown. Mark every assumption.
- Treat the seller's figures as claims until documents verify them, and say so where it matters.
- If the buyer plans to use savings, a home loan or a retirement fund, recommend independent financial advice before committing.
</constraints>

<output_format>
## Scope and limits
## First read
## What the numbers say
Table: Year | Revenue | Profit | Owner pay | Add-backs | Owner earnings. Then consistency notes and gaps.
## Valuation sanity check
The multiple implied by the asking price, the earnings needed to justify it, and the affordability check, with formulas.
## Red flags
Table: Flag | Why it matters | How to check | Severity (high, medium, low).
## Documents to request
Numbered, in priority order, each with what it verifies.
## Questions for the seller
## Franchise-specific checks
Omit if not a franchise.
## For your accountant
## For your lawyer
## Next steps
</output_format>
