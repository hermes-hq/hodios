---
schema: 1
id: build-leave-tracker-spreadsheet
kind: prompt
title: Build an annual leave tracker spreadsheet
description: Builds a staff annual leave tracker in Excel or Google Sheets - pro-rata allowances, carry-over, bookings in days or hours, public holidays, remaining balance and a team calendar view.
category: spreadsheets
version: 1.0.0
status: incubating
stage: [build]
role: [manager, operations-manager, founder]
stack: [excel, google-sheets]
advice_risk: [legal]
inputs: [text, dataset]
output: [table, code, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [annual-leave, holiday-tracker, pro-rata, absence-calendar, small-team]
pairs_with:
  prompts: [calculate-dates-and-workdays, write-conditional-formatting-rules, build-timesheet-calculator]
args:
  - name: team
    description: Staff list or a sample - name or ID, start date (and end date if leaving), working pattern (days per week or hours), full-time or part-time.
    type: text
    required: true
  - name: rules
    description: Your leave rules - leave year start, full-time allowance in days or hours, whether public holidays are included, carry-over limit, how part-timers and joiners are pro-rated, half days.
    type: text
    required: true
  - name: tool
    description: Excel or Google Sheets, and how many people will edit it.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Layout, Allowance formulas, Booking leave, Balances, Team calendar, Checks, Rules to confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You build annual leave trackers for small teams. The arithmetic goes wrong in predictable places: pro-rating for people who join or leave mid-year, part-timers whose allowance should be in hours or proportional days, public holidays falling on days a part-timer does not work, bookings that span weekends or holidays counted as calendar days, and carry-over applied twice. A good tracker keeps the rules on a settings tab, calculates working days with the organisation's own holiday list, and shows each person's balance and the team's coverage at a glance. Statutory minimum leave and how it must be calculated differ by country, so the tracker implements the employer's stated rules and does not assume a legal minimum.
</context>

<task>
Build the leave tracker in {{tool}}.

<team>
{{team}}
</team>

<rules>
{{rules}}
</rules>

1. Layout: tabs for Settings (leave year start and end, full-time allowance, carry-over cap, rounding rule), Holidays (date list for the leave year), Staff (one row per person with pattern and dates), Bookings (one row per leave request: person, start, end, half-day flags, type, approved), Balances, and Calendar.
2. Allowance formulas: the pro-rata allowance for each person from working pattern and start or end date inside the leave year, with the rounding rule (for example to the nearest half day). Give the exact formula and work through one joiner and one part-timer from the input.
3. Booking leave: days taken per booking using NETWORKDAYS.INTL (or the equivalent) with the person's working-day pattern and the Holidays list, adjusting for half days; hours if the rules work in hours.
4. Balances: allowance + carry-over - taken - booked future = remaining, per person, with a flag when negative or when carry-over exceeds the cap.
5. Team calendar: a month grid (people down, dates across) filled from Bookings, with conditional formatting for leave, holidays and weekends, and a daily count of people off to spot coverage gaps.
6. Checks: overlapping bookings for the same person, bookings outside the leave year, bookings on non-working days, and totals that reconcile between Bookings and Balances.
7. Rules to confirm: anything missing or ambiguous in the rules, and a note that statutory requirements should be checked for the country.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Implement the user's rules as Settings inputs; do not assume statutory allowances or carry-over rights for any country.
- Use functions available in {{tool}}; give alternatives where Excel and Google Sheets differ.
- No hardcoded dates or allowances inside formulas.
- Keep personal data minimal; suggest IDs instead of names if the sheet is widely shared.
- Test the formulas on two people from the input and show the results.
</constraints>

<output_format>
## Layout
## Allowance formulas
Code blocks, then the two worked examples.
## Booking leave
## Balances
Table: Column | Formula.
## Team calendar
## Checks
## Rules to confirm
</output_format>
