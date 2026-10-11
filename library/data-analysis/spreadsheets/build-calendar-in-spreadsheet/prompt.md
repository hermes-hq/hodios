---
schema: 1
id: build-calendar-in-spreadsheet
kind: prompt
title: Build a perpetual calendar in a spreadsheet
description: Builds a monthly or yearly calendar grid in Excel or Google Sheets driven by a year and month selector, with weekends, holidays and events from a list shown on their dates.
category: spreadsheets
version: 1.0.0
status: incubating
stage: [build]
role: [individual, teacher, operations-manager, project-manager]
stack: [excel, google-sheets]
inputs: [text]
output: [code, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [calendar-template, month-grid, event-list, date-formulas, year-planner]
pairs_with:
  prompts: [calculate-dates-and-workdays, write-conditional-formatting-rules, build-leave-tracker-spreadsheet]
args:
  - name: calendar
    description: What it is for and the view you want - one month at a time, a full year on one page, or both; week starting Monday or Sunday; week numbers or not.
    type: text
    required: true
  - name: events
    description: What should appear on dates - one-day events, multi-day bookings, holidays, deadlines, categories with colours - and where that list lives or will live.
    type: text
  - name: tool
    description: Excel 365, older Excel, or Google Sheets.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Layout, Selector and first date, Date grid, Events on dates, Formatting rules, Test]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You build calendars in spreadsheets that work for any year without retyping. Everything hangs off one formula: the date shown in the first cell of the grid, which is the first day of the month moved back to the start of its week. With a Monday start that is `=DATE(CalYear, CalMonth, 1) - WEEKDAY(DATE(CalYear, CalMonth, 1), 2) + 1`; with a Sunday start use return type 1. Every other cell adds whole days to it, so the grid is six rows of seven, and days outside the selected month are greyed out by conditional formatting rather than blanked, which keeps the arithmetic simple. Events come from a separate list (date, or start and end, title, category), never typed into the grid, so the calendar can be rebuilt for any month. A day matches a multi-day event when start <= day and end >= day. Day names from TEXT depend on the file's locale. Excel conditional formatting cannot use structured table references, so use named ranges there; Google Sheets conditional formatting cannot refer to another tab directly, so a holidays or events range on another tab must be wrapped in INDIRECT, for example `INDIRECT("Settings!A2:A60")`. Week numbers differ by convention: ISOWEEKNUM for ISO weeks, WEEKNUM with a return type for others.
</context>

<task>
Build the calendar in {{tool}}.

<calendar>
{{calendar}}
</calendar>

{{#events}}
<events>
{{events}}
</events>
{{/events}}

1. Layout: tabs for Calendar, Events (one row per event: start, end, title, category) and Settings (week start, holidays list, category colours). For a year view, twelve month blocks in a 3 x 4 or 4 x 3 arrangement, each block with its own month offset.
2. Selector and first date: named input cells `CalYear` and `CalMonth` (a dropdown for month, a number or dropdown for year), the month title `=DATE(CalYear, CalMonth, 1)` formatted as `mmmm yyyy`, and the first grid date as `GridStart` using the week start the user chose.
3. Date grid: day-name headers from `=TEXT(GridStart + n, "ddd")`; the grid either as one `=SEQUENCE(6, 7, GridStart)` (Excel 365 and Google Sheets) or per-cell formulas adding 7 per row and 1 per column; number format `d` so only the day shows. If events must appear under dates, use alternating date and event rows with per-cell formulas, because a single spilled grid leaves no room.
4. Events on dates: for each event cell, the titles for that day joined: Excel 365 `=TEXTJOIN(", ", TRUE, FILTER(EvTitle, (EvStart<=d)*(EvEnd>=d), ""))`; Google Sheets the same with IFNA around FILTER; for older Excel, a count with COUNTIFS and a marker instead of titles. Treat a blank end date as a one-day event.
5. Formatting rules: conditional formatting formulas, with the cell they are written relative to: outside the month `=MONTH(cell)<>CalMonth`, weekends `=WEEKDAY(cell, 2)>5`, today `=cell=TODAY()`, holidays `=COUNTIF(Holidays, cell)>0`, and has-event or category colours with COUNTIFS. Give the order of rules and which should stop others.
6. Test: three months to switch to (one starting on the first weekday of the week, one starting on the last, February in a leap year) and what the first and last cells should show, plus a multi-day event crossing a month end.
</task>

<constraints>
- Use only functions available in the stated version; give the per-cell route for Excel without dynamic arrays.
- No hard-coded dates or years in formulas; everything follows the selectors.
- Keep events in the list; the grid holds formulas only.
- If week numbers are wanted, ask or state which convention is used.
</constraints>

<output_format>
## Layout
## Selector and first date
Code block with each formula and its cell or name.
## Date grid
## Events on dates
## Formatting rules
Table: Rule | Applies to | Formula | Format.
## Test
</output_format>
