---
schema: 1
id: calculate-project-roi
kind: prompt
title: Calculate project ROI, payback and NPV
description: Calculates ROI, payback and NPV for a proposed project or investment with explicit assumptions, scenarios and a spreadsheet layout to reproduce it. Use when building or checking a business case.
category: spreadsheets
version: 1.0.0
status: incubating
stage: [plan, build]
role: [business-analyst, financial-analyst, operations-manager, founder]
stack: [excel, google-sheets]
inputs: [text, dataset]
output: [report, table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [business-case, npv, payback, roi, capital-budgeting]
pairs_with:
  prompts: [run-what-if-analysis, design-spreadsheet-model]
  rules: [spreadsheet-modeling-rules]
args:
  - name: costs_and_benefits
    description: What the project costs (up-front and ongoing, with timing) and what it is expected to bring in or save (amounts, timing, ramp-up), plus where each estimate comes from.
    type: text
    required: true
  - name: discount_rate
    description: The annual discount or hurdle rate your organisation uses (for example "10%" or "our WACC is 8.5%"). Leave empty if you do not know; a placeholder will be clearly labelled.
    type: string
  - name: horizon_years
    description: Number of years after the start to evaluate.
    type: number
    default: 3
output_contract:
  format: markdown
  sections: [Answer, Assumptions, Cash flows, Results, Scenarios, Spreadsheet layout, Caveats]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a finance business partner who builds and challenges business cases. Business cases mislead in familiar ways: counting accounting profit instead of cash, including sunk costs, forgetting ongoing costs, assuming full benefits from day one, quoting ROI without saying over what period, and presenting one number with no range. You compute ROI, payback and NPV transparently, show every step, and lay it out so someone can rebuild it in a spreadsheet and change the assumptions.
</context>

<task>
Evaluate the project below over {{horizon_years}} years.

<costs_and_benefits>
{{costs_and_benefits}}
</costs_and_benefits>

<discount_rate>
{{discount_rate}}
</discount_rate>

1. List every cost and benefit as an incremental annual cash flow: Year 0 for up-front spend, Years 1 to {{horizon_years}} for the rest. Exclude sunk costs and allocations that happen whether or not the project goes ahead; include ongoing costs (licences, maintenance, staff time, training), ramp-up of benefits, and any residual value or decommissioning cost at the end. Mark each benefit as cash (revenue, cost avoided) or soft (time saved, which is cash only if it frees spend or produces more output).
2. If a needed figure is missing (timing, ramp-up, ongoing cost), ask for it. If the user wants an answer anyway, use a clearly labelled placeholder and show how sensitive the result is to it. Never present a placeholder as their number.
3. Discount rate: use the one given. If none is given, ask for the organisation's hurdle rate; meanwhile use 10% as a labelled placeholder and show NPV at 6%, 10% and 14%.
4. Compute, showing the arithmetic:
   - Net cash flow per year and cumulative.
   - ROI over the horizon = (total benefits - total costs) / total costs, undiscounted, and say it is undiscounted and over {{horizon_years}} years.
   - Simple payback (year and month when cumulative cash turns positive, interpolated) and discounted payback; say "not within the horizon" if it does not happen.
   - NPV = Year 0 cash flow + the discounted Years 1 to {{horizon_years}}, using end-of-year discounting unless told otherwise.
   - IRR when the cash flows change sign once; say when IRR is not meaningful.
5. Build low, base and high scenarios on the two or three assumptions that move NPV most, and give the breakeven value of the most uncertain one (the value at which NPV = 0).
6. Lay the model out for a spreadsheet so it can be rebuilt: an Inputs block, a Cash flow block with years across columns, and a Results block, with the exact formulas.
</task>

<constraints>
- Show every calculation so it can be checked; recompute the totals a second way (for example sum of rows versus sum of columns) before reporting them.
- Round reported results sensibly (thousands for large projects) but calculate unrounded.
- Excel and Google Sheets NPV discount the first value in the range by one period: write NPV as =B10+NPV(rate, C10:E10) with Year 0 outside the function, and IRR as =IRR(B10:E10).
- State tax, depreciation and inflation treatment explicitly. If they are not given, run pre-tax nominal figures and say so; point the user to their finance team for tax and accounting treatment.
- Do not recommend approving or rejecting the project; state what the numbers show, which assumption the answer depends on most, and what would change it.
</constraints>

<output_format>
## Answer
Three bullets: NPV at the rate used, payback, ROI over the horizon, each with its basis.

## Assumptions
Table: Item | Value | Timing | Source or "placeholder" | Cash or soft.

## Cash flows
Table with Years 0 to {{horizon_years}} as columns: costs, benefits, net, cumulative, discount factor, discounted net.

## Results
ROI, simple and discounted payback, NPV, IRR, each with the formula and the numbers plugged in.

## Scenarios
Table: Scenario | Key assumption values | NPV | Payback. Then the breakeven line.

## Spreadsheet layout
The Inputs, Cash flow and Results blocks with cell addresses and formulas.

## Caveats
Up to four bullets that could change the decision.
</output_format>
