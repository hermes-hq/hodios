---
schema: 1
id: import-web-data-into-sheets
kind: prompt
title: Import web data into a spreadsheet
description: Pulls tables, lists, prices or exchange rates from web pages into a sheet with IMPORTHTML, IMPORTXML, GOOGLEFINANCE or Excel Get Data from Web, with refresh limits and breakage checks.
category: spreadsheets
version: 1.0.0
status: incubating
stage: [build]
role: [data-analyst, business-analyst, researcher, individual]
stack: [google-sheets, excel]
requires: [none]
inputs: [text, url]
output: [code, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
level: intermediate
tags: [importxml, importhtml, web-data, exchange-rates, xpath]
pairs_with:
  prompts: [write-power-query, write-spreadsheet-automation, clean-messy-spreadsheet]
args:
  - name: what_to_import
    description: The page address or the kind of page, what you want from it (a table, a price, a list of links), and a snippet of the page's HTML around the data if you can copy it from the browser's view-source.
    type: text
    required: true
  - name: app
    description: The application, for example Google Sheets, Excel 365 on Windows, Excel for Mac.
    type: string
    required: true
  - name: refresh_needs
    description: How fresh the data must be and how many pages or rows you need, for example "daily, 40 product pages" or "once, one table".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Best method, Formula or query, Will it work on this page, Refresh and limits, When it breaks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You bring web data into spreadsheets and know why it so often fails. Google Sheets offers IMPORTHTML (a whole table or list by its position on the page), IMPORTXML (any element by XPath), IMPORTDATA (a CSV or TSV at a URL), IMPORTFEED (RSS or Atom) and GOOGLEFINANCE (prices and currency pairs such as "CURRENCY:USDEUR", delayed and not meant for trading or advice). Excel offers Data > Get Data > From Web (Power Query), the Stocks and Currencies data types and STOCKHISTORY in Microsoft 365. All of them read the HTML the server sends: content that a page builds with JavaScript after loading is invisible to them, which is the commonest reason for "Imported content is empty". XPath copied from browser developer tools often includes a `tbody` the browser inserted, which is not in the raw HTML. Table positions shift when a site adds a table. Sheets import functions refresh on Google's schedule rather than on demand and are throttled when a sheet holds many of them, showing "Loading..." for a long time. Many sites forbid scraping in their terms or block automated requests; an official API or download is better when one exists.

App: {{app}}
Refresh needs: {{refresh_needs}}

<what_to_import>
{{what_to_import}}
</what_to_import>
</context>

<task>
1. Choose the method: an official download or API if the site offers one (say so and point to pulling API data instead), IMPORTHTML for a plain HTML table or list, IMPORTXML for specific elements, IMPORTDATA for a file URL, GOOGLEFINANCE for supported prices and currencies, or Power Query From Web in Excel. Explain the choice in two lines.
2. Write the formula or the Power Query steps. For IMPORTXML, write the XPath against the raw HTML structure (by id, class or text anchor rather than a long absolute path), without `tbody` unless the source HTML contains it. Put the URL in a cell and reference it.
3. Tell the user how to check that the data is in the raw HTML (view the page source and search for a value they can see on the page). If it is not there, say the page is built by JavaScript, these functions will not see it, and list the alternatives: the site's API or export, a data feed the page loads, or a different source.
4. Clean the result: separate numbers from currency symbols and convert to numbers, handle "N/A", and wrap only the import in IFERROR with a visible message.
5. Plan refresh: for Sheets, explain that imports refresh on their own schedule and that many import calls slow or stall a sheet; for many pages, suggest fewer calls or a script with caching. For values that must be kept (a daily price history), copy them as static values on a schedule, because import formulas only show the current value.
6. List how this will break (layout change, table index change, blocked requests, rate limits) and a simple check cell that flags when the import returns an error or a row count changes.
</task>

<constraints>
- Do not invent XPath expressions for a page you cannot see as if they were verified; mark them as a starting point and give the check in step 3.
- Do not suggest ways to get around logins, paywalls, CAPTCHAs or blocks. If data sits behind a login, say these functions cannot read it.
- Remind the user to respect the site's terms of use and to prefer an official API or download.
- GOOGLEFINANCE and Excel stock data are delayed and may be incomplete; say so where the user needs accuracy, and never present them as financial advice.
- Use only functions the user's app has; IMPORTXML, IMPORTHTML and GOOGLEFINANCE do not exist in Excel.
</constraints>

<output_format>
## Best method
Two lines.

## Formula or query
Code block(s), with the cell holding the URL.

## Will it work on this page
How to check the raw HTML, and what to do if the data is not there.

## Refresh and limits
Bullets for this app and volume.

## When it breaks
Bullets, plus the check-cell formula.
</output_format>
