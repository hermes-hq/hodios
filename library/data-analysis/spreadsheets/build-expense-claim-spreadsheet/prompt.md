---
schema: 1
id: build-expense-claim-spreadsheet
kind: prompt
title: Build an employee expense claim spreadsheet
description: Builds an employee expense claim form in Excel or Google Sheets with categories, receipt references, mileage, currency conversion, reclaimable sales tax, policy limit flags and approval totals.
category: spreadsheets
version: 1.0.0
status: incubating
stage: [build]
role: [operations-manager, manager, founder, financial-analyst]
stack: [excel, google-sheets]
advice_risk: [financial]
inputs: [text]
output: [table, code, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [expense-claims, mileage-allowance, reimbursement, currency-conversion, receipts]
pairs_with:
  prompts: [set-up-data-validation, build-invoice-template-spreadsheet, set-up-receipts-workflow]
  personas: [bookkeeper]
args:
  - name: policy
    description: Your expense policy - categories, per-item or daily limits, mileage rate per km or mile (and any change above a distance threshold), which currency claims are paid in, how exchange rates are set, whether the business reclaims sales tax (VAT, GST), and who approves.
    type: text
    required: true
  - name: claimants
    description: Who claims (employees, contractors, volunteers), how often, and how claims are submitted and paid today.
    type: text
    required: true
  - name: tool
    description: Excel or Google Sheets, and whether the claim is a file per person per month or one shared sheet.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Layout, Claim lines, Mileage, Currency and tax, Policy checks, Approval and totals, Rules to confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You build expense claim forms that finance teams can approve and post without retyping. A good claim separates what is reimbursable (paid personally) from what is not (company card, already paid by the business), keeps one line per receipt with a receipt reference, converts foreign spending at a stated rate with the rate shown, and records reclaimable sales tax only from what the receipt shows, because tax can only be reclaimed with a valid receipt and only by a registered business; calculating it backwards from a gross amount at a standard rate overstates it. Mileage uses the employer's rate, which may change above a yearly distance threshold, so the claim needs the claimant's distance so far this year. Tax-free mileage and allowance rates, and receipt rules, differ by country and change, so they are inputs, not facts in the sheet. Totals by category and by cost centre make posting to the ledger quick.
</context>

<task>
Build the expense claim in {{tool}}.

<policy>
{{policy}}
</policy>

<claimants>
{{claimants}}
</claimants>

1. Layout: tabs for Claim (header: claimant, ID, period, cost centre, claim currency; then lines), Mileage (trip log), Settings (categories with ledger code and limits, mileage rates and threshold, approved currencies and rates), and Summary for approval. If one shared sheet is used, add a claim ID per line.
2. Claim lines: Date, Category (dropdown), Description, Receipt Ref, Paid By (personal or company card), Currency, Amount in currency, Exchange rate (looked up or typed with source), Amount in claim currency `=ROUND(amount * rate, 2)`, Tax on receipt, Net, Reimbursable `=IF(PaidBy="Personal", amount, 0)`. Give each formula.
3. Mileage: trip log (date, from, to, purpose, distance, vehicle) with the amount using the user's rate, and when the rate changes above a threshold, split each trip on prior distance: `=MIN(dist, MAX(0, Threshold - PriorYTD)) * Rate1 + MAX(0, dist - MAX(0, Threshold - PriorYTD)) * Rate2`, with PriorYTD carried from earlier claims as an input.
4. Currency and tax: how the exchange rate is chosen per the policy (card statement rate, a fixed monthly rate) and recorded; tax entered only from the receipt, with a flag where tax is entered but no receipt reference.
5. Policy checks: flags for over category limits (per item or per day with SUMIFS by date and category), missing receipt references, dates outside the claim period, possible duplicates (same date, amount and category), and company-card lines included in the reimbursable total.
6. Approval and totals: totals by category and ledger code (SUMIFS), reimbursable total, tax total, mileage total, sign-off fields for claimant declaration and approver with date, and a status (submitted, approved, paid).
7. Rules to confirm: anything missing or unclear in the policy, and a note that tax and allowance rules should be checked locally.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use the user's rates, limits and categories as Settings inputs; never state a country's tax-free mileage rate or tax rules as fact.
- Do not compute reclaimable tax from gross amounts; take it from the receipt.
- No hard-coded rates in formulas.
- Keep personal data to what the claim needs.
- Use functions available in {{tool}} and test the formulas on two sample lines and one trip that crosses the threshold, showing the results.
</constraints>

<output_format>
## Layout
## Claim lines
Table: Column | Input or formula.
## Mileage
Code block, then the worked threshold example.
## Currency and tax
## Policy checks
Table: Check | Formula | What to do.
## Approval and totals
## Rules to confirm
</output_format>
