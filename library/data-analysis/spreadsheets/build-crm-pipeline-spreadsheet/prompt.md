---
schema: 1
id: build-crm-pipeline-spreadsheet
kind: prompt
title: Build a sales pipeline spreadsheet
description: Builds a sales pipeline tracker in Excel or Google Sheets with deal stages, stage probabilities, a weighted forecast by month, next actions and flags for overdue follow-ups and stale or slipped deals.
category: spreadsheets
version: 1.0.0
status: incubating
stage: [build]
role: [sales-rep, founder, manager, consultant]
stack: [excel, google-sheets]
inputs: [text]
output: [table, code, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [sales-pipeline, deal-tracker, weighted-forecast, follow-ups, crm-lite]
pairs_with:
  prompts: [review-sales-pipeline, write-conditional-formatting-rules, set-up-data-validation]
args:
  - name: sales_process
    description: Your deal stages in order and what has to be true to enter each, typical deal size and sales cycle, and how many deals are open at once.
    type: text
    required: true
  - name: needs
    description: What you want from the sheet - monthly forecast, target coverage, follow-up reminders, win and loss reasons, per-owner views - and how many people use it.
    type: text
    required: true
  - name: tool
    description: Excel or Google Sheets.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Layout, Deals table, Stage settings, Forecast, Flags and views, Using it each week]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You build pipeline trackers for small sales teams and founders who are not ready for a CRM. A weighted forecast multiplies each open deal's value by a stage probability and sums by expected close month; it is meaningless for a single deal and only useful in aggregate. Stage probabilities are guesses until they are checked against the team's own win history, so they belong in a settings table, not inside formulas. Pipelines decay in predictable ways: close dates that are already in the past but the deal is still open, deals that have sat in one stage far longer than the usual cycle, and deals with no next action or a next action date that has passed. Stages should be defined by what the buyer has done (agreed a demo, received a proposal), not by the seller's hopes. Won and lost deals must stay in the table with a date and a reason, because they are the data for checking probabilities later.
</context>

<task>
Build the pipeline tracker in {{tool}}.

<sales_process>
{{sales_process}}
</sales_process>

<needs>
{{needs}}
</needs>

1. Layout: tabs for Deals (one row per deal), Settings (stages, probabilities, owners, stale-days limit, monthly targets), Forecast, and My Actions or per-owner views.
2. Deals table: columns with type and source: Deal ID, Company, Contact, Owner (dropdown), Stage (dropdown), Value, Expected Close, Probability (looked up from Settings by stage), Weighted Value, Next Action, Next Action Date, Last Contact, Stage Entered Date, Created, Closed Date, Lost Reason. Give the formulas for looked-up and computed columns.
3. Stage settings: the stage table with entry criteria from the user's process, a default probability for each (labelled as a starting assumption), Won at 100% and Lost at 0%.
4. Forecast: weighted and unweighted open pipeline by expected close month with SUMIFS between the month's first and last day (`EOMONTH(month, -1) + 1` to `EOMONTH(month, 0)`), excluding Won and Lost; won value by month from Closed Date; coverage of target (open pipeline divided by remaining target) with a note on what coverage the user should expect from their own win rate.
5. Flags and views: formulas for overdue next action, missing next action, close date in the past while open, and stale in stage (`TODAY() - [Stage Entered Date]` over the limit); conditional formatting for each; a filtered My Actions list per owner (FILTER in Excel 365 and Google Sheets, or a filter view).
6. Using it each week: a 15-minute routine: update stages and dates, clear flags, review the forecast, and once a quarter compare actual win rates by stage with the probabilities.
</task>

<constraints>
- Probabilities, targets and limits live in Settings, never in formulas.
- Use only the user's stages; do not invent a sales methodology.
- Use functions available in {{tool}}; note where Excel and Google Sheets differ.
- Keep contact data minimal and mention access control, since the sheet holds personal data about customers.
- If the team has more than a handful of users or needs email logging, say a CRM may now be cheaper than the time spent.
</constraints>

<output_format>
## Layout
## Deals table
Table: Column | Type | Formula or input.
## Stage settings
Table: Stage | Entry criteria | Probability.
## Forecast
Code blocks for each formula.
## Flags and views
## Using it each week
</output_format>
