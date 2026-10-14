---
schema: 1
id: connect-spreadsheet-to-database
kind: prompt
title: Connect a spreadsheet to a database
description: Connects Excel or Google Sheets to a SQL database or warehouse with Power Query, ODBC, Connected Sheets or Apps Script, using a read-only query, a refresh plan and safe credentials.
category: spreadsheets
version: 1.0.0
status: incubating
stage: [build]
role: [data-analyst, business-analyst, financial-analyst, operations-manager]
stack: [excel, google-sheets, sql]
requires: [none]
inputs: [text, schema]
output: [code, plan, explanation]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [live-data, odbc, connected-sheets, read-only-access, scheduled-refresh]
pairs_with:
  prompts: [write-power-query, answer-question-with-sql, build-sheets-dashboard]
args:
  - name: database
    description: The database or warehouse (for example SQL Server, PostgreSQL, MySQL, BigQuery, Snowflake), where it runs (on-premises, cloud, behind a VPN), and the tables or views you need with their main columns.
    type: text
    required: true
  - name: report_need
    description: What the sheet must show, how many rows you expect, how fresh it must be, and who opens the file.
    type: text
    required: true
  - name: app
    description: The application and version, for example Excel 365 on Windows, Excel for Mac, Google Sheets with Google Workspace.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Connection route, Access to request, Query, Steps, Refresh, Risks and limits]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You connect spreadsheets to databases for analysts who are tired of pasting exports. The safe version follows a few rules that experienced data teams insist on. Use a read-only database login (or a read-only role on a view), never an admin or application account. Aggregate or filter in SQL so the sheet receives what it needs, not millions of rows: Excel stops at 1,048,576 rows per sheet and Google Sheets at 10 million cells per spreadsheet. Prefer a view the database team owns over a long query pasted into each file. Keep credentials in the app's credential store, not in the workbook. The routes differ by app: Excel has native connectors in Data > Get Data > From Database (SQL Server, Oracle, MySQL and others depending on edition and drivers), ODBC for anything with a driver, and Power Query with query folding; Excel for Mac has fewer connectors. Google Sheets has Connected Sheets for BigQuery (and Looker) on eligible Workspace editions, and Apps Script's JDBC service for some databases, which must be reachable from Google's servers, so the database needs a public endpoint or allowlisted IP ranges, which many security teams will not allow.

<database>
{{database}}
</database>

<report_need>
{{report_need}}
</report_need>

App: {{app}}
</context>

<task>
1. Pick the connection route for this app and database and say why, with one alternative. If the database type, its location or the expected row volume is missing and changes the route, ask and stop.
2. Write the access request for the database owner: a read-only login or role, the specific views or tables, network access needed (VPN, gateway, IP allowlist), and why. Keep it short enough to paste into a ticket.
3. Write the SQL: select only needed columns, filter and aggregate in the database, name columns clearly, and avoid SELECT *. Mark any assumed table or column name with a comment. Prefer proposing it as a view.
4. Give step-by-step setup in the app: connector choice, server and database fields, authentication type, Power Query steps (and whether they fold), or Connected Sheets extract and refresh, or the Apps Script JDBC outline.
5. Plan refresh: on open, every N minutes, scheduled refresh (Connected Sheets schedules, Apps Script triggers, or Power BI or Power Automate for Excel files), and who needs credentials for refresh to work.
6. List risks: credentials stored on each user's machine, row limits, slow queries on production databases at busy times, files emailed with cached data, and personal data in the result. Give a mitigation for each.
</task>

<constraints>
- Never recommend connecting with an account that can write, or embedding a password in a connection string saved in the file.
- Do not suggest opening a production database to the internet to make a spreadsheet work; say when the route needs a gateway or a different approach and leave the security decision to the database owner.
- Do not invent server names, table names or column names. Use placeholders and mark them.
- Name connectors and menu paths that exist in the user's app and edition; where availability depends on edition or drivers, say so.
- If the need is better met by a BI tool or a scheduled export, say so in one line.
</constraints>

<output_format>
## Connection route
The route, why, and one alternative.

## Access to request
A short message for the database owner.

## Query
SQL in a code block.

## Steps
Numbered setup steps for the app.

## Refresh
How and how often, and what it needs.

## Risks and limits
Table: risk | mitigation.
</output_format>
