---
schema: 1
id: build-timesheet-calculator
kind: prompt
title: Build a timesheet calculator
description: Builds a timesheet with hours worked, breaks, overtime rules and shifts that cross midnight, with formulas that handle time arithmetic correctly. Use when tracking hours and pay in a spreadsheet.
category: spreadsheets
version: 1.0.0
status: incubating
stage: [build]
role: [operations-manager, manager, founder, individual]
stack: [excel, google-sheets]
inputs: [text]
output: [table, code, tests]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [timesheet, overtime, time-arithmetic, night-shifts, payroll-prep]
pairs_with:
  prompts: [calculate-dates-and-workdays, set-up-data-validation]
args:
  - name: pay_rules
    description: How hours are paid - regular rate, daily and weekly overtime thresholds and multipliers, paid or unpaid breaks, night, weekend or holiday premiums, rounding of clock times, and the pay week start day.
    type: text
    required: true
  - name: app
    description: Spreadsheet application to build it in.
    type: enum
    enum: [excel, google-sheets]
    default: excel
output_contract:
  format: markdown
  sections: [Rules as understood, Sheet layout, Formulas, Weekly summary, Formatting, Test cases, Limits]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You build timesheets that payroll can trust. Spreadsheets store times as fractions of a day, so 08:00 is 0.333 and 8 hours of pay is not 8 until you multiply by 24. Most timesheet errors come from that: negative hours on night shifts, weekly totals that wrap past 24 hours and show 3:00 instead of 51:00, rounding applied to the wrong number, and overtime counted twice when daily and weekly rules both apply.
</context>

<task>
Build a timesheet in {{app}} that applies these pay rules.

<pay_rules>
{{pay_rules}}
</pay_rules>

1. Restate the rules as a numbered list. Where a rule is ambiguous, ask in one short list and build with a labelled assumption. Typical gaps: whether daily and weekly overtime stack (the usual approach counts hours once, at the higher applicable rate), which day a shift crossing midnight belongs to (usually the day it started), whether breaks are paid, and the rounding increment and direction.
2. Settings sheet: named cells for every number in the rules (rate, thresholds, multipliers, break rules, rounding increment, week start).
3. Daily rows: Date, Employee, Start time, End time, Unpaid break (minutes), and computed columns:
   - Shift length that works across midnight: `MOD(End - Start, 1)`, so 22:00 to 06:00 gives 8 hours.
   - Rounded clock times if the rules round: `MROUND` to the increment (or `FLOOR`/`CEILING` if the rule rounds in one direction), applied to the clock times before subtraction, as the rule says.
   - Paid hours as a decimal: `(Shift length - Break / 1440) * 24`.
   - Night-premium hours if the rules have them: the overlap of the shift with the night window, computed with `MAX(0, MIN(...) - MAX(...))` on both sides of midnight.
   - Daily regular and daily overtime hours from the daily threshold.
4. Weekly summary per employee: total paid hours, weekly overtime as hours above the weekly threshold minus overtime already counted daily (so nothing is paid twice), regular hours, and pay per category from the Settings rates. Assign rows to weeks with a week-start formula (`Date - WEEKDAY(Date, n) + 1` with the right `n` for the week start day).
5. Data checks: missing start or end, end equal to start, break longer than the shift, shifts over a maximum length you name, duplicate rows for the same employee and date.
6. Test cases with expected results computed by hand: a normal day, a shift crossing midnight, a shift ending exactly at midnight, a long day that triggers daily overtime, a week that triggers weekly overtime, and a rounding edge (one minute either side of the rounding point).
</task>

<constraints>
- Convert to decimal hours (multiply by 24) before multiplying by a pay rate; never multiply a time value by a rate directly.
- Use only functions available in {{app}}, comma separators, and note once that some locales use semicolons.
- No numbers from the rules typed into formulas; use the Settings names.
- Apply the user's rules as given. Do not state what labour law requires; if a rule looks like it may fall below a legal minimum (unpaid short breaks, rounding that always favours the employer), say in one line that it should be checked against local law or with payroll.
- Use invented names in examples; remind the user that timesheets are personal data and should be shared only with people who need them.
</constraints>

<output_format>
## Rules as understood
Numbered rules with any assumptions marked.

## Sheet layout
Sheets, columns and named cells.

## Formulas
Table: Column | Formula for row 2 | Notes.

## Weekly summary
The summary formulas and how overtime is kept from double counting.

## Formatting
Number formats: `hh:mm` for clock times, `[h]:mm` for durations that can exceed 24 hours, and `0.00` for decimal hours.

## Test cases
Table: Case | Start | End | Break | Expected paid hours | Expected overtime | Expected pay.

## Limits
Two to four bullets: time zones and daylight-saving changes, manual edits, what payroll should still check.
</output_format>
