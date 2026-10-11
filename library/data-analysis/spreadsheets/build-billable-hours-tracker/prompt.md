---
schema: 1
id: build-billable-hours-tracker
kind: prompt
title: Build a billable hours tracker
description: Builds a time log in Excel or Google Sheets by client and project with rates, billable and non-billable time, rounding, unbilled work, retainer burn and an invoice-ready monthly summary.
category: spreadsheets
version: 1.0.0
status: incubating
stage: [build]
role: [consultant, founder, individual, project-manager]
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
tags: [billable-hours, time-tracking, freelancer-billing, retainer, utilisation]
pairs_with:
  prompts: [build-invoice-template-spreadsheet, build-timesheet-calculator, set-up-data-validation]
args:
  - name: work
    description: Your clients and projects, how you bill (hourly, day rate, retainer of so many hours, fixed fee), rates and whether they differ by client, project or person, and who logs time.
    type: text
    required: true
  - name: rules
    description: Billing rules - minimum increment (6 or 15 minutes), rounding per entry or per day, what is non-billable (travel, admin), when you invoice, and the currency.
    type: text
    required: true
  - name: tool
    description: Excel or Google Sheets.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Layout, Time log, Rates, Monthly summary, Retainers and fixed fees, Checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You build time-billing sheets for freelancers, consultants and small agencies. Money leaks in the same places: time logged but never invoiced, rounding applied inconsistently, rates changed mid-year and applied to old entries, and retainers quietly overrun. A sound tracker logs raw time once, applies the client's rounding rule in a separate column, looks the rate up with the most specific match winning (person and project, then project, then client, then default) and freezes it on the entry so later rate changes do not rewrite history, and stamps each entry with an invoice number when it is billed, so unbilled work is simply billable entries with no invoice number. Time arithmetic needs care: durations from start and end times are fractions of a day (multiply by 24 for hours), and times crossing midnight need MOD(end - start, 1). Rounding up to a 15-minute increment is CEILING(hours, 0.25).
</context>

<task>
Build the tracker in {{tool}}.

<work>
{{work}}
</work>

<rules>
{{rules}}
</rules>

1. Layout: tabs for Log (one row per time entry), Clients and Projects (with billing type, rate, currency, retainer hours, budget), Rates (if rates vary by person or date), Summary (client by month), and Invoice Prep.
2. Time log: Date, Person, Client, Project (dropdown filtered by client where the tool allows), Task, Start, End or Duration, Hours `=MOD(End - Start, 1) * 24` or the typed duration, Billable (Y or N, defaulting from the task type), Billed Hours with the rounding rule, Rate, Amount `=IF(Billable="Y", BilledHours * Rate, 0)`, Invoice No. Give each formula.
3. Rates: the lookup that picks the most specific rate (XLOOKUP or INDEX/MATCH with fallbacks), with effective dates if rates change, and a note to paste the rate as a value at month end (or use the date-based lookup) so history does not change.
4. Monthly summary: per client and month: total hours, billable hours, amount, unbilled amount (billable with blank Invoice No), and utilisation (billable over total) per person, using SUMIFS between the month's first and last days.
5. Retainers and fixed fees: hours used against the retainer each month with remaining and overrun flags; for fixed fees, hours spent and the effective hourly rate.
6. Invoice Prep: for a chosen client and month, the list of billable unbilled entries (FILTER in Excel 365 and Google Sheets) grouped by project with totals, ready to copy to an invoice; then the step of writing the invoice number back to those rows.
7. Checks: entries with no client or project, end before start, more than a set number of hours in a day per person, billable entries on non-billable projects, and totals that reconcile between Log and Summary.
</task>

<constraints>
- Rates, rounding increments and retainer sizes live in settings tabs, not in formulas.
- Keep raw time and rounded billed time in separate columns.
- Use functions available in {{tool}}; give an alternative where Excel and Google Sheets differ.
- Do not advise on what to charge; use the user's rates.
- Test the formulas on three sample entries, including one across midnight and one rounded up, and show the results.
</constraints>

<output_format>
## Layout
## Time log
Table: Column | Input or formula.
## Rates
## Monthly summary
Code blocks for the SUMIFS formulas.
## Retainers and fixed fees
## Checks
End with the worked example table: Entry | Raw hours | Billed hours | Rate | Amount.
</output_format>
