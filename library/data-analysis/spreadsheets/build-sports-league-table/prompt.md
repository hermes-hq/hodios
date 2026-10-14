---
schema: 1
id: build-sports-league-table
kind: prompt
title: Build a sports league table spreadsheet
description: Builds a league standings table in Excel or Google Sheets from a results list - played, won, drawn, lost, scores for and against, points and tiebreakers - plus a round-robin fixture list.
category: spreadsheets
version: 1.0.0
status: incubating
stage: [build]
role: [individual, teacher, operations-manager]
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
depth: specific
tags: [league-standings, fixtures, round-robin, tiebreakers, club-admin]
pairs_with:
  prompts: [write-spreadsheet-formula, write-conditional-formatting-rules]
args:
  - name: league
    description: The sport, the teams or players, how many times each pair meets (once, home and away), and how results are recorded (scores, sets, frames).
    type: text
    required: true
  - name: rules
    description: Points for a win, draw and loss, any bonus points or forfeits, and the tiebreak order from your competition rules (for example goal difference, goals scored, head-to-head).
    type: text
    required: true
  - name: tool
    description: Excel (365 or older) or Google Sheets, and whether the table is shared or shown on a website.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Layout, Fixtures, Results helper columns, Standings formulas, Sorting and tiebreaks, Checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You build league tables for clubs, schools and amateur competitions. The robust design never types totals: a Results tab holds one row per fixture (round, date, home, away, home score, away score), helper columns turn each played row into points and win, draw and loss flags for both sides, and the Standings tab sums them per team with SUMIFS over the home and away columns. Unplayed fixtures must count as nothing, so a Played flag (both scores entered) gates every helper; testing for blank cells with comparisons is unreliable because text and blanks compare oddly with numbers. Tiebreak order is a competition rule, not a spreadsheet choice: goal difference, then goals scored is common, but many competitions use head-to-head results first, which needs a mini-table among the tied teams. A rank built from COUNTIFS on points, then difference, then scored works in every version. Fixtures for a round robin come from the circle method: fix one team, rotate the rest, add a bye if the number of teams is odd, and swap home and away for the second half of a double round robin.
</context>

<task>
Build the league in {{tool}}.

<league>
{{league}}
</league>

<rules>
{{rules}}
</rules>

1. Layout: tabs for Settings (points for win, draw, loss, bonus rules, tiebreak order), Teams, Results (fixtures with score cells), and Standings.
2. Fixtures: the full fixture list for the user's teams by the circle method, as a table (round, home, away), balancing home and away, with byes if the number of teams is odd, and the second half reversed for home and away.
3. Results helper columns: Played `=IF(COUNT(HomeScore, AwayScore)=2, 1, 0)`; HomeWin, Draw, AwayWin flags multiplied by Played; HomePts and AwayPts from the Settings points; any bonus or forfeit rule from the user. Give each formula for the first row.
4. Standings formulas: per team: P, W, D, L, F, A, Diff, Pts, each as SUMIFS over Results with the team in the Home column plus SUMIFS with the team in the Away column, using the matching helper. Optional form guide of the last five results with FILTER plus TAKE in Excel 365, or FILTER plus CHOOSEROWS with negative row numbers in Google Sheets.
5. Sorting and tiebreaks: a rank `=COUNTIFS(Pts, ">"&p) + COUNTIFS(Pts, p, Diff, ">"&d) + COUNTIFS(Pts, p, Diff, d, For, ">"&f) + 1` (adapted to the user's tiebreak order), a sorted display table (SORTBY in Excel 365 and Google Sheets SORT, or INDEX/MATCH on rank for older Excel), and a flag where teams are still tied after all formula tiebreakers. If head-to-head comes first in the rules, explain how to resolve it for the tied teams and where to enter the outcome as a manual tiebreak column.
6. Checks: total wins equal total losses, total draws even, total points equal the sum over played fixtures, each team's P equals its played fixtures, and no team plays twice in a round.
</task>

<constraints>
- Use the user's points and tiebreak rules exactly; if the tiebreak order is not given, ask, and meanwhile state the order assumed.
- Do not type standings by hand; everything comes from Results.
- Use functions available in the stated version and give the older-Excel route where needed.
- If results are entered by several people, suggest data validation for team names and numeric scores.
</constraints>

<output_format>
## Layout
## Fixtures
Table: Round | Home | Away.
## Results helper columns
Code blocks with each formula.
## Standings formulas
Table: Column | Formula.
## Sorting and tiebreaks
## Checks
</output_format>
