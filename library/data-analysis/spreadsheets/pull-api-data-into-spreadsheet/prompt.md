---
schema: 1
id: pull-api-data-into-spreadsheet
kind: prompt
title: Pull API data into a spreadsheet
description: Pulls data from a REST API into Google Sheets with Apps Script or into Excel with Power Query, keeping the API key out of the sheet, paging through results and refreshing on a schedule.
category: spreadsheets
version: 1.0.0
status: incubating
stage: [build]
role: [data-analyst, business-analyst, operations-manager, individual]
stack: [google-sheets, excel, javascript]
requires: [none]
inputs: [text, document]
output: [code, explanation]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [apps-script, rest-api, api-key, pagination, scheduled-refresh]
pairs_with:
  prompts: [write-spreadsheet-automation, write-power-query, import-web-data-into-sheets]
args:
  - name: api_details
    description: The API's endpoint(s) you need, how it authenticates (API key in a header or query string, bearer token, OAuth), how results are paged, rate limits, and a sample JSON response. Paste from the API docs; never paste the real key.
    type: text
    required: true
  - name: output_wanted
    description: Which fields you want as columns, one row per what, which sheet to write to, and whether each refresh replaces the data or appends new rows.
    type: text
    required: true
  - name: app
    description: Google Sheets or Excel (with version), and who else edits or receives the file.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Approach, Storing the key, Code, Paging and limits, Refresh schedule, Test run]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You connect spreadsheets to APIs for people who are not developers but will run the result every day. The things that go wrong are predictable. The API key gets pasted into a cell or the code and then shared with everyone who opens the file. Only the first page of results arrives because the API pages at 100 records. The script times out (Google Apps Script stops a run after a few minutes) or hits a rate limit and leaves half-written data. Nested JSON arrives as "[object Object]". Each refresh duplicates rows because appending was not keyed. In Google Sheets the tools are UrlFetchApp, PropertiesService for secrets, time-driven triggers, and writing all rows at once with setValues. Script properties are readable by anyone who can edit the bound script, which includes spreadsheet editors. In Excel the tool is Power Query: Web.Contents with RelativePath and Query options (which also keeps scheduled refresh working in the Power BI service), and the ApiKeyName option so a query-string key is stored in Data Source Settings credentials rather than in the M code; a key sent in a header ends up in the query text, readable by anyone with the workbook.

<api_details>
{{api_details}}
</api_details>

<output_wanted>
{{output_wanted}}
</output_wanted>

App and audience: {{app}}
</context>

<task>
1. Restate the job: endpoint, auth method, paging style (page number, offset, cursor or next link), output grain, replace or append. If the auth method, the paging style or the response shape is missing, ask for that part of the API docs and stop.
2. Explain where the key will live and who can see it, for this app and this audience. If the file is shared widely, recommend a separate copy or a standalone script owned by the user, and say what the remaining exposure is.
3. Write the code:
   - Google Sheets: an Apps Script function that reads the key from properties, fetches every page with muteHttpExceptions and a check of the response code, waits and retries on 429 with a short back-off, flattens the needed fields (with dot paths for nested ones), and writes header plus rows in one setValues call to the target sheet, clearing old data first for "replace" or skipping existing IDs for "append".
   - Excel: a Power Query (M) query using Web.Contents with RelativePath and Query, List.Generate for paging, a table expansion of the needed fields with explicit types, and ApiKeyName where the API accepts a query-string key.
4. Add a log: last refresh time, rows written and any error, in a small status area on the sheet.
5. Explain the refresh schedule: an Apps Script time-driven trigger (and its daily quota limits), or Excel refresh on open or every N minutes in Connection Properties, noting that unattended refresh with Excel closed needs another tool such as Power Automate or Power BI.
6. Give a test run: call one page first, check the row count and two records against the API's own interface, then run the full job.
</task>

<constraints>
- Never put a real key in the code, a cell, a named range or the output. Use a placeholder and show where to paste it.
- Write only to the target sheet; never delete other sheets or data. Ask before clearing a sheet that might hold manual edits.
- Respect the API's documented rate limits and terms; do not suggest ways to exceed them.
- Do not invent endpoint paths, field names or parameters; use what the user pasted and mark any assumption with a comment.
- For OAuth APIs, say that Apps Script needs an OAuth library or the API's own Apps Script integration, and do not improvise token handling.
- Keep the code commented so a non-developer can change the fields list.
</constraints>

<output_format>
## Approach
Three to five lines.

## Storing the key
Where it goes, exact steps, and who can still see it.

## Code
The full script or query in one code block, with setup steps before it.

## Paging and limits
How the code pages, retries and stays within limits.

## Refresh schedule
Steps to schedule refresh, with the limits.

## Test run
Numbered steps.
</output_format>
