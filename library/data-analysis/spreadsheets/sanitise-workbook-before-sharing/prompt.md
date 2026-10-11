---
schema: 1
id: sanitise-workbook-before-sharing
kind: prompt
title: Sanitise a workbook before sharing it
description: Checks an Excel or Google Sheets file before it goes outside the team for hidden sheets and rows, metadata, comments, external links, version history and pivot caches that still hold data.
category: spreadsheets
version: 1.0.0
status: incubating
stage: [review, ship]
role: [financial-analyst, data-analyst, operations-manager, individual]
stack: [excel, google-sheets]
inputs: [text]
output: [checklist, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [data-leakage, hidden-data, document-inspector, file-sharing, metadata]
pairs_with:
  prompts: [explain-inherited-spreadsheet, audit-spreadsheet-model, set-up-data-validation]
args:
  - name: workbook
    description: What the file contains - tabs, what is sensitive (salaries, margins, customer data, other clients' figures), and how it was built (pivots, imports, links to other files, macros).
    type: text
    required: true
  - name: recipient
    description: Who receives it and what they need to be able to do - read only, filter, edit inputs, reuse the model.
    type: text
    required: true
  - name: tool
    description: Excel (desktop, web or Mac, and where the file is stored) or Google Sheets, and how you plan to send it - attachment, share link, PDF.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Leak risks in this file, Inspection checklist, Clean-up steps, Safest way to send, Final check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people send spreadsheets outside their team without leaking what they did not mean to send. Most leaks are not in the visible cells. They come from hidden or very hidden sheets, hidden rows and columns, cells formatted to look blank (`;;;` or white text), comments and notes, author and company names in file properties, links and named ranges pointing at other files, Power Query connections that carry file paths and queries, and pivot tables whose cache still holds the full source data after the source sheet is deleted (a double-click on a value rebuilds it). In Google Sheets, anyone with edit access can open version history and see earlier contents, and hidden sheets are not protected from anyone who can copy or download the file. Hiding and sheet protection are presentation features, not security. The reliable fix is usually to send a fresh file that only ever contained what the recipient needs.
</context>

<task>
Prepare this file for sending in {{tool}}.

<workbook>
{{workbook}}
</workbook>

<recipient>
{{recipient}}
</recipient>

1. Leak risks in this file: from the description, list what could leak and how, most serious first. Name each mechanism (pivot cache, hidden tab, version history, external link, comment, metadata) and what data it would expose.
2. Inspection checklist: the exact steps in {{tool}} to find each kind of hidden content. For Excel cover the Document Inspector (File > Info > Check for Issues > Inspect Document), unhiding sheets and checking for very hidden sheets in the VBA editor's Properties window if the file has macros, Go To Special for objects and comments, Name Manager for hidden and broken names, Edit Links or Workbook Links, Queries & Connections, PivotTable options for saved source data, and file properties. For Google Sheets cover hidden sheets, hidden rows and columns, filter views, comments and resolved comments, notes, named ranges, IMPORTRANGE and connected sources, Apps Script attached to the file, and version history.
3. Clean-up steps: what to remove or convert for this recipient, in order, such as replacing formulas with values where the recipient must not see the logic, turning off "Save source data with file" or converting pivots to values, breaking external links, deleting (not hiding) unneeded sheets and columns, clearing comments and properties.
4. Safest way to send: recommend one route that fits the recipient's needs. Options: a new file built by pasting values into a blank workbook, a copy made with File > Make a copy (which does not carry version history in Google Sheets), a PDF export of the needed range, or a view-only share with download and copy disabled where the tool supports it. Say what each route still exposes.
5. Final check: a short test the user runs on the finished file before sending, such as opening it as the recipient would, unhiding everything, double-clicking a pivot value, searching for a sensitive name or number, and checking file properties.
</task>

<constraints>
- Work only from the description; do not assume a sheet is clean because it was not mentioned. Ask about pivots, links and history if the description is silent and they would change the advice.
- Never present hiding, sheet protection or a password on a sheet as a way to keep data confidential.
- Tell the user to make a copy before deleting anything, and to keep the original unchanged.
- If the file contains personal data about people, say that sending it may be subject to data protection rules and the user should check their organisation's policy, without stating specific laws.
- Menu paths differ between Excel versions and change over time; say where to look if a menu is not found.
</constraints>

<output_format>
## Leak risks in this file
Table: Risk | Where it hides | What it would expose | Severity.
## Inspection checklist
Numbered checklist with menu paths for {{tool}}.
## Clean-up steps
Numbered, in order.
## Safest way to send
One recommendation, then what it still exposes.
## Final check
Five or fewer checks.
</output_format>
